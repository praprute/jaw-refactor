import { API } from "./../configAPI"

export const getAllHeaderCoa1Task = async token => {
  try {
    const response = await fetch(`${API}/listHeaderCoa1`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const saveHeaderCoa1Task = async (token, payload) => {
  try {
    const response = await fetch(`${API}/saveHeaderCoa1`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getAllHeaderCoa2Task = async token => {
  try {
    const response = await fetch(`${API}/listHeaderCoa2`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const saveHeaderCoa2Task = async (token, payload) => {
  try {
    const response = await fetch(`${API}/saveHeaderCoa2`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getAllHeaderCoa3Task = async token => {
  try {
    const response = await fetch(`${API}/listHeaderCoa3`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const saveHeaderCoa3Task = async (token, payload) => {
  try {
    const response = await fetch(`${API}/saveHeaderCoa3`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getAllHeaderCoa4Task = async token => {
  try {
    const response = await fetch(`${API}/listHeaderCoa4`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const saveHeaderCoa4Task = async (token, payload) => {
  try {
    const response = await fetch(`${API}/saveHeaderCoa4`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    return response.json()
  } catch (err) {
    return console.log(err)
  }
}


export const getAllHeaderCoa5Task = async token => {
    try {
      const response = await fetch(`${API}/listHeaderCoa5`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
  
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }
  
  export const saveHeaderCoa5Task = async (token, payload) => {
    try {
      const response = await fetch(`${API}/saveHeaderCoa5`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
  
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }
  