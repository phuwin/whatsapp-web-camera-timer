
var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

function click(element) {
  element.dispatchEvent(clickEvent);
}

var takePicture = function(time){
  time *= 1000;	
  var cameraButton = document.getElementsByClassName('btn')[0];
  setTimeout(function(){click(cameraButton)},time);
  var sec = time/1000;
  var msec = 1000;
  setInnerHTML('counter',sec);
  sec--;
  while (sec > 0) {
    (function (sec) {
      setTimeout(function () {
        setInnerHTML('counter',sec);
      },msec)
    })(sec,msec)
    sec--;
    msec += 1000;
  }
}

function injectCounterIntoScreen(){
  var element = document.getElementsByClassName('object-fit')[0].firstChild;
  var counterDiv = createElemeneWithID('div',"counter");
  insertAfter(counterDiv,element);
}
function destroyElement(element){
  element.parentNode.removeChild(element);
}

function createElemeneWithID(element,id){
  var node = document.createElement(element);
  node.id=id;
  return node;
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function setInnerHTML(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    injectCounterIntoScreen();
    takePicture(request.time);
  });

document.addEventListener('DOMContentLoaded', function() {
  injectCounterIntoScreen();
  var cameraButton = document.getElementsByClassName('btn')[0];
  if (cameraButton != null){
    cameraButton.addEventListener("click", destroyElement('counter'));
  }
});
