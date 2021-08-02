import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { Link } from "react-router-dom"
import { map, result } from "lodash"
import { isAuthenticated } from "./../../Authentication/api"
//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
import TableCompleteCheck from "./SelectTable"
const ModalAddExport = props => {
  const { user, token } = isAuthenticated()
  const {
    isOpenRro,
    orders,
    spc,
    toggleRepro,
    tr,
    redirect,
    offModal,
    handleRedirect,
    setOrders,
  } = props
  return (
    <Modal isOpen={isOpenRro} toggle={toggleRepro} centered={true} size="xl">
      <ModalHeader toggle={toggleRepro}>Modal title</ModalHeader>
      <div style={{ padding: "15px" }}>
        <TableCompleteCheck
          setOrders={setOrders}
          page={"lab"}
          tricker={"CompleteCheck"}
          toggle={toggleRepro}
          onClose={offModal}
        />
      </div>
    </Modal>
  )
}

export default ModalAddExport
