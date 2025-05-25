const players = document.querySelectorAll('.player');

players.forEach(player => {
  const video = player.querySelector('.viewer');
  const toggle = player.querySelector('.toggle');
  const skipButtons = player.querySelectorAll('[data-skip]');
  const ranges = player.querySelectorAll('.player__slider');
  const progress = player.querySelector('.progress');
  const progressFilled = player.querySelector('.progress__filled');

  function togglePlay() {
    video.paused ? video.play() : video.pause();
  }

  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // Event bindings
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);
  skipButtons.forEach(button => button.addEventListener('click', skip));
  ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
  });

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
});
