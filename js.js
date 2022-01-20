let variant = Math.floor(Math.random() * 5 + 1);
//variant = 5;

isValid = true;

let gridStep;

let startButton = document.querySelector("#startButton");

let w;
if (window.innerWidth > 800) {
  w = window.innerWidth / 2.4 + 40;
  document.querySelector(".userArea").style.width = w + "px";
}

let userWay = [];
let userWays = [];

let rightWay = true;

let img;

let playerX;
let playerY;

let i = 0;

let timer;

// state == 1 - ожидание команд
// state == 2 - отрисовка проезда
// state == 3 - неудача, перезапуск
// state == 4 - удача, перезапуск
let state = 4;

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
  img = loadImage("images/Quant/Quant-Right.png");
  game_map = loadImage(`images/maps/${variant}.svg`);
  Inter = loadFont("fonts/Inter.ttf");
}

function setup() {
  if (innerWidth > 800) {
    createCanvas(window.innerWidth / 2.4, window.innerWidth / 2.4);
  } else {
    createCanvas(window.innerWidth / 1.2, window.innerWidth / 1.2);
  }

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
      img = loadImage("images/Quant/Quant-Down.png");
      checkRightWay();
    } else if (userWays[0][i] == "turnUp") {
      img = loadImage("images/Quant/Quant-Up.png");
      checkRightWay();
    } else if (userWays[0][i] == "turnRight") {
      img = loadImage("images/Quant/Quant-Right.png");
      checkRightWay();
    } else if (userWays[0][i] == "turnLeft") {
      img = loadImage("images/Quant/Quant-Left.png");
      checkRightWay();
    } else {
      playerX = +userWays[0][i];
      playerY = +userWays[1][i];
    }
    i++;

    if (i > userWays[0].length) {
      // console.log(userWay);
      // console.log(mainWay[variant - 1]);
      if (!rightWay) {
        isValid = false;
        state = 3;
      } else {
        isValid = false;
        state = 4;
        setTimeout(() => {
          document.location.href = "https://robocode.ua/fest-ua";
        }, 3000);
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
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 - 100 + 200 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 - 25 + 50
    ) {
      document.querySelector("canvas").style.cursor = "pointer";
    } else document.querySelector("canvas").style.cursor = "default";

    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 - 100 + 200 &&
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
    text("А тепер дивись, що відбудется :)", width / 2, height / 2 - 80);
    //text("з інформацією про фест", width / 2, height / 2 - 50);

    //rect(width / 2 - 100, height / 2 - 25, 200, 50, 20);

    //textSize(24);
    //fill("rgb(0,0,0)");
    //text("Про Фест", width / 2, height / 2 + 8);

    // if (
    //   mouseX > width / 2 - 100 &&
    //   mouseX < width / 2 - 100 + 200 &&
    //   mouseY > height / 2 - 25 &&
    //   mouseY < height / 2 - 25 + 50
    // ) {
    //   document.querySelector("canvas").style.cursor = "pointer";
    // } else document.querySelector("canvas").style.cursor = "default";

    // if (
    //   mouseX > width / 2 - 100 &&
    //   mouseX < width / 2 - 100 + 200 &&
    //   mouseY > height / 2 - 25 &&
    //   mouseY < height / 2 - 25 + 50 &&
    //   mouseIsPressed
    // ) {
    //   document.location.href = "https://robocode.ua/fest-ua";
    //   //location.reload();
    // }
  }
}

function reset() {
  isValid = true;
  state = 1;
  img = loadImage("images/Quant/Quant-Right.png");
  playerX = startPointX;
  playerY = startPointY;
  userWay = [];
  i = 0;
  checkIndex = 0;
  rightWay = true;
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
  if (userWay[checkIndex] === mainWay[variant - 1][checkIndex]) {
    // console.log(
    //   `User: ${userWay[checkIndex]}, Game: ${mainWay[variant - 1][checkIndex]}`
    // );
    checkIndex += 2;
  } else {
    // console.log(
    //   `User: ${userWay[checkIndex]}, Game: ${mainWay[variant - 1][checkIndex]}`
    // );
    state = 3;
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
  if (window.innerWidth > 500) location.reload();
});

startButton.addEventListener("click", () => {
  if (isValid) {
    let instructions = document.querySelectorAll(".instruction");

    instructions.forEach((element) => {
      let command =
        element.children[0].value.trim() +
        " " +
        element.children[1].value.trim();
      userWay.push(command);
    });

    console.log(userWay);
    console.log(mainWay[variant - 1]);

    userWays = userWayToPath(startPointX, startPointY, userWay);

    equalsWays(userWay, mainWay[variant - 1]);
    console.log(rightWay);

    state = 2;
  }
});

function equalsWays(user, game) {
  if (user.length != game.length) {
    console.log("Different length");
    rightWay = false;
  } else {
    for (let i = 0; i < user.length; i++) {
      if (user[i] != game[i]) {
        console.log(
          `User command: ${user[i]}, Game command: ${game[i]}, index: ${i}`
        );
        rightWay = false;
      }
    }
  }
}

$(document).ready(function () {
  $("#add").click(function () {
    $(".editor .commands").append(`<div class="instruction">
    <input
      type="text"
      class="command"
      placeholder="КОМАНДА"
      pattern="forward|turnDown|turnUp|turnRight|turnLeft"
      required
    />
    <input type="number" class="steps" placeholder="КРОКИ" max="20" min="1" onchange="checkSteps(this)" required/>

    <div class="del"></div>
  </div>`);
  });
  $("html").on("click", ".del", function () {
    $(this.parentElement).remove();
  });

  $("#add").mouseover(function () {
    $("#add").attr("src", "images/add_button_hover.svg");
  });
  $("#add").mouseout(function () {
    $("#add").attr("src", "images/add_button.svg");
  });
});

function checkSteps(element) {
  neir = element.previousElementSibling.value;
  if (
    neir === "turnRight" ||
    neir === "turnLeft" ||
    neir === "turnUp" ||
    neir === "turnDown"
  ) {
    element.min = 1;
    element.max = 1;
  } else {
    element.min = 2;
    element.max = 20;
  }
}
