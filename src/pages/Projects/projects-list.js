import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import { isEmpty } from "lodash"
import * as moment from 'moment';
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Image
import images from "assets/images"
import companies from "assets/images/companies"

import { 
  getProjects ,
  addNewProject,
  updateProject,
  deleteProject
} from "store/actions"

const ProjectsList = props => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [projectList, setProjectList] = useState([])
  const { projects, onGetProjects } = props

  const toggle = () => {
    setModal(!modal)
  }

  const handleProjectClick = arg => {
    const project = arg

    setProjectList({
      id: project.id,
      img: project.img,
        name: project.name,
        description: project.description,
        status: project.status,
        color: project.color,
        dueDate: project.dueDate,
        team: project.team
    })

    setIsEdit(true)

    toggle()
  }

  const handleDeleteProject = (project) => {
    const { onDeleteProject } = props
    onDeleteProject(project)
  }

  /**
  * Handling submit project on project form
  */
  const handleValidProjectSubmit = (e, values) => {
    const { onAddNewProject, onUpdateProject } = props

    if (isEdit) {
      const updateProject = {
        id: projectList.id,
        img: values.img,
        name: values.name,
        description: values.description,
        status: values.status,
        color: values.color,
        dueDate: values.dueDate,
        team: values.team
      }

      // update project
      onUpdateProject(updateProject)

    } else {

      const newProject = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        description: values["description"],
        status: values["status"],
        color: values["color"],
        dueDate: values["dueDate"],
        team: values["team"]
      }
      // save new project
      onAddNewProject(newProject)

    }
    toggle()
  }

  useEffect(() => {
    onGetProjects()
    setProjectList(projects)
  }, [onGetProjects])

  useEffect(() => {
    if (!isEmpty(projects)) {
      setProjectList(projects)
    }
  }, [projects])

  const handleValidDate = (date) => {
    const date1 =  moment(new Date(date)).format('DD MMM Y');
    return date1;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Projects List | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap align-middle table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "100px" }}>
                          #
                        </th>
                        <th scope="col">Projects</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Team</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {map(projects, (project, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={companies[project.img]}
                              alt=""
                              className="avatar-sm"
                            />
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14">
                              <Link
                                to={`/projects-overview/${project.id}`}
                                className="text-dark"
                              >
                                {project.name}
                              </Link>
                            </h5>
                            <p className="text-muted mb-0">
                              {project.description}
                            </p>
                          </td>
                          <td> {handleValidDate(project.dueDate)}</td>
                          <td>
                            <Badge className={"bg-" + project.color}>
                              {project.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="avatar-group">
                              {map(project.team, (member, index) =>
                                !member.img || member.img !== "Null" ? (
                                  <div className="avatar-group-item" key={index}>
                                    <Link
                                      to="#"
                                      className="team-member d-inline-block"
                                      id="member1"
                                    >
                                      <img
                                        src={images[member.img]}
                                        className="rounded-circle avatar-xs"
                                        alt=""
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="member1"
                                      >
                                        {member.name}
                                      </UncontrolledTooltip>
                                    </Link>
                                  </div>
                                ) : (
                                  <div className="avatar-group-item" key={"_team_" + index}>
                                    <Link
                                      to="#"
                                      className="d-inline-block"
                                      id={"member" + member.id}
                                    >
                                      <div className="avatar-xs">
                                        <span
                                          className={
                                            "avatar-title rounded-circle bg-soft bg-" +
                                            member.color +
                                            " text-" +
                                            member.color +
                                            " font-size-16"
                                          }
                                        >
                                          {member.name.charAt(0)}
                                        </span>
                                        <UncontrolledTooltip
                                          placement="top"
                                          target={"member" + member.id}
                                        >
                                          {member.name}
                                        </UncontrolledTooltip>
                                      </div>
                                    </Link>
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                href="#"
                                className="card-drop"
                                tag="i"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem href="#" onClick={() => handleProjectClick(project)}>
                                    <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                      Edit
                                  </DropdownItem>
                                  <DropdownItem href="#" onClick={() => handleDeleteProject(project)}>
                                    <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                      Delete
                                  </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Modal
                      isOpen={modal}
                      toggle={toggle}
                    >
                      <ModalHeader toggle={toggle} tag="h4">
                        {!!isEdit ? "Edit Project" : "Add Project"}
                      </ModalHeader>
                      <ModalBody>
                        <AvForm
                          onValidSubmit={
                            handleValidProjectSubmit
                          }
                        >
                          <Row form>
                            <Col xs={12}>

                              <AvField type="hidden" value={
                                projectList.img || ""
                              } name="img" />

                              <AvField type="hidden" value={
                                projectList.team || ""
                              } name="team" />

                              <div className="mb-3">
                                <AvField
                                  name="name"
                                  label="Name"
                                  type="text"
                                  errorMessage="Invalid name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    projectList.name || ''
                                  }
                                />
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="description"
                                  label="Description"
                                  type="text"
                                  errorMessage="Invalid Description"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    projectList.description ||  ""
                                  }
                                />
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="status"
                                  id="status1"
                                  label="Status"
                                  type="select"
                                  errorMessage="Invalid Status"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  className="form-select"
                                  value={
                                    projectList.status || "Completed"
                                  }
                                >
                                  <option>Completed</option>
                                  <option>Pending</option>
                                  <option>Delay</option>
                                </AvField>
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="color"
                                  label="Color"
                                  type="select"
                                  className="form-select"
                                  errorMessage="Invalid Color"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    projectList.color ||  "success"
                                  }
                                >
                                  <option>success</option>
                                  <option>warning</option>
                                  <option>danger</option>
                                </AvField>

                              </div>

                              <div className="mb-3">

                                <AvField
                                  name="dueDate"
                                  label="dueDate"
                                  type="date"
                                  errorMessage="Invalid Color"
                                  format='YYYY/MM/DD'
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    projectList.dueDate || ""
                                  }
                                >
                                </AvField>

                              </div>

                            </Col>

                          </Row>
                          <Row>
                            <Col>
                              <div className="text-end">

                                <button
                                  type="submit"
                                  className="btn btn-success save-user"
                                >Save</button>
                              </div>
                            </Col>
                          </Row>
                        </AvForm>
                      </ModalBody>
                    </Modal>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
  onGetProjects: PropTypes.func,
  onAddNewProject: PropTypes.func,
  onDeleteProject: PropTypes.func,
  onUpdateProject: PropTypes.func
}

const mapStateToProps = ({ projects }) => ({
  projects: projects.projects,
});

const mapDispatchToProps = dispatch => ({
  onGetProjects: () => dispatch(getProjects()),
  onAddNewProject: project => dispatch(addNewProject(project)),
  onUpdateProject: project => dispatch(updateProject(project)),
  onDeleteProject: project => dispatch(deleteProject(project)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsList));