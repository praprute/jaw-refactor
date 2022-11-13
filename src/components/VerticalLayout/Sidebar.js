import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.svg"
import logoLightPng from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-sm-light.svg"
import logoDark from "../../assets/images/logo-dark.png"
import LogoRFSedit from "../../assets/images/Logo-RFS-edit.png"
import LogoRFSedit2 from "../../assets/images/veitHonglogo.jpg"
import logoLightSvg2 from "../../assets/images/veitHonglogo.jpg"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              {process.env.REACT_APP_PROJECT_NAME === "JAW" && (
                <img src={logo} alt="" height="22" />
              )}
              {/* */}
              {process.env.REACT_APP_PROJECT_NAME === "VEIT" && (
                <img
                  src={logoLightSvg2}
                  alt=""
                  height="30"
                  style={{ marginLeft: "-5px" }}
                />
              )}
            </span>
            <span className="logo-lg">
              {process.env.REACT_APP_PROJECT_NAME === "VEIT" && (
                <img src={LogoRFSedit2} alt="" height="50" />
              )}
              {process.env.REACT_APP_PROJECT_NAME === "JAW" && (
                <img src={logoDark} alt="" height="17" />
              )}
              {/*  */}
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              {process.env.REACT_APP_PROJECT_NAME === "JAW" && (
                <img
                  src={logoLightSvg}
                  alt=""
                  height="20"
                  style={{ marginLeft: "-10px" }}
                />
              )}

              {process.env.REACT_APP_PROJECT_NAME === "VEIT" && (
                <img
                  src={logoLightSvg2}
                  alt=""
                  height="30"
                  style={{ marginLeft: "-5px" }}
                />
              )}
            </span>
            <span className="logo-lg">
              {process.env.REACT_APP_PROJECT_NAME === "JAW" && (
                <img src={LogoRFSedit} alt="" height="30" />
              )}

              {process.env.REACT_APP_PROJECT_NAME === "VEIT" && (
                <img src={LogoRFSedit2} alt="" height="50" />
              )}
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
