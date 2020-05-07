import React from 'react'

import { QRCode } from "react-qr-svg"

import PrintComponents from "react-print-components"

const PrintQR = (props) => {
    var {
        dataToPrint
    } = props;

    return (
        <div>
            <PrintComponents
                trigger={<button type="button" className="btn btn-primary">Print</button>}
            >
                <div className="d-flex flex-wrap">
                    {dataToPrint.map((item, index) => {
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
        </div>
    )
}

export default PrintQR