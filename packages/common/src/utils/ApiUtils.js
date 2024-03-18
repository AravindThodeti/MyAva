import { API_VERSION_URL, LS_ACCESS_TOKEN, GROUP_TYPE } from "../constants";

const request = (options) => {
  const headers = new Headers();
  if ("disableContentType" in options) {
  } else {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem(LS_ACCESS_TOKEN)) {
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

export function getConsultants(departmentId) {
  let url = API_VERSION_URL + "/consultancy/consultants";
  if (departmentId) {
    url = `${url}?department_id=${encodeURIComponent(departmentId)}`;
  }
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

export function initiateConsultation(consultantId, slot_start, slot_end) {
  return request({
    url: API_VERSION_URL + `/consultancy/initialize/${consultantId}`,
    method: "POST",
    body: JSON.stringify({ slot_start, slot_end }),
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

export function getConsultationsList(page) {
  let url = API_VERSION_URL + `/consultancy/consultations`;
  if (page) {
    url = `${url}?page=${encodeURIComponent(page)}`;
  }
  return request({
    url,
    method: "GET",
  });
}

export function getGroupByTypeId(typeId, type) {
  return request({
    url: API_VERSION_URL + `/chat/groups/${type}/${typeId}`,
    method: "GET",
  });
}

export function getMessages(groupId, page) {
  let url = API_VERSION_URL + `/chat/groups/${groupId}/messages`;
  if (page) {
    url = `${url}?page=${encodeURIComponent(page)}`;
  }
  return request({
    url,
    method: "GET",
  });
}

export function createTextMessage(groupId, data) {
  return request({
    url: API_VERSION_URL + `/chat/groups/${groupId}/messages`,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function createAttachmentMessage(groupId, data) {
  return request({
    url: API_VERSION_URL + `/chat/groups/${groupId}/messages/attachment`,
    method: "POST",
    body: data,
    disableContentType: true,
  });
}

export function getAttachmentLink(groupId, messageId) {
  return request({
    url:
      API_VERSION_URL +
      `/chat/groups/${groupId}/messages/${messageId}/attachment`,
    method: "GET",
  });
}

export function savePushToken(data) {
  return request({
    url: API_VERSION_URL + "/notifications/push/token",
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getPrograms(ids) {
  let query = "";
  if (ids) {
    query += `&ids=${ids.join(",")}`;
  }
  return request({
    url: API_VERSION_URL + `/programs?${query}`,
    method: "GET",
  });
}

export function getProgramDetail(id) {
  return request({
    url: API_VERSION_URL + `/programs/${id}`,
    method: "GET",
  });
}

export function getPlans(programId, ids) {
  let query = "";
  if (programId) {
    query += `&program_id=${programId}`;
  }
  if (ids) {
    query += `&ids=${ids.join(",")}`;
  }
  const url = API_VERSION_URL + `/plans?${query}`;
  return request({
    url,
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

export function getTribeToken() {
  const url = API_VERSION_URL + "/tribe/token";
  return request({
    url,
    method: "GET",
  });
}

export function createCall(consultationId) {
  const url = API_VERSION_URL + `/consultations/${consultationId}/calls`;
  return request({
    url,
    method: "POST",
  });
}

export function getPrescription(consultationId) {
  return request({
    url: API_VERSION_URL + `/consultations/${consultationId}/prescription`,
    method: "GET",
  });
}

export function getPrescriptionPdfUrl(consultationId, prescriptionId) {
  return request({
    url:
      API_VERSION_URL +
      `/consultations/${consultationId}/prescription/${prescriptionId}`,
    method: "GET",
  });
}