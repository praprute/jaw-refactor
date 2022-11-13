import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import "../../pages/Tables/datatables.scss"

const TableHeaderCoa1 = props => {
  const { dataTable } = props
  return (
    <>
      <MDBDataTable responsive bordered data={dataTable} />
    </>
  )
}

export default TableHeaderCoa1
