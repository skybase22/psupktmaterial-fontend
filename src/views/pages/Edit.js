import React from "react";
import { Link } from "react-router-dom"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
  CustomInput,
  ListGroupItem,
  CardTitle,
  Alert,
  buttonLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
// mapTypeId={google.maps.MapTypeId.ROADMAP}
import { firebase } from '../../firebase'

class Edit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      error: false,
      isDataFetched: false,
      inputSearch: "",
      allData: [],
      errorMessage: "",
      urlQRCode: {},
      urlQR: "",
      pageNow: 1,
      max_per_page: 10,
      counter: 0,
      dateBefore: "",
      dateAfter: "",
      isFetchLastNumber: false,
      lastNumber: 0,
      durableCode: "",
      listMaterial: "",
      attribute: "",
      serialNumber: "",
      materialStatus: "ปกติ",
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
      selectMaterial: "",
      visible: false,
      success: "",
      id: "",
      value: "",
      modalDelete: false,
    }
  }

  componentDidMount = async () => {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getNumberFirebase()
        if (this.props.history.location.search.startsWith('?id=')) {
          let query = this.props.history.location.search.split('?id=')
          this.setState({
            urlQR: "https://psupktmaterial.herokuapp.com/material/detail?id=" + query[1]
          })
          firebase.database().ref("myMaterial/" + query[1]).once('value', async (snapshot) => {
            if (snapshot.exists()) {
              await this.setState({
                keyData: query[1],
                id: snapshot.val().id,
                listMaterial: snapshot.val().listMaterial,
                durableCode: snapshot.val().durableCode,
                attribute: snapshot.val().attribute,
                serialNumber: snapshot.val().serialNumber,
                materialStatus: snapshot.val().materialStatus,
                price: snapshot.val().price,
                storageLocation: snapshot.val().storageLocation,
                numberPieces: snapshot.val().numberPieces,
                dateAccept: snapshot.val().dateAccept,
                namePickUp: snapshot.val().namePickUp,
                company: snapshot.val().company,
                department: snapshot.val().department,
                other: snapshot.val().other,
                imageURL: snapshot.val().imageURL,
                dateUpdate: snapshot.val().dateUpdate,
                value: snapshot.val().value
              })
            } else {
            }
          })
        }
      } else {
        this.props.history.push('/auth/login')
      }
    })
  }

  toggleModalDelete = () => {
    this.setState({
      modalDelete: !this.state.modalDelete
    })
  }

  getNumberFirebase = () => {
    firebase.database().ref("listNumber").once('value', async (snapshot) => {
      if (snapshot.exists()) {
        await this.setState({ lastNumber: parseInt(snapshot.val().number) })
      } else {
        await this.setState({ error: true })
      }
    })

    firebase.database().ref("listResult").once('value', async (snapshot) => {
      if (snapshot.exists()) {
        await this.setState({ lastResult: parseInt(snapshot.val().number) })
      } else {
        await this.setState({ error: true })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value })

  }

  handleImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState(() => ({ image }))
    }
  }

  handleInputOther = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    this.setState({ materialStatus: "อื่น ๆ" })
  }

  getMaterial = async () => {
    if (this.state.selectMaterial !== "") {
      let query = this.state.selectMaterial
      this.setState({
        urlQR: "https://psupktmaterial.herokuapp.com/material/detail?id=" + query
      })
      firebase.database().ref("myMaterial/" + query).once('value', async (snapshot) => {
        if (snapshot.exists()) {
          this.setState({ keyData: query })
          this.setState({
            id: snapshot.val().id,
            listMaterial: snapshot.val().listMaterial,
            durableCode: snapshot.val().durableCode,
            attribute: snapshot.val().attribute,
            serialNumber: snapshot.val().serialNumber,
            materialStatus: snapshot.val().materialStatus,
            price: snapshot.val().price,
            storageLocation: snapshot.val().storageLocation,
            numberPieces: snapshot.val().numberPieces,
            dateAccept: snapshot.val().dateAccept,
            namePickUp: snapshot.val().namePickUp,
            company: snapshot.val().company,
            department: snapshot.val().department,
            other: snapshot.val().other,
            imageURL: snapshot.val().imageURL,
            dateUpdate: snapshot.val().dateUpdate,
            value: snapshot.val().value
          })
        } else {
          console.log("err");
        }
      })
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log("err", error);
        })
    }
  }

  onUpdate = async (event) => {
    const { image } = this.state
    if (image != null) {
      const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image)
      uploadTask.on('state_changed',
        (snapshot) => {

        },
        error => {
          console.log(error)
        },
        () => {
          firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {
            this.setState({
              imageURL: url
            }, () => {
              this.onUpdate2()
            })
          })
        }
      )
    } else {
      this.onUpdate2()
    }
  }

  onUpdate2 = async (event) => {
    if (this.state.durableCode !== "" && this.state.id !== "") {
      let newResult = this.state.lastResult + 1
      await firebase.database().ref("myMaterial/" + this.state.id).set({
        id: this.state.id,
        durableCode: this.state.durableCode,
        listMaterial: this.state.listMaterial,
        attribute: this.state.attribute,
        serialNumber: this.state.serialNumber,
        materialStatus: this.state.materialStatus,
        price: this.state.price,
        storageLocation: this.state.storageLocation,
        numberPieces: this.state.numberPieces,
        dateAccept: this.state.dateAccept,
        namePickUp: this.state.namePickUp,
        company: this.state.company,
        department: this.state.department,
        other: this.state.other,
        imageURL: this.state.imageURL,
        dateUpdate: {
          day: new Date().getDate(),
          month: (new Date().getMonth() + 1),
          year: new Date().getFullYear(),
          time: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
        },
        value: this.state.value
        // dateUpdate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
      }).then(() => {
        this.setState({
          visible: !this.state.visible,
          success: "success",
        }, () => {
          setTimeout(() => {
            this.setState({
              visible: !this.state.visible
            })
          }, 2000)
        })
      })

      var firebaseSetResult = firebase.database().ref(`Result/${newResult.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')}`);
      let keyResult = newResult.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')
      if (this.state.other === "") {
        this.setState({
          result: "แก้ไขครุภัณฑ์"
        })
      } else {
        this.setState({
          result: "แก้ไขครุภัณฑ์"
        })
      }
      firebaseSetResult.set({
        id: keyResult,
        idMaterial: this.state.id,
        result: this.state.result,
        durableCode: this.state.durableCode,
        listMaterial: this.state.listMaterial,
        department: this.state.department,
        materialStatus: this.state.materialStatus,
        dateUpdate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
        name: localStorage.getItem("name"),
      });
      var firebaseSetNewNumberResult = firebase.database().ref(`listResult`)
      await firebaseSetNewNumberResult.set({
        number: keyResult
      }).then(() => {
      }
      );

      this.setState({
        listMaterial: "",
        durableCode: "",
        attribute: "",
        serialNumber: "",
        materialStatus: "",
        price: "",
        storageLocation: "",
        numberPieces: "",
        dateAccept: "",
        namePickUp: "",
        company: "",
        department: "",
        other: "",
        imageURL: "",
      })
    } else {
      this.setState({
        visible: !this.state.visible,
        success: "danger"
      }, () => {
        setTimeout(() => {
          this.setState({
            visible: !this.state.visible
          })
        }, 2000)
      })
    }

  }

  // keyPressed = (event) => {
  //   if (event.key === "Enter") {
  //     this.getMaterial()
  //   }
  // }

  // keyPressed(event) {
  //   if (event.key === "Enter") {
  //     console.log("555");

  //     this.getMaterial()
  //   }
  // }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <div className="header-body">
            {/* Page content */}
            <Row>
              <Col lg="6" md="6">
                <Card style={{ minHeight: "150px" }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <Col>
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Submit Material to Edit
                          </CardTitle>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          // href="#pablo"
                          onClick={() => this.getMaterial()}
                          size="sm"
                        >
                          SUBMIT
                            </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form >
                          <Input
                            className="form-control-alternative mt-4"
                            onChange={this.handleInput}
                            value={this.state.selectMaterial}
                            name="selectMaterial"
                            id="input-selectMaterial"
                            placeholder="ID"
                            type="text"
                          // onKeyDown={this.keyPress}
                          />
                        </Form>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" md="6">
                {this.state.visible === false ? (
                  <Row className="" style={{ marginBottom: "3rem", minHeight: "55px" }} >
                    <div>

                    </div>
                  </Row>
                ) : (

                    <Row className="" style={{ marginBottom: "2rem" }} >
                      <Col className="ml-auto">
                        {this.state.success === "success" ? (
                          <Alert color="success" isOpen={this.state.visible} toggle={() => {
                            this.setState({
                              visible: !this.state.visible
                            })
                          }}>
                            แก้ไขครุภัณฑ์สำเร็จ!
                          </Alert>
                        ) : this.state.success === "danger" ? (
                          <Alert color="danger" isOpen={this.state.visible} toggle={() => {
                            this.setState({
                              visible: !this.state.visible
                            })
                          }}>
                            {this.state.id === "" ? (
                              <>
                                กรุณาเลือกครุภัณฑ์!
                              </>
                            ) : this.state.durableCode === "" ? (
                              <>
                                กรุณาใส่รหัสครุภัณฑ์!
                              </>
                            ) : (
                                  <>
                                    มีข้อผิดพลาดเกิดขึ้น!
                                  </>
                                )}

                          </Alert>
                        ) : (null)}
                      </Col>
                    </Row>
                  )}
              </Col>
            </Row>
          </div>
        </Container>
        <Container className="" fluid >

          <Row className="mt-5">
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Edit Material</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <button
                        className="btn btn-primary"
                        href="#pablo"
                        onClick={e => this.onUpdate()}
                      >
                        EDIT
                      </button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    {/* <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6> */}
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-durableCode"
                            >
                              รหัสครุภัณฑ์
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.durableCode}
                              name="durableCode"
                              id="input-durableCode"
                              placeholder="รหัสครุภัณฑ์"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-listMaterial"
                            >
                              รายการ
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.listMaterial}
                              name="listMaterial"
                              id="input-listMaterial"
                              placeholder="รายการ"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              คณะ/หน่วยงาน
                            </label>
                            <Input
                              type="select"
                              onChange={this.handleInput}
                              value={this.state.department}
                              name="department"
                              id="departmentSelect">
                              <option value="-">-</option>
                              <option value="งานพัสดุ">งานพัสดุ</option>

                              <option value="วิทยาลัยชุมชนภูเก็ต">วิทยาลัยชุมชนภูเก็ต</option>
                              <option value="วิทยาลัยการคอมพิวเตอร์">วิทยาลัยการคอมพิวเตอร์</option>

                              <option value="คณะการบริการและการท่องเที่ยว">คณะการบริการและการท่องเที่ยว</option>
                              <option value="คณะเทคโนโลยีและสิ่งแวดล้อม">คณะเทคโนโลยีและสิ่งแวดล้อม</option>
                              <option value="คณะวิเทศศึกษา">คณะวิเทศศึกษา</option>
                              <option value="ศูนย์กิจการนานาชาติ">ศูนย์กิจการนานาชาติ</option>

                              <option value="ศูนย์การเรียนรู้ (งานเทคโนโลยีสารสนเทศ)">ศูนย์การเรียนรู้ (งานเทคโนโลยีสารสนเทศ)</option>
                              <option value="ศูนย์การเรียนรู้ งานโสตทัศนูปกรณ์">ศูนย์การเรียนรู้ งานโสตทัศนูปกรณ์</option>
                              <option value="ศูนย์การเรียนรู้ งานห้องสมุด">ศูนย์การเรียนรู้ งานห้องสมุด</option>
                              <option value="ศูนย์การเรียนรู้ งานเทคโนโลยีสารสนเทศ">ศูนย์การเรียนรู้ งานเทคโนโลยีสารสนเทศ</option>

                              <option value="งานเทคโนโลยีสารสนเทศ">งานเทคโนโลยีสารสนเทศ</option>
                              <option value="งานบริหารทรัพย์สิน">งานบริหารทรัพย์สิน</option>
                              <option value="งานบริหารทรัพย์สิน(สะพานหิน)">งานบริหารทรัพย์สิน(สะพานหิน)</option>
                              <option value="งานบริการวิชาการและประชาสัมพันธ์">งานบริการวิชาการและประชาสัมพันธ์</option>

                              <option value="กองกลาง งานอาคาร">กองกลาง งานอาคาร</option>
                              <option value="กองกลาง งานแผนและประกนัคุณภาพ">กองกลาง งานแผนและประกนัคุณภาพ</option>
                              <option value="กองกลาง งานเลขานุการและสารบรรณ)">กองกลาง งานเลขานุการและสารบรรณ</option>
                              <option value="กองกลาง งานประชาสัมพันธ์">กองกลาง งานประชาสัมพันธ์</option>
                              <option value="กองกลาง งานบริหารงานบุคคล">กองกลาง กองกลาง งานบริหารงานบุคคล</option>
                              <option value="กองกลาง งานอนามัยและพยาบาล">กองกลาง งานอนามัยและพยาบาล</option>
                              <option value="กองกลาง งานการเงินและพัสดุ(การเงิน)">กองกลาง งานการเงินและพัสดุ(การเงิน)</option>
                              <option value="กองกลาง งานการเงินและพัสดุ(พัสดุ)">กองกลาง งานการเงินและพัสดุ(พัสดุ)</option>

                              <option value="กองวิชาการ งานหลักสูตรและสหกิจศึกษา">กองวิชาการงานหลักสูตรและสหกิจศึกษา</option>
                              <option value="กองวิชาการ งานรับนักศึกษาและทะเบียนกลาง">กองวิชาการ งานรับนักศึกษาและทะเบียนกลาง</option>
                              <option value="กองวิชาการ งานพัฒนาอาจารย์แลบะบริการวิชาการ">กองวิชาการ งานพัฒนาอาจารย์แลบะบริการวิชาการ</option>

                              <option value="กองกิจการนักศึกษา งานพัฒนานักศึกษา">กองกิจการนักศึกษา งานพัฒนานักศึกษา</option>
                              <option value="กองกิจการนักศึกษา งานกิจกรรมนักศึกษา">กองกิจการนักศึกษา งานกิจกรรมนักศึกษา</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-attribute"
                            >
                              ยี่ห้อ/ชนิด/ขนาด/คุณลักษณะ
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.attribute}
                              name="attribute"
                              id="input-attribute"
                              placeholder="ยี่ห้อ/ชนิด/ขนาด/คุณลักษณะ"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-serialNumber"
                            >
                              หมายเลขเครื่อง
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.serialNumber}
                              name="serialNumber"
                              id="input-serialNumber"
                              placeholder="หมายเลขเครื่อง"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-price"
                            >
                              ราคาต่อหน่วย
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.price}
                              name="price"
                              id="input-price"
                              placeholder="ราคาต่อหน่วย"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-numberPieces"
                            >
                              จำนวน
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.numberPieces}
                              name="numberPieces"
                              id="input-numberPieces"
                              placeholder="จำนวน"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-dateAccept"
                            >
                              วันที่ตรวจรับ
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.dateAccept}
                              name="dateAccept"
                              id="input-dateAccept"
                              placeholder="วันที่ตรวจรับ"
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-company"
                            >
                              บริษัท/ห้างร้าน/ที่จัดซื้อ
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.company}
                              name="company"
                              id="input-company"
                              placeholder="บริษัท/ห้างร้าน/ที่จัดซื้อ"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-storageLocation"
                            >
                              สถานที่เก็บ
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInput}
                              value={this.state.storageLocation}
                              name="storageLocation"
                              id="input-storageLocation"
                              placeholder="สถานที่เก็บ"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Label for="exampleCustomFileBrowser">รูปภาพ</Label>
                            <ListGroupItem>
                              <center><img src={this.state.imageURL || 'https://via.placeholder.com/256'} alt="Material" height="256" width="256" /></center>
                            </ListGroupItem>
                            <CustomInput onChange={this.handleImage}
                              className="mt-3"
                              type="file"
                              id="exampleCustomFileBrowser"
                              name="customFile" />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="exampleCheckbox">สถานะครุภัณฑ์</Label>
                            <div>
                              <CustomInput value="ปกติ" checked={this.state.materialStatus === 'ปกติ' && this.state.other === ""} onChange={this.handleInput} type="radio" id="ปกติ" name="materialStatus" label="ปกติ" />
                              <CustomInput value="ชำรุด" checked={this.state.materialStatus === 'ชำรุด' && this.state.other === ""} onChange={this.handleInput} type="radio" id="ชำรุด" name="materialStatus" label="ชำรุด" />
                              <CustomInput value="รอจำหน่าย" checked={this.state.materialStatus === 'รอจำหน่าย' && this.state.other === ""} onChange={this.handleInput} type="radio" id="รอจำหน่าย" name="materialStatus" label="รอจำหน่าย" />
                              <CustomInput value="โอนย้าย" checked={this.state.materialStatus === 'โอนย้าย' && this.state.other === ""} onChange={this.handleInput} type="radio" id="โอนย้าย" name="materialStatus" label="โอนย้าย" />
                              <CustomInput value="อื่น ๆ" checked={this.state.other !== ''} onChange={this.handleInput} type="radio" id="อื่น ๆ" name="other" label="อื่น ๆ" />
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleInputOther}
                              value={this.state.other}
                              name="other"
                              id="input-other"
                              placeholder=""
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.state.id !== "" ? (
                        <Row>
                          <Col className="ml-auto " xl="2">
                            <div className="d-flex justify-content-end">
                              <FormGroup className="ml-auto">

                                <button type="button" className="btn btn-danger" onClick={
                                  this.toggleModalDelete
                                }>DELETE</button>

                              </FormGroup>
                            </div>
                          </Col>
                        </Row>
                      ) : (null)}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div>
            <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete} >
              <ModalHeader toggle={this.toggleModalDelete}>Delete Material</ModalHeader>
              <ModalBody>
                Are you sure to delete this material?
              </ModalBody>
              <ModalFooter>
                <Link to="/material/index">
                  <Button color="primary" onClick={() => {
                    if (this.state.id !== "") {
                      this.toggleModalDelete()
                      firebase.database().ref("myMaterial/" + this.state.id).remove()
                    }
                  }}>OK</Button>{' '}
                </Link>
                <Button color="secondary" onClick={this.toggleModalDelete}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </Container>
      </>
    );
  }
}

export default Edit;
