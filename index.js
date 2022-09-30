function displaySidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar.id === "hidden") {
    sidebar.id = "visible"
  } else {
    sidebar.id = "hidden"
  }
}
