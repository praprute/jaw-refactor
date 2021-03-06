import { API } from "./../../configAPI"

export const getAllOrder = token => {
  return fetch(`${API}/readAllOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body : JSON.stringify({id : farmer})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const getAllOrderLab = token => {
  return fetch(`${API}/readOrdertoCheck`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const getRecheckOrder = token => {
  return fetch(`${API}/readRecheckOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body : JSON.stringify({id : farmer})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const readOrderById = (token, idOrders) => {
  var id = {
    idOrders: idOrders,
  }
  //   console.log(id)

  return fetch(`${API}/readOrderById`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const updateDetail = (token, index) => {
  // console.log("edit : ", index)
  return fetch(`${API}/updateOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const reSend = (token, idOrders) => {
  return fetch(`${API}/reSend`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(idOrders),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteOrder = (token, idOrders) => {
  // console.log('deleteOrder id : ' , idOrders)
  return fetch(`${API}/deleteOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(idOrders),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const readAllSpecificChemById = (token, idPdSpecificChem) => {
  var id = {
    idPdSpecificChem: idPdSpecificChem,
  }

  return fetch(`${API}/readAllSpecificChemById`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const readAllSpecificBioById = (token, idPdSpecificMicro) => {
  var id = {
    idPdSpecificMicro: idPdSpecificMicro,
  }

  return fetch(`${API}/readAllSpecificBioById`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const readTestResultlasted = (token, idOrders) => {
  var id = {
    idOrders: idOrders,
  }
  //   console.log(id)

  return fetch(`${API}/readTestReportlasted`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const readIdChemCheckbox = token => {
  return fetch(`${API}/readIdChemCheckbox`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body : JSON.stringify(id)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const readIdMicroCheckbox = token => {
  return fetch(`${API}/readIdMicroCheckbox`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body : JSON.stringify(id)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const addOrder = (token, index) => {
  return fetch(`${API}/addOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

//Test Values
export const Addtestreport = (token, index) => {
  return fetch(`${API}/Addtestreport`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

//Recheck
export const Recheck = (token, index) => {
  // console.log('index recheck : ', index)
  // let data = {
  //     idOrders : index,
  //     ProductName : ProductName
  // }
  return fetch(`${API}/Recheck`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

//WaitMicro
export const WaitMicro = (token, index) => {
  // console.log('index recheck : ', index)
  return fetch(`${API}/WaitMicro`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

//readFG
export const readFG = (token, index) => {
  // console.log('index recheck : ', index)
  return fetch(`${API}/readFG`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

//updateFG
export const updateFG = (token, index) => {
  // console.log('index recheck : ', index)
  return fetch(`${API}/updateFGadFG`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const addRealtimeOrder = (token, index) => {
  return fetch(`${API}/addRealTimeOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}
//daily Report
export const dailyReportFetch = (token, index) => {
  return fetch(`${API}/dailyReport`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const dailyReportBioFetch = (token, index) => {
  return fetch(`${API}/dailyReportBio`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

// exportCOA
export const exportCOA = token => {
  return fetch(`${API}/exportCOA`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body : JSON.stringify(index)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const loadHalalLogo = token => {
  return fetch(`${API}/loadHalalLogo`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body : JSON.stringify(index)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const UpdatexportCOA = (token, index) => {
  return fetch(`${API}/UpdatexportCOA`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const UpdatexportPASS = (token, index) => {
  return fetch(`${API}/UpdatexportPASS`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const UpdateStatusPassToCheck = (token, index, ProductName) => {
  let data = {
    idOrders: index,
    ProductName: ProductName,
  }
  return fetch(`${API}/UpdateStatus/PassToCheck`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const getCustomers = token => {
  return fetch(`${API}/getCustomers`, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}
// const fetchDetail = (token, idOrders) => {
//   readTestResultlasted(token, idOrders).then(data => {
//     console.log(' readTestResultlasted :',data)
//     if(data){
//       if(data.success == 'success'){
//         if(!data.message){
//           return null
//         }else{
//           setdetail(data.message)
//           onAddDetail(data.message)
//         }
//       }
//     }else{
//       return null
//     }
//   })
// }UpdatexportCOA

export const Reprocess = (token, index) => {
  return fetch(`${API}/Reprocess`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const UpdateDatailOrder = (token, index) => {
  return fetch(`${API}/UpdateDatailOrder`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

// queryDetailMulti
export const queryDetailMulti = (token, index) => {
  return fetch(`${API}/queryDetailMulti`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(index),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}