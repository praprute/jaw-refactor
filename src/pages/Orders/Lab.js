import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Label,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
  } from "reactstrap"
// import { Link } from "react-router-dom"
import classnames from "classnames"
import { connect } from "react-redux"
import { withRouter, Link, Redirect } from "react-router-dom"
//Component
import LatestTranaction from "../Dashboard/LatestTranaction"
import OrderTable from './Table'
import OrderTableRecheck from './TableRecheck'
import ModalDetail from './../Orders/ModalDetail'
import ModalTestReport from './TestReport'
import ModalAddOrder from './../Orders/ModalAddOrder'
import ModalEdit from './../Orders/ModalEdit'
// import { MDBDataTable } from "mdbreact"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//i18n
import { withTranslation } from "react-i18next"
import makeAnimated from "react-select/animated"
//api
// import {getAllOrder, 
//     getRecheckOrder} from './api'
import { isAuthenticated } from './../Authentication/api'
import { useHistory } from 'react-router-dom'
import { dailyReport } from "./Report/DailyReport"
const animatedComponents = makeAnimated()
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
  // Kanit Font
  Sarabun: {
    // 3. set Kanit font
    normal: "Sarabun-Regular.ttf",
    bold: "Sarabun-Medium.ttf",
    italics: "Sarabun-Italic.ttf",
    bolditalics: "Sarabun-MediumItalic.ttf",
  },
}
const Labatorypage = props => {
    const history = useHistory();
    
    const [startDate, setStartDate] = useState(new Date())
    const [activeTab, setActiveTab] = useState("1")
    const {user, token} = isAuthenticated()
    const [modal, setModal] = useState(false)
    const [modalTR, setModalTR] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalAddorder, setModalAddorder] = useState(false)

    const toggleModal = () => {
      setModal(!modal)
    }

    const toggleModalTestReport = () => {
        setModalTR(!modalTR)
    }
    
    const toggleModalEdit = () =>{
      setModalEdit(!modalEdit)
    }
    const toggleModalAddOrder = () => {
      setModalAddorder(!modalAddorder)
    }
    
    const handleChange = date => {
        setStartDate(date)
      }
    const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  useEffect(() => {
}, [])
    return (
      <React.Fragment>
        <div className="page-content">
          <ModalDetail isOpen={modal} toggle={toggleModal} />
          <ModalAddOrder
            isOpenAddorder={modalAddorder}
            toggleAddorder={toggleModalAddOrder}
          />
          <ModalTestReport
            isOpenTR={modalTR}
            toggleTR={toggleModalTestReport}
          />
          <MetaTags>
            <title>Labatory | Labatory - Application</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={props.t("Labatory")}
              breadcrumbItem={props.t("Labatory")}
            />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="12" xs="12">
                        <ul
                          className="nav nav-tabs nav-tabs-custom"
                          role="tablist"
                        >
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => {
                                toggleTab("1")
                              }}
                            >
                              Orders
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "2",
                              })}
                              onClick={() => {
                                toggleTab("2")
                              }}
                            >
                              Urgent Orders
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "3",
                              })}
                              onClick={() => {
                                toggleTab("3")
                              }}
                            >
                              Waiting to microbiological analysis
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "4",
                              })}
                              onClick={() => {
                                toggleTab("4")
                              }}
                            >
                              Rechecking
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "5",
                              })}
                              onClick={() => {
                                toggleTab("5")
                              }}
                            >
                              Pass Orders
                            </NavLink>
                          </NavItem>
                        </ul>
                      </Col>
                    </Row>
                    <TabContent activeTab={activeTab} className="p-3">
                      <TabPane tabId="1" id="all-order">
                        <div>
                          <OrderTable
                            page={"lab"}
                            tricker={"allOrder"}
                            toggle={toggleModal}
                            toggleEdit={toggleModalEdit}
                            toggleTR={toggleModalTestReport}
                          />
                        </div>
                      </TabPane>

                      <TabPane tabId="2" id="urgent">
                        <div>
                          <OrderTable
                            page={"lab"}
                            tricker={"urgent"}
                            toggle={toggleModal}
                            toggleEdit={toggleModalEdit}
                            toggleTR={toggleModalTestReport}
                          />
                        </div>
                      </TabPane>

                      <TabPane tabId="3" id="wait">
                        <div>
                          <OrderTable
                            page={"lab"}
                            tricker={"micro"}
                            toggle={toggleModal}
                            toggleEdit={toggleModalEdit}
                            toggleTR={toggleModalTestReport}
                          />
                        </div>
                      </TabPane>

                      <TabPane tabId="4" id="processing">
                        <div>
                          <OrderTable
                            page={"lab"}
                            tricker={"recheck"}
                            toggle={toggleModal}
                            toggleEdit={toggleModalEdit}
                            toggleTR={toggleModalTestReport}
                          />
                        </div>
                      </TabPane>

                      <TabPane tabId="5" id="pass">
                        <div>
                          <OrderTable
                            page={"lab"}
                            tricker={"pass"}
                            toggle={toggleModal}
                            toggleEdit={toggleModalEdit}
                            toggleTR={toggleModalTestReport}
                          />
                        </div>
                      </TabPane>
                      <Button
                        color="warning"
                        size="lg"
                        style={{ width: "100%", marginTop: "15px" }}
                        onClick={() => {
                          // Exportdaily()
                          // handleExportPDF()
                          // handleUpdateStatusCoa()
                        }}
                      >
                        SAVE
                      </Button>
                    </TabContent>
                    {/* <Row>
                      <Col sm="9"></Col>
                      <Col sm="3">
                        <Button
                          color="warning"
                          size="lg"
                          style={{ width: "100%", marginTop: "15px" }}
                          onClick={() => {
                            // Exportdaily()
                            // handleExportPDF()
                            // handleUpdateStatusCoa()
                          }}
                        >
                          SAVE
                        </Button>
                      </Col>
                    </Row> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
    }
    
    Labatorypage.propTypes = {
      t: PropTypes.any
    }
export default withRouter(withTranslation()(Labatorypage))