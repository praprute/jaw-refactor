import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Button, Col, Row, Input } from "reactstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"

import { UpdatexportCOA, UpdateDatailOrder } from "../api"
import { withRouter } from "react-router-dom"
import Moment from "moment"
import { connect } from "react-redux"
import { isAuthenticated } from "../../Authentication/api"
import { useHistory } from "react-router-dom"
import pdfMake from "pdfmake/build/pdfmake"

import { Company } from "../../../configAPI"

import pdfFonts from "../../../assets/custom-fonts"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
import { originalFormCOA2 } from "./Original2"
import { getCustomers } from "../api"
import "./StyleCOA2.css"
import { getAllHeaderCoa5Task, saveHeaderCoa5Task } from "OpenApi/DuocumentTask"
import TableHeaderCoa1 from "components/Document/TableCoaHeader1"

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
const FormBeforeExport5 = props => {
  const history = useHistory()
  const { user, token } = isAuthenticated()
  const { orders, spc, tr, bio } = props
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
  const [DisSaltMeter, setDisSaltMeter] = useState(true)
  const [DisAN, setDisAN] = useState(true)
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
  const [ApproveValue, setApproveValue] = useState(null)
  const [ReportValue, setReportValue] = useState(null)
  const [valuesExportRow1, setValuesExportRow1] = useState({
    To: customerNameSelect,
    DCL1: "00/00/00",
  })
  const [valuesExportRow2, setValuesExportRow2] = useState({
    CollectedDate: "",
    productName: "",
  })
  const [valuesExportRow3, setValuesExportRow3] = useState({
    productionDate: "",
    TankNo: "",
  })
  const [valuesExportPNandPS, setValuesExportPNandPS] = useState({
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
    spg: "Hydrometer",
    AW: "Aw meter",
    TSS: "TSS meter",
    Acidity: "Potentiometric method",
    Viscosity: "Viscometer",
    AOA: "(AOAC 051604)",
  })

  const [valScoreLevel, setValScoreLevel] = useState({
    Taste: "Typical Fresh fish sauce taste, No itchy after-taste, No off-taste",
    Odor: "Typical fresh fish sauce odor/aroma, No off-odor",
    Color: "Clear rockfish brown thin liquid",
    Appearance:
      "Clear light brown thin liquid, fishy flavor, first pressing extra virgin No sedimentation",
    testDate: "",
    CompletionDate: "",
  })

  const [refreshTable, setRefreshTable] = useState(false)
  const [selectFromList, setSelectFromList] = useState(null)

  const columnHeaderCoa1 = [
    {
      label: "ref_no",
      field: "ref_no",
      sort: "asc",
    },
    {
      label: "customer_name",
      field: "customer_name",
      sort: "asc",
    },
    {
      label: "ref_date",
      field: "ref_date",
      sort: "asc",
    },
    {
      label: "production_date",
      field: "production_date",
      sort: "asc",
    },
    {
      label: "lot",
      field: "lot",
      sort: "asc",
    },
    {
      label: "tank_no",
      field: "tank_no",
      sort: "asc",
    },
    {
      label: "select",
      field: "select",
      sort: "asc",
    },
  ]
  const [dataListHeaderCoa1, setDataListHeaderCoa1] = useState([])

  const handleChangeScoreLevel = name => event => {
    setValScoreLevel({ ...valScoreLevel, [name]: event.target.value })
  }

  useEffect(async () => {
    const response = await getAllHeaderCoa5Task(token)
    if (response.success === "success") {
      let list = []
      response.message.map((data, index) => {
        const row = {
          ...data,
          select: (
            <button
              onClick={() => {
                handleSelectListCoa(data)
              }}
              type="button"
              color="primary"
              className="btn btn-primary waves-effect waves-light .w-xs"
            >
              <i className="bx bx-pencil font-size-16 align-middle me-2"></i>{" "}
              SELECT
            </button>
          ),
        }
        list.push(row)
      })
      setDataListHeaderCoa1(list)
    }
  }, [refreshTable])

  const handleSelectListCoa = data => {
    setValuesExportRef(prevData => ({
      ...prevData,
      refNo: data.ref_no,
      pageNo: 1,
    }))

    setSelectFromList(data.customer_name)

    handleChangeValueCustomer(data.customer_name)

    setValuesExportRow1(prevData => ({
      ...prevData,
      To: data.customer_name,
      DCL1: data.lot,
    }))

    setValuesExportRow2({
      CollectedDate: data.collected_date,
      productName: data.field_null,
    })

    setValuesExportPNandPS(prevData => ({
      ...prevData,
      ExpirationDate: data.exp_date,
    }))

    setTankNumber({
      Tank: data.tank_no,
    })

    setValuesExportRow3({
      productionDate: data.production_date,
      TankNo: data.tank_no,
    })

    setValScoreLevel(prevData => ({
      ...prevData,
      testDate: data.test_date,
      CompletionDate: data.completion_date,
    }))

    window.scrollTo(0, 0)
  }

  useEffect(async () => {
    try {
      const customerName = await getCustomers(token)
      let index = []
      for (let i = 0; i < customerName.message.length; i++) {
        let detail = {
          idCustomer: customerName.message[i].idCustomers,
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

      setValuesExportRow2({
        CollectedDate: "",
        productName: "",
      })
      setUid(paresIndex.Orders.idOrders)
      setValuesExportPNandPS({
        ExpirationDate: paresIndex.Orders.ED,
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
      setDisSPG(paresIndex.chem[6].render)
      setDisAW(paresIndex.chem[4].render)
      setDisTss(paresIndex.chem[5].render)
      setDisAN(paresIndex.chem[7].render)
      setDisAcidity(paresIndex.chem[9].render)
      setDisViscosity(paresIndex.chem[10].render)
      setDisSaltMeter(paresIndex.chem[11].render)
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
        scpTSS: `${paresIndex.Orders.TSSMin} - ${paresIndex.Orders.TSSMax}`,
        scpAN: `\u2265 ${paresIndex.Orders.ANMin}`,
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
        Acidity: paresIndex.chem[9].val,
        Viscosity: paresIndex.chem[10].val,
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

  const handleExportPDF = () => {

    let dataRow2 = [
      { values: valuesExportRow2.CollectedDate },
      { values: valuesExportRow2.productName },
    ]
    
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


    originalFormCOA2(
      values.logo,
      values.halal,
      valuesExportRef,
      valuesExportRow1,
      dataRow2,
      dataRow3,
      valuesExportPNandPS,
      TankNumber,
      valuesQuantity,
      AnalysisRender,
      spcChem,
      valuesChem,
      MicroPDF,
      valuesMicro,
      customerNameSelect,
      ApproveValue,
      ReportValue,
      method,
      ScoreLevel,
      valScoreLevel,
      salmon
    )
  }

  const handleSaveIndex = async () => {
    try {
      let payload = {
        ref_no: valuesExportRef.refNo,
        ref_date: valuesExportRef.date,
        lot: valuesExportRow1.DCL1,
        collected_date: valuesExportRow2.CollectedDate,
        field_null: valuesExportRow2.productName,
        production_date: valuesExportRow3.productionDate,
        tank_no: valuesExportRow3.TankNo,
        exp_date: valuesExportPNandPS.ExpirationDate,
        completion_date:valScoreLevel.CompletionDate,
        test_date: valScoreLevel.testDate,
      }
      
      if (Boolean(selectedGroup?.idCustomer)) {
        payload = { ...payload, customer: selectedGroup.idCustomer }
      }

      const res = await saveHeaderCoa5Task(token, payload)
      if (res.success == "success") {
        setsuccess_msg(true)
        setRefreshTable(!refreshTable)
      } else {
        setsuccess_error(true)
      }
    } catch (err) {
      setsuccess_error(true)
      console.error
    }
  }

  const handleChangeValueAnalysis = name => event => {
    setvaluesChem({ ...valuesChem, [name.val]: event.target.value })
  }

  const handleChange = name => event => {
    setValuesExportRef({ ...valuesExportRef, [name]: event.target.value })
  }

  const handleChangeDetailRow1 = name => event => {
    setValuesExportRow1({ ...valuesExportRow1, [name]: event.target.value })
  }

  const handleChangeDetailRow2PD = name => event => {
    setValuesExportRow2({ ...valuesExportRow2, [name]: event.target.value })
  }

  const handleChangeDetailRow3EX = name => event => {
    setValuesExportRow3({ ...valuesExportRow3, [name]: event.target.value })
  }

  const handleChangeExpirationDate = name => event => {
    setValuesExportPNandPS({
      ...valuesExportPNandPS,
      [name]: event.target.value,
    })
  }

  const handleChangeTank = name => event => {
    setTankNumber({ ...TankNumber, [name]: event.target.value })
  }

  const handleChangeQuantity = name => event => {
    setValuesQuantity({ ...valuesQuantity, [name]: event.target.value })
  }

  const handleChangeProtein = name => event => {
    setvaluesChem({ ...valuesChem, [name]: event.target.value })
  }

  const handleSelectGroup = data => {
    setSelectedGroup(data)
  }

  const handleSelectGroup2 = selectedGroup2 => {
    setSelectedGroup2(selectedGroup2)
  }

  const handleSelectGroup3 = selectedGroup3 => {
    setSelectedGroup3(selectedGroup3)
  }

  const handleChangeValueCustomer = e => {
    setCustomerNameSelect(e)
    setSelectFromList(e)
  }

  const handleChangeApproveValue = e => {
    setApproveValue(e)
    // console.log(e)
  }
  const handleChangeReportValue = e => {
    setReportValue(e)
    // console.log(e)
  }

  const headerForm = () => {
    return (
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
          <h4 style={{ margin: 0 }}>{Company.Name}</h4>
          <span>{Company.Address}</span>
          <span>{Company.Phone}</span>
          <span>{Company.Email}</span>
          <h4 style={{ margin: 0 }}>CERTIFICATE OF ANALYSIS</h4>
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
    )
  }

  const RefForm = () => {
    return (
      <Row
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <Col
          sm="3"
          style={{
            // margin: "auto",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        ></Col>
        <Col
          sm="5"
          style={{
            // margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        ></Col>
        <Col
          sm="4"
          style={{
            // margin: "auto",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
            padding: 0,
          }}
        >
          <div
            style={{
              padding: "5px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              border: "1px solid #000000",
              width: "100%",
              height: "100%",
            }}
          >
            <Col sm="2">
              <h5 style={{ margin: 0 }}>REF.NO</h5>
            </Col>
            <Col sm="10">
              <Input
                name="refNo"
                onChange={handleChange("refNo")}
                value={valuesExportRef.refNo}
              />
            </Col>
          </div>
          <div
            style={{
              borderRight: "1px solid #000000",
              borderLeft: "1px solid #000000",
              padding: "5px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Col sm="2">
              <h5 style={{ margin: 0 }}>DATE:</h5>
            </Col>
            <Col sm="10">
              <Input
                name="date"
                onChange={handleChange("date")}
                value={valuesExportRef.date}
              />
            </Col>
          </div>
          <div
            style={{
              padding: "5px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              border: "1px solid #000000",
              width: "100%",
              height: "100%",
            }}
          >
            <Col sm="3">
              <h5 style={{ margin: 0 }}>PAGE NO.</h5>
            </Col>
            <Col sm="9">
              <Input
                name="pageNo"
                onChange={handleChange("pageNo")}
                value={valuesExportRef.pageNo}
              />
            </Col>
          </div>
          {/* <img
            src={`data:image/png;base64,${values.logo}`}
            style={{ maxWidth: 150, maxHeight: 100 }}
          /> */}
        </Col>
      </Row>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginBottom: "10px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <span style={{ margin: 0, fontWeight: "bold" }}>TO.</span>
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <Select
                value={CustomersOption.filter(function (option) {
                  return option.value === selectFromList
                })}
                name="To"
                onChange={e => {
                  handleSelectGroup(e)
                  handleChangeValueCustomer(e.value)
                }}
                options={CustomersOption}
              />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col
              sm="3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span style={{ margin: 0, fontWeight: "bold" }}>Lot: &nbsp;</span>
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  name="DCL1"
                  onChange={handleChangeDetailRow1("DCL1")}
                  value={valuesExportRow1.DCL1}
                />
              </div>
            </Col>
          </Col>
        </div>

        {/* Collection Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
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
              {/* <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheckcolorTn"
                  checked={!disCollectedDate}
                  onChange={() => {
                    setdisCollectedDate(!disCollectedDate)
                  }}
                />
              </div> */}
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Collected date:
              </span>
            </Col>
            <Col
              sm="9"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  disabled={disCollectedDate}
                  name="CollectedDate"
                  onChange={handleChangeDetailRow2PD("CollectedDate")}
                  value={valuesExportRow2.CollectedDate}
                />
              </div>
            </Col>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col
              sm="3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            ></Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  disabled={DisTank}
                  name="productName"
                  onChange={handleChangeDetailRow2PD("productName")}
                  value={valuesExportRow2.productName}
                />
              </div>
            </Col>
          </Col>
        </div>

        {/* Production Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
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
              <span style={{ fontWeight: "bold" }}>Production date:</span>
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  disabled={DisProductDate}
                  name="productionDate"
                  onChange={handleChangeDetailRow3EX("productionDate")}
                  value={valuesExportRow3.productionDate}
                />
              </div>
            </Col>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col
              sm="3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Tank No. </span>
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  disabled={DisTank}
                  name="TankNo"
                  onChange={handleChangeDetailRow3EX("TankNo")}
                  value={valuesExportRow3.TankNo}
                />
              </div>
            </Col>
          </Col>
        </div>

        {/* ExpirationDate  */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
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
              <span style={{ fontWeight: "bold" }}>Expiration date:</span>
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  disabled={DisExpiration}
                  name="ExpirationDate"
                  onChange={handleChangeExpirationDate("ExpirationDate")}
                  value={valuesExportPNandPS.ExpirationDate}
                />
              </div>
            </Col>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col
              sm="3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            ></Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </Col>
          </Col>
        </div>
      </Row>
    )
  }

  const Sinsory = () => {
    return (
      <React.Fragment>
        <Row
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "15px",
          }}
        ></Row>
        <React.Fragment>
          <Row
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",

              marginTop: "10px",
            }}
          >
            <Col xs={12} style={{ padding: "0" }}>
              <table id="score-level">
                <tr>
                  <td>Taste</td>
                  <td>
                    {" "}
                    <Input
                      disabled="true"
                      name="Taste"
                      type="number"
                      min="0"
                      max="5"
                      placeholder={valScoreLevel.Taste}
                      onChange={handleChangeScoreLevel("Taste")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Odor</td>
                  <td>
                    {" "}
                    <Input
                      disabled="true"
                      min="0"
                      max="5"
                      name="Odor"
                      type="number"
                      placeholder={valScoreLevel.Odor}
                      onChange={handleChangeScoreLevel("Odor")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>
                    {" "}
                    <Input
                      disabled="true"
                      min="0"
                      max="5"
                      name="Color"
                      type="number"
                      placeholder={valScoreLevel.Color}
                      onChange={handleChangeScoreLevel("Color")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Appearance</td>
                  <td>
                    {" "}
                    <Input
                      disabled="true"
                      min="0"
                      max="5"
                      name="Appearance"
                      type="number"
                      placeholder={valScoreLevel.Appearance}
                      onChange={handleChangeScoreLevel("Appearance")}
                    />
                  </td>
                </tr>
              </table>
            </Col>
          </Row>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              marginBottom: "5px",
            }}
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Col
                sm="2"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <span style={{ margin: 0, fontWeight: "bold" }}>
                  Test date:
                </span>
              </Col>
              <Col
                sm="10"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Input
                    name="testDate"
                    onChange={handleChangeScoreLevel("testDate")}
                    value={valScoreLevel.testDate}
                  />
                </div>
              </Col>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Col
                sm="3"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingLeft: "15px",
                }}
              >
                <span style={{ margin: 0, fontWeight: "bold" }}>
                  Completion date:
                </span>
              </Col>
              <Col sm="9">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Input
                    name="CompletionDate"
                    onChange={handleChangeScoreLevel("CompletionDate")}
                    value={valScoreLevel.CompletionDate}
                  />
                </div>
              </Col>
            </Col>
          </div>
        </React.Fragment>
      </React.Fragment>
    )
  }

  const Analysis = () => {
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "10px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          ></Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h4>
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Product Specification
              </span>
            </h4>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h4>
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Analysis Results
              </span>
            </h4>
          </Col>
        </div>
        {/* TN */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckTN"
                checked={DisTN}
                onChange={() => {
                  setDisTN(!DisTN)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>
              Total Nitrogen
            </span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisTN} value={spcChem.scpTN} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input
                disabled={!DisTN}
                name="TN"
                onChange={handleChangeValueAnalysis("TN")}
                value={valuesChem.TN}
              />
            </div>
          </Col>
        </div>
        {/* Protein */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckProtein"
                checked={DisProtein}
                onChange={() => {
                  setDisProtein(!DisProtein)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>Protein</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisProtein} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input
                disabled={!DisProtein}
                name="Protein"
                onChange={handleChangeProtein("Protein")}
                value={valuesChem.Protein}
              />
            </div>
          </Col>
        </div>
        {/* PH */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckPH"
                checked={DisPH}
                onChange={() => {
                  setDisPH(!DisPH)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>PH</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisPH} value={spcChem.scpPH} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisPH} value={valuesChem.PH} />
            </div>
          </Col>
        </div>
        {/* Salt */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckSalt"
                checked={DisSalt}
                onChange={() => {
                  setDisSalt(!DisSalt)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>% NaCl</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisSalt} value={spcChem.scpSalt} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisSalt} value={valuesChem.Salt} />
            </div>
          </Col>
        </div>
        {/* Histamine */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckHistamine"
                checked={DisHistamine}
                onChange={() => {
                  setDisHistamine(!DisHistamine)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>Histamine</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisHistamine} value={spcChem.scpHistamine} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisHistamine} value={valuesChem.Histamine} />
            </div>
          </Col>
        </div>
        {/* SPG */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckSPG"
                checked={DisSPG}
                onChange={() => {
                  setDisSPG(!DisSPG)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>
              Specific Gravity
            </span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* &nbsp; */}
            {/* &ge; */}
            {/* {"\u2265"} */}
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <Input disabled={!DisSPG} value={spcChem.scpSPG} />
            </div>
            {/* {"\u00B0C"} */}
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisSPG} value={valuesChem.SPG} />
            </div>
            {/* {"\u00B0C"} */}
          </Col>
        </div>

        {/* Water Activity */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckAW"
                checked={DisAW}
                onChange={() => {
                  setDisAW(!DisAW)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>
              Water Activity
            </span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisAW} value={spcChem.scpAW} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisAW} value={valuesChem.AW} />
            </div>
          </Col>
        </div>
        {/* TSS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckAW"
                checked={DisTss}
                onChange={() => {
                  setDisTss(!DisTss)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>TSS(Brix)</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisTss} value={spcChem.scpTSS} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisTss} value={valuesChem.TSS} />
            </div>
          </Col>
        </div>
        {/* AN */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckAN"
                checked={DisAN}
                onChange={() => {
                  setDisAN(!DisAN)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>AN</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisAN} value={spcChem.scpAN} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisAN} value={valuesChem.AN} />
            </div>
          </Col>
        </div>
        {/* Acidity */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckAcidity"
                checked={DisAcidity}
                onChange={() => {
                  setDisAcidity(!DisAcidity)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>Acidity</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisAcidity} value={spcChem.scpAcidity} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisAcidity} value={valuesChem.Acidity} />
            </div>
          </Col>
        </div>
        {/* Viscosity */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="form-check form-check-warning">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckViscosity"
                checked={DisViscosity}
                onChange={() => {
                  setDisViscosity(!DisViscosity)
                }}
              />
            </div>
            <span style={{ margin: 0, fontWeight: "bold" }}>Viscosity</span>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            &nbsp;
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisViscosity} value={spcChem.scpViscosity} />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "30px",
              }}
            >
              <Input disabled={!DisViscosity} value={valuesChem.Viscosity} />
            </div>
          </Col>
        </div>

        {/* MicroBiological */}
        {MicroRender ? (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheckMicroAnalysis"
                  checked={MicroAnalysis}
                  onChange={() => {
                    setMicroAnalysis(!MicroAnalysis)
                  }}
                />
              </div>
              <h4 style={{ margin: "0" }}>
                <span style={{ margin: 0, fontWeight: "bold" }}>
                  MICROBIOLOGICAL
                </span>
              </h4>
            </div>
            {MicroAnalysis ? (
              <React.Fragment>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    {/* <div className="form-check form-check-warning">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheckViscosity"
                      checked={DisViscosity}
                      onChange={() => {
                        setDisViscosity(!DisViscosity)
                      }}
                    />
                  </div> */}
                    <span style={{ margin: 0, fontWeight: "bold" }}>TPC</span>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    &nbsp;
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      {/* <Input /> */}
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        {"<" + " " + "1 x 10" + "\u2074" + " CFU/g"}
                      </span>
                    </div>
                    {/* {"10"+"\u2074"} */}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <Input value={valuesMicro.TPC} />
                    </div>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ margin: 0, fontWeight: "bold" }}>
                      Yeasts and Molds
                    </span>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    &nbsp;
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      {/* <Input /> */}
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        {"\u2264" + " " + "100" + " CFU/g"}
                      </span>
                    </div>
                    {/* {"10"+"\u2074"} */}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <Input value={valuesMicro.YeaseandMold} />
                    </div>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ margin: 0, fontWeight: "bold" }}>
                      E. coli
                    </span>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    &nbsp;
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        NOT DETECTED
                      </span>
                    </div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <Input value={valuesMicro.Ecoil} />
                    </div>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ margin: 0, fontWeight: "bold" }}>
                      Coliform
                    </span>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    &nbsp;
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        NOT DETECTED
                      </span>
                    </div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <Input value={valuesMicro.Coliform} />
                    </div>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ margin: 0, fontWeight: "bold" }}>
                      S. aureus
                    </span>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    &nbsp;
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        NOT DETECTED
                      </span>
                    </div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <Input value={valuesMicro.Saureus} />
                    </div>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-check form-check-warning">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckSalmon2"
                        checked={salmon}
                        onChange={() => {
                          setSalmon(!salmon)
                        }}
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="customCheckSalmon2"
                    >
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        Salmonella spp.
                      </span>
                    </label>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    &nbsp;
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        NOT DETECTED
                      </span>
                    </div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingRight: "30px",
                      }}
                    >
                      <Input value={valuesMicro.Salmonella} />
                    </div>
                  </Col>
                </div>
              </React.Fragment>
            ) : null}
            {/* {Sinsory()} */}
          </React.Fragment>
        ) : null}
        {Sinsory()}
      </Row>
    )
  }

  return (
    <React.Fragment>
      {success_msg ? (
        <SweetAlert
          title="Add Order Success"
          success
          confirmBtnBsStyle="success"
          onConfirm={async () => {
            setsuccess_msg(false)
          }}
        >
          You clicked the button!
        </SweetAlert>
      ) : null}

      {success_error ? (
        <SweetAlert
          title="error"
          danger
          confirmBtnBsStyle="danger"
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
        {RefForm()}
        {headDetail()}
        <br />
        {Analysis()}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Col sm="3" style={{ padding: "5px" }}>
            Report By ................................
            <Select
              value={selectedGroup2}
              name="To"
              onChange={e => {
                handleSelectGroup2()
                handleChangeApproveValue(e.value)
              }}
              options={ReportSelect}
            />
          </Col>
          <Col sm="3" style={{ padding: "5px" }}>
            Approve By ................................
            <Select
              value={selectedGroup3}
              name="To"
              onChange={e => {
                handleSelectGroup3()
                handleChangeReportValue(e.value)
              }}
              options={ApproveSelect}
            />
          </Col>
          <Col sm="3" style={{ textAlign: "right", paddingRight: "10px" }}>
            <Button
              color="warning"
              size="lg"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={() => {
                handleSaveIndex()
              }}
            >
              SAVE
            </Button>
          </Col>
          <Col sm="3" style={{ textAlign: "right", paddingRight: "0px" }}>
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
        <TableHeaderCoa1
          dataTable={{
            columns: columnHeaderCoa1,
            rows: dataListHeaderCoa1,
          }}
        />
      </div>
      {/* </div> */}
    </React.Fragment>
  )
}

FormBeforeExport5.propTypes = {
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

export default connect(mapStateToProps)(withRouter(FormBeforeExport5))
