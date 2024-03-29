import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import {
  Col,
  Row,
  Button,
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
  deleteOrder,
  queryDetailMulti,
} from "./../../Orders/api"
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
  AddOrderVeit,
} from "store/actions"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
// import ModalDetail from './../Orders/ModalDetail'

const TableCompleteCheck = props => {
  const { token } = isAuthenticated()
  const {
    redirect,
    setOrders,
    onAddOrderVeit,
  } = props
  const [selectRowEx, setSelectRowEx] = useState([])

  let indexCheckBox = []
  let unCheck = []

  const selectRow = {
    mode: "checkbox",
    onSelect: (row, isSelect, rowIndex, e) => {
    
      if (isSelect) {
        indexCheckBox.push(row.id)
      } else {
        unCheck.push(row.id)
      }
     
    },
    onSelectAll: (isSelect, rows, e) => {
      
    },
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
    {
      text: "Timestamp",
      dataField: "timeStamp",
      sort: true,
    },
  ]
  const [dataMerch, setDataMerch] = useState({})
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


  useEffect(async () => {
    try {
      if (props.page == "lab") {
        let data = await getAllOrder(token)

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

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: pd.length, // replace later with size(customers),
    custom: true,
  }

  const addButton = async () => {
    try {
      setSelectRowEx(indexCheckBox)
      const fillterOrders = indexCheckBox.filter(val => !unCheck.includes(val))
      await setOrders(fillterOrders)
      setconfirm_alert(true)
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <React.Fragment>
      {success_dlg ? (
        <SweetAlert
          success
          title={dynamic_title}
          onConfirm={() => {
            setsuccess_dlg(false)
            props.toggle()
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
                  setdynamic_title("success")
                  // setdynamic_description("Your file has been deleted.")
                }
                setsuccess_dlg(true)
                setdynamic_title("success")
                // setdynamic_description("Your file has been deleted.")
              } else {
                setsuccess_error(false)
                setdynamic_title("Deleted ERROR")
                setdynamic_description("Something has ploblem!!!")
              }
            })
          }}
          onCancel={() => setconfirm_alert(false)}
        >
          {/* You won't be able to revert this! */}
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
                        // sort={{ dataField: "timeStamp", order: "asc" }}
                        responsive
                        bordered={false}
                        striped={false}
                        defaultSorted={defaultSorted}
                        selectRow={selectRow}
                        // rowEvents={rowEvents}
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
      <br />
      <Row>
        <Button color="primary" size="lg" onClick={addButton}>
          + Add
        </Button>
      </Row>
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
  onAddOrderVeit: PropTypes.func,
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
  onAddOrderVeit: detailVeit => dispatch(AddOrderVeit(detailVeit)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TableCompleteCheck))
