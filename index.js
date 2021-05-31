let gamePattern = [];
let userPattern = [];
let colors = ["red", "green", "yellow", "blue"];
let level = 0;

function randomColorGenerator() {
  userPattern = [];
  $(".big_heading").text("Level " + level);
  level++;

  let randomNumber = Math.round(Math.random() * 3);
  let randomColor = colors[randomNumber];
  playSound(randomColor);
  gamePattern.push(randomColor);
  console.log("G:" + gamePattern);
  flash(randomColor);
}

function flash(randomColor) {
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animate(userChosenColor) {
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(() => {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
}

function playSound(userChosenColor) {
  let audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        randomColorGenerator();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $(".big_heading").text("Oops! Wrong! Press Any Key To Restart");
    $("body").addClass("game_over");
    setTimeout(() => {
      $("body").removeClass("game_over");
    }, 100);

    restart();
  }
}

$(document).keypress(function () {
  randomColorGenerator();
});

$(".btn").click(function () {
  let userChosenColor = this.id;
  animate(userChosenColor);
  playSound(userChosenColor);
  userPattern.push(userChosenColor);
  console.log("U:" + userPattern);
  checkAnswer(userPattern.length - 1);
});

function restart() {
  userPattern = [];
  level = 0;
}