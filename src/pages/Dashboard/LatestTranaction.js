import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
//api
import { getRealTimeOrder } from "./api"
import { readOrderById, readTestResultlasted } from "./../Orders/api"
import { map } from "lodash"

import { isAuthenticated } from "./../Authentication/api"
//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  AddProductDetail,
  AddSpecificDetail,
  AddTestResultlasted,
  AddSpecificBioDetail,
} from "store/actions"

const LatestTranaction = props => {
  const { user, token } = isAuthenticated()
  const {
    orders,
    spc,
    onAddDetail,
    onAddSpcChem,
    onAddTestResult,
    onAddSpcBio,
  } = props

  const [TRLasted, setTRLasted] = useState({})
  const [detail, setdetail] = useState({})
  const [transactions, settransactions] = useState([
    
  ])
  const fetchDetail = (token, idOrders) => {
    readOrderById(token, idOrders).then(data => {
      if (data) {
        if (data.success == "success") {
          setdetail(data.message[0])
          onAddDetail(data.message[0])
        }
      } else {
        return null
      }
    })
  }
  const fetchTestResultlasted = (token, idOrders) => {
    readTestResultlasted(token, idOrders).then(data => {
      if (data) {
        if (data.success == "success") {
          if (!data.message) {
            setTRLasted({})
            onAddTestResult({})
          } else {
            setTRLasted(data.resulted)
            onAddTestResult(data.resulted)
          }
        } else {
          setTRLasted({})
          onAddTestResult({})
        }
      } else {
        return null
      }
    })
  }
  useEffect(() => {
    getRealTimeOrder(props.token).then(response => {
      if (response) {
        if (response.success == "success") {
          var index = []
          for (let i = 0; i < response.message.length; i++) {
            const rd = {
              BBE: response.message[i].BBE,
              PORD: response.message[i].PORD,
              PO: response.message[i].PO,
              ProductName: response.message[i].ProductName,
              Status: response.message[i].Status,
              Priority: response.message[i].Priority,
              name: response.message[i].name,
              detail: (
                <span
                  style={{ display: "flex" }}
                  onClick={() => {
                    fetchDetail(token, response.message[i].idOrders)
                    fetchTestResultlasted(token, response.message[i].idOrders)
                  }}
                >
                  <i
                    className={"bx bx-file font-size-24"}
                    style={{ cursor: "pointer" }}
                    onClick={props.toggle}
                  ></i>
                </span>
              ),
            }
            index.push(rd)
          }
        
          const setStatus = {
            1: <span className="badge bg-success font-size-10">Completed</span>,
            0: (
              <span className="badge bg-warning font-size-10">
                Waiting to check
              </span>
            ),
            3: (
              <span className="badge bg-warning font-size-10">
                Waiting to Micro
              </span>
            ),
            2: <span className="badge bg-danger font-size-10">Rechecking</span>,
            4: (
              <span className="badge bg-primary font-size-10">
                complete check
              </span>
            ),
          }

          const statePriority = {
            0: <span className="badge bg-success font-size-10">normal</span>,
            1: <span className="badge bg-warning font-size-10">rush</span>,
            2: <span className="badge bg-danger font-size-10">urgent</span>,
          }
          settransactions(
            map(index, order => ({
              ...order,
              Status: setStatus[order.Status],
              Priority: statePriority[order.Priority],
            }))
          )
        } else {
          
        }
      } else {
        return null
      }
    })
  }, [])

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Latest Transaction</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th className="align-middle">Product Name</th>
                  <th className="align-middle">Specific</th>
                  <th className="align-middle">Status</th>
                  <th className="align-middle">Priority</th>
                  <th className="align-middle">Detail</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, key) => (
                  <tr key={"_tr_" + key}>
                    <td>{transaction.ProductName}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.Status}</td>

                    <td>{transaction.Priority}</td>

                    <td>{transaction.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

// export default LatestTranaction
LatestTranaction.propTypes = {
  orders: PropTypes.array,
  spc: PropTypes.array,
  onAddDetail: PropTypes.func,
  onAddSpcChem: PropTypes.func,
  onAddSpcBio: PropTypes.func,
  onAddTestResult: PropTypes.func,
}

const mapStateToProps = state => ({
  orders: state.DetailOrder.Detail,
  spc: state.DetailOrder.SpecificChem,
})

const mapDispatchToProps = dispatch => ({
  onAddDetail: detail => dispatch(AddProductDetail(detail)),
  onAddSpcChem: detailSpcChem => dispatch(AddSpecificDetail(detailSpcChem)),
  onAddTestResult: detailSpcChem =>
    dispatch(AddTestResultlasted(detailSpcChem)),
  onAddSpcBio: detailSpcChem => dispatch(AddSpecificBioDetail(detailSpcChem)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LatestTranaction))
