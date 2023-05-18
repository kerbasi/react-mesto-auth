class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endPoint, options) {
    return fetch(`${this._baseUrl + endPoint}`, options).then((res) =>
      this._getResponseData(res)
    );
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return this._request("cards", { headers: this._headers });
  }

  getUserInfo() {
    return this._request("users/me", { headers: this._headers });
  }

  setUserInfo({ title, data }) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: data,
      }),
    });
  }

  setCard({ name, link }) {
    return this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(_id) {
    return this._request(`cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(_id) {
    return this._request(`cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike(_id) {
    return this._request(`cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this.removeLike(_id);
    }
    return this.addLike(_id);
  }

  editAvatar(avatar) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "1d6e2ff2-9c18-4685-a3c5-e532faea5955",
    "Content-Type": "application/json",
  },
});

export default api;
