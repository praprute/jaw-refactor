import React , {useEffect, useState} from "react"
import { 
  Row,
  Col,
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  Button,
  Modal,
  ModalFooter
} from "reactstrap"
import { Link } from "react-router-dom"

import { API } from './../../configAPI'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import Moment from 'moment'
//get api
import {getAllOrder,
  readOrderById} from './api'
import { map, result } from "lodash";
import { orders } from "common/data";
import { isAuthenticated } from './../Authentication/api'

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
//PDF
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ModalDetail = props => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const { orders , spc, tr, bio} = props
    const [imgg, setimgg] = useState("https://jaw.sgp1.digitaloceanspaces.com/Logo-RFS.jpg")
    const { isOpen, toggle, toggleCOA } = props
    const {user, token} = isAuthenticated()
    const [modal, setModal] = useState(false);
    const [score, setScore] = useState(0)
    const [confirm_alert, setconfirm_alert] = useState(false)
    const [detailById, setdetailById] = useState([{
        idOrderTested:"",
        BBE:"",
        PORD:"",
        ProductName:"",
        name:"",
        Size:"",
        Quantity:""
      }])
    // const toggle = () => setModal(!modal);
    
    const [resultChem , setresultChem] = useState(
        [
            { int:false , key: "TN(g/L)", coa: false , val:""  },
            { int:false , key: "%Salt(w/v)", coa: false , val:"" },
            { int:false , key: "Histamine(ppm)", coa: false ,  val:""  },
            { int:false , key: "PH", coa: false ,  val:"" },
            { int:false , key: "Aw", coa: false ,  val:""  },
            { int:false , key: "Tss(Brix)", coa: false ,  val:"" },
            { int:false , key: "SPG", coa: false ,  val:""   }
          ]
    ) 
    const [resultMicro , setresultMicro] = useState([
        { int: false, coa: false, val: "", key: 'APC' },
        { int: false, coa: false, val: "", key: 'Yeasts & Molds' },
        { int: false, coa: false, val: "", key: 'E. coil' },
        { int: false, coa: false, val: "", key: 'Coliform' },
        { int: false, coa: false, val: "", key: 'S. aureus' }
      ]) 


    useEffect(() => {
        if(tr[0] != undefined){
            setresultChem(tr[0])
            setresultMicro(tr[1])
        }else{
            setresultChem([
                { int:false , key: "TN(g/L)", coa: false , val:""  },
                { int:false , key: "%Salt(w/v)", coa: false , val:"" },
                { int:false , key: "Histamine(ppm)", coa: false ,  val:""  },
                { int:false , key: "PH", coa: false ,  val:"" },
                { int:false , key: "Aw", coa: false ,  val:""  },
                { int:false , key: "Tss(Brix)", coa: false ,  val:"" },
                { int:false , key: "SPG", coa: false ,  val:""   }
              ])
              setresultMicro([
                { int: false, coa: false, val: "", key: 'APC' },
                { int: false, coa: false, val: "", key: 'Yeasts & Molds' },
                { int: false, coa: false, val: "", key: 'E. coil' },
                { int: false, coa: false, val: "", key: 'Coliform' },
                { int: false, coa: false, val: "", key: 'S. aureus' }
              ])
        }
    }, [tr])

    const [scoreTested, setscoreTested] = useState("")
    useEffect(() => {
        setdetailById(orders)

        if(tr.length > 0) {
          var countChem = 0
          for(let i = 0; i < tr[0].length; i++){
            if(tr[0][i].render == true){
              countChem = countChem+1
            }else{
              countChem = countChem
            }
          }

          var countMicro = 0
          for(let i = 0; i < tr[1].length; i++){
            if(tr[1][i].coa == true){
              countMicro = countMicro+1
            }else{
              countMicro = countMicro
            }
          }
          setScore(countChem+countMicro)

          var testedScore = 0
          for(let i = 0; i < tr[0].length; i++){
            if(tr[0][i].coa == true){
                testedScore = testedScore+1
            }else{
                testedScore = testedScore
            }
          }
          setscoreTested(testedScore+5)
        }
    },[orders,bio,tr]) 

    const handleExport = () => {
        console.log('count : ', score)
        console.log('testedScore : ', scoreTested)
        if(scoreTested == score){
          toggleCOA()
        }else{
          setconfirm_alert(true)
        }
    }

    function printPDF(){
    
      var docDefinition = {
        // header: {
        //   columns: [
        //     { text: 'HEADER LEFT', style: 'documentHeaderLeft' },
        //     { text: 'HEADER CENTER', style: 'documentHeaderCenter' },
        //     { text: 'HEADER RIGHT', style: 'documentHeaderRight' }
        //   ]
        // },
        // footer: {
        //   columns: [
        //     { text: 'FOOTER LEFT', style: 'documentFooterLeft' },
        //     { text: 'FOOTER CENTER', style: 'documentFooterCenter' },
        //     { text: 'FOOTER RIGHT', style: 'documentFooterRight' }
        //   ]
        // },
        content: [
            // Header
            {
                columns: [
                    {
                          image: 'https://jaw.sgp1.digitaloceanspaces.com/Logo-RFS.jpg' ,
                           width: 150
                    },
                        
                    [
                        {
                            text: 'INVOICE', 
                            style: 'invoiceTitle',
                            width: '*'
                        },
                        {
                          stack: [
                               {
                                   columns: [
                                        {
                                            text:'Invoice #', 
                                            style:'invoiceSubTitle',
                                            width: '*'
                                            
                                        }, 
                                        {
                                            text:'00001',
                                            style:'invoiceSubValue',
                                            width: 100
                                            
                                        }
                                        ]
                               },
                               {
                                   columns: [
                                       {
                                           text:'Date Issued',
                                           style:'invoiceSubTitle',
                                           width: '*'
                                       }, 
                                       {
                                           text:'June 01, 2016',
                                           style:'invoiceSubValue',
                                           width: 100
                                       }
                                       ]
                               },
                               {
                                   columns: [
                                       {
                                           text:'Due Date',
                                           style:'invoiceSubTitle',
                                           width: '*'
                                       }, 
                                       {
                                           text:'June 05, 2016',
                                           style:'invoiceSubValue',
                                           width: 100
                                       }
                                       ]
                               },
                           ]
                        }
                    ],
                ],
            },
            // Billing Headers
            {
                columns: [
                    {
                        text: 'Billing From',
                        style:'invoiceBillingTitle',
                        
                    },
                    {
                        text: 'Billing To',
                        style:'invoiceBillingTitle',
                        
                    },
                ]
            },
            // Billing Details
            {
                columns: [
                    {
                        text: 'Your Name \n Your Company Inc.',
                        style: 'invoiceBillingDetails'
                    },
                    {
                        text: 'Client Name \n Client Company',
                        style: 'invoiceBillingDetails'
                    },
                ]
            },
            // Billing Address Title
            {
                columns: [
                    {
                        text: 'Address',
                        style: 'invoiceBillingAddressTitle'
                    },
                    {
                        text: 'Address',
                        style: 'invoiceBillingAddressTitle'
                    },
                ]
            },
            // Billing Address
            {
                columns: [
                    {
                        text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
                        style: 'invoiceBillingAddress'
                    },
                    {
                        text: '1111 Other street 25 \n New-York City NY 00000 \n   USA',
                        style: 'invoiceBillingAddress'
                    },
                ]
            },
              // Line breaks
            '\n\n',
            // Items
              {
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,
                  widths: [ '*', 40, 'auto', 40, 'auto', 80 ],
          
                  body: [
                    // Table Header
                    [ 
                        {
                            text: 'Product',
                            style: 'itemsHeader'
                        }, 
                        {
                            text: 'Qty',
                            style: [ 'itemsHeader', 'center']
                        }, 
                        {
                            text: 'Price',
                            style: [ 'itemsHeader', 'center']
                        }, 
                        {
                            text: 'Tax',
                            style: [ 'itemsHeader', 'center']
                        }, 
                        {
                            text: 'Discount',
                            style: [ 'itemsHeader', 'center']
                        }, 
                        {
                            text: 'Total',
                            style: [ 'itemsHeader', 'center']
                        } 
                    ],
                    // Items
                    // Item 1
                    [ 
                        [
                            {
                                text: 'Item 1',
                                style:'itemTitle'
                            },
                            {
                                text: 'Item Description',
                                style:'itemSubTitle'
                                
                            }
                        ], 
                        {
                            text:'1',
                            style:'itemNumber'
                        }, 
                        {
                            text:'$999.99',
                            style:'itemNumber'
                        }, 
                        {
                            text:'0%',
                            style:'itemNumber'
                        }, 
                        {
                            text: '0%',
                            style:'itemNumber'
                        },
                        {
                            text: '$999.99',
                            style:'itemTotal'
                        } 
                    ],
                    // Item 2
                    [ 
                        [
                            {
                                text: 'Item 2',
                                style:'itemTitle'
                            }, 
                            {
                                text: 'Item Description',
                                style:'itemSubTitle'
                                
                            }
                        ], 
                        {
                            text:'1',
                            style:'itemNumber'
                        }, 
                        {
                            text:'$999.99',
                            style:'itemNumber'
                        }, 
                        {
                            text:'0%',
                            style:'itemNumber'
                        }, 
                        {
                            text: '0%',
                            style:'itemNumber'
                        },
                        {
                            text: '$999.99',
                            style:'itemTotal'
                        } 
                    ],
                    // END Items
                  ]
                }, // table
              //  layout: 'lightHorizontalLines'
              },
           // TOTAL
              {
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 0,
                  widths: [ '*', 80 ],
          
                  body: [
                    // Total
                    [ 
                        {
                            text:'Subtotal',
                            style:'itemsFooterSubTitle'
                        }, 
                        { 
                            text:'$2000.00',
                            style:'itemsFooterSubValue'
                        }
                    ],
                    [ 
                        {
                            text:'Tax 21%',
                            style:'itemsFooterSubTitle'
                        },
                        {
                            text: '$523.13',
                            style:'itemsFooterSubValue'
                        }
                    ],
                    [ 
                        {
                            text:'TOTAL',
                            style:'itemsFooterTotalTitle'
                        }, 
                        {
                            text: '$2523.93',
                            style:'itemsFooterTotalValue'
                        }
                    ],
                  ]
                }, // table
                layout: 'lightHorizontalLines'
              },
            // Signature
            {
                columns: [
                    {
                        text:'',
                    },
                    {
                        stack: [
                            { 
                                text: '_________________________________',
                                style:'signaturePlaceholder'
                            },
                            { 
                                text: 'Your Name',
                                style:'signatureName'
                                
                            },
                            { 
                                text: 'Your job title',
                                style:'signatureJobTitle'
                                
                            }
                            ],
                       width: 180
                    },
                ]
            },
              { 
                  text: 'NOTES',
                  style:'notesTitle'
              },
              { 
                  text: 'Some notes goes here \n Notes second line',
                  style:'notesText'
              }
        ],
        styles: {
            // Document Header
            documentHeaderLeft: {
                fontSize: 10,
                margin: [5,5,5,5],
                alignment:'left'
            },
            documentHeaderCenter: {
                fontSize: 10,
                margin: [5,5,5,5],
                alignment:'center'
            },
            documentHeaderRight: {
                fontSize: 10,
                margin: [5,5,5,5],
                alignment:'right'
            },
            // Document Footer
            documentFooterLeft: {
                fontSize: 10,
                margin: [5,5,5,5],
                alignment:'left'
            },
            documentFooterCenter: {
                fontSize: 10,
                margin: [5,5,5,5],
                alignment:'center'
            },
            documentFooterRight: {
                fontSize: 10,
                margin: [5,5,5,5],
                alignment:'right'
            },
            // Invoice Title
          invoiceTitle: {
            fontSize: 22,
            bold: true,
            alignment:'right',
            margin:[0,0,0,15]
          },
          // Invoice Details
          invoiceSubTitle: {
            fontSize: 12,
            alignment:'right'
          },
          invoiceSubValue: {
            fontSize: 12,
            alignment:'right'
          },
          // Billing Headers
          invoiceBillingTitle: {
            fontSize: 14,
            bold: true,
            alignment:'left',
            margin:[0,20,0,5],
          },
          // Billing Details
          invoiceBillingDetails: {
            alignment:'left'
      
          },
          invoiceBillingAddressTitle: {
              margin: [0,7,0,3],
              bold: true
          },
          invoiceBillingAddress: {
              
          },
          // Items Header
          itemsHeader: {
              margin: [0,5,0,5],
              bold: true
          },
          // Item Title
          itemTitle: {
              bold: true,
          },
          itemSubTitle: {
                  italics: true,
                  fontSize: 11
          },
          itemNumber: {
              margin: [0,5,0,5],
              alignment: 'center',
          },
          itemTotal: {
              margin: [0,5,0,5],
              bold: true,
              alignment: 'center',
          },
      
          // Items Footer (Subtotal, Total, Tax, etc)
          itemsFooterSubTitle: {
              margin: [0,5,0,5],
              bold: true,
              alignment:'right',
          },
          itemsFooterSubValue: {
              margin: [0,5,0,5],
              bold: true,
              alignment:'center',
          },
          itemsFooterTotalTitle: {
              margin: [0,5,0,5],
              bold: true,
              alignment:'right',
          },
          itemsFooterTotalValue: {
              margin: [0,5,0,5],
              bold: true,
              alignment:'center',
          },
          signaturePlaceholder: {
              margin: [0,70,0,0],   
          },
          signatureName: {
              bold: true,
              alignment:'center',
          },
          signatureJobTitle: {
              italics: true,
              fontSize: 10,
              alignment:'center',
          },
          notesTitle: {
            fontSize: 10,
            bold: true,  
            margin: [0,50,0,3],
          },
          notesText: {
            fontSize: 10
          },
          center: {
              alignment:'center',
          },
        },
        defaultStyle: {
          columnGap: 20,
        }
        
      }
      pdfMake.createPdf(docDefinition).open({},  window.frames['printPdf'])
    }

    return(
                    <Modal
                      isOpen={isOpen}
                      toggle={toggle}
                      centered={true}
                      size="lg"
                    >
                  {confirm_alert ? (
                    <SweetAlert
                      title="Take Your Token!"
                      warning
                      showCancel
                      confirmButtonText="Yes, delete it!"
                      confirmBtnBsStyle="success"
                      cancelBtnBsStyle="danger"
                      onConfirm={() => {
                        setconfirm_alert(false)
                      }}
                      onCancel={() => setconfirm_alert(false)}
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </SweetAlert>
                  ) : null}

                      <div className="modal-header">
                        <h3 className="modal-title mt-0">Order : {detailById.PO}
                        </h3>
                        <button
                          type="button"
                          onClick={toggle}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <Row>
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                            <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>LOT</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>PORD: {Moment(detailById.PORD).format('DD/MM/YYYY')}<br/>BBE    : {Moment(detailById.PORD).format('DD/MM/YYYY')}</span>
                              </div>
                            </div>
                          </Col>
                
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Order Numder</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.PO}</span>
                              </div>
                            </div>
                          </Col>

                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Product Name</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.ProductName}</span>
                              </div>
                            </div>
                          </Col>

                          <Col md="6" xs="12"  style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Pack Size</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.Size}</span>
                              </div>
                            </div>
                          </Col>

                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Quantity</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.Quantity}</span>
                              </div>
                            </div>
                          </Col>
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Specific</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.name}</span>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <hr/>
                        {/* Chemical analysis */}
                        <Row>
                            <Col xs="12" style={{border:'solid 1px #989a9b', borderRadius:'10px',
                                height:'100%', background:'transparent', display:'flex', flexDirection:'column',
                                justifyContent:'center', alignItems:'center',padding:'10px'
                            }}>
                                <h5 style={{borderBottom:'solid 1px #989a9b'}}>Chemical analysis</h5>
                                <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12">
                                    <h6>{" "}</h6>
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
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    <h6>Int. spec</h6>
                                </Col>
            
                                <Col xs="6">
                                    <h6>COA spec</h6>
                                </Col>
                                </Col>
                                </Row>

                                {resultChem.map((index, key) => {
                                        {if(index.render > 0){ 
                                return (
                                    <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12" style={{display:'flex', justifyContent:'flex-start', paddingLeft:'30%'}}>
                                    <h6>{index.key}</h6>
                                    </Col>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>{JSON.stringify(index.val)}</h6>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>{index.temp}</h6>
                                </div>
                                </Col>
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    {index.int ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
            
                                <Col xs="6">
                                {index.coa ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
                                </Col>
                                </Row>
                                        )}
                                    return (null)
                                    }
                                    
                                })}

                            </Col>
                        </Row>
                        <br/>

                        {/* Microbiological analysis */}
                        <Row>
                            <Col xs="12" style={{border:'solid 1px #989a9b', borderRadius:'10px',
                                height:'100%', background:'transparent', display:'flex', flexDirection:'column',
                                justifyContent:'center', alignItems:'center',padding:'10px'
                            }}>
                                <h5 style={{borderBottom:'solid 1px #989a9b'}}>Microbiological analysis</h5>
                                <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12">
                                    <h6>{" "}</h6>
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
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    <h6>Int. spec</h6>
                                </Col>
            
                                <Col xs="6">
                                    <h6>COA spec</h6>
                                </Col>
                                </Col>
                                </Row>

                                {resultMicro.map((index, key) => (
                                <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12" style={{display:'flex', justifyContent:'flex-start', paddingLeft:'30%'}}>
                                    <h6>{index.key}</h6>
                                    </Col>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>{JSON.stringify(index.val)}</h6>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>{" "}</h6>
                                </div>
                                </Col>
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    {index.int ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
            
                                <Col xs="6">
                                {index.coa ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
                                </Col>
                                </Row>
                                    ))}
                            </Col>
                        </Row>
                        
                      
                      </div>
                      <ModalFooter>
                          <Button color="primary" onClick={() => {
                            handleExport()
                            // toggleCOA()
                          }}>EXPORT</Button>{' '}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>   
    )
}

ModalDetail.propTypes = {
    orders: PropTypes.array,
    spc: PropTypes.array,
    tr: PropTypes.array,
    bio: PropTypes.array
  }
  
  const mapStateToProps = state => ({
    orders: state.DetailOrder.Detail,
    spc: state.DetailOrder.SpecificChem,
    tr: state.DetailOrder.TestResultLasted,
    bio:  state.DetailOrder.SpecificBio,
  })

  export default connect(mapStateToProps)(withRouter(ModalDetail))