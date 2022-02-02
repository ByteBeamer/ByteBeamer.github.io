window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    let image = document.getElementById("planet");
    image.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
}
