const PAGE_TITLE = "Welcome To";
export const PAGE_TITLE_1 = "PCOS Guide";

export const PAGE_SUB_TITLE = "Please select a category below to get started.";

export const PROGRAMS_CAROUSEL_IMAGES = [
  {
    name: "pcos",
    imageUrl: "/assets/images/programs/pcos.svg",
  },
  {
    name: "thyroid",
    imageUrl: "/assets/images/programs/thyroid.svg",
  },
  {
    name: "weight loss",
    imageUrl: "/assets/images/programs/weightLoss.svg",
  },
  {
    name: "fertility",
    imageUrl: "/assets/images/programs/fertility.svg",
  },
  {
    name: "diabetes",
    imageUrl: "/assets/images/programs/diabetes.svg",
  },
];

const PROGRAMS_INCLUSION = [
  {
    id: 0,
    iconName: "pcos",
    title: "",
    description: "Unlimited support by Ava",
  },
  {
    id: 1,
    iconName: "pcos",
    title: "Gynecologist",
    description: "1 Gynecologist consultation",
  },
  {
    id: 2,
    iconName: "pcos",
    title: "Nutritionist",
    description: "Personalised diet Plan",
  },
  {
    id: 3,
    iconName: "pcos",
    title: "Fitness trainer",
    description: "Workout Plan",
  },
  {
    id: 4,
    iconName: "pcos",
    title: "Dermatologist",
    description: "",
  },
];

const PLANS = {
  PCOS_BASIC_PROGRAM: [
    {
      id: 1,
      name: "3 Months",
      originalPrice: {
        price: 11999,
        displayValue: "₹11,999",
      },
      offerPrice: {
        price: 9999,
        displayValue: "₹9,999",
      },
    },
    {
      id: 2,
      name: "6 Months",
      originalPrice: {
        price: 5999,
        displayValue: "₹5,999",
      },
      offerPrice: {
        price: 4999,
        displayValue: "₹4,999",
      },
    },
    {
      id: 3,
      name: "12 Months",
      originalPrice: {
        price: 11999,
        displayValue: "₹11,999",
      },
      offerPrice: {
        price: 9999,
        displayValue: "₹9,999",
      },
    },
  ],
  PCOS_WARRIOR_PROGRAM: [
    {
      id: 1,
      name: "3 Months",
      originalPrice: {
        price: 2999,
        displayValue: "₹2,999",
      },
      offerPrice: {
        price: 1999,
        displayValue: "₹1,999",
      },
    },
    {
      id: 2,
      name: "6 Months",
      originalPrice: {
        price: 5999,
        displayValue: "₹5,999",
      },
      offerPrice: {
        price: 4999,
        displayValue: "₹4,999",
      },
    },
    {
      id: 3,
      name: "12 Months",
      originalPrice: {
        price: 11999,
        displayValue: "₹11,999",
      },
      offerPrice: {
        price: 9999,
        displayValue: "₹9,999",
      },
    },
  ],
  AVA_ANDME_PROGRAM: [
    {
      id: 1,
      name: "3 Months",
      originalPrice: {
        price: 2999,
        displayValue: "₹2,999",
      },
      offerPrice: {
        price: 1999,
        displayValue: "₹1,999",
      },
    },
    {
      id: 2,
      name: "6 Months",
      originalPrice: {
        price: 5999,
        displayValue: "₹5,999",
      },
      offerPrice: {
        price: 4999,
        displayValue: "₹4,999",
      },
    },
    {
      id: 3,
      name: "12 Months",
      originalPrice: {
        price: 11999,
        displayValue: "₹11,999",
      },
      offerPrice: {
        price: 9999,
        displayValue: "₹9,999",
      },
    },
  ],
};

