var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = 400;

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = 400;
  clear();
  newCol();
  for (k = 0; k < numMount; k++) {
    draw(k * h / numMount, k);
  }
};

heights = 1.5;
details = 2;
numMount = 10;
shadow = 0; // Turn to 0 if render takes too long | P.S im the only Comment here... This guy obviously never heard of nicely documented code before

ranH = 230;
ranS = Math.random() * 100;
ranL = Math.random() * 100;
colStep = 8;
height = Math.random() * h;
slope = Math.random() * heights * 2 - heights;

function clear() {
  height = Math.random() * h;
  ctx.clearRect(0, 0, w, h);
}

function newCol() {
  ranH = Math.random() * 360;
  ranS = Math.random() * 100;
  ranL = Math.random() * 100;
}

numMount += 1;
function draw(ix, ic) {
  for (i = 0; i < w; i++) {
    slope += Math.random() * details * 2 - details;
    height += slope;

    if (slope > heights) {
      slope = heights;
    }
    if (slope < -heights) {
      slope = -heights;
    }
    if (height > h) {
      height = h;
      slope *= -1;
    }
    if (height < ix) {
      height = ix;
      slope *= -1;
    }

    ctx.beginPath();
    var gr = ctx.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0,"#1b1c1b");
    gr.addColorStop(1,"#1b1c1b");
    ctx.strokeStyle = gr;
    ctx.lineWidth = 0;
    ctx.moveTo(i, h);
    ctx.lineTo(i, height);
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowBlur = shadow;
    ctx.stroke();
    ctx.closePath();
  }
}

window.onclick = function() {
  //clear();
  //newCol();
  //for (k = 0; k < numMount; k++) {
  //  draw(k * h / numMount, k);
  //}
};

clear();
for (k = 0; k < numMount; k++) {
  draw(k * h / numMount, k);
}

clear();
  newCol();
  for (k = 0; k < numMount; k++) {
    draw(k * h / numMount, k);
  }
