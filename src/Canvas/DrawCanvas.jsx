import React, { useRef, useEffect } from 'react'
import "./canvas.scss"
import { useState } from 'react'

/*Функция отрисовки*/
let x = 0 , y = 0

   
//генерация случайных символов
function makeRandomUrl() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let i = 30
    while(i--)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
 

function Canvas({ color, lineWidth, activeBtn, setActiveBtn, 
    selectFillColor, canvasWidth, canvasHeight , canvasPrev ,
    setCanvasPrev , setArrowsOpacity , arrowsOpacity }) {

    const canvasRef = useRef()
    const canvasRef2 = useRef()
    
    const [current, setCurrent] = useState(10);
    const [inputText, setInputText] = useState({ text: "", x: null, y: null })
    const [PrevInputText, PrevSetInputText] = useState({ text: "", x: null, y: null })

    let ctx, ctxDraw
    const[history , setHistory] = useState(1)

   const savePrevCanvasState =() => {
            y++
            console.log(y)
            if(y > 2 ) {
                setArrowsOpacity(prev => ({...prev,  arrowBack: 1 }))
            } 
           
            setHistory(1)
            let image = new Image();
            image.src = canvasRef.current.toDataURL("image/png");
            setCanvasPrev(prev => [...prev, image.src])
 
    }
  

    useEffect(() => {
        ctx = canvasRef.current.getContext('2d')
        ctxDraw = canvasRef2.current.getContext('2d')

        ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
        lineWidth <= 10 ? ctxDraw.font = `10pt Roboto` : ctxDraw.font = `${lineWidth}pt Roboto`
        ctxDraw.fillStyle = color;
        ctxDraw.fillText(inputText.text, inputText.x, inputText.y);

        handleDrawing()      
       
    }, [color, lineWidth, activeBtn, selectFillColor, inputText.text])

    useEffect(() => {
        
        ctx = canvasRef.current.getContext('2d')
        ctxDraw = canvasRef2.current.getContext('2d')
     

        lineWidth <= 10 ? ctx.font = `10pt Roboto` : ctx.font = `${lineWidth}pt Roboto`
        ctx.fillStyle = color;
        ctx.fillText(PrevInputText.text, PrevInputText.x, PrevInputText.y)

        PrevSetInputText(prev => ({...prev, text: "" , x:inputText.x , y:inputText.y }))
        setInputText(prev => ({...prev, text: ""}))
        PrevInputText.text && PrevInputText.text != "" ? savePrevCanvasState() :void 0

    }, [inputText.x , inputText.y ])

    useEffect(() => {

            lineWidth <= 10 ? ctxDraw.font = `10pt Roboto` : ctxDraw.font = `${lineWidth}pt Roboto`
            ctxDraw.fillStyle = color;

            ctx.fillText(PrevInputText.text, PrevInputText.x, PrevInputText.y)
            PrevSetInputText({ text: "", x: null, y: null })
            setInputText({ text: "", x: null, y: null })

    }, [activeBtn , lineWidth])

    const handleDrawing = () => {
        

        canvasRef2.current.onmousemove = null
        canvasRef.current.onmousemove = null
        canvasRef2.current.onmousedown = null
        canvasRef.current.onmousedown = null
        canvasRef2.current.onmouseup = null
        canvasRef.current.onmouseup = null

        if (activeBtn.text) {
            setCurrent(10);
            
            let x, y
            ctx.fillStyle = color;
            canvasRef2.current.onmousedown = (e) => {
                ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
                ctxDraw.beginPath()
                x = e.offsetX;
                y = e.offsetY;
                setTimeout(()=> {
                    ctxDraw.lineWidth=2
                    ctxDraw.beginPath()
                    ctxDraw.moveTo(x, y)
                    ctxDraw.lineTo(x, y - 19);
                    ctxDraw.lineTo(x, y + 15)
                    ctxDraw.stroke()
                }, 10)
                

                setInputText(prev => ({ ...prev, x: x, y: y }))
                ctxDraw.closePath()
               
            }

        }
        if (activeBtn.pancil) {
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            setCurrent(-1);
           
            canvasRef.current.onmousedown = (e) => {
                ctx.closePath()
                ctx.beginPath();
                let x = e.offsetX;
                let y = e.offsetY;
                ctx.lineCap = "round"
                ctx.fillStyle = color
                ctx.strokeStyle = color
                canvasRef.current.onmousemove = (e) => {
                    x = e.offsetX;
                    y = e.offsetY;
                    ctx.lineWidth = lineWidth;
                    ctx.lineTo(x, y);
                    ctx.stroke()
                }
          
                canvasRef.current.onmouseup = () => { canvasRef.current.onmousemove = null; savePrevCanvasState() }
                canvasRef.current.onmouseleave = () => canvasRef.current.onmousemove = null
            }
           
        }
        if (activeBtn.circle) {
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            ctxDraw.beginPath()
            setCurrent(10);
            
            canvasRef2.current.onmousedown = (e) => {
                ctxDraw.beginPath()
                let x = e.offsetX, Rx, Ry, radius, y = e.offsetY;

                ctxDraw.strokeStyle = color;
                ctxDraw.lineWidth = lineWidth
                ctxDraw.fillStyle = selectFillColor;

                ctx.fillStyle = selectFillColor;
                ctx.strokeStyle = color;
                ctx.lineWidth = lineWidth

                canvasRef2.current.onmousemove = (e) => {
                    ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
                    ctxDraw.beginPath()
                    Rx = e.offsetX;
                    Ry = e.offsetY;
                    radius = Math.pow(Math.pow(x - Rx, 2) + Math.pow(y - Ry, 2), 0.5)
                    ctxDraw.arc(x + 10, y + 10, radius, 0, 2 * Math.PI)
                    ctxDraw.stroke()

                }
                canvasRef2.current.onmouseup = () => {
                    ctx.beginPath()
                    ctx.arc(x + 10, y + 10, radius, 0, 2 * Math.PI)
                    selectFillColor !== undefined ? ctx.fill() : void 0
                    ctx.stroke()
                    ctx.closePath()
                    canvasRef2.current.onmousemove = null
                    savePrevCanvasState();

                }
                canvasRef2.current.onmouseleave = () => canvasRef2.current.onmousemove = null
            }
        }
        if (activeBtn.rectangle) {
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            setCurrent(10);
            ctxDraw.fillText(inputText.text, inputText.x, inputText.y)
            canvasRef2.current.onmousedown = (e) => {
                ctxDraw.beginPath()
                let x = e.offsetX;
                let y = e.offsetY;
                let Rx, Ry, radius;

                ctxDraw.strokeStyle = color;
                ctxDraw.lineWidth = lineWidth
                ctxDraw.fillStyle = selectFillColor;
                canvasRef2.current.onmousemove = (e) => {
                    ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
                    ctxDraw.beginPath()
                    Rx = e.offsetX;
                    Ry = e.offsetY;
                    radius = Math.pow(Math.pow(x - Rx, 2) + Math.pow(y - Ry, 2), 0.5)
                    ctxDraw.rect(x + 3, y + 3, Rx - x, Ry - y)
                    ctxDraw.stroke()

                }
                canvasRef2.current.onmouseup = () => {
                    ctx.beginPath()
                    ctx.strokeStyle = color;
                    ctx.lineWidth = lineWidth

                    ctx.fillStyle = selectFillColor;
                    ctx.rect(x + 3, y + 3, Rx - x, Ry - y)
                    selectFillColor !== undefined ? ctx.fill() : void 0
                    ctx.stroke()
                    ctx.closePath()

                    canvasRef2.current.onmousemove = null
                    savePrevCanvasState();
                }
                canvasRef2.current.onmouseleave = () => canvasRef2.current.onmousemove = null
            }
        }
        if (activeBtn.erase) {
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            ctxDraw.beginPath()
            setCurrent(-1);
            ctxDraw.fillText(inputText.text, inputText.x, inputText.y)
            canvasRef.current.onmousedown = (e) => {
                ctx.closePath()
                ctx.beginPath();
                let x = e.offsetX;
                let y = e.offsetY;
                ctx.fillStyle = "white"
                ctx.lineCap = "round"
                ctx.strokeStyle = "white"
                canvasRef.current.onmousemove = (e) => {

                    x = e.offsetX;
                    y = e.offsetY;
                    ctx.lineWidth = lineWidth;
                    ctx.lineTo(x, y);
                    ctx.stroke()
                }
                canvasRef.current.onmouseup = () =>{ canvasRef.current.onmousemove = null ;savePrevCanvasState();}
                canvasRef.current.onmouseleave = () => canvasRef.current.onmousemove = null
            }
        }
        if (activeBtn.line) {
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            ctxDraw.beginPath()
            setCurrent(10);
            ctxDraw.fillText(inputText.text, inputText.x, inputText.y)
            canvasRef2.current.onmousedown = (e) => {

                ctx.closePath()
                ctx.beginPath();
                let x = e.offsetX;
                let y = e.offsetY;
                let xR
                let yR
                ctx.lineCap = "round"
                ctx.strokeStyle = color
                ctxDraw.lineCap = "round"
                ctxDraw.strokeStyle = color
                ctxDraw.lineWidth = lineWidth;
                ctx.lineWidth = lineWidth;

                canvasRef2.current.onmousemove = (e) => {
                    ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
                    ctxDraw.beginPath()
                    xR = e.offsetX;
                    yR = e.offsetY;
                    ctxDraw.moveTo(x, y)
                    ctxDraw.lineTo(xR, yR);
                    ctxDraw.stroke()
                }
                canvasRef2.current.onmouseup = (e) => {
                    ctx.moveTo(x, y)
                    ctx.lineTo(xR, yR)
                    ctx.stroke()
                    canvasRef2.current.onmousemove = null
                    savePrevCanvasState();
                }


                canvasRef2.current.onmouseleave = () => canvasRef2.current.onmousemove = null
            }
        }
        if (activeBtn.arrow) {
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            ctxDraw.beginPath()
            setCurrent(10);
            ctxDraw.fillText(inputText.text, inputText.x, inputText.y)
            let fromx, fromy, tox, toy

            ctxDraw.lineCap = "round"
            ctx.lineCap = "round"

            canvasRef2.current.onmousedown = (e) => {

                ctx.closePath()
                ctx.beginPath();
                fromx = e.offsetX;
                fromy = e.offsetY;

                ctx.strokeStyle = color
                ctxDraw.fillStyle = color;
                ctx.fillStyle = color;

                ctxDraw.strokeStyle = color
                ctxDraw.lineWidth = lineWidth;
                ctx.lineWidth = lineWidth;

                canvasRef2.current.onmousemove = (e) => {
                    ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
                    ctxDraw.beginPath()
                    tox = e.offsetX;
                    toy = e.offsetY;
                    ctxDraw.moveTo(fromx, fromy)
                    ctxDraw.lineTo(tox, toy);
                    ctxDraw.stroke()
                }
                canvasRef2.current.onmouseup = (e) => {
                    ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
                    let dx = tox - fromx;
                    let dy = toy - fromy;
                    let headlen = Math.sqrt(dx * dx + dy * dy) / 10;
                    headlen > 50 ? headlen = 50 : void 0
                    headlen < 10 ? headlen = 10 : void 0
                    let angle = Math.atan2(dy, dx);
                    tox -= Math.cos(angle) * ((lineWidth * 1.15));
                    toy -= Math.sin(angle) * ((lineWidth * 1.15));
                    ctx.beginPath();
                    ctx.moveTo(fromx, fromy);
                    ctx.lineTo(tox, toy);
                    ctx.stroke();

                    ctx.moveTo(tox, toy);
                    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 10), toy - headlen * Math.sin(angle - Math.PI / 10));

                    //path from the side point of the arrow, to the other side point
                    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 10), toy - headlen * Math.sin(angle + Math.PI / 10));

                    //path from the side point back to the tip of the arrow, and then again to the opposite side point
                    ctx.lineTo(tox, toy);
                    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 10), toy - headlen * Math.sin(angle - Math.PI / 10));

                    //draws the paths created above
                    ctx.fill();
                    ctx.stroke();
                    canvasRef2.current.onmousemove = null
                    savePrevCanvasState();
                }


                canvasRef2.current.onmouseleave = () => canvasRef2.current.onmousemove = null
            }
        }
        if (activeBtn.clean) {

            setCurrent(-1);
            ctx.closePath()
            ctxDraw.closePath()
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)

            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            setActiveBtn(prev => ({ ...prev, clean: false }))
            setInputText(prev => ({ ...prev, text: ""}))
        }
        if (activeBtn.bgColor) {
            selectFillColor === undefined ? ctx.fillStyle = "#ffffff" : ctx.fillStyle = selectFillColor
            ctxDraw.clearRect(0, 0, canvasWidth, canvasHeight)
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            setActiveBtn(prev => ({ ...prev, bgColor: false }))
            savePrevCanvasState();
        }
        if (activeBtn.save) {
            ctxDraw.fillText(inputText.text, inputText.x, inputText.y)
            let canvasUrl = canvasRef.current.toDataURL("image/jpeg", 1)
            canvasUrl = { "img":String(canvasUrl) }
                       
            console.log(JSON.stringify(canvasUrl))
            const url = 'https://example.com/profile';

            const requestObject = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(canvasUrl),
            }
            

            try {
                const response =  fetch(url, requestObject)
                if (!response.ok) {
                    throw new Error('Ответ сети был не ok.');
                }
                const json =  response.json();
                let answer = "www.imageplacement/"+makeRandomUrl()
                //frameCommunicationSend({'action': 'send', 'message':answer})

            } catch (error) {
                console.error("поймал ошибку",error)
            }
            

            // const createEl = document.createElement('a');
            // createEl.href = canvasUrl;
            // createEl.download = "download-this-canvas";
            // createEl.click();
            // createEl.remove();
            // setActiveBtn(prev => ({ ...prev, save: false }))

        }
        
        if(activeBtn.forward){
                x--
                y++ 
           
            if(y > canvasPrev.length) {
                y = canvasPrev.length
                console.log("canvasPrev.length ",canvasPrev.length)
                console.log("y ",y)
            }
            else {
                
                // y > canvasPrev.length ? y = canvasPrev.length : void 0
                x < 0 ? x = 0 : void 0
                console.log("canvasPrev.length ",canvasPrev.length)
                console.log("y ",y)
                setHistory(prev => prev < 1 ? 1 : prev -1)
                history > canvasPrev.length ? setHistory(canvasPrev.length) : void 0
                
                let image = new Image();
                image.src = canvasPrev[(canvasPrev.length  - history + 1 ) < 0 ? 0 : canvasPrev.length  - history + 1]
                
            
                image.onload = function() {
                    ctx.drawImage(image, 0, 0);
                };
                
                setActiveBtn(prev => ({...prev , forward:false}) ) 
                
                

                if(x  === 0)
                {
                    setArrowsOpacity(prev => ({...prev,  arrowForward: 0.5 }))
                }
                if( y  != 2) {
                    setArrowsOpacity(prev => ({...prev,  arrowBack: 1 }))
                }
                
           
            }
            
            
        }
        if(activeBtn.back){
            x++
            y--
            
            y < 2 ? y = 2 : void 0
            x > canvasPrev.length ? x = canvasPrev.length : void 0
            console.log(y)
            history < 0 ? setHistory(prev => prev +1) : void 0

            let image = new Image();
            image.src = canvasPrev[(canvasPrev.length - 1 - history) < 0 ? 0 : canvasPrev.length - 1 - history]
            
            image.onload = function() {
                ctx.drawImage(image, 0, 0);
            };
            setActiveBtn(prev => ({...prev , back:false}) )

            history > canvasPrev.length ? setHistory(canvasPrev.length) : void 0

            setHistory(prev => prev < 0 ? 1 : prev + 1)
        
          

            if(x > 0)
            {
               setArrowsOpacity(prev => ({...prev,  arrowForward: 1 }))
            }
            
            if( y  === 2) {
                setArrowsOpacity(prev => ({...prev,  arrowBack: 0.5 }))
            }
            
            
        }
    }
    
    
  
 
    
    return (
        <>
            <form onChange={(e) => {
               
            }}>

                <canvas id="canvas2" ref={canvasRef2} width={canvasWidth} height={canvasHeight}
                    style={{ zIndex: current, width: canvasWidth, height: canvasHeight }}
                    tabIndex='1' onKeyDownCapture={ e => {
                        if (e.key.length > 1 ) {
                            return
                        } else {
                            setInputText(prev => ({ ...prev, text: inputText.text + e.key})) 
                            PrevSetInputText(prev => ({ ...prev, text: inputText.text + e.key})) 
                        } 

                    }}
                />
                <canvas id="canvas1" ref={canvasRef} width={canvasWidth} height={canvasHeight}
                    style={{ width: canvasWidth, height: canvasHeight }}
                />
            </form>

        </>
    )
}

