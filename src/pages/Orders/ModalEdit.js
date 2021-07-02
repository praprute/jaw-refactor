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

//Import Breadcrumb
import "../Tables/datatables.scss"

//get api
import { isAuthenticated } from "./../Authentication/api"
import {
  readIdMicroCheckbox,
  readIdChemCheckbox,
  addOrder,
  updateDetail,
  deleteOrder,
} from "./api"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Moment from "moment"

const ModalEdit = props => {
  const {
    isOpenEdit,
    toggleEdit,
    orders,
    spc,
    tr,
    bio,
    redirect,
    handleRedirect,
  } = props
  const [success_msg, setsuccess_msg] = useState(false)
  const [success_error, setsuccess_error] = useState(false)
  const { user, token } = isAuthenticated()
  const [normal, setNormal] = useState(true)
  const [rush, setRush] = useState(false)
  const [urgent, setUrgent] = useState(false)
  const [nameSpcChem, setnameSpcChem] = useState([])
  const [selectChem, setSelectChem] = useState(1)
  const [nameSpcMicro, setnameSpcMicro] = useState([])
  const [selectMicro, setSelectMicro] = useState(1)
  const [pord, setPord] = useState(new Date())
  const [values, setValues] = useState({})

  const [Tn, setTn] = useState(false)
  const [Salt, setSalt] = useState(false)
  const [PH, setPH] = useState(false)
  const [Histamine, setHistamine] = useState(false)
  const [Tss, setTss] = useState(false)
  const [SPG, setSPG] = useState(false)
  const [Aw, setAw] = useState(false)
  const [Micro, setMicro] = useState(false)
  const [AN, setAN] = useState(false)
  const [Acidity, setAcidity] = useState(false)
  const [Viscosity, setViscosity] = useState(false)

  const [SaltMeter, setSaltMeter] = useState(false)
  const [Color, setColor] = useState(false)

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
          // console.log("readIdChemCheckbox : ", data.message)
          setnameSpcChem(data.message)
        }
      }
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    // var pord = Moment(values.pord).format('DD/MM/YYYY')
    // var bbe = Moment(values.bbe).format('DD/MM/YYYY')
    var pordEdit = values.PORD
    var bbeEdit = values.BBE
    var priority = ""
    if (normal) {
      priority = 0
    } else if (rush) {
      priority = 1
    } else if (urgent) {
      priority = 2
    }
    var index = {
      idOrders: values.idOrders,
      PORD: pordEdit,
      BBE: bbeEdit,
      PO: values.PO,
      ProductName: values.ProductName,
      Size: values.Size,
      Quantity: values.Quantity,
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
      AN: AN,
      Acidity: Acidity,
      Viscosity: Viscosity,
      SaltMeter: SaltMeter,
      Color: Color,
    }
    updateDetail(token, index).then(data => {
      // console.log('response add order : ', data)
      if (data) {
        if (data.success == "success") {
          setsuccess_msg(true)
        } else {
          setsuccess_error(true)
        }
      } else {
        setsuccess_error(true)
      }
    })
  }

  const handleDelete = event => {
    event.preventDefault()
    var id = {
      idOrders: values.idOrders,
    }
    deleteOrder(token, id).then(response => {
      // console.log(response)
    })
  }

  const [Pord, SetPord] = useState("")
  const [Bbe, SetBbe] = useState("")
  //idScfChem Priority
  useEffect(() => {
    // console.log("order :", orders)
    setValues(orders)
    setMicro(orders.Micro)
    setTn(orders.Tn)
    setPH(orders.PH)
    setSalt(orders.Salt)
    setHistamine(orders.Histamine)
    setTss(orders.Tss)
    setAw(orders.Aw)
    setSPG(orders.Spg)
    setAN(orders.AN)
    setAcidity(orders.Acidity)
    setViscosity(orders.Viscosity)
    setSaltMeter(orders.SaltMeter)
    setColor(orders.Color)
  }, [orders, bio, tr])

  useEffect(() => {
    // console.log(orders)
    setSelectChem(orders.idScfChem)
    switch (orders.Priority) {
      case "0":
        return setNormal(true), setRush(false), setUrgent(false)
      case "1":
        return setNormal(false), setRush(true), setUrgent(false)
      case "2":
        return setNormal(false), setRush(false), setUrgent(true)
    }
  }, [orders, bio, tr])
  return (
    <Modal isOpen={isOpenEdit} toggle={toggleEdit} centered={true} size="lg">
      {success_msg ? (
        <SweetAlert
          title="Add Order Success"
          success
          //   showCancel
          confirmBtnBsStyle="success"
          //   cancelBtnBsStyle="danger"
          onConfirm={async () => {
            setsuccess_msg(false)
            handleRedirect()
            toggleEdit()
            // location.reload()
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
        <h3 className="modal-title mt-0">
          Edit Order ID {values.idOrderTested}
        </h3>
        <button
          type="button"
          onClick={toggleEdit}
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
                    Lot
                  </label>
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="example-text-input"
                    className="col-md-1 col-form-label"
                  >
                    PORD:
                  </label>
                  <div className="col-md-4">
                    {/* {values.PORD} */}
                    <input
                      className="form-control"
                      type="date"
                      name="pord"
                      onChange={handleChange("PORD")}
                      value={values.PORD}
                      // placeholder="PORD:00/00/0000"
                    />
                  </div>
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="example-text-input"
                    className="col-md-1 col-form-label"
                  >
                    BBE:
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="date"
                      // defaultValue="BBE:00/00/0000"
                      name="bbe"
                      onChange={handleChange("BBE")}
                      value={values.BBE}
                      placeholder="BBE:00/00/0000"
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Order Number
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="po"
                      onChange={handleChange("PO")}
                      value={values.PO}
                      placeholder="Order Number"
                    />
                  </div>
                </Row>

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
                      onChange={handleChange("ProductName")}
                      value={values.ProductName}
                      placeholder="Product Name"
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Pack Size
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="size"
                      onChange={handleChange("Size")}
                      value={values.Size}
                      placeholder="Pack Size"
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Quantity
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="quantity"
                      onChange={handleChange("Quantity")}
                      value={values.Quantity}
                      placeholder="Quantity"
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">
                    Specific Chem
                  </label>
                  <div className="col-md-10">
                    <select
                      className="form-control"
                      id="c1"
                      value={selectChem}
                      onChange={e => {
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
                    </select>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">
                    Specific Micro
                  </label>
                  <div className="col-md-10">
                    <select
                      className="form-control"
                      id="c2"
                      value={selectMicro}
                      onChange={e => {
                        const changeMicro = e.target.value
                        setSelectMicro(changeMicro)
                      }}
                    >
                      {nameSpcMicro.map((index, key) => (
                        <option
                          value={index.idPdSpecificMicro}
                          //   onClick={selectSpcChem(index.idPdSpecificChem)}
                        >
                          {index.idPdSpecificMicro}
                        </option>
                      ))}
                    </select>
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
        <Button color="secondary" onClick={toggleEdit}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

ModalEdit.propTypes = {
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

export default connect(mapStateToProps)(withRouter(ModalEdit))
