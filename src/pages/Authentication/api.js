import { API } from './../../configAPI'
// const API = "http://localhost:3031/api"

export const Signup = (index) => {
    
    var data = JSON.stringify({
        username:index.username,
        password:index.password
    })
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
          'Access-Control-Allow-Origin':'*',
         },
        body: JSON.stringify(index)
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err)
      })
}

export const signInUser = (index) => {
    var data =  JSON.stringify({
        username: index.usename,
        password: index.password
    })
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(index)
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err)
      })
}

export const authenticate = (index, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("JAWAuth", JSON.stringify(index));
    next();
  }
}

export const isAuthenticated = () => {
  if(typeof window == "undefined") {
    return false
  }
  if(localStorage.getItem('JAWAuth')){
    return JSON.parse(localStorage.getItem('JAWAuth'))
  }else{
    return false
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("JAWAuth");
    return fetch(`${API}/signout`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        "Content-type": "application/json",
      },
      // body: JSON.stringify(index)
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    })
  }
};  //function logout และ Clear localStorage ของ Browser
 