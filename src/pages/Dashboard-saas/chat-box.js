import React, { Component } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap"
import { Link } from "react-router-dom"

//Simple bar
import SimpleBar from "simplebar-react"

class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search_Menu: false,
      settings_Menu: false,
      other_Menu: false,
    }
    this.toggleSearch = this.toggleSearch.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleOther = this.toggleOther.bind(this)
  }

  //Toggle Chat Box Menus
  toggleSearch() {
    this.setState(prevState => ({
      search_Menu: !prevState.search_Menu,
    }))
  }

  toggleSettings() {
    this.setState(prevState => ({
      settings_Menu: !prevState.settings_Menu,
    }))
  }

  toggleOther() {
    this.setState(prevState => ({
      other_Menu: !prevState.other_Menu,
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="4">
          <Card>
            <CardBody className="border-bottom">
              <Row>
                <Col md="4" xs="9">
                  <h5 className="font-size-15 mb-1">Steven Franklin</h5>
                  <p className="text-muted mb-0">
                    <i className="mdi mdi-circle text-success align-middle me-1" />{" "}
                    Active now
                  </p>
                </Col>
                <Col md="8" xs="3">
                  <ul className="list-inline user-chat-nav text-end mb-0">
                    <li className="list-inline-item d-none d-sm-inline-block">
                      <Dropdown
                        isOpen={this.state.search_Menu}
                        toggle={this.toggleSearch}
                      >
                        <DropdownToggle
                          tag="i"
                          className="btn nav-btn"
                          type="button"
                        >
                          <i className="bx bx-search-alt-2" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end py-0 dropdown-menu-md">
                          <Form className="p-3">
                            <FormGroup className="m-0">
                              <InputGroup>
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search ..."
                                  aria-label="Recipient's username"
                                />
                                <InputGroupAddon addonType="append">
                                  <Button color="primary" type="submit">
                                    <i className="mdi mdi-magnify" />
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                          </Form>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                    <li className="list-inline-item  d-none d-sm-inline-block">
                      <Dropdown
                        isOpen={this.state.settings_Menu}
                        toggle={this.toggleSettings}
                      >
                        <a className="dropdown-toggle" className="btn nav-btn" tag="i">
                          <i className="bx bx-cog" />
                        </a>
                        <DropdownMenu>
                          <DropdownItem href="#">View Profile</DropdownItem>
                          <DropdownItem href="#">Clear chat</DropdownItem>
                          <DropdownItem href="#">Muted</DropdownItem>
                          <DropdownItem href="#">Delete</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </li>

                    <li className="list-inline-item">
                      <Dropdown
                        isOpen={this.state.other_Menu}
                        toggle={this.toggleOther}
                      >
                        <a className="dropdown-toggle" className="btn nav-btn" tag="i">
                          <i className="bx bx-dots-horizontal-rounded" />
                        </a>
                        <DropdownMenu  className="dropdown-menu-end">
                          <DropdownItem href="#">Action</DropdownItem>
                          <DropdownItem href="#">Another Action</DropdownItem>
                          <DropdownItem href="#">Something else</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                  </ul>
                </Col>
              </Row>
            </CardBody>
            <CardBody className="pb-0">
              <div>
                <div className="chat-conversation">
                  <SimpleBar style={{ maxHeight: "270px" }}>
                    <ul className="list-unstyled">
                      <li>
                        <div className="chat-day-title">
                          <span className="title">Today</span>
                        </div>
                      </li>
                      <li>
                        <div className="conversation-list">
                          <UncontrolledDropdown direction="left" className="ms-2">
                            <a className="dropdown-toggle" tag="i">
                              <i className="bx bx-dots-vertical-rounded" />
                            </a>
                            <DropdownMenu direction="right">
                              <DropdownItem href="#">Copy</DropdownItem>
                              <DropdownItem href="#">Save</DropdownItem>
                              <DropdownItem href="#">Forward</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <div className="ctext-wrap">
                            <div className="conversation-name">
                              Steven Franklin
                            </div>
                            <p>Hello!</p>
                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle me-1" />{" "}
                              10:00
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className="right">
                        <div className="conversation-list">
                          <UncontrolledDropdown direction="left" className="ms-2">
                            <a className="dropdown-toggle" tag="i">
                              <i className="bx bx-dots-vertical-rounded" />
                            </a>
                            <DropdownMenu direction="right">
                              <DropdownItem href="#">Copy</DropdownItem>
                              <DropdownItem href="#">Save</DropdownItem>
                              <DropdownItem href="#">Forward</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <div className="ctext-wrap">
                            <div className="conversation-name">Henry Wells</div>
                            <p>Hi, How are you? What about our next meeting?</p>

                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle me-1" />{" "}
                              10:02
                            </p>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="conversation-list">
                          <UncontrolledDropdown direction="left" className="ms-2">
                            <a className="dropdown-toggle" tag="i">
                              <i className="bx bx-dots-vertical-rounded" />
                            </a>
                            <DropdownMenu direction="right">
                              <DropdownItem href="#">Copy</DropdownItem>
                              <DropdownItem href="#">Save</DropdownItem>
                              <DropdownItem href="#">Forward</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <div className="ctext-wrap">
                            <div className="conversation-name">
                              Steven Franklin
                            </div>
                            <p>Yeah everything is fine</p>

                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle me-1" />{" "}
                              10:06
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className="last-chat">
                        <div className="conversation-list">
                          <UncontrolledDropdown direction="left" className="ms-2">
                            <a className="dropdown-toggle" tag="i">
                              <i className="bx bx-dots-vertical-rounded" />
                            </a>
                            <DropdownMenu direction="right">
                              <DropdownItem href="#">Copy</DropdownItem>
                              <DropdownItem href="#">Save</DropdownItem>
                              <DropdownItem href="#">Forward</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <div className="ctext-wrap">
                            <div className="conversation-name">
                              Steven Franklin
                            </div>
                            <p>& Next meeting tomorrow 10.00AM</p>
                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle me-1" />{" "}
                              10:06
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className=" right">
                        <div className="conversation-list">
                          <UncontrolledDropdown direction="left" className="ms-2">
                            <a className="dropdown-toggle" tag="i">
                              <i className="bx bx-dots-vertical-rounded" />
                            </a>
                            <DropdownMenu direction="right">
                              <DropdownItem href="#">Copy</DropdownItem>
                              <DropdownItem href="#">Save</DropdownItem>
                              <DropdownItem href="#">Forward</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <div className="ctext-wrap">
                            <div className="conversation-name">Henry Wells</div>
                            <p>{"Wow that's great"}</p>

                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle me-1" />{" "}
                              10:07
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </SimpleBar>
                </div>
              </div>
            </CardBody>

            <div className="p-3 chat-input-section">
              <Row>
                <Col>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control rounded chat-input"
                      placeholder="Enter Message..."
                    />
                    <div className="chat-input-links">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
                              className="mdi mdi-emoticon-happy-outline"
                              id="Emojitooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Emojitooltip"
                            >
                              Emojis
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
                              className="mdi mdi-file-image-outline"
                              id="Imagetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Imagetooltip"
                            >
                              Images
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
                              className="mdi mdi-file-document-outline"
                              id="Filetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Filetooltip"
                            >
                              Add Files
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <div className="col-auto">
                  <Button
                    type="submit"
                    color="primary"
                    className="chat-send w-md "
                  >
                    <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
                    <i className="mdi mdi-send" />
                  </Button>
                </div>
              </Row>
            </div>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default ChatBox
