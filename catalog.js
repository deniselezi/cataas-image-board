const axios = window.axios;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const tag = urlParams.get("tag");
const grid = urlParams.get("grid");

var images = [];  // array of objects, the images on screen
var imagesDisplayed = 0;

var dropdown = document.querySelector(".dropdown-content");
dropdown = dropdown.children;
const container = document.querySelector(".images-section");

function addLayout() {
  // sets layout of the grid based on grid parameter
  addLinks();
  let layoutClass = '';
  switch (Number(grid)) {
    case 1:
      layoutClass = "grid-one"
      console.log(1);
      break;
    case 2:
      layoutClass = "grid-two"
      break;
    case 3:
      layoutClass = "grid-three"
      break;
    case 4:
      layoutClass = "grid-four"
      break;
  }
  container.classList.add(layoutClass);
}

function addLinks() {
  for (let i = 0; i < dropdown.length; i++) {
    let currentChild = dropdown[i];
    currentChild.href = `catalog.html?tag=${tag}&grid=${i + 1}`;
    console.log(currentChild.href);
    if (i + 1 === Number(grid)) {
      currentChild.classList.add("selected");
      console.log("sss")
    }
  }
}

async function fetchImages(quantity) {
  let imagesToFetch = imagesDisplayed + quantity;
  images = await axios.get(`https://cataas.com/api/cats?tags=${tag}&limit=${imagesToFetch}`);
  images = images.data;
  console.log(images);

  createImages(images.slice(imagesDisplayed))  // add new img elements to the DOM

  imagesDisplayed += quantity;
}

function createImages(imageList) {
  imageList.forEach(obj => {
    let imageLink = document.createElement("a");
    imageLink.href = createLink(obj);
    let newImage = document.createElement("img");
    newImage.src = `https://cataas.com/cat/${obj.id}`;
    imageLink.appendChild(newImage);
    container.appendChild(imageLink);
  });
}

function createLink(obj) {
  let objTags = "";
  for (let i = 0; i < obj.tags.length; i++) {
    console.log(obj.tags[i]);
    objTags += `${obj.tags[i]},`;
  }
  objTags = objTags.substring(0, objTags.length - 1);  // remove last ,
  return `image.html?id=${obj.id}&tags=${objTags}`;
}

window.addEventListener("scroll", () => {
  let distanceScrolled = window.scrollY + window.innerHeight;
  // subtract some number from scrollHeight to make the web-page load images earlier
  if (distanceScrolled >= document.documentElement.scrollHeight) {
    // when users scrolls to the bottom, load more images
    fetchImages(10);
  }
});

window.addEventListener("scroll", () => {
  var navbar = document.querySelector(".navbar");
  if (window.scrollY > navbar.offsetTop) {  // if we have scrolled past the navigation bar
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

addLayout();
fetchImages(10);
