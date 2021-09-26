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
export const dailyReportBio = (logo, date_export, dataImport) => {
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
        text: `รายการ`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `E.Coli \n\n (48hr)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `Coliform \n\n (48hr)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `APC \n\n (48hr)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `Yeast & Mold \n\n (120hr)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `S.aureus \n\n (48hr)`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `ผลการทดสอบ`,
        style: "RefBoxValue",
        alignment: "center",
        font: "Sarabun",
        border: [true, true, true, true],
      },
      {
        text: `ผู้บันทึก`,
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
      }
    ]
  ]
  if (dataImport) {
    for (let i = 0; i < dataImport.length; i++) {
      let score = "ไม่ผ่าน"
      if(dataImport[i].resultAPC == 0 || dataImport[i].resultColiform == 0 || dataImport[i].resultEColi == 0 || dataImport[i].resultSaureus == 0 || dataImport[i].resultYeasts == 0 ){
          score = 'ไม่ผ่าน'
      }else{
        score = "ผ่าน"
      }
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
          text: `${dataImport[i].EColi}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Coliform}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].APC}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Yeasts}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${dataImport[i].Saureus}`,
          style: "RefBoxValue",
          alignment: "center",
          font: "Sarabun",
          border: [true, true, true, true],
        },
        {
          text: `${score}`,
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
            text: "แบบฟอร์มบันทึกผลการวิเคราะห์ทางจุลินทรีย์",
            style: "invoiceTitle",
            width: "*",
            margin: [0, 15, 0, 0],
          },
          {
            text: "FM-LA-23-08 rev.02",
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
            text: `วันที่วิเคราะห์: ${date_export}`,
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
          widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
          body: dataTable,
        },
      },
      {
        margin: [0, 20, 0, 0],
        columns: [
          {},
          {},
          {
            stack: [
              {
                text: `ผู้ตรวจสอบ:................................................................`,
                fontSize: "10",
                alignment: "right",
                font: "Sarabun",
                width: "*",
                margin: [0, 20, 0, 0],
              },
              {
                text: `ตำแหน่ง:................................................................`,
                fontSize: "10",
                alignment: "right",
                font: "Sarabun",
                width: "*",
                margin: [0, 20, 0, 0],
              },
              {
                text: `วันที่: ${date_export}`,
                fontSize: "10",
                alignment: "right",
                font: "Sarabun",
                width: "*",
                margin: [0, 20, 0, 0],
              },
            ],
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
