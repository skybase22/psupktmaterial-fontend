
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import { firebase } from '../../firebase'

import Page from '../page'


class History extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      sortAction: "แสดงทั้งหมด",
      dateUpdate: "",
      result: "",
      data: [],
      dataMaterial: [],
      dataForSelect: [],
      error: false,
      isDataFetched: false,
      inputSearch: "",
      allData: [],
      allDataHistory: [],
      errorMessage: "",
      urlQRCode: {},
      urlQR: "",
      pageNow: 1,
      max_per_page: 10,
      counter: 0,
      counterHistory: 0,
      dateBefore: "",
      dateAfter: "",
      isFetchLastNumber: false,
      lastNumber: null,
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
      image: null,
      imageURL: "",
      selectModal: false,
      dataForSearchDate: [],
      dateUpdateDetail: "",
      departmentDetail: "",
      durableCodeDetail: "",
      idDetail: "",
      idMaterialDetail: "",
      materialStatusDetail: "",
      nameDetail: "",
      resultDetail: "",
      listMaterialDetail: "",
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.fetchDataHistory()
      } else {
        this.props.history.push('/auth/login')
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchDataHistory = () => {
    let database = firebase.database().ref("Result/")
    // let database2 = firebase.database().ref("Result2/")
    database.once('value', async (snapshot) => {
      if (snapshot.exists()) {
        let arr = []
        snapshot.forEach((data) => {
          arr.push({
            id: data.val().id,
            idMaterial: data.val().idMaterial,
            result: data.val().result,
            listMaterial: data.val().listMaterial,
            durableCode: data.val().durableCode,
            materialStatus: data.val().materialStatus,
            department: data.val().department,
            dateUpdate: data.val().dateUpdate,
            dateUpdateValue: data.val().dateUpdateValue,
            name: data.val().name,
          })
          // var numberPath = data.val().id.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')
          // var firebaseRef = firebase.database().ref("Result/" + numberPath);
          // let date = new Date()
          // firebaseRef.set({
          //   id: data.val().id,
          //   idMaterial: data.val().idMaterial,
          //   result: data.val().result,
          //   listMaterial: data.val().listMaterial,
          //   durableCode: data.val().durableCode,
          //   materialStatus: data.val().materialStatus,
          //   department: data.val().department,
          //   dateUpdate: date.getFullYear() + '-' +
          //     ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' +
          //     (date.getDate() < 10 ? ("0" + date.getDate()) : (date.getDate()))
          //     + ' ' + (date.getHours() < 10 ? ("0" + date.getHours()):(date.getHours())) + ':' + 
          //     (date.getMinutes() < 10 ? ("0" + date.getMinutes()):(date.getMinutes())) + ':' + 
          //     (date.getSeconds() < 10 ? ("0" + date.getSeconds()):(date.getSeconds())),
          //   dateUpdateValue: date.getFullYear() + '-' +
          //     ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' +
          //     (date.getDate() < 10 ? ("0" + date.getDate()) : (date.getDate())),
          //   name: data.val().name,
          //   // dateUpdate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
          // }).then(() => {
          //   console.log("success")
          // })
        })


        await this.setState({ allDataHistory: arr })
        this.setState({
          counterHistory: this.state.allDataHistory.length
        })
        let arr2 = arr.sort((a, b) => {
          return parseInt(b.id) - parseInt(a.id)
        })
        await this.setState({
          data: arr2,
          dataForSearch: arr2,
          dataForSelect: arr2,
          isDataFetched: true
        })
      } else {
        this.setState({ error: true })
      }
    }).then(() => {
    })

    // database2.once('value', async (snapshot) => {
    //   if (snapshot.exists()) {
    //     let arr = []
    //     snapshot.forEach((data) => {
    //       arr.push({
    //         id: data.val().id,
    //         idMaterial: data.val().idMaterial,
    //         result: data.val().result,
    //         listMaterial: data.val().listMaterial,
    //         durableCode: data.val().durableCode,
    //         materialStatus: data.val().materialStatus,
    //         department: data.val().department,
    //         dateUpdate: data.val().dateUpdate,
    //         name: data.val().name,
    //       })
    //       let splDate = data.val().dateUpdate.split(" ")
    //       console.log("spl", splDate);
    //     })


    //     await this.setState({ allDataHistory: arr })
    //     this.setState({
    //       counterHistory: this.state.allDataHistory.length
    //     })
    //     let arr2 = arr.sort((a, b) => {
    //       return parseInt(b.id) - parseInt(a.id)
    //     })
    //     await this.setState({
    //       data: arr2,
    //       dataForSearch: arr2,
    //       dataForSelect: arr2,
    //       isDataFetched: true
    //     })
    //   } else {
    //     this.setState({ error: true })
    //   }
    // }).then(() => {
    // console.log("fr", this.state.allDataHistory);

    // })

  }

  // fetchDataMaterial = () => {
  //   let database = firebase.database().ref("myURL");
  //   database.once('value', async (snapshot) => {
  //     if (snapshot.exists()) {
  //       let arr = []
  //       snapshot.forEach((data) => {
  //         arr.push({
  //           id: data.val().id,
  //           value: `https://psupktmaterial.firebaseapp.com/material/detail?id=${data.key}`,
  //           listMaterial: data.val().listMaterial,
  //           attribute: data.val().attribute,
  //           company: data.val().company,
  //           dateAccept: data.val().dateAccept,
  //           durableCode: data.val().durableCode,
  //           materialStatus: data.val().materialStatus,
  //           namePickUp: data.val().namePickUp,
  //           price: data.val().price,
  //           numberPieces: data.val().numberPieces,
  //           serialNumber: data.val().serialNumber,
  //           storageLocation: data.val().storageLocation,
  //           department: data.val().department,
  //           imageURL: data.val().imageURL,
  //           other: data.val().other
  //         })
  //       });

  //       await this.setState({ allData: arr })

  //       let arr2 = arr.sort((a, b) => {
  //         return parseInt(b.id) - parseInt(a.id)
  //       })
  //       this.setState({
  //         dataMaterial: arr2,
  //         isDataFetched: true,
  //       })
  //     } else {
  //       this.setState({ error: true })
  //     }
  //   })
  // }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">History Material</h3>
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

                      <Page table="History" allData={this.state.allDataHistory} />

                    </div>
                    ) :
                    (
                      <div>
                        <Row>
                          {/* <div> */}
                          <div className="col" style={{}} lg="3" md="12">
                            <Form style={{ padding: "0px 20px 20px 20px", minWidth: "250px", maxWidth: "400px" }} >
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
                          <div className="col-auto" style={{}} lg="3" md="6">
                            <Form style={{ padding: "0px 20px 20px 20px", minWidth: "250px" }} >
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
                          <div className="icon icon-shape rounded-circle shadow">
                            <i className="fas fa-arrow-circle-right" style={{ height: "25px" }} />
                          </div>
                          <div className="col-auto" style={{}} lg="3" md="6">
                            <Form style={{ padding: "0px 20px 20px 20px", minWidth: "250px" }} >
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
                              <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">คณะ/หน่วยงาน</th>
                              <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รายการ</th>
                              <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รหัสครุภัณฑ์</th>
                              <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ผลการตรวจ</th>
                              <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">วันที่ตรวจ</th>
                              <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ผู้ตรวจ</th>
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
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            </tr>
                            <tr >
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
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
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            </tr>
                            <tr >
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
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
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            </tr>
                            <tr >
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
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
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            </tr>
                            <tr >
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
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
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
                            </tr>
                            <tr >
                              <th style={{ minHeight: "80px", paddingTop: "40px" }}><Progress animated color="info" value="100" /></th>
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
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default History;
