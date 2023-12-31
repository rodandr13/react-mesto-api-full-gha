class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _sendRequest({ endpoint, method, body }) {
    const jwt = localStorage.getItem('jwt');
    const options = {
      method: method,
      headers: {...this.headers, 'Authorization': `Bearer ${jwt}`}
    };
    if (body) {
      options.body = body;
    }
    const requestUrl = `${this.baseUrl}${endpoint}`;

    return fetch(requestUrl, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Error')
      })
  }

  get(endpoint) {
    return this._sendRequest({endpoint, method: 'GET'})
  }

  post(endpoint, body) {
    return this._sendRequest({
      endpoint,
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  put(endpoint, body) {
    return this._sendRequest({
      endpoint,
      method: 'PUT',
      body: JSON.stringify(body)
    })

  }
  patch(endpoint, body) {
    return this._sendRequest({
      endpoint,
      method: 'PATCH',
      body: JSON.stringify(body)
    })
  }
  delete(endpoint) {
    return this._sendRequest({
      endpoint,
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.put(`/cards/${cardId}/likes`);
    }
    return this.delete(`/cards/${cardId}/likes`);
  }

  setToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    }
  }
}


const api = new Api({
  baseUrl: 'https://api.theory-web.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.setToken();

export default api;