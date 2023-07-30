class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _sendRequest({ endpoint, method, body }) {
    const options = {
      method: method,
      headers: this.headers
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
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e088005e-e78f-4b2a-a43d-652e65680dd5',
    'Content-Type': 'application/json'
  }
});


export default api;