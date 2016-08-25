import { hashHistory } from 'react-router';
import {default as config, updateNonce} from 'config';

const apiHelper = {

  // Generates request params
  requestParams: (method, data = {}) => {
    let params = {
      method: method,
      credentials: 'same-origin'
    }
    // Init nonce
    data.govready_nonce = config.govready_nonce;
    let form_data = new FormData();
    for(let key of Object.keys(data)) {
      form_data.append(key, data[key]);
    }
    params.body = form_data;
    return params;
  },
    
  // Checks response, returns json or error
  responseCheck: (response) => {
    let json;
    // Good?
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    // Just return error
    let error = new Error(response.statusText);
    error.response = response;
    error.error = response.statusText;
    return error;
  },

  // Checks json for embedded errors
  jsonCheck: (json) => {
    let error = new Error();
    // Some error, so create, and return
    if(json === -1 ) { //!json || typeof json !== 'object' || !json.govready_nonce) {
      hashHistory.push('/reload');
      error.error = "Malformed server response";
    }
    else if(json === 'err: unknown' || (typeof json === 'object' && (json.error || json.err))) {
      error.error = json;
    }
    else {
      // updateNonce(json.govready_nonce);
      return;
    }
    return error;
  }
}

export default apiHelper;