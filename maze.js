// Define the Maze object
function Maze(mazeData) {
  // Store the maze data
  this.data = mazeData;
  // Define the start and end positions
  this.start = { x: 0, y: 0 };
  this.end = { x: 0, y: 0 };
  // Find the start and end positions
  for (var y = 0; y < this.data.length; y++) {
    for (var x = 0; x < this.data[y].length; x++) {
      if (this.data[y][x] === "S") {
        this.start = { x: x, y: y };
      }
      if (this.data[y][x] === "E") {
        this.end = { x: x, y: y };
      }
    }
  }
  // Define the player's position
  this.player = { x: this.start.x, y: this.start.y };
  // Define the game state
  this.gameOver = false;
}

// Move the player in the specified direction
Maze.prototype.move = function (direction) {
  // If the game is over, don't do anything
  if (this.gameOver) {
    return;
  }
  // Calculate the new position based on the direction
  var newX = this.player.x;
  var newY = this.player.y;
  if (direction === "left") {
    newX--;
  }
  if (direction === "right") {
    newX++;
  }
  if (direction === "up") {
    newY--;
  }
  if (direction === "down") {
    newY++;
  }
  // Check if the new position is within the maze bounds
  if (
    newX < 0 ||
    newY < 0 ||
    newX >= this.data[0].length ||
    newY >= this.data.length
  ) {
    return;
  }
  // Check if the new position is a wall
  if (this.data[newY][newX] === "W") {
    return;
  }
  // Update the player's position
  this.player.x = newX;
  this.player.y = newY;
  // Check if the player has reached the end of the maze
  if (this.player.x === this.end.x && this.player.y === this.end.y) {
    this.gameOver = true;
  }
};

// Draw the maze on the canvas
Maze.prototype.draw = function (canvas) {
  // Get the canvas context
  var ctx = canvas.getContext("2d");
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Calculate the size of each cell
  var cellSize = Math.min(
    canvas.width / this.data[0].length,
    canvas.height / this.data.length
  );
  // Draw the maze walls
  ctx.fillStyle = "#000000";
  for (var y = 0; y < this.data.length; y++) {
    for (var x = 0; x < this.data[y].length; x++) {
      if (this.data[y][x] === "W") {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
  // Draw the start and end positions
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(
    this.start.x * cellSize,
    this.start.y * cellSize,
    cellSize,
    cellSize
  );
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(
    this.end.x * cellSize,
    this.end.y * cellSize,
    cellSize,
    cellSize
  );
  // Draw the player
  ctx.fillStyle = "#0000ff";
  ctx.beginPath();
  ctx.arc(
    (this.player.x + 0.5) * cellSize,
    (this.player.y + 0.5) * cellSize,
    cellSize / 3,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

// Define the App object
function App() {
  // Create the maze object
  this.maze = new Maze(mazeData);
  // Get the canvas element
  this.canvas = document.getElementById("game-canvas");
  // Set the canvas size
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  // Attach the keydown event listener
  document.addEventListener("keydown", this.onKeyDown.bind(this));
  // Draw the initial maze
  this.maze.draw(this.canvas);
}

// Handle the keydown event
App.prototype.onKeyDown = function (event) {
  // Move the player in the specified direction
  if (event.keyCode === 37) {
    this.maze.move("left");
  }
  if (event.keyCode === 38) {
    this.maze.move("up");
  }
  if (event.keyCode === 39) {
    this.maze.move("right");
  }
  if (event.keyCode === 40) {
    this.maze.move("down");
  }
  // Redraw the maze
  this.maze.draw(this.canvas);
};

// Initialize the app
var app = new App();
