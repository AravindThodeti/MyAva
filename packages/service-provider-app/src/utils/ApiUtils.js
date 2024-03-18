import { API_VERSION_URL,API_VERSION_TWO_URL,LS_ACCESS_TOKEN, LS_TOKEN_EXPIRY } from "@ava/common";
import { URL_HOMEPAGE } from "constants/index";
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// export const API_VERSION_TWO_URL = API_BASE_URL + "/api/v2";

const request = (options) => {
  const headers = new Headers();
  if ("disableContentType" in options) {
  } else {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem(LS_ACCESS_TOKEN)) {
    if (localStorage.getItem(LS_TOKEN_EXPIRY)) {
      const expiry = new Date(localStorage.getItem(LS_TOKEN_EXPIRY));
      const currentTime = new Date();
      if (currentTime > expiry) {
        localStorage.clear();
        window.location.assign(URL_HOMEPAGE);
      }
    }
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(LS_ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(LS_ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_VERSION_URL + "/user/me",
    method: "GET",
  });
}

export function getServiceProviderProfile() {
  if (!localStorage.getItem(LS_ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_VERSION_URL + "/user/SERVICE_PROVIDER/profile",
    method: "GET",
  });
}

export function saveProfile(id, data) {
  return request({
    url: API_VERSION_URL + `/user/SERVICE_PROVIDER/${id}/profile`,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function saveSignature(id, data) {
  return request({
    url: API_VERSION_URL + `/user/SERVICE_PROVIDER/${id}/profile/signature`,
    method: "POST",
    body: data,
    disableContentType: true,
  });
}

export function saveImage(id, data) {
  return request({
    url: API_VERSION_URL + `/user/SERVICE_PROVIDER/${id}/profile/image`,
    method: "POST",
    body: data,
    disableContentType: true,
  });
}

export function getDepartments() {
  return request({
    url: API_VERSION_URL + "/departments",
    method: "GET",
  });
}

export function getSchedule() {
  return request({
    url: API_VERSION_URL + "/consultancy/schedule",
    method: "GET",
  });
}

export function saveSchedule(schedule) {
  return request({
    url: API_VERSION_URL + "/consultancy/schedule",
    method: "POST",
    body: JSON.stringify(schedule),
  });
}

export function getConsultations(
  userProgramId,
  page,
  pageSize,
  orderBy,
  direction,
  startDate,
  endDate,
  customerName,
  status,
  userProgramPresent
) {
  let query = "";
  console.log("get consulation api", page);
  if (page) {
    query += `&page=${encodeURIComponent(page)}`;
  }
  if (pageSize) {
    query += `&size=${encodeURIComponent(pageSize)}`;
  }
  if (orderBy) {
    query += `&order_by=${encodeURIComponent(orderBy)}`;
  }
  if (direction) {
    query += `&direction=${encodeURIComponent(direction)}`;
  }
  if (startDate) {
    query += `&start_date=${encodeURIComponent(startDate)}`;
  }
  if (endDate) {
    query += `&end_date=${encodeURIComponent(endDate)}`;
  }
  if (customerName) {
    query += `&customer_name=${encodeURIComponent(customerName)}`;
  }
  if (status) {
    query += `&consultation_status=${encodeURIComponent(status)}`;
  }
  if (userProgramPresent !== undefined && userProgramPresent !== null) {
    query += `&user_program_is_present=${encodeURIComponent(
      userProgramPresent
    )}`;
  }
  if (userProgramId) {
    query += `user_program_id=${encodeURIComponent(userProgramId)}`;
  }
  return request({
    url: API_VERSION_URL + `/consultancy/consultations?${query}`,
    method: "GET",
  });
}

export function getConsultationsV1(
  tabName,
  page,
  startDate,
  endDate
  // pageSize,
  // orderBy,
  // direction,
  // customerName,
  // status,
  // userProgramPresent,
  // userProgramId,
) {
  let query = "";
  console.log("get consulation api", page);
  if (page) {
    query += `page=${encodeURIComponent(page)}`;
  }
  // if (pageSize) {
  //   query += `&size=${encodeURIComponent(pageSize)}`;
  // }
  // if (orderBy) {
  //   query += `&order_by=${encodeURIComponent(orderBy)}`;
  // }
  // if (direction) {
  //   query += `&direction=${encodeURIComponent(direction)}`;
  // }
  if (tabName === "Active") {
    query += `&start_date=${encodeURIComponent(
      startDate
    )}&end_date=${encodeURIComponent(endDate)}`;
  } else {
    if (tabName == "Upcoming") {
      query += `&start_date=${encodeURIComponent(startDate)}`;
    }
    if (tabName == "History") {
      query += `&end_date=${encodeURIComponent(endDate)}`;
    }
  }

  // if (customerName) {
  //   query += `&customer_name=${encodeURIComponent(customerName)}`;
  // }
  // if (status) {
  //   query += `&consultation_status=${encodeURIComponent(status)}`;
  // }
  // if (userProgramPresent !== undefined && userProgramPresent !== null) {
  //   query += `&user_program_is_present=${encodeURIComponent(
  //     userProgramPresent
  //   )}`;
  // }
  // if (userProgramId) {
  //   query += `user_program_id=${encodeURIComponent(userProgramId)}`;
  // }
  return request({
    url: API_VERSION_URL + `/consultancy/consultations?${query}`,
    method: "GET",
  });
}

export function getConsultationDetail(id) {
  return request({
    url: API_VERSION_URL + `/consultancy/consultations/${id}`,
    method: "GET",
  });
}
export function getConsumedDiet(userProgramId,fromDate,toDate){
  return request({
    url: API_VERSION_TWO_URL+`/user_programs/${userProgramId}/dietsV2/sp?fromDate=${fromDate}&toDate=${toDate}&dietType=VEG`,
    method:"GET",
  });
}
export function getPreparedDietPlan(consultationId){
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/dietPlanV2`,
    method:"GET"
  })
}
export function postPreparedDietPlan(consultationId,dietPlanObj){
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/dietPlanV2`,
    body: JSON.stringify(dietPlanObj),
    method:"POST"
  })
}
export function putPreparedDietPlan(consultationId,numberOfDaysToBeAdded,dietPlanObj){
  console.log("at api",numberOfDaysToBeAdded)
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/dietPlanV2?noOfDaysToUpdate=${numberOfDaysToBeAdded}`,
    body: JSON.stringify(dietPlanObj),
    method:"PUT"
  })
}
export function checkActiveDietPlan(consultationId){
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/dietPlanV2/isActivePlanExist`,
    method:"GET"
  })
}

