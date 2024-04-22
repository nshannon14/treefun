// addToTemplate.js

function addFamilyMembers() {
    var siblings = parseInt(document.getElementById("siblings").value);
    var numKids = 0;
    var hasKidsYes = document.getElementById("hasKidsYes");
    var hasKidsNo = document.getElementById("hasKidsNo");

    if (hasKidsYes.checked) {
        numKids = parseInt(document.getElementById("numKids").value);
    }

    // Add siblings
    for (var i = 0; i < siblings; i++) {
        addToTree("Sibling");
    }

    // Add kids
    for (var j = 0; j < numKids; j++) {
        addToTree("Child");
    }
}

function addToTree(member) {
    var familyMemberList = document.getElementById("familyMemberList");
    var meIndex = -1;
    var listItems = familyMemberList.getElementsByTagName("li");

    // Count existing parents and grandparents
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent === "Me") {
            meIndex = i;
            break;
        }
    }

    var listItem = document.createElement("li");

    // Apply formatting based on the type of family member
    if (member === "Me") {
        listItem.textContent = member;
    } else if (member === "Mother" || member === "Father" || member.includes("Grandmother") || member.includes("Grandfather")) {
        listItem.textContent = " " + member; // Add one space before the parent or grandparent
    } else if (member.includes("Child")) {
        listItem.textContent = "   " + member; // Add three spaces before the child
    } else if (member === "Sibling" || member === "Significant Other") {
        listItem.textContent = member; // No additional spaces needed for siblings or significant others
    } else {
        listItem.textContent = "    " + member; // Add four spaces before grandchildren
    }

    // Insert the new family member into the list
    if (meIndex !== -1) {
        familyMemberList.insertBefore(listItem, listItems[meIndex].nextSibling);
    } else {
        familyMemberList.appendChild(listItem);
    }
}

