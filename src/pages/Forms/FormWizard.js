import React, { useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(25)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
      }
    }
  }

  function toggleTabProgress(tab) {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTabProgress(tab)

        if (tab === 1) {
          setprogressValue(25)
        }
        if (tab === 2) {
          setprogressValue(50)
        }
        if (tab === 3) {
          setprogressValue(75)
        }
        if (tab === 4) {
          setprogressValue(100)
        }
      }
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Form Wizard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Basic Wizard</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                          >
                            <span className="number">1.</span>{" "}
                            Seller Details
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                          >
                            <span className="number ms-2">02</span>{" "}
                            Company Document
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 3 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                          >
                            <span className="number">03</span>{" "}
                          Bank Details
                        </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4)
                            }}
                          >
                            <span className="number">04</span>{" "}
                          Confirm Detail
                        </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix mt-4">
                      <TabContent
                        activeTab={activeTab}
                      >
                        <TabPane tabId={1}>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    First name
                                </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    Last name
                                </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-phoneno-input3">
                                    Phone
                                </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-phoneno-input3"
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-email-input4">
                                    Email
                                </Label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="basicpill-email-input4"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Label for="basicpill-address-input1">
                                    Address
                                </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control"
                                    rows="2"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-pancard-input5">
                                      PAN Card
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-pancard-input5"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-vatno-input6">
                                      VAT/TIN No.
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-vatno-input6"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cstno-input7">
                                      CST No.
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cstno-input7"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-servicetax-input8">
                                      Service Tax No.
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-servicetax-input8"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-companyuin-input9">
                                      Company UIN
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-companyuin-input9"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-declaration-input10">
                                      Declaration
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-Declaration-input10"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-namecard-input11">
                                      Name on Card
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-namecard-input11"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label>Credit Card Type</Label>
                                    <select className="form-select">
                                      <option defaultValue>
                                        Select Card Type
                                    </option>
                                      <option value="AE">American Express</option>
                                      <option value="VI">Visa</option>
                                      <option value="MC">MasterCard</option>
                                      <option value="DI">Discover</option>
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cardno-input12">
                                      Credit Card Number
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cardno-input12"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-card-verification-input">
                                      Card Verification Number
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-card-verification-input"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-expiration-input13">
                                      Expiration Date
                                  </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-expiration-input13"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar of
                                    the resulting
                                </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1
                              ? "previous disabled"
                              : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTab === 4
                              ? "next disabled"
                              : "next"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTabVartical + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>

                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Vertical Wizard</h4>
                  <div className="vertical-wizard wizard clearfix vertical">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 1,
                          })}>
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 1,
                            })}
                            onClick={() => {
                              toggleTabVertical(1)
                            }}
                          >
                            <span className="number">1.</span>{" "}
                            Seller Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 2,
                          })}>
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 2,
                            })}
                            onClick={() => {
                              toggleTabVertical(2)
                            }}
                          >
                            <span className="number">2.</span>{" "}
                            <span>Company Document</span>
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 3,
                          })}>
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 3,
                            }), 'done'}
                            onClick={() => {
                              toggleTabVertical(3)
                            }}
                          >
                            <span className="number">3.</span>{" "}
                            Bank Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 4,
                          })}>
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 4,
                            }), 'done'}
                            onClick={() => {
                              toggleTabVertical(4)
                            }}
                          >
                            <span className="number">4.</span>{" "}
                            Confirm Detail
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent
                        activeTab={activeTabVartical}
                        className="body"
                      >
                        <TabPane tabId={1}>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-firstname-input1">
                                    First name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-lastname-input2">
                                    Last name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-phoneno-input3">
                                    Phone
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-phoneno-input3"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-email-input4">
                                    Email
                                  </Label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="basicpill-email-input4"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="12">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-address-input1">
                                    Address
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control"
                                    rows="2"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-pancard-input5">
                                      PAN Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-pancard-input5"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-vatno-input6">
                                      VAT/TIN No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-vatno-input6"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-cstno-input7">
                                      CST No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cstno-input7"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-servicetax-input8">
                                      Service Tax No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-servicetax-input8"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-companyuin-input9">
                                      Company UIN
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-companyuin-input9"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-declaration-input10">
                                      Declaration
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-Declaration-input10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-namecard-input11">
                                      Name on Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-namecard-input11"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label>Credit Card Type</Label>
                                    <select className="form-select">
                                      <option>
                                        Select Card Type
                                      </option>
                                      <option>
                                        American Express
                                      </option>
                                      <option>Visa</option>
                                      <option>MasterCard</option>
                                      <option>Discover</option>
                                    </select>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-cardno-input12">
                                      Credit Card Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cardno-input12"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-card-verification-input">
                                      Card Verification Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-card-verification-input"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-expiration-input13">
                                      Expiration Date
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-expiration-input13"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar
                                    of the resulting
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTabVartical === 1
                              ? "previous disabled"
                              : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTabVartical === 4
                              ? "next disabled"
                              : "next"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormWizard
