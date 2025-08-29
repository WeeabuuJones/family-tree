let family = JSON.parse(localStorage.getItem("familyTreeData")) || [];

const form = document.getElementById("memberForm");
const nameInput = document.getElementById("name");
const relationInput = document.getElementById("relation");
const relatedSelect = document.getElementById("relatedTo");
const treeContainer = document.getElementById("familyTree");

// Generate a unique ID
function generateId() {
  return Date.now();
}

// Update dropdown of existing members
function updateRelatedDropdown() {
  relatedSelect.innerHTML = "";
  family.forEach(member => {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = `${member.name} (${member.relation})`;
    relatedSelect.appendChild(option);
  });
}

// Render the family tree
function renderTree() {
  treeContainer.innerHTML = "";
  family.forEach(member => {
    const li = document.createElement("li");
    const relatedNames = member.relatedTo
      .map(id => {
        const related = family.find(p => p.id === id);
        return related ? related.name : "Unknown";
      })
      .join(", ");

    li.innerHTML = `<strong>${member.name}</strong> (${member.relation})<br><em>Related to:</em> ${relatedNames || "None"}`;
    treeContainer.appendChild(li);
  });
}

// Save and refresh UI
function saveAndRender() {
  localStorage.setItem("familyTreeData", JSON.stringify(family));
  updateRelatedDropdown();
  renderTree();
}

// Handle form submission
form.onsubmit = (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const relation = relationInput.value.trim();
  const relatedTo = Array.from(relatedSelect.selectedOptions).map(opt => parseInt(opt.value));

  if (!name || !relation) return;

  const id = generateId();
  const newMember = { id, name, relation, relatedTo };

  family.push(newMember);

  // Add reverse links
  relatedTo.forEach(relId => {
    const relatedPerson = family.find(p => p.id === relId);
    if (relatedPerson && !relatedPerson.relatedTo.includes(id)) {
      relatedPerson.relatedTo.push(id);
    }
  });

  nameInput.value = "";
  relationInput.value = "";
  relatedSelect.selectedIndex = -1;

  saveAndRender();
};

document.getElementById("downloadBtn").onclick = () => {
    const dataStr = JSON.stringify(family, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "familyTreeData.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  

// Initial render
saveAndRender();
