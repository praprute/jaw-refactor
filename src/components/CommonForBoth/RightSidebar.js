import React from "react"
import PropTypes from 'prop-types'
import { FormGroup } from "reactstrap"

import { connect } from "react-redux"
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changePreloader,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/actions"

//SimpleBar
import SimpleBar from "simplebar-react"

import { Link } from "react-router-dom"

import "../../components/CommonForBoth/rightbar.scss"
//Import images

//Import images
import bgimg1 from "../../assets/images/sidebar/img1.jpg";
import bgimg2 from "../../assets/images/sidebar/img2.jpg";
import bgimg3 from "../../assets/images/sidebar/img3.jpg";
import bgimg4 from "../../assets/images/sidebar/img4.jpg";
import layout1 from "../../assets/images/layouts/layout-1.jpg"
import layout2 from "../../assets/images/layouts/layout-2.jpg"
import layout3 from "../../assets/images/layouts/layout-3.jpg"

const RightSidebar = props => {
  const onCloseRightBar = () => {
    const { onClose } = props;
    if (onClose) {
      onClose();
    }
  }
  return (
    <React.Fragment>
      <SimpleBar style={{ height: "900px" }}>
        <div data-simplebar className="h-100">
          <div className="rightbar-title px-3 py-4">
            <Link
              to="#"
              onClick={e => {
                onCloseRightBar();
              }}
              className="right-bar-toggle float-end"
            >
              <i className="mdi mdi-close noti-icon" />
            </Link>
            <h5 className="m-0">Settings</h5>
          </div>

          <hr className="my-0" />

          <div className="p-4">
            <div className="radio-toolbar">
              <span className="mb-2 d-block">Layouts</span>
              <input
                type="radio"
                id="radioVertical"
                name="radioFruit"
                value="vertical"
                checked={props.layoutType === "vertical"}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayout(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioVertical">Vertical</label>
              {"   "}
              <input
                type="radio"
                id="radioHorizontal"
                name="radioFruit"
                value="horizontal"
                checked={props.layoutType === "horizontal"}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayout(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioHorizontal">Horizontal</label>
            </div>

            <hr className="mt-1" />

            <div className="radio-toolbar">
              <span className="mb-2 d-block" id="radio-title">
                Layout Width
                </span>
              <input
                type="radio"
                id="radioFluid"
                name="radioWidth"
                value="fluid"
                checked={props.layoutWidth === "fluid"}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayoutWidth(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioFluid">Fluid</label>
              {"   "}
              <input
                type="radio"
                id="radioBoxed"
                name="radioWidth"
                value="boxed"
                checked={props.layoutWidth === "boxed"}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayoutWidth(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioBoxed" className="me-2">Boxed</label>
              <input
                type="radio"
                id="radioscrollable"
                name="radioscrollable"
                value="scrollable"
                checked={props.layoutWidth === "scrollable"}
                // onChange={props.changeLayoutWidth}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayoutWidth(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioscrollable">Scrollable</label>
            </div>
            <hr className="mt-1" />

            <div className="radio-toolbar">
              <span className="mb-2 d-block" id="radio-title">
                Topbar Theme
                </span>
              <input
                type="radio"
                id="radioThemeLight"
                name="radioTheme"
                value="light"
                checked={props.topbarTheme === "light"}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeTopbarTheme(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioThemeLight">Light</label>
              {"   "}
              <input
                type="radio"
                id="radioThemeDark"
                name="radioTheme"
                value="dark"
                checked={props.topbarTheme === "dark"}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeTopbarTheme(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioThemeDark">Dark</label>
              {"   "}
              {props.layoutType === "vertical" ? null : (
                <>
                  {" "}
                  <input
                    type="radio"
                    id="radioThemeColored"
                    name="radioTheme"
                    value="colored"
                    checked={props.topbarTheme === "colored"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeTopbarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="radioThemeColored">Colored</label>{" "}
                </>
              )}
            </div>

            {props.layoutType === "vertical" ? (
              <React.Fragment>
                <hr className="mt-1" />
                <div className="radio-toolbar">
                  <span className="mb-2 d-block" id="radio-title">
                    Left Sidebar Type{" "}
                  </span>
                  <input
                    type="radio"
                    id="sidebarDefault"
                    name="sidebarType"
                    value="default"
                    checked={props.leftSideBarType === "default"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarType(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="sidebarDefault">Default</label>
                  {"   "}
                  <input
                    type="radio"
                    id="sidebarCompact"
                    name="sidebarType"
                    value="compact"
                    checked={props.leftSideBarType === "compact"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarType(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="sidebarCompact">Compact</label>
                  {"   "}
                  <input
                    type="radio"
                    id="sidebarIcon"
                    name="sidebarType"
                    value="icon"
                    checked={props.leftSideBarType === "icon"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarType(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="sidebarIcon">Icon</label>
                </div>

                <hr className="mt-1" />

                <div className="radio-toolbar coloropt-radio">
                  <span className="mb-2 d-block" id="radio-title">
                    Left Sidebar Color Options
                    </span>
                  <input
                    type="radio"
                    id="leftsidebarThemelight"
                    name="leftsidebarTheme"
                    value="light"
                    checked={props.leftSideBarTheme === "light"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />

                  <label htmlFor="leftsidebarThemelight" className="bg-light rounded-circle wh-30"></label>
                  {"   "}
                  <input
                    type="radio"
                    id="leftsidebarThemedark"
                    name="leftsidebarTheme"
                    value="dark"
                    checked={props.leftSideBarTheme === "dark"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="leftsidebarThemedark" className="bg-dark rounded-circle wh-30"></label>
                  {"   "}
                  <input
                    type="radio"
                    id="leftsidebarThemewinter"
                    name="leftsidebarTheme"
                    value="winter"
                    checked={props.leftSideBarTheme === "winter"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="leftsidebarThemewinter" className="gradient-winter rounded-circle wh-30"></label>
                  {"   "}
                  <input
                    type="radio"
                    id="leftsidebarThemeladylip"
                    name="leftsidebarTheme"
                    value="ladylip"
                    checked={props.leftSideBarTheme === "ladylip"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="leftsidebarThemeladylip" className="gradient-lady-lip rounded-circle wh-30"></label>
                  {"   "}
                  <input
                    type="radio"
                    id="leftsidebarThemeplumplate"
                    name="leftsidebarTheme"
                    value="plumplate"
                    checked={props.leftSideBarTheme === "plumplate"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="leftsidebarThemeplumplate" className="gradient-plum-plate rounded-circle wh-30"></label>
                  {"   "}
                  <input
                    type="radio"
                    id="leftsidebarThemestrongbliss"
                    name="leftsidebarTheme"
                    value="strongbliss"
                    checked={props.leftSideBarTheme === "strongbliss"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="leftsidebarThemestrongbliss" className="gradient-strong-bliss rounded-circle wh-30"></label>
                  <input
                    type="radio"
                    id="leftsidebarThemesgreatwhale"
                    name="leftsidebarTheme"
                    value="greatwhale"
                    checked={props.leftSideBarTheme === "greatwhale"}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeSidebarTheme(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor="leftsidebarThemesgreatwhale" className="gradient-strong-great-whale rounded-circle wh-30"></label>
                </div>
                <div className="radio-toolbar imgopt-radio">
                  <span className="mb-2 d-block" id="radio-bgimg">
                    Left Sidebar Bg Image
                      </span>
                  <div className="d-flex gap-2 flex-wrap">
                    <input
                      type="radio"
                      id="leftsidebarThemebgimg1"
                      name="leftsidebarThemeImage"
                      value="img1"
                      checked={props.leftSideBarThemeImage === "img1"}
                      onChange={e => {
                        if (e.target.checked) {
                          props.changeSidebarThemeImage(e.target.value)
                        }
                      }
                      }
                    />

                    <label htmlFor="leftsidebarThemebgimg1">
                      <img alt="sidebar bg image" width="90" className="themesideimage rounded" src={bgimg1} />
                    </label>
                    {"   "}

                    <input
                      type="radio"
                      id="leftsidebarThemebgimg2"
                      name="leftsidebarThemeImage"
                      value="img2"
                      checked={props.leftSideBarThemeImage === "img2"}
                      onChange={e => {
                        if (e.target.checked) {
                          props.changeSidebarThemeImage(e.target.value)
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemebgimg2">
                      <img alt="sidebar bg image" width="90" className="themesideimage rounded" src={bgimg2} />
                    </label>
                    {"   "}

                    <input
                      type="radio"
                      id="leftsidebarThemebgimg3"
                      name="leftsidebarThemeImage"
                      value="img3"
                      checked={props.leftSideBarThemeImage === "img3"}
                      onChange={e => {
                        if (e.target.checked) {
                          props.changeSidebarThemeImage(e.target.value)
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemebgimg3">
                      <img alt="sidebar bg image" width="90" className="themesideimage rounded" src={bgimg3} />
                    </label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemebgimg4"
                      name="leftsidebarThemeImage"
                      value="img4"
                      checked={props.leftSideBarThemeImage === "img4"}
                      onChange={e => {
                        if (e.target.checked) {
                          props.changeSidebarThemeImage(e.target.value)
                        }
                      }
                      }
                    />
                    <label htmlFor="leftsidebarThemebgimg4">
                      <img alt="sidebar bg image" width="90" className="themesideimage rounded" src={bgimg4} />
                    </label>
                    {"   "}

                    <input
                      type="radio"
                      id="leftsidebarThemenone"
                      name="leftsidebarThemeImage"
                      value="none"
                      checked={props.leftSideBarThemeImage === "none"}
                      onChange={e => {
                        if (e.target.checked) {
                          props.changeSidebarThemeImage(e.target.value)
                        }
                      }
                      }
                    />
                    <label htmlFor="leftsidebarThemenone">
                      <div style={{ width: "40px", height: "80px" }}>
                        <div className="bg-light border px-2 h-100 shadow-none">
                          <div className="verticalcontent">None</div>
                        </div>
                      </div>
                    </label>
                    {"   "}
                  </div>
                </div>
                <hr className="mt-1" />
              </React.Fragment>
            ) : null}

            <FormGroup>
              <span className="mb-2 d-block" id="radio-title">
                Preloader
                </span>

              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input checkbox"
                  id="checkbox_1"
                  checked={props.isPreloader}
                  onChange={() => {
                    props.changePreloader(!props.isPreloader)
                  }}
                />

                <label className="form-check-label" htmlFor="checkbox_1">
                  Preloader
                  </label>
              </div>
            </FormGroup>

            <h6 className="text-center">Choose Layouts</h6>

            <div className="mb-2">
              <Link
                to="//skote-v-light.react.themesbrand.com"
                target="_blank"
              >
                <img
                  src={layout1}
                  className="img-fluid img-thumbnail"
                  alt=""
                />
              </Link>
            </div>

            <div className="mb-2">
              <Link to="//skote-v-dark.react.themesbrand.com" target="_blank">
                <img
                  src={layout2}
                  className="img-fluid img-thumbnail"
                  alt=""
                />
              </Link>
            </div>

            <div className="mb-2">
              <Link to="//skote-v-rtl.react.themesbrand.com" target="_blank">
                <img
                  src={layout3}
                  className="img-fluid img-thumbnail"
                  alt=""
                />
              </Link>
            </div>

            <Link
              to="//1.envato.market/skotereact"
              className="btn btn-primary btn-block mt-3"
              target="_blank"
            >
              <i className="mdi mdi-cart ms-1" /> Purchase Now
              </Link>
          </div>
        </div>
      </SimpleBar>
    </React.Fragment>

  )
}

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changePreloader: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  isPreloader: PropTypes.any,
  layoutType: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
  onClose: PropTypes.func
}

const mapStateToProps = state => {
  return { ...state.Layout }
}

export default connect(mapStateToProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
  showRightSidebarAction,
})(RightSidebar)
