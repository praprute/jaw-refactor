import { Badge, Button, Input, Label, UncontrolledTooltip } from "reactstrap"
import React from "react"
import { Link } from "react-router-dom"

const OrderColumnsTable = toggleModal => [
  {
    text: "",
    dataField: "id",
    formatter: (cellContent, row) => (
      <div className="form-check font-size-16">
        <Input
          type="checkbox"
          value={row.id}
          className="form-check-input"
          id={row.id}
        />
        <Label className="form-check-label" htmlFor={row.id}>
          &nbsp;
        </Label>
      </div>
    ),
  },
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
    dataField: "Date",
    text: "Date",
    sort: true,
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
        <i className={"fab " + row.methodIcon + " me-1"} />{" "}
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
        onClick={toggleModal}
      >
        View Details
      </Button>
    ),
  },
  {
    dataField: "action",
    isDummyField: true,
    text: "Action",
    formatter: () => (
      <>
        <div className="d-flex gap-3">
        <Link to="#" className="text-success">
          <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
        <Link to="#" className="text-danger">
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

export default OrderColumnsTable
