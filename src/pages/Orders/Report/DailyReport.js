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
export const dailyReport = (logo, date_export, dataImport, date_export_to) => {
  let dataTable = [
    [
      {
        text: `รหัสตัวอย่าง`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `ชื่อตัวอย่าง`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `pH (25ºC)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `%Salt (g/100 ml)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `TN (g/L)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `Aw`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `SPG`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `°Brix`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `หมายเหตุ`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
    ],
  ]
  if (dataImport) {
    for (let i = 0; i < dataImport.length; i++) {
      dataTable.push([
        {
          text: `${dataImport[i].idOrders}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].ProductName}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].PH}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Salt}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Tn}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Aw}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].SPGTest}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Tss}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: ``,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
      ])
    }
  }
  //   console.log("prop data", AnalysisRender, spcChem, valuesChem)
  //   console.log("/MicroRender ", MicroRender)

  //   console.log("DetailOrderRow2 :", DetailOrderRow2)
  //   console.log("dataAnalysis :", dataAnaly)
  var docDefinition = {
    pageMargins: [20, 20, 20, 20],
    pageOrientation: "landscape",
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
            margin: [0, 15, 0, 0],
          },
          {
            text: "FM-LA-23-03 rev.00",
            // style: "codeDoc",
            fontSize: "7",
            bold: true,
            width: 70,
            margin: [0, 20, 0, 0],
          },
        ],
      },
      {
        alignment: "left",
        columns: [
          {
            text: `วันที่วิเคราะห์: ${date_export} ถึง ${date_export_to}`,
            fontSize: "10",
            alignment: "left",
            font: "Sarabun",
            width: "*",
            margin: [0, 20, 0, 0],
          },
        ],
      },
      {
        alignment: "center",
        margin: [0, 15, 0, 0],
        table: {
          widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
          body: dataTable,
        },
      },
      {
        margin: [0, 20, 0, 0],
        columns: [
          {
            text: `Analyzed by :................................................................ \n\n Date : ${date_export}`,
            fontSize: "10",
            alignment: "left",
            font: "Sarabun",
            width: "*",
            margin: [0, 20, 0, 0],
          },
          {},
          {
            text: `Approved by :................................................................ \n\n Date : ${date_export}`,
            fontSize: "10",
            alignment: "right",
            font: "Sarabun",
            width: "*",
            margin: [0, 20, 0, 0],
          },
        ],
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
        font: "Sarabun",
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
