interface BoundaryPoint {
    latitude: number;
    longitude: number;
}

interface Boundary {
    points: BoundaryPoint[];
    isLand: boolean;
}

const BOUNDARY_1: Boundary = {
    points: [
        { latitude: 59.4702, longitude: 28.0421 },
        { latitude: 59.4019, longitude: 27.7572 },
        { latitude: 59.4465, longitude: 27.3812 },
        { latitude: 59.4444, longitude: 26.9081 },
        { latitude: 59.5531, longitude: 26.6061 },
        { latitude: 59.5194, longitude: 26.4990 },
        { latitude: 59.5868, longitude: 26.2657 },
        { latitude: 59.5863, longitude: 26.1031 },
        { latitude: 59.6285, longitude: 26.0586 },
        { latitude: 59.6356, longitude: 25.9638 },
        { latitude: 59.5779, longitude: 25.9479 },
        { latitude: 59.6153, longitude: 25.8917 },
        { latitude: 59.5632, longitude: 25.8243 },
        { latitude: 59.5714, longitude: 25.7783 },
        { latitude: 59.6670, longitude: 25.6994 },
        { latitude: 59.5651, longitude: 25.6779 },
        { latitude: 59.6487, longitude: 25.5068 },
        { latitude: 59.5189, longitude: 25.5230 },
        { latitude: 59.4941, longitude: 25.3462 },
        { latitude: 59.5407, longitude: 25.1427 },
        { latitude: 59.4953, longitude: 24.9687 },
        { latitude: 59.5716, longitude: 24.7963 },
        { latitude: 59.4443, longitude: 24.7935 },
        { latitude: 59.4855, longitude: 24.6881 },
        { latitude: 59.4650, longitude: 24.6891 },
        { latitude: 59.4697, longitude: 24.6467 },
        { latitude: 59.4309, longitude: 24.6653 },
        { latitude: 59.4615, longitude: 24.5706 },
        { latitude: 59.4732, longitude: 24.3598 },
        { latitude: 59.4040, longitude: 24.1923 },
        { latitude: 59.3426, longitude: 24.2280 },
        { latitude: 59.3896, longitude: 24.0390 },
        { latitude: 59.2754, longitude: 24.0903 },
        { latitude: 59.2840, longitude: 23.7840 },
        { latitude: 59.2290, longitude: 23.6998 },
        { latitude: 59.2291, longitude: 23.5085 },
        { latitude: 59.0899, longitude: 23.5390 },
        { latitude: 59.0256, longitude: 23.4049 },
        { latitude: 58.9812, longitude: 23.6600 },
        { latitude: 58.9413, longitude: 23.4273 },
        { latitude: 58.7655, longitude: 23.4470 },
        { latitude: 58.7677, longitude: 23.7384 },
        { latitude: 58.6890, longitude: 23.4939 },
        { latitude: 58.3346, longitude: 23.7614 },
        { latitude: 58.2290, longitude: 24.1169 },
        { latitude: 58.3770, longitude: 24.3034 },
        { latitude: 58.3764, longitude: 24.4839 },
        { latitude: 58.3016, longitude: 24.5862 },
        { latitude: 58.1739, longitude: 24.4544 },
        { latitude: 58.0750, longitude: 24.4781 },
        { latitude: 57.8764, longitude: 24.3527 },
        { latitude: 57.8712, longitude: 24.4192 },
        { latitude: 57.9623, longitude: 24.5851 },
        { latitude: 58.0856, longitude: 25.1994 },
        { latitude: 57.9903, longitude: 25.2840 },
        { latitude: 58.0823, longitude: 25.2899 },
        { latitude: 57.8486, longitude: 26.0565 },
        { latitude: 57.7703, longitude: 26.0225 },
        { latitude: 57.7151, longitude: 26.2058 },
        { latitude: 57.5929, longitude: 26.3116 },
        { latitude: 57.5400, longitude: 26.5851 },
        { latitude: 57.5878, longitude: 26.7378 },
        { latitude: 57.6334, longitude: 26.9264 },
        { latitude: 57.5317, longitude: 27.3327 },
        { latitude: 57.5800, longitude: 27.3171 },
        { latitude: 57.6197, longitude: 27.3874 },
        { latitude: 57.6857, longitude: 27.3885 },
        { latitude: 57.7175, longitude: 27.4470 },
        { latitude: 57.7285, longitude: 27.5256 },
        { latitude: 57.7889, longitude: 27.4940 },
        { latitude: 57.8343, longitude: 27.5500 },
        { latitude: 57.8640, longitude: 27.8123 },
        { latitude: 58.0780, longitude: 27.6057 },
        { latitude: 58.2360, longitude: 27.4776 },
        { latitude: 58.3657, longitude: 27.4387 },
        { latitude: 58.6963, longitude: 27.1542 },
        { latitude: 58.8150, longitude: 26.9488 },
        { latitude: 58.9275, longitude: 27.0216 },
        { latitude: 59.0074, longitude: 27.4463 },
        { latitude: 58.9914, longitude: 27.7357 },
        { latitude: 59.1306, longitude: 27.8055 },
        { latitude: 59.2721, longitude: 27.9554 },
        { latitude: 59.3016, longitude: 28.1187 },
        { latitude: 59.3768, longitude: 28.2028 },
        { latitude: 59.3839, longitude: 28.2061 },
        { latitude: 59.4412, longitude: 28.1158 },
    ],
    isLand: true,
}

