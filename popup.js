
var seconds = 0;
function sendTakePictureRequest() {
    seconds = $('#seconds').val();
    console.log('hi');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(seconds);
      chrome.tabs.sendMessage(tabs[0].id, {time: seconds}, function(response) {
      });
    });
}
document.addEventListener('DOMContentLoaded', function() {
  $('#camera').click(function(event){
    event.preventDefault();
    sendTakePictureRequest();
  });
});






