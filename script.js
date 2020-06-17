let player = document.querySelector('#player')
let enemyMass = []

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
    timeId()

    function timeId() {
        bullet.style.left = bullet.offsetLeft + 50 + 'px';

        isShot(bullet);

        if (bullet.offsetLeft < document.body.clientWidth) {
            requestAnimationFrame(timeId);

        } else {
            bullet.remove();
        }
    }
}

//Проверка попадания
function isShot(bullet) {
    //Координаты пули Y
    let topB = bullet.offsetTop;
    let bottomB = bullet.offsetTop + bullet.offsetHeight;

    for (let i = 0; i <= enemyMass.length - 1; i++) {
        if (enemyMass != null) {
            let topE = enemyMass[i].offsetTop;
            let bottomE = enemyMass[i].offsetTop + enemyMass[i].offsetHeight;

            let leftB = bullet.offsetLeft;
            let leftE = enemyMass[i].offsetLeft;

            if (topB >= topE && bottomB <= bottomE && leftB >= leftE) {
                bullet.remove();
                enemyMass[i].className = 'boom';
                enemyMass[i].style.top = (topE - 50) + 'px'
                enemyMass[i].style.left = (leftE - 50) + 'px'

                setTimeout(function () {
                    enemyMass[i].remove();
                }, 1000)
            }
        }
    }
}

//Столкновение с противником
function isDestroy() {
    for (let i = 0; i <= enemyMass.length - 1; i++) {
        let topE = enemyMass[i].offsetTop;
        let bottomE = enemyMass[i].offsetTop + enemyMass[i].offsetHeight;
        let topP = player.offsetTop;
        let bottomP = topP + player.offsetHeight;
        let leftE = enemyMass[i].offsetLeft;
        let rightP = player.offsetLeft + player.offsetWidth;

        if (topE >= topP && bottomE <= bottomP && leftE <= rightP) {
            documen
            enemyMass[i].className = 'boom';
            enemyMass[i].style.top = (topE - 50) + 'px'
            enemyMass[i].style.left = (leftE - 50) + 'px'
            setTimeout(function () {
                enemyMass[i].remove();
            }, 1000)
        }
    }
}



//Создаем противников
function createEnemy() {
    let enemy = document.createElement('div');
    enemy.className = 'enemy';
    document.body.appendChild(enemy);
    enemy.style.top = (Math.round(Math.random() * 400)) + 'px';
    enemyMass.push(enemy)
    timerId();

    function timerId() {
        enemy.style.left = enemy.offsetLeft - 13 + 'px';
        if (enemy.offsetLeft + enemy.offsetWidth > 0) {
            isDestroy();
            requestAnimationFrame(timerId);
        } else {
            enemy.remove();
        }
    };
}

setInterval(function () {
    createEnemy();
}, 3000)
