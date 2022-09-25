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
    document.getElementById("countdown").innerHTML = `get a new cat in: ${Math.round(timeRemaining)}`;
  } else {
    document.getElementById("countdown").innerHTML = "click the button now!";
    document.getElementById("random-cat-button").disabled = false;
  }
}

setInterval(updateCountdown, 1000)
