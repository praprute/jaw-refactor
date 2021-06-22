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
//Component
import ModalEditSample from "./EditSample"
import ModaladdSample from "./ModaladdSample"
import LatestTranaction from "../Dashboard/LatestTranaction"
import OrderTableSample from "./TableSample"
import OrderTable from "./Table"
import TablePassCheckAndPass from "./TablePassCheckAndPass"
import OrderTableRecheck from "./TableRecheck"
import ModalDetail from "./ModalDetail"
import ModalAddOrder from "./ModalAddOrder"
import ModalEdit from "./ModalEdit"
import ModalSelectCOA from "./ModalSelectCOA"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//i18n
import { withTranslation } from "react-i18next"

//api
import { getAllOrder, getRecheckOrder } from "./api"
import { isAuthenticated } from "./../Authentication/api"
import { useHistory } from "react-router-dom"
// TablePassCheckAndPass
const Orderpage = props => {
  const history = useHistory()

  const [startDate, setStartDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("1")
  const { user, token } = isAuthenticated()
  const [modal, setModal] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalAddorder, setModalAddorder] = useState(false)
  const [modalCoa, setModalCOA] = useState(false)
  const [sample, setSample] = useState(false)
  const [Editsample, setEditsample] = useState(false)
  const [tricker, setTricker] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  const toggleSample = () => {
    setSample(!sample)
  }

  const toggleModalCOA = () => {
    setModalCOA(!modalCoa)
    setModal(!modal)
  }
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit)
  }
  const toggleModalAddOrder = () => {
    setModalAddorder(!modalAddorder)
  }

  const toggleEditSample = () => {
    setEditsample(!Editsample)
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
    // if(user){
    //   if(user.role == "1"){
    //   history.push('/Orders')
    // }
    // if(user.role == "2"){
    //   history.push('/labatory')
    // }
    // }else{
    //   history.push('/login')
    // }
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <ModalEditSample
          isOpenEditSample={Editsample}
          toggleEditSample={toggleEditSample}
        />
        <ModaladdSample isOpenSample={sample} toggleSample={toggleSample} />
        <ModalSelectCOA isOpenCOA={modalCoa} toggleCOA={toggleModalCOA} />
        <ModalDetail
          isOpen={modal}
          toggle={toggleModal}
          toggleCOA={toggleModalCOA}
        />
        <ModalAddOrder
          isOpenAddorder={modalAddorder}
          toggleAddorder={toggleModalAddOrder}
        />
        <ModalEdit isOpenEdit={modalEdit} toggleEdit={toggleModalEdit} />
        <MetaTags>
          <title>Orders | Orders - Application</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Orders")}
            breadcrumbItem={props.t("Orders")}
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
                            Sample
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
                            All Orders
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
                            Rechecking
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
                            Complete Check
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
                      <div className="ms-auto">
                        <ul className="nav nav-pills">
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              color="primary"
                              onClick={toggleSample}
                              id="sa-basic"
                              size="sm"
                            >
                              ส่งตัวอย่าง
                            </Button>
                          </div>
                        </ul>
                      </div>
                      <OrderTableSample
                        toggleEditSample={toggleEditSample}
                        toggleCOA={toggleModalCOA}
                        toggle={toggleModal}
                        toggleEdit={toggleModalEdit}
                      />
                    </TabPane>

                    <TabPane tabId="2" id="all-order">
                      <div className="ms-auto">
                        <ul className="nav nav-pills">
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              color="primary"
                              onClick={toggleModalAddOrder}
                              id="sa-basic"
                              size="sm"
                            >
                              Add Order
                            </Button>
                          </div>
                        </ul>
                      </div>
                      <OrderTable
                        toggleCOA={toggleModalCOA}
                        toggle={toggleModal}
                        toggleEdit={toggleModalEdit}
                      />
                    </TabPane>

                    <TabPane tabId="3" id="processing">
                      <div>
                        <OrderTableRecheck
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="4" id="CompleteCheck">
                      <div>
                        <TablePassCheckAndPass
                          tricker={"CompleteCheck"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
                        />
                      </div>
                    </TabPane>

                    <TabPane tabId="5" id="pass">
                      <div>
                        <TablePassCheckAndPass
                          tricker={"pass"}
                          toggleCOA={toggleModalCOA}
                          toggle={toggleModal}
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

Orderpage.propTypes = {
  t: PropTypes.any,
}
export default withRouter(withTranslation()(Orderpage))
