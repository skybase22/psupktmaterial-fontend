import React from 'react'
import {
    Table,
    Row,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
} from "reactstrap";

import ModalQR from '../views/pages/Modal'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            pageNow: 1,
            max_per_page: 10,
            allData: [],
            allDataHistory: [],
            dateBefore: "",
            dateAfter: "",
            inputSearch: "",
            data: [],
            dataForSearchDate: "",
        }
    }

    componentDidMount = async () => {
        await this.setState({
            allData: this.props.allData,
            data: this.props.allData,
            dataForSearchDate: this.props.allData
        })
        this.setState({
            counter: this.state.allData.length
        })
    }

    handleSelectBeforeClear = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.clearBefore()
        })
    }

    handleSelectBeforeClearHistory = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.clearBeforeHistory()
        })
    }

    handleSelectAfterClear = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.clearAfter()
        })
    }

    handleSelectAfterClearHistory = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.clearAfterHistory()
        })
    }

    clearBefore = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.serialNumber.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.storageLocation.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.namePickUp.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.attribute.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.company.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateAccept.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkBefore2()
        })
    }

    clearBeforeHistory = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.department.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateUpdate.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.idMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.result.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkBefore2History()
        })
    }

    clearAfter = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.serialNumber.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.storageLocation.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.namePickUp.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.attribute.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.company.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateAccept.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkAfter2()
        })
    }

    clearAfterHistory = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.department.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateUpdate.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.idMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.result.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkAfter2History()
        })
    }

    checkBefore2 = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateAfter !== "") {
                if ((day.dateAccept >= this.state.dateBefore) && (day.dateAccept <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateBefore !== "") {
                if (day.dateAccept >= this.state.dateBefore) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
        })
    }

    checkBefore2History = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateAfter !== "") {
                if ((day.dateUpdateValue >= this.state.dateBefore) && (day.dateUpdateValue <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateBefore !== "") {
                if (day.dateUpdateValue >= this.state.dateBefore) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
        })
    }

    checkAfter2 = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateBefore !== "") {

                if ((day.dateAccept >= this.state.dateBefore) && (day.dateAccept <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateAfter !== "") {

                if (day.dateAccept <= this.state.dateAfter) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
        })
    }

    checkAfter2History = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateBefore !== "") {

                if ((day.dateUpdateValue >= this.state.dateBefore) && (day.dateUpdateValue <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateAfter !== "") {

                if (day.dateUpdateValue <= this.state.dateAfter) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
        })
    }

    /////////////////////////
    ////////////////////////

    handleSelectBefore = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.Before()
        })
    }

    handleSelectBeforeHistory = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.clearBeforeHistory()
        })
    }

    handleSelectAfter = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.After()
        })
    }

    handleSelectAfterHistory = () => {
        this.setState({
            allData: this.state.dataForSearchDate
        }, () => {
            this.AfterHistory()
        })
    }

    Before = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.serialNumber.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.storageLocation.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.namePickUp.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.attribute.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.company.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateAccept.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkBefore22()
        })
    }

    BeforeHistory = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.department.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateUpdate.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.idMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.result.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkBefore22History()
        })
    }

    After = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.serialNumber.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.storageLocation.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.namePickUp.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.attribute.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.company.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateAccept.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkAfter22()
        })
    }

    AfterHistory = () => {
        let arr2 = []
        if (this.state.inputSearch !== "") {

            arr2 = this.state.allData.filter((item) => {
                if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.department.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.dateUpdate.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.idMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                    || item.result.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                ) {
                    return true
                }
                return false
            })

        } else if (this.state.inputSearch === "") {
            arr2 = this.state.allData
        }
        this.setState({
            allData: arr2
        }, () => {
            this.checkAfter22History()
        })
    }

    checkBefore22 = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateAfter !== "") {
                if ((day.dateAccept >= this.state.dateBefore) && (day.dateAccept <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateBefore !== "") {
                if (day.dateAccept >= this.state.dateBefore) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
            pageNow: 1,
        })
    }

    checkBefore22History = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateAfter !== "") {
                if ((day.dateUpdateValue >= this.state.dateBefore) && (day.dateUpdateValue <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateBefore !== "") {
                if (day.dateUpdateValue >= this.state.dateBefore) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
            pageNow: 1,
        })
    }

    checkAfter22 = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateBefore !== "") {

                if ((day.dateAccept >= this.state.dateBefore) && (day.dateAccept <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateAfter !== "") {

                if (day.dateAccept <= this.state.dateAfter) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
            pageNow: 1,
        })
    }

    checkAfter22History = () => {
        let arr = []
        var counterPage = 0

        arr = this.state.allData.filter((day) => {
            if (this.state.dateBefore !== "") {

                if ((day.dateUpdateValue >= this.state.dateBefore) && (day.dateUpdateValue <= this.state.dateAfter)) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else if (this.state.dateAfter !== "") {

                if (day.dateUpdateValue <= this.state.dateAfter) {
                    counterPage = counterPage + 1
                    return true
                } else {
                    return false
                }
            } else {
                counterPage = counterPage + 1
                return true
            }
        })

        this.setState({
            allData: arr,
            data: arr,
            counter: counterPage,
            pageNow: 1
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
            <div>
                <div >
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
                                        {this.props.table === "Index" ? (
                                            <Input placeholder="Search" type="text" onChange={async (e) => {
                                                await this.setState({ inputSearch: e.target.value })
                                                let arr = []
                                                if(this.state.inputSearch === ""){
                                                    this.handleSelectBeforeClear()
                                                    this.handleSelectAfterClear()
                                                }
                                                if ((this.state.dateBefore === "") && (this.state.dateAfter === "")) {
                                                    await this.setState({
                                                        data: this.state.dataForSearchDate
                                                    })
                                                    arr = this.state.data.filter((item) => {
                                                        if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.serialNumber.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.storageLocation.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.namePickUp.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.attribute.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.company.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.dateAccept.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                        ) {
                                                            return true
                                                        }
                                                        return false
                                                    })
                                                    this.setState({
                                                        allData: arr,
                                                        counter: arr.length,
                                                        pageNow: 1,
                                                    })
                                                } else {
                                                    arr = this.state.data.filter((item) => {
                                                        if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.serialNumber.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.storageLocation.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.namePickUp.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.attribute.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.company.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.dateAccept.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                        ) {
                                                            return true
                                                        }
                                                        return false
                                                    })
                                                    this.setState({
                                                        allData: arr,
                                                        counter: arr.length,
                                                        pageNow: 1,
                                                    })
                                                }

                                            }} />) : this.props.table === "History" ? (
                                                <Input placeholder="Search" type="text" onChange={async (e) => {
                                                    await this.setState({ inputSearch: e.target.value })
                                                    let arr = []
                                                    if(this.state.inputSearch === ""){
                                                        this.handleSelectBeforeClear()
                                                        this.handleSelectAfterClear()
                                                    }
                                                    if ((this.state.dateBefore === "") && (this.state.dateAfter === "")) {
                                                        await this.setState({
                                                            data: this.state.dataForSearchDate
                                                        })
                                                        arr = this.state.data.filter((item) => {
                                                            if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.department.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.dateUpdate.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.idMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.result.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            ) {
                                                                return true
                                                            }
                                                            return false
                                                        })
                                                        this.setState({
                                                            allData: arr,
                                                            counter: arr.length,
                                                            pageNow: 1,
                                                        })
                                                    } else {
                                                        arr = this.state.data.filter((item) => {
                                                            if (item.listMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.durableCode.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.department.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.dateUpdate.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.materialStatus.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.idMaterial.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.id.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                                || item.result.toLowerCase().includes(this.state.inputSearch.toLowerCase())
                                                            ) {
                                                                return true
                                                            }
                                                            return false
                                                        })
                                                        this.setState({
                                                            allData: arr,
                                                            counter: arr.length,
                                                            pageNow: 1,
                                                        })
                                                    }

                                                }} />) : (null)}

                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="col-auto" style={{}} lg="3" md="6">
                            <Form style={{ padding: "0px 20px 20px 20px", minWidth: "250px" }} >
                                <FormGroup className="mb-0">
                                    {this.props.table === "Index" ? (
                                        <InputGroup className="form-control-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-calendar" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="date" className="form-control"
                                                name="dateBefore"
                                                value={this.state.dateBefore}
                                                onChange={(e) => {
                                                    this.setState({
                                                        dateBefore: e.target.value,
                                                    }, () => {
                                                        this.handleSelectBefore()
                                                    })
                                                }
                                                }
                                            />
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText >
                                                    <i style={{ cursor: "pointer" }} className="fas fa-times"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                dateBefore: "",
                                                            }, () => {
                                                                this.handleSelectAfterClear()
                                                            })
                                                        }
                                                        } />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    ) : this.props.table === "History" ? (
                                        <InputGroup className="form-control-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-calendar" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="date" className="form-control"
                                                name="dateBefore"
                                                value={this.state.dateBefore}
                                                onChange={(e) => {
                                                    this.setState({
                                                        dateBefore: e.target.value,
                                                    }, () => {
                                                        this.handleSelectBeforeHistory()
                                                    })
                                                }
                                                }
                                            />
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText >
                                                    <i style={{ cursor: "pointer" }} className="fas fa-times"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                dateBefore: "",
                                                            }, () => {
                                                                this.handleSelectAfterClearHistory()
                                                            })
                                                        }
                                                        } />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    ) : (null)}

                                </FormGroup>
                            </Form>
                        </div>
                        <div className="icon icon-shape rounded-circle shadow">
                            <i className="fas fa-arrow-circle-right" style={{ height: "25px" }} />
                        </div>
                        <div className="col-auto" style={{}} lg="3" md="6">
                            <Form style={{ padding: "0px 20px 20px 20px", minWidth: "250px" }} >
                                <FormGroup className="mb-0">
                                    {this.props.table === "Index" ? (
                                        <InputGroup className="form-control-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-calendar" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="date" type="date"
                                                name="dateAfter"
                                                value={this.state.dateAfter}
                                                onChange={(e) => {
                                                    this.setState({
                                                        dateAfter: e.target.value,
                                                    }, () => {
                                                        this.handleSelectAfter()
                                                    }
                                                    )
                                                }
                                                } />
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i style={{ cursor: "pointer" }} className="fas fa-times"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                dateAfter: "",
                                                            }, () => {
                                                                this.handleSelectBeforeClear()
                                                            })
                                                        }
                                                        } />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    ) : this.props.table === "History" ? (
                                        <InputGroup className="form-control-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-calendar" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="date" type="date"
                                                name="dateAfter"
                                                value={this.state.dateAfter}
                                                onChange={(e) => {
                                                    this.setState({
                                                        dateAfter: e.target.value,
                                                    }, () => {
                                                        this.handleSelectAfterHistory()
                                                    }
                                                    )
                                                }
                                                } />
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i style={{ cursor: "pointer" }} className="fas fa-times"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                dateAfter: "",
                                                            }, () => {
                                                                this.handleSelectBeforeClearHistory()
                                                            })
                                                        }
                                                        } />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    ) : (null)}

                                </FormGroup>
                            </Form>
                        </div>
                    </Row>
                    <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                            {this.props.table === "Index" ? (
                                <tr>
                                    <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ID</th>
                                    <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รายการ</th>
                                    <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รหัสครุภัณฑ์</th>
                                    <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">สถานะ</th>
                                    <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">วันที่เบิกครุภัณฑ์</th>
                                    <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ชื่อผู้เบิกครุภัณฑ์</th>
                                </tr>) : (
                                    <tr>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ID</th>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">คณะ/หน่วยงาน</th>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รายการ</th>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">รหัสครุภัณฑ์</th>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ผลการตรวจ</th>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">วันที่ตรวจ</th>
                                        <th style={{ maxWidth: 200, wordWrap: "break-word" }} scope="col">ผู้ตรวจ</th>
                                    </tr>)}

                        </thead>

                        <tbody>
                            {this.props.table === "Index" ? this.state.allData !== undefined ? (
                                this.state.allData.filter((item, index) => {
                                    return (item !== null &&
                                        this.state.pageNow ===
                                        Math.ceil((index + 1) / this.state.max_per_page))
                                }).map((item, key) => {
                                    return (
                                        <tr key={key} >
                                            <th scope="row"><ModalQR
                                                buttonLabel={item.id}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show data"
                                                modalSize="sm"
                                            /></th>
                                            <td ><ModalQR
                                                buttonLabel={item.listMaterial}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show data"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.durableCode}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show data"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.materialStatus}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show data"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.dateAccept}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show data"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.namePickUp}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show data"
                                                modalSize="sm"
                                            /></td>
                                        </tr>
                                    )
                                })
                            ) : (null) : this.props.table === "History" ? this.state.allData !== undefined ? (
                                this.state.allData.filter((item, index) => {
                                    return (item !== null &&
                                        this.state.pageNow ===
                                        Math.ceil((index + 1) / this.state.max_per_page))
                                }).map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row"><ModalQR
                                                buttonLabel={item.id}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></th>
                                            <td ><ModalQR
                                                buttonLabel={item.department}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.listMaterial}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.durableCode}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.result}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.dateUpdate}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></td>
                                            <td><ModalQR
                                                buttonLabel={item.name}
                                                className={""}
                                                modalTitle="Material Detail"
                                                data={item}
                                                modalType="show history"
                                                modalSize="sm"
                                            /></td>
                                        </tr>
                                    )
                                })
                            ) : (null) : (null)}
                        </tbody>
                    </Table>
                </div>
                {this.renderFooter()}
            </div>
        )
    }
}

export default Page;