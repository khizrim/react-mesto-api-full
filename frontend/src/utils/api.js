class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async getUserData() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._getResponseData(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._getResponseData(res);
  }

  async editUserData({ name, about }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
    return this._getResponseData(res);
  }

  async changeCardLikeStatus(id, isLiked) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE': 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._getResponseData(res);
  }

  async removeCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._getResponseData(res);
  }

  async addCard({ name, link }) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
  'https://api.mesto.khizrim.ru',
);

export default api;
