
import React from "react";
// react plugin used to create google maps
// reactstrap components
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
  Alert
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
// mapTypeId={google.maps.MapTypeId.ROADMAP}
import { firebase } from '../../firebase'

class Add extends React.Component {
  _isMounted = false;
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
      visible: false,
      success: "",
      copyData: [],
    }
  }

  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getNumberFirebase()
      } else {
        this.props.history.push('/auth/login')
      }
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

  pasteData = () => {
    if (localStorage.getItem("copyData") !== undefined || localStorage.getItem("copyData") !== undefined) {
      this.setState({
        copyData: JSON.parse(localStorage.getItem('copyData'))
      }, () => {
        this.setState({
          durableCode: this.state.copyData.durableCode,
          listMaterial: this.state.copyData.listMaterial,
          attribute: this.state.copyData.attribute,
          serialNumber: this.state.copyData.serialNumber,
          price: this.state.copyData.price,
          storageLocation: this.state.copyData.storageLocation,
          numberPieces: this.state.copyData.numberPieces,
          dateAccept: this.state.copyData.dateAccept,
          company: this.state.copyData.company,
          department: this.state.copyData.department
        })
      })
    }
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

    let newResult = this.state.lastResult + 1
    if (this.state.errorMessage === "" && this.state.lastNumber !== null) {
      let newNumber = this.state.lastNumber + 1

      var numberPath = newNumber.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')
      var firebaseRef = firebase.database().ref("myMaterial/" + numberPath);

      let key = newNumber.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')
      let date = new Date()
      if (this.state.durableCode !== "") {
        firebaseRef.set({
          id: key,
          value: `https://psupktmaterial.herokuapp.com/material/detail?id=${key}`,
          durableCode: this.state.durableCode,
          listMaterial: this.state.listMaterial,
          attribute: this.state.attribute,
          serialNumber: this.state.serialNumber,
          materialStatus: this.state.materialStatus,
          price: this.state.price,
          storageLocation: this.state.storageLocation,
          numberPieces: this.state.numberPieces,
          dateAccept: this.state.dateAccept,
          namePickUp: localStorage.getItem("name"),
          company: this.state.company,
          department: this.state.department,
          other: this.state.other,
          imageURL: this.state.imageURL,
          dateUpdate: {
            day:(date.getDate() < 10 ? ("0" + date.getDate()) : (date.getDate())),
            month:((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)),
            year:date.getFullYear(),
            time:(date.getHours() < 10 ? ("0" + date.getHours()):(date.getHours())) + ':' + 
            (date.getMinutes() < 10 ? ("0" + date.getMinutes()):(date.getMinutes())) + ':' + 
            (date.getSeconds() < 10 ? ("0" + date.getSeconds()):(date.getSeconds())),
          }
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

        var firebaseRef2 = firebase.database().ref(`listNumber`)
        await firebaseRef2.set({
          number: key
        }).then(() => {
        }
        );

        await firebaseRef2.once('value', async (snapshot) => {
          if (snapshot.exists()) {
            await this.setState({ lastNumber: parseInt(snapshot.val().number) })
          }
        })
        var firebaseRef5 = firebase.database().ref(`Result/${newResult.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')}`);
        let keyResult = newResult.toLocaleString(undefined, { minimumIntegerDigits: 5 }).replace(',', '')

        this.setState({
          result: "เพิ่มครุภัณฑ์"
        })

        firebaseRef5.set({
          id: keyResult,
          idMaterial: key,
          result: this.state.result,
          durableCode: this.state.durableCode,
          listMaterial: this.state.listMaterial,
          department: this.state.department,
          materialStatus: "ปกติ",
          dateUpdate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
          name: localStorage.getItem("name"),
        });
        var firebaseRef6 = firebase.database().ref(`listResult`)
        await firebaseRef6.set({
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
          image: ""
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
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--9" fluid >
          {this.state.visible === false ? (
            <Row className="" style={{ marginBottom: "3rem", minHeight: "55px" }} >
              <div>

              </div>
            </Row>
          ) : (
              <Row style={{ marginBottom: "2rem" }} >
                <Col className="ml-auto" xl="6">
                  {this.state.success === "success" ? (
                    <Alert color="success" isOpen={this.state.visible} toggle={() => {
                      this.setState({
                        visible: !this.state.visible
                      })
                    }}>
                      เพิ่มครุภัณฑ์สำเร็จ!
                    </Alert>
                  ) : this.state.success === "danger" ? (
                    <Alert color="danger" isOpen={this.state.visible} toggle={() => {
                      this.setState({
                        visible: !this.state.visible
                      })
                    }}>
                      กรุณาใส่รหัสครุภัณฑ์!
                    </Alert>
                  ) : (null)}
                </Col>
              </Row>
            )}

          <Row className="mt--4">
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                      <h3 className="mb-0">Add Material</h3>
                    </Col>
                    <Col style={{ paddingRight: "30px" }} className="text-right" xs="6">
                      <Row >
                        <div className="ml-auto">
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={e => this.pasteData()}
                            size="sm"
                          >
                            PASTE
                      </Button>
                          <Button
                            color="success"
                            onClick={e => this.onUpdate()}
                            size="sm"
                          >
                            ADD
                      </Button>
                        </div>

                      </Row>

                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
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
                              required
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
                            <Label className="form-control-label" for="exampleCustomFileBrowser">รูปภาพ</Label>
                            <CustomInput onChange={this.handleImage}
                              type="file"
                              id="exampleCustomFileBrowser"
                              name="customFile" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Add;
