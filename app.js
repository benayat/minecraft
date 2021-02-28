/* 
class mineCraft: 
constructor - basic stuff {
- basic layers
on ground-level:
- trees: leafs and trunk,
- rocks.
on sky level: 
- clouds: 2 kinds maybe.
database: an object histogram with everything. 

right-sidebar create: 
- add html
- add css: 
black background, 
column-flexed items: 
(tools: pickaxe, shovel, axe) - each tool has its functionality: pickaxe: stone, shovel: ground, axe: trunks. 
(inventory: ), 
}
 
button: shake the world/restart: 
- animation - page shaking.
- randomizing everything.


*/
class Shape {
  constructor(number, classToAdd) {
    this.board = Shape.generate(number, classToAdd);
    this.number = number;
    this.classToAdd = classToAdd;
  }
  get() {
    return this.board;
  }

  static generate(number, classToAdd) {
    let shape = [];

    switch (number) {
      case 1: {
        for (let i = 0; i < 6; i++) {
          shape[i] = [];
        }
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 6; j++) {
            if (i > j) {
              shape[i][j] = classToAdd;
            } else {
              //adding an empty string to class name will not change anything.
              shape[i][j] = "";
            }
          }
        }
        return shape;
      }
      case 2: {
        for (let i = 0; i < 6; i++) {
          shape[i] = [];
        }
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 6; j++) {
            if ((i % 2 == 0 && j % 2 == 0) || j % 2 != 0) {
              shape[i][j] = classToAdd;
            } else {
              shape[i][j] = "";
            }
          }
        }
        return shape;
      }
      case 3: {
        for (let i = 0; i < 6; i++) {
          shape[i] = [];
        }
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 6; j++) {
            if ((i == 0 && j == 2) || (i == 1 && j != 0 && j != 5) || i > 1) {
              shape[i][j] = classToAdd;
            } else {
              shape[i][j] = "";
            }
          }
        }
        return shape;
      }
      //4 is a tree:
      case 4: {
        for (let i = 0; i < 7; i++) {
          shape[i] = [];
        }
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 3; j++) {
            if (j >= 0 && j <= 2 && i >= 0 && i <= 2) {
              shape[i][j] = "square_plants";
            } else if (i >= 3 && j == 1) {
              shape[i][j] = "square_log";
            } else {
              shape[i][j] = "";
            }
          }
        }
        return shape;
      }
      default:
        return null;
    }
  }
}

class MineCraft {
  constructor() {
    let screen = window.innerWidth <= 568 ? "smartphone" : "pc";
    const triplet = MineCraft.createBaseScreen(screen);
    this.world = triplet.world;
    this.matrix = triplet.matrix;
    this.rowArray = triplet.rowArray;
    //will this work??not sure! just remember to take it directly from the generateing sky function after inserting to class!
    this.groundIndex = this.rowArray.indexOf(
      this.rowArray.find((x) => x.classList.contains("ground_level"))
    );
    this.shapes = MineCraft.randomize();

    this.clouds = {
      shape: new Shape(this.shapes.clouds.shape, "square_cloud"),
      number: this.shapes.clouds.number,
    };
    this.stones = {
      shape: new Shape(this.shapes.stones.shape, "square_rock"),
      number: this.shapes.stones.number,
    };
    this.trees = { shape: new Shape(4, ""), number: this.shapes.trees.number };
    this.initialNumberOfGoundObjects = this.trees.number + this.stones.number;

    this.groundPlacement();
    this.cloudPlacement();
    this.classes_allowed = [];
    this.makeRightDiv();
    this.inventory = {};
    this.memory = [];
    //removed memory. going for radio buttons instead.
  }

  /* 
right div and game functionality: 
- three radio buttons: 
* one for each tool- pickaxe, shovel and axe:
* axe for trees,
* shovel for ground,
* pickaxe for rocks and clouds.(?really?)
6 resource types: trees(grass and trunk), clouds, stones, ground(dirt and grass).
placing: buttons in a flex dix, column direction, and the resources histogram in another same flex div bellow. both wrapped by another flex div, with the same direction.
*/

