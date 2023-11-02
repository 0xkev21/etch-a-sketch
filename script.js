const container = document.querySelector('.container');
const column = document.querySelector('#col-count'); // input for column count
const colorInput = document.querySelector('#color');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector('#clear');
const rainbow = document.querySelector('#rainbow');
const opacity = document.querySelector('#opacity');

let eraserMode = false;
let rainbowMode = false;
let opacityMode = false;

// function to create pixels inside the container to make sketchpad
function createSketch() {

    // clear the container
    container.innerHTML = '';

    const colCount = column.value;
    const pixelCount = colCount**2; // square of col count

    // create dom fragment for better performance
    const fragment = new DocumentFragment();
    
    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseenter', draw);
        pixel.style.userSelect = 'none';
        
        // reset the width of each pixel
        container.style.setProperty('--pixel-count', colCount);

        fragment.appendChild(pixel);
    }
    container.appendChild(fragment);
}
createSketch();


// initiate painting with a boolean value
let painting = false;
function draw(e) {
    if (!painting) return;
    if (e.target.classList.contains('pixel')) {
        if(eraserMode) {
            e.target.style.backgroundColor = 'transparent';
            return;
        }
        if(opacityMode) {
            let currentOpacity = parseFloat(e.target.style.opacity) || 0;
            currentOpacity = Math.min(currentOpacity + 0.2);
            e.target.style.opacity = currentOpacity;
        }
        if(rainbowMode) {
            e.target.style.backgroundColor = getRandomColor();
            return;
        }
        e.target.style.backgroundColor = colorInput.value;
    }
}
// start the painting on mousedown
document.body.addEventListener('mousedown', function(e) {
    painting = true;
    draw(e);
});

// end the painting on mouseup
document.body.addEventListener('mouseup', () => {painting = false;});

column.addEventListener('change', createSketch);

//display the pixels count in the DOM
column.addEventListener('input', () => {
    const displayPixels = document.querySelectorAll('.pixels');
    displayPixels.forEach(p => {
        p.textContent = column.value;
    })
})

// Eraser Mode
eraser.addEventListener('click', () => {
    if (!eraserMode) {
        eraserMode = true;
        eraser.classList.add('active');
    } else {
        eraserMode = false;
        eraser.classList.remove('active');
    }
})

// change back to color mode when user choose color
colorInput.addEventListener('change', () => {
    eraserMode = false;
    eraser.classList.remove('active');
})

// Clear Feature
clear.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'transparent';
    })
})

// get random color for rainbow mode
const getRandomNumber = () => Math.floor(Math.random() * 256);
const getRandomColor = () => `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;

// Rainbow Mode
rainbow.addEventListener('click', () => {
    if (!rainbowMode) {
        rainbowMode = true;
        rainbow.classList.add('active');
    } else {
        rainbowMode = false;
        rainbow.classList.remove('active');
    }
})

// Opacity Mode
opacity.addEventListener('click', () => {
    if (!opacityMode) {
        opacityMode = true;
        opacity.classList.add('active');
    } else {
        opacityMode = false;
        opacity.classList.remove('active');
    }
})