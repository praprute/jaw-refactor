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
// import { Link } from "react-router-dom"
import classnames from "classnames"
import {UpdatexportCOA} from '../api'
import { withRouter, Link, Redirect } from "react-router-dom"
import Moment from "moment"
import { connect } from "react-redux"
import { isAuthenticated } from "../../Authentication/api"
import { useHistory } from "react-router-dom"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import { originalFormCOA } from "./OriginalForm"
import "./ModalFullScreen.css"

pdfMake.vfs = pdfFonts.pdfMake.vfs
const FormBeforeExport = props => {
  const history = useHistory()
  const { user, token } = isAuthenticated()
  const { orders, spc, tr, bio } = props
  const [detailById, setdetailById] = useState([])
  const [values, setValues] = useState([])
  const [valuesChem, setvaluesChem] = useState({})
  const [valuesMicro, setvaluesMicro] = useState({
    TPC:"",
    YeaseandMold:"",
    Ecoil:"",
    Coliform:"",
    Saureus:"",
    Salmonella:""
  })

  const [valuesProtein, setValuesProtein] = useState({
    protein: "",
  })
  const [spcChem, setSpcChem] = useState({})
  const [spcMicro, setSpcMicro] = useState({})

  const [MicroRender  , setMicroRender] = useState(false)
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

  const [valuesExportRef, setValuesExportRef] = useState({
    refNo: "",
    date: "",
    pageNo: "",
  })
  
  const [valuesExportRow1, setValuesExportRow1] = useState({
    To: "",
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

  useEffect(() => {
    if (localStorage.getItem("JawIndexExport")) {
      let paresIndex = JSON.parse(localStorage.getItem("JawIndexExport"))
    //   console.log("index : ", paresIndex)

      setValuesExportRow2({
        ProductionDate: "",
        DaliveryDate: Moment(new Date()).format("DD/MM/YY")
      })

      setValuesExportPNandPS({
        ProductName: paresIndex.Orders.ProductName,
        PackSize: paresIndex.Orders.Size,
      })
      
      setValuesQuantity({
        Quantity: paresIndex.Orders.Quantity,
        TestDate: Moment(paresIndex.Orders.timestamp).format("DD/MM/YY"),
      })

      setValuesExportRef({
        refNo: paresIndex.Orders.PO,
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
        Protein: "",
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

    if(paresIndex.micro[0].val < 250){
        TPC = `< 250 CFU/g`
    }else{
        TPC = `${paresIndex.micro[0].val} CFU/g`
    }

    if(paresIndex.micro[1].val < 10){
        YeaseandMold = `< 10 CFU/g`
    }else{
        YeaseandMold = `${paresIndex.micro[1].val} CFU/g`
    }

    if(paresIndex.micro[2].val < 3){
        Ecoil = `NOT DETECTED`
    }else{
        Ecoil = `${paresIndex.micro[2].val} MPN/g`
    }

    if(paresIndex.micro[3].val < 3){
        Coliform = `NOT DETECTED`
    }else{
        Coliform = `${paresIndex.micro[3].val} MPN/g`
    }

    if(paresIndex.micro[4].val < 3){
        Saureus = `NOT DETECTED`
    }else{
        Saureus = `${paresIndex.micro[4].val} MPN/g`
    }
    
      setvaluesMicro({
          TPC:TPC,
          YeaseandMold:YeaseandMold,
          Ecoil:Ecoil,
          Coliform:Coliform,
          Saureus:Saureus,
          Salmonella:Salmonella
      })
      return JSON.parse(localStorage.getItem("JawIndexExport"))
    } else {
      return false
    }
  }, [])

  const handleUpdateStatusCoa = async () => {
    try{
      let update = UpdatexportCOA(token)
    }catch(err){
      console.log(err)
    }
  }

  const handleExportPDF = () => {
    let dataRow2 = [
      { values: valuesExportRow2.ProductionDate },
      { values: valuesExportRow2.DaliveryDate },
    ]
    let dataRow3 = [{ values: valuesExportRow3.ExpirationDate }, { values: "" }]

    let AnalysisRender = {
        DisTN:DisTN,
        DisProtein:DisProtein,
        DisPH:DisPH,
        DisSalt:DisSalt,
        DisHistamine:DisHistamine,
        DisSPG:DisSPG,
        DisAW:DisAW,
        DisTss:DisTss,
        DisAN:DisAN,
        DisAcidity:DisAcidity,
        DisViscosity:DisViscosity,
    }

    let MicroPDF = {
        MicroRender  ,
        MicroAnalysis
    }

    // console.log("AnalysisRender", AnalysisRender)

    originalFormCOA(
      values.logo,
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
      valuesMicro
    )
  }

  const handleChangeValueAnalysis = name => event => {
    setvaluesChem({ ...valuesChem, [name.val]: event.target.value })
    // console.log(valuesChem)
  }

  const handleChange = name => event => {
    setValuesExportRef({ ...valuesExportRef, [name]: event.target.value })
    // console.log(valuesExportRef)
  }

  const handleChangeDetailRow1 = name => event => {
    setValuesExportRow1({ ...valuesExportRow1, [name]: event.target.value })
    // console.log("valuesExportRow1 : ", valuesExportRow1)
  }

  const handleChangeDetailRow2PD = name => event => {
    setValuesExportRow2({ ...valuesExportRow2, [name]: event.target.value })
    // console.log("valuesExportRow2 : ", valuesExportRow2)
  }

  const handleChangeDetailRow3EX = name => event => {
    setValuesExportRow3({ ...valuesExportRow3, [name]: event.target.value })
    // console.log("valuesExportRow2 : ", valuesExportRow3)
  }

  const handleChangeDetailPNandPS = name => event => {
    setValuesExportPNandPS({
      ...valuesExportPNandPS,
      [name]: event.target.value,
    })
    // console.log("valuesExportPNandPS : ", valuesExportPNandPS)
  }

  const handleChangeTank = name => event => {
    setTankNumber({ ...TankNumber, [name]: event.target.value })
  }

  const handleChangeQuantity = name => event => {
    setValuesQuantity({ ...valuesQuantity, [name]: event.target.value })
  }

  const handleChangeProtein = name => event => {
    // setValuesProtein({ ...valuesProtein, [name]: event.target.value })
    setvaluesChem({...valuesChem, [name]: event.target.value})
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
          <h4 style={{ margin: 0 }}>RUNGROJ FISH SAUCE CO., LTD.</h4>
          <span>8/4 Samutjadee Rd. Paknum Mueang Rayong 21000 Thailand</span>
          <span>Tel: 66-38-940388 Fax: 66-38-940086</span>
          <span>Email: fishsauce@rungrojfishsauce.com</span>
          <h4 style={{ margin: 0 }}>CERTIFICATE OF ANALYSIS</h4>
        </Col>
        <Col
          sm="3"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></Col>
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
              <Input
                name="To"
                onChange={handleChangeDetailRow1("To")}
                value={valuesExportRow1.To}
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
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Date Code List: &nbsp;
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
                  name="DCL1"
                  onChange={handleChangeDetailRow1("DCL1")}
                  value={valuesExportRow1.DCL1}
                />
              </div>
            </Col>
          </Col>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
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
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            ></div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col sm="3">
              {/* <h5 style={{ margin: 0 }}>Date Code List: </h5> */}
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  name="DCL2"
                  onChange={handleChangeDetailRow1("DCL2")}
                  value={valuesExportRow1.DCL2}
                />
              </div>
            </Col>
          </Col>
        </div>
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
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            ></div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col sm="3">
              {/* <h5 style={{ margin: 0 }}>Date Code List: </h5> */}
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  name="DCL3"
                  onChange={handleChangeDetailRow1("DCL3")}
                  value={valuesExportRow1.DCL3}
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
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheckcolorTn"
                  checked={!DisProductDate}
                  onChange={() => {
                    setDisProductDate(!DisProductDate)
                  }}
                />
              </div>
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
                  name="ProductionDate"
                  onChange={handleChangeDetailRow2PD("ProductionDate")}
                  value={valuesExportRow2.ProductionDate}
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
              <span style={{ fontWeight: "bold" }}>Dalivery Date: &nbsp;</span>
            </Col>
            <Col sm="9">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Input
                  name="DaliveryDate"
                  onChange={handleChangeDetailRow2PD("DaliveryDate")}
                  value={valuesExportRow2.DaliveryDate}
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
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheckExpiration"
                  checked={!DisExpiration}
                  onChange={() => {
                    setDisExpiration(!DisExpiration)
                  }}
                />
              </div>
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
                  onChange={handleChangeDetailRow3EX("ExpirationDate")}
                  value={valuesExportRow3.ExpirationDate}
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
        {/* Product Name: pank size */}
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
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Product Name:
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
                  name="ProductName"
                  onChange={handleChangeDetailPNandPS("ProductName")}
                  value={valuesExportPNandPS.ProductName}
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
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Pack Size: &nbsp;
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
                  name="PackSize"
                  onChange={handleChangeDetailPNandPS("PackSize")}
                  value={valuesExportPNandPS.PackSize}
                />
              </div>
            </Col>
          </Col>
        </div>
        {/* Tank No */}
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
              <div className="form-check form-check-warning">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheckExpiration"
                  checked={!DisTank}
                  onChange={() => {
                    setDisTank(!DisTank)
                  }}
                />
              </div>
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
                  name="Tank"
                  onChange={handleChangeTank("Tank")}
                  value={TankNumber.Tank}
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
          ></Col>
        </div>
        {/* Quantity  */}
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
              <span style={{ margin: 0, fontWeight: "bold" }}>Quantity:</span>
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
                  name="Quantity"
                  onChange={handleChangeQuantity("Quantity")}
                  value={valuesQuantity.Quantity}
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
              <span style={{ margin: 0, fontWeight: "bold" }}>
                Test Date: &nbsp;
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
                  name="TestDate"
                  onChange={handleChangeQuantity("TestDate")}
                  value={valuesQuantity.TestDate}
                />
              </div>
            </Col>
          </Col>
        </div>
      </Row>
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
                // paddingLeft: "20px",
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
                // paddingLeft: "20px",
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
                      <Input value={valuesMicro.YeaseandMold}/>
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
                      <Input value={valuesMicro.Ecoil}/>
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
                      <Input value={valuesMicro.Coliform}/>
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
                      <Input value={valuesMicro.Saureus}/>
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
                      Salmonella spp.
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
                      <Input  value={valuesMicro.Salmonella}/>
                    </div>
                  </Col>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "20px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      //   alignItems: "center",
                    }}
                  >
                    <h5 style={{ margin: 0 }}>
                      <span style={{ margin: 0, fontWeight: "bold" }}>
                        Characteristics
                      </span>
                    </h5>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      //   alignItems: "center",
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
                        Clear light brown <br />
                        Thin liquid, fishy
                        <br />
                        flavor, First pressing,
                        <br />
                        Extre virgin
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
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          width: "100%",
                          display: "flex",
                          marginBottom: "10px",
                        }}
                      >
                        <Col sm="4">
                          <h5 style={{ margin: 0, fontWeight: "bold" }}>
                            Appearance
                          </h5>
                        </Col>
                        <Col sm="8">
                          <span style={{ margin: 0, fontWeight: "bold" }}>
                            No sedimentation
                          </span>
                        </Col>
                      </div>

                      <div
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          width: "100%",
                          display: "flex",
                          marginBottom: "10px",
                        }}
                      >
                        <Col sm="4">
                          <h5 style={{ margin: 0, fontWeight: "bold" }}>
                            Order
                          </h5>
                        </Col>
                        <Col sm="8">
                          <span style={{ margin: 0, fontWeight: "bold" }}>
                            Fresh fish sauce odor/aroma
                          </span>
                        </Col>
                      </div>

                      <div
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          width: "100%",
                          display: "flex",
                          marginBottom: "10px",
                        }}
                      >
                        <Col sm="4">
                          <h5 style={{ margin: 0, fontWeight: "bold" }}>
                            Taste
                          </h5>
                        </Col>
                        <Col sm="8">
                          <span style={{ margin: 0, fontWeight: "bold" }}>
                            Fresh fish sauce taste
                          </span>
                        </Col>
                      </div>

                      <div
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          width: "100%",
                          display: "flex",
                          marginBottom: "10px",
                        }}
                      >
                        <Col sm="4">
                          <h5 style={{ margin: 0, fontWeight: "bold" }}>
                            Color
                          </h5>
                        </Col>
                        <Col sm="8">
                          <span style={{ margin: 0, fontWeight: "bold" }}>
                            Clear rockfish brown thin liquid
                          </span>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ) : null}
      </Row>
    )
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <div style={{ width: "100%", height: "100%", background: "" }}>
          {headerForm()}
          <br />
          {RefForm()}
          {headDetail()}
          <br />
          {Analysis()}
          {/* <h1>FormBeforeExport</h1> */}
          <br></br>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Col sm="6"></Col>
            <Col sm="6" style={{ textAlign: "right", paddingRight: "0px" }}>
              <Button
                color="primary"
                size="lg"
                style={{ width: "40%" }}
                onClick={() => {
                  handleExportPDF()
                  handleUpdateStatusCoa()
                }}
              >
                Print COA
              </Button>
            </Col>
          </div>
          {/* <p>{JSON.stringify(valuesMicro)}</p> */}
        </div>
      </div>
    </React.Fragment>
  )
}

FormBeforeExport.propTypes = {
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

export default connect(mapStateToProps)(withRouter(FormBeforeExport))
