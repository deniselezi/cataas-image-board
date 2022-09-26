const axios = window.axios;
const loadingTime = Date.now();

function randomCat() {
  const currentTime = Date.now();
  const timeRemaining = 30 - ((currentTime - loadingTime) / 1000);
  if (timeRemaining < 0) {
    window.location.reload();
  } else {
    console.log(`${timeRemaining} seconds left`);
  }
}

function updateCountdown() {
  const currentTime = Date.now();
  const timeRemaining = 30 - ((currentTime - loadingTime) / 1000);
  if (timeRemaining > 0) {
    document.getElementById("countdown").innerText = `get a new cat in: ${Math.round(timeRemaining)}`;
  } else {
    document.getElementById("countdown").innerText = "click the button now!";
    document.getElementById("random-cat-button").disabled = false;
  }
}

setInterval(updateCountdown, 1000)

async function getTags() {
  var tags = await axios.get("https://cataas.com/api/tags");
  tags = tags.data;
  // in future, replace tags.length with tags-per-page limit
  for (let i = 0 ; i < tags.length ; i++) {
    // createTag(tags[i]);
  }
}

// in future, change the place where the tag is appended
function createTag(text) {
  const tagsList = document.getElementById("tags-list");
  const newLi = document.createElement("li");
  const newTagText = document.createTextNode(text);
  newTag = document.createElement("a")
  newTag.appendChild(newTagText);
  newLi.appendChild(newTag);
  tagsList.appendChild(newLi);
}

getTags();
