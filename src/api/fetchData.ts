const BASE_URL = 'https://randomuser.me/api/';

export const getRandomUser = () => {
  return fetch(BASE_URL).then(response => {
    if (!response.ok) {
      throw new Error('Can not load data from server');
    }

    return response.json();
  });
};
