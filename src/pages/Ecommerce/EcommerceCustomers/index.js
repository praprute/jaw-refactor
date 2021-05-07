import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import * as moment from 'moment';
import {
  Button, Card, CardBody, Col, Container, Row, Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer
} from "store/e-commerce/actions"

const EcommerceCustomers = props => {
  const [modal, setModal] = useState(false)
  const { customers, onGetCustomers } = props
  const [customerList, setCustomerList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: customers.length, // replace later with size(orders),
    custom: true,
  }
  const selectRow = {
    mode: 'checkbox'
  };

  const EcommerceCustomerColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, row) => (
        <>
          {row.id}
        </>
      ),
    },
    {
      dataField: "username",
      text: "Username",
      sort: true,
    },
    {
      text: "Phone / Email",
      dataField: "phone",
      sort: true,
      formatter: (cellContent, row) => (
        <>
          <p className="mb-1">{row.phone}</p>
          <p className="mb-0">{row.email}</p>
        </>
      ),
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
    },
    {
      dataField: "rating",
      text: "Rating",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge color="success" className="bg-success font-size-12">
          <i className="mdi mdi-star me-1" />
          {row.rating}
        </Badge>
      ),
    },
    {
      dataField: "walletBalance",
      text: "Wallet Balances",
      sort: true,
    },
    {
      dataField: "joiningDate",
      text: "Joining Date",
      sort: true,
      formatter: (cellContent, row) => (
        handleValidDate(row.joiningDate)
      ),
    },
    {
      dataField: "menu",
      isDummyField: true,
      text: "Action",
      formatter: (cellContent, customer) => (
        <UncontrolledDropdown direction="left">
          <DropdownToggle href="#" className="card-drop" tag="i">
            <i className="mdi mdi-dots-horizontal font-size-18" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem href="#" onClick={() => handleCustomerClick(customer)}>
              <i className="fas fa-pencil-alt text-success me-1" />
              Edit
            </DropdownItem>
            <DropdownItem href="#" onClick={() => handleDeleteCustomer(customer)}>
              <i className="fas fa-trash-alt text-danger me-1" />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ]

  const toggle = () => {
    setModal(!modal)
  }

  const handleCustomerClick = arg => {
    const customer = arg

    setCustomerList({
      id: customer.id,
      username: customer.username,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      rating: customer.rating,
      walletBalance: customer.walletBalance,
      joiningDate: customer.joiningDate,
    })

    setIsEdit(true)
    toggle()
  }

  const handleDeleteCustomer = (customer) => {
    const { onDeleteCustomer } = props
    onDeleteCustomer(customer)
  }

  /**
  * Handling submit customer on customer form
  */
  const handleValidCustomerSubmit = (e, values) => {
    const { onAddNewCustomer, onUpdateCustomer } = props

    if (isEdit) {
      const updateCustomer = {
        id: customerList.id,
        username: values.username,
        phone: values.phone,
        email: values.email,
        address: values.address,
        rating: values.rating,
        walletBalance: values.walletBalance,
        joiningDate: values.joiningDate,
      }

      // update customer
      onUpdateCustomer(updateCustomer)

    } else {

      const newCustomer = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        username: values["username"],
        phone: values["phone"],
        email: values["email"],
        address: values["address"],
        rating: values["rating"],
        walletBalance: values["walletBalance"],
        joiningDate: values["joiningDate"],
      }
      // save new customer
      onAddNewCustomer(newCustomer)

    }
    toggle()
  }
  const { SearchBar } = Search

  // useEffect(() => {
  //   onGetCustomers()
  //   setCustomerList(customers)
  // }, [onGetCustomers])

  useEffect(() => {
    if (customers && !customers.length) {
      onGetCustomers();
    }
  }, [onGetCustomers, customers]);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers])

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers)
    }
  }, [customers])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setCustomerList(
      customers.filter(customer =>
        Object.keys(customer).some(key =>
          customer[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
  }

  const handleCustomerClicks = () => {
    setCustomerList('')
    setIsEdit(false)
    toggle()
  }

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];

  /** set Date formate */
  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format('DD MMM Y');
    return date1;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Customers | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Customers" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={EcommerceCustomerColumns}
                    data={customers}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={customers || []}
                        columns={EcommerceCustomerColumns}
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
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={handleCustomerClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    New customer
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap"
                                    }
                                    keyField="id"
                                    {...toolkitProps.baseProps}
                                    onTableChange={handleTableChange}
                                    {...paginationTableProps}
                                  />
                                </div>
                                <Modal
                                  isOpen={modal}
                                  toggle={toggle}
                                >
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit ? "Edit Customer" : "Add Customer"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm
                                      onValidSubmit={
                                        handleValidCustomerSubmit
                                      }
                                    >
                                      <Row form>
                                        <Col className="col-12">

                                          <div className="mb-3">
                                            <AvField
                                              name="username"
                                              label="User Name"
                                              type="text"
                                              errorMessage="Invalid user name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.username || ""}
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="phone"
                                              label="Phone No"
                                              type="text"
                                              errorMessage="Invalid Phone no"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.phone || ""}
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="email"
                                              label="Email Id"
                                              type="email"
                                              errorMessage="Invalid Email"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.email || ""}
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="address"
                                              label="Address"
                                              type="textarea"
                                              errorMessage="Invalid Address"
                                              rows="3"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.address || ""}
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="rating"
                                              label="Rating"
                                              type="text"
                                              errorMessage="Invalid Rating"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.rating || ""}
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="walletBalance"
                                              label="Wallet Balance"
                                              type="text"
                                              errorMessage="Invalid Wallet Balance"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.walletBalance || ""
                                              }
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="joiningDate"
                                              label="Joining Date"
                                              type="date"
                                              errorMessage="Invalid Joining Date"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={customerList.joiningDate || ""
                                              }
                                            />
                                          </div>

                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">

                                            <button
                                              type="submit"
                                              className="btn btn-success save-customer"
                                            >
                                              Save
                                            </button>

                                          </div>
                                        </Col>
                                      </Row>
                                    </AvForm>
                                  </ModalBody>
                                </Modal>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
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

EcommerceCustomers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func
}

const mapStateToProps = ({ ecommerce }) => ({
  customers: ecommerce.customers,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomers: () => dispatch(getCustomers()),
  onAddNewCustomer: customer => dispatch(addNewCustomer(customer)),
  onUpdateCustomer: customer => dispatch(updateCustomer(customer)),
  onDeleteCustomer: customer => dispatch(deleteCustomer(customer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EcommerceCustomers)
