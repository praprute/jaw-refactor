import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalFooter,
} from "reactstrap"
import { Link } from "react-router-dom"

import { API } from "./../../configAPI"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import Moment from "moment"
//get api
import {
  getAllOrder,
  readOrderById,
  exportCOA,
  UpdatexportCOA,
  UpdatexportPASS,
} from "./api"
import { map, result } from "lodash"
import { orders } from "common/data"
import { isAuthenticated } from "./../Authentication/api"

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
// import logo from './../../assets/images/Logo-RFS.jpg'
//PDF
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
// import "./ModalFullScreen.css"

pdfMake.vfs = pdfFonts.pdfMake.vfs

const ModalSelectCOA = props => {
  const { user, token } = isAuthenticated()
  const { isOpenCOA, toggleCOA } = props
  const { orders, spc, tr, bio } = props
  const [detailById, setdetailById] = useState([
    {
      idOrderTested: "",
      BBE: "",
      PORD: "",
      ProductName: "",
      name: "",
      Size: "",
      Quantity: "",
    },
  ])
  const [normal, setNormal] = useState(true)
  const [rush, setRush] = useState(false)
  const [urgent, setUrgent] = useState(false)
  const [values, setValues] = useState({})
  const [imgbs64, setimgbs64] = useState(null)
  const [startExport, setStartExport] = useState(false)
  const [valueCustumer, setvalueCustumer] = useState({
    DeliverlyDate: "",
    custumerName: "",
  })
  const [timetotest, setTimetotest] = useState("")
  const [DateofReport, setDateofReport] = useState("")
  // const [custumerName,  setCustumerName  ] = useState("")
  const [DeliverlyDate, setDeliverlyDate] = useState("")
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
  ])
  const [tpd, settpd] = useState("2")
  const handleChangeCustumer = name => event => {
    setvalueCustumer({ ...valueCustumer, [name]: event.target.value })
    // console.log('valueCustumer : ',valueCustumer)
  }

  const [test, setTest] = useState([
    {
      text: `Date of Report : ${Moment(new Date()).format("DD/MM/YYYY")}`,
      style: "HeaderDetail",
      border: [true, true, false, false],
    }, //ซ้าย บน ขวา ล่าง
    {
      text: `Lot : PROD:${Moment(values.PORD).format("DD/MM/YYYY")} \n ${
        ".\t\tBBE:" + Moment(values.BBE).format("DD/MM/YYYY")
      }`,
      style: "HeaderDetail",
      border: [false, true, true, false],
    },
  ])

  const handleExport = event => {
    event.preventDefault()
    var index = {
      idOrders: values.idOrders,
    }
    UpdatexportCOA(token, index).then(data => {
      if (data) {
        exportCOA(token).then(data => {
          if (data) {
            // console.log(data)
            setimgbs64(data.message)
          }
        })
      }
    })
  }

  useEffect(() => {
    exportCOA(token).then(data => {
      if (data) {
        // console.log(data)
        setimgbs64(data.message)
      }
    })
  }, [])

  const handleupdatePass = () => {
    var index = {
      idOrders: values.idOrders,
    }
    UpdatexportPASS(token, index).then(data => {
      if (data) {
      }
    })
  }

  useEffect(() => {
    if (imgbs64 != null) {
      setStartExport(true)
    }
  }, [imgbs64])

  useEffect(() => {
    var current_datetime = new Date()
    let formatted_date_now = Moment(current_datetime).format("DD/MM/YYYY")
    setDateofReport(formatted_date_now)
  }, [tr])

  useEffect(() => {
    // console.log('toggleCOA' , props)
    setdetailById(orders)
    // console.log('orders Modal COA : ', orders)
  }, [orders])

  useEffect(() => {
    if (tr[0] != undefined) {
      // console.log('test tr[0] COA : ', tr)
      setValues({
        idOrders: detailById.idOrders,
        PORD: detailById.PORD,
        BBE: detailById.BBE,
        PO: detailById.PO,
        ProductName: detailById.ProductName,
        Recheck: detailById.Recheck,
        Size: detailById.Size,
        Quantity: detailById.Quantity,
        idSpfChem: detailById.idPdSpecificChem,
        Tn: tr[0][0].val,
        PH: tr[0][3].val,
        Salt: tr[0][1].val,
        Tss: tr[0][5].val,
        Histamine: tr[0][2].val,
        SPG: tr[0][6].val,
        Aw: tr[0][4].val,
        idSpfMicro: 1,
        APC: tr[1][0].val,
        Yeasts: tr[1][1].val,
        EColi: tr[1][2].val,
        Coliform: tr[1][3].val,
        Saureus: tr[1][4].val,
        TempPH: tr[0][3].temp,
        TempAW: tr[0][4].temp,
        TempTSS: tr[0][5].temp,
        TempSPG: tr[0][6].temp,
        TimeToTest: tr[2].TimeTest,
      })
    } else {
      // console.log('test tr[0] COA : ', tr)
      setValues({
        idOrders: detailById.idOrders,
        PORD: detailById.PORD,
        BBE: detailById.BBE,
        PO: detailById.PO,
        ProductName: detailById.ProductName,
        Recheck: detailById.Recheck,
        Size: detailById.Size,
        Quantity: detailById.Quantity,
        idSpfChem: detailById.idPdSpecificChem,
        Tn: null,
        PH: null,
        Salt: null,
        Tss: null,
        Histamine: null,
        SPG: null,
        Aw: null,
        idSpfMicro: 1,
        APC: null,
        Yeasts: null,
        EColi: null,
        Coliform: null,
        Saureus: null,
        TempPH: null,
        TempAW: null,
        TempTSS: null,
        TempSPG: null,
        TimeToTest: null,
      })
    }
  }, [tr])

  function printPDF() {
    setStartExport(false)
    // console.log('test :',test)
    let index = []
    for (let i = 0; i < test.length; i++) {
      index.push(test[i])
    }
    // console.log('test pdf :',index)
    var docDefinition = {
     
      content: [
        {
          alignment: "justify",
          columns: [
            {
              image: `data:image/png;base64,${imgbs64}`,
              width: 100,
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: "RUNGROJ FISH SAUCE CO., LTD.",
                      style: "invoiceTitle",
                      width: "*",
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text:
                        "8/4 Samutjadee Rd. Paknum Muang Rayong 21000 Thailand",
                      style: "invoiceTitleHeaderDetail",
                      width: "*",
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: "Tel: 66-38-940388 Fax: 66-38-940086",
                      style: "invoiceTitleHeaderDetail",
                      width: "*",
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: "Email: fishsauce@rungrojfishsauce.com",
                      style: "invoiceTitleHeaderDetail",
                      width: "*",
                    },
                  ],
                },
              ],
            },
            {
              text: "FM-LA-23-32",
              style: "codeDoc",
              width: 100,
            },
          ],
        },
        {
          text: "CERTIFICATE OF ANALYSIS",
          style: "MiddleHead",
          width: "*",
        },
        "\n\n",
        {
          text: `TO. ${valueCustumer.custumerName}`,
          style: "NameLeft",
          width: "*",
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              ["ddd", "ttt"],
              // index,
              [
                {
                  text: `Order Number : ${"PO" + values.PO}`,
                  style: "HeaderDetail",
                  border: [true, false, false, false],
                },
                {
                  text: `Deliverly Date : ${Moment(
                    valueCustumer.DeliverlyDate
                  ).format("DD/MM/YYYY")}`,
                  style: "HeaderDetail",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: `Product Name : ${values.ProductName}`,
                  style: "HeaderDetail",
                  border: [true, false, false, false],
                },
                {
                  text: `Pack Size : ${values.Size}`,
                  style: "HeaderDetail",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: `Quantity : ${values.Quantity} Cartons`,
                  style: "HeaderDetail",
                  border: [true, false, false, true],
                },
                {
                  text: `Test Date : ${Moment(values.TimeToTest).format(
                    "DD/MM/YYYY"
                  )}`,
                  style: "HeaderDetail",
                  border: [false, false, true, true],
                },
              ],
            ],
          },
        },
        "\n",
        {
          table: {
            widths: ["*", "*", "*", "*"],
            body: [
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "             ",
                          style: "HeaderValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, true, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Product Specification",
                          style: "HeaderValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, true, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Analysis Result",
                          style: "HeaderValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, true, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Method",
                          style: "HeaderValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, true, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Physical & Chemical",
                          style: "HeaderValues",
                          width: "*",
                          decoration: "underline",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "",
                          style: "indexValue",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "",
                          style: "indexValue",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "",
                          style: "indexValue",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Total Nitrogen, g/L",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${"\u2265" + detailById.TnMain}`, //≥
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${values.Tn}`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "TN Auto-analyzer",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "PH/ \u00B0C",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${
                            detailById.PHCOAMin + "-" + detailById.PHCOAMax
                          }`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${
                            values.PH + "/" + values.TempPH + "\u00B0C"
                          }`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "PH meter",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "% NaCl, w/v",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${
                            detailById.SaltCOAMin + "-" + detailById.SaltCOAMax
                          }`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${values.Salt}`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Volumetric Method",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Tss(Brix)",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${
                            detailById.TSSMin + "-" + detailById.TSSMax
                          }`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${values.Tss}`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Refractometer",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Water Activity/ \u00B0C",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${"\u2264" + detailById.AWMax}`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${
                            values.Aw + "/" + values.TempAW + "\u00B0C"
                          }`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Water Activity analyzer",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Histamine, ppm",
                          style: "HeaderindexValues",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [true, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${"\u2264" + detailById.HistamineMax}`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: `${values.Histamine}`,
                          style: "valuess",
                          width: "*",
                        },
                      ],
                    },
                  ],
                  border: [false, false, false, false],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "Enzymatic Biosensor Method \n (AOAC 051604)",
                          style: "HeaderindexValues",
                          width: "*",
                          margin: [0, 0, 0, 10],
                        },
                      ],
                    },
                  ],
                  border: [false, false, true, false],
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: [80, "*"],
            body: [
              [
                {
                  text: `Sensory`,
                  style: "HeaderDetail",
                  border: [true, false, false, false],
                  decoration: "underline",
                }, //ซ้าย บน ขวา ล่าง
                {
                  text: ` `,
                  style: "HeaderDetail",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: `Appearance`,
                  style: "HeaderFoot",
                  border: [true, false, false, false],
                },
                {
                  text: `:Clear light brown thin liquid, fishy flavor, first pressing extra virgin`,
                  style: "HeaderFoot",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: ``,
                  style: "HeaderFoot",
                  border: [true, false, false, false],
                },
                {
                  text: `No sedimentation`,
                  style: "HeaderFoot",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: `Odor`,
                  style: "HeaderFoot",
                  border: [true, false, false, false],
                },
                {
                  text: `:Fresh fish sauce odor`,
                  style: "HeaderFoot",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: `Taste`,
                  style: "HeaderFoot",
                  border: [true, false, false, false],
                },
                {
                  text: `:Fresh fish sauce taste`,
                  style: "HeaderFoot",
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: `Color`,
                  style: "HeaderFoot",
                  border: [true, false, false, true],
                },
                {
                  text: `:Clear rockfish brown thin liquid`,
                  style: "HeaderFoot",
                  border: [false, false, true, true],
                },
              ],
            ],
          },
        },
        // Line breaks
        "\n\n\n\n\n\n",
        {
          alignment: "justify",
          columns: [
            {
              text: "Reported By ......................................",
              style: "invoiceTitleHeaderDetail",
              width: "*",
            },
            {
              text: "Approve By ......................................",
              style: "invoiceTitleHeaderDetail",
              width: "*",
            },
          ],
        },

        {
          alignment: "justify",
          columns: [
            {
              text: "DCC",
              style: "invoiceTitleHeaderDetail",
              width: "*",
              margin: [40, 0, 0, 0],
            },
            {
              text: "QMR",
              style: "invoiceTitleHeaderDetail",
              width: "*",
              margin: [40, 0, 0, 0],
            },
          ],
        },
        // TOTAL
        // Signature
      ],
      styles: {
        // Document Header
        documentHeaderLeft: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "left",
        },
        documentHeaderCenter: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "center",
        },
        documentHeaderRight: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "right",
        },
        // Document Footer
        documentFooterLeft: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "left",
        },
        documentFooterCenter: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "center",
        },
        documentFooterRight: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "right",
        },
        // Invoice Title
        invoiceTitle: {
          fontSize: 15,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 0],
        },
        invoiceTitleHeaderDetail: {
          fontSize: 10,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 0],
        },
        HeaderDetail: {
          fontSize: 11,
          bold: true,
          alignment: "left",
          margin: [0, 2, 0, 2], //ซ้าย บน ขวา ล่าง
        },
        HeaderFoot: {
          fontSize: 11,
          bold: true,
          alignment: "left",
          margin: [0, 0, 0, 0], //ซ้าย บน ขวา ล่าง
        },
        HeaderValues: {
          fontSize: 11,
          bold: true,
          alignment: "left",
          margin: [0, 5, 0, 5], //ซ้าย บน ขวา ล่าง
        },
        HeaderindexValues: {
          fontSize: 10,
          bold: true,
          alignment: "left",
          margin: [0, 0, 0, 5], //ซ้าย บน ขวา ล่าง
        },
        indexValue: {
          fontSize: 9,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 5], //ซ้าย บน ขวา ล่าง
        },
        valuess: {
          fontSize: 10,
          bold: true,
          alignment: "left",
          margin: [30, 0, 0, 5], //ซ้าย บน ขวา ล่าง
        },
        codeDoc: {
          fontSize: 10,
          bold: true,
          alignment: "center",
          margin: [0, 5, 0, 0], //ซ้าย บน ขวา ล่าง
        },
        MiddleHead: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 15, 0, 0],
        },
        NameLeft: {
          fontSize: 12,
          bold: true,
          alignment: "left",
          margin: [10, 5, 0, 5],
        },
        // Invoice Details
        invoiceSubTitle: {
          fontSize: 12,
          alignment: "right",
        },
        invoiceSubValue: {
          fontSize: 12,
          alignment: "right",
        },
        // Billing Headers
        invoiceBillingTitle: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [0, 20, 0, 5],
        },
        // Billing Details
        invoiceBillingDetails: {
          alignment: "left",
        },
        invoiceBillingAddressTitle: {
          margin: [0, 7, 0, 3],
          bold: true,
        },
        invoiceBillingAddress: {},
        // Items Header
        itemsHeader: {
          margin: [0, 5, 0, 5],
          bold: true,
        },
        // Item Title
        itemTitle: {
          bold: true,
        },
        itemSubTitle: {
          italics: true,
          fontSize: 11,
        },
        itemNumber: {
          margin: [0, 5, 0, 5],
          alignment: "center",
        },
        itemTotal: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "center",
        },

        // Items Footer (Subtotal, Total, Tax, etc)
        itemsFooterSubTitle: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "right",
        },
        itemsFooterSubValue: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "center",
        },
        itemsFooterTotalTitle: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "right",
        },
        itemsFooterTotalValue: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "center",
        },
        signaturePlaceholder: {
          margin: [0, 70, 0, 0],
        },
        signatureName: {
          bold: true,
          alignment: "center",
        },
        signatureJobTitle: {
          italics: true,
          fontSize: 10,
          alignment: "center",
        },
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
        center: {
          alignment: "center",
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    }
    pdfMake.createPdf(docDefinition).open({}, window.frames["printPdf"])
  }

  return (
    <Modal
      dialogClassName="custom-modal"
      bsClass="my-modal"
      isOpen={isOpenCOA}
      toggle={toggleCOA}
      centered={true}
      size="lg"
    >
      <div className="modal-header">
        <h3 className="modal-title mt-0">SELECR FORM COA</h3>
        <button
          type="button"
          onClick={toggleCOA}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div
          className="col-md-12"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckcolor1"
              checked={normal}
              onChange={() => {
                setNormal(!normal)
                setRush(false)
                setUrgent(false)
              }}
            />

            <label className="form-check-label" htmlFor="customCheckcolor1">
              Default
            </label>
          </div>
        </div>

        <div
          className="col-md-12"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div className="form-check form-check-warning">
            <input
              disabled
              type="checkbox"
              className="form-check-input"
              id="customCheckcolor2"
              checked={rush}
              onChange={() => {
                setRush(!rush)
                setNormal(false)
                setUrgent(false)
              }}
            />

            <label className="form-check-label" htmlFor="customCheckcolor2">
              Viet Houng
            </label>
          </div>
        </div>

        <div
          className="col-md-12"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div className="form-check form-check-danger">
            <input
              disabled
              type="checkbox"
              className="form-check-input"
              id="customCheckcolor3"
              checked={urgent}
              onChange={() => {
                setUrgent(!urgent)
                setNormal(false)
                setRush(false)
              }}
            />

            <label className="form-check-label" htmlFor="customCheckcolor3">
              urgent
            </label>
          </div>
        </div>
        <Row
          className="mb-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label
            style={{ display: "flex", justifyContent: "center" }}
            htmlFor="example-text-input"
            className="col-md-4 col-form-label"
          >
            Customer Name
          </label>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              name="custumerName"
              onChange={handleChangeCustumer("custumerName")}
              value={valueCustumer.custumerName}
              //   placeholder="PORD:00/00/0000"
            />
          </div>
        </Row>
        <Row
          className="mb-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label
            style={{ display: "flex", justifyContent: "center" }}
            htmlFor="example-text-input"
            className="col-md-4 col-form-label"
          >
            Deliverly Date
          </label>
          <div className="col-md-8">
            <input
              className="form-control"
              type="date"
              // defaultValue="BBE:00/00/0000"
              name="DeliverlyDate"
              onChange={handleChangeCustumer("DeliverlyDate")}
              value={valueCustumer.DeliverlyDate}
              // placeholder="00/00/0000"
            />
          </div>
        </Row>
        <Row
          className="mb-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`data:image/png;base64,${imgbs64}`}
            style={{ maxWidth: 150, maxHeight: 100 }}
          />
        </Row>
        {/* custumerName,  setCustumerName 
                            DeliverlyDate, setDeliverlyDate */}
        {/* {JSON.stringify(values)} */}
      </div>
      <ModalFooter>
        {startExport ? (
          <Button
            color="primary"
            onClick={() => {
              printPDF()
              handleupdatePass()
              //  handleExport(event)
              //  setDeliverlyDate(Moment(valueCustumer.DeliverlyDate).format('DD/MM/YYYY'))
            }}
          >
            EXPORT
          </Button>
        ) : (
          <Button
            color="primary"
            onClick={event => {
              // printPDF()
              handleExport(event)
              //  setDeliverlyDate(Moment(valueCustumer.DeliverlyDate).format('DD/MM/YYYY'))
            }}
          >
            LOAD LOGO
          </Button>
        )}

        <Button color="secondary" onClick={toggleCOA}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

ModalSelectCOA.propTypes = {
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

export default connect(mapStateToProps)(withRouter(ModalSelectCOA))
