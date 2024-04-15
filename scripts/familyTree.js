// Function to update the content of the textarea with the current list of family members
function updateTreeEntry() {
    var familyMemberList = document.getElementById("familyMemberList");
    var treeEntryTextarea = document.getElementById("treeEntry");
    var textContent = Array.from(familyMemberList.children).map(li => {
        var member = li.textContent;
        var spaces = "";
        // Add spaces based on the type of family member
        if (member === "Parent") {
            spaces = " ";
        } else if (member === "Child") {
            spaces = "  ";
        } else if (member === "Grandchild") {
            spaces = "   ";
        }
        return spaces + member;
    });

    treeEntryTextarea.value = ""; 

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
// document.getElementById("addMemberButton").addEventListener("click", function () {
//     var selectedMember = document.getElementById("member1").value;
//     var familyMemberList = document.getElementById("familyMemberList");


//     // Check if the selected member is "Parent"
//     if (selectedMember === "Parent") {
//         // Insert parent above "Me"
//         var listItem = document.createElement("li");
//         listItem.textContent = selectedMember;
//         familyMemberList.insertBefore(listItem, familyMemberList.firstChild);
//     } else {
//         // Add other family members below parents and grandparents
//         var listItem = document.createElement("li");
//         listItem.textContent = selectedMember;
//         familyMemberList.appendChild(listItem);
//     }

//     // Ensure "Child" appears above "Grandchild"
//     var childElement = familyMemberList.querySelector("li[textContent='Child']");
//     var grandchildElement = familyMemberList.querySelector("li[textContent='Grandchild']");
//     if (childElement && grandchildElement) {
//         familyMemberList.insertBefore(grandchildElement, childElement);
//     }

//     // Update the tree entry display
//     updateTreeEntry();
// });
document.getElementById("addMemberButton").addEventListener("click", function () {
    var selectedMember = document.getElementById("member1").value;
    var familyMemberList = document.getElementById("familyMemberList");
    var meElement = familyMemberList.querySelector("li[textContent='Me']");
    var grandparentElement = familyMemberList.querySelector("li[textContent='Grandparent']");

    // Check if the selected member is "Grandparent"
    if (selectedMember === "Grandparent") {
        // Insert grandparent at the beginning of the list
        var grandparentItem = document.createElement("li");
        grandparentItem.textContent = selectedMember;
        familyMemberList.insertBefore(grandparentItem, familyMemberList.firstChild);
    } else if (selectedMember === "Parent") {
        // Create the parent element
        var parentItem = document.createElement("li");
        parentItem.textContent = selectedMember;
        
        // Check if "Grandparent" exists in the list
        if (grandparentElement) {
            // Insert parent after "Grandparent"
            familyMemberList.insertBefore(parentItem, grandparentElement.nextSibling);
        } else {
            // If "Grandparent" doesn't exist, insert parent at the beginning of the list
            familyMemberList.insertBefore(parentItem, familyMemberList.firstChild);
        }
    } else if (selectedMember === "Child") {
        // Ensure "Child" appears below "Me"
        var childItem = document.createElement("li");
        childItem.textContent = selectedMember;
        familyMemberList.appendChild(childItem);
    } else if (selectedMember === "Grandchild") {
        // Ensure "Grandchild" appears below "Child"
        var childElement = familyMemberList.querySelector("li[textContent='Child']");
        var grandchildItem = document.createElement("li");
        grandchildItem.textContent = selectedMember;
        familyMemberList.insertBefore(grandchildItem, childElement.nextSibling);
    }

    // Update the tree entry display
    updateTreeEntry();
});












// Function to clear the list of family members
document.getElementById("clearMemberButton").addEventListener("click", function () {
    var familyMemberList = document.getElementById("familyMemberList");
    // Remove all child nodes except "Me" from the familyMemberList
    Array.from(familyMemberList.children).forEach(child => {
        if (child.textContent !== "Me") {
            familyMemberList.removeChild(child);
        }
    });
    updateTreeEntry();
});

