const canvas = document.querySelector("canvas");
// to get a drawing context and start drawing onto the
// canvas
ctx = canvas.getContext("2d");
// select all option with tool class
toolbtns = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");

// global variables with default values
let isDrawing = false;
selectedTool = "brush"; // default
brushWidth = 5;
let prevMouseX, prevMouseY, snapshot;

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  // begin a new path of drawing
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }

  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  // create line according to mouse pointer
  if (selectedTool == "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    // filling/drawing line with color
    ctx.stroke();
  } else if (selectedTool == "rectangle") {
    drawRect(e);
  }
};

// add an event listener to each button
// this click event will return the
// id of the particular btn that was clicked
toolbtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove the default active btn or other no
    // longer active btn
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    // changing the selected tool variable
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

// the canvas should listen for movement of the mouse
// and call function drawing

// also the arrow?
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", drawing);
