export const moduleDescription = {
  BMI: " BMI is an estimate of body fat and a good gauge of your risk for diseases that can occur with more body fat.",
  "Menstrual Health":
    " Menstrual health can help us identify conditions like PCOS, Hormonal imbalance, Endometriosis etc.",
  "Hormone Health":
    "Hormonal health is important to maintain various aspects of your wellbeing. We look at the 5 major hormones.",
  "Nutritional Health":
    "The very core of our wellbeing is defined in the nutritional choices that we make daily. ",
  "Mental health":
    "Having an impaired mental health can have a major impact on Hormonal wellbeing causing conditions like PCOS, Thyroid etc",
  "Screening health":
    "The most ignored but important aspect of a woman &apos; s health is to be regular with screening and diagnostic health",
};

export const localStorageKeys = {
  currentStep: "currentStep",
  healthScoreModules: "healthScoreModules",
  currentHealthScore: "healthScore",
  bmiModuleResponse: "bmiModuleResponse",
  bestHealthScore: "bestHealthScore",
  healthScoreResult: "healthScoreResult",
};

export const healthScoreResultPageUrl = "/user/health-score/result";

export const getScoreByBmi = (bmiValue) => {
  let score;
  if (bmiValue < 18.5) {
    score = (18.5 - bmiValue) * -1;
  } else if (18.5 <= bmiValue && bmiValue < 25) {
    score = 10;
  } else if (25 <= bmiValue && bmiValue < 30) {
    score = (bmiValue - 24.9) * -1;
  } else {
    score = (bmiValue - 24.9) * -2;
  }
  return Math.round(score);
};

export const convertFootToFtInch = (ftValue) => {
  const ftNumber = Math.floor(ftValue);
  const inchNumber = Math.round((ftValue - ftNumber) * 12);
  return { ftNumber, inchNumber };
};

export const convertFtInchToFeet = (ftValue, InchValue) => {
  const footValue = ftValue + InchValue * 0.0833333;
  return Math.round(footValue * 10) / 10;
};

export const calculateBmi = (weight, weightUnit, height, heightUnit) => {
  let weightInKg;
  let heightInMtr;
  if (weightUnit === "kg") {
    weightInKg = weight;
  } else {
    weightInKg = weight * 0.453592;
  }
  if (heightUnit === "cm") {
    heightInMtr = height / 100;
  } else {
    heightInMtr = (height * 30.48) / 100;
  }
  return weightInKg / (heightInMtr * heightInMtr);
};

export const heightUnits = ["cm", "ft"];
export const weightUnits = ["kg", "pound"];
export const kgMarks = [
  {
    value: 40,
    label: "40",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 120,
    label: "120",
  },
  {
    value: 140,
    label: "140",
  },
];

export const poundMarks = [
  {
    value: 80,
    label: "80",
  },
  {
    value: 120,
    label: "120",
  },
  {
    value: 160,
    label: "160",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 240,
    label: "240",
  },
  {
    value: 280,
    label: "280",
  },
  {
    value: 320,
    label: "320",
  },
];

export const cmMarks = [
  {
    value: 140,
    label: "140",
  },

  {
    value: 160,
    label: "160",
  },

  {
    value: 180,
    label: "180",
  },

  {
    value: 200,
    label: "200",
  },
];

export const ftMarks = [
  {
    value: 4.5,
    label: "4.5",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 5.5,
    label: "5.5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 6.5,
    label: "6.5",
  },
];

export const modifyDataForPostApi = (moduleData) => {
  moduleData.forEach(({ questions }) => {
    questions.forEach((question) => {
      question.selected_options = [Number(question.optionSelected)];
      delete question.optionSelected;
    });
  });

  return moduleData;
};

export const cleanLocalStorageAfterSubmit = () => {
  const removableKeys = [
    localStorageKeys.bestHealthScore,
    localStorageKeys.bmiModuleResponse,
    localStorageKeys.currentStep,
    localStorageKeys.currentHealthScore,
    localStorageKeys.healthScoreModules,
    localStorageKeys.bmiModuleResponse,
  ];
  removableKeys.forEach((k) => localStorage.removeItem(k));
};

export const cleanPreviousHealthScoreResults = () => {
  const removableKeys = [
    localStorageKeys.bestHealthScore,
    localStorageKeys.bmiModuleResponse,
    localStorageKeys.currentStep,
    localStorageKeys.currentHealthScore,
    localStorageKeys.healthScoreModules,
    localStorageKeys.bmiModuleResponse,
    localStorageKeys.healthScoreResult,
  ];
  removableKeys.forEach((k) => localStorage.removeItem(k));
};

