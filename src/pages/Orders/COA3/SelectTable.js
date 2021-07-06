import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import MetaTags from "react-meta-tags"
import {
  Col,
  Row,
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"

//Import Breadcrumb
import "../../Tables/datatables.scss"
import ModalDetail from "./../../Orders/ModalDetail"
// import ModalAddOrder from './ModalAddOrder'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
//get api
import {
  getAllOrder,
  readOrderById,
  readTestResultlasted,
  deleteOrder,
} from "./../../Orders/api"
import { map } from "lodash"
import { orders } from "common/data"
import { isAuthenticated } from "./../../Authentication/api"

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
// import ModalDetail from './../Orders/ModalDetail'

const TableCompleteCheck = props => {
  const { user, token } = isAuthenticated()
  const {
    redirect,
    orders,
    spc,
    onAddDetail,
    onAddSpcChem,
    onAddTestResult,
    onAddSpcBio,
  } = props
  // const [redirect, setRedirect] = useState(false)
  const selectRow = {
    mode: "checkbox",
  }
  const { SearchBar } = Search

  const columns = [
    { text: "Select", dataField: "id", sort: true },
    {
      text: "Product Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Specific",
      dataField: "Specific",
      sort: true,
    },
    // {
    //   label: "Status",
    //   field: "status",
    //   sort: "asc",
    // },
    // {
    //   label: "Priority",
    //   field: "priority",
    //   sort: "asc",
    // },
    // {
    //   label: "Recheck",
    //   field: "Recheck",
    //   sort: "asc",
    // },
    {
      text: "Timestamp",
      dataField: "timeStamp",
      sort: true,
    },
    // {
    //   text: "Detail",
    //   dataField: "detail",
    //   sort: true,
    // },
  ]
  //   const [columns, setColumnTable] = useState([
  //     { text: "Select", dataField: "Select", sort: true },
  //     {
  //       text: "Product Name",
  //       dataField: "name",
  //       sort: true,
  //     },
  //     {
  //       text: "Specific",
  //       dataField: "Specific",
  //       sort: true,
  //     },
  //     // {
  //     //   label: "Status",
  //     //   field: "status",
  //     //   sort: "asc",
  //     // },
  //     // {
  //     //   label: "Priority",
  //     //   field: "priority",
  //     //   sort: "asc",
  //     // },
  //     // {
  //     //   label: "Recheck",
  //     //   field: "Recheck",
  //     //   sort: "asc",
  //     // },
  //     {
  //       text: "Timestamp",
  //       dataField: "timeStamp",
  //       sort: true,
  //     },
  //     {
  //       text: "Detail",
  //       dataField: "detail",
  //       sort: true,
  //     },
  //   ])
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

  const [pd, setPd] = useState([
    {
      id: 1,
      name: "Airi Satou",
      Specific: "Accountant",
      timeStamp: "Tokyo",
      detail: "33",
    },
  ])

  const fetchDetail = (token, idOrders) => {
    readOrderById(token, idOrders).then(data => {
      if (data) {
        if (data.success == "success") {
          // console.log('onAddDetail : ',data.message[0])
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
      // console.log(' readTestResultlasted :',data.resulted)
      // let resulted = []
      // data.resulted.forEach(data => {
      //   data.forEach(children => {

      //   })
      // })
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

  useEffect(async () => {
    try {
      if (props.page == "lab") {
        let data = await getAllOrder(token)
        console.log(data)
        let index = []
        if (data) {
          data.message.forEach(data => {
            let js = {}
            if (data.Status == 4) {
                index.push({
                  id: data.idOrders,
                  name: data.ProductName,
                  Specific: data.name,
                  timeStamp: data.timestamp,
                //   detail: "11",
                })
            }
          })
          setPd(index)
        } else {
          setPd([
            {
              id: 1,
              name: "11 Satou",
              Specific: "1",
              timeStamp: "1",
              detail: "11",
            },
          ])
        }
      }
    } catch (err) {
      console.error
    }
    setDataMerch([
      {
        id: 1,
        name: "Airi Satou",
        Specific: "Accountant",
        timeStamp: "Tokyo",
        detail: "33",
      },
    ])
  }, [redirect, props.tt])
  //   useEffect(() => {
  //     if (props.page == "lab") {
  //       getAllOrder(token).then(data => {
  //         if (data == undefined) {
  //           setDataMerch([])
  //         } else {
  //           if (data.success == "success") {
  //             var index = []
  //             for (let i = 0; i < data.message.length; i++) {
  //               // if(data.message[i].Status != 1){
  //               const rd = {
  //                 "id": data.message[i].idOrders,
  //                 // "ponumber": data.message[i].PO,
  //                 "name": data.message[i].ProductName,
  //                 "Specific": data.message[i].name,
  //                 // "priority": data.message[i].Priority,
  //                 // status: data.message[i].Status,
  //                 // Recheck: data.message[i].Recheck,
  //                 "timeStamp": data.message[i].timestamp,
  //                 "detail": (
  //                   <span
  //                     style={{ display: "flex", justifyContent: "center" }}
  //                     onClick={() => {
  //                       fetchDetail(token, data.message[i].idOrders)
  //                       fetchTestResultlasted(token, data.message[i].idOrders)
  //                     }}
  //                   >
  //                     <i
  //                       className={"bx bx-file font-size-24"}
  //                       style={{ cursor: "pointer" }}
  //                       onClick={props.toggle}
  //                     ></i>
  //                   </span>
  //                 ),
  //                 // TestResult: (
  //                 //   <div style={{ display: "flex", justifyContent: "center" }}>
  //                 //     <span
  //                 //       onClick={() => {
  //                 //         fetchDetail(token, data.message[i].idOrders)
  //                 //         fetchTestResultlasted(token, data.message[i].idOrders)
  //                 //       }}
  //                 //     >
  //                 //       <button
  //                 //         type="button"
  //                 //         color="primary"
  //                 //         className="btn btn-primary waves-effect waves-light .w-xs"
  //                 //         onClick={props.toggleTR}
  //                 //       >
  //                 //         <i className="bx bx-pencil font-size-16 align-middle me-2"></i>{" "}
  //                 //         TEST
  //                 //       </button>
  //                 //     </span>
  //                 //   </div>
  //                 // ),
  //               }
  //               if (props.tricker == "CompleteCheck") {
  //                 if (data.message[i].Status == 4) {
  //                   index.push(rd)
  //                 }
  //               }
  //               // TablePassCheckAndPass
  //             }
  //             console.log(index)
  //             const status = {
  //               1: (
  //                 <span className="badge bg-success font-size-10">Completed</span>
  //               ),
  //               0: (
  //                 <span className="badge bg-warning font-size-10">
  //                   Waiting to check
  //                 </span>
  //               ),
  //               3: (
  //                 <span className="badge bg-warning font-size-10">
  //                   Waiting to Micro
  //                 </span>
  //               ),
  //               2: (
  //                 <span className="badge bg-danger font-size-10">Rechecking</span>
  //               ),
  //               4: (
  //                 <span className="badge bg-primary font-size-10">
  //                   complete check
  //                 </span>
  //               ),
  //             }

  //             const statePriority = {
  //               0: <span className="badge bg-success font-size-10">normal</span>,
  //               1: <span className="badge bg-warning font-size-10">rush</span>,
  //               2: <span className="badge bg-danger font-size-10">urgent</span>,
  //             }
  //             // setDataMerch({
  //             //   columns: columnTable,
  //             //   rows: map(index, order => ({
  //             //     ...order,
  //             //     priority: statePriority[order.priority],
  //             //     status: status[order.status],
  //             //   })),
  //             // })
  //             setDataMerch(index)
  //           } else {
  //             setDataMerch(index)
  //             // setDataMerch({
  //             //   columns: columnTable,
  //             //   rows: [
  //             //     {
  //             //       lot: "NULL",
  //             //     },
  //             //   ],
  //             // })
  //           }
  //         }
  //       })
  //     }
  //   }, [redirect, props.tt])
  //
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: pd.length, // replace later with size(customers),
    custom: true,
  }
  const productData = [
    {
      id: 1,
      name: "Airi Satou",
      Specific: "Accountant",
      timeStamp: "Tokyo",
      detail: "33",
    },
  ]
  return (
    <React.Fragment>
      {success_dlg ? (
        <SweetAlert
          success
          title={dynamic_title}
          onConfirm={() => {
            setsuccess_dlg(false)
            // const refreshPage = ()=>{
            //     window.location.reload();
            //  }
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

      {/* <MDBDataTable responsive bordered data={dataMerch} /> */}

      <PaginationProvider
        pagination={paginationFactory(pageOptions)}
        keyField="id"
        columns={columns}
        data={pd}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider keyField="id" columns={columns} data={pd} search>
            {toolkitProps => (
              <React.Fragment>
                <Row className="mb-2">
                  <Col md="4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <SearchBar {...toolkitProps.searchProps} />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    <div className="table-responsive">
                      <BootstrapTable
                        keyField={"id"}
                        responsive
                        bordered={false}
                        striped={false}
                        defaultSorted={defaultSorted}
                        selectRow={selectRow}
                        classes={"table align-middle table-nowrap"}
                        headerWrapperClasses={"thead-light"}
                        {...toolkitProps.baseProps}
                        {...paginationTableProps}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-md-center mt-30">
                  <Col className="inner-custom-pagination d-flex">
                    <div className="d-inline">
                      <SizePerPageDropdownStandalone {...paginationProps} />
                    </div>
                    <div className="text-md-right ms-auto">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </React.Fragment>
  )
}

TableCompleteCheck.propTypes = {
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
)(withRouter(TableCompleteCheck))
