let islands = []; // Глобальная переменная для острова
let max_square = 0; // Максимальная площадь острова

function agent(x, y, square = 0) {
  // Помечаем сектор, на котором уже побывали
  islands[x][y] = 2;
  // Площадь каждого посещенного сектора равна 1
  square += 1;

  if (typeof islands[x + 1] !== "undefined" && islands[x + 1][y] == 1) {
    square = agent(x + 1, y, square);
  }
  if (typeof islands[x - 1] !== "undefined" && islands[x - 1][y] == 1) {
    square = agent(x - 1, y, square);
  }
  if (islands[x][y - 1] == 1) {
    square = agent(x, y - 1, square);
  }
  if (islands[x][y + 1] == 1) {
    square = agent(x, y + 1, square);
  }

  return square;
}

onmessage = function (e) {
  islands = e.data;
  const len = islands.length;

  for (let x = 0; x < len; x++) {
    for (let y = 0; y < len; y++) {
      if (islands[x][y] == 1) {
        const square = agent(x, y);
        max_square = Math.max(max_square, square);
      }
    }
  }

  postMessage(`${max_square} - maximum area`);

  close();
};