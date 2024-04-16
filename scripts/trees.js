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

// Initialize the family member list with "Me"
document.addEventListener("DOMContentLoaded", function() {
    var familyMemberList = document.getElementById("familyMemberList");
    var meItem = document.createElement("li");
    meItem.textContent = "Me";
    familyMemberList.appendChild(meItem);
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
  function showGrandparentDropdown() {
    var selectedMember = document.getElementById("member1").value;
    var gpdd = document.getElementById("gpDropdown");
  
    if (selectedMember === "Grandparent") {
      gpdd.style.display = "inline-block";
    } else {
      gpdd.style.display = "none";
    }
  }
  
  // Show the second dropdown menu initially
  showParentDropdown();
  showGrandparentDropdown();
  
  // Update the second dropdown menu when the first dropdown menu changes
  document.getElementById("member1").addEventListener("change", showParentDropdown);
  document.getElementById("member1").addEventListener("change", showGrandparentDropdown);
  
  document.getElementById("addMemberButton").addEventListener("click", function () {
    var selectedMember = document.getElementById("member1").value;
    var motherOrFather = document.getElementById("motherOrFather").value;
    var gpDropdown = document.getElementById("gpDropdown").value;
    var familyMemberList = document.getElementById("familyMemberList");
    var parentCount = 0;
    var grandparentCount = 0;
    var meIndex = -1;
    var listItems = familyMemberList.getElementsByTagName("li");

    // Count existing parents and grandparents
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent === "Mother" || listItems[i].textContent === "Father") {
            parentCount++;
        } else if (listItems[i].textContent.includes("Grandmother") || listItems[i].textContent.includes("Grandfather")) {
            grandparentCount++;
        } else if (listItems[i].textContent === "Me") {
            meIndex = i;
        }
    }

    // Insert parent after grandparent but before "Me"
    if (selectedMember === "Parent" && (motherOrFather === "Mother" || motherOrFather === "Father") && parentCount < 2) {
        var listItem = document.createElement("li");
        listItem.textContent = motherOrFather;
        if (meIndex !== -1) {
            familyMemberList.insertBefore(listItem, listItems[meIndex]);
        } else {
            familyMemberList.appendChild(listItem);
        }
    } 
    // Insert grandparent at the beginning of the list
    else if (selectedMember === "Grandparent" && grandparentCount < 4) {
        var listItem = document.createElement("li");
        listItem.textContent = gpDropdown;
        familyMemberList.insertBefore(listItem, familyMemberList.firstChild);
    } 
    // Append other members at the end of the list
    else if (selectedMember !== "Parent" && selectedMember !== "Grandparent") {
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;
        familyMemberList.appendChild(listItem);
    }

    updateTreeEntry(); // Update the tree entry display
});







// Function to clear the list of family members
document.getElementById("clearMemberButton").addEventListener("click", function () {
    var familyMemberList = document.getElementById("familyMemberList");

    Array.from(familyMemberList.children).forEach(child => {
        if (child.textContent !== "Me") {
            familyMemberList.removeChild(child);
        }
    });
    updateTreeEntry();
});