  /* functionality: 
  sort tools/buttons functoinality by class. 
  radio functionality through the html\css!! 
  only then add event listeners. 

  event listeners: click=>certain classes 
  and...done!
*/

  makeRightDiv() {
    //creating and adding the right div
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right_div");
    document.body.insertAdjacentElement("afterbegin", rightDiv);
    rightDiv.style.paddingTop = "3vh";
    //creating radioButtonsHTML and injecting to rightDiv.
    let shovelButtonHTML = `<label class = "shovel">
    <input type="radio" name="tool" checked>
    <img id = "shovel_img" src="img/shovel.jpg">
    </label>`;
    let pickaxeButtonHTML = `<label class = "pickaxe">
    <input type="radio" name="tool">
    <img id = "pickaxe_img" src="img/pickaxe.jpg">
    </label>`;
    let axeButtonHTML = `<label class = "axe">
    <input type="radio" name="tool">
    <img id = "axe_img" src="img/axe.jpg">
    </label>`;
    rightDiv.insertAdjacentHTML("beforeend", shovelButtonHTML);
    rightDiv.insertAdjacentHTML("beforeend", pickaxeButtonHTML);
    rightDiv.insertAdjacentHTML("beforeend", axeButtonHTML);
    //make inventoryHTML with html.
    /*     let inventoryDirtButtonHTML = `<label class = "inventory invisible" id = "square_dirt">
    <input type="radio" name="resource">
    <img id = "dirt_img" src="img/dirt.jpg">
    </label>`;
    let inventoryGrassButtonHTML = `<label class = "inventory invisible" id = "square_bellow_surface">
    <input type="radio" name="resource">
    <img id = "grass_img" src="img/grass.png">
    </label>`;
    let inventoryLogButtonHTML = `<label class = "inventory invisible" id = "square_log">
    <input type="radio" name="resource">
    <img id = "log_img" src="img/trunk.jpg">
    </label>`;
    let inventoryPlantButtonHTML = `<label class = "inventory invisible" id = "square_plants">
    <input type="radio" name="resource">
    <img id = "leaf_img" src="img/leaf.png">
    </label>`;
    let inventoryRockButtonHTML = `<label class = "inventory invisible" id = "square_rock">
    <input type="radio" name="resource">
    <img id = "dirt_img" src="img/dirt.jpg">
    </label>`;
    let inventoryCloudButtonHTML = `<label class = "inventory invisible" id = "square_cloud">
    <input type="radio" name="resource">
    <img id = "dirt_img" src="img/dirt.jpg">
    </label>`;
 */
    const inventoryHTML = `
    <div class = "inventory_wrap">
    <div class = "inventory invisible" id = "square_dirt"><span class = small_number></span></div>
    <div class = "inventory invisible" id = "square_bellow_surface"><span class = small_number></span></div>
    <div class = "inventory invisible" id = "square_plants"><span class = small_number></span></div>
    <div class = "inventory invisible" id = "square_rock"><span class = small_number></span></div>
    <div class = "inventory invisible" id = "square_log"><span class = small_number></span></div>
    <div class = "inventory invisible" id = "square_cloud"><span class = small_number></span></div>
    </div>
    `;
    rightDiv.insertAdjacentHTML("beforeend", inventoryHTML);
    //in the meantime - adding classes style in css for the radio buttons. simple and done.
    let shovelButton = rightDiv.querySelector(".shovel").firstElementChild;
    let pickaxeButton = rightDiv.querySelector(".pickaxe").firstElementChild;
    let axeButton = rightDiv.querySelector(".axe").firstElementChild;

    let radioHandlerBind = radioHandler.bind(this);

    //making radioHandler active in purpose - so it will set the active one page load.
    radioHandlerBind();
    shovelButton.addEventListener("change", radioHandlerBind);
    pickaxeButton.addEventListener("change", radioHandlerBind);
    axeButton.addEventListener("change", radioHandlerBind);

    /*
     * I used bind for the event listeners, because otherwise I wouldn't be able to reference to the mineCraft object in any way - not by the global object because the constructor hasn't finished yet, and not by the "this" keyword because it will point to the window if we go deeper in the scope.
     */

    let squareResources = this.world.querySelectorAll(
      ".square_dirt,.square_bellow_surface,.square_cloud,.square_plants,.square_log,.square_rock"
    );
    let addToInventoryBind = addToInventory.bind(this);
    squareResources.forEach((x) =>
      x.addEventListener("click", addToInventoryBind, {
        once: true,
      })
    );
    //* important thing I learned: querySelecyorAll uses css selector, and so you can use [attribute^=value]	or [attribute$=value] for atributes which the value ends with the specified value.
    let squaresAvailable = this.world.querySelectorAll(
      'div[class$="square square_sky"]'
    );
    let addfromMemoryBind = addFromMemory.bind(this);
    squaresAvailable.forEach((x) =>
      x.addEventListener("click", addfromMemoryBind, {
        once: true,
      })
    );
    let moveToMemoryBind = moveToMemory.bind(this);

    let inventory_squares = rightDiv.querySelectorAll(".inventory");
    inventory_squares.forEach((x) =>
      x.addEventListener("click", moveToMemoryBind)
    );

    let buttonsHTML = `
    <button class = "game_control reset">RESET</button>
    <button class = "game_control exit">exit</button>
    `;
    rightDiv.insertAdjacentHTML("afterbegin", buttonsHTML);
    const buttonReset = rightDiv.querySelector(".reset");
    buttonReset.style.paddingBottom = "1vh";
    const buttonExit = rightDiv.querySelector(".exit");

    const resetGameBind = resetGame.bind(this);
    const exitGameBind = exitGame.bind(this);

    buttonReset.addEventListener("click", resetGameBind);
    buttonExit.addEventListener("click", exitGameBind);

    document
      .querySelectorAll("label")
      .forEach((x) => (x.style.paddingTop = "2vh"));
    let mos = document.querySelectorAll("label");
    console.log(mos);

    // target: add event listeners to all squares that can and need to move.
    //the event will be a click one.
    //important: give all squares sky class, in case somebody moves them.
    //event: when a click happens, remove current square(remove last class applied),
    //and add it's class to the inventory-tempresource collection:
    //add it to the right div histogram automatically.
  }

