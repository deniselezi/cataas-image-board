function displaySidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar.id === "hidden") {
    console.log("h");
    sidebar.id = "visible"
  } else {
    sidebar.id = "hidden"
  }
}