export function getUserPrograms() {
  // page, pageSize, status, customerName
  // let query = "";
  // if (page) {
  //   query += `&page=${encodeURIComponent(page)}`;
  // }
  // if (pageSize) {
  //   query += `&size=${encodeURIComponent(pageSize)}`;
  // }
  // if (status) {
  //   query += `&status=${encodeURIComponent(status)}`;
  // }
  // if (customerName) {
  //   query += `&customer_name=${encodeURIComponent(customerName)}`;
  // }
  return request({
    url: API_VERSION_URL + `/user_programs`,
    method: "GET",
  });
}

export function getUserProgramDetail(id) {
  return request({
    url: API_VERSION_URL + `/user_programs/${id}`,
    method: "GET",
  });
}

export function getPlanDetail(id) {
  const url = API_VERSION_URL + `/plans/${id}`;
  return request({
    url,
    method: "GET",
  });
}

export function getProgramDetail(id) {
  return request({
    url: API_VERSION_URL + `/programs/${id}`,
    method: "GET",
  });
}

// export function getPlanDetail(programId, ids) {
//   let query = "";
//   if (programId) {
//     query += `&program_id=${programId}`;
//   }
//   if (ids) {
//     query += `&ids=${ids}`;
//   }
//   const url = API_VERSION_URL + `/plans?${query}`;
//   return request({
//     url,
//     method: "GET",
//   });
// }

export function getUserProgram(id, page, pageSize) {
  let query = "";
  if (page) {
    query += `&page=${encodeURIComponent(page)}`;
  }
  if (pageSize) {
    query += `&size=${encodeURIComponent(pageSize)}`;
  }
  return request({
    url: API_VERSION_URL + `/user_programs/${id}`,
    method: "GET",
  });
}

export function getRecipes(name, ids) {
  let query = "";
  if (name) {
    query += `&name=${encodeURIComponent(name)}`;
  }
  if (ids) {
    query += `&ids=${ids.join(",")}`;
  }
  return request({
    url: API_VERSION_URL + `/recipes?${query}`,
    method: "GET",
  });
}

export function getRecipesByName(name) {
  const query = `&name=${encodeURIComponent(name)}`;
  return request({
    url: API_VERSION_URL + `/recipes?${query}`,
    method: "GET",
  });
}

export function getConsultationDiet(consultationId) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/diets`,
    method: "GET",
  });
}
export function tableDietPlanEdit(consulationId, modifiedPlan) {
  return request({
    url: API_VERSION_URL + `/consultations/${consulationId}/dietPlanV2/session`,
    method: "PUT",
    body: JSON.stringify(modifiedPlan),
  });
}

export function createConsultationDiet(consultationId, diet) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/diets`,
    method: "POST",
    body: JSON.stringify(diet),
  });
}

export function deleteConsultationDiet(consultationId, dietId) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/diets/${dietId}`,
    method: "DELETE",
  });
}

export function getActivities(name, ids, activityType) {
  let query = "";
  if (name) {
    query += `&name=${encodeURIComponent(name)}`;
  }
  if (ids) {
    query += `&ids=${ids.join(",")}`;
  }
  if (activityType) {
    query += `&activity_type=${activityType}`;
  }
  return request({
    url: API_VERSION_URL + `/activities?${query}`,
    method: "GET",
  });
}

export function getConsultationWorkout(consultationId) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/workouts`,
    method: "GET",
  });
}

export function createConsultationWorkout(consultationId, workout) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/workouts`,
    method: "POST",
    body: JSON.stringify(workout),
  });
}

export function deleteConsultationWorkout(consultationId, workoutId) {
  return request({
    url:
      API_VERSION_URL +
      `/consultations/${consultationId}/workouts/${workoutId}`,
    method: "DELETE",
  });
}

export function createPrescription(consultationId, prescription) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/prescription`,
    method: "POST",
    body: JSON.stringify(prescription),
  });
}

export function getGoals(userProgramId) {
  return request({
    url: API_VERSION_URL + `/user_programs/${userProgramId}/goals`,
    method: "GET",
  });
}

export function createGoal(userProgramId, goal) {
  return request({
    url: API_VERSION_URL + `/user_programs/${userProgramId}/goals`,
    method: "POST",
    body: JSON.stringify(goal),
  });

 
}
