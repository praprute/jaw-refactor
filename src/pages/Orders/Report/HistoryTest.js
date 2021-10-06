import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  Row,
  Input,
  TabContent,
  TabPane,
} from "reactstrap"
import moment from "moment"
import Select from "react-select"
import makeAnimated from "react-select/animated"
// import { Link } from "react-router-dom"
import classnames from "classnames"
import { withRouter, Link, Redirect } from "react-router-dom"
import Moment from "moment"
import { connect } from "react-redux"
import { isAuthenticated } from "../../Authentication/api"
import { useHistory } from "react-router-dom"
import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import pdfFonts from "../../../assets/custom-fonts"
import { dailyReport } from "./DailyReport"
import { dailyReportBio } from "./DailyReportBio"
import FormBeforeExport2 from "../COA2/FormBeforeExport2"
import FormBeforeExport3 from "../COA3/FormBeforeExport3"
import FormBeforeExport4 from "../COA4/FormBeforeExport"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
import {
  getCustomers,
  dailyReportFetch,
  dailyReportBioFetch,
  UpdatexportCOA,
  UpdateDatailOrder,
} from "../api"
import e from "cors"
const animatedComponents = makeAnimated()
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
  // Kanit Font
  Sarabun: {
    // 3. set Kanit font
    normal: "Sarabun-Regular.ttf",
    bold: "Sarabun-Medium.ttf",
    italics: "Sarabun-Italic.ttf",
    bolditalics: "Sarabun-MediumItalic.ttf",
  },
}
const HistoryDaily = props => {
  const history = useHistory()
  const { user, token } = isAuthenticated()
  const { orders, spc, tr, bio } = props
  const [detailById, setdetailById] = useState([])
  const [values, setValues] = useState([])
  const [valuesChem, setvaluesChem] = useState({})
  const [valuesMicro, setvaluesMicro] = useState({
    TPC: "",
    YeaseandMold: "",
    Ecoil: "",
    Coliform: "",
    Saureus: "",
    Salmonella: "",
  })
  const [activeTab, setActiveTab] = useState("1")
  const [valuesProtein, setValuesProtein] = useState({
    protein: "",
  })
  const [spcChem, setSpcChem] = useState({})
  const [spcMicro, setSpcMicro] = useState({})

  const [MicroRender, setMicroRender] = useState(false)
  const [MicroAnalysis, setMicroAnalysis] = useState(true)

  const [DisProductDate, setDisProductDate] = useState(true)
  const [DisExpiration, setDisExpiration] = useState(true)
  const [DisTank, setDisTank] = useState(true)

  const [DisTN, setDisTN] = useState(true)
  const [DisProtein, setDisProtein] = useState(false)
  const [DisPH, setDisPH] = useState(true)
  const [DisSalt, setDisSalt] = useState(true)
  const [DisHistamine, setDisHistamine] = useState(true)
  const [DisSPG, setDisSPG] = useState(true)
  const [DisAW, setDisAW] = useState(true)
  const [DisTss, setDisTss] = useState(true)
  const [DisAN, setDisAN] = useState(true)
  const [DisAcidity, setDisAcidity] = useState(true)
  const [DisViscosity, setDisViscosity] = useState(true)
  const [CustomersOption, setCustomers] = useState([])
  const [salmon, setSalmon] = useState(false)
  const [ApproveSelect, setApproveSelect] = useState([
    {
      label: "DCC",
      value: "DCC",
    },
    {
      label: "QMR",
      value: "QMR",
    },
    {
      label: "QA",
      value: "QA",
    },
    {
      label: "Production mixing",
      value: "Production mixing",
    },
  ])
  const [ReportSelect, setReport] = useState([
    {
      label: "DCC",
      value: "DCC",
    },
    {
      label: "QMR",
      value: "QMR",
    },
    {
      label: "QA",
      value: "QA",
    },
    {
      label: "Qc Lab",
      value: "QMR",
    },
  ])
  const [valuesExportRef, setValuesExportRef] = useState({
    refNo: "",
    date: "",
    pageNo: "",
  })
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedGroup2, setSelectedGroup2] = useState(null)
  const [selectedGroup3, setSelectedGroup3] = useState(null)
  const [customerNameSelect, setCustomerNameSelect] = useState(null)
  const [ApproveValue, setApproveValue] = useState(null)
  const [ReportValue, setReportValue] = useState(null)
  const [success_msg, setsuccess_msg] = useState(false)
  const [success_error, setsuccess_error] = useState(false)
  const [valuesExportRow1, setValuesExportRow1] = useState({
    To: customerNameSelect,
    DCL1: "BEST If Used By:",
    DCL2: "",
    DCL3: "",
  })
  const [valuesExportRow2, setValuesExportRow2] = useState({
    ProductionDate: "",
    DaliveryDate: "",
  })
  const [valuesExportRow3, setValuesExportRow3] = useState({
    ExpirationDate: "",
  })
  const [valuesExportPNandPS, setValuesExportPNandPS] = useState({
    ProductName: "",
    PackSize: "",
  })
  const [TankNumber, setTankNumber] = useState({
    Tank: "",
  })
  const [valuesQuantity, setValuesQuantity] = useState({
    Quantity: "",
    TestDate: "",
  })
  const [uid, setUid] = useState(null)

  useEffect(async () => {
    try {
      let customerName = await getCustomers(token)
      // console.log("customerName : ", customerName.message)
      let index = []
      for (let i = 0; i < customerName.message.length; i++) {
        // console.log("sdfsd ", customerName.message[i])
        let detail = {
          label: customerName.message[i].Name,
          value: customerName.message[i].Name,
        }
        index.push(detail)
      }
      setCustomers(index)
    } catch (err) {}
  }, [])

  useEffect(() => {
    if (localStorage.getItem("JawIndexExport")) {
      let paresIndex = JSON.parse(localStorage.getItem("JawIndexExport"))
      // console.log("index : ", paresIndex)

      setValuesExportRow2({
        ProductionDate: paresIndex.Orders.PD,
        DaliveryDate: paresIndex.Orders.DD,
      })

      setTankNumber({
        Tank: paresIndex.Orders.Tank,
      })

      setUid(paresIndex.Orders.idOrders)

      if (!paresIndex.Orders.DCL1) {
        setValuesExportRow1({
          To: customerNameSelect,
          DCL1: "BEST If Used By:",
          DCL2: "",
          DCL3: "",
        })
      } else {
        setValuesExportRow1({
          To: customerNameSelect,
          DCL1: paresIndex.Orders.DCL1,
          DCL2: paresIndex.Orders.DCL2,
          DCL3: paresIndex.Orders.DCL3,
        })
      }

      setValuesExportPNandPS({
        ProductName: `${paresIndex.Orders.ProductName}`,
        PackSize: paresIndex.Orders.Size,
      })

      setValuesExportRow3({
        ExpirationDate: paresIndex.Orders.ED,
      })

      setValuesQuantity({
        Quantity: paresIndex.Orders.Quantity,
        TestDate: Moment(paresIndex.timeStamp[0].TimeTest).format("DD/MM/YY"),
      })

      setValuesExportRef({
        refNo: paresIndex.Orders.RefNo,
        date: Moment(new Date()).format("DD/MM/YY"),
        pageNo: "1",
      })

      setDisTN(paresIndex.chem[0].render)
      setDisPH(paresIndex.chem[3].render)
      setDisSalt(paresIndex.chem[1].render)
      setDisHistamine(paresIndex.chem[2].render)
      setDisSPG(paresIndex.chem[6].render)
      setDisAW(paresIndex.chem[4].render)
      setDisTss(paresIndex.chem[5].render)
      setDisAN(paresIndex.chem[7].render)
      setDisAcidity(paresIndex.chem[8].render)
      setDisViscosity(paresIndex.chem[9].render)

      setMicroRender(paresIndex.Orders.Micro)
      setValues(paresIndex)
      if (paresIndex.Orders.idScfChem == 14) {
        setSpcChem({
          scpTN: `\u2265 ${paresIndex.Orders.TnMain} g/L`,
          scpPH: `${paresIndex.Orders.PHCOAMin} - ${paresIndex.Orders.PHCOAMax} at RT`,
          scpProtein: `\u2265  7.8%`,
          scpSalt: `${paresIndex.Orders.SaltCOAMin} - ${paresIndex.Orders.SaltCOAMax}% w/v`,
          scpHistamine: `\u2264  ${paresIndex.Orders.HistamineMax}`,
          scpSPG: `\u2265 1.20/20 \u00B0C`,
          scpAW: `\u2264  ${paresIndex.Orders.AWMax}`,
          scpTSS: `${paresIndex.Orders.TnMain} - ${paresIndex.Orders.TnMax}`,
          scpAN: `${paresIndex.Orders.ANMin} - ${paresIndex.Orders.ANMax}`,
          scpAcidity: `${paresIndex.Orders.AcidityMin} - ${paresIndex.Orders.AcidityMax}`,
          scpViscosity: `${paresIndex.Orders.ViscosityMin} - ${paresIndex.Orders.ViscosityMax}`,
        })
      } else {
        setSpcChem({
          scpTN: `\u2265 ${paresIndex.Orders.TnMain} g/L`,
          scpPH: `${paresIndex.Orders.PHCOAMin} - ${paresIndex.Orders.PHCOAMax} at RT`,
          scpProtein: `2.3-3.5%`,
          scpSalt: `${paresIndex.Orders.SaltCOAMin} - ${paresIndex.Orders.SaltCOAMax}% w/v`,
          scpHistamine: `\u2264  ${paresIndex.Orders.HistamineMax}`,
          scpSPG: `\u2265 1.20/20 \u00B0C`,
          scpAW: `\u2264  ${paresIndex.Orders.AWMax}`,
          scpTSS: `${paresIndex.Orders.TnMain} - ${paresIndex.Orders.TnMax}`,
          scpAN: `${paresIndex.Orders.ANMin} - ${paresIndex.Orders.ANMax}`,
          scpAcidity: `${paresIndex.Orders.AcidityMin} - ${paresIndex.Orders.AcidityMax}`,
          scpViscosity: `${paresIndex.Orders.ViscosityMin} - ${paresIndex.Orders.ViscosityMax}`,
        })
      }

      setvaluesChem({
        TN: `${
          paresIndex.chem[0].val
            ? paresIndex.chem[0].val.toFixed(2)
            : paresIndex.chem[0].val
        }  g/L`,
        PH: `${
          paresIndex.chem[3].val
            ? paresIndex.chem[3].val.toFixed(2)
            : paresIndex.chem[3].val
        } / ${paresIndex.chem[3].temp} \u00B0C`,
        Protein: `${(paresIndex.chem[0].val * 0.625).toFixed(2)}  %`,
        Salt: `${
          paresIndex.chem[1].val
            ? paresIndex.chem[1].val.toFixed(2)
            : paresIndex.chem[1].val
        }% w/v`,
        Histamine: `${
          paresIndex.chem[2].val
            ? paresIndex.chem[2].val.toFixed(2)
            : paresIndex.chem[2].val
        } ppm`,
        SPG: `${
          paresIndex.chem[6].val
            ? paresIndex.chem[6].val.toFixed(2)
            : paresIndex.chem[6].val
        }/${paresIndex.chem[6].temp} \u00B0C`,
        AW: `${
          paresIndex.chem[4].val
            ? paresIndex.chem[4].val.toFixed(3)
            : paresIndex.chem[4].val
        }/${paresIndex.chem[4].temp} \u00B0C`,
        TSS: paresIndex.chem[5].val
          ? paresIndex.chem[5].val.toFixed(2)
          : paresIndex.chem[5].val,
        AN: paresIndex.chem[7].val
          ? paresIndex.chem[7].val.toFixed(2)
          : paresIndex.chem[7].val,
        Acidity: paresIndex.chem[8].val
          ? paresIndex.chem[8].val.toFixed(2)
          : paresIndex.chem[8].val,
        Viscosity: paresIndex.chem[9].val
          ? paresIndex.chem[9].val.toFixed(2)
          : paresIndex.chem[9].val,
      })
      let TPC = ""
      let YeaseandMold = ""
      let Ecoil = ""
      let Coliform = ""
      let Saureus = ""
      let Salmonella = "NOT DETECTED"

      if (paresIndex.micro[0].val < 250) {
        TPC = `< 250 CFU/g`
      } else {
        TPC = `${paresIndex.micro[0].val} CFU/g`
      }

      if (paresIndex.micro[1].val < 10) {
        YeaseandMold = `< 10 CFU/g`
      } else {
        YeaseandMold = `${paresIndex.micro[1].val} CFU/g`
      }

      if (paresIndex.micro[2].val < 3) {
        Ecoil = `NOT DETECTED`
      } else {
        Ecoil = `${paresIndex.micro[2].val} MPN/g`
      }

      if (paresIndex.micro[3].val < 3) {
        Coliform = `NOT DETECTED`
      } else {
        Coliform = `${paresIndex.micro[3].val} MPN/g`
      }

      if (paresIndex.micro[4].val < 3) {
        Saureus = `NOT DETECTED`
      } else {
        Saureus = `${paresIndex.micro[4].val} MPN/g`
      }

      setvaluesMicro({
        TPC: TPC,
        YeaseandMold: YeaseandMold,
        Ecoil: Ecoil,
        Coliform: Coliform,
        Saureus: Saureus,
        Salmonella: Salmonella,
      })
      return JSON.parse(localStorage.getItem("JawIndexExport"))
    } else {
      return false
    }
  }, [])

  const handleUpdateStatusCoa = async () => {
    try {
      let update = UpdatexportCOA(token)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const [dateStart, setDateStart] = useState({ date: new Date() })
  const [dateEnd, setDateEnd] = useState({ date: new Date() })

  const onChangeDateStart = name => event => {
    setDateStart({ ...dateStart, [name]: event.target.value })
    // console.log("start : ", dateStart)
  }
  const onChangeDateEnd = name => event => {
    setDateEnd({ ...dateEnd, [name]: event.target.value })
    // console.log("end : ", e.value)
  }

  const ExportdailyBio = async () => {
    try {
      const date_export = await moment(dateStart.date).format("DD/MM/YYYY")

      const date_export_to = await moment(dateEnd.date).format("DD/MM/YYYY")

      let index = {
        dStart: dateStart.date,
        dNow: dateEnd.date,
        // dStart: date_now,
      }
      const data = await dailyReportBioFetch(token, index)
      // console.log(data.message)
      dailyReportBio(values.logo, date_export, data.message, date_export_to)
    } catch (err) {
      console.log(err)
    }
  }
  const Exportdaily = async () => {
    try {
    //   const date_export = await moment(new Date(), "Asia/Bangkok").format(
    //     "DD/MM/YYYY"
    //   )
      const date_export = await moment(dateStart.date).format(
        "DD/MM/YYYY"
      )

      const date_export_to = await moment(dateEnd.date).format("DD/MM/YYYY")

      const date_now = await moment(new Date(), "Asia/Bangkok").format(
        "YYYY-MM-DD"
      )
      const date_end = await moment(new Date(), "Asia/Bangkok")
        .add(1, "d") //แก้ที่ตรงนี้
        .format("YYYY-MM-DD")
      let index = {
        dStart: dateStart.date,
        dNow: dateEnd.date,
        // dStart: date_now,
        // dNow: date_end,
      }
      const data = await dailyReportFetch(token, index)
      console.log(data.message)
      dailyReport(values.logo, date_export, data.message, date_export_to)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content" style={{ paddingTop: "0px" }}>
        <Row>
          <Col>
            <label
              htmlFor="example-date-input"
              className="col-md-2 col-form-label"
            >
              Date Start
            </label>
            <div className="">
              <input
                className="form-control"
                type="date"
                value=""
                id="example-date-input"
                name="date"
                onChange={onChangeDateStart("date")}
                value={dateStart.date}
              />
            </div>
          </Col>
          <Col>
            <label
              htmlFor="example-date-input2"
              className="col-md-2 col-form-label"
            >
              Date End
            </label>
            <div className="">
              <input
                className="form-control"
                type="date"
                id="example-date-input2"
                name="date"
                onChange={onChangeDateEnd("date")}
                value={dateEnd.date}
                // onChangeDateEnd
              />
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "0px", marginBottom: "20px" }}>
          <Col>
            <Button
              color="success"
              size="md"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={() => {
                Exportdaily()
                // handleExportPDF()
                // handleUpdateStatusCoa()
              }}
            >
              Daily Report Chem
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              size="md"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={() => {
                ExportdailyBio()
                // handleExportPDF()
                // handleUpdateStatusCoa()
              }}
            >
              Daily Report Bio
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

HistoryDaily.propTypes = {
  orders: PropTypes.array,
  spc: PropTypes.array,
  tr: PropTypes.array,
  bio: PropTypes.array,
}

const mapStateToProps = state => ({
  orders: state.DetailOrder.Detail,
  spc: state.DetailOrder.SpecificChem,
  tr: state.DetailOrder.TestResultLasted,
  bio: state.DetailOrder.SpecificBio,
})

export default connect(mapStateToProps)(withRouter(HistoryDaily))
