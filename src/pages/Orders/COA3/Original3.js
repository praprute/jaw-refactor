import { Company } from "../../../configAPI"
export const originalFormCOA3 = (
  logo,
  halal,
  selectedGroupNameTo,
  ApproveValue,
  ReportValue,
  descriptionVeit,
  setDescriptionVeitOrderformTableVeit,
  valuesContainer,
  valuesBagNo,
  valuesLot,
  valuesAplove
) => {
  let dataAnaly = [
    [
      {
        text: `Container No.`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `BAG No.`,
        alignment: "center",
        fontSize: "8",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `LOT No.`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `T.N.\n(g/l)`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Histamine (ppm.)`,
        alignment: "center",
        fontSize: "8",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Salt (g/l)`,
        alignment: "center",
        fontSize: "8",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Salt Meter`,
        alignment: "center",
        fontSize: "8",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `pH\nat 25 °C`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Specific Gravity`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `APC cfu/g`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `E.coli & Coliform`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Aw/°C`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
    ],
  ]
  if (setDescriptionVeitOrderformTableVeit) {
    for (let i = 0; i < setDescriptionVeitOrderformTableVeit.length; i++) {
      console.log("container.i : ", valuesContainer.i)
      dataAnaly.push([
        {
          text: `${valuesContainer[i]}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${valuesBagNo[i]}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${valuesLot[i]}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Tn}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Histamine}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Salt}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].SaltMeter}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].PH}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].SPGTest}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${
            setDescriptionVeitOrderformTableVeit[i].APC
              ? setDescriptionVeitOrderformTableVeit[i].APC
              : "ND"
          }`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${
            setDescriptionVeitOrderformTableVeit[i].EColi ? "ND" : "ND"
          }`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Aw}/\n${setDescriptionVeitOrderformTableVeit[i].tempAW}\u00B0C`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 10, 0, 10],
          border: [true, true, true, true],
        },
      ])
    }
  }
  var docDefinition = {
    pageSize: "A4",
    pageMargins: [10, 10, 10, 10],
    content: [
      {
        // alignment: "justify",
        columns: [
          {
            image: `data:image/png;base64,${logo}`,
            width: 80,
            alignment: "left",
            // margin: ['auto'],
          },
          {
            // margin: 'auto',
            margin: [0, 0, 20, 0],
            alignment: "center",
            stack: [
              {
                columns: [
                  {
                    text: `${Company.Name}`,
                    // VIET HUONG CO.,LTD
                    style: "invoiceTitle",
                    width: "*",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: `${Company.Address}`,
                    // 89 Moo 4, Makamku, Nikom Phattana, Rayong 21180
                    style: "invoiceTitleHeaderDetail",
                    width: "*",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: `${Company.Phone}`,
                    // Tel: 66-38-624432 Fax: 66-38-940086
                    style: "invoiceTitleHeaderDetail",
                    width: "*",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: `${Company.Web}`,
                    style: "invoiceTitleHeaderDetail",
                    width: "*",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: `${Company.Email}`,
                    style: "invoiceTitleHeaderDetail",
                    width: "*",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },
              {
                columns: [
                  {
                    text: "CERTIFICATE OF ANALYSIS",
                    style: "invoiceTitle",
                    width: "*",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },
            ],
          },
          {
            // margin: 'auto',

            image: `data:image/png;base64,${halal}`,
            width: 60,
            alignment: "center",
          },
        ],
      },
      {
        // margin: 'auto',
        margin: [0, 0, 20, 0],
        alignment: "center",
        stack: [
          {
            columns: [
              {
                text: "Description ",
                style: "RefBoxValue",
                alignment: "left",
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                text: `: ${descriptionVeit.description}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [-180, 5, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "Customer ",
                style: "RefBoxValue",
                alignment: "left",
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                text: `: ${selectedGroupNameTo}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [-180, 5, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "Invoice No. ",
                style: "RefBoxValue",
                alignment: "left",
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                text: `: ${descriptionVeit.Invoice}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [-180, 5, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "ETA ",
                style: "RefBoxValue",
                alignment: "left",
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                text: `: ${descriptionVeit.ETA}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [-180, 5, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "Shelf life. ",
                style: "RefBoxValue",
                alignment: "left",
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                text: `: ${descriptionVeit.ShelfLife}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [-180, 5, 0, 0],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        table: {
          widths: [
            "12.3%",
            "12.3%",
            "10%",
            "7%",
            "9%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
          ],
          body: dataAnaly,
        },
      },
      {
        // alignment: "justify",
        margin: [0, 10, 0, 0],
        table: {
          widths: ["*", "*"],
          // heights:40,
          body: [
            [
              {
                margin: [0, 10, 0, 0],
                text: `.............................................`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
              {
                margin: [0, 10, 0, 0],
                text: `.............................................`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
            ],
            [
              {
                margin: [0, 0, 0, 0],
                text: `${valuesAplove.nameLeft}`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
              {
                margin: [0, 0, 0, 0],
                text: `${valuesAplove.nameRight}`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
            ],
            [
              {
                margin: [0, 0, 0, 0],
                text: `${ApproveValue}`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
              {
                margin: [0, 0, 0, 0],
                text: `${ReportValue}`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
            ],
            [
              {
                margin: [0, 0, 0, 0],
                text: `Date ${valuesAplove.dateLeft}`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
              {
                margin: [0, 0, 0, 0],
                text: `Date ${valuesAplove.dateRight}`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
            ],
            [
              {
                margin: [-5, 15, 0, 10],
                text: `Physico-Chemical Specifications`,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "left",
                bold: true,
                border: [false, false, false, false],
              },
              {
                margin: [0, 0, 0, 0],
                text: ``,
                // style: "invoiceTitleHeaderDetail",
                fontSize: "10",
                alignment: "center",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
      {
        columns: [
          {
            stack: [
              {
                text: `Parameter`,
                fontSize: "10",
                alignment: "left",
                bold: true,
                margin: [0, 0, 0, 5],
              },
              {
                text: `Total Nitrogen gm/liter, %\nSodium Chloride\nHistamine\n\npH\nWater Activity\nSpecific Gravity\nAPC\nE.coli & Coliform`,
                fontSize: "10",
                alignment: "left",
                bold: false,
              },
            ],
          },
          {
            stack: [
              {
                text: `Specification Limits`,
                fontSize: "10",
                alignment: "left",
                bold: true,
                margin: [0, 0, 0, 5],
              },
              {
                text: `TN \u2265 20 gm/Liter minimum\n28.65 - 29.25%\n200ppm maximum\n\n5.2 - 5.4 at 25 \u00B0C\n0.85 maximum\n1.20 g/mL minimum\n500 cfu/g maximum\n<3.0 (None Detected)`,
                fontSize: "10",
                alignment: "left",
                bold: false,
              },
            ],
          },
          {
            stack: [
              {
                text: `Test Method`,
                fontSize: "10",
                alignment: "left",
                bold: true,
                margin: [0, 0, 0, 5],
              },
              {
                text: `TN Auto-analyzer\nVolumetric Method\nEnzymatic Biosensor\nMethod(AOAC 051604)\nUsing pH meter\nUsing Water Activity analyzer\nHydrometer method\nPour Plate Technique\nMPN Method`,
                fontSize: "10",
                alignment: "left",
                bold: false,
              },
            ],
          },
        ],
      },
      // TOTAL
    ],
    styles: {
      RefBoxValue: {
        fontSize: 12,
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
        fontSize: 15,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 0],
      },
      // invoiceTitleHeaderDetail: {
      //   fontSize: 10,
      //   bold: true,
      //   alignment: "center",
      //   margin: [0, 0, 0, 0],
      // },
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
