export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_VERSION_URL = API_BASE_URL + "/api/v1";
export const API_VERSION_TWO_URL = API_BASE_URL + "/api/v2";
export const TRIBE_BASE_URL = process.env.REACT_APP_TRIBE_BASE_URL;
export const TRIBE_LOGIN_REDIRECTION_URL = (token) =>
  `${TRIBE_BASE_URL}/auth/sso?ssoToken=${token}&redirect=/`;

export const LS_ACCESS_TOKEN = "accessToken";
export const LS_TOKEN_EXPIRY = "expiry";
export const LATEST_MESSAGE_ID = "latestMessageId";
export const LAST_GROUP_ID = "lastGroupId";
export const FCM_TOKEN = "fcmToken";

export const GROUP_TYPE = {
  CONSULTATION: "CONSULTATION",
  PROGRAM: "PROGRAM",
};

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCFfTB3Eyhd03l61mbSvSqsJsp0xEp6RvE",
  authDomain: "inspired-micron-277104.firebaseapp.com",
  databaseURL: "https://inspired-micron-277104.firebaseio.com",
  projectId: "inspired-micron-277104",
  storageBucket: "inspired-micron-277104.appspot.com",
  messagingSenderId: "48736844865",
  appId: "1:48736844865:web:521fd127fcda22983f1ac0",
};

export const CONSULTATION_STATUS = {
  INITIALIZED: "INITIALIZED",
  PROFILE_COMPLETED: "PROFILE_COMPLETED",
  CONSULTING: "CONSULTING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const PROGRAM_STATUS = {
  PENDING: "PENDING",
  PROFILE_COMPLETED: "PROFILE_COMPLETED",
  ASSIGNED: "ASSIGNED",
  COMPLETED: "COMPLETED",
};

export const ACTIVITY_TYPES = {
  CARDIO: "CARDIO",
  STRENGTH: "STRENGTH",
  FLEXIBILITY: "FLEXIBILITY",
  YOGA: "YOGA",
  WARM_UP: "WARM UP",
  STRETCHES: "STRETCHES",
  MOBILITY: "MOBILITY",
  COOL_DOWN: "COOL DOWN",
  AB_TRAINING: "AB TRAINING",
  LOWER_BODY: "LOWER BODY",
  UPPER_BODY: "UPPER BODY",
};

export const MEAL_TIMINGS = {
  PRE_WORKOUT_SNACK: "PRE WORKOUT SNACK",
  POST_WORKOUT_SNACK: "POST WORKOUT SNACK",
  BREAKFAST: "BREAKFAST",
  MID_MEAL_SNACK: "MID MEAL SNACK",
  LUNCH: "LUNCH",
  EVENING_SNACK: "EVENING SNACK",
  DINNER: "DINNER",
};

export const RECIPE_TYPE = {
  BREAKFAST: "BREAKFAST",
  BREADS: "BREADS",
  LUNCH: "LUNCH",
  DINNER: "DINNER",
  BEVERAGES: "BEVERAGES",
  DESSERT: "DESSERT",
  MAIN_COURSE: "MAIN COURSE",
};

export const RECIPE_PREPARATION_COMPLEXITY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

export const MEASUREMENT_UNITS = {
  GM: "GM",
  PIECE: "Piece",
  GLASS: "Glass",
  KATORI: "Katori",
  CUP: "Cup",
  BOWL: "Bowl",
};

export const GOAL_TYPES = {
  SUGAR: "SUGAR",
  GLUTEN: "GLUTEN",
  DAIRY: "DAIRY",
  WATER: "WATER",
  WEIGHT_LOSS: "WEIGHT LOSS",
};

export const GOAL_UNITS = {
  TSP: "TSP",
  GMS: "GMS",
  MI: "MI",
  GLASSES: "GLASSES",
  KGS: "KGS",
  MINUTES: "MINUTES",
};

