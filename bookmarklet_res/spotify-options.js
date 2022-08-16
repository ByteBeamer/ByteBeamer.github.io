var win = window.open("","",true);

var title = document.querySelectorAll("span")[11].innerText;
var artist = document.querySelectorAll("span")[12].innerText;

win.document.write(`<h1>${title}</h1><h2>By: ${artist}</h2>`)

function tick() {
  
}
