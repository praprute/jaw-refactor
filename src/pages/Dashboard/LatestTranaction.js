import React, {useState, useEffect} from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
//api
import {getRealTimeOrder} from './api'
import {readOrderById,
  readTestResultlasted,} from './../Orders/api'
import { map } from "lodash";

import { isAuthenticated } from './../Authentication/api'
//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { AddProductDetail, AddSpecificDetail, AddTestResultlasted, AddSpecificBioDetail} from 'store/actions'

const LatestTranaction = props => {

  const {user, token} = isAuthenticated()
  const { orders , spc, onAddDetail, onAddSpcChem ,onAddTestResult,onAddSpcBio} = props

  const [TRLasted ,setTRLasted] = useState({})
  const [detail, setdetail] = useState({})
  const [transactions,  settransactions ] = useState([
    // {
    //   id: "customCheck2",
    //   orderId: "#SK2540",
    //   billingName: "Neal Matthews",
    //   Date: "07 Oct, 2019",
    //   total: "$400",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-mastercard",
    //   paymentMethod: "Mastercard",
    //   link: "#",
    // },
    // {
    //   id: "customCheck3",
    //   orderId: "#SK2541",
    //   billingName: "Jamal Burnett",
    //   Date: "07 Oct, 2019",
    //   total: "$380",
    //   badgeClass: "danger",
    //   paymentStatus: "Chargeback",
    //   methodIcon: "fa-cc-visa",
    //   paymentMethod: "Visa",
    //   link: "#",
    // },
    // {
    //   id: "customCheck4",
    //   orderId: "#SK2542",
    //   billingName: "Juan Mitchell",
    //   Date: "06 Oct, 2019",
    //   total: "$384",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-paypal",
    //   paymentMethod: "Paypal",
    //   link: "#",
    // },
    // {
    //   id: "customCheck5",
    //   orderId: "#SK2543",
    //   billingName: "Barry Dick",
    //   Date: "05 Oct, 2019",
    //   total: "$412",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-mastercard",
    //   paymentMethod: "Mastercard",
    //   link: "#",
    // },
    // {
    //   id: "customCheck6",
    //   orderId: "#SK2544",
    //   billingName: "Ronald Taylor",
    //   Date: "04 Oct, 2019",
    //   total: "$404",
    //   badgeClass: "warning",
    //   paymentStatus: "Refund",
    //   methodIcon: "fa-cc-visa",
    //   paymentMethod: "Visa",
    //   link: "#",
    // },
    // {
    //   id: "customCheck7",
    //   orderId: "#SK2545",
    //   billingName: "Jacob Hunter",
    //   Date: "04 Oct, 2019",
    //   total: "$392",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-paypal",
    //   paymentMethod: "Paypal",
    //   link: "#",
    // },
  ])
  const fetchDetail = (token, idOrders) => {
    readOrderById(token, idOrders).then(data => {
    if(data){
      if(data.success == 'success'){
        // console.log('onAddDetail : ',data.message[0])
        setdetail(data.message[0])
        onAddDetail(data.message[0])
      }
    }else{
      return null
    }
  })
}
const fetchTestResultlasted = (token, idOrders) => {
  readTestResultlasted(token, idOrders).then(data => {
    // console.log(' readTestResultlasted :',data)
    if(data){
      if(data.success == 'success'){
        if(!data.message){
          setTRLasted({})
          onAddTestResult({})
        }else{
          setTRLasted(data.resulted)
          onAddTestResult(data.resulted)
        }
      }else{
        setTRLasted({})
        onAddTestResult({})
      }
    }else{
      return null
    }
  })
}
  useEffect(() => {
    getRealTimeOrder(props.token).then(response => {
      // console.log('real time order : ', response)
      if(response){
        if(response.success == 'success'){
                var index = []
                for(let i = 0 ; i < response.message.length ; i++){
                  const rd = {
                    BBE:          response.message[i].BBE,
                    PORD:         response.message[i].PORD,
                    PO:           response.message[i].PO,
                    ProductName:  response.message[i].ProductName,
                    Status:       response.message[i].Status,
                    Priority:     response.message[i].Priority,
                    name:         response.message[i].name,
                    detail: <span style={{display:'flex', }} onClick={()=>{
                      fetchDetail(token ,response.message[i].idOrders)
                      fetchTestResultlasted(token ,response.message[i].idOrders)
                    }
                    }>
                         <i
                         className={
                          "bx bx-file font-size-24"
                         }
                         style={{cursor:'pointer'}}
                         onClick={
                           props.toggle
                      }
                        ></i>
                    </span> 
                  }
                  index.push(rd)
                }
              //   const setStatus = {
              //     completed: (
              //       <span className="badge bg-success font-size-10">Completed</span>
              //     ),
              //     Waitingtocheck: <span className="badge bg-warning font-size-10">Waiting to check</span>,
              //     Rechecking: <span className="badge bg-danger font-size-10">Rechecking</span>,
              //   }
              
              // const statePriority = {
              //     normal: <span className="badge bg-success font-size-10">normal</span>,
              //     fast: <span className="badge bg-warning font-size-10">fast</span>,
              //     very: <span className="badge bg-danger font-size-10">very</span>,
              //     }
                  const setStatus = {
                    1: (
                      <span className="badge bg-success font-size-10">Completed</span>
                    ),
                    0: <span className="badge bg-warning font-size-10">Waiting to check</span>,
                    3: <span className="badge bg-warning font-size-10">Waiting to Micro</span>,
                    2: <span className="badge bg-danger font-size-10">Rechecking</span>,
                    4: <span className="badge bg-primary font-size-10">complete check</span>,
                  }
                
                const statePriority = {
                    0: <span className="badge bg-success font-size-10">normal</span>,
                    1: <span className="badge bg-warning font-size-10">rush</span>,
                    2: <span className="badge bg-danger font-size-10">urgent</span>,
                    }
                settransactions(map(index, order=>({...order, Status:setStatus[order.Status], Priority:statePriority[order.Priority]})))
              
              }else{
                // AWMax: 0.85
                // AWMin: 0
                // BBE: "22/02/2020"
                // HistamineMax: 500
                // HistamineMin: 0
                // PHCOAMax: 6
                // PHCOAMin: 5
                // PHControlMax: 6
                // PHControlMin: 5
                // PO: "PO123456"
                // PORD: "22/02/2020"
                // Priority: "normal"
                // ProductName: "ลูกยอด"
                // Quantity: "2088"
                // Recheck: 0
                // SPG: 100
                // SaltCOAMax: 29
                // SaltCOAMin: 23
                // SaltControlMax: 29
                // SaltControlMin: 23
                // Size: "12*199ml"
                // Status: "Waitingtocheck "
                // TSSMax: 100
                // TSSMin: 0
                // TnMain: 20.8
                // TnMax: 100
                // idOrder: 10
                // idOrders: 10
                // idPdSpecificChem: 1
                // idRealTimeOrder: 1
                // idScfChem: 1
                // idScfMicro: 1
                // name: "CN"
                // timestamp:
              }
      }else{
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
                  {/* <th style={{ width: "20px" }}>
                    <div className="form-check font-size-16 align-middle">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customCheck1"
                      >
                        &nbsp;
                      </label>
                    </div>
                  </th> */}
                  {/* <th className="align-middle">LOT</th>
                  <th className="align-middle">PO Number</th> */}
                  <th className="align-middle">Product Name</th>
                  <th className="align-middle">Specific</th>
                  <th className="align-middle">Status</th>
                  <th className="align-middle">Priority</th>
                  {/* <th className="align-middle">Recheck</th> */}
                  
                  <th className="align-middle">Detail</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, key) => (
                  <tr key={"_tr_" + key}>
                    {/* <td>
                      <div className="form-check font-size-16">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={transaction.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={transaction.id}
                        >
                          &nbsp;
                        </label>
                      </div>
                    </td> */}


                    {/* <td>
                      <Link to="#" className="text-body fw-bold">
                        {" "}
                        BBE: {transaction.BBE},<br/>
                        PORD: {transaction.PORD}
                      </Link>{" "}
                    </td>
                    <td>{transaction.PO}</td> */}

                    <td>{transaction.ProductName}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.Status}</td>

                    {/* <td>{() => {
                      if(transaction.Status == 'Waitingtocheck'){
                        return(<span className="badge bg-warning font-size-10">Waiting to check</span>)
                      }
                    }}</td> */}

                    <td>{transaction.Priority}</td>
                    
                    <td>{transaction.detail}</td>

                    {/* <td>
                      <Badge
                        className={
                          "font-size-11 badge-soft-" + transaction.badgeClass
                        }
                        color={transaction.badgeClass}
                        pill
                      >
                        {transaction.Priority}
                      </Badge>
                    </td> */}

                    {/* <td>
                      <i
                        className={"fab " + transaction.methodIcon + " me-1"}
                      ></i>{" "}
                      {transaction.name}
                    </td> */}
                    
                    {/* <td>
                      <Button
                        type="button"
                        color="primary"
                        size="sm"
                        className="btn-rounded waves-effect waves-light"
                      >
                        View Details
                      </Button>
                    </td> */}
                    
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
  onAddDetail: (detail) => dispatch(AddProductDetail(detail)),
  onAddSpcChem: (detailSpcChem) => dispatch(AddSpecificDetail(detailSpcChem)),
  onAddTestResult: (detailSpcChem) => dispatch(AddTestResultlasted(detailSpcChem)),
  onAddSpcBio: (detailSpcChem) => dispatch(AddSpecificBioDetail(detailSpcChem)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LatestTranaction))