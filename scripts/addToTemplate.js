// addToTemplate.js
var numSiblings = 0;

function updateSiblings() {
    alert("here");
    var siblingsBox = document.getElementById("siblings");
    numSiblings = parseInt(siblingsBox.value());
  }

document.getElementById("updateTemplate").addEventListener("click", updateSiblings);



