let player = document.querySelector('#player')

document.addEventListener('keydown', function (e) {
    //Вниз
    if (e.keyCode == 83) {
        player.style.top = player.offsetTop + 50 + 'px'
    }
    //вверх
    if (e.keyCode == 87) {
        player.style.top = player.offsetTop - 50 + 'px'

    }
    //Выстрел
    if (e.keyCode == 32) {
        createBull()
    }
})

//Создаем пулю
function createBull() {
    let bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.top = player.offsetTop + 150 + 'px';
    document.body.appendChild(bullet);
    bulletMove(bullet)
}

//Движение пули
function bulletMove(bullet) {
    let timeId = setInterval(function () {

        bullet.style.left = bullet.offsetLeft + 10 + 'px';

        isShot(bullet, timeId);

        if (bullet.offsetLeft > document.body.clientWidth) {
            bullet.remove();
            clearInterval(timeId);
        }
    }, 10)
}

//Проверка попадания
function isShot(bullet, timer) {
    //Координаты пули Y
    let topB = bullet.offsetTop;
    let bottomB = bullet.offsetTop + bullet.offsetHeight;

    let enemy = document.querySelectorAll('.enemy');
    for (let i = 0; i <= enemy.length - 1; i++) {
        if (enemy != null) {
            let topE = enemy[i].offsetTop;
            let bottomE = enemy[i].offsetTop + enemy[i].offsetHeight;

            let leftB = bullet.offsetLeft;
            let leftE = enemy[i].offsetLeft;

            if (topB >= topE && bottomB <= bottomE && leftB >= leftE) {
                bullet.remove();
                enemy[i].className = 'boom';
                enemy[i].style.top = (topE - 50) + 'px'
                enemy[i].style.left = (leftE - 50) + 'px'

                clearInterval(enemy[i].dataset.timer);
                setTimeout(function () {
                    enemy[i].remove();
                    clearInterval(timer);
                }, 1000)
            }
        }
    }
}

//Создаем противников
function createEnemy() {
    let enemy = document.createElement('div');
    enemy.className = 'enemy';
    document.body.appendChild(enemy);
    enemy.style.top = (Math.round(Math.random() * 400)) + 'px'

    let timerId = setInterval(function () {
        enemy.style.left = enemy.offsetLeft - 10 + 'px';
        if (enemy.offsetLeft + enemy.offsetWidth < 0) {
            enemy.remove();
            clearInterval(timerId)
        };
    }, 70);
    enemy.dataset.timer = timerId;
}

setInterval(function () {
    createEnemy();
}, 3000)
