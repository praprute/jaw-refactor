import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalFooter,
} from "reactstrap"
import { Link } from "react-router-dom"
import { API } from "./../../configAPI"
import Moment from "moment"
import { getAllOrder, readOrderById, Reprocess } from "./api"
import { map, result } from "lodash"
import { isAuthenticated } from "./../Authentication/api"
//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const ModalReprocess = props => {
  const {
    isOpenRro,
    orders,
    spc,
    toggleRepro,
    tr,
    redirect,
    handleRedirect,
  } = props
  const { user, token } = isAuthenticated()
  const [detailById, setdetailById] = useState([])
  const [success_msg, setsuccess_msg] = useState(false)
  const [success_error, setsuccess_error] = useState(false)
  const [resultChem, setresultChem] = useState([
    { render: 0, int: false, key: "TN(g/L)", coa: false, val: "" },
    { render: 0, int: false, key: "%Salt(w/v)", coa: false, val: "" },
    { render: 0, int: false, key: "Histamine(ppm)", coa: false, val: "" },
    { render: 0, int: false, key: "PH", coa: false, val: "" },
    { render: 0, int: false, key: "Aw", coa: false, val: "" },
    { render: 0, int: false, key: "Tss(Brix)", coa: false, val: "" },
    { render: 0, int: false, key: "SPG", coa: false, val: "" },
    { render: 0, int: false, key: "AN", coa: false, val: "" },
    { render: 0, int: false, key: "Acidity", coa: false, val: "" },
    { render: 0, int: false, key: "Viscosity", coa: false, val: "" },
    { render: 0, int: false, key: "Salt Meter", coa: false, val: "" },
    { render: 0, int: false, key: "Color", coa: false, val: "" },
  ])
  const [description, setDescription] = useState({
    TN: false,
    Salt: false,
    Histamine: false,
    PH: false,
    Aw: false,
    Tss: false,
    SPG: false,
    AN: false,
    Acidity: false,
    Viscosity: false,
    SaltMeter: false,
    Color: false,
    // "TN(g/L)"
    // "%Salt(w/v)"
    // "Histamine(ppm)"
    // "PH"
    // "Aw"
    // "Tss(Brix)"
    // "SPG"
    // "AN"
    // "Acidity"
    // "Viscosity"
    // "Salt Meter"
    // "Color"
  })

  useEffect(() => {
    // console.log(tr[0])
    // setDescription([])
    if (tr[0] != undefined) {
      setresultChem(tr[0])
      setdetailById(orders)
    } else {
      setresultChem([
        { render: 0, int: false, key: "TN(g/L)", coa: false, val: "" },
        { render: 0, int: false, key: "%Salt(w/v)", coa: false, val: "" },
        { render: 0, int: false, key: "Histamine(ppm)", coa: false, val: "" },
        { render: 0, int: false, key: "PH", coa: false, val: "" },
        { render: 0, int: false, key: "Aw", coa: false, val: "" },
        { render: 0, int: false, key: "Tss(Brix)", coa: false, val: "" },
        { render: 0, int: false, key: "SPG", coa: false, val: "" },
        { render: 0, int: false, key: "AN", coa: false, val: "" },
        { render: 0, int: false, key: "Acidity", coa: false, val: "" },
        { render: 0, int: false, key: "Viscosity", coa: false, val: "" },
        { render: 0, int: false, key: "Salt Meter", coa: false, val: "" },
        { render: 0, int: false, key: "Color", coa: false, val: "" },
      ])
    }
  }, [tr, isOpenRro])

  useEffect(() => {
    // console.log("orders", orders)
    setDescription({
      TN: false,
      Salt: false,
      Histamine: false,
      PH: false,
      Aw: false,
      Tss: false,
      SPG: false,
      AN: false,
      Acidity: false,
      Viscosity: false,
      SaltMeter: false,
      Color: false,
    })
  }, [orders.idOrders])

  const handleReprocess = async () => {
    // function getAr(array) {
    //   let uniqueArray = []
    //   for (let i = 0; i < array.length; i++) {
    //     if (uniqueArray.indexOf(array[i]) === -1) {
    //       uniqueArray.push(array[i])
    //     }
    //   }
    //   return uniqueArray
    // }
    try {
      if (
        description.TN == false &&
        description.Salt == false &&
        description.Histamine == false &&
        description.PH == false &&
        description.Aw == false &&
        description.Tss == false &&
        description.SPG == false &&
        description.AN == false &&
        description.Acidity == false &&
        description.Viscosity == false &&
        description.SaltMeter == false &&
        description.Color == false
      ) {
        setsuccess_error(true)
      } else {
        let index = {
          idOrders: detailById.idOrders,
          Description: description,
        }
        console.log("index : ", index)
        let re = await Reprocess(token, index)
        // console.log("re : ", re)

        if (re.success == "success") {
          await handleRedirect()
          setsuccess_msg(true)
          //   await props.offModal()
        } else {
          setsuccess_error(true)
        }
      }
    } catch (err) {
      console.log(err)
      setsuccess_error(true)
    }
  }

  //   useEffect(() => {
  //     console.log("isOpenRro : ", isOpenRro)
  //   }, [isOpenRro])

  const TnC = () => {
    //   console.log("resultChem Before", resultChem)
    if (tr[0] != undefined) {
      // console.log("resultChem[0]", resultChem)
      if (resultChem[0].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[0].keyInput}`}
                  checked={description.TN}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({ ...description, TN: !description.TN })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[0].keyInput}`}
                >
                  <h6>{resultChem[0].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[0].val
                    ? resultChem[0].val.toFixed(3)
                    : resultChem[0].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[0].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[0].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[0].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const SaltC = () => {
    if (tr[0] != undefined) {
      if (resultChem[1].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[1].keyInput}`}
                  checked={description.Salt}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      Salt: !description.Salt,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[1].keyInput}`}
                >
                  <h6>{resultChem[1].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[1].val
                    ? resultChem[1].val.toFixed(3)
                    : resultChem[1].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[1].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[1].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[1].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const HistamineC = () => {
    if (tr[0] != undefined) {
      if (resultChem[2].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[2].keyInput}`}
                  checked={description.Histamine}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      Histamine: !description.Histamine,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[2].keyInput}`}
                >
                  <h6>{resultChem[2].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[2].val
                    ? resultChem[2].val.toFixed(3)
                    : resultChem[2].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[2].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[2].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[2].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const pHC = () => {
    if (tr[0] != undefined) {
      if (resultChem[3].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[3].keyInput}`}
                  checked={description.PH}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      PH: !description.PH,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[3].keyInput}`}
                >
                  <h6>{resultChem[3].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[3].val
                    ? resultChem[3].val.toFixed(3)
                    : resultChem[3].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[3].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[3].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[3].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const AwC = () => {
    if (tr[0] != undefined) {
      if (resultChem[4].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[4].keyInput}`}
                  checked={description.Aw}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      Aw: !description.Aw,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[4].keyInput}`}
                >
                  <h6>{resultChem[4].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[4].val
                    ? resultChem[4].val.toFixed(3)
                    : resultChem[4].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[4].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[4].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[4].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const TssC = () => {
    if (tr[0] != undefined) {
      if (resultChem[5].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[5].keyInput}`}
                  checked={description.Tss}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({ ...description, Tss: !description.Tss })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[5].keyInput}`}
                >
                  <h6>{resultChem[5].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[5].val
                    ? resultChem[5].val.toFixed(3)
                    : resultChem[5].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[5].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[5].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[5].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const SPGC = () => {
    if (tr[0] != undefined) {
      if (resultChem[6].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[6].keyInput}`}
                  checked={description.SPG}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({ ...description, SPG: !description.SPG })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[6].keyInput}`}
                >
                  <h6>{resultChem[6].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[6].val
                    ? resultChem[6].val.toFixed(3)
                    : resultChem[6].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[6].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[6].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[6].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const ANC = () => {
    if (tr[0] != undefined) {
      if (resultChem[7].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[7].keyInput}`}
                  checked={description.AN}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({ ...description, AN: !description.AN })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[7].keyInput}`}
                >
                  <h6>{resultChem[7].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[7].val
                    ? resultChem[7].val.toFixed(3)
                    : resultChem[7].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[7].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[7].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[7].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const AcidityC = () => {
    if (tr[0] != undefined) {
      if (resultChem[8].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[8].keyInput}`}
                  checked={description.Acidity}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      Acidity: !description.Acidity,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[8].keyInput}`}
                >
                  <h6>{resultChem[8].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[8].val
                    ? resultChem[8].val.toFixed(3)
                    : resultChem[8].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[8].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[8].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[8].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const ViscosityC = () => {
    if (tr[0] != undefined) {
      if (resultChem[9].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[9].keyInput}`}
                  checked={description.Viscosity}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      Viscosity: !description.Viscosity,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[9].keyInput}`}
                >
                  <h6>{resultChem[9].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[9].val
                    ? resultChem[9].val.toFixed(3)
                    : resultChem[9].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[9].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[9].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[9].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const SaltMeterC = () => {
    if (tr[0] != undefined) {
      if (resultChem[10].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[10].keyInput}`}
                  checked={description.SaltMeter}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      SaltMeter: !description.SaltMeter,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[10].keyInput}`}
                >
                  <h6>{resultChem[10].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[10].val
                    ? resultChem[10].val.toFixed(3)
                    : resultChem[10].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[10].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[10].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[10].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const ColorC = () => {
    if (tr[0] != undefined) {
      if (resultChem[11].render > 0) {
        return (
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${resultChem[11].keyInput}`}
                  checked={description.Color}
                  onChange={() => {
                    //   handleAddDescription(`${tr[0][0].keyInput}`)
                    setDescription({
                      ...description,
                      Color: !description.Color,
                    })
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${resultChem[11].keyInput}`}
                >
                  <h6>{resultChem[11].key}</h6>
                </label>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>
                  {resultChem[11].val
                    ? resultChem[11].val.toFixed(3)
                    : resultChem[11].val}
                </h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>{resultChem[11].temp}</h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                {resultChem[11].int ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
              <Col xs="6">
                {resultChem[11].coa ? (
                  <div className="badge bg-success font-size-13">
                    <span>PASS</span>
                  </div>
                ) : (
                  <div className="badge bg-danger font-size-13">
                    <span>FAIL</span>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }
  // isOpenRro = { modalReprocess }
  // toggleRepro = { toggleModalReprocess }
  return (
    // <React.Fragment>
    <Modal isOpen={isOpenRro} toggle={toggleRepro} centered={true} size="lg">
      {success_msg ? (
        <SweetAlert
          title="Add Order Success"
          success
          //   showCancel
          confirmBtnBsStyle="success"
          //   cancelBtnBsStyle="danger"
          onConfirm={async () => {
            setsuccess_msg(false)
            setresultChem([
              {
                render: 0,
                int: false,
                key: "TN(g/L)",
                coa: false,
                val: "",
              },
              {
                render: 0,
                int: false,
                key: "%Salt(w/v)",
                coa: false,
                val: "",
              },
              {
                render: 0,
                int: false,
                key: "Histamine(ppm)",
                coa: false,
                val: "",
              },
              { render: 0, int: false, key: "PH", coa: false, val: "" },
              { render: 0, int: false, key: "Aw", coa: false, val: "" },
              {
                render: 0,
                int: false,
                key: "Tss(Brix)",
                coa: false,
                val: "",
              },
              { render: 0, int: false, key: "SPG", coa: false, val: "" },
              { render: 0, int: false, key: "AN", coa: false, val: "" },
              {
                render: 0,
                int: false,
                key: "Acidity",
                coa: false,
                val: "",
              },
              {
                render: 0,
                int: false,
                key: "Viscosity",
                coa: false,
                val: "",
              },
              {
                render: 0,
                int: false,
                key: "Salt Meter",
                coa: false,
                val: "",
              },
              { render: 0, int: false, key: "Color", coa: false, val: "" },
            ])
            setDescription({
              TN: false,
              Salt: false,
              Histamine: false,
              PH: false,
              Aw: false,
              Tss: false,
              SPG: false,
              AN: false,
              Acidity: false,
              Viscosity: false,
              SaltMeter: false,
              Color: false,
            })
            handleRedirect()
            toggleRepro()
            // setInterval(() => {
            //   window.location.reload()
            // }, 5000)
          }}
        >
          You clicked the button!
        </SweetAlert>
      ) : null}

      {success_error ? (
        <SweetAlert
          title="error"
          danger
          //   showCancel
          confirmBtnBsStyle="danger"
          //   cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess_error(false)
          }}
        >
          You clicked the button!
        </SweetAlert>
      ) : null}

      <div className="modal-header">
        <h3 className="modal-title mt-0">Reprocess</h3>
        <button
          type="button"
          onClick={toggleRepro}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Row>
          <Col
            md="6"
            xs="12"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h5 style={{ margin: "0" }}>Product Name</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span>{detailById.ProductName}</span>
              </div>
            </div>
          </Col>

          <Col
            md="6"
            xs="12"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h5 style={{ margin: "0" }}>Specific</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span>{detailById.name}</span>
              </div>
            </div>
          </Col>
        </Row>

        <hr />
        {/* Chemical analysis */}
        <Row>
          <Col
            xs="12"
            style={{
              border: "solid 1px #989a9b",
              borderRadius: "10px",
              height: "100%",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <h5 style={{ borderBottom: "solid 1px #989a9b" }}>
              Chemical analysis
            </h5>
            <Row style={{ display: "flex", width: "100%" }}>
              <Col xs="3">
                <div>
                  <Col xs="12">
                    <h6> </h6>
                  </Col>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <h6>Result</h6>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <h6>Temp C &deg; </h6>
                </div>
              </Col>
              <Col xs="3" style={{ display: "flex" }}>
                <Col xs="6">
                  <h6>Int. spec</h6>
                </Col>

                <Col xs="6">
                  <h6>COA spec</h6>
                </Col>
              </Col>
            </Row>

            {/* <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`customCheckcolor${index.keyInput}`}
                  //   checked={false}
                  onChange={e => {
                    handleAddDescription(`${index.keyInput}`)
                  }}
                />

                <label
                  className="form-check-label"
                  htmlFor={`customCheckcolor${index.keyInput}`}
                >
                  <h6>{index.key}</h6>
                </label>
              </div> */}

            {TnC()}
            {SaltC()}
            {HistamineC()}
            {pHC()}
            {AwC()}
            {TssC()}
            {SPGC()}
            {ANC()}
            {AcidityC()}
            {ViscosityC()}
            {SaltMeterC()}
            {ColorC()}
          </Col>
        </Row>
      </div>
      <ModalFooter>
        {/* <Link target={"_blank"} to="/ExportForm"> */}
        <Button
          color="primary"
          onClick={() => {
            handleReprocess()
          }}
        >
          Reprocess
        </Button>
        {/* </Link>{" "} */}
        <Button color="secondary" onClick={toggleRepro}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
    // </React.Fragment>
  )
}

ModalReprocess.propTypes = {
  orders: PropTypes.array,
  spc: PropTypes.array,
  tr: PropTypes.array,
  bio: PropTypes.array,
}

const mapStateToProps = state => ({
  orders: state.DetailOrder.Detail,
  spc: state.DetailOrder.SpecificChem,
  tr: state.DetailOrder.TestResultLasted,
  bio: state.DetailOrder.SpecificBio,
})

export default connect(mapStateToProps)(withRouter(ModalReprocess))
