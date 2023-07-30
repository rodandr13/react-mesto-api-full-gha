class Auth {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _sendRequest({endpoint, method, body, headers = {}}) {
        const options = {
            method: method,
            headers: {...this.headers, ...headers}
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

    register({email, password}) {
        return this._sendRequest({
            endpoint: '/signup',
            method: 'POST',
            body: JSON.stringify({email, password})
        });
    }

    login({email, password}) {
        return this._sendRequest({
            endpoint: '/signin',
            method: 'POST',
            body: JSON.stringify({email, password})
        });
    }

    checkToken(token) {
        return this._sendRequest({
            endpoint: '/users/me',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
    }
});

export default auth;