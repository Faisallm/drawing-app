const canvas = document.querySelector("canvas");
// to get a drawing context and start drawing onto the
// canvas
ctx = canvas.getContext("2d");
// select all option with tool class
toolbtns = document.querySelectorAll(".tool");

let isDrawing = false;
brushWidth = 5;

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
    isDrawing = true;
    // begin a new path of drawing
    ctx.beginPath();
}

const drawing = (e) => {
  if (!isDrawing) return;
    // create line according to mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY);
    // filling/drawing line with color
    ctx.stroke();
    ctx.lineWidth = brushWidth;
};

// add an event listener to each button
// this click event will return the
// id of the particular btn that was clicked
toolbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // remove the default active btn or other no
        // longer active btn
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        console.log(btn.id);
    })
})


// the canvas should listen for movement of the mouse
// and call function drawing

// also the arrow?
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", drawing);
