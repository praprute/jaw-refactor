import React from "react"
// availity-reactstrap-validation
import MetaTags from 'react-meta-tags';
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Link } from "react-router-dom"

import { Row, Col, CardBody, Card, Container } from "reactstrap"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Register = () => {
  return (
    <React.Fragment>
     <MetaTags>
          <title>Register | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
      <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2"/>
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={8} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free Skote account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm className="form-horizontal">
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="username"
                            label="Username"
                            type="text"
                            required
                            placeholder="Enter username"
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="Enter password"
                          />
                        </div>

                        <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary btn-block "
                            type="submit"
                          >
                            Register
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <h5 className="font-size-14 mb-3">Sign up using</h5>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-primary text-white border-primary"
                              >
                                <i className="mdi mdi-facebook"/>
                              </Link>
                            </li>{" "}
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-info text-white border-info"
                              >
                                <i className="mdi mdi-twitter"/>
                              </Link>
                            </li>{" "}
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-danger text-white border-danger"
                              >
                                <i className="mdi mdi-google"/>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            By registering you agree to the Skote{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link
                      to="/pages-login"
                      className="fw-medium text-primary"
                    >
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Skote. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"/> by Themesbrand
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </React.Fragment>
  )
}

export default Register
