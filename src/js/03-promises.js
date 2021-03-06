import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((Fulfill, Reject) => {
    setInterval(() => {
      if (shouldResolve) {
        Fulfill({ position, delay });
      } else {
        Reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
