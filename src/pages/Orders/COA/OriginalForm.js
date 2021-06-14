import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import pdfFonts from "../../../assets/custom-fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  },
  // Kanit Font
  Sarabun: { // 3. set Kanit font
    normal: 'Sarabun-Regular.ttf',
    bold: 'Sarabun-Medium.ttf',
    italics: 'Sarabun-Italic.ttf',
    bolditalics: 'Sarabun-MediumItalic.ttf'          
  }
}
export const originalFormCOA = (
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
  ReportValue ,
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
        border: [false, false, true, false],
      },
    ])
  }

  if (AnalysisRender.DisPH) {
    dataAnaly.push([
      {
        text: `PH`,
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
        text: `${spcChem.scpHistamine}`,
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
        border: [false, false, true, false],
      },
    ])
  }

  if (MicroRender.MicroRender && MicroRender.MicroAnalysis) {
    dataAnaly.push(
      [
        {
          text: `MICROBIOLOGICAL`,
          style: "RefBoxValue",
          alignment: "left",
        //   fontSize: 8,
          decoration: "underline",
          // italics: true, ตัวเอียง
          bold: true,
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: ``,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `TPC`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: `< 1x10\u2074 CFU/g`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, false, false],
        },
        {
          columns: [
            {
              text: `${valuesMicro.TPC}`,
              style: "RefBoxValue",
            },
            {
              text: `(Every lot)`,
              style: "RefBoxValue",
            },
          ],
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `Yeasts and Molds`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: `\u2264 100 CFU/g`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, false, false],
        },
        {
          columns: [
            {
              text: `${valuesMicro.YeaseandMold}`,
              style: "RefBoxValue",
            },
            {
              text: `(Every lot)`,
              style: "RefBoxValue",
            },
          ],
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `E. coli`,
          style: "RefBoxValue",
          alignment: "left",
          italics: true,
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: `NOT DETECTED`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, false, false],
        },
        {
          columns: [
            {
              text: `${valuesMicro.Ecoil}`,
              width: "auto",
              alignment: "left",
              style: "RefBoxValue",
            },
            {
              text: `(Every lot)`,
              width: "auto",
              alignment: "right",
              margin:[11,0,0,0],
              style: "RefBoxValue",
            },
          ],
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `Coliform`,
          style: "RefBoxValue",
          alignment: "left",
          italics: true,
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: `NOT DETECTED`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, false, false],
        },
        {
          columns: [
            {
              text: `${valuesMicro.Coliform}`,
              width: "auto",
              alignment: "left",
              style: "RefBoxValue",
            },
            {
              text: `(Every lot)`,
              width: "auto",
              alignment: "right",
              style: "RefBoxValue",
              margin:[11,0,0,0],
            },
          ],
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `S. aureus`,
          style: "RefBoxValue",
          alignment: "left",
          italics: true,
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: `NOT DETECTED`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, false, false],
        },
        {
          columns: [
            {
              text: `${valuesMicro.Saureus}`,
              width: "auto",
              alignment: "left",
              style: "RefBoxValue",
            },
            {
              text: `(Every lot)`,
              width: "auto",
              alignment: "right",
              style: "RefBoxValue",
              margin:[11,0,0,0],
            },
          ],
          margin: [0, 0, 0, 5],
          bold: true,
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `Salmonella spp.`,
          style: "RefBoxValue",
          alignment: "left",
          italics: true,
          margin: [0, 0, 0, 5],
          border: [true, false, false, false],
        },
        {
          text: `NOT DETECTED`,
          style: "RefBoxValue",
          alignment: "left",
          margin: [0, 0, 0, 5],
            bold: true,
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
              text: `(Every lot)`,
              width: "auto",
              alignment: "right",
              style: "RefBoxValue",
              margin:[11,0,0,0],
            },
          ],
          margin: [0, 0, 0, 5],
          bold: true,
          // fontSize:"8",
          border: [false, false, true, false],
        },
      ],
      [
        {
          text: `Characteristics`,
          bold: true,
          fontSize: "10",
          margin: [0, 5, 0, 0],
          border: [true, false, false, true],
        },
        {
          text: `Clear light brown\nThin liquid, fishy\nflavor, First pressing,\nExtra virgin`,
          fontSize: "10",
          bold: false,
          margin: [0, 5, 0, 0],
          border: [false, false, false, true],
        },
        {
            
          columns: [
            {
              fontSize: "10",
              stack: [
                {
                  margin: [0, 0, 0, 5],
                  columns: [
                    {
                      text: `Appearance`,
                      bold: true,
                    //   width: "auto",
                    },
                    {
                      margin: [-30, 0, 0, 0],
                      text: `No sedimentation`,
                      fontSize: "10",
                      bold: true,
                      width: "*",
                    },
                  ],
                },
                {
                  margin: [0, 0, 0, 5],
                  columns: [
                    {
                      text: `Order`,
                      bold: true,
                    //   width: "auto",
                    },
                    {
                        margin: [-30, 0, 0, 0],
                      text: `Fresh fish sauce odor/aroma`,
                      fontSize: "10",
                      bold: true,
                      width: "*",
                    },
                  ],
                },
                {
                  margin: [0, 0, 0, 5],
                  columns: [
                    {
                      text: `Taste`,
                      bold: true,
                    //   width: "auto",
                    },
                    {
                        margin: [-30, 0, 0, 0],
                      text: `Fresh fish sauce taste`,
                      fontSize: "10",
                      bold: true,
                      width: "*",
                    },
                  ],
                },
                {
                  margin: [0, 0, 0, 5],
                  columns: [
                    {
                      text: `Color`,
                      bold: true,
                    //   width: "auto",
                    },
                    {
                        margin: [-30, 0, 0, 0],
                      text: `Clear rockfish brown thin liquid`,
                      fontSize: "10",
                      bold: true,
                      width: "*",
                    },
                  ],
                },
              ],
            },
          ],
          margin: [-50, 5, 0, 0],
          border: [false, false, true, true],
        },
      ]
    )
  }else{
      dataAnaly.push(
        [
            {
              text: `Characteristics`,
              bold: true,
              margin: [0, 10, 0, 0],
              fontSize: "10",
              border: [true, false, false, true],
            },
            {
              text: `Clear light brown\nThin liquid, fishy\nflavor, First pressing,\nExtra virgin`,
              fontSize: "10",
              bold: false,
              margin: [0, 10, 0, 0],
              fontSize: "10",
              border: [false, false, false, true],
            },
            {
                
              columns: [
                {
                  stack: [
                    {
                      margin: [0, 0, 0, 10],
                      columns: [
                        {
                          text: `Appearance`,
                          bold: true,
                        //   width: "auto",
                        },
                        {
                          margin: [-30, 0, 0, 0],
                          text: `No sedimentation`,
                          fontSize: "10",
                          bold: true,
                          width: "*",
                        },
                      ],
                    },
                    {
                      margin: [0, 0, 0, 10],
                      columns: [
                        {
                          text: `Order`,
                          bold: true,
                        //   width: "auto",
                        },
                        {
                            margin: [-30, 0, 0, 0],
                          text: `Fresh fish sauce odor/aroma`,
                          fontSize: "10",
                          bold: true,
                          width: "*",
                        },
                      ],
                    },
                    {
                      margin: [0, 0, 0, 10],
                      columns: [
                        {
                          text: `Taste`,
                          bold: true,
                        //   width: "auto",
                        },
                        {
                            margin: [-30, 0, 0, 0],
                          text: `Fresh fish sauce taste`,
                          fontSize: "10",
                          bold: true,
                          width: "*",
                        },
                      ],
                    },
                    {
                      margin: [0, 0, 0, 10],
                      columns: [
                        {
                          text: `Color`,
                          bold: true,
                        //   width: "auto",
                        },
                        {
                            margin: [-30, 0, 0, 0],
                          text: `Clear rockfish brown thin liquid`,
                          fontSize: "10",
                          bold: true,
                          width: "*",
                        },
                      ],
                    },
                  ],
                },
              ],
              margin: [-50, 10, 0, 0],
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

  for (let i = 0; i < row2PDandDD.length; i++) {
    let index = {
      text: ``,
      style: " ",
      alignment: "left",
      border: [false, false, false, false],
    }
    if (i == 0 && row2PDandDD[i].values !== "") {
      index = {
        text: `Production date: ${row2PDandDD[i].values}`,
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
      index = {
        text: `Expiration date: ${row3EXP[i].values}`,
        style: "RefBoxValue",
        alignment: "left",
        border: [true, false, false, false],
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
                      "8/4 Samutjadee Rd. Paknum Mueang Rayong 21000 Thailand",
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
            text: " ",
            style: "codeDoc",
            width: 60,
          },
        ],
      },
      {
        margin: [0, 5, 0, 0],
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
                font: 'Sarabun',
                border: [true, true, false, false],
              },
              {
                text: `Date Code List: ${row1.DCL1}`,
                style: "RefBoxValue",
                alignment: "left",
                border: [false, true, true, false],
              },
            ],
            [
              {
                text: ` `,
                style: "RefBoxValue",
                alignment: "left",
                border: [true, false, false, false],
              },
              {
                text: `${row1.DCL2}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [85, 0, 0, 0],
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
                text: `${row1.DCL3}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [85, 0, 0, 0],
                border: [false, false, true, false],
              },
            ],
            DetailOrderRow2,
            // DetailOrderRow2.map(data => (
            //     data
            // )),
            DetailOrderRow3,
            [
              {
                text: `Product Name: ${PnAndPS.ProductName}`,
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
            tankNumber,
            [
              {
                text: `Quantity: ${QuantityAndTestDate.Quantity}`,
                style: "RefBoxValue",
                alignment: "left",
                margin: [0, 0, 0, 0],
                border: [true, false, false, true],
              },
              {
                text: `Test Date: ${QuantityAndTestDate.TestDate}`,
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
        RefBoxValue:{
            fontSize:10,
            font: 'Sarabun',
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
