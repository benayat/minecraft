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
    const triplet = MineCraft.createBaseScreen("pc");
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
    debugger;
    this.makeRightDiv();
    this.inventory = {};
    this.classes_allowed = [];
    //I know it's not recommended, but that's still the best choise here...
    this.memory = undefined;
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
    rightDiv.style.paddingTop = "5vh";
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

    let shovelButton = rightDiv.querySelector(".shovel").firstChild;
    let pickaxeButton = rightDiv.querySelector(".pickaxe").firstChild;
    let axeButton = rightDiv.querySelector(".axe").firstChild;

    shovelButton.addEventListener("change", () => radioHandler.bind(this));
    pickaxeButton.addEventListener("change", () => radioHandler.bind(this));
    axeButton.addEventListener("change", () => radioHandler.bind(this));

    /*
     * I used bind for the event listeners, because otherwise I wouldn't be able to reference to the mineCraft object in any way - not by the global object because the constructor hasn't finished yet, and not by the "this" keyword because it will point to the window if we go deeper in the scope.
     */

    let squareResources = this.world.querySelectorAll(
      ".square_bellow_surface,.square_cloud,.square_plants,.square_log,.square_rock"
    );
    squareResources.forEach((x) =>
      x.addEventListener("click", () => addToInventory.bind(this), {
        once: true,
      })
    );
    debugger;
    //* important thing I learned: querySelecyorAll uses css selector, and so you can use [attribute^=value]	or [attribute$=value] for atributes which the value ends with the specified value.
    let squaresAvailable = this.world.querySelectorAll(
      'div[class$="square square_sky"]'
    );
    squaresAvailable.forEach((x) =>
      x.addEventListener("click", () => addFromMemory.bind(this), {
        once: true,
      })
    );
    let inventory_squares = rightDiv.querySelectorAll(".inventory");
    inventory_squares.forEach((x) =>
      x.addEventListener("click", () => moveToMemory.bind(this))
    );

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
    matrix[index].forEach((x) => x.classList.add("ground_square"));
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
    switch (screenType) {
      case "pc": {
        let matrixTriple = MineCraft.worldSetUp("square", 25, 50);
        world = matrixTriple.world;
        matrix = matrixTriple.matrix;
        rowArray = matrixTriple.rowArray;
        MineCraft.baseSoil(matrix, rowArray);
        MineCraft.basegrass(matrix, rowArray);
        MineCraft.BaseSky(matrix, rowArray);
        break;
      }
      case "smartphone": {
      }
      default:
        break;
    }
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
  // createRandomWorld();
  // createRightToolsDiv();
});

logoStartDiv.insertAdjacentElement("afterbegin", logo);
logoStartDiv.insertAdjacentElement("beforeend", startGame);
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
    [last] = data.slice(-1);
  return last;
}

function getIndex(square) {
  let yIndex = this.rowArray.indexOf(square.parentElement);
  let xIndex = this.board[yIndex].indexOf(square);
  return [xIndex, yIndex];
}
function getFatherSquare(square) {
  return this.board[getIndex(square)[0]][getIndex(square)[1] + 1];
}
function getSonSquare(square) {
  return this.board[getIndex(square)[0]][getIndex(square)[1] - 1];
}
function validateLocationRemove(square) {
  let lastClass = getLastClass(square);
  let lastClassFather = getLastClass(getFatherSquare(square));
  if (
    lastClass == "square_cloud" ||
    lastClassFather == "square_sky" ||
    lastClassFather == "square_sky"
  ) {
    return true;
  } else {
    return false;
  }
}
function validateLocationInsert(square, classToInsert) {
  let lastClass = getLastClass(square);
  let lastClassSon = getLastClass(getSonSquare(square));
  if (
    (classToInsert == "square_cloud" && lastClass == "square_sky") ||
    (classToInsert != "square_cloud" &&
      lastClassSon != "square_cloud" &&
      lastClassSon != "square_sky")
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
  const classToAdd = this.memory.pop();
  if (validateLocationInsert(event.target, classToAdd)) {
    event.target.classList.add(classToAdd);
    event.target.addEventListener("click", () => addToInventory.bind(this), {
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
  debugger;
  let lastClass = getLastClass(event.target);
  if (validateLocationRemove(event.target)) {
    this.inventory[lastClass] = (this.inventory[lastClass] || 0) + 1;
    event.target.classList.remove(lastClass);
    event.target.addEventListener("click", () => addFromMemory.bind(this), {
      once: true,
    });
    document.querySelector(
      `#${lastClass}`
    ).firstElementChild.innerHTML = this.inventory[lastClass];
  }
}
//*plan: add this.classes_allowed to MineCraft.
//*make sure it's applied in the square click listeners.
function radioHandler(event) {
  let currentButton;
  for (let button of rightDiv.querySelectorAll('input[name = "tool"]')) {
    if (button.checked) {
      currentButton = button;
      break;
    }
  }
  if (currentButton.className == "shovel") {
    this.classes_allowed = ["square_class", "square_grass"];
  } else if (currentButton.className == "axe") {
    this.classes_allowed = ["square_trunk", "square_plants"];
  } else if (currentButton.className == "pickaxe") {
    this.classes_allowed = ["square_rock"];
  }
}
