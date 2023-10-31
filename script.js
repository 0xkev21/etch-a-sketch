const container = document.querySelector('.container');
const pixelCount = 16 * 16;
const color = 'black';

// Create pixels inside the container to make sketch
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