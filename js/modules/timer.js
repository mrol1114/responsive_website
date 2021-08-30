function timerHandler() {

    const deadLine = Date.parse(new Date()) + 99999999,
        timerInterval = setInterval(update, 1000);

    function getTime(time) {

        if (time <= 10) {
            return `0${time}`;
        } else {
            return time;
        }
    }
    function remainingTime(endTime) {
        const total = endTime - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor(total / (1000 * 60 * 60)) % 24,
            minutes = Math.floor(total / (1000 * 60)) % 60,
            seconds = Math.floor(total / (1000)) % 60;

        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function updateTimer(selector, time) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');


        if (time.total <= 0) {
            clearInterval(timerInterval);
        } else {
            days.textContent = getTime(time.days);
            hours.textContent = getTime(time.hours);
            minutes.textContent = getTime(time.minutes);
            seconds.textContent = getTime(time.seconds);
        }

    }


    function update() {
        const time = remainingTime(deadLine);
        updateTimer('.timer', time);
    }

    update();
}

export default timerHandler;