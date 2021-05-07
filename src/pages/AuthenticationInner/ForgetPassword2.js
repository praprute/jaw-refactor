import React from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
import { Col, Container, Row, Button } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import CarouselPage from "./CarouselPage"

const ForgetPassword2 = () => {
  return (
    <React.Fragment>
       <div>
       <MetaTags>
          <title>Forget Password 2 | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
          <Container fluid className="p-0">
            <Row className="g-0">
              <CarouselPage />

              <Col xl={3}>
                <div className="auth-full-page-content p-md-5 p-4">
                  <div className="w-100">
                    <div className="d-flex flex-column h-100">
                      <div className="mb-4 mb-md-5">
                        <Link to="dashboard" className="d-block auth-logo">
                          <img
                            src={logodark}
                            alt=""
                            height="18"
                            className="auth-logo-dark"
                          />
                          <img
                            src={logolight}
                            alt=""
                            height="18"
                            className="auth-logo-light"
                          />
                        </Link>
                      </div>
                      <div className="my-auto">
                        <div>
                          <h5 className="text-primary">Reset Password</h5>
                          <p className="text-muted">Re-Password with Skote.
                          </p>
                        </div>

                        <div className="mt-4">

                        <div className="alert alert-success text-center mb-4" role="alert">
                                                Enter your Email and instructions will be sent to you!
                                            </div>

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
                        <div className="mt-3 text-end">
                              <Button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                              >
                                Reset
                              </Button>
                            </div>

                        </AvForm>
                          <div className="mt-5 text-center">
                            <p>
                              Remember It ?{" "}
                              <Link
                                to="pages-login-2"
                                className="fw-medium text-primary"
                              >
                                {" "}
                                Sign In here{" "}
                              </Link>{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 mt-md-5 text-center">
                        <p className="mb-0">
                          © {new Date().getFullYear()} Skote. Crafted with{" "}
                          <i className="mdi mdi-heart text-danger"></i> by
                          Themesbrand
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </React.Fragment>
  )
}

export default ForgetPassword2
