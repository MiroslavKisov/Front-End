const dataService = (() => {
  const baseUrl = 'https://baas.kinvey.com';
  const appId = '';
  const appSecret = '';  

  //Sets the authorization headers
  function createAuthorization(authorization) {
    if(authorization === constants.authorization.basic) {
      return { 'Authorization': `Basic ${btoa(appId + ':' + appSecret)}`};
    } else if(authorization === 'kinvey') {
      return {'Authorization': `Kinvey ${sessionStorage.getItem(constants.session.authtoken)}`};
    } 
  }

  function post(collection, endPoint, data, authorization) {
    return axios({
        method: 'post',
        url: baseUrl + '/' + collection + '/' + appId + '/' + endPoint,
        data: data,
        headers: createAuthorization(authorization),
      });
  }

  function get(collection, endPoint, authorization) {
    return axios({
      method: 'get',
      url: baseUrl + '/' + collection + '/' + appId + '/' + endPoint,
      headers: createAuthorization(authorization),
    });
  }

  function put(collection, endPoint, data, authorization) {
    return axios({
      method: 'put',
      url: baseUrl + '/' + collection + '/' + appId + '/' + endPoint,
      data: data,
      headers: createAuthorization(authorization),
    });
  }

  function remove(collection, endPoint, authorization) {
    return axios({
      method: 'delete',
      url: baseUrl + '/' + collection + '/' + appId + '/' + endPoint,
      headers: createAuthorization(authorization),
    });
  }

  return {
    post,
    get,
    put,
    remove,  
  }
})();