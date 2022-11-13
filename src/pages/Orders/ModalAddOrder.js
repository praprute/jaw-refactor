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

const ModalAddOrder = props => {
  const { isOpenAddorder, toggleAddorder } = props
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
          // console.log('readIdChemCheckbox : ' ,data.message)
          setnameSpcChem(data.message)
        }
      }
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    // console.log('bbe : ',values.pord )
    // console.log('pord : ',values.bbe )
    // var pord = Moment(values.pord).format('DD/MM/YYYY')
    // var bbe = Moment(values.bbe).format('DD/MM/YYYY')
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
    // console.log('pord : ', pord)
    // console.log('bbe : ', bbe)
    // console.log('selectChem : ', selectChem)
    // console.log('selectMicro : ', selectMicro)
    // console.log('values : ', values)
    // console.log('priority : ', priority)

    var index = {
      PORD: pord,
      BBE: bbe,
      PO: values.po,
      ProductName: values.productname,
      Size: values.size,
      Quantity: values.quantity,
      idScfChem: selectChem,
      idScfMicro: selectMicro,
      Priority: priority,
      Tn: false,
      Salt: false,
      PH: false,
      Histamine: false,
      Tss: false,
      Aw: false,
      Spg: false,
      Micro: false,
    }

    addOrder(token, index).then(data => {
      // console.log('response add order : ', data)
      if (data) {
        // idAddOrder
        if (data.success == "success") {
          var index = {
            idOrders: data.idAddOrder,
          }
          // console.log('response add order SUCCCESS: ', data)
          addRealtimeOrder(token, index).then(data => {
            if (data) {
              // console.log('addRealtimeOrder : ', data)
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
          // console.log('response add order ERROR : ')
          setsuccess_error(true)
        }
      } else {
        setsuccess_error(true)
      }
    })

    // toggleAddorder()
    // setsuccess_msg(false)
    // setsuccess_error(false)
  }
  return (
    <Modal
      isOpen={isOpenAddorder}
      toggle={toggleAddorder}
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
            // setInterval(() => {
            location.reload()
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
        <h3 className="modal-title mt-0">Add Order</h3>
        <button
          type="button"
          onClick={toggleAddorder}
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
                    <input
                      className="form-control"
                      type="date"
                      name="pord"
                      onChange={handleChange("pord")}
                      value={values.pord}
                      placeholder="PORD:00/00/0000"
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
                      onChange={handleChange("bbe")}
                      value={values.bbe}
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
                      onChange={handleChange("po")}
                      value={values.po}
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
                      onChange={handleChange("productname")}
                      value={values.productname}
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
                      onChange={handleChange("size")}
                      value={values.size}
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
                      onChange={handleChange("quantity")}
                      value={values.quantity}
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
                        <option value={index.idPdSpecificChem} key={key}>
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
                        <option value={index.idPdSpecificMicro} key={key}>
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
        <Button color="secondary" onClick={toggleAddorder}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default ModalAddOrder
