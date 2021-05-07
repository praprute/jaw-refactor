import { API } from './../../configAPI'

export const getRealTimeOrder = (token) => {
    return fetch(`${API}/readRealTimeOrder`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify({id : farmer})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
// updateCardDS

export const updateCardDS = (token) => {
    return fetch(`${API}/updateCardDS`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify({id : farmer})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const readCardDS = (token) => {
    return fetch(`${API}/readCardDS`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify({id : farmer})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}