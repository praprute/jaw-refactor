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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import Moment from "moment"
//get api
import { getAllOrder, readOrderById, exportCOA, loadHalalLogo } from "./api"
import { map, result } from "lodash"
import { isAuthenticated } from "./../Authentication/api"

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
//PDF
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

const ModalDetail = props => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs
  const { orders, spc, tr, bio } = props
  const { isOpen, toggle, toggleCOA } = props
  const { user, token } = isAuthenticated()
  const [modal, setModal] = useState(false)
  const [score, setScore] = useState(0)
  const [confirm_alert, setconfirm_alert] = useState(false)
  const [detailById, setdetailById] = useState([
    {
      idOrderTested: "",
      BBE: "",
      PORD: "",
      ProductName: "",
      name: "",
      Size: "",
      Quantity: "",
    },
  ])
  const [Microrender, setMicrorender] = useState(false)
  // const toggle = () => setModal(!modal);

  const [resultChem, setresultChem] = useState([
    { int: false, key: "TN(g/L)", coa: false, val: "" },
    { int: false, key: "%Salt(w/v)", coa: false, val: "" },
    { int: false, key: "Histamine(ppm)", coa: false, val: "" },
    { int: false, key: "PH", coa: false, val: "" },
    { int: false, key: "Aw", coa: false, val: "" },
    { int: false, key: "Tss(Brix)", coa: false, val: "" },
    { int: false, key: "SPG", coa: false, val: "" },
  ])
  const [resultMicro, setresultMicro] = useState([
    { int: false, coa: false, val: "", key: "APC" },
    { int: false, coa: false, val: "", key: "Yeasts & Molds" },
    { int: false, coa: false, val: "", key: "E. coil" },
    { int: false, coa: false, val: "", key: "Coliform" },
    { int: false, coa: false, val: "", key: "S. aureus" },
  ])

  useEffect(() => {
    if (tr[0] != undefined) {
      // console.log("tr :", tr)
      setresultChem(tr[0])
      setresultMicro(tr[1])
    } else {
      setresultChem([
        { int: false, key: "TN(g/L)", coa: false, val: "" },
        { int: false, key: "%Salt(w/v)", coa: false, val: "" },
        { int: false, key: "Histamine(ppm)", coa: false, val: "" },
        { int: false, key: "PH", coa: false, val: "" },
        { int: false, key: "Aw", coa: false, val: "" },
        { int: false, key: "Tss(Brix)", coa: false, val: "" },
        { int: false, key: "SPG", coa: false, val: "" },
      ])
      setresultMicro([
        { int: false, coa: false, val: "", key: "APC" },
        { int: false, coa: false, val: "", key: "Yeasts & Molds" },
        { int: false, coa: false, val: "", key: "E. coil" },
        { int: false, coa: false, val: "", key: "Coliform" },
        { int: false, coa: false, val: "", key: "S. aureus" },
      ])
    }
  }, [tr])

  const [scoreTested, setscoreTested] = useState("")
  useEffect(() => {
    
    setdetailById(orders)
    setMicrorender(orders.Micro)

    if (tr.length > 0) {
      var countChem = 0
      for (let i = 0; i < tr[0].length; i++) {
        if (tr[0][i].render == 1) {
          countChem = countChem + 1
          
        } else {
          countChem = countChem
        }
      }

     

      if (orders.Micro == 1) {
        setScore(countChem + 5)
      } else {
        setScore(countChem)
      }

      var testedScore = 0
      for (let i = 0; i < tr[0].length; i++) {
        if (tr[0][i].coa == 1 && tr[0][i].render == 1) {
          testedScore = testedScore + 1
        } else {
          testedScore = testedScore
        }
      }

      
      var countMicro = 0
      for (let i = 0; i < tr[1].length; i++) {
        if (tr[1][i].coa == true ) {
          countMicro = countMicro + 1
        } else {
          countMicro = countMicro
        }
      }
      setscoreTested(testedScore + countMicro)
    }
  }, [orders, bio, tr])

  const handleExport = async () => {
  
    let image = {}
    let halalLogo = {}
    try {
      let data = await exportCOA(token)
      let halal = await loadHalalLogo(token)
      if (data) {
        image = {
          img: data.message,
        }
      }
      if (halal) {
        halalLogo = {
          img: halal.message,
        }
      }

      console.log('scoreTested : ', scoreTested, score)
      if (scoreTested != 0 && score != 0) {
        if (scoreTested == score) {
          let index = {
            ProductName: orders.ProductName,
            PO: orders.PO,
            BBE: orders.BBE,
            PORD: orders.PORD,
            Quantity: orders.Quantity,
            Size: orders.Size,

            chem: tr[0],
            micro: tr[1],

            logo: image.img,
            halal: halalLogo.img,
            Orders: orders,
            timeStamp: tr[2],
          }
         
          if (typeof window !== "undefined") {
            localStorage.setItem("JawIndexExport", JSON.stringify(index))
          }
         
        } else {
          setconfirm_alert(true)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true} size="lg">
      {confirm_alert ? (
        <SweetAlert
          title="Take Your Token!"
          warning
          showCancel
          confirmButtonText="Yes, delete it!"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setconfirm_alert(false)
          }}
          onCancel={() => setconfirm_alert(false)}
        >
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
          />
        </SweetAlert>
      ) : null}

      <div className="modal-header">
        <h3 className="modal-title mt-0">Order : {detailById.PO}</h3>
        <button
          type="button"
          onClick={toggle}
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
                <h5 style={{ margin: "0" }}>LOT</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span>
                  PORD: {Moment(detailById.PORD).format("DD/MM/YYYY")}
                  <br />
                  BBE : {Moment(detailById.PORD).format("DD/MM/YYYY")}
                </span>
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
                <h5 style={{ margin: "0" }}>Order Numder</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span>{detailById.PO}</span>
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
                <h5 style={{ margin: "0" }}>Pack Size</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span>{detailById.Size}</span>
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
                <h5 style={{ margin: "0" }}>Quantity</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span>{detailById.Quantity}</span>
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

            {resultChem.map((index, key) => {
              {
                if (index.render > 0) {
                  return (
                    <Row style={{ display: "flex", width: "100%" }}>
                      <Col xs="3">
                        <div>
                          <Col
                            xs="12"
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: "30%",
                            }}
                          >
                            <h6>{index.key}</h6>
                          </Col>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div>
                          <h6>
                            {index.val ? index.val.toFixed(3) : index.val}
                          </h6>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div>
                          <h6>{index.temp}</h6>
                        </div>
                      </Col>
                      <Col xs="3" style={{ display: "flex" }}>
                        <Col xs="6">
                          {index.int ? (
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
                          {index.coa ? (
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
                }
                return null
              }
            })}
          </Col>
        </Row>
        <br />

        {/* Microbiological analysis */}
        {Microrender ? (
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
                Microbiological analysis
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

              {resultMicro.map((index, key) => (
                <Row style={{ display: "flex", width: "100%" }}>
                  <Col xs="3">
                    <div>
                      <Col
                        xs="12"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          paddingLeft: "30%",
                        }}
                      >
                        <h6>{index.key}</h6>
                      </Col>
                    </div>
                  </Col>
                  <Col xs="3">
                    <div>
                      <h6>{JSON.stringify(index.val)}</h6>
                    </div>
                  </Col>
                  <Col xs="3">
                    <div>
                      <h6> </h6>
                    </div>
                  </Col>
                  <Col xs="3" style={{ display: "flex" }}>
                    <Col xs="6">
                      {index.int ? (
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
                      {index.coa ? (
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
              ))}
            </Col>
          </Row>
        ) : null}
      </div>

      <ModalFooter>
        <Link target={"_blank"} to="/ExportForm">
          <Button
            color="primary"
            onClick={() => {
              handleExport()
              // toggleCOA()
            }}
          >
            EXPORT
            {/* <Link to="/ExportForm" target="/ExportForm" rel="noopener noreferrer" /> */}
          </Button>
        </Link>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

ModalDetail.propTypes = {
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

export default connect(mapStateToProps)(withRouter(ModalDetail))
