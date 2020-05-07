
import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  CardTitle,
  Button,
  Badge,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form,
  FormGroup,
  CustomInput,
  Progress,
  CardFooter
} from "reactstrap";

import { firebase } from '../../firebase'
// core components
import Header from "components/Headers/Header.js";

import ModalQR from '../pages/Modal'

import update from 'immutability-helper';

class Prints extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stateModal: false,
      allData: [],
      isDataFetched: false,
      error: false,
      dateBefore: "",
      dateAfter: "",
      dataAfterCompare: [],
      pageNow: 1,
      max_per_page: 20,
      counter: 0,
      sortAction: "10",
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
      image: null,
      imageURL: "",
      data: [],
      dataToPrint: [],
      dataToPrintAfterDelete: [],
      showPrint: false,
      dataToSlice: [],
      pressPrint: false,
      dataForSearchDate: [],
      rangeValueFont: 9,
      rangeValueQR: 100,
      valueFont: "",
      valueQR: "",
      dataReload: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,]
    }
  }

  toggle = () => {
    this.setState({
      stateModal: !this.state.stateModal
    })
  }

  setArrayQR = (seqQR, e) => {
    var dataToSlice = this.state.dataToPrintAfterDelete
    var commentIndex = dataToSlice.findIndex((c) => {
      return c.seqQR === seqQR
    })
    var updatedComment = update(dataToSlice[commentIndex], { rangeValueQR: { $set: e } })
    var newData = update(dataToSlice, {
      $splice: [[commentIndex, 1, updatedComment]]
    })
    this.setState({
      dataToPrintAfterDelete: newData
    })
  }

  setArrayFont = (seqQR, e) => {
    var dataToSlice = this.state.dataToPrintAfterDelete
    var commentIndex = dataToSlice.findIndex((c) => {
      return c.seqQR === seqQR
    })
    var updatedComment = update(dataToSlice[commentIndex], { rangeValueFont: { $set: e } })
    var newData = update(dataToSlice, {
      $splice: [[commentIndex, 1, updatedComment]]
    })
    this.setState({
      dataToPrintAfterDelete: newData
    })
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.fetchData()
      } else {
        this.props.history.push('/auth/login')
      }
    })
  }

  fetchData = () => {
    let database = firebase.database().ref("myMaterial");
    database.once('value', async (snapshot) => {
      if (snapshot.exists()) {
        let arr = []
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
            other: data.val().other
          })
        });

        await this.setState({ allData: arr })
        this.setState({
          counter: this.state.allData.length
        })

        let arr2 = arr.sort((a, b) => {
          return parseInt(b.id) - parseInt(a.id)
        })
        this.setState({
          data: arr2,
          dataForSearchDate: arr2,
          isDataFetched: true
        })
      } else {
        this.setState({ error: true })
      }
    })
  }

  toggle = () => {
    this.setState({
      stateModal: !this.state.stateModal
    })
  }

  changeDelete = async (id) => {
    let arr = this.state.dataToSlice
    let arrAfter = arr.filter((data) => {
      return data.seqQR !== id
    })
    await this.setState({
      dataToSlice: arrAfter,
    })
  }

  renderFooter = () => {

    if (this.state.counter !== 0) {
      return (
        <div className='d-flex justify-content-center align-items-center mt-2 mb-3'>
          <div>
            <nav>
              <ul className='pagination justify-content-end mb-0'>
                <li
                  className={
                    this.state.pageNow === 1
                      ? "page-item disabled"
                      : "page-item"
                  }
                  onClick={this.pagePrev}
                >
                  <button className='page-link'>
                    <span aria-hidden="true">&lt;</span>
                  </button>
                </li>
                {this.renderPrev2Page()}
                {this.renderPrev1Page()}
                <li className='page-item active'>
                  <button className='page-link'>
                    {this.state.pageNow}
                  </button>
                </li>
                {this.renderNext1Page()}
                {this.renderNext2Page()}
                <li
                  className={
                    this.state.pageNow ===
                      Math.ceil(
                        this.state.counter /
                        this.state.max_per_page
                      )
                      ? "page-item disabled"
                      : "page-item"
                  }
                  onClick={this.pageNext}
                >
                  <button type='button' className='page-link'>
                    <span aria-hidden="true">&gt;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderPrev2Page = () => {
    if (
      this.state.pageNow ===
      Math.ceil(this.state.counter / this.state.max_per_page) &&
      Math.ceil(this.state.counter / this.state.max_per_page) >= 3
    ) {
      return (
        <li
          className='page-item'
          onClick={() => {
            this.setState({ pageNow: this.state.pageNow - 2 })
          }}
        >
          <button className='page-link'>
            {this.state.pageNow - 2}
          </button>
        </li>
      )
    } else {
      return null
    }
  }

  renderPrev1Page = () => {
    if (this.state.pageNow !== 1) {
      return (
        <li
          className='page-item'
          onClick={() => {
            this.setState({ pageNow: this.state.pageNow - 1 })
          }}
        >
          <button className='page-link'>
            {this.state.pageNow - 1}
          </button>
        </li>
      )
    } else {
      return null
    }
  }

  renderNext1Page = () => {
    if (
      this.state.pageNow !==
      Math.ceil(this.state.counter / this.state.max_per_page)
    ) {
      return (
        <li
          className='page-item'
          onClick={() => {
            this.setState({ pageNow: this.state.pageNow + 1 })
          }}
        >
          <button className='page-link'>
            {this.state.pageNow + 1}
          </button>
        </li>
      )
    }
  }

  renderNext2Page = () => {
    if (
      this.state.pageNow === 1 &&
      Math.ceil(this.state.counter / this.state.max_per_page) >= 3
    ) {
      return (
        <li
          className='page-item'
          onClick={() => {
            this.setState({ pageNow: this.state.pageNow + 2 })
          }}
        >
          <button className='page-link'>
            {this.state.pageNow + 2}
          </button>
        </li>
      )
    }
  }

  pagePrev = () => {
    if (this.state.pageNow > 1) {
      this.setState({ pageNow: this.state.pageNow - 1 })
    }
  }

  pageNext = () => {
    if (
      this.state.pageNow <
      Math.ceil(this.state.counter / this.state.max_per_page)
    ) {
      this.setState({ pageNow: this.state.pageNow + 1 })
    }
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className=" shadow" style={{ backgroundColor: "#DDE2F2" }}>
                <CardHeader className="">
                  <h3 className=" mb-0">Print QR Code</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                <span className="h2 font-weight-bold mb-0">
                                  SELECT MATERIAL
                                </span>
                              </CardTitle>
                            </div>
                            <Col className="col-auto">
                              {/* <div className="icon icon-shape-select-qr-code rounded-circle card-button-add-qr-print"
                              onClick={this.toggle}>
                                <i className="fas fa-print" />
                              </div> */}
                              <ModalQR className="icon icon-shape-select-qr-code rounded-circle card-button-add-qr-print"
                                buttonLabel={<i className="fas fa-print" />}
                                modalTitle="View QR Code Material"
                                data={this.state.dataToPrintAfterDelete}
                                modalType="qr code"
                                modalSize="lg"
                              />
                            </Col>
                          </Row>
                          <Row>
                            {/* <Card className="card-stats mb-4 mb-xl-0 mt-4 card-qr-code">
                            <CardBody>
                              <CardBody/>
                              <Card/> */}
                            <div className="d-flex flex-wrap pl-5 pr-5">
                              {this.state.dataToPrintAfterDelete.filter((item) => {
                                return true
                              }).map((item, index) => {
                                return (
                                  <div key={index} className="mr-2 ml-2 mb-3">
                                    <Button style={{ minWidth: "150px" }} className="" color="primary" outline

                                    >
                                      {item.id}
                                      <div className="icon-shape-delete rounded-circle card-button-add-qr-select"
                                        onClick={async () => {
                                          let arr = this.state.dataToPrintAfterDelete
                                          let arrAfter = arr.filter((data) => {
                                            return data.seqQR !== item.seqQR
                                          })
                                          await this.setState({
                                            dataToPrintAfterDelete: arrAfter,
                                            dataToSlice: arrAfter
                                          })
                                        }
                                        }
                                      >
                                        <i key={index} className="fas fa-minus" />
                                      </div>
                                    </Button>
                                  </div>
                                )
                              })
                              }
                            </div>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            <span className="text-primary mr-2">
                              <i className="fa fa-cogs" /> {this.state.dataToPrintAfterDelete.length} ชิ้น
                        </span>{" "}
                            <span className="text-nowrap">Select the material below to print</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{ minHeight: "1000px" }} className=" icon-examples">
                    {this.state.allData.length === 0 ? (
                      <>
                        {this.state.dataReload.map((item, key) => {
                          return (
                            <Col key={key} style={{ minWidth: "300px" }} lg="3" md="6">
                              <Card className="card-stats mb-4 mb-xl-0 mt-4 card-qr-code">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                        tag="h5"
                                        className="text-uppercase text-muted mb-0">
                                        <Progress animated style={{ maxWidth: "40%" }} striped color="gray" value={100} />
                                      </CardTitle>
                                      <span className="h2 font-weight-bold mb-0">
                                        <Progress animated style={{ maxWidth: "80%" }} striped color="black" value={100} />
                                      </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape rounded-circle shadow card-button-add-qr">
                                        <i className="fas fa-plus" />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Progress animated style={{ maxWidth: "100%", marginTop: "1rem" }} striped color="gray" value={100} />
                                  <Progress animated style={{ maxWidth: "30%" }} striped color="gray" value={100} />
                                  <Row style={{ marginTop: "2rem" }}>
                                    <Col lg="4">
                                      <Progress animated style={{ maxWidth: "100%" }} striped color="success" value={100} />
                                    </Col>
                                    <Col lg="8">
                                      <Progress animated striped color="gray" value={100} />
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Col>
                          )
                        })}
                      </>
                    ) : (
                        <>
                          {this.state.allData
                            .filter((item, index) => {
                              return (
                                item !== null &&
                                this.state.pageNow ===
                                Math.ceil((index + 1) / this.state.max_per_page)
                              )
                            })
                            .map((item, key) => {
                              return (
                                <Col style={{ minWidth: "300px" }} key={key} lg="3" md="6">
                                  <Card className="card-stats mb-4 mb-xl-0 mt-4 card-qr-code">
                                    <CardBody>
                                      <Row>
                                        <div className="col">
                                          <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-0"
                                          >
                                            {item.id}
                                          </CardTitle>
                                          <span className="h2 font-weight-bold mb-0">
                                            {item.listMaterial}
                                          </span>
                                        </div>
                                        <Col className="col-auto">
                                          <div className="icon icon-shape rounded-circle shadow card-button-add-qr"
                                            onClick={(() => {

                                              this.state.dataToSlice.push({
                                                id: item.id,
                                                value: item.value,
                                                listMaterial: item.listMaterial,
                                                attribute: item.attribute,
                                                company: item.company,
                                                dateAccept: item.dateAccept,
                                                durableCode: item.durableCode,
                                                materialStatus: item.materialStatus,
                                                namePickUp: item.namePickUp,
                                                price: item.price,
                                                numberPieces: item.numberPieces,
                                                serialNumber: item.serialNumber,
                                                storageLocation: item.storageLocation,
                                                department: item.department,
                                                imageURL: item.imageURL,
                                                other: item.other,
                                                delete: false,
                                                rangeValueFont: 9,
                                                rangeValueQR: 100,
                                                seqQR: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds(),
                                              })
                                              this.setState({
                                                dataToPrintAfterDelete: this.state.dataToSlice
                                              })
                                            })}
                                          >
                                            <i className="fas fa-plus"
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="">{item.durableCode}</span>
                                      </p>
                                      <p className="mt-3 mb-0 text-muted text-sm">
                                        {item.materialStatus === "ปกติ" ? (
                                          <>
                                            <span className="text-success mr-2">
                                              <i className="fa fa-check" /> {item.materialStatus}
                                            </span>{" "}
                                          </>
                                        ) : item.materialStatus === "ชำรุด" ? (
                                          <>
                                            <span className="text-danger mr-2">
                                              <i className="fa fa-times" /> {item.materialStatus}
                                            </span>{" "}
                                          </>
                                        ) : item.materialStatus === "รอจำหน่าย" ? (
                                          <>
                                            <span className="text-warning mr-2">
                                              <i className="fa fa-shopping-cart" aria-hidden="true" /> {item.materialStatus}
                                            </span>{" "}
                                          </>
                                        ) : item.materialStatus === "โอนย้าย" ? (
                                          <>
                                            <span className="text-info mr-2">
                                              <i className="fa fa-share-square" /> {item.materialStatus}
                                            </span>{" "}
                                          </>
                                        ) : (
                                                  <>
                                                    <span className="text-primary mr-2">
                                                      <i className="fa fa-comment" /> {item.materialStatus}
                                                    </span>{" "}
                                                  </>
                                                )}

                                        <span className="text-pre-wrap">{item.dateAccept}</span>
                                      </p>
                                    </CardBody>
                                  </Card>
                                </Col>
                              )
                            })
                          }
                        </>
                      )}

                  </Row>
                </CardBody>

                {this.renderFooter()}
              </Card>
            </div>
          </Row>
          <Row>
          </Row>
        </Container>
      </>
    );
  }
}

export default Prints;
