// Define the Maze object
function Maze(mazeData) {
    // Store the maze data
    this.data = mazeData;
    // Define the start and end positions
    this.start = {x: 0, y: 0};
    this.end = {x: 0, y: 0};
    // Find the start and end positions
    for (var y = 0; y < this.data.length; y++) {
      for (var x = 0; x < this.data[y].length; x++) {
        if (this.data[y][x] === "S") {
          this.start = {x: x, y: y};
        }
        if (this.data[y][x] === "E") {
          this.end = {x: x, y: y};
        }
      }
    }
    // Define the player's position
    this.player = {x: this.start.x, y: this.start.y};
    // Define the game state
    this.gameOver = false;
  }
  
  // Move the player in the specified direction
  Maze.prototype.move = function(direction) {
    // If the game is over, don't allow any more moves
    if (this.gameOver) {
      return;
    }
    // Calculate the new position
    var newPosition = {x: this.player.x, y: this.player.y};
    if (direction === "left") {
      newPosition.x--;
    }
    if (direction === "right") {
      newPosition.x++;
    }
    if (direction === "up") {
      newPosition.y--;
    }
    if (direction === "down") {
      newPosition.y++;
    }
    // Check if the new position is within the maze bounds
    if (newPosition.x < 0 || newPosition.x >= this.data[0].length ||
        newPosition.y < 0 || newPosition.y >= this.data.length) {
      return;
    }
    // Check if the new position is a wall
    if (this.data[newPosition.y][newPosition.x] === "W") {
      return;
    }
    // Move the player to the new position
    this.player = newPosition;
    // Check if the player has reached the end of the maze
    if (this.player.x === this.end.x && this.player.y === this.end.y) {
      this.gameOver = true;
    }
  };
  
  // Check if the game is over
  Maze.prototype.isGameOver = function() {
    return this.gameOver;
  };
  
  // Render the maze to the specified canvas context
  Maze.prototype.render = function(context, cellSize) {
    // Clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // Loop through each cell in the maze data
    for (var y = 0; y < this.data.length; y++) {
      for (var x = 0; x < this.data[y].length; x++) {
        // Determine the color to use for the cell
        var color;
        switch (this.data[y][x]) {
          case "W":
            color = "#000000";
            break;
          case "S":
            color = "#00ff00";
            break;
          case "E":
            color = "#ff0000";
            break;
          default:
            color = "#ffffff";
            break;
        }
        // Draw the cell
        context.fillStyle = color;
        context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
    }
    // Draw the player
    context.fillStyle = "#0000ff";
    context.beginPath();
    context.arc((this.player.x + 0.5) * cellSize, (this.player.y + 0.5) * cellSize, cellSize / 2, 0, 2 * Math.PI);
    context.fill();
    };
  