import { API } from "./../../configAPI"

export const getAllOrder = async token => {
  try {
    const response = await fetch(`${API}/readAllOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getAllOrderLab = async token => {
  try {
    const response = await fetch(`${API}/readOrdertoCheck`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getRecheckOrder = async token => {
  try {
    const response = await fetch(`${API}/readRecheckOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const readOrderById = async (token, idOrders) => {
  const id = {
    idOrders: idOrders,
  }
  try {
    const response = await fetch(`${API}/readOrderById`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const updateDetail = async (token, index) => {
  try {
    const response = await fetch(`${API}/updateOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const reSend = async (token, idOrders) => {
  try {
    const response = await fetch(`${API}/reSend`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(idOrders),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const deleteOrder = async (token, idOrders) => {
  // console.log('deleteOrder id : ' , idOrders)
  try {
    const response = await fetch(`${API}/deleteOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(idOrders),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const readAllSpecificChemById = async (token, idPdSpecificChem) => {
  var id = {
    idPdSpecificChem: idPdSpecificChem,
  }

  try {
    const response = await fetch(`${API}/readAllSpecificChemById`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const readAllSpecificBioById = async (token, idPdSpecificMicro) => {
  var id = {
    idPdSpecificMicro: idPdSpecificMicro,
  }

  try {
    const response = await fetch(`${API}/readAllSpecificBioById`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const readTestResultlasted = async (token, idOrders) => {
  const id = {
    idOrders: idOrders,
  }
  try {
    const response = await fetch(`${API}/readTestReportlasted`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const readIdChemCheckbox = async token => {
  try {
    const response = await fetch(`${API}/readIdChemCheckbox`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const readIdMicroCheckbox = async token => {
  try {
    const response = await fetch(`${API}/readIdMicroCheckbox`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const addOrder = async (token, index) => {
  try {
    const response = await fetch(`${API}/addOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

//Test Values
export const Addtestreport = async (token, index) => {
  try {
    const response = await fetch(`${API}/Addtestreport`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

//Recheck
export const Recheck = async (token, index) => {
  // console.log('index recheck : ', index)
  // let data = {
  //     idOrders : index,
  //     ProductName : ProductName
  // }
  try {
    const response = await fetch(`${API}/Recheck`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

//WaitMicro
export const WaitMicro = async (token, index) => {
  // console.log('index recheck : ', index)
  try {
    const response = await fetch(`${API}/WaitMicro`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

//readFG
export const readFG = async (token, index) => {
  // console.log('index recheck : ', index)
  try {
    const response = await fetch(`${API}/readFG`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

//updateFG
export const updateFG = async (token, index) => {
  // console.log('index recheck : ', index)
  try {
    const response = await fetch(`${API}/updateFGadFG`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const addRealtimeOrder = async (token, index) => {
  try {
    const response = await fetch(`${API}/addRealTimeOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}
//daily Report
export const dailyReportFetch = async (token, index) => {
  try {
    const response = await fetch(`${API}/dailyReport`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const dailyReportBioFetch = async (token, index) => {
  try {
    const response = await fetch(`${API}/dailyReportBio`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

// exportCOA
export const exportCOA = async token => {
  try {
    const response = await fetch(`${API}/exportCOA`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const loadHalalLogo = async token => {
  try {
    const response = await fetch(`${API}/loadHalalLogo`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const UpdatexportCOA = async (token, index) => {
  try {
    const response = await fetch(`${API}/UpdatexportCOA`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const UpdatexportPASS = async (token, index) => {
  try {
    const response = await fetch(`${API}/UpdatexportPASS`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const UpdateStatusPassToCheck = async (token, index, ProductName) => {
  let data = {
    idOrders: index,
    ProductName: ProductName,
  }
  try {
    const response = await fetch(`${API}/UpdateStatus/PassToCheck`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getCustomers = async token => {
  try {
    const response = await fetch(`${API}/getCustomers`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const Reprocess = async (token, index) => {
  try {
    const response = await fetch(`${API}/Reprocess`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const UpdateDatailOrder = async (token, index) => {
  try {
    const response = await fetch(`${API}/UpdateDatailOrder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}

// queryDetailMulti
export const queryDetailMulti = async (token, index) => {
  try {
    const response = await fetch(`${API}/queryDetailMulti`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(index),
    })
    return await response.json()
  } catch (err) {
    return console.log(err)
  }
}
