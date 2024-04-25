// Add event listeners to SVG rectangles for double-click
document.querySelectorAll('rect').forEach(rectangle => {
  rectangle.addEventListener('dblclick', function(event) {
      // Handle double-click event
      var nodeId = event.target.id; // Get the ID of the clicked rectangle
      var newNodeLabel = prompt("Enter new label for the node:", ""); // Prompt user for new label
      if (newNodeLabel !== null) {
          // User entered a new label
          // Update the text content of the SVG text element associated with this node
          var textElement = document.getElementById(nodeId + "_text");
          if (textElement) {
              textElement.textContent = newNodeLabel;
          }
      }
  });
});
