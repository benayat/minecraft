//setting up the landing page - muc

// setting up the world matrix:

function worldSetUp(squareClass, x, y) {
  let world = document.createElement("div");
  world.classList.add("world");
  document.body.appendChild(world);
  let worldWidth = x;
  let worldHeight = y;
  for (let i = 0; i < worldHeight; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    world.appendChild(row);
    for (let j = 0; j < worldWidth; j++) {
      let square = document.createElement("div");
      square.classList.add(`${squareClass}`);
      row.appendChild(square);
    }
  }
  return world;
}

/* 
create a new world: 5vh squaresize, 20 rows, 40 cols:
different kinds, down to top: 30% dirt, 1 line of dirt\grass,1 line of ground to put things, 6 lines for talles trees, and above that is the place for clouds.
blue background: 70% top.
trees: up to 3, 1 shape.
clouds: up to 3, 2 shapes.
rocks: up to three, two shapes.(1 and 2 close)

*/
function baseSoil(world) {
  let rows = world.children.length;
  let cols = world.children[0].length;
  for (let i = rows - 1; i > Math.floor((rows * 2) / 3); i--) {
    for (let j = 0; j < cols; j++) {
      world.children[i].children[j].classList.add("square_dirt");
    }
  }
}

function basegrass(world) {
  let squareArray = [...world.children].find((x) =>
    x.children[0].classList.contains("square_dirt")
  ).previousElementSibling;
  squareArray.forEach((value) => value.classList.add("square_bellow_surface"));
}
function BaseLayerSky(world) {
  let lastElement = [...world.children].find((x) =>
    x.children[0].classList.contains("square_dirt")
  ).previousElementSibling;
  let lastIndex = [...world.children].findIndex(lastElement);
  for (let i = 0; i <= lastIndex; i++) {
    world.children[i].forEach((value) => value.classList.add("square_sky"));
  }
}

function clearWorld(world) {
  world.innerHTML = "";
}
function createBaseScreen(screenType = "pc") {
  switch (screenType) {
    case "pc": {
      let world = worldSetUp("square", 25, 50);
      baseSoil(world);
      basegrass(world);
      BaseLayerSky(world);
      break;
    }
    case "smartphone": {
      let world = worldSetUp("square_ipad", 20, 40);
    }
    default:
      break;
  }
}

// setting up the landing page:

let world = worldSetUp("landing_Page_square", 10, 5);
const allSquares = world.querySelectorAll(".landing_Page_square");
allSquares.forEach((value) => value.classList.add("square_dirt"));

const logoStartDiv = document.createElement("div");
logoStartDiv.classList.add("startDiv");

const logo = document.createElement("img");
logo.classList.add("landing_logo");

const startGame = document.createElement("button");
startGame.classList.add("start");
startGame.innerHTML = `start`;

startGame.addEventListener("click", (event) => {
  clearWorld(event.target.parentElement.parentElement);
  createBaseScreen("pc");
  // createRandomWorld();
  // createRightToolsDiv();
});

logoStartDiv.insertAdjacentElement("afterbegin", logo);
logoStartDiv.insertAdjacentElement("beforeend", startGame);
world.insertAdjacentElement("beforeend", logoStartDiv);
//setting the button:
