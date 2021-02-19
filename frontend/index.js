// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;
let drawColor = "black";
let drawWidth = 2;

const $easel = document.getElementById('easel');
const context = $easel.getContext('2d');

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
document.addEventListener( "DOMContentLoaded" , event => {
  clearCanvas()
  loadStyles(event)
})


$easel.addEventListener('mousedown', event => {
    // console.log(event)
  x = event.offsetX;
  y = event.offsetY;
  isDrawing = true;
});

$easel.addEventListener('mousemove', event => {
  if (isDrawing === true) {
    drawLine(context, x, y, event.offsetX, event.offsetY);
    x = event.offsetX;
    y = event.offsetY;
  }
});

window.addEventListener('mouseup', event => {
  if (isDrawing === true) {
    drawLine(context, x, y, event.offsetX, event.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = drawColor;
  context.lineWidth = drawWidth;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

const parseHTTPResponse = response => response.json()

// Load Backgrounds
const $easelContent = document.getElementById("easel-content")
const $easelOptions = document.getElementById("easel-options")
const $easelTabs = $easelOptions.querySelectorAll("button")
$easelTabs.forEach( addEaselTabFunctionality )

function addEaselTabFunctionality(tab){
  tab.addEventListener( "click" , handleEaselTabs )
}

function handleEaselTabs(event){
  event.preventDefault()
  tab = event.target

  if (!tab.className.includes("active")){
    updateActiveTab(tab)
    updateEaselContent(tab)
  }
}

function updateActiveTab(tab){
  $activeTab = $easelOptions.querySelector(".active")
  $activeTab.className = $activeTab.className.replace(" active", "")
  tab.className += " active"
}

function updateEaselContent(tab){
  $easelContent.innerHTML = ""

  switch (tab.id){
    case "style-tab":
      loadStyles()
      break
    case "tab-2":
      console.log("tab 2")
      break
    case "template-tab":
      loadTemplates()
      break
  }
}

function loadStyles(){
  loadBrushColors()
  loadSizeButtons()
  loadEraser()
  loadTrashcan()
}

function loadTrashcan(){
  $trashcanButton = document.createElement("div")
  $trashcanButton.classList = "image-button"

  $trashcan = document.createElement("img")
  $trashcan.name = "white"
  $trashcan.src = "./icons/trashcan.jpeg"

  $trashcan.addEventListener("click", clearCanvas )

  $trashcanButton.appendChild($trashcan)
  $easelContent.appendChild($trashcanButton)
}

function clearCanvas(event){
  let background = new Image()
  background.src = "./img/white-canvas.jpg"
  background.onload = function(){
      context.drawImage(background, 0, 0, 1600, 800)
  }
}

function loadSizeButtons(){
  const brushSizes = [
    "+",
    "-"
  ]

  brushSizes.forEach( createBrushButton )
}

function createBrushButton(size){
  button = document.createElement("button")
  button.classList = "size-button"

  button.value = size
  button.innerText = size

  button.addEventListener( "click" , changeBrushSize )
  $easelContent.appendChild(button)
}

function changeBrushSize(event){
  const buttonValue = event.target.value
  
  switch ( buttonValue ){
    case "+":
      drawWidth += 2
      break
    case "-":
      drawWidth -= 2
      break
  }
}

function loadEraser(){
  $eraserButton = document.createElement("div")
  $eraserButton.classList = "image-button"

  $eraser = document.createElement("img")
  $eraser.name = "white"
  $eraser.src = "./icons/eraser.png"

  $eraser.addEventListener("click", changeBrushColor )

  $eraserButton.appendChild($eraser)
  $easelContent.appendChild($eraserButton)
}

function loadBrushColors(){
  const colors = [
    { "black": "#000000" },
    { "red": "#FF0000" },
    { "orange": "#FFA500" },
    { "yellow": "#FFFF00" },
    { "green": "#0080000" },
    { "blue": "#0000FF" },
    { "purple": "#800080" },
  ]

  colors.forEach( addColorButtons )
}

function addColorButtons(color){
  colorValue = Object.values(color)[0]
  colorName = Object.keys(color)[0]
  colorButton = document.createElement("button")

  colorButton.classList = "color"

  colorButton.value = colorValue
  colorButton.name = colorName
  colorButton.style.backgroundColor = colorValue

  colorButton.addEventListener( "click" , changeBrushColor )
  
  $easelContent.appendChild(colorButton)
}

function changeBrushColor(event){
  drawColor = event.target.name
}

function loadTemplates(){
  fetch(`http://localhost:3000/images`)
    .then( parseHTTPResponse )
    .then( images => {
      images.forEach( image => {
        const $img = document.createElement("img")
        $img.classList = "templates"
        $img.src = image.location

        addTemplateFunctionality($img)
        $easelContent.appendChild($img)
      })
    })
}

function addTemplateFunctionality(template){
  template.addEventListener( "click" , setMapBackground )
}

function setMapBackground(event){
  let background = new Image()
  background.src = event.target.src
  background.onload = function(){
      context.drawImage(background, 0, 0, 1600, 800)
  }
}