  static randomize() {
    return {
      clouds: {
        number: Math.floor(Math.random() * 2 + 2),
        shape: Math.floor(Math.random() * 3) + 1,
      },
      stones: {
        number: Math.floor(Math.random() * 4 + 2),
        shape: Math.floor(Math.random() * 3 + 1),
      },
      trees: { number: Math.floor(Math.random() * 3 + 1) },
    };
  }
  placeGround(shape, index, maxIndex) {
    let indexToAdd = Math.ceil((this.matrix[0].length * index) / maxIndex);
    for (let i = 0; i < shape.board.length; i++) {
      for (let j = 0; j < shape.board[0].length; j++) {
        if (shape.board[i][j]) {
          this.matrix[this.groundIndex - (shape.board.length - 1 - i)][
            indexToAdd + j + 1
          ].classList.add(shape.board[i][j]);
        }
      }
    }
  }

  groundPlacement() {
    let stoneArray = [
      new Shape(1, "square_rock"),
      new Shape(2, "square_rock"),
      new Shape(3, "square_rock"),
    ];

    while (this.stones.number || this.trees.number) {
      for (let i = 0; i < this.initialNumberOfGoundObjects; i++) {
        if (this.stones.number && i % 2 == 0) {
          this.placeGround(
            stoneArray[Math.floor(Math.random() * 3)],
            i,
            this.initialNumberOfGoundObjects
          );
          this.stones.number--;
          continue;
        }
        if (this.trees.number && i % 2 != 0) {
          this.placeGround(
            this.trees.shape,
            i,
            this.initialNumberOfGoundObjects
          );
          this.trees.number--;
          continue;
        }
      }
    }
  }
  addCloud(shape, index, maxIndex) {
    let indexToAddY = Math.floor(this.matrix.length / 4);
    let indexToAddX = Math.floor((this.matrix[0].length * index) / maxIndex);
    for (let i = 0; i < shape.board.length; i++) {
      for (let j = 0; j < shape.board[0].length; j++) {
        if (shape.board[i][j]) {
          this.matrix[indexToAddY - i][indexToAddX + j + 2].classList.add(
            shape.board[i][j]
          );
        }
      }
    }
  }
  cloudPlacement() {
    let stoneArray = [
      new Shape(1, "square_cloud"),
      new Shape(2, "square_cloud"),
      new Shape(3, "square_cloud"),
    ];
    let initialClouds = this.clouds.number;
    for (let i = 0; i < initialClouds; i++) {
      if (this.clouds.number) {
        this.addCloud(
          stoneArray[Math.floor(Math.random() * 3)],
          i,
          initialClouds
        );
        this.clouds.number--;
      }
    }
  }
  /* 
create a new world: 5vh squaresize, 20 rows, 40 cols:
different kinds, down to top: 30% dirt, 1 line of dirt\grass,1 line of ground to put things, 6 lines for talles trees, and above that is the place for clouds.
blue background: 70% top.
trees: up to 3, 1 shape.
clouds: up to 3, 2 shapes.
rocks: up to three, two shapes.(1 and 2 close)

*/

