import Rectangle from "./assets/rectangle.png"
function DefaultButtonsState(activeBtn, setActiveBtn){ 
   // все инструменты канваса
   
    const defaultButtonsState = [
        {
           id:"color",
           tooltip : "Цвет",
           active :activeBtn.color,
           inner: ({setMemoryColors , memoryColors ,color, setColor,SetSelectFillColor,isDisplayFill}) => <div className="d-flex flex-column text-center m-0 p-0">
                                 <input type="color" id="selectColor" 
                                     value={color}
                                     onChange={()=>{}}
                                 />
                                 <i className="fas fa-exchange-alt pt-1 " 
                                    onClick = {(e)=> {
                                       if(isDisplayFill){
                                          let tempBorderColor = color
                                          setColor(memoryColors.fillColorMemory)
   
                                          SetSelectFillColor(tempBorderColor)
                                          setMemoryColors({fillColorMemory: tempBorderColor})
                                       }
                                      
                                    }}
                                    
                                 /> 
                        </div>,
           onClick : () => {return true},
       
        },
        {
        id:"fillColor",
        tooltip: "Заливка",
        active: activeBtn.fillColor,
        inner: ({isDisplayFill,  memoryColors, setMemoryColors}) => 
        
         <div className=" text-center">
                  <div className={isDisplayFill ? "" : "striked up"} >
                     <input type="color" id="selectFillColor"
                        className="mt-1"
                        value={memoryColors.fillColorMemory}
                        onChange ={(e) => { setMemoryColors({fillColorMemory: e.target.value}) }}
                        disabled={isDisplayFill ? "" : "disabled"}
                     />
                  </div>
                   
         </div>,
        onClick : () => {return true}
    
        },
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
           id:"arrow",
           tooltip : "Стрелочка",
           active :activeBtn.arrow,
           inner:() => <i className="fas fa-long-arrow-alt-up" style={{
               transform:"rotate(-45deg)"
            }}></i>,
           onClick : () => setActiveBtn({arrow:true}),
       },
       {
         id:"fillAccess",
         tooltip : "Включить заливку",
         active : activeBtn.bgColor,
         inner: ({isDisplayFill, setIsDisplayFill,SetSelectFillColor ,memoryColors}) => 
         <div className=" my-1 text-center">
            <div  
               className="row m-0 mw-100"
               onClick={() => {
                  setIsDisplayFill(!isDisplayFill)
                  !isDisplayFill ? SetSelectFillColor(memoryColors.fillColorMemory) : SetSelectFillColor()
               }}
            >
               <i className={"col-6 p-0 pe-1 far fa" + (isDisplayFill ? "-check" : "") + "-square"} />      
               <i className="col-6 p-0 ps-1 fas fa-solid fa-fill-drip " />
            </div>                  
         </div>,
         onClick : () => {},
     
       },
       {
           id:"erase",
           tooltip : "Стереть",
           active :activeBtn.erase,
           inner: () => <i className="fas fa-eraser"></i>,
           onClick : () => setActiveBtn({erase:true}),
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
        tooltip : "Цвет Фона",
        active :activeBtn.bgColor,
        inner:() =>
         <div className="text-center mt-2">
            {"BG"}
         </div>,
        onClick : () => setActiveBtn(prev =>({...prev, bgColor:true}))
    
    }
   ]
   
   return defaultButtonsState
}


export default DefaultButtonsState