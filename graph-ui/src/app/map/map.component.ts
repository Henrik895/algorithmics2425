import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import cytoscape, { ElementDefinition } from 'cytoscape';
import { CITIES } from './cities';
import { BOUNDARIES } from './boundaries';
import { MapService } from './map.service';

const createEdgeStyle = (name: string, color: string): cytoscape.Stylesheet => {
  return {
    selector: `edge.${name}`,
    style: {
      'target-arrow-color': color,
      'line-color': color,
    },
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  @ViewChild('cyContainer', { static: true }) cyContainer!: ElementRef;

  elements: any[] = [];

  constructor(private readonly mapService: MapService) {}

  private scaleCoordinates(lat: number, lon: number): { x: number; y: number } {
    return { x: lon * 85, y: -lat * 100 }
  }

  ngOnInit(): void {
    for (let city of CITIES) {
      const position = this.scaleCoordinates(city.latitude, city.longitude);
      this.elements.push({
        data: { id: city.name, label: city.name },
        position,
      });
    }

    // Using counter feels a bit hackish
    let counter = 0;
    for (let boundary of BOUNDARIES) {
      for (let point of boundary.points) {
        const position = this.scaleCoordinates(point.latitude, point.longitude);
        const pointId = `b-${counter++}`;
        this.elements.push({
          data: { id: pointId, label: pointId },
          classes: 'border',
          position,
        })
      }
    }

    const cy = cytoscape({
      container: this.cyContainer.nativeElement,
      elements: this.elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#003297',
            'label': 'data(label)',
            'text-halign': 'center',
            'text-valign': 'center',
            'color': '#fff',
            'font-size': '3px',
            'width': '8px',
            'height': '8px',
            'overlay-opacity': 0,
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'target-arrow-shape': 'triangle',
            'arrow-scale': 0.25,
            'curve-style': 'straight',
            'font-size': '2px',
          }
        },
        {
          selector: 'node.border',
          style: {
            visibility: 'hidden',
          },
        },
        // Some pre-defined styles, not the best solution but works
        createEdgeStyle('0', '#39ff14'),
        createEdgeStyle('1', '#ff13f0'),
        createEdgeStyle('2', '#04d9ff'),
        createEdgeStyle('3', '#ffa500'),
        createEdgeStyle('4', '#008000'),
        createEdgeStyle('5', '#ffc0cb'),
      ],
      layout: {
        name: 'preset', 
      },
    });

    cy.nodes().forEach((node) => {
      node.lock();
      node.ungrabify();
      node.unselectify();
    });

    const canvas = document.getElementById('overlay') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }
    const ctx = canvas.getContext('2d');

    // Some ChatGPT drawing method, which works quite well
    // Resize canvas to match Cytoscape container
    const resizeCanvas = () => {
      canvas.width = cy.container()!.clientWidth;
      canvas.height = cy.container()!.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Function to draw a polygon between specified nodes
    const drawPolygon = (nodeIds: any, fillColor: any, clear: boolean = true) => {
      if (clear) {
        ctx!.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      }

      // Get positions of the nodes
      const positions = nodeIds.map((id: any) => {
        const node = cy.getElementById(id);
        return node.renderedPosition(); // Get position in rendered space
      });

      // Draw the polygon
      if (positions.length > 0) {
        ctx!.beginPath();
        ctx!.moveTo(positions[0].x, positions[0].y);
        positions.slice(1).forEach((pos: any) => ctx!.lineTo(pos.x, pos.y));
        ctx!.closePath();

        // Fill the polygon
        ctx!.fillStyle = fillColor;
        ctx!.fill();
      }
    };

    // The counter doesn't seem like the best idea, but it works for this prototype
    counter = 0;
    let clear = true;
    for (let boundary of BOUNDARIES) {
      const points: string[] = [];
      for (let point of boundary.points) {
        points.push(`b-${counter++}`);
      }
      if (boundary.isLand) {
        drawPolygon(points, 'rgba(0, 9, 75, 1)', clear);
      } else {
        drawPolygon(points, 'rgba(12, 12, 12, 1)', clear);
      }
      clear = false;
    }

    // Update the polygon dynamically when Cytoscape is zoomed or panned
    cy.on('render', () => {
      counter = 0;
      clear = true;
      for (let boundary of BOUNDARIES) {
        const points: string[] = [];
        for (let point of boundary.points) {
          points.push(`b-${counter++}`);
        }
        if (boundary.isLand) {
          drawPolygon(points, 'rgba(0, 9, 75, 1)', clear);
        } else {
          drawPolygon(points, 'rgba(12, 12, 12, 1)', clear);
        }
        clear = false;
      }
    });

    // Should unsub
    this.mapService.routes.subscribe((routes) => {
      if (routes === null) return;

      let c = 0;
      const edges: ElementDefinition[] = [];
      for (let i = 0; i < routes.routes.length; i++) {
        const destinations = routes.routes[i].items.map((i) => i.destination);
        destinations.unshift(routes.depot)
        destinations.push(routes.depot);
        for (let j = 0; j < destinations.length - 1; j++) {
          edges.push({
            data: { id: `e-${c++}`, source: destinations[j], target: destinations[j + 1] },
            classes: i.toString(),
          })
        }
      }
      this.elements.push(...edges);
      cy.json({ elements: this.elements });
    })
  }
}
