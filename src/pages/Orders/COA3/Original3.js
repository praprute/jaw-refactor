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
        text: `Container No.\nBAG No.\nLOT No.`,
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
        text: `Histamine\n(ppm.)`,
        alignment: "center",
        fontSize: "8",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Salt\n(g/l)`,
        alignment: "center",
        fontSize: "8",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Salt\nMeter`,
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
        text: `Specific\nGravity\n(g/ml)`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `APC\n(cfu/g)`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `Yeast\n&\nMold\n(cfu/g)`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `S.\naureus\n(ND)`,
        fontSize: "8",
        alignment: "center",
        margin: [0, 0, 0, 5],
        border: [true, true, true, true],
      },
      {
        text: `E.coli &\nColiform\n(ND)`,
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
      dataAnaly.push([
        {
          text: `${valuesContainer[i]}\n${valuesBagNo[i]}\n${valuesLot[i]}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Tn}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Histamine}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Salt}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].SaltMeter}`,
          alignment: "center",
          fontSize: "8",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].PH}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].SPGTest}`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
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
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${
            setDescriptionVeitOrderformTableVeit[i].Yeasts ? "ND" : "ND"
          }`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${
            setDescriptionVeitOrderformTableVeit[i].Saureus ? "ND" : "ND"
          }`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${
            setDescriptionVeitOrderformTableVeit[i].EColi ? "ND" : "ND"
          }`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
        {
          text: `${setDescriptionVeitOrderformTableVeit[i].Aw}/\n${setDescriptionVeitOrderformTableVeit[i].tempAW}\u00B0C`,
          fontSize: "8",
          alignment: "center",
          margin: [0, 3, 0, 3],
          border: [true, true, true, true],
        },
      ])
    }
  }
  var docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 20, 40, 10],
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
                margin: [-170, 5, 0, 0],
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
                margin: [-170, 5, 0, 0],
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
                margin: [-170, 5, 0, 0],
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
                margin: [-170, 5, 0, 0],
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
                margin: [-170, 5, 0, 0],
              },
            ],
          },
        ],
      },
      {
        margin: [10, 10, 0, 0],
        alignment: "center",
        table: {
          widths: [
            "15.5%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
            "8%",
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
                margin: [10, 15, 0, 10],
                text: `Physical-Chemical Specifications`,
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
        margin: [15, 0, 0, 0],
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
                text: `Total Nitrogen gm/liter, %\nSodium Chloride\nHistamine\n\npH\nWater Activity\nSpecific Gravity\nAPC\nYeast & Mold\nE.coli & Coliform\nS. aureus`,
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
                text: `TN \u2265 20 gm/Liter minimum\n28.94 - 30.11%\n200ppm maximum\n\n5.2 - 5.4 at 25 \u00B0C\n0.85 maximum\n1.20 g/mL minimum\n500 cfu/g maximum\n<10 cfu/g maximum\n<3.0 (None Detected)\n<3.0 (None Detected)`,
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
                text: `TN Auto-analyzer\nVolumetric Method\nEnzymatic Biosensor\nMethod(AOAC 051604)\npH meter\nUsing Water Activity analyzer\nHydrometer method\nPour Plate Technique\nPour Plate Technique\nMPN Method\nMPN Method`,
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
