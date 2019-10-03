let countdown;// обратный отчет
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown); // очищаем все таймеры, чтобы не становились в очередь, а сбрасывались при нажатии кнопок

  const now = Date.now(); // теккущее время
  const then = now + seconds * 1000;// second - секунды которые хотим запустить для таймера. Время "потом"
  //console.log({now, then});
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // выясняем сколько времени осталось на часах
    //console.log(secondsLeft);
    // check if we should stop it!
    if(secondsLeft < 0) { // чтобы секунды не уходили в минус
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) { // оставшее время отображения
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60; // остатки в секундах от минуты
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; // переменная для отображения оставшего времени
  document.title = display;
  timerDisplay.textContent = display; // отобразили через класс timerDisplay время на нашей странице
}

function displayEndTime(timestamp) { // время окончания
  const end = new Date(timestamp);
  const hour = end.getHours();
  //const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  //endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`; // для американцев время отображения
  endTime.textContent = `Be Back At ${hour}:${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time); // для преобразования кнопок в секунды
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {  
 e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
