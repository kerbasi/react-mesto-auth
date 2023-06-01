export const BASE_URL = "https://auth.nomoreparties.co/";

const getResponseData = (res, status) => {
  if (!res.ok || (status && res.status !== status)) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const request = (endPoint, options, status) => {
  return fetch(`${BASE_URL + endPoint}`, options).then((res) =>
    getResponseData(res, status)
  );
};

export const register = (email, password) => {
  return request(
    "signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
    201
  );
};

export const login = (email, password) => {
  return request(
    "signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
    200
  );
};

export const tokenCheck = (token) => {
  return request(
    "users/me",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    200
  );
};
