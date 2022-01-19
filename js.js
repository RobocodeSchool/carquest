//let variant = Math.floor(Math.random() * 5 + 1);
variant = 2;

isValid = true;

let gridStep;

let startButton = document.querySelector("#startButton");

let w = window.innerWidth / 2.4 + 40;
document.querySelector(".userArea").style.width = w + "px";

let userWay = [];
let userWays = [];

let img;

let playerX;
let playerY;

let i = 0;

let timer;

// state == 1 - ожидание команд
// state == 2 - отрисовка проезда
// state == 3 - неудача, перезапуск
// state == 4 - удача, перезапуск
let state = 1;

let startPointX;
let startPointY;

let way1 = [
  "forward 6",
  "turnDown 1",
  "forward 6",
  "turnRight 1",
  "forward 4",
  "turnUp 1",
  "forward 2",
  "turnRight 1",
  "forward 6",
  "turnDown 1",
  "forward 8",
  "turnLeft 1",
  "forward 4",
  "turnUp 1",
  "forward 2",
  "turnLeft 1",
  "forward 4",
  "turnDown 1",
  "forward 4",
  "turnLeft 1",
  "forward 6",
  "turnUp 1",
  "forward 4",
  "turnLeft 1",
  "forward 2",
];
let way2 = [
  "forward 14",
  "turnDown 1",
  "forward 4",
  "turnLeft 1",
  "forward 12",
  "turnDown 1",
  "forward 10",
  "turnRight 1",
  "forward 4",
  "turnUp 1",
  "forward 4",
  "turnRight 1",
  "forward 4",
  "turnDown 1",
  "forward 4",
  "turnRight 1",
  "forward 6",
  "turnUp 1",
  "forward 14",
  "turnRight 1",
  "forward 2",
];
let way3 = [
  "forward 6",
  "turnDown 1",
  "forward 6",
  "turnLeft 1",
  "forward 4",
  "turnDown 1",
  "forward 8",
  "turnRight 1",
  "forward 4",
  "turnUp 1",
  "forward 4",
  "turnRight 1",
  "forward 2",
  "turnUp 1",
  "forward 2",
  "turnRight 1",
  "forward 2",
  "turnUp 1",
  "forward 6",
  "turnRight 1",
  "forward 2",
  "turnDown 1",
  "forward 10",
  "turnRight 1",
  "forward 4",
  "turnUp 1",
  "forward 12",
  "turnRight 1",
  "forward 2",
];
let way4 = [
  "forward 4",
  "turnDown 1",
  "forward 2",
  "turnRight 1",
  "forward 2",
  "turnDown 1",
  "forward 2",
  "turnRight 1",
  "forward 4",
  "turnUp 1",
  "forward 2",
  "turnRight 1",
  "forward 6",
  "turnDown 1",
  "forward 10",
  "turnLeft 1",
  "forward 4",
  "turnUp 1",
  "forward 2",
  "turnLeft 1",
  "forward 4",
  "turnDown 1",
  "forward 4",
  "turnLeft 1",
  "forward 6",
  "turnUp 1",
  "forward 2",
  "turnLeft 1",
  "forward 2",
];
let way5 = [
  "forward 2",
  "turnDown 1",
  "forward 6",
  "turnRight 1",
  "forward 4",
  "turnDown 1",
  "forward 2",
  "turnRight 1",
  "forward 4",
  "turnUp 1",
  "forward 8",
  "turnRight 1",
  "forward 6",
  "turnDown 1",
  "forward 8",
  "turnLeft 1",
  "forward 2",
  "turnDown 1",
  "forward 4",
  "turnLeft 1",
  "forward 12",
  "turnDown 1",
  "forward 2",
  "turnRight 1",
  "forward 16",
];

let mainWay = [];

mainWay.push(way1);
mainWay.push(way2);
mainWay.push(way3);
mainWay.push(way4);
mainWay.push(way5);

let checkIndex = 0;

function preload() {
  img = loadImage("Quant-Right.png");
  game_map = loadImage(`maps/${variant}.svg`);
  Inter = loadFont("Inter.ttf");
}

function setup() {
  createCanvas(window.innerWidth / 2.4, window.innerWidth / 2.4);

  imageMode(CENTER);
  img.resize(width / 15, 0);
  game_map.resize(width, 0);

  gridStep = width / 20;

  startPointX = gridStep * 1;
  startPointY = gridStep * 3;

  playerX = startPointX;
  playerY = startPointY;

  timer = millis();
}

