import React from "react"
import MetaTags from 'react-meta-tags'
import { Link } from "react-router-dom"
import { AvForm, AvField } from "availity-reactstrap-validation"
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"

const Recoverpw = () => {
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
      <MetaTags>
          <title>Recover Password | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Reset Password</h5>
                        <p>Re-Password with Skote.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img
                        src={profile}
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="dashboard">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="p-2">
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    > Enter your Email and instructions will be sent to you! </div>

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
                        <div className="text-end">
                        <button
                          className="btn btn-primary w-md "
                          type="submit"
                        >
                          Reset
                            </button>
                      </div>
                        </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link
                    to="pages-login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                      Sign In here
                    </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Recoverpw
