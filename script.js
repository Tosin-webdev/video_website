// get our Ellements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build out functions

// pause and play the button
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  //console.log(icon);
  toggle.textContent = icon;
  //   console.log(this);
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(this);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  //   console.log(this.value);
  //   console.log(this.name);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  //   console.log(percent);
  console.log(video.duration);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);

skipButtons.forEach(function (skipButton) {
  skipButton.addEventListener("click", skip);
});

ranges.forEach(function (range) {
  range.addEventListener("change", handleRangeUpdate);
});

ranges.forEach(function (range) {
  range.addEventListener("mousemove", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }

//   if (video.paused) {
//     ("►");
//   } else {
//     ("❚ ❚");
//   }

// progress.addEventListener("mousemove", (e) => {
//   if (mousedown) {
//     scrub();
//   }
// });
