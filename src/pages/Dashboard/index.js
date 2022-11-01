import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
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
import DonutChart from "./DonutFG"
import DountchartST from "./DonuST"
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
import { isAuthenticated } from "./../Authentication/api"
import { useHistory } from "react-router-dom"
import { readFG } from "./../Orders/api"
import { updateCardDS, readCardDS } from "./api"
//store
import { connect } from "react-redux"
import { addFG, getFG } from "store/actions"

import ModalDetail from "./../Orders/ModalDetail"
import ModalSelectCOA from "./../Orders/ModalSelectCOA"
const Dashboard = props => {
  const history = useHistory()
  const { FG, onAddFG } = props
  const [modal, setModal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)
  const { user, token } = isAuthenticated()
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
    },
  ]
  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ]

  const [fg, setFG] = useState({})
  const [renFG, setRenFG] = useState(false)

  useEffect(() => {
    readFG(token).then(data => {
      if (data) {
        // if(data.success == 'success' && data.message.length > 0){
        // console.log('readFG message: ', data.message[0])
        // setFG([data.message[0].TN, data.message[0].PH, data.message[0].SALT, data.message[0].TSS, data.message[0].HISTAMINE, data.message[0].SPG, data.message[0].AW])
        onAddFG([
          data?.message[0]?.TN,
          data?.message[0]?.PH,
          data?.message[0]?.SALT,
          data?.message[0]?.TSS,
          data?.message[0]?.HISTAMINE,
          data?.message[0]?.SPG,
          data?.message[0]?.AW,
          data?.message[0]?.AN,
          data?.message[0]?.Acidity,
          data?.message[0]?.Viscosity,
        ])
        // setTimeout(() => {
        setRenFG(true)
        // }, 1000);

        // }
      }
    })

    updateCardDS(token)
    readCardDS(token).then(data => {
      if (data) {
        setReports([
          {
            title: "All Sample",
            iconClass: "bxs-cart-add",
            description: data.message[0].ALLSample,
          },
          {
            title: "COA Export",
            iconClass: "bxs-archive-out",
            description: data.message[0].COAExprot,
          },
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
        <ModalSelectCOA isOpenCOA={modalCoa} toggleCOA={toggleModalCOA} />
        <ModalDetail
          isOpen={modal}
          toggle={toggleModal}
          toggleCOA={toggleModalCOA}
        />
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
            <Col xl="12">
              <Row>
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
                    <div className="ms-auto"></div>
                  </div>
                  <div className="clearfix"></div>
                  <Row>
                    <Col md="6" xs="12">
                      <span>Finish Good</span>Sanitize
                      {renFG ? <DonutChart /> : null}
                    </Col>
                    <Col md="6" xs="12">
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
            <Col md="12" xs="21">
              <LatestTranaction
                token={token}
                toggle={toggleModal}
                toggleCOA={toggleModalCOA}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

// export default withRouter(withTranslation()(Dashboard))

Dashboard.propTypes = {
  FG: PropTypes.array,
  onAddFG: PropTypes.func,
}

const mapStateToProps = state => ({
  // orders: state.DetailOrder.Detail,
  // spc: state.DetailOrder.SpecificChem,
  FG: state.DFGST.DFG,
})

const mapDispatchToProps = dispatch => ({
  onAddFG: detail => dispatch(addFG(detail)),
  // onAddSpcChem: (detailSpcChem) => dispatch(GET_FG(detailSpcChem)),
  // onAddTestResult: (detailSpcChem) => dispatch(AddTestResultlasted(detailSpcChem)),
  // onAddSpcBio: (detailSpcChem) => dispatch(AddSpecificBioDetail(detailSpcChem)),
})

// addFG, GET_FG

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(Dashboard)))