export const QUESTION_TYPE = {
  TEXT_INPUT: "TEXT_INPUT",
  NUMBER_INPUT: "NUMBER_INPUT",
  SELECT: "SELECT",
  YEAR_SELECT: "YEAR_SELECT",
  DATE_SELECT: "DATE_SELECT",
  SELECT_WITH_OTHER: "SELECT_WITH_OTHER",
  MULTIPLE_TEXT_INPUT: "MULTIPLE_TEXT_INPUT",
  MULTIPLE_NUMBER_SELECT: "MULTIPLE_NUMBER_SELECT",
  RADIO_WITH_OTHER: "RADIO_WITH_OTHER",
  RADIO: "RADIO",
  TIME_RANGE: "TIME_RANGE",
  CONSENT: "CONSENT",
};

export const BASIC_QUESTIONS = [
  {
    id: "name",
    question: "What is your name?",
    questionType: QUESTION_TYPE.MULTIPLE_TEXT_INPUT,
    labels: [
      { label: "First Name", name: "first_name" },
      { label: "Last Name", name: "last_name" },
    ],
  },
  {
    id: "dob",
    question: "What's your Date of Birth?",
    questionType: QUESTION_TYPE.DATE_SELECT,
    label: { label: "Date of Birth", name: "date_of_birth" },
  },
  {
    id: "height",
    question: "What is your height?",
    questionType: QUESTION_TYPE.MULTIPLE_NUMBER_SELECT,
    labels: [
      { label: "Ft", name: "height_feet", options: [3, 4, 5, 6, 7, 8] },
      {
        label: "In",
        name: "height_inch",
        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    id: "weight",
    question: "What is your current Weight (in Kgs)?",
    questionType: QUESTION_TYPE.NUMBER_INPUT,
    label: { label: "Weight", name: "weight" },
  },
  {
    id: "waist",
    question: "What is your Waist Circumference (in cms)?",
    hint:
      "Inch tape around the narrowest part of your waist just above the umbilicus",
    questionType: QUESTION_TYPE.NUMBER_INPUT,
    optional: true,
    label: { label: "Waist", name: "waist" },
  },
  {
    id: "hip",
    question: "What is your Hip Circumference (in cms)?",
    hint: "Inch tape around the widest portion of buttocks",
    questionType: QUESTION_TYPE.NUMBER_INPUT,
    optional: true,
    label: { label: "Hip", name: "hip" },
  },
  {
    id: "symptom",
    question: "Which of the below PCOS symptoms do you have?",
    questionType: QUESTION_TYPE.SELECT,
    options: [
      "Hair loss",
      "Pigmentation",
      "Irregular periods",
      "Acne",
      "Hirsutism",
    ],
    label: { label: "Symptoms", name: "symptoms" },
  },
  {
    id: "lifestyle_disorder",
    question:
      "Are you currently suffering from any other lifestyle disorder apart from PCOS?",
    questionType: QUESTION_TYPE.SELECT_WITH_OTHER,
    options: [
      "Pre-diabetes",
      "Thyroid",
      "High Blood Pressure",
      "Low Blood Pressure",
      "Cholesterol or Triglyceride issues",
      "Anaemia",
      "Nutrient deficiencies",
    ],
    label: { label: "Disorder", name: "lifestyle_disorder" },
  },
  {
    id: "medication",
    question: "Are you on any medications currently?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "Medicine", name: "medication" },
  },
];

export const DIET_QUESTIONS = [
  {
    id: "diet",
    question: "Which of the below defines your diet the best?",
    questionType: QUESTION_TYPE.RADIO_WITH_OTHER,
    label: { label: "Diet Type", name: "diet_type" },
    options: ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"],
  },
  {
    id: "food_allergy",
    question: "Are you allergic to any foods? If yes, please specify:",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "Allergies", name: "food_allergy" },
  },
  {
    id: "gastric_issues",
    question: "Do you suffer from any gastric issues?",
    questionType: QUESTION_TYPE.SELECT,
    options: ["Acidity", "Constipation", "Bloating", "Loose stools"],
    label: { label: "Gastric Issues", name: "gastric_issues" },
    optional: true,
    optionalText: "None",
  },
  {
    id: "work_timings",
    question: "What are your work timings or college timings?",
    questionType: QUESTION_TYPE.TIME_RANGE,
    label: { label: "Work Timings", name: "work_timings" },
  },
  {
    id: "sleep_timings",
    question: "What are your sleep timings?",
    questionType: QUESTION_TYPE.TIME_RANGE,
    label: { label: "Sleep Timings", name: "sleep_timings" },
  },
  {
    id: "eat_early_morning",
    question: "What do you eat for Early Morning?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Food", name: "eat_early_morning" },
  },
  {
    id: "eat_breakfast",
    question: "What do you eat for Breakfast?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Food", name: "eat_breakfast" },
  },
  {
    id: "eat_mid_morning",
    question: "What do you eat for Mid Morning?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Food", name: "eat_mid_morning" },
  },
  {
    id: "eat_tea_snacks",
    question: "What do you eat for Tea & Snaks?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Food", name: "eat_tea_snacks" },
  },
  {
    id: "eat_dinner",
    question: "What do you eat for Dinner?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Food", name: "eat_dinner" },
  },
  {
    id: "eat_bed_time",
    question: "What do you eat at Bed Time?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Food", name: "eat_bed_time" },
  },
  {
    id: "junk_food",
    question: "How often do you eat junk food?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Never", "Less than 3 days a week", "More than 3 days a week"],
    label: { label: "Eat Junk", name: "eat_junk_food" },
  },
  {
    id: "activity_level",
    question: "How would you define your activity level?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["I don't move", "Moderately active", "Excercise regularly"],
    label: { label: "Activity Level", name: "activity_level" },
  },
];