  static baseSoil(matrix, rowArray) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    for (let i = rows - 1; i > Math.floor((rows * 2) / 3); i--) {
      for (let j = 0; j < cols; j++) {
        matrix[i][j].classList.add("square_dirt");
      }
    }
    rowArray[Math.floor((rows * 2) / 3)].classList.add("row_beneath_surface");
  }
  static basegrass(matrix, rowArray) {
    let beneathSurface = rowArray.find((x) =>
      x.classList.contains("row_beneath_surface")
    );
    let index = rowArray.indexOf(beneathSurface);
    matrix[index].forEach((value) =>
      value.classList.add("square_bellow_surface")
    );
  }

  //creating the base layer sky, plus:
  //the initial ground_level class will be added to the ground array.
  //ground_square class will be added to every square on the floor.

  static BaseSky(matrix, rowArray) {
    let firstSkyArray = matrix.find((x) =>
      x[0].classList.contains("square_bellow_surface")
    );
    let index = matrix.indexOf(firstSkyArray) - 1;
    rowArray[index].classList.add("ground_level");
    for (let i = 0; i <= index; i++) {
      matrix[i].forEach((value) => value.classList.add("square_sky"));
    }
  }
  static clearWorld({ world, matrix, rowArray }) {
    world.innerHTML = "";
    matrix = null;
    rowArray = null;
  }

  static createBaseScreen(screenType = "pc") {
    let world;
    let matrix;
    let rowArray;
    let matrixTriple;
    switch (screenType) {
      case "pc": {
        matrixTriple = MineCraft.worldSetUp("square", 25, 50);
        break;
      }
      case "smartphone": {
        matrixTriple = MineCraft.worldSetUp("square", 20, 40);
      }
      default:
        break;
    }
    world = matrixTriple.world;
    matrix = matrixTriple.matrix;
    rowArray = matrixTriple.rowArray;
    MineCraft.baseSoil(matrix, rowArray);
    MineCraft.basegrass(matrix, rowArray);
    MineCraft.BaseSky(matrix, rowArray);
    return { world, matrix, rowArray };
  }

  static worldSetUp(squareClass, y, x) {
    if (document.querySelector(".world"))
      document.querySelector(".world").remove();
    let world = document.createElement("div");
    world.classList.add("world");
    document.body.insertAdjacentElement("afterbegin", world);
    let worldWidth = x;
    let worldHeight = y;
    let matrix = [];
    let rowArray = [];
    for (let i = 0; i < worldHeight; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      rowArray[i] = row;
      world.appendChild(row);
      matrix[i] = [];
      for (let j = 0; j < worldWidth; j++) {
        let square = document.createElement("div");
        square.classList.add(`${squareClass}`, "square_sky");
        row.appendChild(square);
        matrix[i][j] = square;
      }
    }
    return { world, matrix, rowArray };
  }
}

