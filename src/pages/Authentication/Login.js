import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux  <Redirect to="/dashboard" />
import { connect } from "react-redux"
import { withRouter, Link, Redirect } from "react-router-dom"
import { BrowserRouter } from "react-router"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"

//Import config
import { facebook, google } from "../../config"

//useHistury
import { useHistory } from "react-router-dom"

//api
import { signInUser, authenticate, isAuthenticated } from "./api"

const Login = props => {
  const history = useHistory()
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
    setregisFail(false)
    setregisSuc(false)
  }

  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const [regisFail, setregisFail] = useState(false)
  const [regisSuc, setregisSuc] = useState(false)
  const [redireact, setRedirect] = useState(false)
  const [textResponse, settextResponse] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    signInUser(values).then(response => {
      // console.log(response)
      if (response) {
        if (response.success == "success") {
          // console.log(response)
          setregisSuc(true)
          settextResponse(response.message_th)
          setValues({ ...values, username: "", password: "" })

          authenticate(
            {
              user: response.user,
              token: response.token,
            },
            () => {
              history.push("/dashboard")
            }
          )
          //
        } else {
          // console.log(response)
          setregisFail(true)
          settextResponse(response.message_th)
        }
      } else {
        return null
      }
    })
    // console.log(props.registerUser(values))
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Lunch - Application</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Application.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
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
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {regisSuc ? (
                        <Alert color="success">{textResponse}</Alert>
                      ) : null}

                      {regisFail ? (
                        <Alert color="danger">{textResponse}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          type="text"
                          // required
                          placeholder="Enter username"
                          onChange={handleChange("username")}
                          value={values.username}
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          // required
                          placeholder="Enter Password"
                          onChange={handleChange("password")}
                          value={values.password}
                        />
                      </div>
                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Log In
                        </button>
                      </div>
                      <div className="mt-4 text-center"></div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="register" className="fw-medium text-primary">
                    Signup now
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(Login)
connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}
