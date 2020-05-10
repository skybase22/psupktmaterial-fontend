import React from "react";

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
  ListGroupItem,
  CardTitle,
  Alert,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
// mapTypeId={google.maps.MapTypeId.ROADMAP}
import { firebase } from '../../firebase'

class Detail extends React.Component {
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
      selectMaterial: "",
      visible: false,
      success: "",
      id: "",
      textAlert:"",
    }
  }

  componentDidMount = async () => {
        if (this.props.history.location.search.startsWith('?id=')) {
          let query = this.props.history.location.search.split('?id=')
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
              })
            } else {
              this.setState({
                visible: !this.state.visible,
                success: "danger",
                textAlert: "ไม่มีครุภัณฑ์ที่เลือก"
              }, () => {
                setTimeout(() => {
                  this.setState({
                    visible: !this.state.visible
                  })
                }, 2000)
              })
            }
          })
        }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value })

  }

  getMaterial = async () => {
    if (this.state.selectMaterial !== "") {
      let query = this.state.selectMaterial
      firebase.database().ref("myURL/" + query).once('value', async (snapshot) => {
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
          })
        } else {
          this.setState({
            visible: !this.state.visible,
            success: "danger",
            textAlert: "ไม่มีครุภัณฑ์ที่เลือก"
          }, () => {
            setTimeout(() => {
              this.setState({
                visible: !this.state.visible
              })
            }, 2000)
          })
        }
      })
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log("err", error);
        })
    } else {
      this.setState({
        visible: !this.state.visible,
        success: "danger",
        textAlert: "กรุณาเลือกครุภัณฑ์"
      }, () => {
        setTimeout(() => {
          this.setState({
            visible: !this.state.visible
          })
        }, 2000)
      })
    }
  }

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
                            name="selectMaterial"
                            value={this.state.selectMaterial}
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
                                {this.state.textAlert}
                              </>
                            ) : this.state.durableCode === "" ? (
                              <>
                                {this.state.textAlert}

                              </>
                            ) : (
                                  <>
                                    {this.state.textAlert}

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
        <Container fluid >

          <Row className="mt-5">
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Edit Material</h3>
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
                              defaultValue={this.state.durableCode}
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
                              defaultValue={this.state.listMaterial}
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
                              type="text"
                              defaultValue={this.state.department}
                              name="department"
                              id="departmentSelect">
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
                              defaultValue={this.state.attribute}
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
                              defaultValue={this.state.serialNumber}
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
                              defaultValue={this.state.price}
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
                              defaultValue={this.state.numberPieces}
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
                              defaultValue={this.state.dateAccept}
                              name="dateAccept"
                              id="input-dateAccept"
                              placeholder="วันที่ตรวจรับ"
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
                              htmlFor="input-company"
                            >
                              บริษัท/ห้างร้าน/ที่จัดซื้อ
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.company}
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
                              defaultValue={this.state.storageLocation}
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
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="exampleCheckbox">สถานะครุภัณฑ์</Label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.materialStatus}
                              id="input-other"
                              placeholder=""
                              type="text"
                            />
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

export default Detail;
