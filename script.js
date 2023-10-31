const container = document.querySelector('.container');
const pixelCount = 16 * 16;
const color = 'black';

// Create pixels inside the container to make sketchpad
function createSketch(pCount) {
    const fragment = new DocumentFragment();
    for (let i = 0; i < pCount; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        fragment.appendChild(pixel);
    }
    container.appendChild(fragment);
}
createSketch(pixelCount);

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

// continue the draw on mousemove and mouseenter the container
container.addEventListener('mouseenter', function(e) {
    draw();
});
container.addEventListener('mousemove', draw);

// end the painting on mouseup
document.body.addEventListener('mouseup', () => {painting = false;});
