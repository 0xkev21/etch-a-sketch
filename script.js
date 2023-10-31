const container = document.querySelector('.container');
const column = document.querySelector('#col-count'); // input for column count
const color = 'black';

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
        
        // reset the width of each pixel
        pixel.style.setProperty('--pixel-count', colCount);

        fragment.appendChild(pixel);
    }
    container.appendChild(fragment);
}
createSketch();

// initiate painting with a boolean value
let painting = false;
function draw(e) {
    if (!painting) return;
    e.target.classList.add('draw');
}
// start the painting on mousedown
document.body.addEventListener('mousedown', function(e) {
    painting = true;
    draw(e);
});
// continue the drawing during mousemove
container.addEventListener('mousemove', draw);
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