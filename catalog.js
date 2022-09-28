const axios = window.axios;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const tag = urlParams.get("tag");

var images = [];  // array of objects, the images on screen
var imagesDisplayed = 0;

const container = document.querySelector(".images-section");

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
    let newImage = document.createElement("img");
    newImage.src = `https://cataas.com/cat/${obj.id}`;
    container.appendChild(newImage);
  });
}

function changeLayout() {
  console.log(event.target);
}

window.addEventListener("scroll", () => {
  let distanceScrolled = window.scrollY + window.innerHeight;
  // subtract some number from scrollHeight to make the web-page load images earlier
  if (distanceScrolled >= document.documentElement.scrollHeight) {
    // when users scrolls to the bottom, load more images
    fetchImages(10);
  }
});

fetchImages(10);
