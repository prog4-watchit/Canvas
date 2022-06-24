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
    const [arrowsOpacity , setArrowsOpacity] = useState({arrowBack:0.5 , arrowForward:0.5})
    const [canvasPrev, setCanvasPrev] = useState([]);
    const [isDisplayFill, setIsDisplayFill] = useState(false);
    const [color, setColor] = useState("#000000")
    const [selectFillColor, SetSelectFillColor] = useState()
    const [memoryColors, setMemoryColors] = useState({ fillColorMemory: "#ffffff", borderColorMemory: "#000000" })
    const [activeBtn, setActiveBtn] = useState({
        pancil: true,
        line: false,
        text: false,
        rectangle: false,
        circle: false,
        erase: false,
        arrow: false,
        save: false,
        clean: false,
        bgColor: true,
        forward: false,
        back: false
    })
    const [lineWidth, setLineWidth] = useState(2);
    const [buttonsState, setButtonsState] = useState(DefaultButtonsState(activeBtn, setActiveBtn))
    
    return (
        
        <div className="row canvas-bg ps-3  m-0" >
            <div className={width > 300 ? "col-11 px-0" : "col-9 px-0" } style={{
                width:width
            }}>
            
                <div className="row mw-100  m-0">
                    
                        <div className="col-6  m-0 d-flex align-content-end flex-wrap">
                            <div onClick ={() => setActiveBtn(prev => ({...prev , back:true}) )}>
                                <Tooltip title={"Назад"} placement="bottom">
                                    <span style ={{
                                            opacity:canvasPrev.length > 2 ? "1" : "0.5"
                                        }} >
                                        <i className="fas fa-reply canvas-condition pe-3"></i>
                                    </span>
                                </Tooltip>
                            </div>
                            <div onClick ={() => setActiveBtn(prev => ({...prev , forward:true}) )}>
                                <Tooltip title={"Вперед"} placement="bottom">
                                    <span 
                                        style ={{
                                            opacity:arrowsOpacity.arrowForward
                                        }}>
                                            <i className="fas fa-share canvas-condition"></i>
                                        </span>
                                </Tooltip>
                            </div>
                            
                           
                        </div>

                        <div className="col-6 d-flex justify-content-end">
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
                <div className="row mw-100 ps-1 m-0"
                    style={{
                        width:width
                    }}>
                    <div className="col-12 px-0">
                    <div className="canvas-body">
                        <UseCanvas
                         
                            color={color}
                            selectFillColor={selectFillColor}
                            lineWidth={lineWidth}
                            activeBtn={activeBtn}
                            setActiveBtn={setActiveBtn}
                            canvasWidth={canvasWidth}
                            canvasHeight={canvasHeight}
                            canvasPrev = {canvasPrev}
                            setCanvasPrev = {setCanvasPrev}
                            arrowsOpacity={arrowsOpacity}
                            setArrowsOpacity = {setArrowsOpacity}

                        />
                    </div>
                    </div>
                </div>
                 {/* интсрумент текст под canvas */}
                {/* <div className="row mw-100 m-0">
                    <div className="col-12">
                        <div className="d-flex flex-end justify-content-end mt-1">
                            <div className="d-flex justify-content-end align-items-center" id={activeBtn.text ? "scaleZ" : ""}
                                style={{
                                    minHeight: "30px",
                                    minWidth: "30px",
                                    cursor: 'pointer',
                                    fontSize: "20px",
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
                </div> */}

            </div>
            <div className={width > 300 ? "col-1 ms-2 mt-4" : "col-3 ms-2 mt-4" + " "}>
                <div className="row m-0">
                    <div className="col-9 px-0">
                        
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
                                                    <Tooltip title={b.tooltip} placement= {b.id != "fillColor" ? "right" : "left"}>
                                                        <div>
                                                            {b.inner({ isDisplayFill, setIsDisplayFill, SetSelectFillColor, memoryColors, setMemoryColors, color, setColor })}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            ))
                                    }
                    </div>
                </div>
              
                    <div className="col-3 ps-2 pe-0"> 
                        <VerticalSlider setLineWidth={setLineWidth} lineWidth={lineWidth} />
                    </div>
                </div>
                   
                
                            
            </div>
        </div>    
            
    )
}

export default Canvas