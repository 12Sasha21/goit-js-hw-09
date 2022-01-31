const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

start.addEventListener('click', () => {
  start.disabled = true;
  colorId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});

stop.addEventListener('click', () => {
  start.disabled = false;
  clearInterval(colorId);
});
