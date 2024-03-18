import {
  API_VERSION_URL,
  LS_ACCESS_TOKEN,
  LS_TOKEN_EXPIRY,
  API_BASE_URL,
} from "@ava/common";
import { URL_LOGIN } from "../constants/index";

const API_VERSION_TWO_URL = API_BASE_URL + "/api/v2";

const request = (options) => {
  const headers = new Headers();
  if ("disableContentType" in options) {
  } else {
    headers.append("Content-Type", "application/json");
  }

  if ("openApi" in options) {
  } else {
    if (localStorage.getItem(LS_ACCESS_TOKEN)) {
      if (localStorage.getItem(LS_TOKEN_EXPIRY)) {
        const expiry = new Date(localStorage.getItem(LS_TOKEN_EXPIRY));
        const currentTime = new Date();
        if (currentTime > expiry) {
          localStorage.clear();
          window.location.assign(URL_LOGIN);
        }
      }
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(LS_ACCESS_TOKEN)
      );
    }
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) => {
    if (response.headers.get("Content-Type") === "text/plain;charset=UTF-8") {
      return response.text().then((text) => {
        if (!response.ok) {
          return Promise.reject(text);
        }
        return text;
      });
    } else {
      return response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    }
  });
};

export function getCurrentUser() {
  if (!localStorage.getItem(LS_LS_ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_VERSION_URL + "/user/me",
    method: "GET",
  });
}

export function getCustomerProfile() {
  return request({
    url: API_VERSION_URL + "/user/CUSTOMER/profile",
    method: "GET",
  });
}

