import React, { useState, useEffect } from "react"
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
import Select from "react-select"
//Import Breadcrumb
import "../Tables/datatables.scss"

//get api
import { isAuthenticated } from "./../Authentication/api"
import {
  readIdMicroCheckbox,
  readIdChemCheckbox,
  addOrder,
  addRealtimeOrder,
} from "./api"
import { updateCardDS } from "./../Dashboard/api"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Moment from "moment"

const ModaladdSample = props => {
  const { isOpenSample, toggleSample } = props
  const [success_msg, setsuccess_msg] = useState(false)
  const [success_error, setsuccess_error] = useState(false)
  const { user, token } = isAuthenticated()
  const [normal, setNormal] = useState(true)
  const [rush, setRush] = useState(false)
  const [urgent, setUrgent] = useState(false)

  const [Tn, setTn] = useState(false)
  const [Salt, setSalt] = useState(false)
  const [PH, setPH] = useState(false)
  const [Histamine, setHistamine] = useState(false)
  const [Tss, setTss] = useState(false)
  const [SPG, setSPG] = useState(false)
  const [Aw, setAw] = useState(false)
  const [Micro, setMicro] = useState(false)
  const [SaltMeter, setSaltMeter] = useState(false)
  const [Color, setColor] = useState(false)

  const [AN, setAN] = useState(false)
  const [Acidity, setAcidity] = useState(false)
  const [Viscosity, setViscosity] = useState(false)

  const [nameSpcChem, setnameSpcChem] = useState([])
  const [selectChem, setSelectChem] = useState(1)
  const [nameSpcMicro, setnameSpcMicro] = useState([])
  const [selectMicro, setSelectMicro] = useState(1)
  const [pord, setPord] = useState(new Date())
  const [selectedGroup3, setSelectedGroup3] = useState(null)
  const [values, setValues] = useState({
    pord: null,
    bbe: null,
    po: "",
    productname: "",
    size: "",
    quantity: "",
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  useEffect(() => {
    readIdMicroCheckbox(token).then(data => {
      if (data == undefined) {
        return null
      } else {
        if (data.success == "success") {
          // console.log('readIdMicroCheckbox : ' ,data.message)
          setnameSpcMicro(data.message)
        }
      }
    })
  }, [])

  useEffect(() => {
    readIdChemCheckbox(token).then(data => {
      if (data == undefined) {
        return null
      } else {
        if (data.success == "success") {
          console.log('readIdChemCheckbox : ' ,data.message)
          let spcc = []
          data.message.forEach(data => {
            let index = {
                label: data.name,
                value: data.idPdSpecificChem,
            }
            spcc.push(index)
          })
          // setnameSpcChem(data.message)
          setnameSpcChem(spcc)
        }
      }
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    if (values.productname == "") {
      return setsuccess_error(true)
    }

    var pord = values.pord
    var bbe = values.bbe
    var priority = ""
    if (normal) {
      priority = 0
    } else if (rush) {
      priority = 1
    } else if (urgent) {
      priority = 2
    }

    var index = {
      ProductName: values.productname,
      idScfChem: selectChem,
      idScfMicro: selectMicro,
      Priority: priority,
      Tn: Tn,
      Salt: Salt,
      PH: PH,
      Histamine: Histamine,
      Tss: Tss,
      Aw: Aw,
      Spg: SPG,
      Micro: Micro,
      AN:AN,
      Acidity:Acidity,
      Viscosity:Viscosity,
      SaltMeter:SaltMeter,
      Color:Color
    }

    // console.log("index sample : ", index)

    addOrder(token, index).then(data => {
      if (data) {
        if (data.success == "success") {
          var index = {
            idOrders: data.idAddOrder,
          }
          addRealtimeOrder(token, index).then(data => {
            if (data) {
              updateCardDS(token).then(data => {
                if (data) {
                  setsuccess_msg(true)
                  setInterval(() => {
                    window.location.reload()
                  }, 1000)
                }
              })
            }
          })
        } else {
          setsuccess_error(true)
        }
      } else {
        setsuccess_error(true)
      }    
    })

    const handleChangeSelectChem = e => {
      setSelectChem(e)
      console.log(e)
    }

    const handleSelectGroup = selectedGroup3 => {
      setSelectedGroup3(selectedGroup3)
    }

    // toggleAddorder()
    // setsuccess_msg(false)
    // setsuccess_error(false)
  }
  return (
    <Modal
      isOpen={isOpenSample}
      toggle={toggleSample}
      centered={true}
      size="lg"
    >
      {success_msg ? (
        <SweetAlert
          title="Add Order Success"
          success
          //   showCancel
          confirmBtnBsStyle="success"
          //   cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess_msg(false)
            toggleAddorder()
            setInterval(() => {
              window.location.reload()
            }, 5000)
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
        <h3 className="modal-title mt-0">Add Order</h3>
        <button
          type="button"
          onClick={toggleSample}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Product Name
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="productname"
                      onChange={handleChange("productname")}
                      value={values.productname}
                      placeholder="Product Name"
                    />
                  </div>
                </Row>

                {/* <Col sm="4" style={{ padding: "5px" }}>
                        Approve By ................................
                        <Select
                          value={selectedGroup3}
                          name="To"
                          onChange={e => {
                            handleSelectGroup3()
                            handleChangeSelectChem(e.value)
                          }}
                          options={ApproveSelect}
                        />
                      </Col> */}

                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    Specific Chem
                  </label>
                  <div className="col-md-10">
                  <Select
                          value={selectChem}
                          name="c1"
                          onChange={e => {
                            handleSelectGroup()
                            handleChangeReportValue(e.value)
                          }}
                          options={nameSpcChem}
                  />
                    {/* <select
                      className="form-control"
                      id="c1"
                      value={selectChem}
                      onChange={e => {
                        // console.log()
                        const changeChem = e.target.value
                        setSelectChem(changeChem)
                      }}
                    >
                      {nameSpcChem.map((index, key) => (
                        <option
                          value={index.idPdSpecificChem}
                          //   onClick={selectSpcChem(index.idPdSpecificChem)}
                        >
                          {index.name}
                        </option>
                      ))}
                    </select> */}
                  </div>
                </Row>
                {/* const [Tn,  setTn   ] = useState(false)
                                            const [Salt,  setSalt   ] = useState(false)
                                            const [PH,  setPH   ] = useState(false)
                                            const [Histamine,  setHistamine   ] = useState(false)
                                            const [Tss,  setTss   ] = useState(false)
                                            const [SPG,  setSPG   ] = useState(false)
                                            const [Aw,  setAw  ] = useState(false) */}

                <Row className="mb-0">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    Test Order
                  </label>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorTn"
                        checked={Tn}
                        onChange={() => {
                          setTn(!Tn)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorTn"
                      >
                        Tn
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorSalt"
                        checked={Salt}
                        onChange={() => {
                          setSalt(!Salt)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorSalt"
                      >
                        Salt
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorPH"
                        checked={PH}
                        onChange={() => {
                          setPH(!PH)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorPH"
                      >
                        PH
                      </label>
                    </div>
                  </div>
                </Row>

                <Row className="mb-1">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    {" "}
                  </label>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorHis"
                        checked={Histamine}
                        onChange={() => {
                          setHistamine(!Histamine)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorHis"
                      >
                        Histamine
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorTss"
                        checked={Tss}
                        onChange={() => {
                          setTss(!Tss)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorTss"
                      >
                        Tss
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorSPG"
                        checked={SPG}
                        onChange={() => {
                          setSPG(!SPG)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorSPG"
                      >
                        SPG
                      </label>
                    </div>
                  </div>
                </Row>

                <Row className="mb-1">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    {" "}
                  </label>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorAw"
                        checked={Aw}
                        onChange={() => {
                          setAw(!Aw)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorAw"
                      >
                        Aw
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorAN"
                        checked={AN}
                        onChange={() => {
                          setAN(!AN)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorAN"
                      >
                        AN
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorAcidity"
                        checked={Acidity}
                        onChange={() => {
                          setAcidity(!Acidity)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorAcidity"
                      >
                        Acidity
                      </label>
                    </div>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    {" "}
                  </label>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorViscosity"
                        checked={Viscosity}
                        onChange={() => {
                          setViscosity(!Viscosity)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorViscosity"
                      >
                        Viscosity
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckSaltMeter"
                        checked={SaltMeter}
                        onChange={() => {
                          setSaltMeter(!SaltMeter)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckSaltMeter"
                      >
                        Salt Meter
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckColor"
                        checked={Color}
                        onChange={() => {
                          setColor(!Color)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckColor"
                      >
                        Color
                      </label>
                    </div>
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    Specific Micro
                  </label>
                  <div
                    className="col-md-10"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolorMicro"
                        checked={Micro}
                        onChange={() => {
                          setMicro(!Micro)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolorMicro"
                      >
                        Check Micro
                      </label>
                    </div>
                    {/* <select className="form-control"
                                              id="c2"
                                                value={selectMicro}
                                                onChange={(e) => {
                                                    const changeMicro = e.target.value;
                                                    setSelectMicro(changeMicro)
                                                }} 
                                              >
                                                  {nameSpcMicro.map((index, key) => (
                                                      <option value={index.idPdSpecificMicro} 
                                                      >{index.idPdSpecificMicro}</option>
                                                  ))}
                                              </select> */}
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    className="col-md-2 col-form-label"
                  >
                    priority
                  </label>
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-success">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolor1"
                        checked={normal}
                        onChange={() => {
                          setNormal(!normal)
                          setRush(false)
                          setUrgent(false)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolor1"
                      >
                        normal
                      </label>
                    </div>
                  </div>

                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-warning">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolor2"
                        checked={rush}
                        onChange={() => {
                          setRush(!rush)
                          setNormal(false)
                          setUrgent(false)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolor2"
                      >
                        rush
                      </label>
                    </div>
                  </div>

                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-danger">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckcolor3"
                        checked={urgent}
                        onChange={() => {
                          setUrgent(!urgent)
                          setNormal(false)
                          setRush(false)
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customCheckcolor3"
                      >
                        urgent
                      </label>
                    </div>
                  </div>

                  <div className="col-md-1"></div>
                </Row>
                {/* <Row style={{display:'flex', width:'100%', alignItems:'center', margin:'0'}}>
                                            <Col md="2">
                                                <h5 style={{margin:'0'}}>Lot</h5>
                                            </Col>
                                            <Col md="5">
                                            
                                            </Col>
                                            <Col md="5">
                                            </Col>
                                        </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Header TestResult */}

        {/* Chemical analysis */}
      </div>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>{" "}
        <Button color="secondary" onClick={toggleSample}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default ModaladdSample