export const GYNAECOLOGY_QUESTIONS = [
  {
    id: "first_period",
    question: "Which year did you get your first period?",
    questionType: QUESTION_TYPE.YEAR_SELECT,
    label: { label: "First Period", name: "first_period" },
  },
  {
    id: "last_period",
    question: "What was the date of your last period?",
    questionType: QUESTION_TYPE.DATE_SELECT,
    label: { label: "Last Period", name: "last_period" },
  },
  {
    id: "period_regularity",
    question: "Over the past 12 months have your periods been:",
    hint:
      "Regular: The time between periods is usually about the same length.<br></br> Irregular: The length of time between periods often changes",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Regular", "Irregular"],
    label: { label: "Period Regularity", name: "period_regularity" },
  },
  {
    id: "cycle_length",
    question:
      "What is the usual number of days from the first day of bleeding at one period to the first day of bleeding at your next period?",
    hint: "Cycle Length",
    questionType: QUESTION_TYPE.RADIO,
    options: ["<21 days", "21-45 days", ">45 days", ">60 days"],
    label: { label: "Cycle Length", name: "cycle_length" },
  },
  {
    id: "bleed_days_count",
    question: "How many days do you bleed?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["<3 days", "3-5 days", "5-7 days", ">7 days"],
    label: { label: "Days you bleed", name: "bleed_days_count" },
  },
  {
    id: "spotting_periods",
    question: "How many spotting in between periods?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No", "Maybe"],
    label: { label: "Spotting", name: "spotting_periods" },
  },
  {
    id: "bleeding_clots",
    question: "Does your bleeding contain clots?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Clots", name: "bleeding_clots" },
  },
  {
    id: "period_uncomforts",
    question:
      "What is it about the period that causes you to feel uncomfortable?",
    questionType: QUESTION_TYPE.SELECT_WITH_OTHER,
    options: ["Too painful", "Blood flow too heavy", "Nausea", "Vomiting"],
    label: { label: "Period UnComforts", name: "period_uncomforts" },
  },
  {
    id: "period_pain_medication",
    question: "If you have period pain do you take medication?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Period Medication", name: "period_pain_medication" },
  },
  {
    id: "period_symptoms",
    question:
      "Over the past 12 months, have you experienced any of the following symptoms in relation to your monthly period cycle?",
    questionType: QUESTION_TYPE.SELECT,
    options: [
      "Irritability",
      "Mood Swings",
      "Anxiety/Tension",
      "Depression",
      "Feeling out of control",
      "Sleep disturbances",
      "Appetite changes",
      "Poor Concentration",
      "Decreased interest",
      "Social Withdrawal",
      "Swelling",
      "Breast tenderness",
      "Aches down the legs",
      "Headache",
      "Bloating, weight gain",
      "Lower abdominal pain",
    ],
    label: { label: "Period Symptoms", name: "period_symptoms" },
  },
  {
    id: "oral_contraceptive_pills",
    question: "Are you taking oral contraceptive pills, and for how long?",
    hint:
      "These are commonly given as 21 day pills to be taken continuously every cycle",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "How Long", name: "oral_contraceptive_pills" },
  },
  {
    id: "surgeries",
    question: "Have you undergone any surgeries in the past, which one?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "Past Surgeries", name: "surgeries" },
  },
];

