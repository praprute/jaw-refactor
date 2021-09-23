import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import pdfFonts from "../../../assets/custom-fonts"
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
export const dailyReport = (
  logo,
  ref,
  row1,
  row2PDandDD,
  row3EXP,
  PnAndPS,
  tankNo,
  QuantityAndTestDate,
  AnalysisRender,
  spcChem,
  valuesChem,
  MicroRender,
  valuesMicro,
  selectedGroupNameTo,
  ApproveValue,
  ReportValue,
  salmon,
  DisProductDate,
  DisExpiration,
  DisTank,
  shelfLife
) => {
  let DetailOrderRow1 = []
  let DetailOrderRow2 = []
  let DetailOrderRow3 = []
  let DetailOrderRow4 = []
  let DetailOrderRow5 = []
  let DetailOrderRow6 = []
  let tankNumber = []
  let dataAnaly = [
    [
      {
        text: ``,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, true, false, false],
      },
      {
        text: `Product Specification`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, true, false, false],
      },
      {
        text: `Analysis Results`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, true, true, false],
      },
    ],
  ]

  let MicroComponent = []

  //   console.log("prop data", AnalysisRender, spcChem, valuesChem)
  //   console.log("/MicroRender ", MicroRender)



  for (let i = 0; i < row2PDandDD.length; i++) {
    let index = {
      text: ``,
      style: " ",
      alignment: "left",
      border: [false, false, false, false],
    }
    if (i == 0 && row2PDandDD[i].values !== "" && DisProductDate == false) {
      index = {
        text: `Date of Report: ${row2PDandDD[i].values}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [true, false, false, false],
      }
      DetailOrderRow2.push(index)
    } else if (i == 1 && row2PDandDD[i].values !== "") {
      index = {
        text: `Dalivery Date: ${row2PDandDD[i].values}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [false, false, true, false],
      }
      DetailOrderRow2.push(index)
    } else {
      index = {
        text: ``,
        style: " ",
        alignment: "left",
        border: [true, false, false, false],
      }
      DetailOrderRow2.push(index)
    }
  }

  for (let i = 0; i < row3EXP.length; i++) {
    let index = {
      text: ``,
      style: " ",
      alignment: "left",
      border: [false, false, false, false],
    }
    if (i == 0 && row3EXP[i].values !== "") {
      if (DisExpiration == false) {
        index = {
          text: `Expiration date: ${row3EXP[i].values}`,
          style: "RefBoxValue",
          alignment: "left",
          border: [true, false, false, false],
        }
      } else {
        index = {
          text: ``,
          style: "RefBoxValue",
          alignment: "left",
          border: [true, false, false, false],
        }
      }

      DetailOrderRow3.push(index)
    } else if (i == 0 && row3EXP[i].values == "") {
      index = {
        text: ``,
        style: " ",
        alignment: "left",
        border: [true, false, false, false],
        margin: [0, -22, 0, 0],
      }
      DetailOrderRow3.push(index)
    }

    if (i == 1) {
      index = {
        text: ` `,
        style: "RefBoxValue",
        alignment: "left",
        border: [false, false, true, false],
        margin: [0, -22, 0, 0],
      }
      DetailOrderRow3.push(index)
    }
  }
  //   console.log("DetailOrderRow2 :", DetailOrderRow2)
  //   console.log("dataAnalysis :", dataAnaly)
  var docDefinition = {
    pageMargins: [35, 20, 15, 20],
    content: [
      {
        alignment: "justify",
        columns: [
          {
            image: `data:image/png;base64,${logo}`,
            width: 60,
          },
          {
            text: "บันทึกผลวิเคราะห์ตัวอย่างทางเคมี",
            style: "invoiceTitle",
            width: "*",
          },
          //   {
          //     stack: [
          //       {
          //         columns: [
          //           {
          //             text: "RUNGROJ FISH SAUCE CO., LTD.",
          //             style: "invoiceTitle",
          //             width: "*",
          //           },
          //         ],
          //       },
          {
            text: "FM-LA-23-03 rev.00",
            // style: "codeDoc",
            fontSize: "8",
            bold: true,
            width: 60,
          },
        ],
      },
      {
        margin: [0, 5, 0, 0],
        columns: [{}, {}, {}],
      },

      {
        margin: [0, 0, 0, 0],
        table: {
          // alignment: "left",
          widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
          body: [
            [
              {
                text: `TO. ${selectedGroupNameTo}`,
                style: "RefBoxValue",
                alignment: "left",
                font: "Sarabun",
                border: [true, true, false, false],
              },
              {
                text: `LOT: ${row1.DCL1}`,
                style: "RefBoxValue",
                alignment: "left",
                border: [false, true, true, false],
              },
            ],
            [
              {
                text: `${DetailOrderRow2[0].text}`,
                style: "RefBoxValue",
                margin: [0, 7, 0, 0],
                alignment: "left",
                border: [true, false, false, false],
              },
              {
                text: `${row1.DCL2}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [22, 7, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text: ``,
                style: "RefBoxValue",
                alignment: "left",
                border: [true, false, false, false],
              },
              {
                text: ``,
                style: "RefBoxValue",
                alignment: "left",
                margin: [85, 0, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text: `Product Name: ${PnAndPS.ProductName.toString()}`,
                style: "RefBoxValue",
                alignment: "left",
                border: [true, false, false, false],
              },
              {
                text: `Pack Size :${PnAndPS.PackSize}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [0, 0, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text: `Quantity: ${QuantityAndTestDate.Quantity}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [0, 0, 0, 0],
                border: [true, false, false, true],
              },
              {
                text: `Shelf life: ${shelfLife.ShelfLife}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [0, 0, 0, 0],
                border: [false, false, true, true],
              },
            ],
          ],
        },
      },

      {
        margin: [0, 5, 0, 0],
        table: {
          widths: ["*", "*", "*"],
          body: dataAnaly,
        },
      },

      {
        margin: [0, 25, 0, 0],
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
            text: `${ApproveValue}`,
            style: "invoiceTitleHeaderDetail",
            width: "*",
            margin: [30, 0, 0, 0],
          },
          {
            text: `${ReportValue}`,
            style: "invoiceTitleHeaderDetail",
            width: "*",
            margin: [30, 0, 0, 0],
          },
        ],
        // pageBreak: 'after'
      },
      // TOTAL
    ],
    // defaultStyle: { // 4. default style 'KANIT' font to test
    //   font: 'Sarabun'
    // },
    styles: {
      RefBoxValue: {
        fontSize: 10,
        font: "Sarabun",
      },
      invoiceTitleHeaderDetail: {
        fontSize: 8,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 0],
      },
      rightRef: {
        alignment: "right",
      },
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
        fontSize: 13,
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
      columnGap: 10,
    },
  }
  pdfMake.createPdf(docDefinition).open({}, window.frames["printPdf"])
}
