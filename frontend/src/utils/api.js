class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async getUserData() {
    const res = await fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token,
      },
    });
    return this._getResponseData(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token,
      },
    });
    return this._getResponseData(res);
  }

  async editUserData({ name, about }) {
    const res = await fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._getResponseData(res);
  }

  async editUserPic({ link }) {
    const res = await fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
    return this._getResponseData(res);
  }

  async changeCardLikeStatus(id, isLiked) {
    const res = await fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: isLiked ? 'DELETE': 'PUT',
      headers: {
        authorization: this._token,
      },
    });
    return this._getResponseData(res);
  }

  async removeCard(id) {
    const res = await fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    });
    return this._getResponseData(res);
  }

  async addCard({ name, link }) {
    const res = await fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._getResponseData(res);
  }
}

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-19/',
  'eda43623-18db-4cfe-8b09-82de16371212'
);

export default api;