// setting up the landing page:
let matrixTriple = MineCraft.worldSetUp("landing_Page_square", 5, 10);
let world = matrixTriple.world;
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
  window.game = new MineCraft();
});

const tutorial = document.createElement("button");
tutorial.classList.add("start");
tutorial.innerHTML = `Tutorial`;
innerHtml = `
<div class = "tutorial_div">
<div>this is THE BEST minecraft game you'll see.</div>
<div>you have 3 tools to use:</div>
<div><img class = "landing_page_img" src = ".//img//shovel.jpg" alt = "shovel"><span>will harvest</span><img class = "landing_page_img" src = "./img//higher_res_img//grass.png"><span>and </span><img class = "landing_page_img" src = ".//img//higher_res_img//soil.jpg"></div>
<div><img class = "landing_page_img" src = ".//img//axe.jpg" alt = "axe"><span>will harvest</span><img class = "landing_page_img" src = ".//img//higher_res_img//leaf.png"><span>and </span><img class = "landing_page_img" src = ".//img//higher_res_img//trunk.jpg"></div>
<div><img class = "landing_page_img" src = ".//img//pickaxe.jpg" alt = "pickaxe"><span>will harvest</span><img class = "landing_page_img" src = ".//img//higher_res_img//rock.png"></div>
</div>
`;
logoStartDiv.insertAdjacentHTML("beforeend", innerHtml);

tutorial.addEventListener("click", (event) => {
  let tutorialDiv = document.querySelector(".tutorial_div");
  tutorialDiv.style.opacity = "1";
  tutorialDiv.style.zIndex = "20";

  tutorialDiv.addEventListener("click", (event) => {
    let tutorial = event.target;
    tutorial.style.opacity = "0";
    tutorial.style.zIndex = "-2";
  });
});
logoStartDiv.insertAdjacentElement("afterbegin", logo);
logoStartDiv.insertAdjacentElement("beforeend", startGame);
logoStartDiv.insertAdjacentElement("beforeend", tutorial);

world.insertAdjacentElement("beforeend", logoStartDiv);

/* 
plan: maybe create class to put everything inside, at least the last things

*/

/* 
set up event listeners:
*/
//need to go over all the array and make sure only the squares on the top are marked!

// get a string of last element class.
function getLastClass(element) {
  const array = element.className.split(" "),
    [last] = array.slice(-1);
  return last;
}

function getIndex(square) {
  let yIndex = this.rowArray.indexOf(square.parentElement);
  let xIndex = this.matrix[yIndex].indexOf(square);
  return [xIndex, yIndex];
}
function getFatherSquare(square) {
  let getIndexBind = getIndex.bind(this);

  return this.matrix[getIndexBind(square)[1] - 1][getIndexBind(square)[0]];
}
function getSonSquare(square) {
  let getIndexBind = getIndex.bind(this);
  return this.matrix[getIndexBind(square)[1] + 1][getIndexBind(square)[0]];
}

//*take into account: if it's not inside allowed_classes property, dont allow it!
function validateLocationRemove(square) {
  let lastClass = getLastClass(square);
  const getFatherSquareBind = getFatherSquare.bind(this);
  let lastClassFather = getLastClass(getFatherSquareBind(square));

  if (
    this.classes_allowed.includes(lastClass) &&
    (lastClass == "square_cloud" ||
      lastClassFather == "square_sky" ||
      lastClassFather == "square_sky")
  ) {
    return true;
  } else {
    return false;
  }
}

