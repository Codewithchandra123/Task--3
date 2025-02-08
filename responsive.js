 // JavaScript to handle section display toggling
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = "block";
}
