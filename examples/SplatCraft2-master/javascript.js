// First, we make a bunch of variables
var c = document.getElementById('canvas').getContext('2d');
var world = [""];
var py = 58;
var px = 0;
var sizeX = 500;
var sizeY = 150;
var mouseX;
var mouseY;
var blockX;
var blockY;
var hoverBlock;
var currentBlock = 3;
var mouseWentOnCanvas = false;
var down = false;

// Main game loop
window.onload = function() {
	generateWorld();
	setInterval(function() {
		drawWorld();

		// Some info
		c.fillStyle = "white";
		c.fillText("SplatCraft V0.1",5,10);
		c.fillText("Mouse X: " + blockX + " Mouse Y: " + blockY,5,20);
		c.fillText("Mouse is over " + hoverBlock,5,30);

		// mouse cursor
		c.fillStyle = "black";		
		c.strokeRect(Math.round(mouseX / 50) * 50,Math.round(mouseY / 50) * 50,50,50);

		// Get the block the cursor is over
		if (mouseWentOnCanvas) {
			// Use super complicated algorithm
			blockX = ((Math.round(mouseX / 50) * 50) / 50) + px;
			blockY = Math.abs(((Math.round(mouseY / 50) * 50) / 50) - 11) + py;
			var split = world[blockX].split("");
			hoverBlock = getBlockName(split[blockY]);
		}
	},10);
}

// Get the keypresses
document.onkeydown = function(e) {
		if (e.keyCode == 38) {
			py++
			drawWorld();
		} else if (e.keyCode == 40) {
			py--
			drawWorld();
		} else if (e.keyCode == 39) {
			px++
			drawWorld();
		} else if (e.keyCode == 37) {
			px--
			drawWorld();
		}
	}


// Function to generate the world
function generateWorld() {
	var stone = Math.floor(Math.random() * 40) + 30;
	var dirt = Math.floor(Math.random() * 10) + 7;
	for (var i = 0; i < sizeX; i++) {
		world.push(" ");

		// Stone
		for (var l = 0; l < stone; l++) {
			var coal = Math.floor(Math.random() * 20) + 1;
			if (coal == 1) {
				world[i] += "6";
			} else {
				world[i] += "3";
			}
		}

		// Dirt
		for (var l = 0; l < dirt; l++) {
			world[i] += "2";
		}

		// Grass
		world[i] += "1";

		// Trees
		var tree = Math.floor(Math.random() * 10) + 1;
		if (tree == 1 && !i == 0) {
			if (!world[i - 1].includes("t")) {
				world[i] += "t";
			}
		}

		// Air
		var a = world[i].length;
		for (var l = 0; l < sizeY - a; l++) {
			world[i] += "0";
		}

		// World smoothing
		var which = Math.floor(Math.random() * 2) + 1;
		var num = Math.floor(Math.random() * 2) + 1;
		if (num == 1) {
			num = -1;
		} else {
			num = 1;
		}
		if (which == 2) {
			// Stone
			stone += num;
		} else {
			// Dirt
			if (!dirt == 1) {
				dirt += num;
			}
		}
	}

	// Add the trees
	for (var i = 0; i < sizeX; i++) {
		for (var i1 = 0; i1 < sizeY; i1++) {
			var chunk = world[i].split("");
			if (chunk[i1] == "t") {
				chunk[i1] = "4";
				chunk[i1 + 1] = "4";
				chunk[i1 + 2] = "5";
				chunk[i1 + 3] = "5";
				world[i] = chunk.join("");
				var left = world[i - 1].split("");
				left[i1 + 2] = "5";
				world[i - 1] = left.join("");
				var right = world[i + 1].split("");
				right[i1 + 2] = "5";
				world[i + 1] = right.join("");
			}
		}

	}
}

// Function to draw the world on a canvas
function drawWorld() {
	c.clearRect(0,0,600,600);
	var y = 550;
	var x = 0;
	for (var i = px; i < 12 + px; i++) {
		var split = world[i].split("");
		for (var i1 = py; i1 < 12 + py; i1++) {
			if (split[i1] == "3") {
				c.drawImage(stone,x,y,50,50);
			} else if (split[i1] == "2") {
				c.drawImage(dirt,x,y,50,50);
			} else if (split[i1] == "1") {
				c.drawImage(grass,x,y,50,50);
			} else if (split[i1] == "0") {
				//c.drawImage(air,x,y,50,50);
			} else if (split[i1] == "4") {
				c.drawImage(wood,x,y,50,50);
			} else if (split[i1] == "5") {
				c.drawImage(leaves,x,y,50,50);
			} else if (split[i1] == "6") {
				c.drawImage(coal,x,y,50,50);
			}
			y -= 50;
		}
		y = 550;
		x += 50;
	}
}

// Function to get mouse x and y
function getMouse (event) {
	mouseWentOnCanvas = true;
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function breakBlock() {
		var split = world[blockX].split("");
		if (split[blockY] == "0") {
			split[blockY] = currentBlock;
		} else {
			split[blockY] = "0";
		}
		var splitJoin = split.join("");
		world[blockX] = splitJoin;
}

function getBlockName(id) {
	if (id == 0) {
		return "air"
	} else if (id == 1) {
		return "grass"
	} if (id == 2) {
		return "dirt"
	} if (id == 3) {
		return "stone"
	} if (id == 4) {
		return "wood"
	} if (id == 5) {
		return "leaves"
	} if (id == 6) {
		return "coal"
	} 
}