export const getResultData = (resultResponse, resultKeysInApiResponse) => {
  return {
    healthScore: resultResponse[resultKeysInApiResponse.totalScore],
    bestHealthScore: resultResponse[resultKeysInApiResponse.totalBestScore],
    moduleScore: [
      {
        moduleName: "BMI health",
        bestScore: Number(
          resultResponse[resultKeysInApiResponse.bmiModuleBestScore]
        ),
        moduleScore: Number(
          resultResponse[resultKeysInApiResponse.bmiModuleScore]
        ),
        tipsText: "Switching to a hormone friendly diet to get regular periods",
        moduleImage:
          "/assets/images/healthScore/htModuleIcons/padWithCalender.svg",
      },
      {
        moduleName: "Menstrual health",
        bestScore: Number(
          resultResponse[resultKeysInApiResponse.menstrualHealthBestScore]
        ),
        moduleScore: Number(
          resultResponse[resultKeysInApiResponse.menstrualHealthScore]
        ),
        tipsText:
          "Irregular, Prolonged, Scanty or Spotty periods can be a sign of a hidden hormonal/gynaecological condition.",
        moduleImage:
          "/assets/images/healthScore/htModuleIcons/padWithCalender.svg",
      },
      {
        moduleName: "Hormone Health",
        bestScore: Number(
          resultResponse[resultKeysInApiResponse.hormoneHealthBestScore]
        ),
        moduleScore: Number(
          resultResponse[resultKeysInApiResponse.hormoneHealthScore]
        ),
        tipsText:
          "LH, FSH, Prolactin, Testosterone, Ghrelin & Insulin are the most important hormones that affect a woman's overall wellbeing.",
        moduleImage:
          "/assets/images/healthScore/htModuleIcons/moleculeStructure.svg",
      },
      {
        moduleName: "Nutritional Health",
        bestScore: Number(
          resultResponse[resultKeysInApiResponse.nutritionalHealthBestScore]
        ),
        moduleScore: Number(
          resultResponse[resultKeysInApiResponse.nutritionalHealthScore]
        ),
        tipsText:
          "Switching to a balanced diet can result in reduction of bloating, constipation, tiredness and insulin resistance.",
        moduleImage: "/assets/images/healthScore/htModuleIcons/apple.svg",
      },
      {
        moduleName: "Mental health",
        bestScore: Number(
          resultResponse[resultKeysInApiResponse.mentalHealthBestScore]
        ),
        moduleScore: Number(
          resultResponse[resultKeysInApiResponse.mentalHealthScore]
        ),
        tipsText:
          "Dedicate 30 minutes in the morning for meditation. This improves Focus, Energy levels and promotes better hormonal balance.",
        moduleImage: "/assets/images/healthScore/htModuleIcons/brain.svg",
      },
      {
        moduleName: "Screening health",
        bestScore: Number(
          resultResponse[resultKeysInApiResponse.screeningHealthBestScore]
        ),
        moduleScore: Number(
          resultResponse[resultKeysInApiResponse.screeningHealthScore]
        ),
        tipsText:
          "Screening is the best way to avoid some of the most common disorders and fatal cancers that affect women. Set a screening schedule for yourself!",
        moduleImage: "/assets/images/healthScore/htModuleIcons/testTube.svg",
      },
    ],
  };
};

export const resultKeysInApiResponse = {
  bmiModuleScore: "bmi_module_achieved_score",
  bmiModuleBestScore: "bmi_module_score",
  hormoneHealthScore: "hormone_health_achieved_score",
  hormoneHealthBestScore: "hormone_health_module_score",
  menstrualHealthScore: "menstrual_health_module_achieved_score",
  menstrualHealthBestScore: "menstrual_health_module_score",
  mentalHealthScore: "mental_health_module_achieved_score",
  mentalHealthBestScore: "mental_health_module_score",
  nutritionalHealthScore: "nutritional_health_module_achieved_score",
  nutritionalHealthBestScore: "nutritional_health_module_score",
  screeningHealthScore: "screening_health_achieved_score",
  screeningHealthBestScore: "screening_health_score",
  totalScore: "total_achieved_score",
  totalBestScore: "total_score",
};

export const validateHeight = (heightUnit, heightValue) => {
  if (heightUnit === "cm") {
    if (heightValue < 120) {
      return false;
    }
  } else {
    if (heightValue < 4) {
      return false;
    }
  }
  return true;
};

export const validateWeight = (weightUnit, weightValue) => {
  if (weightUnit === "kg") {
    if (weightValue < 30) {
      return false;
    }
  } else {
    if (weightValue < 60) {
      return false;
    }
  }
  return true;
};
