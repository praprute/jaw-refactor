import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
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
import Select from "react-select"
import makeAnimated from "react-select/animated"
//Component
import LatestTranaction from "../Dashboard/LatestTranaction"
import OrderTable from "./Table"
import TableCompleteCheck from "./TableCompleteCheck"
import OrderTableRecheck from "./../Orders/TableRecheck"
import ModalDetail from "./../Orders/ModalDetail"
import ModalTestReport from "./../Orders/TestReport"
// import TestReport from './Testreport.js'
import ModalAddOrder from "./../Orders/ModalAddOrder"
import ModalEdit from "./../Orders/ModalEdit"
// import { MDBDataTable } from "mdbreact"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//i18n
import { withTranslation } from "react-i18next"
import { getAllOrder, readOrderById, exportCOA } from "../Orders/api"
//api
// import {getAllOrder,
//     getRecheckOrder} from './api'
import { isAuthenticated } from "./../Authentication/api"
import { useHistory } from "react-router-dom"
import moment from 'moment'
import ModalSelectCOA from "./../Orders/ModalSelectCOA"
import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import pdfFonts from "../../assets/custom-fonts"

import { dailyReport } from "./../Orders/Report/DailyReport"

const animatedComponents = makeAnimated()
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
    normal: "Sarabun-Regular.ttf",
    bold: "Sarabun-Medium.ttf",
    italics: "Sarabun-Italic.ttf",
    bolditalics: "Sarabun-MediumItalic.ttf",
  },
}
const Labatorypage = props => {
  const history = useHistory()

  const [startDate, setStartDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("1")
  const { user, token } = isAuthenticated()
  const [modal, setModal] = useState(false)
  const [modalTR, setModalTR] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalAddorder, setModalAddorder] = useState(false)
  const [modalCoa, setModalCOA] = useState(false)

  const [redirect, setRedirect] = useState(false)
  const [logo, setLogo] = useState(null)

  useEffect(async () => {
    const logoFetch = await exportCOA(token)
    if (logoFetch) {
      setLogo(logoFetch.message)
    }
  }, [])

  const Exportdaily = async () => {
      
      const date_now = moment(new Date(), "Asia/Bangkok").format("YYYY-MM-DD")
    
      return dailyReport(logo, date_now)
  }
  const handleRedi = () => {
    setRedirect(!redirect)
  }

  const toggleModal = () => {
    setModal(!modal)
  }
  const toggleModalCOA = () => {
    setModalCOA(!modalCoa)
    setModal(!modal)
  }

  const toggleModalTestReport = () => {
    setModalTR(!modalTR)
  }

  const toggleModalEdit = () => {
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
 
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <ModalSelectCOA isOpenCOA={modalCoa} toggleCOA={toggleModalCOA} /> */}
        <ModalDetail
          isOpen={modal}
          toggle={toggleModal}
          toggleCOA={toggleModalCOA}
          redirect={redirect}
          handleRedirect={handleRedi}
        />
        <ModalAddOrder
          isOpenAddorder={modalAddorder}
          toggleAddorder={toggleModalAddOrder}
          redirect={redirect}
          handleRedirect={handleRedi}
        />
        <ModalTestReport
          isOpenTR={modalTR}
          toggleTR={toggleModalTestReport}
          redirect={redirect}
          handleRedirect={handleRedi}
        />
        {/* <TestReport isOpenTR={modalTR} toggleTR={toggleModalTestReport}/> */}
        <ModalEdit
          redirect={redirect}
          handleRedirect={handleRedi}
          isOpenEdit={modalEdit}
          toggleEdit={toggleModalEdit}
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
                              active: activeTab === "7",
                            })}
                            onClick={() => {
                              toggleTab("7")
                            }}
                          >
                            Reprocess
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "6",
                            })}
                            onClick={() => {
                              toggleTab("6")
                            }}
                          >
                            Complete Check
                          </NavLink>
                        </NavItem>

                     
                      </ul>
                    </Col>
                  </Row>
                 

                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="all-order">
                      <div>
                        <OrderTable
                          redirect={redirect}
                          handleRedirect={handleRedi}
                          page={"lab"}
                          tricker={"allOrder"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                          toggleEdit={toggleModalEdit}
                          toggleTR={toggleModalTestReport}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="2" id="urgent">
                      <div>
                        <OrderTable
                          redirect={redirect}
                          handleRedirect={handleRedi}
                          page={"lab"}
                          tricker={"urgent"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                          toggleEdit={toggleModalEdit}
                          toggleTR={toggleModalTestReport}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="3" id="wait">
                      <div>
                        <OrderTable
                          redirect={redirect}
                          handleRedirect={handleRedi}
                          page={"lab"}
                          tricker={"micro"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                          toggleEdit={toggleModalEdit}
                          toggleTR={toggleModalTestReport}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="4" id="processing">
                      <div>
                        <OrderTable
                          redirect={redirect}
                          handleRedirect={handleRedi}
                          page={"lab"}
                          tricker={"recheck"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                          toggleEdit={toggleModalEdit}
                          toggleTR={toggleModalTestReport}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="7" id="Reprocess">
                      <div>
                        <OrderTable
                          page={"lab"}
                          redirect={redirect}
                          handleRedirect={handleRedi}
                          tricker={"Reprocess"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                          toggleEdit={toggleModalEdit}
                          toggleTR={toggleModalTestReport}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="6" id="CompleteCheck">
                      <div>
                        <TableCompleteCheck
                          page={"lab"}
                          redirect={redirect}
                          handleRedirect={handleRedi}
                          tricker={"CompleteCheck"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                          toggleEdit={toggleModalEdit}
                          toggleTR={toggleModalTestReport}
                        />
                      </div>
                    </TabPane>

                  
                  </TabContent>
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
  t: PropTypes.any,
}
export default withRouter(withTranslation()(Labatorypage))