export function saveCustomerProfile(id, data) {
  return request({
    url: API_VERSION_URL + `/user/CUSTOMER/${id}/profile`,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCustomerProfile(id, data) {
  var options = {
    method: "PATCH",
    url: `${API_VERSION_URL}/user/CUSTOMER/${id}/profile`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem(LS_ACCESS_TOKEN),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

export function getConsultancyDepartments() {
  return request({
    url: API_VERSION_URL + "/consultancy/departments",
    method: "GET",
  });
}

export function getAllDepartments() {
  return request({
    url: API_VERSION_URL + "/departments?active=1",
    method: "GET",
  });
}

export function getConsultants(departmentId, ids) {
  let query = "";
  if (departmentId) {
    query += `&department_id=${encodeURIComponent(departmentId)}`;
  }
  if (ids) {
    query += `&ids=${encodeURIComponent(ids.join(","))}`;
  }
  const url = API_VERSION_URL + `/consultancy/consultants?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function getSlots(consultantId) {
  return request({
    url: API_VERSION_URL + `/consultancy/slots/${consultantId}`,
    method: "GET",
  });
}

export function initiateConsultation(
  consultantId,
  slot_start,
  slot_end,
  user_program_id
) {
  return request({
    url: API_VERSION_URL + `/consultancy/initialize/${consultantId}`,
    method: "POST",
    body: JSON.stringify({ slot_start, slot_end, user_program_id }),
  });
}

export function getInitiateConsultation(initConsultantationId) {
  return request({
    url: API_VERSION_URL + `/consultancy/initialize/${initConsultantationId}`,
    method: "GET",
  });
}

export function capturePayment(initConsultantationId, paymentId) {
  return request({
    url:
      API_VERSION_URL +
      `/consultancy/${initConsultantationId}/payment/${paymentId}/capture`,
    method: "GET",
  });
}

export function getConsultationsList(page, active, userProgramId) {
  let query = "";
  if (page) {
    query += `&page=${encodeURIComponent(page)}`;
  }
  if (active !== null) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0);
    if (active) {
      query += `&start_date=${encodeURIComponent(startOfDay.toISOString())}`;
    } else {
      query += `&end_date=${encodeURIComponent(startOfDay.toISOString())}`;
    }
  }
  if (userProgramId) {
    query += `&user_program_id=${encodeURIComponent(userProgramId)}`;
  }
  let url = API_VERSION_URL + `/consultancy/consultations?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function getConsultationDetail(id) {
  let url = API_VERSION_URL + `/consultancy/consultations/${id}`;
  return request({
    url,
    method: "GET",
  });
}

export function saveConsultationProfile(id, data) {
  let url = API_VERSION_URL + `/consultancy/consultations/${id}/profile`;
  return request({
    url,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function updateConsultationDepartmentQuestionnaire(id, data) {
  let url =
    API_VERSION_URL +
    `/consultancy/consultations/${id}/department_questionnaire`;
  return request({
    url,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function updateConsultationConsent(id, data) {
  let url = API_VERSION_URL + `/consultancy/consultations/${id}/consent`;
  return request({
    url,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function getCommunityPosts(page, tags, content) {
  console.log("getCommunityPosts", page, tags, content);
  let query = "";
  if (page) {
    query += `&page=${encodeURIComponent(page)}`;
  }
  if (tags) {
    query += `&tags=${encodeURIComponent(tags)}`;
  }
  if (content) {
    query += `&content=${encodeURIComponent(content)}`;
  }
  let url = API_VERSION_URL + `/community/posts?${query}`;
  return request({
    url,
    method: "GET",
    openApi: "openApi",
  });
}

export function createCommunityPosts(data) {
  return request({
    url: API_VERSION_URL + `/community/posts`,
    method: "POST",
    body: data,
    disableContentType: true,
  });
}

export function getCommunityTags(page, name) {
  let query = "";
  if (page) {
    query += `&page=${encodeURIComponent(page)}`;
  }
  if (name) {
    query += `&name=${encodeURIComponent(name)}`;
  }
  let url = API_VERSION_URL + `/community/tags?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function likePost(postId) {
  let url = API_VERSION_URL + `/community/posts/${postId}/like`;
  return request({
    url,
    method: "PUT",
  });
}

export function unLikePost(postId) {
  let url = API_VERSION_URL + `/community/posts/${postId}/unlike`;
  return request({
    url,
    method: "PUT",
  });
}

export function getComments(postId, page) {
  let query = "?";
  if (page) {
    query += `&page=${page}`;
  }
  let url = API_VERSION_URL + `/community/posts/${postId}/comments${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function saveComment(postId, comment) {
  let url = API_VERSION_URL + `/community/posts/${postId}/comments`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify({ comment }),
  });
}

export function initiatePlanPurchase(planId) {
  let url = API_VERSION_URL + `/plans/${planId}/initialize`;
  return request({
    url,
    method: "POST",
  });
}

export function getInitiatePlanPurchase(id) {
  let url = API_VERSION_URL + `/plans/users/initialize/${id}`;
  return request({
    url,
    method: "GET",
  });
}

export function capturePlanPayment(id, paymentId) {
  let url = API_VERSION_URL + `/plans/users/${id}/payment/capture`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify({ payment_id: paymentId }),
  });
}

export function fetchPaymentDetails(id){
  let url = API_VERSION_URL + `/plans/users/payment/paymentDetails/${id}`;
  return request({
    url,
    method: "GET",
  });
}

export function saveUserProgramProfile(id, data) {
  let url = API_VERSION_URL + `/users/programs/${id}/profile`;
  return request({
    url,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function getUserPrograms() {
  let url = API_VERSION_URL + `/user_programs`;
  return request({
    url,
    method: "GET",
  });
}

export function getUserProgramDietPlan(id) {
  let url = API_VERSION_URL + `/user_programs/${id}/diets`;
  return request({
    url,
    method: "GET",
  });
}

export function getUserProgramDietConsumption(id, startDate, endDate) {
  const query = `start=${startDate}&end=${endDate}`;
  const url =
    API_VERSION_URL + `/user_programs/${id}/diets/consumption?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function addUserProgramDietConsumption(id, consumption) {
  const url = API_VERSION_URL + `/user_programs/${id}/diets/consumption`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(consumption),
  });
}

export function getRecipes(ids, page, pageSize, name) {
  let query = "";
  if (page) {
    query += `&page=${page}`;
  }
  if (pageSize) {
    query += `&size=${size}`;
  }
  if (ids) {
    query += `&ids=${encodeURIComponent(ids.join(","))}`;
  }
  if (name) {
    query += `&name=${encodeURIComponent(name)}`;
  }
  const url = API_VERSION_URL + `/recipes?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function getUserProgramWorkoutPlan(id) {
  let url = API_VERSION_URL + `/user_programs/${id}/workouts`;
  return request({
    url,
    method: "GET",
  });
}

export function getUserProgramWorkoutConsumption(id, startDate, endDate) {
  const query = `start=${startDate}&end=${endDate}`;
  const url =
    API_VERSION_URL + `/user_programs/${id}/workouts/consumption?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function addUserProgramWorkoutConsumption(id, consumption) {
  const url = API_VERSION_URL + `/user_programs/${id}/workouts/consumption`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(consumption),
  });
}

export function getActivities(ids, page, pageSize, name) {
  let query = "";
  if (page) {
    query += `&page=${page}`;
  }
  if (pageSize) {
    query += `&size=${size}`;
  }
  if (ids) {
    query += `&ids=${encodeURIComponent(ids.join(","))}`;
  }
  if (name) {
    query += `&name=${encodeURIComponent(name)}`;
  }
  const url = API_VERSION_URL + `/activities?${query}`;
  return request({
    url,
    method: "GET",
  });
}

export function getUserProgramWeight(id) {
  const url = API_VERSION_URL + `/user_programs/${id}/weights`;
  return request({
    url,
    method: "GET",
  });
}

export function addUserProgramWeight(id, weight) {
  const url = API_VERSION_URL + `/user_programs/${id}/weights`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(weight),
  });
}

export function getUserProgramGoals(id, startDate, endDate) {
  let query = "";
  if (startDate) {
    query += `&start_date_after=${startDate}`;
  }
  if (endDate) {
    query += `&end_date_before=${endDate}`;
  }
  const url = API_VERSION_URL + `/user_programs/${id}/goals?${query}`;
  return request({
    url,
    method: "GET",
  });
}

// Program Api's:
export function getPrograms() {
  console.log("getPrograms API_VERSION_URL", API_VERSION_URL);
  const url = API_VERSION_URL + `/programs`;
  return request({
    url,
    method: "GET",
  });
}

export function getPlans() {
  const url = API_VERSION_URL + `/plans?size=100`;
  return request({
    url,
    method: "GET",
  });
}

export function getPlansByProgramsId(programId) {
  const url = API_VERSION_URL + `/plans?program_id=${programId}`;
  return request({
    url,
    method: "GET",
  });
}

export function getPrescription(consultationId) {
  const url = API_VERSION_URL + `/plans?program_id=${consultationId}`;
  return request({
    url,
    method: "GET",
  });
}

/** Health score APIs */
export function getHealthScoreModulesFromDb() {
  const url = API_VERSION_URL + `/healthScore`;
  return request({
    url,
    method: "GET",
  });
}

export function submitHealthScoreResponsesForUser(responseData) {
  const url = API_VERSION_URL + `/healthScoreResult`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(responseData),
  });
}

export function getRecipesByName(name) {
  const query = `&name=${encodeURIComponent(name)}`;
  return request({
    url: API_VERSION_URL + `/recipes?${query}`,
    method: "GET",
  });
}

export function getUserDietPlan(date, dietType) {
  const url =
    API_VERSION_TWO_URL +
    `/user_programs/0/dietsV2?current_day=${date}&dietType=${dietType}`;
  return request({
    url,
    method: "GET",
  });
}

export function createCustomRecipe(customRecipeData) {
  const url = API_VERSION_URL + `/customRecipe`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(customRecipeData),
  });
}

export const trackUserDiet = (sessionData) => {
  const url = API_VERSION_TWO_URL + `/user_programs/0/dietsV2`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(sessionData),
  });
};

export const submitWaterIntake = (data) => {
  const url = API_VERSION_URL + `/waterIntake`;
  return request({
    url,
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getHealthScoreForHomeScreenDashBoard = () => {
  const url = API_VERSION_URL + `/homeScreen/healthScore`;
  return request({
    url,
    method: "GET",
  });
};

export const getDietDataForHomeScreen = (currentDate) => {
  const url =
    API_VERSION_URL +
    `/homeScreen/dietConsistency?current_day=${currentDate}&dietType=VEG`;
  return request({
    url,
    method: "GET",
  });
};

export function getRecipeById(id) {
  return request({
    url: API_VERSION_URL + `/recipes/${id}`,
    method: "GET",
  });
}

export function getSingleSessionStudioData(disease, session) {
  let url =
    API_VERSION_URL +
    `/studio/singleSession?diseaseName=${disease}&sessionName=${session}`;
  return request({
    url,
    method: "GET",
  });
}

export function getExistenceByMobileNumber(mobileNumber) {
  return request({
    url: API_VERSION_URL + `/customers/isCustomerExists/${mobileNumber}`,
    method: "GET",
  });
}
export function getDetailsByMobileNumber(mobileNumber) {
  return request({
    url: API_VERSION_URL + `/customers/getDetails/${mobileNumber}`,
    method: "GET",
  });
}
export function createUserOnOTP(userDetails) {
  return request({
    url: API_VERSION_URL + `/customers/saveCustomerOnOTP`,
    method: `POST`,
    body: JSON.stringify(userDetails),
  });
}

export function updateStudioVideosViews(id) {
  return request({
    url: API_VERSION_URL + `/studio/addView?id=${id}`,
    method: "PUT",
  });
}

export function updateStudioVideosLikes(id) {
  return request({
    url: API_VERSION_URL + `/studio/updateLike?videoId=${id}`,
    method: "PUT",
  });
}

export function createStudioVideosComments(videoComments) {
  return request({
    url: API_VERSION_URL + `/studio/addComment`,
    method: "POST",
    body: JSON.stringify(videoComments),
  });
}

export function getStudioVideosComments(id) {
  return request({
    url: API_VERSION_URL + `/studio/getComments?videoId=${id}`,
    method: "GET",
  });
}

export function getStudioAllSectionData() {
  return request({
    url: API_VERSION_URL + "/studio/all",
    method: "GET",
  });
}

export function getStudioLiveData() {
  return request({
    url: API_VERSION_URL + "/StudioLiveSession/getActiveSessions",
    method: "GET",
  });
}

export function registerForLiveSession(id) {
  return request({
    url: API_VERSION_URL + `/StudioLiveSession/registration/${id}`,
    method: "POST",
  });
}

export function generateOTPForLogin(mobileNumber) {
  return request({
    url: API_VERSION_URL + `/login/OTP/generate`,
    method: "POST",
    body: JSON.stringify(mobileNumber),
  });
}

export function validateOTPForLogin(verifyDetails) {
  return request({
    url: API_VERSION_URL + `/login/OTP/validateAndCheckExistence`,
    method: "POST",
    body: JSON.stringify(verifyDetails),
  });
}

export function periodTrackerQuestions(page,size) {
  return request({
    url:
      API_VERSION_URL +
      `/periodTrackerQuestions?page=${page}&size=${size}&order_by=id&direction=asc`,
    method: "GET",
  });
}
export function periodTrackerResultAPI(){
  return request({
    url:
    API_VERSION_URL +`/periodTrackerCalculation/getPeriodTrackerResult`,
    method: "GET",
  });
}
export function periodTrackerResultExistenceAPI(){
  return request({
    url:
    API_VERSION_URL +`/periodTrackerCalculation/checkExistence`,
    method: "GET",
  });
}
export function savePeriodTrackerResult(periodtrackerDetails) {
  return request({
    url: API_VERSION_URL + `/periodTrackerCalculation/save`,
    method: "POST",
    body: JSON.stringify(periodtrackerDetails),
  });
}
export function deleteProfileApi(){
  return request({
    url: API_VERSION_URL + `/user/Customer/deleteProfile`,
    method:"DELETE",
  })
}
