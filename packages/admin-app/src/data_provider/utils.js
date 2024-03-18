function getCreateResourceUrl(apiUrl, resource, data) {
  if (resource === "tags") {
    resource = "community/tags";
  } else if (resource === "user_programs") {
    if (data.type === "capture") {
      return `${apiUrl}/plans/users/${data.program_init_id}/payment/capture`;
    }
  }
  return `${apiUrl}/${resource}`;
}

function getListResourceUrl(apiUrl, resource, params) {
  const { page, perPage } = params.pagination;
  const { order, field } = params.sort;
  let query = "";
  Object.keys(params.filter).forEach((key) => {
    query += `&${key}=${encodeURIComponent(params.filter[key])}`;
  });
  if (order) {
    query += `&direction=${encodeURIComponent(order)}`;
  }
  if (field) {
    query += `&order_by=${encodeURIComponent(field)}`;
  }
  let _resource = resource;
  switch (resource) {
    case "tags":
      _resource = "community/tags";
      break;
    case "posts":
      _resource = "community/posts";
      break;
    default:
      _resource = resource;
  }
  return `${apiUrl}/${_resource}?page=${page - 1}&size=${perPage}${query}`;
}

function getOneResourceUrl(apiUrl, resource, params) {
  let _resource = resource;
  switch (resource) {
    case "tags":
      _resource = "community/tags";
      break;
    case "posts":
      _resource = "community/posts";
      break;
    default:
      _resource = resource;
  }
  return `${apiUrl}/${_resource}/${params.id}`;
}

function getManyReferenceResourceUrl(apiUrl, resource, params) {
  let _resource = resource;
  switch (resource) {
    case "comments":
      _resource = `community/posts/${params.id}/comments`;
      break;
    case "calls":
      _resource = `consultations/${params.id}/calls`;
      break;
    default:
      _resource = resource;
  }
  const { page, perPage } = params.pagination;
  return `${apiUrl}/${_resource}?page=${page - 1}&size=${perPage}`;
}

function getListData(resource, json) {
  if (resource === "departments") {
    return json;
  } else if (resource === "posts") {
    return json.posts;
  } else if (resource === "comments") {
    return json.comments;
  }
  return json.data;
}

function updateHttp(apiUrl, resource, params) {
  let url = `${apiUrl}/${resource}/${params.id}`;
  const options = {};
  options.method = "PUT";
  if (resource === "service_providers" && params.updateType === "image") {
    url = `${apiUrl}/user/SERVICE_PROVIDER/${params.id}/profile/image`;
    options.method = "POST";
    options.body = params.data;
    options.headers = { upload_type: "image" };
    return {
      url,
      options,
    };
  }
  options.body = JSON.stringify(params.data);
  if (
    resource === "service_providers" &&
    params.data.updateType === "activate"
  ) {
    url = `${apiUrl}/${resource}/${params.id}/activate`;
  } else if (resource === "posts" && params.data.updateType === "approve") {
    resource = "community/posts";
    url = `${apiUrl}/${resource}/${params.id}/approve`;
  } else if (
    resource === "user_programs" &&
    params.data.updateType === "activate"
  ) {
    url = `${apiUrl}/${resource}/${params.id}/activate`;
  } else if (
    resource === "calls" &&
    params.data.updateType === "status"
  ) {
    url = `${apiUrl}/consultations/${params.data.consultation_id}/${resource}/${params.id}/status`;
  }
  return {
    url,
    options,
  };
}

module.exports = {
  getCreateResourceUrl,
  getListResourceUrl,
  getOneResourceUrl,
  getManyReferenceResourceUrl,
  getListData,
  updateHttp,
};
