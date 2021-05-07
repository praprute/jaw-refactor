import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap"
import
paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { AvForm, AvField } from "availity-reactstrap-validation"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import images from "assets/images"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getUsers,
  addNewUser,
  updateUser,
  deleteUser
} from "store/contacts/actions"
// import contactListColumns from "./contactListColumns"
import { isEmpty, size, map } from "lodash"
// import { constrainPoint } from "@fullcalendar/common";

const ContactsList = props => {
  const { users, onGetUsers } = props

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: users.length, // replace later with size(users),
    custom: true,
  }

  const defaultSorted = [{
    dataField: 'id', // if dataField is not match to any column you defined, it will be ignored.
    order: 'desc' // desc or asc
  }];

  const selectRow = {
    mode: 'checkbox'
  };

  const contactListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, user) => (
        <>
          {user.id}
        </>
      ),
    },
    {
      dataField: "img",
      text: "#",
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[user.img]}
                alt=""
              />
            </div>
          )}
        </>
      ),
    },
    {
      text: "Name",
      dataField: "name",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.name}
            </Link>
          </h5>
          <p className="text-muted mb-0">{user.designation}</p>
        </>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      text: "Tags",
      dataField: "tags",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          {map(
            user.tags,
            (tag, index) =>
              index < 2 && (
                <Link
                  to="#"
                  className="badge badge-soft-primary font-size-11 m-1"
                  key={"_skill_" + user.id + index}
                >
                  {tag}
                </Link>
              )
          )}
          {size(user.tags) > 2 && (
            <Link
              to="#"
              className="badge badge-soft-primary font-size-11 m-1"
              key={"_skill_" + user.id}
            >
              {size(user.tags) - 1} + more
            </Link>
          )}
        </>
      ),
    },
    {
      dataField: "projects",
      text: "Projects",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => handleUserClick(user)}></i></Link>
          <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => handleDeleteUser(user)}></i></Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (users && !users.length) {
      onGetUsers();
      setIsEdit(false)
    }
  }, [onGetUsers, users]);

  useEffect(() => {
    setUserList(users);
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setUserList(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setUserList({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects
    })

    setIsEdit(true)

    toggle()
  }

  const handleDeleteUser = (user) => {
    const { onDeleteUser } = props
    onDeleteUser(user)
  }

  /**
  * Handling submit user on user form
  */
  const handleValidUserSubmit = (e, values) => {
    const { onAddNewUser } = props

    if (isEdit) {
      const updateUser = {
        id: userList.id,
        name: values.name,
        designation: values.designation,
        tags: values.tags,
        email: values.email,
        projects: values.projects
      }

      // update user
      setUserList(updateUser)
      setIsEdit(false)

    } else {

      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        designation: values["designation"],
        email: values["email"],
        tags: values["tags"],
        projects: values["projects"]
      }
      // save new user
      onAddNewUser(newUser)

    }
    toggle()
  }
  const handleUserClicks = () => {
    setUserList('')
    setIsEdit(false)
    toggle()
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>User List | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={+contactListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={users}
                        columns={contactListColumns}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    color="primary"
                                    className="font-16 btn-block btn btn-primary"
                                    onClick={handleUserClicks}
                                  >
                                    <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New User
                                    </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">

                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    selectRow={selectRow}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-hover"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  />

                                  <Modal
                                    isOpen={modal} toggle={toggle}
                                  >
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit ? "Edit User" : "Add User"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={
                                          handleValidUserSubmit
                                        }
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <div className="mb-3">
                                              <AvField
                                                name="name"
                                                label="Name"
                                                type="text"
                                                errorMessage="Invalid name"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.name || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="designation"
                                                label="Designation"
                                                type="text"
                                                errorMessage="Invalid Designation"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.designation || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="email"
                                                label="Email"
                                                type="email"
                                                errorMessage="Invalid Email"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.email || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField type="select" name="tags" className="form-select" label="Option" helpMessage="MULTIPLE!" multiple={true} required
                                                value={userList.tags || ""}

                                              >
                                                <option>Photoshop</option>
                                                <option>illustrator</option>
                                                <option>Html</option>
                                                <option>Php</option>
                                                <option>Java</option>
                                                <option>Python</option>
                                                <option>UI/UX Designer</option>
                                                <option>Ruby</option>
                                                <option>Css</option>
                                              </AvField>
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="projects"
                                                label="Projects"
                                                type="text"
                                                errorMessage="Invalid Projects"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.projects || ""}
                                              />
                                            </div>
                                          </Col>

                                        </Row>
                                        <Row>
                                          <Col>
                                            <div className="text-end">

                                              <button
                                                type="submit"
                                                className="btn btn-success save-user"
                                              >
                                                Save
                                                    </button>
                                            </div>
                                          </Col>
                                        </Row>
                                      </AvForm>
                                    </ModalBody>
                                  </Modal>
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ContactsList.propTypes = {
  users: PropTypes.array,
  onGetUsers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func
}

const mapStateToProps = ({ contacts }) => ({
  users: contacts.users,
})

const mapDispatchToProps = dispatch => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddNewUser: user => dispatch(addNewUser(user)),
  onUpdateUser: user => dispatch(updateUser(user)),
  onDeleteUser: user => dispatch(deleteUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactsList))