export const PROGRAMS = [
  {
    id: 0,
    key: "PCOS_BASIC_PROGRAM",
    title: "PCOS Basic Program",
    inclusions: [
      PROGRAMS_INCLUSION[1],
      PROGRAMS_INCLUSION[2],
      PROGRAMS_INCLUSION[3],
    ],
    plans: PLANS.PCOS_BASIC_PROGRAM,
    color: {
      start: "#f17a93",
      end: "#ffced8",
    },
    imgName: "pcosBasicImg",
  },
  {
    id: 1,
    key: "PCOS_WARRIOR_PROGRAM",
    title: "PCOS Warrior Program",
    inclusions: [
      PROGRAMS_INCLUSION[1],
      PROGRAMS_INCLUSION[2],
      PROGRAMS_INCLUSION[3],
      PROGRAMS_INCLUSION[4],
    ],
    plans: PLANS.PCOS_WARRIOR_PROGRAM,
    color: {
      start: "#6a0085",
      end: "#d298e0",
    },
    imgName: "pcosWarriorImg",
  },
  {
    id: 2,
    key: "AVA_ANDME_PROGRAM",
    title: "Ava &me Program",
    inclusions: [
      PROGRAMS_INCLUSION[0],
      PROGRAMS_INCLUSION[1],
      PROGRAMS_INCLUSION[2],
      PROGRAMS_INCLUSION[3],
      PROGRAMS_INCLUSION[4],
    ],
    plans: PLANS.AVA_ANDME_PROGRAM,
    color: {
      start: "#1071b7",
      end: "#70e6fd",
    },
    imgName: "avaAndMeImg",
  },
];

export default PAGE_TITLE;

export const ProgramNames = [
  { id: 0, name: "ALL" },
  { id: 1, name: "PCOS" },
  { id: 6, name: "FERTILITY" },
  { id: 3, name: "THYROID" },
  { id: 5, name: "DIABETES" },
];

export const programImgs = [
  {
    id: 1,
    title: "PCOS/PCOD",
    src: "/assets/images/programs/pcosProgram.png",
  },
  {
    id: 3,
    title: "THYROID",
    src: "/assets/images/programs/thyroidProgram.png",
  },
  {
    id: 5,
    title: "DIABETES",
    src: "/assets/images/programs/diabetesProgram.png",
  },
  {
    id: 6,
    title: "FERTILITY",
    src: "/assets/images/programs/fertilityProgram.png",
  },
  {
    id: 2,
    title: "GENERAL HEALTH",
    src: "/assets/images/programs/generalHealthProgram.png",
  },
  {
    id: 4,
    title: "WEIGHT LOSS",
    src: "/assets/images/programs/weightLossProgram.png",
  },
];

export const programBenefitsData = [
  {
    id: 1,
    description1: "Doctor consultation",
    description2: "Personalised diet Plan",
    description3: "Unlimited nutritionist consultations",
    description4: "Workout Plan",
    description5: "Unlimited support by Team Ava",
  },
  {
    id: 2,
    description1: "Doctor consultation",
    description2: "Personalised diet Plan",
    description3: "Unlimited nutritionist consultations",
    description4: "Workout Plan",
    description5: "Unlimited support by Team Ava",
  },
  {
    id: 3,
    description1: "Doctor consultation",
    description2: "Personalised diet Plan",
    description3: "Unlimited nutritionist consultations",
    description4: "Workout Plan",
    description5: "Unlimited support by Team Ava",
  },
  {
    id: 4,
    description1: "Doctor consultation",
    description2: "Personalised diet Plan",
    description3: "Unlimited nutritionist consultations",
    description4: "Workout Plan",
    description5: "Unlimited support by Team Ava",
  },
  {
    id: 5,
    description1: "Doctor consultation",
    description2: "Personalised diet Plan",
    description3: "Unlimited nutritionist consultations",
    description4: "Workout Plan",
    description5: "Unlimited support by Team Ava",
  },
  {
    id: 6,
    description1: "Doctor consultation",
    description2: "Personalised diet Plan",
    description3: "Unlimited nutritionist consultations",
    description4: "Workout Plan",
    description5: "Unlimited support by Team Ava",
  },
];