export default Canvas
/*
// функция инициализации коммуникации с основным окном
function frameCommunicationInit()
{
    if (!window.frameCommunication)
   {
      window.frameCommunication = {timeout: {}};
   }
   if(typeof window.postMessage === 'function')
   {
      window.addEventListener('message', function(event){
         var data = {};
         try { data = JSON.parse(event.data); } catch (err){}

         if (data.action == 'init')
         {
            frameCommunication.uniqueLoadId = data.uniqueLoadId;
            frameCommunication.postMessageSource = event.source;
            frameCommunication.postMessageOrigin = event.origin;
         }
      });
   }
}

// функция отправки данных в основное окно
function frameCommunicationSend(data)
{
   data['uniqueLoadId'] = frameCommunication.uniqueLoadId;
   var encodedData = JSON.stringify(data);
   if (!frameCommunication.postMessageOrigin)
   {
      clearTimeout(frameCommunication.timeout[encodedData]);
      frameCommunication.timeout[encodedData] = setTimeout(function(){
         frameCommunicationSend(data);
      }, 10);
      return true;
   }
   
   if(typeof window.postMessage === 'function')
   {
      if(frameCommunication.postMessageSource)
      {
         frameCommunication.postMessageSource.postMessage(
            encodedData,
            frameCommunication.postMessageOrigin
         );
      }
   }
}
frameCommunicationInit(); */