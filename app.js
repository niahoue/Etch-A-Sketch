let colorPicker = document.querySelector('.colorpicker');
let colorBtn = document.querySelector('.colorbtn');
let rainbowBtn = document.querySelector('.rainbowbtn');
let eraseBtn = document.querySelector('.eraserbtn');
let clearBtn = document.querySelector('.clearbtn');
let sizeValue = document.querySelector('.size-value');
let sizeSlider = document.getElementById('sizeSlider');
let grid = document.querySelector('.grid-container')

const defaultColor = '#000';
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

function setCurrentColor(newColor){
    currentColor = newColor;
}
function setCurrentMode(newMode){
    activateButton(newMode);
    currentMode = newMode;
}

function sizeCurrent(newSize){
    currentSize = newSize;
}

colorPicker.addEventListener('input',(e)=>{
    setCurrentColor(e.target.value)
});

colorBtn.addEventListener('click',()=>{
    setCurrentMode('color');
});
rainbowBtn.addEventListener('click',()=>{
    setCurrentMode('rainbow');
});
eraseBtn.addEventListener('click',()=>{
    setCurrentMode('eraser');
});
clearBtn.addEventListener('click',()=>{
    reloadGrid();
});

sizeSlider.addEventListener('mousemove',(e)=>{
    updateSizeValue(e.target.value);
});
sizeSlider.addEventListener('change',(e)=>{
    changeSize(e.target.value);
});


let mouseDown = false;
document.body.addEventListener('mousedown',()=>{
    mouseDown = true
})
document.body.addEventListener('mouseup',()=>{
    mouseDown = false
})


function changeSize(value){
    sizeCurrent(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`
}

function reload(){
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid(){
    grid.innerHTML = ' '
}

function setupGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    grid.style.gridTemplateRows = `repeat(${size},1fr)`;

    for(let i = 0; i<size*size ; i++){
        const gridElement =document.createElement('div');
        gridElement.classList.add('show-div')
        gridElement.addEventListener('mouseover',changeColor)
        gridElement.addEventListener('mousedown',changeColor)
        grid.appendChild(gridElement);
    }
}

function changeColor(e){

    if(e.type === 'mouseover' && !mouseDown) return;

    if(currentMode === 'rainbow'){
        const randomRed = Math.floor(Math.random()*256);
        const randomGreen = Math.floor(Math.random()*256);
        const randomBlue = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`
     }
    else if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
        }
    else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = '#fefefe'
        }
};


function activateButton(newMode){
    if(currentMode === 'rainbow'){
        rainbowBtn.classList.remove('active')
    }
    else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
      } 
    else if (currentMode === 'eraser') {
        eraseBtn.classList.remove('active')
      }
    
      if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
      } 
      else if (newMode === 'color') {
        colorBtn.classList.add('active')
      } 
      else if (newMode === 'eraser') {
        eraseBtn.classList.add('active')
      }
    }
    
    window.addEventListener('load',() => {
      setupGrid(defaultSize)
      activateButton(defaultMode)
})