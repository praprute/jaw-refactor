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
import Select from "react-select"
import makeAnimated from "react-select/animated"
// import { Link } from "react-router-dom"
import classnames from "classnames"
import { UpdatexportCOA, loadHalalLogo, UpdateDatailOrder } from "../api"
import { withRouter, Link, Redirect } from "react-router-dom"
import Moment from "moment"
import { connect } from "react-redux"
import { isAuthenticated } from "../../Authentication/api"
import { useHistory } from "react-router-dom"
import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import pdfFonts from "../../../assets/custom-fonts"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
import { originalFormCOA3 } from "./Original3"
import { getCustomers } from "../api"
import ModalAddExport from "./ModalAddExport"
import { AddOrderVeit } from "store/actions"
import "./StyleCOA2.css"
import { LOGOUT_USER_SUCCESS } from "store/auth/login/actionTypes"

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
const FormBeforeExport3 = props => {
  const history = useHistory()
  const { user, token } = isAuthenticated()
  const { orders, spc, tr, bio, OderVeit, onAddOrderVeit } = props
  const [detailById, setdetailById] = useState([])
  const [values, setValues] = useState([])
  const [valuesChem, setvaluesChem] = useState({})
  const [salmon, setSalmon] = useState(false)
  const [valuesMicro, setvaluesMicro] = useState({
    TPC: "",
    YeaseandMold: "",
    Ecoil: "",
    Coliform: "",
    Saureus: "",
    Salmonella: "",
  })
  const [valuesProtein, setValuesProtein] = useState({
    protein: "",
  })
  const [spcChem, setSpcChem] = useState({})
  const [spcMicro, setSpcMicro] = useState({})
  const [modalAddSamples, setModalAddSamples] = useState(false)
  const [MicroRender, setMicroRender] = useState(false)
  const [MicroAnalysis, setMicroAnalysis] = useState(true)

  const [DisProductDate, setDisProductDate] = useState(false)
  const [DisExpiration, setDisExpiration] = useState(false)
  const [DisTank, setDisTank] = useState(false)
  const [disCollectedDate, setdisCollectedDate] = useState(false)

  const [DisTN, setDisTN] = useState(true)
  const [DisProtein, setDisProtein] = useState(false)
  const [DisPH, setDisPH] = useState(true)
  const [DisSalt, setDisSalt] = useState(true)
  const [DisHistamine, setDisHistamine] = useState(true)
  const [DisSPG, setDisSPG] = useState(true)
  const [DisAW, setDisAW] = useState(true)
  const [DisTss, setDisTss] = useState(true)
  const [DisAN, setDisAN] = useState(true)

  const [redirect, setRedirect] = useState(false)
  const [DisSaltMeter, setDisSaltMeter] = useState(true)
  const [DisAcidity, setDisAcidity] = useState(true)
  const [DisViscosity, setDisViscosity] = useState(true)
  const [success_msg, setsuccess_msg] = useState(false)
  const [success_error, setsuccess_error] = useState(false)
  const [CustomersOption, setCustomers] = useState([])
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
  const [descriptionVeit, setDescriptionVeit] = useState({
    description: "",
    Invoice: "",
    ETA: "",
    ShelfLife: "",
  })
  const [ApproveValue, setApproveValue] = useState(null)
  const [ReportValue, setReportValue] = useState(null)
  const [valuesExportRow1, setValuesExportRow1] = useState({
    To: customerNameSelect,
    DCL1: "00/00/00",
  })
  const [valuesExportRow2, setValuesExportRow2] = useState({
    CollectedDate: "",
    productName: "",
    // ProductionDate: "",
    // DaliveryDate: "",
  })
  const [valuesExportRow3, setValuesExportRow3] = useState({
    productionDate: "",
    TankNo: "",
  })
  const [valuesExportPNandPS, setValuesExportPNandPS] = useState({
    // CollectedDate: "",
    // productName: "",
    ExpirationDate: "",
  })
  const [TankNumber, setTankNumber] = useState({
    Tank: "",
  })
  const [valuesQuantity, setValuesQuantity] = useState({
    Quantity: "",
    TestDate: "",
  })
  const [uid, setUid] = useState(null)
  const [method, setMethod] = useState({
    TN: "Kjeldahl method",
    AN: "TIS 3-2526",
    protien: " ",
    PH: "pH meter",
    Nacl: "Volumetric method",
    Histamine: "Enzymatic Biosensor method",
    spg: "SPG meter",
    AW: "Aw meter",
    TSS: "TSS meter",
    Acidity: "Potentiometric method",
    Viscosity: "Viscometer",
    AOA: "(AOAC 051604)",
  })

  const [valScoreLevel, setValScoreLevel] = useState({
    Taste: 0,
    Odor: 0,
    Color: 0,
    Appearance: 0,
    testDate: "",
    CompletionDate: "",
  })

  const [orderAdded, setOrderAdded] = useState([{}])
  const [valuesAplove, setValuesAplove] = useState({
    nameLeft: "",
    nameRight: "",
    dateLeft: "",
    dateRight: "",
  })

  // TWCU2053022
  // GB180823361
  // 0209321

  const [valuesContainer, setValuesContainer] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    // 8: "",
  })

  const [valuesBagNo, setValuesBagNo] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    // 8: "",
  })

  const [valuesLot, setValuesLot] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    // 8: "",
  })

  const [OrderformTableVeit, setOrderformTableVeit] = useState([])

  const handleChangeDesVeit = name => event => {
    // descriptionVeit, setDescriptionVeit
    setDescriptionVeit({ ...descriptionVeit, [name]: event.target.value })
    console.log("descriptionVeit: ", descriptionVeit)
  }

  const handleChangeValuesApplove = name => event => {
    setValuesAplove({ ...valuesAplove, [name]: event.target.value })
  }

  const handleChangeValuesContainer = name => event => {
    setValuesContainer({ ...valuesContainer, [name]: event.target.value })
    // console.log("valuesContainer : ", valuesContainer)
  }

  const handleChangeValuesBagNo = name => event => {
    setValuesBagNo({ ...valuesBagNo, [name]: event.target.value })
    // console.log("valuesBagNo : ", valuesBagNo)
  }

  const handleChangeValuesLot = name => event => {
    setValuesLot({ ...valuesLot, [name]: event.target.value })
    // console.log("valuesLot : ", valuesLot)
  }

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
      console.log("index : ", paresIndex)

      setValuesExportRow2({
        CollectedDate: "",
        productName: "",
      })
      setUid(paresIndex.Orders.idOrders)
      setValuesExportPNandPS({
        ExpirationDate: paresIndex.Orders.ED,
        // ProductName: paresIndex.Orders.ProductName,
        // PackSize: paresIndex.Orders.Size,
      })

      setValuesExportRow3({
        productionDate: paresIndex.Orders.PD,
        TankNo: paresIndex.Orders.Tank,
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
      // setDisSPG(paresIndex.chem[6].render)
      setDisSPG(true)
      setDisAW(paresIndex.chem[4].render)
      setDisTss(paresIndex.chem[5].render)
      setDisAN(paresIndex.chem[7].render)
      setDisAcidity(paresIndex.chem[8].render)
      setDisViscosity(paresIndex.chem[9].render)
      // setDisSaltMeter(paresIndex.chem[10].render)
      setDisSaltMeter(true)
      setMicroRender(paresIndex.Orders.Micro)
      setValues(paresIndex)
      setSpcChem({
        scpTN: `\u2265 ${paresIndex.Orders.TnMain} g/L`,
        scpPH: `${paresIndex.Orders.PHCOAMin} - ${paresIndex.Orders.PHCOAMax} at RT`,
        scpProtein: "",
        scpSalt: `${paresIndex.Orders.SaltCOAMin} - ${paresIndex.Orders.SaltCOAMax}% w/v`,
        scpHistamine: `\u2264  ${paresIndex.Orders.HistamineMax}`,
        scpSPG: `\u2265 1.20/20 \u00B0C`,
        scpAW: `\u2264  ${paresIndex.Orders.AWMax}`,
        scpTSS: `${paresIndex.Orders.TnMain} - ${paresIndex.Orders.TnMax}`,
        scpAN: `${paresIndex.Orders.ANMin} - ${paresIndex.Orders.ANMax}`,
        scpAcidity: `${paresIndex.Orders.AcidityMin} - ${paresIndex.Orders.AcidityMax}`,
        scpViscosity: `${paresIndex.Orders.ViscosityMin} - ${paresIndex.Orders.ViscosityMax}`,
      })
      setvaluesChem({
        TN: `${paresIndex.chem[0].val}  g/L`,
        PH: `${paresIndex.chem[3].val} / ${paresIndex.chem[3].temp} \u00B0C`,
        Protein: `${(paresIndex.chem[0].val * 0.625).toFixed(2)}  %`,
        Salt: `${paresIndex.chem[1].val}% w/v`,
        Histamine: `${paresIndex.chem[2].val} ppm`,
        SPG: `${paresIndex.chem[6].val}/${paresIndex.chem[6].temp} \u00B0C`,
        AW: `${paresIndex.chem[4].val}/${paresIndex.chem[4].temp} \u00B0C`,
        TSS: paresIndex.chem[5].val,
        AN: paresIndex.chem[7].val,
        Acidity: paresIndex.chem[8].val,
        Viscosity: paresIndex.chem[9].val,
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
        Ecoil = `< 3.0 CFU/g`
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
      let update = await UpdatexportCOA(token)
    } catch (err) {
      console.log(err)
    }
  }

  async function json2array(json) {
    var result = []
    var keys = Object.keys(json)
    keys.forEach(function (key) {
      result.push(json[key])
    })
    return result
  }

  const handleExportPDF = async () => {
    // console.log("valScoreLevel : ", valScoreLevel)

    let dataRow2 = [
      { values: valuesExportRow2.CollectedDate },
      { values: valuesExportRow2.productName },
    ]
    // CollectedDate: "",
    // productName: "",
    let dataRow3 = [
      { values: valuesExportRow3.productionDate },
      { values: valuesExportRow3.TankNo },
    ]

    let AnalysisRender = {
      DisTN: DisTN,
      DisProtein: DisProtein,
      DisPH: DisPH,
      DisSalt: DisSalt,
      DisHistamine: DisHistamine,
      DisSPG: DisSPG,
      DisAW: DisAW,
      DisTss: DisTss,
      DisAN: DisAN,
      DisAcidity: DisAcidity,
      DisViscosity: DisViscosity,
    }

    let MicroPDF = {
      MicroRender,
      MicroAnalysis,
    }

    let ScoreLevel = true

    console.log("OrderformTableVeit", OrderformTableVeit)
    console.log("valuesBagNo", valuesBagNo)
    console.log("valuesLot", valuesLot)
    // valuesContainer
    // OrderformTableVeit
    const contain = await json2array(valuesContainer)
    const bag = await json2array(valuesBagNo)
    const lots = await json2array(valuesLot)

    originalFormCOA3(
      values.logo,
      values.halal,
      
     
    
      
     
      customerNameSelect,
      ApproveValue,
      ReportValue,
     
      descriptionVeit,
      OrderformTableVeit,
      contain,
      bag,
      lots,
      valuesAplove
    )
  }

  const handleSelectGroup = selectedGroup => {
    setSelectedGroup(selectedGroup)
  }

  const handleSelectGroup2 = selectedGroup2 => {
    setSelectedGroup2(selectedGroup2)
  }

  const handleSelectGroup3 = selectedGroup3 => {
    setSelectedGroup3(selectedGroup3)
  }

  const handleChangeValueCustomer = e => {
    setCustomerNameSelect(e)
    // console.log(e)
  }
  const handleChangeApproveValue = e => {
    setApproveValue(e)
    // console.log(e)
  }
  const handleChangeReportValue = e => {
    setReportValue(e)
    // console.log(e)
  }

  // ApproveSelect, setApproveSelect

  // const [ApproveValue, setApproveValue] = useState(null)
  // const [ReportValue, setReportValue] = useState(null)
  const headerForm = () => {
    return (
      <React.Fragment>
        <Row
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
          }}
        >
          <Col
            sm="3"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              src={`data:image/png;base64,${values.logo}`}
              style={{ maxWidth: 140, maxHeight: 90 }}
            />
          </Col>
          <Col
            sm="6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h4 style={{ margin: 0 }}>RUNGROJ FISH SAUCE CO., LTD.</h4>
            <span>8/4 Samutjadee Rd. Paknum Mueang Rayong 21000 Thailand</span>
            <span>Tel: 66-38-940388 Fax: 66-38-940086</span>

            {/* <h4 style={{ margin: 0 }}>VIET HUONG CO., LTD.</h4>
            <span>89 Moo 4, Makamku, Nikom Phattana, Rayoung 21180</span>
            <span>Tel: 66-38-624432 Fax: 66-38-940086</span> */}

            {/* <h4 style={{ margin: 0 }}>CERTIFICATE OF ANALYSIS</h4> */}
          </Col>
          <Col
            sm="3"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <img
              src={`data:image/png;base64,${values.halal}`}
              style={{ maxWidth: 140, maxHeight: 90 }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
            }}
          >
            {" "}
            <h4 style={{ margin: 0 }}>CERTIFICATE OF ANALYSIS</h4>
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  const headDetail = () => {
    return (
      <Row
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          border: "1px solid #000000",
          flexDirection: "column",
          padding: "5px",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Col md={1} style={{ padding: "0" }}>
            <span style={{ margin: 0, fontWeight: "bold" }}>Description :</span>
          </Col>

          <Col md={11} style={{ padding: "0" }}>
            <Input
              value={descriptionVeit.description}
              name="description"
              onChange={handleChangeDesVeit("description")}
            />
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Col sm={1} style={{ padding: "0" }}>
            <span style={{ margin: 0, fontWeight: "bold" }}>Customer :</span>
          </Col>

          <Col sm={11} style={{ padding: "0" }}>
            <Select
              value={selectedGroup}
              name="To"
              onChange={e => {
                handleSelectGroup()
                handleChangeValueCustomer(e.value)
              }}
              options={CustomersOption}
            />
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Col sm={1} style={{ padding: "0" }}>
            <span style={{ margin: 0, fontWeight: "bold" }}>Invoice No. :</span>
          </Col>

          <Col sm={11} style={{ padding: "0" }}>
            <Input
              value={descriptionVeit.Invoice}
              name="Invoice"
              onChange={handleChangeDesVeit("Invoice")}
            />
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Col sm={1} style={{ padding: "0" }}>
            <span style={{ margin: 0, fontWeight: "bold" }}>ETA :</span>
          </Col>

          <Col sm={11} style={{ padding: "0" }}>
            <Input
              value={descriptionVeit.ETA}
              name="ETA"
              onChange={handleChangeDesVeit("ETA")}
            />
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Col sm={1} style={{ padding: "0" }}>
            <span style={{ margin: 0, fontWeight: "bold" }}>Shelf life :</span>
          </Col>

          <Col sm={11} style={{ padding: "0" }}>
            <Input
              value={descriptionVeit.ShelfLife}
              name="ShelfLife"
              onChange={handleChangeDesVeit("ShelfLife")}
            />
          </Col>
        </Row>
      </Row>
    )
  }

  // const [valScoreLevel, setValScoreLevel] = useState({
  //   Taste:0,
  //   Odor:0,
  //   Color:0,
  //   Appearance:0
  // })

  const handleRedi = () => {
    setRedirect(!redirect)
  }

  const toggleModalReprocess = () => {
    setModalAddSamples(!modalAddSamples)
    // console.log("bug modalReprocess: ", modalReprocess)
  }

  const offReprocess = () => {
    setModalAddSamples(false)
  }

  const SelectAddValues = async index => {
    console.log("select index : ", index)
    let i = index
    let oo = []
    i.forEach(async data => {
      oo.push(data)
    })
    console.log("select oo : ", oo)
    setOrderAdded(oo)
  }

  useEffect(async () => {
    try {
      // if (modalAddSamples == false) {
      //   console.log("OderVeit : ", OderVeit)
      setOrderformTableVeit(OderVeit)
      // }
    } catch (e) {
      console.log(e)
    }
  }, [OderVeit, modalAddSamples])

  const AnalysisVeitHong = OderVeit => {
    return (
      <React.Fragment>
        <Row
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {/* <Col>
            <Select
              value={selectedGroup}
              name="To"
              onChange={e => {
                handleSelectGroup()
                handleChangeValueCustomer(e.value)
              }}
              options={CustomersOption}
            />
          </Col> */}
          <Col>
            <Button color="primary" onClick={toggleModalReprocess}>
              {" "}
              + Add
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => {
                onAddOrderVeit([])
              }}
            >
              {" "}
              - Clear
            </Button>
          </Col>
        </Row>

        <table id="score-level">
          <tr>
            {/* ProductName */}
            <th>Name</th>
            <th>Container No.</th>
            <th>BAG No.</th>
            <th>LOT No.</th>
            <th>T.N. (g/l)</th>
            <th>Histamine (ppm,)</th>
            <th>Salt (g/l)</th>
            <th>Salt Meter</th>
            <th>pH at 25 {`\u00B0C`}</th>
            <th>Specific Gravity</th>
            {/* {DisTN ? <th>T.N. (g/l)</th> : null}
            {DisHistamine ? <th>Histamine (ppm,)</th> : null}
            {DisSalt ? <th>Salt (g/l)</th> : null}
            {DisSaltMeter ? <th>Salt Meter</th> : null}
            {DisPH ? <th>pH at 25 {`\u00B0C`}</th> : null}
            {DisSPG ? <th>Specific Gravity</th> : null} */}
            <th>APC cfu/g</th>
            <th>E.coli & Coliform</th>
            <th>Aw/{`\u00B0C`}</th>
            {/* {DisAW ? <th>Aw/{`\u00B0C`}</th> : null} */}
            {/* <th>LOT No.</th> */}
          </tr>
          {/* {JSON.stringify(OderVeit.Name)} */}
          {OrderformTableVeit.map((data, i) => (
            <tr>
              {/* {JSON.stringify(i)} */}
              <td>{data.ProductName}</td>
              <td>
                <Input
                  name={i}
                  onChange={handleChangeValuesContainer(`${i}`)}
                  // value={valuesContainer.refNo}
                />
              </td>
              <td>
                <Input
                  name={i}
                  onChange={handleChangeValuesBagNo(`${i}`)}
                  // value={valuesContainer.refNo}
                />
              </td>
              <td>
                <Input
                  name={i}
                  onChange={handleChangeValuesLot(`${i}`)}
                  // value={valuesContainer.refNo}
                />
              </td>

              {/* TN */}
              <td style={{ textAlign: "center" }}>
                {data.Tn ? data.Tn.toFixed(2) : "null"}
              </td>
              {/* Histamine */}
              <td style={{ textAlign: "center" }}>
                {data.Histamine ? data.Histamine.toFixed(2) : "null"}
              </td>
              {/* Salt */}
              <td style={{ textAlign: "center" }}>
                {data.Salt ? data.Salt.toFixed(2) : "null"}
              </td>
              {/* Salt Meter */}
              <td style={{ textAlign: "center" }}>
                {data.SaltMeter ? data.SaltMeter.toFixed(2) : "null"}
              </td>
              {/* pH */}
              <td style={{ textAlign: "center" }}>
                {data.PH ? data.PH.toFixed(2) : "null"}
              </td>
              {/* SPGTest */}
              <td style={{ textAlign: "center" }}>
                {data.SPGTest ? data.SPGTest.toFixed(2) : "null"}
              </td>
              {/* APC */}
              <td style={{ textAlign: "center" }}>
                {data.APC ? data.APC : "ND"}
              </td>
              {/* E.coli */}
              <td style={{ textAlign: "center" }}>
                {data.EColi ? "ND" : "ND"}
              </td>
              {/* AW */}
              <td style={{ textAlign: "center" }}>
                {data.Aw
                  ? `${data.Aw}/${data.tempAW.toFixed(2)}\u00B0C`
                  : "null"}
                {/* {() => {
                  if (data.Aw != null) {
                    return `${data.Aw}/${data.tempAW.toFixed(2)}\u00B0C`
                  } else {
                    return `null`
                  }
                }} */}
                {/* {data.Aw ? `${data.Aw}/${data.tempAW.toFixed(2)}\u00B0C`: "null"} */}
              </td>
            </tr>
          ))}
        </table>

        <Row style={{ marginTop: "50px" }}>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>
                ......................................................
              </span>
              <br />
              <div style={{ width: "100%" }}>
                <Input
                  name="nameLeft"
                  onChange={handleChangeValuesApplove("nameLeft")}
                />
              </div>
              <br />
              <div style={{ width: "100%" }}>
                <Select
                  value={selectedGroup2}
                  name="To"
                  onChange={e => {
                    handleSelectGroup2()
                    handleChangeApproveValue(e.value)
                  }}
                  options={ReportSelect}
                />
              </div>
              <br />
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <span>Date</span>
                <div style={{ width: "100%", paddingLeft: "10px" }}>
                  <Input
                    name="dateLeft"
                    onChange={handleChangeValuesApplove("dateLeft")}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>
                ......................................................
              </span>
              <br />
              <div style={{ width: "100%" }}>
                <Input
                  name="nameRight"
                  onChange={handleChangeValuesApplove("nameRight")}
                />
              </div>
              <br />
              <div style={{ width: "100%" }}>
                <Select
                  value={selectedGroup3}
                  name="To"
                  onChange={e => {
                    handleSelectGroup3()
                    handleChangeReportValue(e.value)
                  }}
                  options={ApproveSelect}
                />
              </div>
              <br />
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <span>Date</span>
                <div style={{ width: "100%", paddingLeft: "10px" }}>
                  <Input
                    name="dateRight"
                    onChange={handleChangeValuesApplove("dateRight")}
                  />
                </div>
              </div>

              {/* </span> */}
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row>
          <h5>Physico-Chemical Specifications</h5>
        </Row>
        {/* <br /> */}
        <Row>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h5>Parameter</h5>

            <span>Total Nitrogen gm/liter, %</span>
            <span>Sodium Chloride</span>
            <span>Histamine</span>
            <span>pH</span>
            <span>Water Activity</span>
            <span>Specific Gravity</span>
            <span>APC</span>
            <span>E.coli & Coliform</span>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h5>Specification Limits</h5>
            <span>TN {"\u2265"} 20 gm/Liter minimum</span>
            <span>28.65 - 29.25%</span>
            <span>200ppm maximum</span>
            <span>5.0 - 5.2 at 25 {"\u00B0C"}</span>
            <span>0.85 maximum</span>
            <span>1.20 g/mL minimum</span>
            <span>500 cfu/g maximum</span>
            <span> {"<3.0 (None Detected)"} </span>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h5>Test Method</h5>
            <span>TN Auto-analyzer</span>
            <span>Volumetric Method</span>
            <span>Enzymatic Biosensor Method(AOAC 051604)</span>
            <span>Using pH meter</span>
            <span>Using Water Acticity analyzer</span>
            <span>Hydrometer method</span>
            <span>Pour Plate Technique</span>
            <span>MPN Method</span>
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <ModalAddExport
        setOrders={SelectAddValues}
        isOpenRro={modalAddSamples}
        toggleRepro={toggleModalReprocess}
        redirect={redirect}
        handleRedirect={handleRedi}
        offModal={offReprocess}
      />
      {success_msg ? (
        <SweetAlert
          title="Add Order Success"
          success
          //   showCancel
          confirmBtnBsStyle="success"
          //   cancelBtnBsStyle="danger"
          onConfirm={async () => {
            setsuccess_msg(false)
            // setInterval(() => {
            //   window.location.reload()
            // }, 5000)
          }}
        >
          You clicked the button!
        </SweetAlert>
      ) : null}

      {success_error ? (
        <SweetAlert
          title="error"
          danger
          //   showCancel
          confirmBtnBsStyle="danger"
          //   cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess_error(false)
          }}
        >
          You clicked the button!
        </SweetAlert>
      ) : null}
      {/* <div className="page-content"> */}
      <div style={{ width: "100%", height: "100%", background: "" }}>
        {headerForm()}
        <br />
        {/* {RefForm()} */}
        {headDetail()}
        <br />
        {AnalysisVeitHong(OderVeit)}

        {/* {Analysis()} */}
        {/* {Sinsory()} */}

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          
        
          <Col sm="12" style={{ textAlign: "right", paddingRight: "0px" }}>
            <Button
              color="primary"
              size="lg"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={() => {
                handleExportPDF()
                handleUpdateStatusCoa()
              }}
            >
              Print COA
            </Button>
          </Col>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      {/* </div> */}
    </React.Fragment>
  )
}

FormBeforeExport3.propTypes = {
  orders: PropTypes.array,
  spc: PropTypes.array,
  tr: PropTypes.array,
  bio: PropTypes.array,
  OderVeit: PropTypes.array,
  onAddOrderVeit: PropTypes.func,
}

const mapStateToProps = state => ({
  orders: state.DetailOrder.Detail,
  spc: state.DetailOrder.SpecificChem,
  tr: state.DetailOrder.TestResultLasted,
  bio: state.DetailOrder.SpecificBio,
  OderVeit: state.DetailOrder.veit,
})

const mapDispatchToProps = dispatch => ({
  onAddOrderVeit: detailVeit => dispatch(AddOrderVeit(detailVeit)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FormBeforeExport3))
