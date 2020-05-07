import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    CustomInput,
    Badge,
    Row,
    Col,
    Input,
    ListGroupItem
} from 'reactstrap';
import { QRCode } from "react-qr-svg";

import update from 'immutability-helper';

import PrintComponents from "react-print-components";


const ModalQR = (props) => {
    const {
        buttonLabel,
        className,
        modalTitle,
        modalType,
        modalSize,
        getData,
    } = props;

    var {
        data
    } = props;

    const [modal, setModal] = useState(false);
    const [dataQR, setDataQR] = useState([])

    // useEffect(() => {
    //     setDataQR(data)
    // })

    const toggle = () => {
        setModal(!modal)
        setDataQR(data)
    }

    const setArrayQR = (seqQR, e) => {
        var dataToSlice = dataQR
        var commentIndex = dataToSlice.findIndex((c) => {
            return c.seqQR === seqQR
        })
        var updatedComment = update(dataToSlice[commentIndex], { rangeValueQR: { $set: e } })
        var newData = update(dataToSlice, {
            $splice: [[commentIndex, 1, updatedComment]]
        })
        setDataQR(newData)
    }

    const setArrayFont = (seqQR, e) => {
        var dataToSlice = dataQR
        var commentIndex = dataToSlice.findIndex((c) => {
            return c.seqQR === seqQR
        })
        var updatedComment = update(dataToSlice[commentIndex], { rangeValueFont: { $set: e } })
        var newData = update(dataToSlice, {
            $splice: [[commentIndex, 1, updatedComment]]
        })
        setDataQR(newData)
    }

    return (
        <span style={{ cursor: "pointer" }} className={className} onClick={toggle}>{buttonLabel}
            <div className="overlay">
                <Modal
                    size={modalSize}
                    isOpen={modal}
                    toggle={toggle}
                    tabIndex="-1" role="dialog"
                    // [config]='{backdrop: 'static',  keyboard: false}'
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                >
                    <ModalHeader toggle={toggle}>
                        <Row>
                            <Col xl="12" className="col" >
                                {modalTitle}
                            </Col>
                            {/* <Col xl="4"   >

                                
                            </Col> */}
                        </Row>
                    </ModalHeader>
                    {modalType === "qr code" ? (
                        <div className="ml-auto mr-3">
                            <Badge style={{ backgroundColor: "#70A1D7" }} > </Badge>
                            <span className="ml-1 mr-3">QR Code Size</span>

                            <Badge style={{ backgroundColor: "#A1DE93" }} > </Badge>
                            <span className="ml-1 mr-3">Font Size</span>
                        </div>
                    ) : (<></>)}
                    <ModalBody className="mt--3">
                        {modalType === "qr code" ? (
                            <>
                                <div className="d-flex flex-wrap" >
                                    {dataQR.map((item, index) => {
                                        return (
                                            <Form key={index} style={{ margin: "1rem" }} >
                                                <FormGroup>
                                                    <CustomInput min={100} max={150}
                                                        onChange={(e) => {
                                                            setArrayQR(item.seqQR, e.target.value)
                                                        }}
                                                        value={item.rangeValueQR}
                                                        type="range"
                                                        id="exampleCustomRange"
                                                        className="custom-range-qr" />
                                                    <CustomInput min={9} max={14}
                                                        onChange={(e) => {
                                                            setArrayFont(item.seqQR, e.target.value)
                                                        }}
                                                        value={item.rangeValueFont}
                                                        type="range"
                                                        id="exampleCustomRange"
                                                        className="custom-range-qr-2" />
                                                    <div>
                                                        <span style={{
                                                            wordWrap: "break-word",
                                                            maxWidth: (item.rangeValueQR) + "px",
                                                            fontSize: (item.rangeValueFont) + "px",
                                                            marginLeft: "6px"
                                                        }}>{item.id}</span>
                                                    </div>

                                                    <QRCode
                                                        bgColor="#FFFFFF"
                                                        fgColor="#000000"
                                                        level="Q"
                                                        style={{
                                                            width: item.rangeValueQR,
                                                            marginLeft: "6px"
                                                        }}
                                                        value={item.value}
                                                    />
                                                    <p style={{
                                                        wordWrap: "break-word",
                                                        maxWidth: (item.rangeValueQR) + "px",
                                                        fontSize: (item.rangeValueFont) + "px",
                                                        marginLeft: "6px"
                                                    }}>{item.durableCode}</p>
                                                </FormGroup>
                                            </Form>
                                        )
                                    })}
                                </div>
                            </>
                        ) : dataQR !== undefined ? (

                            <div className="">
                                {modalType === "show data" ? (
                                    <>
                                        <Row>
                                            <div>

                                            </div>
                                            <div className="ml-auto mr-3">

                                                <Button
                                                    color="warning"
                                                    onClick={() => {
                                                        localStorage.setItem("copyData", JSON.stringify(dataQR))
                                                    }}
                                                    size="sm"
                                                >
                                                    COPY
                                                </Button>

                                                <Link to={`/material/edit/?id=${dataQR.id}`}>
                                                    <Button style={{}}
                                                        color="primary"
                                                        size="sm"
                                                    >
                                                        EDIT
                                                </Button>
                                                </Link>
                                            </div>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-durableCode"
                                                    >
                                                        รหัสครุภัณฑ์
                                            </label>
                                                    <ListGroupItem>{dataQR.durableCode}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-listMaterial"
                                                    >
                                                        รายการ
                                            </label>
                                                    <ListGroupItem>{dataQR.listMaterial}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        คณะ/หน่วยงาน
                                            </label>
                                                    <ListGroupItem>{dataQR.department}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-attribute"
                                                    >
                                                        ยี่ห้อ/ชนิด/ขนาด/คุณลักษณะ
                                            </label>
                                                    <ListGroupItem>{dataQR.attribute}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-serialNumber"
                                                    >
                                                        หมายเลขเครื่อง
                                            </label>
                                                    <ListGroupItem>{dataQR.serialNumber}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-price"
                                                    >
                                                        ราคาต่อหน่วย
                                            </label>
                                                    <ListGroupItem>{dataQR.price}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-numberPieces"
                                                    >
                                                        จำนวน
                                            </label>
                                                    <ListGroupItem>{dataQR.numberPieces}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dateAccept"
                                                    >
                                                        วันที่ตรวจรับ
                                            </label>
                                                    <ListGroupItem>{dataQR.dateAccept}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-company"
                                                    >
                                                        บริษัท/ห้างร้าน/ที่จัดซื้อ
                                                    </label>
                                                    <ListGroupItem>{dataQR.company}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-storageLocation"
                                                    >
                                                        สถานที่เก็บ
                                            </label>
                                                    <ListGroupItem>{dataQR.storageLocation}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-storageLocation"
                                                    >
                                                        สถานะครุภัณฑ์
                                            </label>
                                                    <ListGroupItem>{dataQR.materialStatus}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-storageLocation"
                                                    >
                                                        รูปภาพ
                                            </label>
                                                    <ListGroupItem>
                                                        <center><img src={dataQR.imageURL || 'https://via.placeholder.com/256'} alt="Material" height="256" width="256" /></center>
                                                    </ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </>
                                ) : modalType === "show history" ? (
                                    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-durableCode"
                                                    >
                                                        รหัสครุภัณฑ์
                                                    </label>
                                                    <ListGroupItem>{dataQR.durableCode}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-listMaterial"
                                                    >
                                                        รายการ
                                                    </label>
                                                    <ListGroupItem>{dataQR.listMaterial}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        คณะ/หน่วยงาน
                                                    </label>
                                                    <ListGroupItem>{dataQR.department}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-attribute"
                                                    >
                                                        วันที่ตรวจสอบ
                                                    </label>
                                                    <ListGroupItem>{dataQR.dateUpdate}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-serialNumber"
                                                    >
                                                        ชื่อผู้ตรวจสอบ
                                                    </label>
                                                    <ListGroupItem>{dataQR.name}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-price"
                                                    >
                                                        สถานะ
                                                    </label>
                                                    <ListGroupItem>{dataQR.materialStatus}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-numberPieces"
                                                    >
                                                        ผลการตวจ
                                                    </label>
                                                    <ListGroupItem>{dataQR.result}</ListGroupItem>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (null)}

                            </div>
                        ) : (null)
                        }

                    </ModalBody>
                    <ModalFooter>
                        <div>
                            {modalType === "qr code" ? (
                                <PrintComponents
                                    trigger={<button type="button" onClick={toggle} className="btn btn-primary">Print</button>}
                                >
                                    <div className="d-flex flex-wrap">
                                        {dataQR.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div style={{}} className="col">
                                                        <div>
                                                            <span style={{ wordWrap: "break-word", maxWidth: (item.rangeValueQR) + "px", fontSize: (item.rangeValueFont) + "px" }}>{item.id}</span>
                                                        </div>
                                                        <QRCode
                                                            bgColor="#FFFFFF"
                                                            fgColor="#000000"
                                                            level="Q"
                                                            style={{ width: item.rangeValueQR }}
                                                            value={item.value}
                                                        />
                                                        <p style={{ wordWrap: "break-word", maxWidth: (item.rangeValueQR) + "px", fontSize: (item.rangeValueFont) + "px" }}>{item.durableCode}</p>
                                                    </div>
                                                </div>)
                                        })}
                                    </div>
                                </PrintComponents>
                            ) : (
                                        null
                                    )}
                            <Button color="secondary" onClick={toggle} >Cancel</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        </span>
    );
}

export default ModalQR;