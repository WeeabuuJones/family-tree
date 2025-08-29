// Load existing data from LocalStorage
let family = JSON.parse(localStorage.getItem("familyTree")) || [];

// References to form and tree list
const form = document.getElementById("memberForm");
const nameInput = document.getElementById("name");
const relationInput = document.getElementById("relation");
const tree = document.getElementById("familyTree");

// Function to render the tree
function renderTree() {
  tree.innerHTML = ""; // Clear the existing list

  family.forEach((member, index) => {
    const li = document.createElement("li");
    li.textContent = `${member.name} (${member.relation})`;

    // Optional: Add a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = () => {
      family.splice(index, 1); // Remove member
      saveAndRender(); // Update tree
    };

    li.appendChild(deleteBtn);
    tree.appendChild(li);
  });
}

// Function to save data and re-render
function saveAndRender() {
  localStorage.setItem("familyTree", JSON.stringify(family));
  renderTree();
}

// Handle form submit
form.onsubmit = (e) => {
  e.preventDefault(); // Stop form from refreshing the page

  const name = nameInput.value.trim();
  const relation = relationInput.value.trim();

  if (name && relation) {
    family.push({ name, relation });
    saveAndRender();
    nameInput.value = "";
    relationInput.value = "";
  }
};

// Initial render
renderTree();
