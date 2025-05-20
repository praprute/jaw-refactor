import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Button, Col, Row } from "reactstrap"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { isAuthenticated } from "pages/Authentication/api"
import Select from "react-select"
import {
  Addtestreport,
  readOrderById,
  readTestResultlasted,
  Recheck,
  submitVerifyTask,
  updateFG,
  UpdateStatusPassToCheck,
  updateTestDateOrderTask,
  WaitMicro,
} from "pages/Orders/api"
import Moment from "moment"
import SweetAlert from "react-bootstrap-sweetalert"

const TestSample = () => {
  const history = useHistory()
  const search = useLocation().search
  const idOrderQuery = new URLSearchParams(search).get("idOrders")
  const { user, token } = isAuthenticated()

  const [testResult, setTestResult] = useState([])
  const [detailOrder, setDetailOrder] = useState({})
  const [disable, setDisable] = useState({
    TN: false,
    Salt: false,
    Histamine: false,
    PH: false,
    Aw: false,
    Tss: false,
    SPG: false,
    AN: false,
    Acidity: false,
    Viscosity: false,
    SaltMeter: false,
    Color: false,
    Gluten: false,
  })
  const [resultChem, setresultChem] = useState([
    {
      keyInput: "Tn",
      int: false,
      key: "TN(g/L)",
      coa: false,
      val: null,
      temp: false,
    },
    {
      keyInput: "Salt",
      int: false,
      key: "%Salt(w/v)",
      coa: false,
      val: null,
      temp: false,
    },
    {
      keyInput: "Histamine",
      int: false,
      key: "Histamine(ppm)",
      coa: false,
      val: null,
      temp: false,
    },
    {
      keyInput: "PH",
      int: false,
      key: "PH",
      coa: false,
      val: null,
      temp: true,
    },
    {
      keyInput: "Aw",
      int: false,
      key: "Aw",
      coa: false,
      val: null,
      temp: true,
    },
    {
      keyInput: "Tss",
      int: false,
      key: "Tss(Brix)",
      coa: false,
      val: null,
      temp: true,
    },
    {
      keyInput: "SPG",
      int: false,
      key: "SPG",
      coa: false,
      val: null,
      temp: true,
    },
    {
      keyInput: "Gluten",
      int: false,
      key: "Gluten",
      coa: false,
      val: null,
      temp: true,
    },
  ])
  const [resultMicro, setresultMicro] = useState([
    { int: false, coa: false, val: "", key: "APC" },
    { int: false, coa: false, val: "", key: "Yeasts & Molds" },
    { int: false, coa: false, val: "", key: "E. coil" },
    { int: false, coa: false, val: "", key: "Coliform" },
    { int: false, coa: false, val: "", key: "S. aureus" },
  ])
  const [Microrender, setMicrorender] = useState(false)
  const [success_msg, setsuccess_msg] = useState(false)
  const [success_recheck, setsuccess_recheck] = useState(false)
  const [success_micro, setsuccess_micro] = useState(false)
  const [success_error, setsuccess_error] = useState(false)
  const [values, setValues] = useState({})
  const [dateOfTest, setDateOfTest] = useState(
    Moment(new Date()).format("DD/MM/YY HH:MM:SS")
  )
  const [oldValues, setOldValues] = useState({})
  const [description, setDescription] = useState("")
  const [optionTR, setOptionTR] = useState(false)
  const [dynamic_description, setdynamic_description] = useState("")
  const [dynamic_title, setdynamic_title] = useState("")
  const [selectFromList, setSelectFromList] = useState(null)
  const [selectSample, setSelectSample] = useState(null)

  const optionSample = [
    { label: "Liquid", value: "Liquid" },
    { label: "Solid", value: "Solid" },
    { label: "Semi-solid", value: "Semi-solid" },
  ]

  const optionCollected = [
    { label: "Lab staff", value: "Lab staff" },
    { label: "Lab leader", value: "Lab leader" },
    { label: "Technical leader", value: "Technical leader" },
  ]

  useEffect(() => {
    if (!!idOrderQuery && !!token) {
      ;(async () => {
        await fetchDetail(token, parseInt(idOrderQuery))
        await fetchTestresult(token, parseInt(idOrderQuery))
      })()
    }
  }, [idOrderQuery])

  useEffect(() => {
    if (!!testResult[0]) {
      console.log("testResult : ", testResult[0][8])
      setValues({
        idOrders: detailOrder.idOrders,
        PORD: detailOrder.PORD,
        BBE: detailOrder.BBE,
        PO: detailOrder.PO,
        ProductName: detailOrder.ProductName,
        Recheck: detailOrder.Recheck,
        Size: detailOrder.Size,
        Quantity: detailOrder.Quantity,
        idSpfChem: detailOrder.idPdSpecificChem,
        Tn: testResult[0][0].val,
        PH: testResult[0][3].val,
        Salt: testResult[0][1].val,
        Tss: testResult[0][5].val,
        Histamine: testResult[0][2].val,
        SPG: testResult[0][6].val,
        Aw: testResult[0][4].val,
        AN: testResult[0][7].val,
        Acidity: testResult[0][8].val,
        Viscosity: testResult[0][9].val,
        SaltMeter: testResult[0][10].val,
        idSpfMicro: 1,
        APC: testResult[1][0].val,
        Yeasts: testResult[1][1].val,
        EColi: testResult[1][2].val,
        Coliform: testResult[1][3].val,
        Saureus: testResult[1][4].val,
        TempPH: testResult[0][3].temp,
        TempAW: testResult[0][4].temp,
        TempTSS: testResult[0][5].temp,
        TempSPG: testResult[0][6].temp,
        Gluten: testResult[0][8].val,
      })
      setOldValues({
        Tn: testResult[0][0].val,
        PH: testResult[0][3].val,
        Salt: testResult[0][1].val,
        Tss: testResult[0][5].val,
        Histamine: testResult[0][2].val,
        SPG: testResult[0][6].val,
        Aw: testResult[0][4].val,
        AN: testResult[0][7].val,
        Acidity: testResult[0][8].val,
        Viscosity: testResult[0][9].val,
        SaltMeter: testResult[0][10].val,
        Gluten: testResult[0][8].val,
      })
      setresultChem(testResult[0])
    }
    if (detailOrder?.Micro === 1) {
      setMicrorender(true)
    }

    if (!!testResult[1]) {
      setresultMicro(testResult[1])
    }

    if (!!testResult[3] && !!testResult[3][0].Description) {
      setDescription(testResult[3][0].Description)
      const usingSplit = testResult[3][0].Description.split(",")
      usingSplit.forEach(data => {
        if (data == "TN") {
          setDisable({ ...disable, TN: true })
        }
      })
    }
  }, [testResult, detailOrder])

  const countingScore = async index => {
    try {
      let resulted = index.resulted
      let SumMeanScore = 0
      let SumScore = 0
      let ScoreChem = 0
      let ScoreMicro = 0
      let MeanMicro = 0
      let MeanChem = 0

      for (let i = 0; i < resulted[0].length; i++) {
        if (resulted[0][i].render == true) {
          MeanChem = MeanChem + 1
        } else {
          MeanChem = MeanChem
        }
      }

      if (index.message.MicroC == 1) {
        MeanMicro = 5
        for (let i = 0; i < resulted[1].length; i++) {
          if (resulted[1][i].coa == true) {
            ScoreMicro = ScoreMicro + 1
          } else {
            ScoreMicro = ScoreMicro
          }
        }
      }

      SumMeanScore = MeanChem + MeanMicro

      for (let i = 0; i < resulted[0].length; i++) {
        if (resulted[0][i].render == true) {
          if (resulted[0][i].coa == true) {
            ScoreChem = ScoreChem + 1
          }
        } else {
          ScoreChem = ScoreChem
        }
      }

      SumScore = ScoreMicro + ScoreChem

      const uid = {
        idOrders: index.message.idOrderTested,
      }

      if (index.message.MicroC == 1) {
        if (ScoreChem == MeanChem && SumMeanScore != SumScore) {
          try {
            await WaitMicro(token, uid)
          } catch (err) {
            console.log(err)
          }
        }
      }

      if (SumMeanScore == SumScore) {
        try {
          await UpdateStatusPassToCheck(token, uid, detailOrder.ProductName)
        } catch (err) {
          console.log(err)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTestresult = async (token, idOrders) => {
    try {
      const res = await readTestResultlasted(token, parseInt(idOrders))
      if (res?.success === "success") {
        setTestResult(res.resulted)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleRecheck = async () => {
    try {
      let indexRecheck = []
      resultChem.forEach(data => {
        if (data.render > 0 && data.coa == false) {
          indexRecheck.push(data.key)
        }
      })

      const index = {
        idOrders: values.idOrders,
        Recheck: values.Recheck,
        ProductName: values.ProductName,
        listRecheck: indexRecheck,
      }

      const res = await Recheck(token, index)

      if (res.success === "success") {
        setsuccess_recheck(true)
        setdynamic_title("Send Recheck Success")
        setdynamic_description("Order has been rechecking")
      } else {
        setsuccess_error(true)
        setdynamic_title("Send Recheck Error")
        setdynamic_description("กรุณาตรวจสอบข้อมูลและ idorder จาก url")
      }
    } catch (e) {
      console.log(e)
    }
  }
  const fetchDetail = async (token, idOrders) => {
    try {
      const res = await readOrderById(token, parseInt(idOrders))
      if (res?.success === "success") {
        setDetailOrder(res.message[0])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const handleChangeCollected = name => event => {
    setTestdate({ ...values, [name]: event.target.value })
  }

  const handleSelectCollected = e => {
    setSelectFromList(e)
  }

  const handleSelectSample = e => {
    setSelectSample(e)
  }

  const countDailyFinishgood = async () => {
    try {
      let Tn = 0
      let PH = 0
      let Salt = 0
      let Tss = 0
      let Histamine = 0
      let SPG = 0
      let Aw = 0
      let AN = 0
      let Acidity = 0
      let Viscosity = 0

      if (oldValues.AN == values.AN) {
        AN = AN
      } else {
        AN = AN + 1
      }

      if (oldValues.Acidity == values.Acidity) {
        Acidity = Acidity
      } else {
        Acidity = Acidity + 1
      }

      if (oldValues.Viscosity == values.Viscosity) {
        Viscosity = Viscosity
      } else {
        Viscosity = Viscosity + 1
      }

      if (oldValues.Tn == values.Tn) {
        Tn = Tn
      } else {
        Tn = Tn + 1
      }
      if (oldValues.PH == values.PH) {
        PH = PH
      } else {
        PH = PH + 1
      }
      if (oldValues.Salt == values.Salt) {
        Salt = Salt
      } else {
        Salt = Salt + 1
      }
      if (oldValues.Tss == values.Tss) {
        Tss = Tss
      } else {
        Tss = Tss + 1
      }
      if (oldValues.Histamine == values.Histamine) {
        Histamine = Histamine
      } else {
        Histamine = Histamine + 1
      }
      if (oldValues.SPG == values.SPG) {
        SPG = SPG
      } else {
        SPG = SPG + 1
      }
      if (oldValues.Aw == values.Aw) {
        Aw = Aw
      } else {
        Aw = Aw + 1
      }

      const index = {
        Tn: Tn,
        PH: PH,
        Salt: Salt,
        Tss: Tss,
        Histamine: Histamine,
        SPG: SPG,
        Aw: Aw,
        AN: AN,
        Acidity: Acidity,
        Viscosity: Viscosity,
      }
      await updateFG(token, index)
    } catch (e) {
      console.log(e)
    }
  }

  const handleTest = async () => {
    try {
      const index = {
        idOrders: parseInt(idOrderQuery),
        Recheck: parseInt(values.Recheck),
        idSpfChem: parseInt(values.idSpfChem),
        Tn: values.Tn,
        PH: values.PH,
        Salt: values.Salt,
        Tss: values.Tss,
        Histamine: values.Histamine,
        SPG: values.SPG,
        Aw: values.Aw,
        AN: values.AN,
        Acidity: values.Acidity,
        Viscosity: values.Viscosity,
        SaltMeter: values.SaltMeter,
        Color: values.Color,
        idSpfMicro: parseInt(values.idSpfMicro),
        APC: parseInt(values.APC),
        Yeasts: parseInt(values.Yeasts),
        EColi: parseInt(values.EColi),
        Coliform: parseInt(values.Coliform),
        Saureus: parseInt(values.Saureus),
        TempPH: values.TempPH,
        TempAW: values.TempAW,
        TempTSS: values.TempTSS,
        TempSPG: values.TempSPG,
        Gluten: values.Gluten,
        timeStamp: require("moment")().format("YYYY-MM-DD HH:mm:ss"), //new Date().toISOString().slice(0, 19).replace('T', ' ')
      }

      const payload = {
        testDate: dateOfTest,
        collected: selectFromList,
        idOrders: parseInt(idOrderQuery),
        sampleCharactor: selectSample,
      }

      const res = await Addtestreport(token, index)
      const response = await updateTestDateOrderTask(token, payload)

      if (res.success === "success" && res.success === "success") {
        await countDailyFinishgood()
        const response = await readTestResultlasted(
          token,
          parseInt(idOrderQuery)
        )
        if (response.success === "success") {
          await countingScore(response)
          setTestResult(response.resulted)
          setsuccess_msg(true)
          setdynamic_title("Tested Success")
          setdynamic_description("Order has been tested")
        } else {
          setsuccess_error(true)
          setdynamic_title(response.success)
          setdynamic_description("Server has break down!")
        }
      } else {
        setsuccess_error(true)
        setdynamic_title(response.success)
        setdynamic_description("กรุณาตรวจสอบข้อมูลและ idorder จาก url")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleApproveByQA = async () => {
    try {
      let payload = {
        idOrders: parseInt(idOrderQuery),
        verify: 1,
      }
      const response = await submitVerifyTask(token, payload)
      if (response.success === "success") {
        setsuccess_msg(true)
        setdynamic_title("Approved success")
        setdynamic_description("")
      } else {
        setsuccess_error(true)
        setdynamic_title(response.message)
        setdynamic_description("Server has break down!")
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleUnApproveByQA = async () => {
    try {
      let payload = {
        idOrders: parseInt(idOrderQuery),
        verify: 0,
      }
      const response = await submitVerifyTask(token, payload)
      if (response.success === "success") {
        setsuccess_msg(true)
        setdynamic_title("Reject success")
        setdynamic_description("")
      } else {
        setsuccess_error(true)
        setdynamic_title(response.message)
        setdynamic_description("Server has break down!")
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div style={{ padding: "120px 70px", height: "100%", width: "100%" }}>
      <Row>
        <Col
          md="6"
          xs="12"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h5 style={{ margin: "0" }}>LOT</h5>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span>
                PORD: {Moment(detailOrder.PORD).format("DD/MM/YYYY")}
                <br />
                BBE : {Moment(detailOrder.PORD).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h5 style={{ margin: "0" }}>Order Numder</h5>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span>{detailOrder.PO}</span>
            </div>
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h5 style={{ margin: "0" }}>Product Name</h5>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span>{detailOrder.ProductName}</span>
            </div>
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h5 style={{ margin: "0" }}>Pack Size</h5>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span>{detailOrder.Size}</span>
            </div>
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h5 style={{ margin: "0" }}>Quantity</h5>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span>{detailOrder.Quantity}</span>
            </div>
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h5 style={{ margin: "0" }}>Specific</h5>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span>{detailOrder.name}</span>
            </div>
          </div>
        </Col>
      </Row>
      {description && (
        <Row style={{ marginBottom: "10px", padding: "10px 0px" }}>
          <Col
            xs="12"
            style={{
              border: "solid 1px #989a9b",
              borderRadius: "10px",
              height: "100%",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "10px",
            }}
          >
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <span
                className="badge bg-info font-size-18"
                style={{ marginRight: "5px" }}
              >
                Reprocess Description :
              </span>
              <span className="badge bg-light font-size-18">
                {`${description}`}
              </span>
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col
          xs="12"
          style={{
            border: "solid 1px #989a9b",
            borderRadius: "10px",
            height: "100%",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {" "}
          <h5 style={{ borderBottom: "solid 1px #989a9b" }}>
            Chemical analysis
          </h5>
          <Row style={{ display: "flex", width: "100%" }}>
            <Col xs="3">
              <div>
                <Col xs="12">
                  <h6> </h6>
                </Col>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>Result</h6>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <h6>Temp C &deg; </h6>
              </div>
            </Col>
            <Col xs="3" style={{ display: "flex" }}>
              <Col xs="6">
                <h6>Int. spec</h6>
              </Col>

              <Col xs="6">
                <h6>COA spec</h6>
              </Col>
            </Col>
          </Row>
          {resultChem.map((index, key) => {
            {
              if (index.render > 0) {
                return (
                  <Row
                    key={key}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Col xs="3">
                      <div>
                        <Col
                          xs="12"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            paddingLeft: "30%",
                          }}
                        >
                          <h6 style={{ margin: "0" }}>{index.key}</h6>
                        </Col>
                      </div>
                    </Col>
                    <Col xs="3">
                      <Row className="mb-1">
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="number"
                            name={index.keyInput}
                            onChange={handleChange(`${index.keyInput}`)}
                            // value={index.val}
                            placeholder={index.val}
                          />
                        </div>
                      </Row>
                    </Col>
                    <Col xs="3">
                      {index.tkTemp ? (
                        // <div>
                        // <h6>{index.temp}</h6>
                        // </div>
                        <Row className="mb-1">
                          <div className="col-md-10">
                            <input
                              className="form-control"
                              type="number"
                              name={index.keyTemp}
                              onChange={handleChange(`${index.keyTemp}`)}
                              // value={index.temp}
                              placeholder={index.temp}
                            />
                          </div>
                        </Row>
                      ) : null}
                    </Col>
                    <Col xs="3" style={{ display: "flex" }}>
                      <Col xs="6">
                        {parseInt(user.role) !==
                          parseInt(process.env.REACT_APP_LABHIDERESULT) && (
                          <>
                            {index.int ? (
                              <div className="badge bg-success font-size-13">
                                <span>PASS</span>
                              </div>
                            ) : (
                              <div className="badge bg-danger font-size-13">
                                <span>FAIL</span>
                              </div>
                            )}
                          </>
                        )}
                        {/* {index.int ? (
                          <div className="badge bg-success font-size-13">
                            <span>PASS</span>
                          </div>
                        ) : (
                          <div className="badge bg-danger font-size-13">
                            <span>FAIL</span>
                          </div>
                        )} */}
                      </Col>

                      <Col xs="6">
                        {parseInt(user.role) !==
                          parseInt(process.env.REACT_APP_LABHIDERESULT) && (
                          <>
                            {index.coa ? (
                              <div className="badge bg-success font-size-13">
                                <span>PASS</span>
                              </div>
                            ) : (
                              <div className="badge bg-danger font-size-13">
                                <span>FAIL</span>
                              </div>
                            )}
                          </>
                        )}
                        {/* {index.coa ? (
                          <div className="badge bg-success font-size-13">
                            <span>PASS</span>
                          </div>
                        ) : (
                          <div className="badge bg-danger font-size-13">
                            <span>FAIL</span>
                          </div>
                        )} */}
                      </Col>
                    </Col>
                  </Row>
                )
              }
              return null
            }
          })}
        </Col>
      </Row>
      <hr />
      {Microrender && (
        <Row>
          <Col
            xs="12"
            style={{
              border: "solid 1px #989a9b",
              borderRadius: "10px",
              height: "100%",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <h5 style={{ borderBottom: "solid 1px #989a9b" }}>
              Microbiological analysis
            </h5>
            <Row style={{ display: "flex", width: "100%" }}>
              <Col xs="3">
                <div>
                  <Col xs="12">
                    <h6> </h6>
                  </Col>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <h6>Result</h6>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <h6>Temp C &deg; </h6>
                </div>
              </Col>
              <Col xs="3" style={{ display: "flex" }}>
                <Col xs="6">
                  <h6>Int. spec</h6>
                </Col>

                <Col xs="6">
                  <h6>COA spec</h6>
                </Col>
              </Col>
            </Row>
            {resultMicro.map((index, key) => (
              <Row key={key} style={{ display: "flex", width: "100%" }}>
                <Col xs="3">
                  <div>
                    <Col
                      xs="12"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: "30%",
                      }}
                    >
                      <h6>{index.key}</h6>
                      {/* <div>{JSON.stringify(index)}</div> */}
                    </Col>
                  </div>
                </Col>
                <Col xs="3">
                  <Row className="mb-1">
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="number"
                        name={index.keyInput}
                        onChange={handleChange(`${index.keyInput}`)}
                        // value={index.val}
                        placeholder={index.val}
                      />
                    </div>
                  </Row>
                </Col>
                <Col xs="3">
                  <div>
                    <h6> </h6>
                  </div>
                </Col>
                <Col xs="3" style={{ display: "flex" }}>
                  <Col xs="6">
                    {parseInt(user.role) !==
                      parseInt(process.env.REACT_APP_LABHIDERESULT) && (
                      <>
                        {index.int ? (
                          <div className="badge bg-success font-size-13">
                            <span>PASS</span>
                          </div>
                        ) : (
                          <div className="badge bg-danger font-size-13">
                            <span>FAIL</span>
                          </div>
                        )}
                      </>
                    )}
                    {/* {index.int ? (
                      <div className="badge bg-success font-size-13">
                        <span>PASS</span>
                      </div>
                    ) : (
                      <div className="badge bg-danger font-size-13">
                        <span>FAIL</span>
                      </div>
                    )} */}
                  </Col>

                  <Col xs="6">
                    {parseInt(user.role) !==
                      parseInt(process.env.REACT_APP_LABHIDERESULT) && (
                      <>
                        {index.coa ? (
                          <div className="badge bg-success font-size-13">
                            <span>PASS</span>
                          </div>
                        ) : (
                          <div className="badge bg-danger font-size-13">
                            <span>FAIL</span>
                          </div>
                        )}
                      </>
                    )}
                    {/* {index.coa ? (
                      <div className="badge bg-success font-size-13">
                        <span>PASS</span>
                      </div>
                    ) : (
                      <div className="badge bg-danger font-size-13">
                        <span>FAIL</span>
                      </div>
                    )} */}
                  </Col>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      )}
      <br />
      <span>Sample character</span>
      <Select
        value={optionSample.filter(function (option) {
          return option.value === selectSample
        })}
        name="selectSample"
        onChange={e => {
          handleSelectSample(e.value)
        }}
        options={optionSample}
      />
      <br />
      <span>Test Date</span>
      <input
        className="form-control"
        type="text"
        name="testDate"
        onChange={handleChangeCollected(`testDate`)}
        value={dateOfTest}
        placeholder="test date"
        disabled
      />
      <br />
      <span>Collected by</span>
      <Select
        value={optionCollected.filter(function (option) {
          return option.value === selectFromList
        })}
        name="CollectedBy"
        onChange={e => {
          handleSelectCollected(e.value)
        }}
        options={optionCollected}
      />
      <br />
      {optionTR ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Col
              xs="12"
              md="12"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Button
                color="warning"
                className="w-lg"
                onClick={event => {
                  handleRecheck(event)
                }}
              >
                Recheck
              </Button>
              &nbsp;&nbsp; &nbsp;&nbsp;
            </Col>
          </Row>
          <br />
        </div>
      ) : (
        <>
          {parseInt(user.role) === 2 && (
            <div>
              <Button
                color="primary"
                className="w-lg"
                onClick={event => {
                  handleTest(event)
                }}
              >
                TEST
              </Button>
            </div>
          )}
          <br />
        </>
      )}
      <h5>Test Result Approved</h5>
      <span>
        Approved :{" "}
        {detailOrder.verify === 0 ? <span>FAIL</span> : <span>PASS</span>}
      </span>
      <br />
      <br />
      <Button color="primary" className="w-lg" onClick={handleApproveByQA}>
        verify
      </Button>{" "}
      <Button color="danger" className="w-lg" onClick={handleUnApproveByQA}>
        reject
      </Button>
      {success_recheck && (
        <SweetAlert
          title={dynamic_title}
          success
          confirmBtnBsStyle="success"
          onConfirm={() => {
            setsuccess_recheck(false)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      )}
      {success_micro && (
        <SweetAlert
          title={dynamic_title}
          success
          confirmBtnBsStyle="success"
          onConfirm={() => {
            setsuccess_micro(false)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      )}
      {success_msg && (
        <SweetAlert
          title={dynamic_title}
          success
          confirmBtnBsStyle="success"
          onConfirm={() => {
            setsuccess_msg(false)
            setOptionTR(true)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      )}
      {success_error && (
        <SweetAlert
          title={dynamic_title}
          danger
          confirmBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess_error(false)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      )}
    </div>
  )
}

export default withRouter(withTranslation()(TestSample))
