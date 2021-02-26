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

    this.makeRightDiv();
    this.tempResoureHistogram = {};
  }

  makeRightDiv() {
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right_div");
    document.body.insertAdjacentElement("afterbegin", rightDiv);
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
        debugger;
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
        square.classList.add(`${squareClass}`);
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
  new MineCraft();
  // createRandomWorld();
  // createRightToolsDiv();
});

logoStartDiv.insertAdjacentElement("afterbegin", logo);
logoStartDiv.insertAdjacentElement("beforeend", startGame);
world.insertAdjacentElement("beforeend", logoStartDiv);

/* 
plan: maybe create class to put everything inside, at least the last things

*/

//setting up world features:
