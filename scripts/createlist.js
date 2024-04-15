// Function to update the content of the textarea with the current list of family members
// function updateTreeEntry() {
//     var familyMemberList = document.getElementById("familyMemberList");
//     var treeEntryTextarea = document.getElementById("treeEntry");
//     var textContent = Array.from(familyMemberList.children).map(li => li.textContent);

//     treeEntryTextarea.value = textContent.join("\n");

//     var event = new Event('input');
//     treeEntryTextarea.dispatchEvent(event);
// }

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

    treeEntryTextarea.value = textContent.join("\n");

    var event = new Event('input');
    treeEntryTextarea.dispatchEvent(event);
}


// Function to handle the addition of selected members to the list
document.getElementById("addMemberButton").addEventListener("click", function () {
    var selectedMember = document.getElementById("member1").value;
    var familyMemberList = document.getElementById("familyMemberList");

    // Count the number of parent entries already in the list
    var parentCount = 0;
    var grandparentCount = 0;
    var listItems = familyMemberList.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent === "Parent") {
            parentCount++;
        } else if (listItems[i].textContent === "Grandparent") {
            grandparentCount++;
        }
    }

    // Check if the selected member is "Parent" or "Grandparent"
    if (selectedMember === "Parent" && parentCount < 2 && grandparentCount > 0) {
        // Insert parent below the last grandparent
        var lastGrandparentIndex = -1;
        for (var i = 0; i < listItems.length; i++) {
            if (listItems[i].textContent === "Grandparent") {
                lastGrandparentIndex = i;
            }
        }
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;
        if (lastGrandparentIndex !== -1) {
            familyMemberList.insertBefore(listItem, listItems[lastGrandparentIndex].nextSibling);
        } else {
            familyMemberList.insertBefore(listItem, familyMemberList.firstChild);
        }
    } else if (selectedMember === "Grandparent" && grandparentCount < 4) {
        // Insert grandparent at the beginning of the list
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;
        familyMemberList.insertBefore(listItem, familyMemberList.firstChild);
    } else if (selectedMember !== "Parent" && selectedMember !== "Grandparent") {
        // Add other family members below parents and grandparents
        var listItem = document.createElement("li");
        listItem.textContent = selectedMember;
        familyMemberList.appendChild(listItem);
    }

    // Ensure "Child" appears above "Grandchild"
    var childElement = familyMemberList.querySelector("li[textContent='Child']");
    var grandchildElement = familyMemberList.querySelector("li[textContent='Grandchild']");
    if (childElement && grandchildElement) {
        familyMemberList.insertBefore(grandchildElement, childElement);
    }

    // Update the tree entry display
    updateTreeEntry();
});


// Function to clear the list of family members
document.getElementById("clearMemberButton").addEventListener("click", function () {
    var familyMemberList = document.getElementById("familyMemberList");
    // Remove all child nodes (list items) from the familyMemberList
    familyMemberList.innerHTML = "";
    updateTreeEntry();
});
