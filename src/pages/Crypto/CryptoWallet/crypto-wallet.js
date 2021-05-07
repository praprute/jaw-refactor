import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { Card, CardBody, Col, Container, Media, Row } from "reactstrap"
import { withRouter } from "react-router-dom"
import "assets/scss/datatables.scss"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { getWallet } from "store/actions"
import WalletActivities from "./walletActivities"
import WalletStats from "./walletStats"
import WalletOverView from "./walletOverView"

const CryptoWallet = props => {
  const {
    wallet,
    wallet: { walletHistory },
    onGetWallet,
  } = props
  const [isMenu, setIsMenu] = useState(false)
  const [activeTab, setActiveTab] = useState("1")

  useEffect(() => {
    onGetWallet()
  }, [onGetWallet])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const toggleMenu = () => {
    setIsMenu(!isMenu)
  }

  return (
    <React.Fragment>
      <div className="page-content">
      <MetaTags>
          <title>Wallet | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Wallet" />
          {!isEmpty(wallet) && (
            <Row>
              <Col xl="4">
                <WalletStats
                  wallet={wallet}
                  isMenu={isMenu}
                  toggleMenu={toggleMenu}
                />
              </Col>
              <Col xl="8">
                <Row>
                  <Col sm="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <div className="me-3 align-self-center">
                            <i className="mdi mdi-bitcoin h2 text-warning mb-0" />
                          </div>
                          <Media body>
                            <p className="text-muted mb-2">Bitcoin Wallet</p>
                            <h5 className="mb-0">
                              1.02356 BTC{" "}
                              <span className="font-size-14 text-muted">
                                = $ 9148.00
                              </span>
                            </h5>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <div className="me-3 align-self-center">
                            <i className="mdi mdi-ethereum h2 text-primary mb-0" />
                          </div>
                          <Media body>
                            <p className="text-muted mb-2">Ethereum Wallet</p>
                            <h5 className="mb-0">
                              0.04121 ETH{" "}
                              <span className="font-size-14 text-muted">
                                = $ 8235.00
                              </span>
                            </h5>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <div className="me-3 align-self-center">
                            <i className="mdi mdi-litecoin h2 text-info mb-0" />
                          </div>
                          <Media body>
                            <p className="text-muted mb-2">litecoin Wallet</p>
                            <h5 className="mb-0">
                              0.00356 BTC{" "}
                              <span className="font-size-14 text-muted">
                                = $ 4721.00
                              </span>
                            </h5>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <WalletOverView wallet={wallet} />
              </Col>
            </Row>
          )}
          <Row>
            <Col lg="12">
              {!isEmpty(walletHistory) && (
                <WalletActivities
                  walletHistory={walletHistory}
                  activeTab={activeTab}
                  toggleTab={toggleTab}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CryptoWallet.propTypes = {
  wallet: PropTypes.any,
  onGetWallet: PropTypes.func,
}

const mapStateToProps = ({ crypto }) => ({
  wallet: crypto.wallet,
})

const mapDispatchToProps = dispatch => ({
  onGetWallet: () => dispatch(getWallet()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CryptoWallet))
