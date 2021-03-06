import { Toast } from 'native-base';
const api_base_url = 'https://bzaar-api.herokuapp.com/bzaar/api';

const headers = function(jwt) {
  return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${jwt}`
  }
};

export let ApiUtils = {

  headers: function(jwt) {
    return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    }
  },

  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let message = JSON.parse(response._bodyText).error;
      throw new Error(message);
    }
  },

  request: function(endpoint, jwt, method = 'GET') {
    return fetch(`${api_base_url}/${endpoint}`, {
      headers: this.headers(jwt),
      method: method,
    })
    .then(this.checkStatus)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {throw error;});
  },

  error: function(message){
    Toast.show({
        type: 'danger',
        text: message,
        duration: 3000,
        position: 'bottom',
        buttonText: 'Okay'
      });
  },

}

export let UserService = {
	login: function(email, password) {
		return fetch(`${api_base_url}/signin`, {
		  method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
		.then(ApiUtils.checkStatus)
		.then((response) => response.json())
		.then((json) => json)
		.catch((error) => {throw error;})
	},

  register: function(email, name, password) {
    return fetch(`${api_base_url}/signup`, {
		  method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({user: {
        email,
        name,
        surname: 'teste',
        password,
      }})
    })
		.then(ApiUtils.checkStatus)
		.then((response) => response.json())
		.then((json) => {console.log(json);return json})
		.catch((error) => {throw error;})
  }
}
