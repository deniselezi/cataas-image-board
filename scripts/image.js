const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get("id");
const tagsString = urlParams.get("tags");
const tags = tagsString.split(',');

function fetchImage() {
  let url = `https://cataas.com/cat/${id}`;
  let image = document.getElementById("cat");
  image.src = url;
}

function addTags() {
  let container = document.querySelector(".tags-container");
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    let a = document.createElement("a");
    let aText = document.createTextNode(tag);
    let aLink = `catalog.html?tag=${tag}&grid=3`;
    a.appendChild(aText);
    a.href = aLink;
    a.classList.add("tag");
    container.appendChild(a);
  }
}

fetchImage();
addTags();