const BOUNDARY_2: Boundary = {
    points: [
        { latitude: 59.0907, longitude: 22.5847 },
        { latitude: 58.9938, longitude: 22.4376 },
        { latitude: 58.9334, longitude: 22.0485 },
        { latitude: 58.8933, longitude: 22.3826 },
        { latitude: 58.7015, longitude: 22.4893 },
        { latitude: 58.6985, longitude: 22.6660 },
        { latitude: 58.7812, longitude: 22.8458 },
        { latitude: 58.8376, longitude: 23.0681 },
        { latitude: 58.9817, longitude: 22.9381 },
        { latitude: 59.0177, longitude: 22.6942 },
        { latitude: 59.0731, longitude: 22.6945 },
    ],
    isLand: true,
}

const BOUNDARY_3: Boundary = {
    points: [
        { latitude: 58.6416, longitude: 22.5410 },
        { latitude: 58.5883, longitude: 22.4909 },
        { latitude: 58.5697, longitude: 22.2909 },
        { latitude: 58.4753, longitude: 22.1167 },
        { latitude: 58.4763, longitude: 21.8605 },
        { latitude: 58.3635, longitude: 21.9887 },
        { latitude: 58.2823, longitude: 21.8422 },
        { latitude: 58.1779, longitude: 22.0656 },
        { latitude: 58.1369, longitude: 22.2244 },
        { latitude: 58.0581, longitude: 22.0713 },
        { latitude: 57.9142, longitude: 22.0263 },
        { latitude: 57.9899, longitude: 22.2011 },
        { latitude: 58.1814, longitude: 22.2599 },
        { latitude: 58.2189, longitude: 22.5066 },
        { latitude: 58.2219, longitude: 22.7478 },
        { latitude: 58.3610, longitude: 23.0144 },
        { latitude: 58.4481, longitude: 23.3231 },
        { latitude: 58.5522, longitude: 23.1347 },
        { latitude: 58.6127, longitude: 22.9554 },
        { latitude: 58.6226, longitude: 22.7940 },
        { latitude: 58.6000, longitude: 22.6924 },
    ],
    isLand: true,
}

const BOUNDARY_4: Boundary = {
    points: [
        { latitude: 58.6393, longitude: 23.3574 },
        { latitude: 58.6790, longitude: 23.1747 },
        { latitude: 58.6269, longitude: 23.1454 },
        { latitude: 58.6001, longitude: 23.0710 },
        { latitude: 58.5644, longitude: 23.1772 },
        { latitude: 58.5222, longitude: 23.2346 },
        { latitude: 58.5407, longitude: 23.3998 },
        { latitude: 58.6151, longitude: 23.3438 },
    ],
    isLand: true,
}

