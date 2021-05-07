import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card
import CardShop from "./CardShop"
import { getShops } from "store/e-commerce/actions"

const EcommerceShops = props => {
  const { shops, onGetShops } = props

  useEffect(() => {
    onGetShops()
  }, [onGetShops])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Shops | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Shops" />
          <Row>
            {map(shops, (shop, key) => (
              <CardShop shop={shop} key={"_shop_" + key} />
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

EcommerceShops.propTypes = {
  shops: PropTypes.array,
  onGetShops: PropTypes.func,
}

const mapStateToProps = ({ ecommerce }) => ({
  shops: ecommerce.shops,
})

const mapDispatchToProps = dispatch => ({
  onGetShops: () => dispatch(getShops()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EcommerceShops)
