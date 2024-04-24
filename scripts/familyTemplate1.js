// Function to update the content of the textarea with the current list of family members

function updateTreeEntry() {
    var familyMemberList = document.getElementById("familyMemberList");
    var treeEntryTextarea = document.getElementById("treeEntry");
    var textContent = Array.from(familyMemberList.children).map(li => {
        var member = li.textContent.trim(); // Get the text content of each list item
        var spaces = ""; // Initialize spaces variable

        // Add spaces based on the type of family member
        if (member === "Me") {
            spaces = "  "; // Two spaces before "Me"
        } else if (member === "Mother" || member === "Father") {
            spaces = " "; // One space before "Parent"
        } else if (member.includes("Child")) {
            spaces = "   "; // One space before "Parent"
        } else if (member === "Grandchild") {
            spaces = "    "; // One space before "Parent"
        } else if (member === "Sibling"){
            spaces = "  "
        } else if (member === "Significant Other") {
            spaces = "  "
        }

        // Concatenate spaces with the member's name
        return spaces + member;
    }).join("\n"); // Join the list items' text content with newline characters

    treeEntryTextarea.value = textContent; // Set the text box value to the concatenated string

    // Dispatch an 'input' event to trigger any event listeners attached to the text box
    var event = new Event('input');
    treeEntryTextarea.dispatchEvent(event);
}



// Update the tree entry display initially
updateTreeEntry();

// Call the function to populate the dropdown initially

// Initialize the family member list with "Me"
var numSiblings =0;
document.addEventListener("DOMContentLoaded", function() {
    var familyMemberList = document.getElementById("familyMemberList");
    var meItem = document.createElement("li");
    var momItem = document.createElement("li");
    var dadItem = document.createElement("li");
    var gmmItem = document.createElement("li");
    var gfmItem = document.createElement("li");
    var gmfItem = document.createElement("li");
    var gffItem = document.createElement("li");
    var siblingItem = document.createElement("li");



    meItem.textContent = "Me";
    momItem.textContent = "Mother";
    dadItem.textContent = "Father";
    gmmItem.textContent = "Grandmother (Mother's Side)";
    gfmItem.textContent = "Grandfather (Mother's Side)";
    gmfItem.textContent = "Grandmother (Father's Side)";
    gffItem.textContent = "Grandfather (Father's Side)";
    siblingItem.textContent = "Sibling";
    familyMemberList.appendChild(gffItem);
    familyMemberList.appendChild(gmfItem);
    familyMemberList.appendChild(dadItem);

    familyMemberList.appendChild(gmmItem);
    familyMemberList.appendChild(gfmItem);
    familyMemberList.appendChild(momItem);

    familyMemberList.appendChild(meItem);

    for (var i = 0; i < siblingsValue; i++) {
        var newSiblingItem = siblingItem.cloneNode(true); 
        familyMemberList.appendChild(newSiblingItem); 
    } 
    
    updateTreeEntry();
    
});

// Function to handle the addition of selected members to the list
// Function to show the second dropdown menu when "Parent" is selected
function showParentDropdown() {
    var selectedMember = document.getElementById("member1").value;
    var motherOrFatherDropdown = document.getElementById("motherOrFather");
  
    if (selectedMember === "Parent") {
      motherOrFatherDropdown.style.display = "inline-block";
    } else {
      motherOrFatherDropdown.style.display = "none";
    }
  }
  

  function showChildDropdown() {
    var selectedMember = document.getElementById("member1").value;
    var cdd  = document.getElementById("childrenDropdown");
  
    if (selectedMember === "Child") {
      cdd.style.display = "inline-block";
    } else {
      cdd.style.display = "none";
    }
  }
  
  // Show the second dropdown menu initially

  showChildDropdown();
  
  // Update the second dropdown menu when the first dropdown menu changes

 document.getElementById("member1").addEventListener("change", function() {
    var selectedMember = document.getElementById("member1").value;
    var childrenDropdown = document.getElementById("childrenDropdown");

    if (selectedMember === "Grandchild") {
        childrenDropdown.style.display = "inline-block";
    } else {
        childrenDropdown.style.display = "none";
    }
});





  var numChild = 1
  document.getElementById("addMemberButton").addEventListener("click", function () {
    var selectedMember = document.getElementById("member1").value;
    var childSelected = document.getElementById("childrenDropdown").value;
    var familyMemberList = document.getElementById("familyMemberList");
    var meIndex = -1;
    var listItems = familyMemberList.getElementsByTagName("li");


    // Count existing parents and grandparents
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent === "Me") {
            meIndex = i;
        } 
    }

    // Insert parent after grandparent but before "Me"
    if (selectedMember === "Significant Other") {
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;
        familyMemberList.insertBefore(listItem, listItems[meIndex]);
    }     
    else if (selectedMember === "Sibling") {
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;
        familyMemberList.appendChild(listItem);
    }
    else if (selectedMember === "Child") {
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember + numChild;
        familyMemberList.insertBefore(listItem, listItems[meIndex].nextSibling);
        numChild++
    }
    else if (selectedMember === "Grandchild") {
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;

        // Find the index of the selected child in the family member list
        var childIndex = -1;
        for (var i = 0; i < listItems.length; i++) {
            if (listItems[i].textContent === childSelected) {
                childIndex = i;
                break;
            }
        }
        if (childIndex !== -1){
            familyMemberList.insertBefore(listItem, listItems[childIndex].nextSibling);}
            else {
                familyMemberList.append(listItem)
            }
         
    }
    populateChildrenDropdown();
    updateTreeEntry(); // Update the tree entry display

});




// Function to clear the list of family members
document.getElementById("clearMemberButton").addEventListener("click", function () {
    var familyMemberList = document.getElementById("familyMemberList");

    Array.from(familyMemberList.children).forEach(child => {
        if (child.textContent !== "Me" && child.textContent !==  "Father" && 
        child.textContent !==  "Mother"&& child.textContent !==  "Grandmother (Mother's Side)"&& 
        child.textContent !==  "Grandfather (Mother's Side)"&& 
        child.textContent !==  "Grandmother (Father's Side)"&& 
        child.textContent !==  "Grandfather (Father's Side)" ) {
            familyMemberList.removeChild(child);
        }
    });
    updateTreeEntry();
    numChild = 1;
    populateChildrenDropdown([]);

});




function getChildrenList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var children = [];

    // Iterate through the list items
    Array.from(familyMemberList.children).forEach(li => {
        var member = li.textContent.trim();

        // Check if the member is a child
        if (member.includes("Child")) {
            children.push(member); // Add the child to the list of children
        }
    });

    return children; // Return the list of children
}

// Function to populate the children dropdown menu
function populateChildrenDropdown() {
    var childrenDropdown = document.getElementById("childrenDropdown");
    var childrenList = getChildrenList(); 

    // Clear existing options
    childrenDropdown.innerHTML = "";

    // Create an option for each child and add it to the dropdown
    childrenList.forEach(child => {
        var option = document.createElement("option");
        option.text = child;
        childrenDropdown.add(option);
    });
}


// Function to add siblings to the family tree
function addSiblings(numSiblings) {
    var familyMemberList = document.getElementById("familyMemberList");

    for (var i = 0; i < numSiblings; i++) {
        var siblingItem = document.createElement("li");
        siblingItem.textContent = "Sibling";
        familyMemberList.appendChild(siblingItem);
    }

    // Update the tree entry display
    updateTreeEntry();
}

