document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем значения из полей ввода
    const initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
    const angle = parseFloat(document.getElementById('angle').value);

    // Константа свободного падения (в м/с^2)
    const g = 9.8;

    // Перевод угла из градусов в радианы
    const angleInRadians = angle * (Math.PI / 180);
    console.log(angleInRadians)

    // Разбиваем начальную скорость на горизонтальную и вертикальную компоненты
    const initialVelocityX = initialVelocity * Math.cos(angleInRadians);
    const initialVelocityY = initialVelocity * Math.sin(angleInRadians);

    // Массивы для хранения координат
    let xValues = [];
    let yValues = [];

    // Время
    let time = 0;
    // Шаг времени (в секундах)
    const timeStep = 0.01;

    // Симуляция движения тела
    while (true) {
        // Вычисляем новые координаты
        let x = initialVelocityX * time;
        let y = initialVelocityY * time - g * time * time / 2;

        // Добавляем координаты в массивы
        xValues.push(x);
        yValues.push(y);

        // Если объект достиг или превысил землю, завершаем симуляцию
        if (y < 0) {
            break;
        }

        // Увеличиваем время на шаг
        time += timeStep;
    }

    // Создаем элемент canvas
    const ctx = document.getElementById('myChart').getContext('2d');

    // Если график уже был создан, удаляем его
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Создаем новый график
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            // Метки для оси X
            labels: xValues,
            datasets: [{
                label: 'Траектория движения тела',
                // Данные для графика
                data: yValues,
                // Цвет линии
                borderColor: '#000',
                // Ширина линии
                borderWidth: 1.5
            }]
        },
        options: {
            scales: {
                // Определение оси X
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                // Определение оси Y
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
});