export const SKIN_QUESTIONS = [
  {
    id: "skin_concern",
    question: "What is your skin concern?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "Skin Concern", name: "skin_concern" },
  },
  {
    id: "skin_concern_time",
    question: "How long have you had it?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    label: { label: "How Long", name: "skin_concern_time" },
  },
  {
    id: "acne",
    question: "Do you have acne?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No", "Maybe"],
    label: { label: "Acne", name: "acne" },
  },
  {
    id: "excessive_hair_growth",
    question: "Do you exhibit unwanted or excessive hair growth in your body?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Hair Growth", name: "excessive_hair_growth" },
  },
  {
    id: "excessive_hair_loss",
    question: "Are you suffering from excessive hair loss?",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Hair Loss", name: "excessive_hair_loss" },
  },
  {
    id: "past_treatment",
    question:
      "Have you taken any treatment in the past for the same?Or are on any treatment currently?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "Treatment", name: "past_treatment" },
  },
  {
    id: "other_medical_issues",
    question: "Do you have any other medical issues?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "Medical Issues", name: "other_medical_issues" },
  },
  {
    id: "any_medical_allergies",
    question: "Do you have any medical allergies?",
    questionType: QUESTION_TYPE.TEXT_INPUT,
    optional: true,
    optionalText: "No",
    label: { label: "Medical Allergies", name: "any_medical_allergies" },
  },
  {
    id: "blood_tests",
    question: "Have you gotten any blood tests/scans done recently?",
    hint: "If yes, please send them to us.",
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Blood Tests", name: "blood_tests" },
  },
];

export const CONSENT_QUESTION_IDS = {
  CONSULTATION_FOR: "consultation_for",
  SPEAKING_TO: "speaking_to",
};

export const CONSENT_INITIAL_QUESTIONS = [
  {
    id: CONSENT_QUESTION_IDS.CONSULTATION_FOR,
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Consultation for", name: "consultation_for" },
  },
  {
    id: CONSENT_QUESTION_IDS.SPEAKING_TO,
    questionType: QUESTION_TYPE.RADIO,
    options: ["Yes", "No"],
    label: { label: "Speaking to", name: "speaking_to" },
  },
];

export const CONSENT_NO_QUESTIONS = [
  {
    id: "name",
    question: "What is your name?",
    questionType: QUESTION_TYPE.MULTIPLE_TEXT_INPUT,
    labels: [
      { label: "First Name", name: "first_name" },
      { label: "Last Name", name: "last_name" },
    ],
  },
  {
    id: "dob",
    question: "What's your Date of Birth?",
    questionType: QUESTION_TYPE.DATE_SELECT,
    label: { label: "Date of Birth", name: "date_of_birth" },
  },
  {
    id: "gender",
    question: "What's your Gender?",
    questionType: QUESTION_TYPE.RADIO,
    label: { label: "Gender", name: "gender" },
    options: ["FEMALE", "MALE", "OTHER"],
  },
];

export const DEPARTMENTS = {
  GYNAECOLOGIST: 1,
  DERMATOLOGIST: 2,
  NUTRITIONIST: 3,
  "FITNESS EXPERT": 4,
  PSYCHIATRIST: 5,
  "CLINICAL PSYCHOLOGIST": 6,
  ENDOCRINOLOGIST: 7,
  PSYCHATRIST: 8,
};
