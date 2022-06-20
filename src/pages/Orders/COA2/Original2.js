import { Company } from "../../../configAPI"

export const originalFormCOA2 = (
  logo,
  halal,
  ref,
  row1,
  row2CollectDandPN, // <------ row2PDandDD,
  row3EXP,
  ExpirationDate, // <-------- PnAndPS,
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
  method,
  ScoreLevel,
  valScoreLevel,
  salmon
) => {
  let DetailOrderRow1 = []
  let DetailOrderRow2 = []
  let DetailOrderRow3 = []
  let DetailOrderRow4 = []
  let DetailOrderRow5 = []
  let DetailOrderRow6 = []
  let tankNumber = []
  let sensory = []
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
        border: [false, true, false, false],
      },
      {
        text: `Method`,
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
  // console.log("/method ", method)

  if (AnalysisRender.DisTN) {
    dataAnaly.push([
      {
        text: `Total Nitrogen`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpTN}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.TN}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, false, false],
      },
      {
        text: `${method.TN}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisProtein) {
    dataAnaly.push([
      {
        text: `Protein`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpProtein}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.Protein}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, false, false],
      },
      {
        text: `${method.protien}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisPH) {
    dataAnaly.push([
      {
        text: `pH`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpPH}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.PH}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.PH}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisSalt) {
    dataAnaly.push([
      {
        text: `% NaCl`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpSalt}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.Salt}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.Nacl}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisHistamine) {
    dataAnaly.push([
      {
        text: `Histamine`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpHistamine} ppm`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.Histamine}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.Histamine}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisHistamine && method.AOA) {
    dataAnaly.push([
      {
        text: ``,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, -4, 0, 0],
        border: [true, false, false, false],
      },
      {
        text: ``,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, -4, 0, 0],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: ``,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, -4, 0, 0],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.AOA}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, -4, 0, 0],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisSPG) {
    dataAnaly.push([
      {
        text: `Specific Gravity`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpSPG}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.SPG}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.spg}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisAW) {
    dataAnaly.push([
      {
        text: `Water Activity`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpAW}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.AW}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.AW}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisTss) {
    dataAnaly.push([
      {
        text: `TSS(Brix)`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpTSS}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.TSS}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.TSS}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisAN) {
    dataAnaly.push([
      {
        text: `AN`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpAN}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.AN}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.AN}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisAcidity) {
    dataAnaly.push([
      {
        text: `Acidity`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpAcidity}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.Acidity}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.Acidity}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisViscosity) {
    dataAnaly.push([
      {
        text: `Viscosity`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        border: [true, false, false, false],
      },
      {
        text: `${spcChem.scpViscosity}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${valuesChem.Viscosity}`,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 5],
        bold: true,
        border: [false, false, false, false],
      },
      {
        text: `${method.Viscosity}`,
        style: "RefBoxValue",
        alignment: "left",
        bold: true,
        margin: [0, 0, 0, 5],
        border: [false, false, true, false],
      },
    ])
  }

  if (MicroRender.MicroRender && MicroRender.MicroAnalysis) {
    if (salmon) {
      dataAnaly.push(
        [
          {
            text: `MICROBIOLOGICAL`,
            style: "invoiceTitle",
            alignment: "left",
            fontSize: 12,
            decoration: "underline",
            // italics: true, ตัวเอียง
            bold: true,
            margin: [0, 3, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 3, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 3, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 3, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `APC`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `< 1x10\u2074 CFU/g`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.TPC}`,
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
              {
                text: ``,
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
            ],

            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: `(Every lot)`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [-50, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `Yeasts and Molds`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `\u2264 100 CFU/g`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.YeaseandMold}`,
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
              {
                text: ``,
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
            ],

            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: `(Every lot)`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [-50, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `E. coli`,
            style: "RefBoxValue",
            alignment: "left",
            italics: true,
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `< 3.0 (NOT DETECTED)`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.Ecoil}`,
                // text: `${valuesMicro.Ecoil}`,
                width: "auto",
                alignment: "left",
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
              {
                text: ``,
                width: "auto",
                alignment: "left",
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
            ],
            // margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: `(Every lot)`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [-50, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `Salmonella spp.`,
            style: "RefBoxValue",
            alignment: "left",
            italics: true,
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `NOT DETECTED`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.Salmonella}`,
                width: "auto",
                alignment: "left",
                style: "RefBoxValue",
              },
              {
                text: ``,
                width: "auto",
                alignment: "left",
                style: "RefBoxValue",
              },
            ],
            margin: [0, 0, 0, 2],
            // bold: true,
            fontSize: 8,
            border: [false, false, false, false],
          },
          {
            text: `(Once a year)`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [-50, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ]
      )
    } else {
      dataAnaly.push(
        [
          {
            text: `MICROBIOLOGICAL`,
            style: "invoiceTitle",
            alignment: "left",
            fontSize: 12,
            decoration: "underline",
            // italics: true, ตัวเอียง
            bold: true,
            margin: [0, 3, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 3, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 3, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 3, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `APC`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `< 1x10\u2074 CFU/g`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.TPC}`,
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
              {
                text: `(Every lot)`,
                style: "RefBoxValue",
                margin: [10, 0, 0, 2],
              },
            ],

            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `Yeasts and Molds`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `\u2264 100 CFU/g`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.YeaseandMold}`,
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
              {
                text: `(Every lot)`,
                style: "RefBoxValue",
                margin: [10, 0, 0, 2],
              },
            ],

            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: `E. coli`,
            style: "RefBoxValue",
            alignment: "left",
            italics: true,
            margin: [0, 0, 0, 2],
            border: [true, false, false, false],
          },
          {
            text: `< 3.0 (NOT DETECTED)`,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            columns: [
              {
                text: `${valuesMicro.Ecoil}`,
                // text: `${valuesMicro.Ecoil}`,
                width: "auto",
                alignment: "left",
                style: "RefBoxValue",
                margin: [0, 0, 0, 2],
              },
              {
                text: `(Every lot)`,
                width: "auto",
                alignment: "left",
                style: "RefBoxValue",
                margin: [17, 0, 0, 2],
              },
            ],
            // margin: [0, 0, 0, 2],
            // bold: true,
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "RefBoxValue",
            alignment: "left",
            margin: [0, 2, 0, 2],
            // bold: true,
            border: [false, false, true, false],
          },
        ]
      )
    }
  }

  if (ScoreLevel) {
    sensory.push(
      [
        {
          text: `Sensory Test Results`,
          style: "invoiceTitle",
          alignment: "left",
          fontSize: 12,
          decoration: "underline",
          // italics: true, ตัวเอียง
          bold: true,
          margin: [0, 3, 0, 2],
          border: [true, false, false, false],
        },
        {
          text: ``,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 3, 0, 2],
          // bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          margin: [0, 0, 0, 0],
          table: {
            widths: ["*", "*"],
            body: [
              [
                "Parameter",
                {
                  text: "Score level",
                  // style: "RefBoxValue",
                  alignment: "center",
                },
              ],
              [
                {
                  text: `Taste`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  text: `${valScoreLevel.Taste}`,
                  style: "RefBoxValue",
                  alignment: "center",
                },
              ],
              [
                {
                  text: `Odor`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  text: `${valScoreLevel.Odor}`,
                  style: "RefBoxValue",
                  alignment: "center",
                },
              ],
              [
                {
                  text: `Color`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  text: `${valScoreLevel.Color}`,
                  style: "RefBoxValue",
                  alignment: "center",
                },
              ],
              [
                {
                  text: `Appearance`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  text: `${valScoreLevel.Appearance}`,
                  style: "RefBoxValue",
                  alignment: "center",
                },
              ],
            ],
          },
          // margin: [0, 0, 0, 2],
          border: [true, false, false, false],
        },
        {
          // text: `\u2264 100 CFU/g`,
          // style: "RefBoxValue",
          // alignment: "left",
          stack: [
            {
              columns: [
                {
                  width: "auto",
                  text: `Remark:`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  width: "auto",
                  text: `Score level`,
                  style: "RefBoxValue",
                  alignment: "left",
                  margin: [-5, 0, 0, 0],
                },
              ],
            },
            {
              columns: [
                {
                  width: "auto",
                  margin: [30, 0, 0, 0],
                  text: ``,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  width: "auto",
                  text: `5 = Very Good`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
              ],
            },
            {
              columns: [
                {
                  width: "auto",
                  margin: [30, 0, 0, 0],
                  text: ``,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  width: "auto",
                  text: `4 = Good`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
              ],
            },
            {
              columns: [
                {
                  width: "auto",
                  text: `less than`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
                {
                  width: "auto",
                  margin: [-8, 0, 0, 0],
                  text: `4 = Not Good`,
                  style: "RefBoxValue",
                  alignment: "left",
                },
              ],
            },
          ],

          margin: [0, 38, 0, 2],
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `Test Date ${valScoreLevel.testDate}`,
          style: "RefBoxValue",
          alignment: "left",
          // fontSize: 12,
          // italics: true, ตัวเอียง
          bold: true,
          margin: [0, 3, 0, 2],
          border: [true, false, false, true],
        },
        {
          text: `Completion date ${valScoreLevel.CompletionDate}`,
          style: "RefBoxValue",
          alignment: "right",
          margin: [0, 3, 15, 2],
          bold: true,
          border: [false, false, true, true],
        },
      ]
    )
  }

  if (tankNo.Tank !== "") {
    tankNumber.push(
      {
        text: `Tank No: ${tankNo.Tank}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [true, false, false, false],
      },
      {
        text: ` `,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, 0, 0, 0],
        border: [false, false, true, false],
      }
    )
  } else {
    tankNumber.push(
      {
        text: ``,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, -25, 0, 0],
        border: [true, false, false, false],
      },
      {
        text: ``,
        style: "RefBoxValue",
        alignment: "left",
        margin: [0, -25, 0, 0],
        border: [false, false, true, false],
      }
    )
  }

  // Success Cellected Productname
  for (let i = 0; i < row2CollectDandPN.length; i++) {
    let index = {
      text: ``,
      style: " ",
      alignment: "left",
      border: [false, false, false, false],
    }
    if (i == 0 && row2CollectDandPN[i].values !== "") {
      index = {
        text: `Collected date: ${row2CollectDandPN[i].values}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [true, false, false, false],
      }
      DetailOrderRow2.push(index)
    } else if (i == 1 && row2CollectDandPN[i].values !== "") {
      index = {
        text: `${row2CollectDandPN[i].values}`,
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
  //Production Date and Tank Success
  for (let i = 0; i < row3EXP.length; i++) {
    let index = {
      text: ``,
      style: " ",
      alignment: "left",
      border: [false, false, false, false],
    }
    if (i == 0 && row3EXP[i].values !== "") {
      index = {
        text: `Production date: ${row3EXP[i].values}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [true, false, false, false],
      }
      DetailOrderRow3.push(index)
    } else if (i == 1 && row3EXP[i].values !== "") {
      index = {
        text: `Tank No. ${row3EXP[i].values}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [false, false, true, false],
      }
      DetailOrderRow3.push(index)
    } else {
      index = {
        text: ``,
        style: " ",
        alignment: "left",
        border: [true, false, false, false],
      }
      DetailOrderRow3.push(index)
    }
  }

  //   console.log("DetailOrderRow2 :", DetailOrderRow2)
  //   console.log("dataAnalysis :", dataAnaly)
  var docDefinition = {
    pageMargins: [30, 25, 15, 25],
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
                    style: "invoiceTitle",
                    width: "*",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: `${Company.Address}`,
                    style: "invoiceTitleHeaderDetail",
                    width: "*",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: `${Company.Phone}`,
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
                  },
                ],
              },
              {
                columns: [
                  {
                    text: "CERTIFICATE OF ANALYSIS",
                    style: "invoiceTitle",
                    width: "*",
                  },
                ],
              },
            ],
          },
          {
            stack: [
              {
                text: "FM-LA-23-02",
                fontSize: "6",
                bold: true,
                width: 60,
                margin: [0, 0, 0, 3],
              },
              {
                image: `data:image/png;base64,${halal}`,
                width: 60,
                alignment: "center",
              },
            ],
            // margin: 'auto',
            // text: "FM-LA-23-02",
            width: 60,
            alignment: "center",
          },
        ],
      },
      {
        // text: "FM-LA-23-02",

        // halal
        margin: [0, 20, 0, 0],
        columns: [
          {},
          {},
          {
            style: "rightRef",
            table: {
              alignment: "left",
              widths: ["auto", "*"],
              body: [
                [
                  {
                    text: `REF.NO `,
                    style: "RefBoxValue",
                    alignment: "left",
                    border: [true, true, false, true],
                  },
                  {
                    text: `${ref.refNo}`,
                    style: "RefBoxValue",
                    alignment: "left",
                    border: [false, true, true, true],
                  },
                ],
                [
                  {
                    text: `DATE: `,
                    style: "RefBoxValue",
                    alignment: "left",
                    border: [true, false, false, true],
                  },
                  {
                    text: `${ref.date}`,
                    style: "RefBoxValue",
                    alignment: "left",
                    border: [false, false, true, true],
                  },
                ],
                [
                  {
                    text: `PAGE NO.`,
                    style: "RefBoxValue",
                    alignment: "left",
                    border: [true, false, false, false],
                  },
                  {
                    text: `${ref.pageNo}`,
                    style: "RefBoxValue",
                    alignment: "left",
                    border: [false, false, true, false],
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        margin: [0, 0, 0, 0],
        table: {
          // alignment: "left",
          widths: ["*", "*"],
          body: [
            [
              {
                text: `TO. ${selectedGroupNameTo}`,
                style: "RefBoxValue",
                alignment: "left",
                border: [true, true, false, false],
              },
              {
                text: `Lot No. ${row1.DCL1}`,
                style: "RefBoxValue",
                alignment: "left",
                border: [false, true, true, false],
              },
            ],
            DetailOrderRow2,
            // DetailOrderRow2.map(data => (
            //     data
            // )),
            DetailOrderRow3,
            [
              {
                text: `Expiration date:${ExpirationDate.ExpirationDate}`,
                style: "RefBoxValue",
                alignment: "left",
                border: [true, false, false, true],
              },
              {
                text: ``,
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
          widths: ["*", "*", "*", "*"],
          body: dataAnaly,
        },
      },
      {
        margin: [0, 0, 0, 0],
        table: {
          widths: ["*", "*"],
          body: sensory,
        },
      },

      // {
      //   margin: [0, 35, 0, 0],
      //   alignment: "justify",
      //   columns: [
      //     {
      //       text: "Reported By ......................................",
      //       style: "invoiceTitleHeaderDetail",
      //       width: "*",
      //     },
      //     {
      //       text: "Approve By ......................................",
      //       style: "invoiceTitleHeaderDetail",
      //       width: "*",
      //     },
      //   ],
      // },

      {
        // alignment: "justify",
        margin: [0, 10, 0, 0],
        table: {
          widths: ["*", "*"],
          // heights:40,
          body: [
            [
              {
                margin: [5, 10, 0, 10],
                text: `${ApproveValue} ......................................`,
                // style: "invoiceTitleHeaderDetail",
                bold: true,
                alignment: "left",
                border: [true, true, false, true],
              },
              {
                margin: [0, 10, 5, 10],
                text: `${ReportValue} ......................................`,
                // style: "invoiceTitleHeaderDetail",
                bold: true,
                alignment: "right",
                border: [false, true, true, true],
              },
            ],
          ],
        },
        // columns: [
        //   {
        //     text: `${ApproveValue}`,
        //     style: "invoiceTitleHeaderDetail",
        //     width: "*",
        //     margin: [40, 0, 0, 0],
        //   },
        //   {
        //     text:  `${ReportValue}`,
        //     style: "invoiceTitleHeaderDetail",
        //     width: "*",
        //     margin: [40, 0, 0, 0],
        //   },
        // ],
      },
      // TOTAL
    ],
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
