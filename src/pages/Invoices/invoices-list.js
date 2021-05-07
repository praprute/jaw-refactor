import React, { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card invoice
import CardInvoice from "./card-invoice"
import { getInvoices } from "store/actions"

const InvoicesList = props => {
  const { invoices, onGetInvoices } = props

  useEffect(() => {
    onGetInvoices()
  }, [onGetInvoices])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Invoice List | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

          <Row>
            {map(invoices, (invoice, key) => (
              <CardInvoice data={invoice} key={"_invoice_" + key} />
            ))}
          </Row>
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoicesList.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

const mapStateToProps = ({ invoices }) => ({
  invoices: invoices.invoices,
})

const mapDispatchToProps = dispatch => ({
  onGetInvoices: () => dispatch(getInvoices()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InvoicesList))
