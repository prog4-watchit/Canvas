import Rectangle from "./assets/rectangle.png"
function DefaultButtonsState(activeBtn, setActiveBtn){ 
   // все инструменты канваса
   
    const defaultButtonsState = [
        
        {
         id:"pancil",
         tooltip : "Редактировать",
         active : activeBtn.pancil,
         inner: () => <i className="fas fa-pencil-alt " style={{
            transform:"rotate(90deg)"
         }} />,
         onClick : () => setActiveBtn({pancil:true}),
     
       },
       {
        id:"line",
        tooltip : "Линия",
        active :activeBtn.color,
        inner: () => <i className="fas fa-solid fa-slash"></i>,
        onClick : () => setActiveBtn({line:true}) 
    
       },
       {
         id:"arrow",
         tooltip : "Стрелочка",
         active :activeBtn.arrow,
         inner:() => <i className="fas fa-long-arrow-alt-up" style={{
             transform:"rotate(-45deg)"
          }}></i>,
         onClick : () => setActiveBtn({arrow:true}),
     },
       {
           id:"rectangle",
           tooltip : "Прямоугольник",
           active :activeBtn.rectangle,
           inner: () => <img src={Rectangle} style={{
              width:"20px",
              color: "#71716f"
           }}/>,
          onClick : () => setActiveBtn({rectangle:true}),
       },
       {
           id:"circle",
           tooltip : "Круг",
           active :activeBtn.circle,
           inner: () => <i className="far fa-circle"></i>,
           onClick : () => setActiveBtn({circle:true}),
       },
       {
         id:"text",
         tooltip : "Текст",
         active :activeBtn.text,
         inner:() => <i className="fas fa-font"></i>,
         onClick : () => setActiveBtn({ text:true})
     
       },
     
       {
           id:"erase",
           tooltip : "Стереть",
           active :activeBtn.erase,
           inner: () => <i className="fas fa-eraser"></i>,
           onClick : () => setActiveBtn({erase:true}),
       },
       {
         id:"color",
         tooltip : "Цвет",
         active :activeBtn.color,
         inner: ({setMemoryColors , memoryColors ,color, setColor,SetSelectFillColor,isDisplayFill}) => 
                        <div className="d-flex flex-column text-center m-0 pt-1">
                               <input type="color" id="selectColor" 
                                   value={color}
                                   onChange={()=>{}}
                               />
                               <i className="fas fa-sync-alt pt-1 " 
                                  onClick = {(e)=> {
                                     if(isDisplayFill){
                                        let tempBorderColor = color
                                        setColor(memoryColors.fillColorMemory)
 
                                        SetSelectFillColor(tempBorderColor)
                                        setMemoryColors({fillColorMemory: tempBorderColor})
                                     }
                                    
                                  }}
                                  style={{
                                     color:"#1976d2"
                                  }}
                                  
                               /> 
                      </div>,
         onClick : () => {return true},
     
      },
      {
      id:"fillColor",
      tooltip: "",
      active: activeBtn.fillColor,
      inner: ({isDisplayFill,  memoryColors, setMemoryColors , setIsDisplayFill  ,SetSelectFillColor ,fillColorMemory}) => 
      
       <div className=" pb-1" style={{
         position: "relative"
       }}>
                <div className={ `${isDisplayFill ? "" : "striked up " }` + " align-items-center"} 
                   onClick={() => {
                      setIsDisplayFill(true)
                      !isDisplayFill ? SetSelectFillColor(memoryColors.fillColorMemory) : SetSelectFillColor()
                   }}
                   
                >
                   
                   <input type="color" id="selectFillColor"
                      className="mt-1"
                      value={memoryColors.fillColorMemory}
                      onChange ={(e) => { setMemoryColors({fillColorMemory: e.target.value}) }}
                      disable={isDisplayFill ? "" : "disabled"}
                    
                   />
                   
                </div>
                { isDisplayFill ? <i class="fas fa-times ps-1 text-danger" 
                         style= {{ fontSize:"1.2rem" ,
                                   cursor:"pointer" ,
                                   position:"absolute",
                                   top:5, left:34
                                 }}
                         onClick={() => {
                               setIsDisplayFill(false)
                               !isDisplayFill ? SetSelectFillColor(memoryColors.fillColorMemory) : SetSelectFillColor()
                         }}
                      >

                      </i> : null }
    
       </div>,
      onClick : () => {return true}
  
      },
       {
         id:"save",
         tooltip : "Сохранить",
         active :activeBtn.save,
         inner:() => <i className="far fa-save"></i>,
         onClick : () => setActiveBtn({save:true }),
       },
       
       {
        id:"clean",
        tooltip : "Удалить все",
        active :activeBtn.clean,
        inner: () => <i className="fas fa-times"></i>,
        onClick : () => setActiveBtn(prev =>({...prev, clean:true}))
    },
    
    {
        id:"bgColor",
        tooltip : "Залить фон",
        active :activeBtn.bgColor,
        inner:() =>
         <div className="text-center">
            <i className="fas fa-solid fa-fill-drip"></i>
         </div>,
        onClick : () => setActiveBtn(prev =>({...prev, bgColor:true}))
    
    },
    
   ]
   
   return defaultButtonsState
}


export default DefaultButtonsState