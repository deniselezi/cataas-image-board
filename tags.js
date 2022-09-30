const axios = window.axios;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get("search");  // either null or a string
const page = Number(urlParams.get("page"));
var tags = [];

async function getTags() {
  tags = await axios.get("https://cataas.com/api/tags");
  tags = tags.data;
  if (search) {
    filterTags();
  }
  seedPage(page);
}

function filterTags() {
  tags = tags.filter(tag =>
    tag.toLowerCase().includes(search.toLowerCase())
  );
}

function seedPage(page) {
  let j = page * 30;
  if (j >= tags.length) {
    j = tags.length;
  }
  for (let i = j - 30 < 0 ? 0 : j - 30 ; i < j ; i++) {
    createTag(tags[i]);
  }

  var totalPages = Math.floor(tags.length / 30);
  const remainingTags = tags.length % 30;
  if (remainingTags != 0) {
    totalPages = totalPages + 1;
  }

  if (page <= 2) {
    createNavigation(1, 5, page, totalPages);
  } else if (page >= totalPages - 2) {
    createNavigation(totalPages - 4, totalPages, page, totalPages);
  } else {
    createNavigation(page - 2, page + 2, page, totalPages);
  }
}

function createTag(text) {
  const tagsSection = document.getElementsByClassName("tags-section")[0];
  const tag = document.createElement("a");
  tag.classList.add("tag");
  const tagText = document.createTextNode(text);
  tag.appendChild(tagText);
  tag.href = `catalog.html?tag=${tagText.wholeText}&grid=2`;
  tagsSection.appendChild(tag);
}

function createNavigation(start, end, page, totalPages) {
  let searchPar = '';
  if (search) {  // if this is a search results page
    searchPar = `search=${search}&`;
  }
  const navigation = document.getElementsByClassName("tags-navigation")[0];
  const goToStart = document.createElement("a");
  goToStart.classList.add("navigation-item");
  startText = document.createTextNode("\u00ab");
  goToStart.appendChild(startText);
  goToStart.href = `tags.html?${searchPar}page=1`;
  navigation.appendChild(goToStart);

  end = totalPages < end ? totalPages : end;
  for (let i = start; i <= end; i++) {
    const link = document.createElement("a");
    const number = document.createTextNode(`${i}`)
    link.appendChild(number);
    if (i === page) {
      link.id = "navigation-item-selected";
    }
    link.classList.add("navigation-item");
    link.href = `tags.html?${searchPar}page=${i}`;
    navigation.appendChild(link);
  }

  const goToEnd = document.createElement("a");
  goToEnd.classList.add("navigation-item");
  endText = document.createTextNode("\u00bb");
  goToEnd.appendChild(endText);
  goToEnd.href = `tags.html?${searchPar}page=${totalPages}`;
  navigation.appendChild(goToEnd);
}

function searchTags(event) {
  event.preventDefault();
  let searchBar = document.getElementById("search-input");
  let searchString = searchBar.value;
  // redirect to a search results page
  window.location.replace(`tags.html?search=${searchString}&page=1`);
};

getTags();
