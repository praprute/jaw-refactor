import React from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
import { Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import CarouselPage from "./CarouselPage"

const Login2 = () => {
  return (
    <React.Fragment>
       <div>
       <MetaTags>
          <title>Login 2 | Skote - React Admin & Dashboard Template</title>
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
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to Skote.
                          </p>
                        </div>

                        <div className="mt-4">

                          
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
                        <div className="float-end">
                                <Link
                                  to="auth-recoverpw-2"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                          <AvField
                            name="password"
                            label="Password"
                            className="form-control"
                            placeholder="Enter password"
                            type="password"
                            required
                          />
                        </div>

                        <div className="form-check">
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="auth-remember-check"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                        
                        </AvForm>

                          <Form action="dashboard">
                            <div className="mt-4 text-center">
                              <h5 className="font-size-14 mb-3">
                                Sign in with
                              </h5>

                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <Link
                                    to="#"
                                    className="social-list-item bg-primary text-white border-primary"
                                  >
                                    <i className="mdi mdi-facebook"></i>
                                  </Link>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <Link
                                    to="#"
                                    className="social-list-item bg-info text-white border-info"
                                  >
                                    <i className="mdi mdi-twitter"></i>
                                  </Link>
                                </li>{" "}
                                <li className="list-inline-item">
                                  <Link
                                    to="#"
                                    className="social-list-item bg-danger text-white border-danger"
                                  >
                                    <i className="mdi mdi-google"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Form>
                          <div className="mt-5 text-center">
                            <p>
                              Don't have an account ?{" "}
                              <Link
                                to="pages-register-2"
                                className="fw-medium text-primary"
                              >
                                {" "}
                                Signup now{" "}
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

export default Login2
