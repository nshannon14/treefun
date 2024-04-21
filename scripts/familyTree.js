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
  showParentDropdown();
  showGrandparentDropdown();
  showChildDropdown();
  
  // Update the second dropdown menu when the first dropdown menu changes
  document.getElementById("member1").addEventListener("change", showParentDropdown);
  document.getElementById("member1").addEventListener("change", showGrandparentDropdown);

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
    var motherOrFather = document.getElementById("motherOrFather").value;
    var gpDropdown = document.getElementById("gpDropdown").value;
    var childSelected = document.getElementById("childrenDropdown").value;
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
    if (selectedMember === "Parent" && motherOrFather === "Mother" && parentCount < 2) {
        var listItem = document.createElement("li");
        listItem.textContent = motherOrFather;
        if (gmmInList() && gfmInList()){
            var reference = listItems[Math.max(indexGmm(), indexGfm())].nextSibling;
            familyMemberList.insertBefore(listItem, reference);
        } else if (gmmInList() && !gfmInList()){
            var reference = listItems[indexGmm()].nextSibling;
            familyMemberList.insertBefore(listItem, reference);
        } else if (gfmInList() && !gmmInList()){
            var reference = listItems[indexGfm()].nextSibling;
            familyMemberList.insertBefore(listItem, reference);
        } else if (meIndex !== -1 && !gmmInList() && !gfmInList()) {
            familyMemberList.insertBefore(listItem, listItems[meIndex]);
        } else {
            familyMemberList.appendChild(listItem);
        }
    }else if (selectedMember === "Parent" && motherOrFather === "Father" && parentCount < 2) {
        var listItem = document.createElement("li");
        listItem.textContent = motherOrFather;
        if (gmfInList() && gffInList()){
            var reference = listItems[Math.max(indexGmf(), indexGff())].nextSibling;
            familyMemberList.insertBefore(listItem, reference);
        } else if (gmfInList() && !gffInList()){
            var reference = listItems[indexGmf()].nextSibling;
            familyMemberList.insertBefore(listItem, reference);
        } else if (gffInList() && !gmfInList()){
            var reference = listItems[indexGff()].nextSibling;
            familyMemberList.insertBefore(listItem, reference);
        } else if (meIndex !== -1 && !gmfInList() && !gffInList()) {
            familyMemberList.insertBefore(listItem, listItems[meIndex]);
        } else {
            familyMemberList.appendChild(listItem);
        }
    } 

    // Insert grandparent at the beginning of the list
    else if (selectedMember === "Grandparent" && (gpDropdown === "Grandmother (Mother's Side)" || gpDropdown === "Grandfather (Mother's Side)") && grandparentCount < 4) {
        var listItem = document.createElement("li");
        listItem.textContent = gpDropdown;
        if (fatherInList()){
            var reference = listItems[indexMother()];
            familyMemberList.insertBefore(listItem, reference);
        } else {
            familyMemberList.insertBefore(listItem, familyMemberList.firstChild);
        }
    } 
    else if (selectedMember === "Grandparent" && (gpDropdown === "Grandmother (Father's Side)" || gpDropdown === "Grandfather (Father's Side)") && grandparentCount < 4) {
        var listItem = document.createElement("li");
        listItem.textContent = gpDropdown;
        if (fatherInList()){
            var reference = listItems[indexfather()];
            familyMemberList.insertBefore(listItem, reference);
        } else {
            familyMemberList.insertBefore(listItem, familyMemberList.firstChild);
        }
    } 
    else if (selectedMember === "Significant Other") {
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
        if (child.textContent !== "Me") {
            familyMemberList.removeChild(child);
        }
    });
    updateTreeEntry();
    numChild = 1;
    populateChildrenDropdown([]);
});

// Function to check if "father" is in the list
function fatherInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "father") {
            return true; // Father is in the list
        }
    }
    
    return false; // Father is not in the list
}

function motherInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "mother") {
            return true; // mother is in the list
        }
    }
    
    return false; // mother is not in the list
}

function gmmInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandmother (mother's side)") {
            return true; // grandmother mother's side is in the list
        }
    }
    
    return false; // grandmother mothers's side is not in the list
}

function gfmInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandfather (mother's side)") {
            return true; // grandfather mother's side is in the list
        }
    }
    
    return false; // grandfather mothers's side is not in the list
}

function gmfInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandmother (father's side)") {
            return true; // grandmother father's side is in the list
        }
    }
    
    return false; // grandmother father's side is not in the list
}

function gffInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandfather (father's side)") {
            return true; // grandfather father's side is in the list
        }
    }
    
    return false; // grandfather father's side is not in the list
}

function childInList() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.includes("Child")) {
            return true; // child is in the list
        }
    }
    
    return false; // child is not in the list
}

// Function to find the index of "father" in the list
function indexfather() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "father") {
            return i; // Return the index of "father"
        }
    }
    
    return -1; // Return -1 if "father" is not found
}

// Function to find the index of "father" in the list
function indexMother() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "mother") {
            return i; // Return the index of "mother"
        }
    }
    
    return -1; // Return -1 if "father" is not found
}

function indexGmm() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandmother (mother's side)") {
            return i; // Return the index of "mother"
        }
    }
    
    return -1; // Return -1 if "father" is not found
}
function indexGfm() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandfather (mother's side)") {
            return i; // Return the index of "mother"
        }
    }
    
    return -1; // Return -1 if "father" is not found
}

function indexGmf() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandmother (father's side)"){
        return i; // Return the index of "mother"
        }
    }
    
    return -1; // Return -1 if "father" is not found
}

function indexGff() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.toLowerCase() === "grandfather (father's side)"){
        return i; // Return the index of father
        }
    }
    
    return -1; // Return -1 if "father" is not found
}

function indexChild() {
    var familyMemberList = document.getElementById("familyMemberList");
    var listItems = familyMemberList.getElementsByTagName("li");
    
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.includes("Child")){
        return i; // Return the index of child
        }
    }
    
    return -1; // Return -1 if "child" is not found
}

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

// Call the function to populate the dropdown initially



