import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "react-admin";
import * as utils from "./utils";

/**
 * Maps react-admin queries to a REST API implemented using Java Spring Boot and Swagger
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    switch (type) {
      case GET_LIST: {
        url = utils.getListResourceUrl(apiUrl, resource, params);
        break;
      }
      case GET_ONE:
        url = utils.getOneResourceUrl(apiUrl, resource, params);
        break;
      case GET_MANY: {
        let idStr = `ids=${params.ids.join()}`;
        url = `${apiUrl}/${resource}?${idStr}`;    
        break;
      }      
      case GET_MANY_REFERENCE: {
        url = utils.getManyReferenceResourceUrl(apiUrl, resource, params);
        break;
      }
      case UPDATE:
        const updateData = utils.updateHttp(apiUrl, resource, params);
        url = updateData.url;
        options.body = updateData.options.body;
        options.method = updateData.options.method;
        break;
      case CREATE:
        url = utils.getCreateResourceUrl(apiUrl, resource, params.data);
        options.method = "POST";
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = "DELETE";
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!json.hasOwnProperty("total")) {
          //throw new Error(
          //"The numberOfElements property must be must be present in the Json response"
          //);
          json.total = utils.getListData(resource, json).length;
        }
        return {
          data: utils.getListData(resource, json),
          total: parseInt(json.total, 10),
        };
      case GET_MANY:
        return {
          data: utils.getListData(resource, json),         
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      default:
        if(resource==="user_programs" && json && json.service_providers){
          const appendedJSON = {...json, service_providers_id: json.service_providers.map(j=>j.service_provider_id)};
          return {data:appendedJSON}
        }
        
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }
    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE",
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options).then((response) =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};
