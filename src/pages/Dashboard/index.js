import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { withRouter, Link, Redirect } from "react-router-dom"
//import Charts
import StackedColumnChart from "./StackedColumnChart"
// import DonutChart from './../../pages/AllCharts/apex/dountchart'
import DonutChart from './DonutFG'
import DountchartST from './DonuST'
import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//api
import { isAuthenticated } from './../Authentication/api'
import { useHistory } from 'react-router-dom'
import { readFG } from './../Orders/api'
import {updateCardDS, readCardDS} from './api'
//store
import { connect } from "react-redux"
import { addFG, getFG } from 'store/actions'

import ModalDetail from './../Orders/ModalDetail'
import ModalSelectCOA from './../Orders/ModalSelectCOA'
const Dashboard = props => {

  const history = useHistory();
  const { FG, onAddFG } = props
  const [modal, setModal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)
  const {user, token} = isAuthenticated()
  const [recheck, setrecheck] = useState(null)
  const [allSample, setallSample] = useState(null)
  const [coa, setcoa] = useState(null)
  const [modalCoa, setModalCOA] = useState(false)
  const [reports, setReports] = useState([
    { title: "All Sample", iconClass: "bxs-cart-add", description: 0 },
    { title: "COA Export", iconClass: "bxs-archive-out", description: 0 },
    {
      title: "Recheck",
      iconClass: "bxs-hourglass-top",
      description: 0,
    },
  ])
  const toggleModal = () => {
    setModal(!modal)
  }
  const toggleModalCOA = () => {
    setModalCOA(!modalCoa)
    setModal(!modal)
  }
  const snitizeReport = [
    { title: "Swab", iconClass: "bxs-cart-add", description: "1,235" },
    { title: "Air", iconClass: "bx-wind", description: "35, 723" },
    {
      title: "Water",
      iconClass: "bx-water",
      description: "16.2",
    }
  ]
  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ]

  const [fg, setFG] = useState({}) 
  const [renFG, setRenFG] = useState(false)
  // useEffect(() => {
  //   readFG(token).then(data => {
  //     if(data){
  //       if(data.success == 'success' && data.message.length > 0){
  //         // console.log('readFG message: ', data)
  //         setFG(data.message[0])
  //       }
  //     }
  //   })
  // }, [])

  // const DFG = (fg) => {
  //   return (<DonutChart index={fg}/>)
  // }

  useEffect(() => {
    readFG(token).then(data => {
          if(data){
            // if(data.success == 'success' && data.message.length > 0){
              // console.log('readFG message: ', data.message[0])
              // setFG([data.message[0].TN, data.message[0].PH, data.message[0].SALT, data.message[0].TSS, data.message[0].HISTAMINE, data.message[0].SPG, data.message[0].AW])
              onAddFG([data.message[0].TN, data.message[0].PH, 
                data.message[0].SALT, data.message[0].TSS, 
                data.message[0].HISTAMINE, data.message[0].SPG, 
                data.message[0].AW, data.message[0].AN, data.message[0].Acidity, data.message[0].Viscosity])
              // setTimeout(() => {
                setRenFG(true)
              // }, 1000);
             
            // }
          }
        })
  }, [])

  useEffect(() => {
updateCardDS(token)
    readCardDS(token).then(data => {
      if(data){
        // setvaluesDS(data.message[0])
      // console.log('readCardDS : ', data)
      setReports([
        { 
          title: "All Sample", 
          iconClass: "bxs-cart-add", 
          description: data.message[0].ALLSample },
        { 
          title: "COA Export", 
          iconClass: "bxs-archive-out",
          description: data.message[0].COAExprot },
        {
          title: "Recheck",
          iconClass: "bxs-hourglass-top",
          description: data.message[0].Recheck,
        },
      ])
      setrecheck(data.message[0].Recheck)
      setallSample(data.message[0].ALLSample)
      setcoa(data.message[0].COAExprot)
      }
      
//       ALLSample: 10
// COAExprot: 0
// Recheck: 1
// idRealTimeCardDS: 1
    })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <ModalSelectCOA isOpenCOA={modalCoa} toggleCOA={toggleModalCOA}/>
      <ModalDetail isOpen={modal} toggle={toggleModal} toggleCOA={toggleModalCOA}/>
        <MetaTags>
          <title>Dashboard | Run - Application</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            {/* <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col> */}
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {/* <button onClick={() => {
                  history.push('/Orders')
                }}>
                  test page
                </button> */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Lab Orders</h4>
                    <div className="ms-auto">
                      {/* <ul className="nav nav-pills">
                        {email.map((mail, key) => (
                          <li className="nav-item" key={"_li_" + key}>
                            <Link
                              className={
                                mail.isActive ? "nav-link active" : "nav-link"
                              }
                              to={mail.linkto}
                            >
                              {mail.title}
                            </Link>
                          </li>
                        ))}
                      </ul> */}
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <Row>
                    <Col md="6" xs="12">
                    <span>Finish Good</span>Sanitize
                    {renFG ? (
                      <DonutChart />
                    ) : (
                      null
                    ) }
                    </Col>
                    <Col  md="6" xs="12">  
                    <span>Sanitize</span>
                    <DountchartST />
                    </Col>
                  </Row>

                  {/* <StackedColumnChart /> */}
                  
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* <Col  md="4" xs="21">
            {snitizeReport.map((report, key) => (
                  <Col md="12" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
            </Col> */}
            <Col  md="12" xs="21">
            <LatestTranaction token={token} toggle={toggleModal} toggleCOA={toggleModalCOA}/>
            </Col>
          </Row>

          {/* <Row>
            <Col xl="4">
              <SocialSource />
            </Col>
            <Col xl="4">
              <ActivityComp />
            </Col>

            <Col xl="4">
              <TopCities />
            </Col>
          </Row> */}

          {/* <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row> */}

          
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      {/* <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered={true}
        tabIndex="-1"
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal)
        }}
      >
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <ModalHeader
              toggle={() => {
                setSubscribemodal(!subscribemodal)
              }}
            >
            </ModalHeader>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <div className="avatar-md mx-auto mb-4">
                <div className="avatar-title bg-light rounded-circle text-primary h1">
                  <i className="mdi mdi-email-open"></i>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <h4 className="text-primary">Subscribe !</h4>
                  <p className="text-muted font-size-14 mb-4">Subscribe our newletter and get notification to stay update.</p>

                  <div className="input-group bg-light rounded">
                    <Input type="email" className="form-control bg-transparent border-0" placeholder="Enter Email address" />

                    <Button color="primary" type="button" id="button-addon2">
                      <i className="bx bxs-paper-plane"></i>
                    </Button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}

      {/* <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal)
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal)
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-right">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-right">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-right">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal> */}
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any
}

// export default withRouter(withTranslation()(Dashboard))

Dashboard.propTypes = {
  FG: PropTypes.array,
  onAddFG: PropTypes.func,
}

const mapStateToProps = state => ({
  // orders: state.DetailOrder.Detail,
  // spc: state.DetailOrder.SpecificChem,
  FG: state.DFGST.DFG
})

const mapDispatchToProps = dispatch => ({
  onAddFG: (detail) => dispatch(addFG(detail)),
  // onAddSpcChem: (detailSpcChem) => dispatch(GET_FG(detailSpcChem)),
  // onAddTestResult: (detailSpcChem) => dispatch(AddTestResultlasted(detailSpcChem)),
  // onAddSpcBio: (detailSpcChem) => dispatch(AddSpecificBioDetail(detailSpcChem)),
})

// addFG, GET_FG

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(Dashboard)))