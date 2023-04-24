// Define the App object
function App() {
    // Get the canvas and context
    this.canvas = document.getElementById("game-canvas");
    this.context = this.canvas.getContext("2d");
    // Load the maze data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Initialize the Maze object
        this.maze = new Maze(xhr.responseText);
        // Set the canvas size
        this.canvas.width = this.maze.width * this.maze.cellSize;
        this.canvas.height = this.maze.height * this.maze.cellSize;
        // Bind the keydown event handler
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        // Draw the initial maze
        this.maze.draw(this.canvas);
      }
    }.bind(this);
    xhr.open("GET", "maze.txt");
    xhr.send();
  }
  
  // Define the keydown event handler
  App.prototype.handleKeyDown = function(event) {
    // Move the player based on the arrow key pressed
    if (event.keyCode === 37) {
      this.maze.move("left");
    } else if (event.keyCode === 38) {
      this.maze.move("up");
    } else if (event.keyCode === 39) {
      this.maze.move("right");
    } else if (event.keyCode === 40) {
      this.maze.move("down");
    }
    // Redraw the maze
    this.maze.draw(this.canvas);
  };
  
  // Initialize the app
  var app = new App();
  