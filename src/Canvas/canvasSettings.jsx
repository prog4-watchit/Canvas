import React, { useState } from 'react';
import UseCanvas from './DrawCanvas';
import { Tooltip } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import DefaultButtonsState from './defaultButtonsState.js';
import VerticalSlider from "./VerticalSlider";
import './canvas.scss'

function Canvas({ width = 600, height = 320 }) {

    const canvasWidth = width;
    const canvasHeight = height;
    const [isDisplayFill, setIsDisplayFill] = useState(false);
    const [color, setColor] = useState("#000000")
    const [selectFillColor, SetSelectFillColor] = useState()
    const [memoryColors, setMemoryColors] = useState({ fillColorMemory: "#ffffff", borderColorMemory: "#000000" })
    const [activeBtn, setActiveBtn] = useState({
        pancil: false,
        line: false,
        text: false,
        rectangle: false,
        circle: false,
        erase: false,
        arrow: false,
        save: false,
        clean: false,
        bgColor: true,

    })
    const [lineWidth, setLineWidth] = useState(2);
    const [buttonsState, setButtonsState] = useState(DefaultButtonsState(activeBtn, setActiveBtn))

    return (
        
        <div className="row canvas-bg pt-3 ps-5" >
            <div className="col-11 px-0 flex-end"
                style={{
                    width: width+5
                }}>
                <div className="row mw-100 ">
                    <div className="col-12 py-0 flex-end">
                    <div className="d-flex justify-content-end">
                            {
                                buttonsState.
                                    filter(item => item.id === "save" || item.id === "clean").map((b, i) => (
                                        <div className="d-flex justify-content-center align-items-center" id={activeBtn[b.id] ? "scaleZ" : ""}
                                            style={{
                                                minHeight: "30px",
                                                minWidth: "30px",
                                                cursor: 'pointer',
                                                fontSize: "20px",
                                                borderTopLeftRadius: i === 0 ? "0.3rem" : "0",
                                                borderTopRightRadius: i === 0 ? "0.3rem" : "0",
                                                borderBottomLeftRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                borderBottomRightRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                color: "#71716f",
                                            }}
                                            key={i}
                                            onClick={activeBtn[b.id] ? b.onOff : b.onClick}
                                        >
                                            <Tooltip title={b.tooltip} placement="top">
                                                <div>
                                                    {b.inner({ isDisplayFill, setIsDisplayFill, SetSelectFillColor, memoryColors, setMemoryColors, color, setColor })}
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
                <div className="row mw-100">
                    <div className="col-12 py-0">
                    <div className="canvas-body">
                        <UseCanvas
                            color={color}
                            selectFillColor={selectFillColor}
                            lineWidth={lineWidth}
                            activeBtn={activeBtn}
                            setActiveBtn={setActiveBtn}
                            canvasWidth={canvasWidth}
                            canvasHeight={canvasHeight}

                        />
                    </div>
                    </div>
                </div>
                <div className="row mw-100">
                    <div className="col-12">
                        <div className="d-flex flex-end justify-content-end mt-1">
                            <div className="d-flex justify-content-end align-items-center" id={activeBtn.text ? "scaleZ" : ""}
                                style={{
                                    minHeight: "30px",
                                    minWidth: "30px",
                                    cursor: 'pointer',
                                    fontSize: "20px",
                                    // borderTopLeftRadius: i === 0 ? "0.3rem" : "0",
                                    // borderTopRightRadius: i === 0 ? "0.3rem" : "0",
                                    // borderBottomLeftRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                    // borderBottomRightRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                    color: "#71716f",
                                }}

                                onClick={() => setActiveBtn({ text: true })}
                            >
                                <Tooltip title={"Текст"} placement="bottom">
                                    <div>
                                        <i className="fas fa-font pe-2" style={{
                                            color: "rgb(113, 113, 111)"
                                        }} />
                                    </div>
                                </Tooltip>
                            </div>



                        </div>
                    </div>
                </div>

            </div>
            <div className="col-1 ps- text-start">
                <div className="row">
                    <div className="col-8 py-0">
                        <div className="row"></div>
                        <div className="canvas-tools " style={{ userSelect: "none" }}>
                                    {
                                        buttonsState.
                                            filter(item => item.id !== "save" && item.id !== "clean").map((b, i) => (
                                                <div className=" d-flex justify-content-center align-items-center" id={activeBtn[b.id] ? "scaleZ" : ""}
                                                    style={{
                                                        minHeight: "30px",
                                                        minWidth: "30px",
                                                        cursor: 'pointer',
                                                        fontSize: "20px",
                                                        borderTopLeftRadius: i === 0 ? "0.3rem" : "0",
                                                        borderTopRightRadius: i === 0 ? "0.3rem" : "0",
                                                        borderBottomLeftRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                        borderBottomRightRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                        borderBottom: i !== buttonsState.length - 1 && b.id !== "color" ? "1px solid #d5d5d5" : "",
                                                        color: "#71716f",
                                                    }}
                                                    key={i}
                                                    onChange={(e) => {
                                                        if (e.target.id === "selectColor") {
                                                            setColor(e.target.value)

                                                        }
                                                        if (e.target.id === "selectFillColor") {
                                                            SetSelectFillColor(e.target.value)
                                                        }
                                                    }}
                                                    onClick={activeBtn[b.id] ? b.onOff : b.onClick}
                                                >
                                                    <Tooltip title={b.tooltip} placement="right">
                                                        <div>
                                                            {b.inner({ isDisplayFill, setIsDisplayFill, SetSelectFillColor, memoryColors, setMemoryColors, color, setColor })}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            ))
                                    }
                    </div>
                </div>
              
                <div className="col-4 ps-0 pe-0"> 
                    <VerticalSlider setLineWidth={setLineWidth} lineWidth={lineWidth} />
                </div>
                </div>
                   
                
                            
            </div>
        </div>    






            /*{ <div className=" text-center">
                <div className="canvas-container">
                    <div className="canvas-top">
                        <div className="d-flex flex-row " style={{ top: "-30px", right: "95px" }}>
                            {
                                buttonsState.
                                    filter(item => item.id === "save" || item.id === "clean").map((b, i) => (
                                        <div className="d-flex justify-content-center align-items-center" id={activeBtn[b.id] ? "scaleZ" : ""}
                                            style={{
                                                minHeight: "30px",
                                                minWidth: "30px",
                                                cursor: 'pointer',
                                                fontSize: "20px",
                                                borderTopLeftRadius: i === 0 ? "0.3rem" : "0",
                                                borderTopRightRadius: i === 0 ? "0.3rem" : "0",
                                                borderBottomLeftRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                borderBottomRightRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                color: "#71716f",
                                            }}
                                            key={i}
                                            onClick={activeBtn[b.id] ? b.onOff : b.onClick}
                                        >
                                            <Tooltip title={b.tooltip} placement="top">
                                                <div>
                                                    {b.inner({ isDisplayFill, setIsDisplayFill, SetSelectFillColor, memoryColors, setMemoryColors, color, setColor })}
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>

                    <div className="canvas-body">
                        <UseCanvas
                            color={color}
                            selectFillColor={selectFillColor}
                            lineWidth={lineWidth}
                            activeBtn={activeBtn}
                            setActiveBtn={setActiveBtn}
                            canvasWidth={canvasWidth}
                            canvasHeight={canvasHeight}

                        />

                        <div className="canvas-tools " style={{ userSelect: "none" }}>
                            {
                                buttonsState.
                                    filter(item => item.id !== "save" && item.id !== "clean").map((b, i) => (
                                        <div className=" d-flex justify-content-center align-items-center" id={activeBtn[b.id] ? "scaleZ" : ""}
                                            style={{
                                                minHeight: "30px",
                                                minWidth: "30px",
                                                cursor: 'pointer',
                                                fontSize: "20px",
                                                borderTopLeftRadius: i === 0 ? "0.3rem" : "0",
                                                borderTopRightRadius: i === 0 ? "0.3rem" : "0",
                                                borderBottomLeftRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                borderBottomRightRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                                borderBottom: i !== buttonsState.length - 1 && b.id !== "color" ? "1px solid #d5d5d5" : "",
                                                color: "#71716f",
                                            }}
                                            key={i}
                                            onChange={(e) => {
                                                if (e.target.id === "selectColor") {
                                                    setColor(e.target.value)

                                                }
                                                if (e.target.id === "selectFillColor") {
                                                    SetSelectFillColor(e.target.value)
                                                }
                                            }}
                                            onClick={activeBtn[b.id] ? b.onOff : b.onClick}
                                        >
                                            <Tooltip title={b.tooltip} placement="right">
                                                <div>
                                                    {b.inner({ isDisplayFill, setIsDisplayFill, SetSelectFillColor, memoryColors, setMemoryColors, color, setColor })}
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ))
                            }
                        </div>
                        {
                            <VerticalSlider setLineWidth={setLineWidth} lineWidth={lineWidth} />
                        }

                    </div>
                    <div className="d-flex flex-end justify-content-end mt-1 margin100">
                        <div className="d-flex justify-content-end align-items-center" id={activeBtn.text ? "scaleZ" : ""}
                            style={{
                                minHeight: "30px",
                                minWidth: "30px",
                                cursor: 'pointer',
                                fontSize: "20px",
                                // borderTopLeftRadius: i === 0 ? "0.3rem" : "0",
                                // borderTopRightRadius: i === 0 ? "0.3rem" : "0",
                                // borderBottomLeftRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                // borderBottomRightRadius: i === buttonsState.length - 1 ? "0.3rem" : "0",
                                color: "#71716f",
                            }}

                            onClick={() => setActiveBtn({ text: true })}
                        >
                            <Tooltip title={"Текст"} placement="bottom">
                                <div>
                                    <i className="fas fa-font pe-2" style={{
                                        color: "rgb(113, 113, 111)"
                                    }} />
                                </div>
                            </Tooltip>
                        </div>



                    </div>
                </div>
            </div> }*/
       




    )
}

export default Canvas