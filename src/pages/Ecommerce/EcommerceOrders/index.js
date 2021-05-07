import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from 'moment';

import { Button, Card, CardBody, Col, Container, Row, Badge, UncontrolledTooltip, Modal, ModalHeader, ModalBody } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder
} from "store/actions"

import EcommerceOrdersModal from "./EcommerceOrdersModal"

const EcommerceOrders = props => {

  const selectRow = {
    mode: 'checkbox'
  };

  const { orders, onGetOrders } = props

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [orderList, setOrderList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1);

  const EcommerceOrderColumns = toggleModal => [

    {
      dataField: "orderId",
      text: "Order ID",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.orderId}
        </Link>
      ),
    },
    {
      dataField: "billingName",
      text: "Billing Name",
      sort: true,
    },
    {
      dataField: "orderdate",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) => (
        handleValidDate(row.orderdate)
      ),
    },
    {
      dataField: "total",
      text: "Total",
      sort: true,
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={"font-size-12 badge-soft-" + row.badgeclass}
          color={row.badgeClass}
          pill
        >
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      dataField: "paymentMethod",
      isDummyField: true,
      text: "Payment Method",
      sort: true,
      formatter: (cellContent, row) => (
        <>
          <i className={
            (row.paymentMethod !== 'COD') ?
              'fab fa-cc-' + toLowerCase1(row.paymentMethod) + " me-1"
              : 'fab fas fa-money-bill-alt me-1'
          } />{" "}
          {row.paymentMethod}
        </>
      ),
    },
    {
      dataField: "view",
      isDummyField: true,
      text: "View Details",
      sort: true,
      formatter: () => (
        <Button
          type="button"
          color="primary"
          className="btn-sm btn-rounded"
          onClick={toggleViewModal}
        >
          View Details
        </Button>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      formatter: (cellContent, order) => (
        <>
          <div className="d-flex gap-3">
            <Link to="#" className="text-success" onClick={() => handleOrderClick(order)}>
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
            </UncontrolledTooltip>
            </Link>
            <Link to="#" className="text-danger" onClick={() => handleDeleteOrder(order)}>
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
            </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ]

  useEffect(() => {
    if (orders && !orders.length) {
      onGetOrders();
    }
  }, [onGetOrders, orders]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])



  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = (str) => {
    return str.toLowerCase();
  }

  const handleOrderClick = arg => {
    const order = arg

    setOrderList({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass
    })

    setIsEdit(true)

    toggle()
  }

  const handleDeleteOrder = (order) => {
    const { onDeleteOrder } = props
    onDeleteOrder(order)
  }

  const handleValidOrderSubmit = (e, values) => {
    const { onAddNewOrder, onUpdateOrder } = props

    if (isEdit) {
      const updateOrder = {
        id: orderList.id,
        orderId: values.orderId,
        billingName: values.billingName,
        orderdate: values.orderdate,
        total: values.total,
        paymentStatus: values.paymentStatus,
        paymentMethod: values.paymentMethod,
        badgeclass: values.badgeclass
      }

      // update order
      onUpdateOrder(updateOrder)

    } else {

      const newOrder = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        orderId: values["orderId"],
        billingName: values["billingName"],
        orderdate: values["orderdate"],
        total: values["total"],
        paymentStatus: values["paymentStatus"],
        paymentMethod: values["paymentMethod"],
        badgeclass: values['badgeclass']
      }
      // save new order
      onAddNewOrder(newOrder)

    }
    toggle()
  }

  const handleOrderClicks = () => {
    setOrderList('')
    setIsEdit(false)
    toggle()
  }

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format('DD MMM Y');
    return date1;
  }

  const defaultSorted = [{
    dataField: 'orderId',
    order: 'desc'
  }];

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <div className="page-content">
        <MetaTags>
          <title>Orders | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={EcommerceOrderColumns(toggle)}
                    data={orders}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders}
                        columns={EcommerceOrderColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar
                                      {...toolkitProps.searchProps}
                                    />
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
                                    onClick={handleOrderClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                      Add New Order
                                    </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />
                                </div>
                                <Modal
                                  isOpen={modal} toggle={toggle}
                                >
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit ? "Edit Order" : "Add Order"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm
                                      onValidSubmit={
                                        handleValidOrderSubmit
                                      }
                                    >
                                      <Row form>
                                        <Col className="col-12">

                                          <div className="mb-3">
                                            <AvField
                                              name="orderId"
                                              label="Order Id"
                                              type="text"
                                              errorMessage="Invalid orderId"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                orderList.orderId || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="billingName"
                                              label="Billing Name"
                                              type="text"
                                              errorMessage="Invalid Billing Name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.billingName || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="orderdate"
                                              label="Date"
                                              type="date"
                                              errorMessage="Invalid Date"
                                              validate={{
                                                required: { value: true },
                                              }}

                                              value={orderList.orderdate || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="total"
                                              label="Total"
                                              type="text"
                                              errorMessage="Invalid Total"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.total
                                                || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentStatus"
                                              label="Payment Status"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Status"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.paymentStatus || ""
                                              }
                                            >
                                              <option>Paid</option>
                                              <option>Chargeback</option>
                                              <option>Refund</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="badgeclass"
                                              label="Badge Class"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Badge Class"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.badgeclass || ""
                                              }
                                            >
                                              <option>success</option>
                                              <option>danger</option>
                                              <option>warning</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentMethod"
                                              label="Payment Method"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Method"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.paymentMethod || ""
                                              }
                                            >
                                              <option>Mastercard</option>
                                              <option>Visa</option>
                                              <option>Paypal</option>
                                              <option>COD</option>
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

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func
}

const mapStateToProps = state => ({
  orders: state.ecommerce.orders,
})

const mapDispatchToProps = dispatch => ({
  onGetOrders: () => dispatch(getOrders()),
  onAddNewOrder: order => dispatch(addNewOrder(order)),
  onUpdateOrder: order => dispatch(updateOrder(order)),
  onDeleteOrder: order => dispatch(deleteOrder(order)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceOrders))