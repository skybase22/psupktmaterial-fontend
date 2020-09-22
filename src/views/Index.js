
import React from "react";

import { firebase } from '../firebase'
import ReactExport from "react-export-excel"
import Page from './page.js'

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Form, FormGroup, Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Table,
  Progress,

} from "reactstrap";


import Header from "components/Headers/Header.js";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      data: [],
      error: false,
      isDataFetched: false,
      // inputSearch: "",
      allData: [],
      errorMessage: "",
      urlQRCode: {},
      urlQR: "",
      pageNow: 1,
      max_per_page: 10,
      counter: 0,
      // dateBefore: "",
      // dateAfter: "",
      isFetchLastNumber: false,
      lastNumber: null,
      isFetchLastLog: false,
      lastLog: null,
      durableCode: "",
      listMaterial: "",
      attribute: "",
      serialNumber: "",
      materialStatus: "",
      price: "",
      storageLocation: "",
      numberPieces: "",
      dateAccept: "",
      namePickUp: "",
      company: "",
      department: "-",
      other: "",
      lastResult: "",
      // image: null,
      imageURL: "",
      // selectModal: false,
      // dataForSearchDate: []
      allCounter: 0,
      newMaterial: "",
      _isMounted: true,
      setDateUpdate: "",
    };
  }

  componentDidMount = () => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.fetchDataInIndex()
      } else {
        this.props.history.push('/auth/login')
      }
    })
    return () => {
      this._isMounted.current = false;
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchDataInIndex = () => {
    let arr = []
    let database = firebase.database().ref("myMaterial");
    database.once('value', async (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data) => {
          arr.push({
            id: data.val().id,
            value: data.val().value,
            listMaterial: data.val().listMaterial,
            attribute: data.val().attribute,
            company: data.val().company,
            dateAccept: data.val().dateAccept,
            durableCode: data.val().durableCode,
            materialStatus: data.val().materialStatus,
            namePickUp: data.val().namePickUp,
            price: data.val().price,
            numberPieces: data.val().numberPieces,
            serialNumber: data.val().serialNumber,
            storageLocation: data.val().storageLocation,
            department: data.val().department,
            imageURL: data.val().imageURL,
            other: data.val().other,
            dateUpdate: data.val().dateUpdate
          })
          // var numberPath = data.val().id.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')
          // console.log("nu", data.val().listMaterial);
          // var myImg = ""
          // data.val().imageURL === undefined ? (myImg = "") : (myImg = data.val().imageURL) 
          // var firebaseRef = firebase.database().ref("myMaterial/" + numberPath);
          // var date = new Date()

          // firebaseRef.set({
          //   id: data.val().id,
          //   value: `https://psupktmaterial.firebaseapp.com/material/detail?id=${data.key}`,
          //   listMaterial: data.val().listMaterial,
          //   attribute: data.val().attribute,
          //   company: data.val().company,
          //   dateAccept: data.val().dateAccept,
          //   durableCode: data.val().durableCode,
          //   materialStatus: data.val().materialStatus,
          //   namePickUp: data.val().namePickUp,
          //   price: data.val().price,
          //   numberPieces: data.val().numberPieces,
          //   serialNumber: data.val().serialNumber,
          //   storageLocation: data.val().storageLocation,
          //   department: data.val().department,
          //   imageURL: myImg,
          //   other: data.val().other,
          //   dateUpdate: {
          //     day:(date.getDate() < 10 ? ("0" + date.getDate()) : (date.getDate())),
          //     month:((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)),
          //     year:date.getFullYear(),
          //     time:(date.getHours() < 10 ? ("0" + date.getHours()):(date.getHours())) + ':' + 
          //     (date.getMinutes() < 10 ? ("0" + date.getMinutes()):(date.getMinutes())) + ':' + 
          //     (date.getSeconds() < 10 ? ("0" + date.getSeconds()):(date.getSeconds())),
          //   },
          //   // dateUpdate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
          // }).then(() => {
          //   console.log("success")
          // })
        })
      } else {
        this.setState({ error: true })
      }
    }).then(() => {
      this.setState({
        counter: this.state.allData.length,
        allCounter: arr.length,
        allData: arr
      })

      let arr2 = arr.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id)
      })
      this.setState({
        data: arr2,
        newMaterial: arr2[0],
        // dataForSearchDate: arr2,
        isDataFetched: true,
      })
    })
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <div className="header-body">
            <Row>
              <Col >
                <Card style={{ minHeight: "150px", minWidth: "300px" }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Number Material
                          </CardTitle>
                        {this.state.allCounter === 0 ? (
                          <Progress animated style={{ maxWidth: "40%", marginTop: "2rem" }} striped color="dark" value={100} />
                        ) : (
                            <div style={{ marginBottom: "10px" }} className="mt-3">
                              <span className="h2 font-weight-bold">
                                {this.state.allCounter} รายการ
                              </span>
                            </div>
                          )}

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-cogs" />
                        </div>
                      </Col>
                    </Row>
                    <Row>

                      <Col lg="3" md="6">
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-info">
                            <i className="fa fa-arrow-up" /> last update at
                        </span>{" "}
                        </p>
                      </Col>
                      <Col lg="9" md="6">
                        <div className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">

                            {this.state.isDataFetched ? (<span className="text-nowrap">
                              {this.state.newMaterial.dateUpdate.year}-{this.state.newMaterial.dateUpdate.month}-{this.state.newMaterial.dateUpdate.day}

                            </span>) : (<Progress animated style={{ maxWidth: "30%", marginTop: "1.5rem" }} striped color="light" value={100} />
                              )}
                          </span>
                        </div>
                      </Col>

                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col >
                <Card style={{ minHeight: "150px", minWidth: "300px" }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New Material
                          </CardTitle>
                        {this.state.newMaterial !== "" ? (
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.newMaterial.listMaterial}
                          </span>
                        ) : (
                            <Progress animated style={{ maxWidth: "40%", marginTop: "1rem" }} striped color="dark" value={100} />
                          )}

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-wrench" />
                        </div>
                      </Col>
                    </Row>
                    {this.state.newMaterial !== "" ? (
                      <span className="text-nowrap">{this.state.newMaterial.durableCode}</span>
                    ) : (
                        <Progress className="mt--1" animated style={{ maxWidth: "60%", marginTop: "1rem" }} striped color="gray" value={100} />
                      )}
                    <Row>
                      {this.state.newMaterial !== "" ? (
                        <>
                          <Col lg="2">
                            <p className="mt-3 mb-0 text-muted text-sm">
                              {this.state.newMaterial.materialStatus === "ปกติ" ? (
                                <>
                                  <span className="text-success">
                                    <i className="fa fa-check" /> {this.state.newMaterial.materialStatus}
                                  </span>{" "}
                                </>
                              ) : this.state.newMaterial.materialStatus === "ชำรุด" ? (
                                <>
                                  <span className="text-danger">
                                    <i className="fa fa-times" /> {this.state.newMaterial.materialStatus}
                                  </span>{" "}
                                </>
                              ) : this.state.newMaterial.materialStatus === "รอจำหน่าย" ? (
                                <>
                                  <span className="text-warning">
                                    <i className="fa fa-shopping-cart" aria-hidden="true" /> {this.state.newMaterial.materialStatus}
                                  </span>{" "}
                                </>
                              ) : this.state.newMaterial.materialStatus === "โอนย้าย" ? (
                                <>
                                  <span className="text-info">
                                    <i className="fa fa-share-square" /> {this.state.newMaterial.materialStatus}
                                  </span>{" "}
                                </>
                              ) : (
                                        <>
                                          <span className="text-primary">
                                            <i className="fa fa-comment" /> {this.state.newMaterial.materialStatus}
                                          </span>{" "}
                                        </>
                                      )}
                            </p>
                          </Col>
                          <Col lg="9">
                            <p className="mt-3 ml-3 mb-0 text-muted text-sm">
                              <span className="text-nowrap">{this.state.newMaterial.dateAccept}</span>
                            </p>
                          </Col>
                        </>
                      ) : (
                          <>
                            <Col className="mb--3" lg="3">
                              <Progress animated style={{ maxWidth: "60%", marginTop: "1rem" }} striped color="primary" value={100} />

                            </Col>
                            <Col lg="9">
                              <Progress animated style={{ maxWidth: "30%", marginTop: "1rem" }} striped color="light" value={100} />

                            </Col>
                          </>
                        )}



                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>

        <Container fluid >
          <Row className="mt-5">
            <Col className=" mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col lg="12">
                      <div className="d-flex justify-content-between">
                      <div>
                      <h2 className="mb-0">List Material</h2>
                      </div>
                      <div >
                          <ExcelFile element={<button className="btn btn-outline-primary">Download Data</button>}>
                            <ExcelSheet data={this.state.allData} name="Employees">
                              <ExcelColumn label="ID" value="id" />
                              <ExcelColumn label="รหัสครุภัณฑ์" value="durableCode" />
                              <ExcelColumn label="รายการ" value="listMaterial" />
                              <ExcelColumn label="คณะ/หน่วยงาน" value="department" />
                              <ExcelColumn label="ลักษณะ" value="attribute" />
                              <ExcelColumn label="หมายเลขเครื่อง" value="serialNumber" />
                              <ExcelColumn label="ราคา" value="price" />
                              <ExcelColumn label="จำนวน" value="numberPieces" />
                              <ExcelColumn label="วันที่ตรวจรับ" value="dateAccept" />
                              {/* <ExcelColumn label="วันที่อัปเดต" value="dateUpdate" /> */}
                              <ExcelColumn label="ชื่อผู้เบิกครภัณฑ์" value="namePickUp" />
                              <ExcelColumn label="บริษัท" value="company" />
                              <ExcelColumn label="สถานที่เก็บ" value="storageLocation" />
                              <ExcelColumn label="สถานะครุภัณฑ์" value="materialStatus" />
                              <ExcelColumn label="ลิงค์รูปภาพ" value="imageURL" />
                              <ExcelColumn label="url" value="value" />
                              <ExcelColumn label="อื่น ๆ" value="other" />
                            </ExcelSheet>
                          </ExcelFile>
                      </div>
                      </div>
                      
                    </Col>
                  </Row>
                </CardHeader>
                {this.state.error ?
                  (
                    <div style={{ marginTop: "21.56%", marginBottom: "21.56%" }} >
                      <center>ไม่สามารถึงข้อมูลได้เนื่องจากมีข้อผิดพลาดเกิดขึ้น!</center>
                    </div>
                  ) :
                  this.state.isDataFetched ? this.state.data === [] ?
                    (
                      <div style={{ marginTop: "21.56%", marginBottom: "21.56%" }} >
                        <center>ไม่มีข้อมูล</center>
                      </div>
                    )
                    :
                    (<div>

                      <Page table="Index" allData={this.state.allData} />

                    </div>
                    ) :
                    (<div >
                      <Row style={{ padding: "0px 20px 20px 20px", }} >
                        {/* <div> */}
                        <div className="col" style={{marginTop: "10px" }} lg="3" md="12">
                          <Form style={{ minWidth: "250px", maxWidth: "400px" }} >
                            <FormGroup className="mb-0">
                              <InputGroup className="form-control-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fas fa-search" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text" />
                              </InputGroup>
                            </FormGroup>
                          </Form>
                        </div>
                        <div style={{marginTop: "10px" }} className="col-auto" lg="3" md="6">
                          <Form style={{ minWidth: "250px" }} >
                            <FormGroup className="mb-0">
                              <InputGroup className="form-control-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i style={{ cursor: "pointer" }} className="fas fa-calendar" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="date" type="date" />
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i style={{ cursor: "pointer" }} className="fas fa-times" />
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                          </Form>
                        </div>
                        <div style={{ height: "25px", marginTop: "21px" }} className="icon icon-shape">
                          <i className="fas fa-arrow-circle-right" />
                        </div>
                        <div style={{marginTop: "10px" }} className="col-auto" lg="3" md="6">
                          <Form style={{ minWidth: "250px" }} >
                            <FormGroup className="mb-0">
                              <InputGroup className="form-control-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fas fa-calendar" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="date" type="date" />
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fas fa-times" />
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                          </Form>
                        </div>
                      </Row>
                      <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ID</th>
                            <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รายการ</th>
                            <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รหัสครุภัณฑ์</th>
                            <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">สถานะ</th>
                            <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">วันที่เบิกครุภัณฑ์</th>
                            <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ชื่อผู้เบิกครุภัณฑ์</th>
                          </tr>

                        </thead>
                        <tbody>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                          <tr >
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    )
                }
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
