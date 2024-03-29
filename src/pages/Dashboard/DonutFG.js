import PropTypes from "prop-types"
import React , {useState, useEffect} from "react"
import ReactApexChart from "react-apexcharts"
import { readFG } from './../Orders/api'
import { isAuthenticated } from './../Authentication/api'
import { withRouter, Link, Redirect } from "react-router-dom"
//store
import { connect } from "react-redux"
import { addFG, getFG } from 'store/actions'

const dountchart = props => {

  // const {user, token} = isAuthenticated()
  // const [fg, setFG] = useState({}) 

  const {FG, onGetFG} = props

  const [series, setseries] = useState(FG)
  const [option, setOption] = useState( {
    labels: ["TN", "PH", "SALT", "TSS", "HISTAMINE", "SPG", "AW", "AN", "Acidity", "Viscosity"],
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
    "#3F51B5", "#546E7A",  "#546EE5",
    "#1775A7", "#2B3142"],
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    
    // background: {
    //   foreColor: '#fff !important'
    // },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          
          legend: {
            show: false,
          },
        },
      },
    ],
  })

  
  useEffect(() => {
    setseries(FG)
  },[FG])

  return (
    <ReactApexChart
      options={option}
      series={series}
      type="donut"
      height="380"
    />
  )
}

dountchart.propTypes = {
  FG: PropTypes.array,
  onGetFG: PropTypes.func,
}

const mapStateToProps = state => ({
  FG: state.DFGST.DFG
})

const mapDispatchToProps = dispatch => ({
  onGetFG: (detail) => dispatch(getFG(detail)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(dountchart))