import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"

//Import Breadcrumb
import "../Tables/datatables.scss"

//get api
import {
  getAllOrder,
  readOrderById,
  readTestResultlasted,
  deleteOrder,
} from "./../Orders/api"
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

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
//useHistury
import { useHistory } from "react-router-dom"

const OrderTable = props => {
  const history = useHistory()
  const { user, token } = isAuthenticated()
  const {
    orders,
    spc,
    onAddDetail,
    onAddSpcChem,
    onAddTestResult,
    onAddSpcBio,
    redirect,
    handleRedirect,
  } = props

  const [columnTable, setColumnTable] = useState([
    {
      label: "Product Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Specific",
      field: "Specific",
      sort: "asc",
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
    },
    {
      label: "Priority",
      field: "priority",
      sort: "asc",
    },
    {
      label: "Recheck",
      field: "Recheck",
      sort: "asc",
    },
    {
      label: "Timestamp",
      field: "timeStamp",
      sort: "asc",
    },
    {
      label: "Detail",
      field: "detail",
      sort: "asc",
    },
    {
      label: "Test Result",
      field: "TestResult",
    },
  ])
  const [dataMerch, setDataMerch] = useState({})
  const [detail, setdetail] = useState({})
  const [TRLasted, setTRLasted] = useState({})
  const [info_dropup111, setInfo_dropup111] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [idDelete, setidDelete] = useState("")
  const [success_error, setsuccess_error] = useState(false)

  const fetchDetail = (token, idOrders) => {
    readOrderById(token, idOrders).then(data => {
      if (data) {
        if (data.success == "success") {
          console.log(data)
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
    if (props.page == "lab") {
      getAllOrder(token).then(data => {
        if (data == undefined) {
          setDataMerch({
            columns: columnTable,
            rows: [
              {
                lot: "SERVER HAVE !PROBLEM.",
              },
            ],
          })
        } else {
          if (data.success == "success") {
            var index = []
            for (let i = 0; i < data.message.length; i++) {
              const rd = {
                lot: (
                  <span>
                    PORD: {data.message[i].BBE}
                    <br />
                    BBE: {data.message[i].PORD}
                  </span>
                ),
                ponumber: data.message[i].PO,
                name: data.message[i].ProductName,
                Specific: data.message[i].name,
                priority: data.message[i].Priority,
                status: data.message[i].Status,
                Recheck: data.message[i].Recheck,
                timeStamp: data.message[i].timestamp,
                detail: (
                  <span
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={() => {
                      fetchDetail(token, data.message[i].idOrders)
                      fetchTestResultlasted(token, data.message[i].idOrders)
                    }}
                  >
                    <i
                      className={"bx bx-file font-size-24"}
                      style={{ cursor: "pointer" }}
                      onClick={props.toggle}
                    ></i>
                  </span>
                ),
                TestResult: (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span
                      onClick={() => {
                        window.open(
                          `/TestSample?idOrders=${data.message[i].idOrders}`,
                          "_blank"
                        )
                      }}
                    >
                      <button
                        type="button"
                        color="primary"
                        className="btn btn-primary waves-effect waves-light .w-xs"
                      >
                        <i className="bx bx-pencil font-size-16 align-middle me-2"></i>{" "}
                        TEST
                      </button>
                    </span>
                  </div>
                ),
              }

              if (props.tricker == "allOrder") {
                if (
                  data.message[i].Status == 0 ||
                  data.message[i].Status == 3 ||
                  data.message[i].Status == 5
                ) {
                  index.push(rd)
                }
              }

              if (props.tricker == "Reprocess") {
                if (data.message[i].Status == 5) {
                  index.push(rd)
                }
              }

              if (props.tricker == "urgent") {
                if (
                  data.message[i].Priority == 2 &&
                  data.message[i].Status != 1 &&
                  data.message[i].Status != 2 &&
                  data.message[i].Status != 4
                ) {
                  index.push(rd)
                }
              }
              if (props.tricker == "micro") {
                if (data.message[i].Status == 3) {
                  index.push(rd)
                }
              }
              if (props.tricker == "recheck") {
                if (data.message[i].Status == 2) {
                  index.push(rd)
                }
              }
              if (props.tricker == "pass") {
                if (data.message[i].Status == 1) {
                  index.push(rd)
                }
              }
              if (props.tricker == "CompleteCheck") {
                if (data.message[i].Status == 4) {
                  index.push(rd)
                }
              }
            }
            const status = {
              1: (
                <span className="badge bg-success font-size-10">Completed</span>
              ),
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
              2: (
                <span className="badge bg-danger font-size-10">Rechecking</span>
              ),
              4: (
                <span className="badge bg-primary font-size-10">
                  complete check
                </span>
              ),
              5: <span className="badge bg-info font-size-10">Reprocess</span>,
            }

            const statePriority = {
              0: <span className="badge bg-success font-size-10">normal</span>,
              1: <span className="badge bg-warning font-size-10">rush</span>,
              2: <span className="badge bg-danger font-size-10">urgent</span>,
            }

            setDataMerch({
              columns: columnTable,
              rows: map(index, order => ({
                ...order,
                priority: statePriority[order.priority],
                status: status[order.status],
              })),
            })
          } else {
            setDataMerch({
              columns: columnTable,
              rows: [
                {
                  lot: "NULL",
                },
              ],
            })
          }
        }
      })
    }
  }, [redirect])
  //

  return (
    <React.Fragment>
      {success_dlg ? (
        <SweetAlert
          success
          title={dynamic_title}
          onConfirm={() => {
            setsuccess_dlg(false)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      ) : null}

      {confirm_alert ? (
        <SweetAlert
          title="Are you sure?"
          warning
          showCancel
          confirmButtonText="Yes, delete it!"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setconfirm_alert(false)
            var id = {
              idOrders: idDelete,
            }
            deleteOrder(token, id).then(data => {
              if (data) {
                if (data.sucess == "success") {
                  setsuccess_dlg(true)
                  setdynamic_title("Deleted")
                  setdynamic_description("Your file has been deleted.")
                }
                setsuccess_dlg(true)
                setdynamic_title("Deleted")
                setdynamic_description("Your file has been deleted.")
              } else {
                setsuccess_error(false)
                setdynamic_title("Deleted ERROR")
                setdynamic_description("Something has ploblem!!!")
              }
            })
          }}
          onCancel={() => setconfirm_alert(false)}
        >
          You won't be able to revert this!
        </SweetAlert>
      ) : null}

      <MDBDataTable responsive bordered data={dataMerch} />
    </React.Fragment>
  )
}

OrderTable.propTypes = {
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
)(withRouter(OrderTable))