function draw() {
  if (state == 1) {
    background(220);
    image(game_map, width / 2, height / 2);
    grid();
    img.resize(width / 15, 0);
    image(img, playerX, playerY);
    gridStep = width / 20;
  } else if (state == 2) {
    background(220);
    image(game_map, width / 2, height / 2);
    grid();
    img.resize(width / 15, 0);
    image(img, playerX, playerY);
    gridStep = width / 20;

    if (userWays[0][i] == "turnDown") {
      img = loadImage("Quant-Down.png");
      checkRightWay();
    } else if (userWays[0][i] == "turnUp") {
      img = loadImage("Quant-Up.png");
      checkRightWay();
    } else if (userWays[0][i] == "turnRight") {
      img = loadImage("Quant-Right.png");
      checkRightWay();
    } else if (userWays[0][i] == "turnLeft") {
      img = loadImage("Quant-Left.png");
      checkRightWay();
    } else {
      playerX = +userWays[0][i];
      playerY = +userWays[1][i];
    }
    i++;

    if (i > userWays[0].length) {
      if (userWay != mainWay[variant - 1]) {
        isValid = false;
        state = 3;
      } else {
        state = 4;
      }
    }
  } else if (state == 3) {
    background(220);
    image(game_map, width / 2, height / 2);
    grid();
    img.resize(width / 15, 0);
    image(img, playerX, playerY);
    gridStep = width / 20;
    noStroke();
    fill("rgba(0,0,0, 0.7)");
    rect(0, 0, width, height);
    textSize(32);
    textFont(Inter);
    textAlign(CENTER);
    fill("rgb(255,255,255)");
    text("Щось пішло не так :(", width / 2, height / 2 - 120);
    text("Спробуєш ще раз?", width / 2, height / 2 - 60);
    rect(width / 2 - 100, height / 2 - 25, 200, 50, 20);

    textSize(24);
    fill("rgb(0,0,0)");
    text("RESET", width / 2, height / 2 + 8);

    if (
      mouseX > width / 2 - 50 &&
      mouseX < width / 2 - 50 + 100 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 - 25 + 50 &&
      mouseIsPressed
    ) {
      reset();
    }
  } else if (state == 4) {
    background(220);
    image(game_map, width / 2, height / 2);
    img.resize(width / 15, 0);
    image(img, playerX, playerY);
    gridStep = width / 20;
    noStroke();
    fill("rgba(0, 0, 0, 0.7)");
    rect(0, 0, width, height);
    textSize(32);
    textFont(Inter);
    textAlign(CENTER);
    fill("rgb(255,255,255)");
    text("Молодець, ти впорався!", width / 2, height / 2 - 150);

    textSize(20);
    text("Якщо хочеш спробувати ще раз з", width / 2, height / 2 - 80);
    text("іншою мапою, натисни на кнопку", width / 2, height / 2 - 50);

    rect(width / 2 - 100, height / 2 - 25, 200, 50, 20);

    textSize(24);
    fill("rgb(0,0,0)");
    text("RESET", width / 2, height / 2 + 8);

    if (
      mouseX > width / 2 - 50 &&
      mouseX < width / 2 - 50 + 100 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 - 25 + 50 &&
      mouseIsPressed
    ) {
      location.reload();
    }
  }
}

function reset() {
  isValid = true;
  state = 1;
  img = loadImage("Quant-Right.png");
  playerX = startPointX;
  playerY = startPointY;
  userWay = [];
  i = 0;
}

function grid() {
  stroke(170);
  strokeWeight(1);
  for (let i = 0; i <= width; i += gridStep) {
    line(i, 0, i, height);
  }
  for (let i = 0; i <= height; i += gridStep) {
    line(0, i, width, i);
  }
}

function checkRightWay() {
  if (userWay[checkIndex] == mainWay[variant - 1][checkIndex]) {
    checkIndex++;
  } else {
    state == 3;
  }
}

function userWayToPath(startX, startY, userWayOut) {
  let pathX = [];
  let pathY = [];
  let dirX = 1;
  let dirY = 0;
  let addedX = startX;
  let addedY = startY;

  for (let i = 0; i < userWayOut.length; i++) {
    let command = userWayOut[i].split(" ")[0];
    let steps = Number(userWayOut[i].split(" ")[1]);

    if (command == "turnDown") {
      dirX = 0;
      dirY = 1;
      pathX.push("turnDown");
      pathY.push("turnDown");
      continue;
    } else if (command == "turnUp") {
      dirX = 0;
      dirY = -1;
      pathX.push("turnUp");
      pathY.push("turnUp");
      continue;
    } else if (command == "turnRight") {
      dirX = 1;
      dirY = 0;
      pathX.push("turnRight");
      pathY.push("turnRight");
      continue;
    } else if (command == "turnLeft") {
      dirX = -1;
      dirY = 0;
      pathX.push("turnLeft");
      pathY.push("turnLeft");
      continue;
    }

    for (let j = 0; j < steps * gridStep; j += 3) {
      addedX += 3 * dirX;
      addedY += 3 * dirY;
      pathX.push(Math.round(addedX));
      pathY.push(Math.round(addedY));
    }
    startX = pathX[pathX.length - 1];
    startY = pathX[pathY.length - 1];
  }

  return [pathX, pathY];
}

window.addEventListener("resize", () => {
  location.reload();
});

startButton.addEventListener("click", () => {
  if (isValid) {
    let instructions = document.querySelectorAll(".instruction");

    instructions.forEach((element) => {
      let command = element.children[0].value + " " + element.children[1].value;
      userWay.push(command);
    });

    console.log(userWay);

    userWays = userWayToPath(startPointX, startPointY, userWay);

    state = 2;
  }
});

$(document).ready(function () {
  $("#add").click(function () {
    $(".editor .commands").append(`<div class="instruction">
                            <input type="text" class="command" placeholder="КОМАНДА" />
                            <input type="text" class="steps" placeholder="КРОКИ" />
                            <div class="del"></div>
                          </div>`);
  });
  $("html").on("click", ".del", function () {
    $(this.parentElement).remove();
  });

  $("#add").mouseover(function () {
    $("#add").attr("src", "add_button_hover.svg");
  });
  $("#add").mouseout(function () {
    $("#add").attr("src", "add_button.svg");
  });
});