function validateLocationInsert(square, classToInsert) {
  let lastClass = getLastClass(square);
  const getSonSquareBind = getSonSquare.bind(this);
  let lastClassSon = getLastClass(getSonSquareBind(square));
  let lastClassRight = getLastClass(square.nextElementSibling);
  let lastClassLeft = getLastClass(square.previousElementSibling);
  if (
    lastClass == "square_sky" &&
    ((classToInsert == "square_plants" &&
      (lastClassRight == "square_plants" ||
        lastClassLeft == "square_plants")) ||
      classToInsert == "square_cloud" ||
      (classToInsert != "square_cloud" && lastClassSon != "square_sky"))
  ) {
    return true;
  } else {
    return false;
  }
}

//addFromInventory: poping a square from inventory and back to select location on the board.
//*right now, I need to add a memory  in the game for one square!
//this is an event litener for the available squares, I'll add once to the listener.
function addFromMemory(event) {
  const classToAdd = this.memory ? this.memory.pop() : null;
  if (
    classToAdd &&
    validateLocationInsert.call(this, event.target, classToAdd)
  ) {
    event.target.classList.add(classToAdd);
    const addToInventoryBind = addToInventory.bind(this);
    event.target.addEventListener("click", addToInventoryBind, {
      once: true,
    });
  } else {
    const addFromMemoryBind = addFromMemory.bind(this);
    event.target.addEventListener("click", addFromMemoryBind, {
      once: true,
    });
  }
}
//*still not ready - need to set up the inventory on the screen.
function moveToMemory(event) {
  //do something.

  this.memory.unshift(event.target.id);
  this.inventory[event.target.id]--;
  event.target.firstElementChild.innerHTML = this.inventory[event.target.id];
  if (this.inventory[event.target.id] == 0) {
    event.target.classList.add("invisible");
  }
}

//adding a square to inventory, while removing the last one from the board.
function addToInventory(event) {
  const lastClass = getLastClass(event.target);
  if (validateLocationRemove.call(this, event.target)) {
    this.inventory[lastClass] = (this.inventory[lastClass] || 0) + 1;
    event.target.classList.remove(lastClass);
    const addFromMemoryBind = addFromMemory.bind(this);
    event.target.addEventListener("click", addFromMemoryBind, {
      once: true,
    });
    const currentInventoryItem = document.querySelector(`#${lastClass}`);
    currentInventoryItem.firstElementChild.innerHTML = this.inventory[
      lastClass
    ];

    //nothing happens if invisible doesn't exist there!
    if (currentInventoryItem.classList.contains("invisible")) {
      currentInventoryItem.classList.remove("invisible");
    }
  } else {
    const addToInventoryBind = addToInventory.bind(this);
    event.target.addEventListener("click", addToInventoryBind, {
      once: true,
    });
  }
}
//*plan: add this.classes_allowed to MineCraft.
//*make sure it's applied in the square click listeners.
function radioHandler(event) {
  let currentButton;
  for (let button of document.querySelectorAll('input[name = "tool"]')) {
    if (button.checked) {
      currentButton = button;
      break;
    }
  }
  if (currentButton.parentElement.className == "shovel") {
    this.classes_allowed = [
      "square_dirt",
      "square_bellow_surface",
      "square_cloud",
    ];
  } else if (currentButton.parentElement.className == "axe") {
    this.classes_allowed = ["square_log", "square_plants"];
  } else if (currentButton.parentElement.className == "pickaxe") {
    this.classes_allowed = ["square_rock"];
  }
}

/* 
* things left to do: 
- insert a tree plant - let it be also if sibling square has another plant - so I'll be able to rebuild the tree.
- on a second thought - I'll just show a memory queue somewhere?I"l think about it.

- instead of memory crap, just remove memory and make all the inventory stuf radio buttons - so no need for invisible queue like I have for memory, plus the user will be able to do this better. 

- after a while in the game, it shows alot of error messages: "the message port was closed before a response was reveived". 
to fix that i"l have to use promises, maybe I"ll take care of that next week.


*/

function resetGame(event) {
  setTimeout(reload, 1500);
}
function reload() {
  location.reload();
}
function exitGame() {
  if (window.confirm("ARE YOU SURE? all progress will be lost!")) {
    window.close();
  }
}
