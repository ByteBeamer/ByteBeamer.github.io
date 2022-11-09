function getVerticalScrollPercentage(elem) {
  var p = elem.parentNode;
  return (
    ((elem.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) * 100
  );
}

window.onscroll = function () {
  var banner = document.getElementsByClassName("banner")[1];
  var scrollHeight = getVerticalScrollPercentage(document.body);
  if (scrollHeight > 16) {
    banner.style.opacity = 0;
  } else {
    banner.style.opacity = 1;
  } 
};
