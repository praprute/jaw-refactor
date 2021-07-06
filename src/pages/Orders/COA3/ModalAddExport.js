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
    handleRedirect,
  } = props
  return (
    <Modal isOpen={isOpenRro} toggle={toggleRepro} centered={true} size="xl">
      <div style={{ padding: "15px" }}>
        <TableCompleteCheck
          page={"lab"}
          tricker={"CompleteCheck"}
          tt={isOpenRro}
        />
      </div>
    </Modal>
  )
}

export default ModalAddExport
