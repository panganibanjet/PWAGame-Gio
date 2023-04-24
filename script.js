// Load the JSON maze file
fetch('maze.json')
  .then(response => response.json())
  .then(maze => {
    // Get the canvas element and context
    const canvas = document.getElementById('maze');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions based on the maze size
    canvas.width = maze.width * 50;
    canvas.height = maze.height * 50;

    // Draw the walls
    context.fillStyle = 'black';
    maze.walls.forEach(wall => {
      context.fillRect(wall.x * 50, wall.y * 50, 50, 50);
    });

    // Draw the start and end points
    context.fillStyle = 'green';
    context.fillRect(maze.start.x * 50, maze.start.y * 50, 50, 50);
    context.fillStyle = 'red';
    context.fillRect(maze.end.x * 50, maze.end.y * 50, 50, 50);

    // Set the player position to the start point
    let player = maze.start;

    // Handle user input
    document.getElementById('up').addEventListener('click', () => {
      if (player.y > 0 && !maze.walls.some(wall => wall.x === player.x && wall.y === player.y - 1)) {
        player.y -= 1;
        drawPlayer();
      }
    });
    document.getElementById('down').addEventListener('click', () => {
      if (player.y < maze.height - 1 && !maze.walls.some(wall => wall.x === player.x && wall.y === player.y + 1)) {
        player.y += 1;
        drawPlayer();
      }
    });
    document.getElementById('left').addEventListener('click', () => {
      if (player.x > 0 && !maze.walls.some(wall => wall.x === player.x - 1 && wall.y === player.y)) {
        player.x -= 1;
        drawPlayer();
      }
    });
    document.getElementById('right').addEventListener('click', () => {
      if (player.x < maze.width - 1 && !maze.walls.some(wall => wall.x === player.x + 1 && wall.y === player.y)) {
        player.x += 1;
        drawPlayer();
      }
    });

    // Draw the player
    function drawPlayer() {
      context.fillStyle = 'blue';
      context.fillRect(player.x * 50, player.y * 50, 50, 50);

      // Check if the player has reached the end
      if (player.x === maze.end.x && player.y === maze.end.y) {
        alert('Congratulations, you won!');
      }
    }
    drawPlayer();
  });
