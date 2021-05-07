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
import ModalDetail from './ModalDetail'
import ModalAddOrder from './ModalAddOrder'
import ModalEdit from './ModalEdit'
import ModalSelectCOA from './ModalSelectCOA'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//i18n
import { withTranslation } from "react-i18next"

//api
import {getAllOrder, 
    getRecheckOrder} from './api'
import { isAuthenticated } from './../Authentication/api'
import { useHistory } from 'react-router-dom'

const Orderpage = props => {
    const history = useHistory();
    
    const [startDate, setStartDate] = useState(new Date())
    const [activeTab, setActiveTab] = useState("1")
    const {user, token} = isAuthenticated()
    const [modal, setModal] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalAddorder, setModalAddorder] = useState(false)
    const [modalCoa, setModalCOA] = useState(false)

    const toggleModal = () => {
      setModal(!modal)
    }

    const toggleModalCOA = () => {
      setModalCOA(!modalCoa)
      setModal(!modal)
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
            <ModalSelectCOA isOpenCOA={modalCoa} toggleCOA={toggleModalCOA}/>
            <ModalDetail isOpen={modal} toggle={toggleModal} toggleCOA={toggleModalCOA}/>
            <ModalAddOrder  isOpenAddorder={modalAddorder} toggleAddorder={toggleModalAddOrder}/>
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
                            <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1")
                        }}
                      >
                        All Orders
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
                        Rechecking
                      </NavLink>
                    </NavItem>
                  </ul>
                            </Col>
                            {/* <Col md="2" xs="12" style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                            <ul className="nav nav-pills">
                        <Button
                color="primary"
                onClick={() => {
                
                }}
                id="sa-basic"
                size="sm"
            >
                Add Order
            </Button> 
                      </ul>
                            </Col> */}
                </Row>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="all-order">
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
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
                    <OrderTable toggleCOA={toggleModalCOA} toggle={toggleModal} toggleEdit={toggleModalEdit}/>
                    </TabPane>
                    
                    <TabPane tabId="2" id="processing">
                      <div>
                      <OrderTableRecheck toggleCOA={toggleModalCOA} toggle={toggleModal} />
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
      t: PropTypes.any
    }
export default withRouter(withTranslation()(Orderpage))