const BOUNDARY_5: Boundary = {
    points: [
        { latitude: 58.3145, longitude: 25.9139 },
        { latitude: 58.2397, longitude: 25.9904 },
        { latitude: 58.1771, longitude: 26.0422 },
        { latitude: 58.0965, longitude: 26.0685 },
        { latitude: 58.2283, longitude: 26.1209 },
        { latitude: 58.3322, longitude: 26.1421 },
        { latitude: 58.3850, longitude: 26.1308 },
        { latitude: 58.4050, longitude: 26.0342 },
        { latitude: 58.3510, longitude: 25.9652 },
    ],
    isLand: false,
}

const BOUNDARY_6: Boundary = {
    points: [
        { latitude: 57.8058, longitude: 23.2132 },
        { latitude: 57.7811, longitude: 23.2579 },
        { latitude: 57.7981, longitude: 23.2733 },
        { latitude: 57.8240, longitude: 23.2314 },
    ],
    isLand: true,
}

const BOUNDARY_7: Boundary = {
    points: [
        { latitude: 58.9602, longitude: 23.1687 },
        { latitude: 58.9840, longitude: 23.3809 },
        { latitude: 59.0352, longitude: 23.3292 },
        { latitude: 59.0386, longitude: 23.1309 },
    ],
    isLand: true,
}

const BOUNDARY_8: Boundary = {
    points: [
        { latitude: 59.2873, longitude: 23.3775 },
        { latitude: 59.2794, longitude: 23.4260 },
        { latitude: 59.3044, longitude: 23.3607 },
    ],
    isLand: true,
}

const BOUNDARY_9: Boundary = {
    points: [
        { latitude: 59.3480, longitude: 23.8617 },
        { latitude: 59.3020, longitude: 23.9338 },
        { latitude: 59.3096, longitude: 23.9490 },
        { latitude: 59.3509, longitude: 23.9067 },
    ],
    isLand: true,
}

const BOUNDARY_10: Boundary = {
    points: [
        { latitude: 59.3465, longitude: 23.9309 },
        { latitude: 59.3125, longitude: 23.9843 },
        { latitude: 59.3162, longitude: 24.0078 },
        { latitude: 59.3618, longitude: 23.9638 },
    ],
    isLand: true,
}

const BOUNDARY_11: Boundary = {
    points: [
        { latitude: 59.5670, longitude: 24.4779 },
        { latitude: 59.5401, longitude: 24.5215 },
        { latitude: 59.5407, longitude: 24.5641 },
        { latitude: 59.6055, longitude: 24.5150 },
    ],
    isLand: true,
}

const BOUNDARY_12: Boundary = {
    points: [
        { latitude: 59.5851, longitude: 24.7412 },
        { latitude: 59.5725, longitude: 24.7565 },
        { latitude: 59.5862, longitude: 24.7863 },
    ],
    isLand: true,
}

const BOUNDARY_13: Boundary = {
    points: [
        { latitude: 59.6442, longitude: 24.9718 },
        { latitude: 59.6131, longitude: 24.9828 },
        { latitude: 59.6157, longitude: 25.0408 },
    ],
    isLand: true,
}

const BOUNDARY_14: Boundary = {
    points: [
        { latitude: 58.1508, longitude: 23.9638 },
        { latitude: 58.1223, longitude: 23.9545 },
        { latitude: 58.0991, longitude: 23.9662 },
        { latitude: 58.1006, longitude: 23.9910 },
        { latitude: 58.1518, longitude: 24.0195 },
    ],
    isLand: true,
}

export const BOUNDARIES: Boundary[] = [
    BOUNDARY_1,
    BOUNDARY_2,
    BOUNDARY_3,
    BOUNDARY_4,
    BOUNDARY_5,
    BOUNDARY_6,
    BOUNDARY_7,
    BOUNDARY_8,
    BOUNDARY_9,
    BOUNDARY_10,
    BOUNDARY_11,
    BOUNDARY_12,
    BOUNDARY_13,
    BOUNDARY_14,
];
