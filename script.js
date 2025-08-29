let family = [];

fetch("family.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load family.json");
    return response.json();
  })
  .then(data => {
    family = data;
    renderTree();
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

function renderTree() {
  const list = document.getElementById("familyTree");
  list.innerHTML = "";

  family.forEach(member => {
    const li = document.createElement("li");
    const relatedNames = member.relatedTo
      .map(id => {
        const related = family.find(p => p.id === id);
        return related ? related.name : "Unknown";
      })
      .join(", ");

    li.innerHTML = `<strong>${member.name}</strong> (${member.relation})<br><em>Related to:</em> ${relatedNames || "None"}`;

    if (member.isMe) {
      li.classList.add("you");
    }

    list.appendChild(li);
  });
}
