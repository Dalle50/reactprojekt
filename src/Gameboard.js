import React, { useState, useEffect } from "react";
import "./game.css"; // Import the CSS file

function Gameboard({ server }) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const handleWorldUpdate = (response) => {
      // Update only the movable tiles in the game state
      setGameState(prevState => {
        if (prevState) {
          return {
            ...prevState,
            movables: response.movables
          };
        } else {
          return response;
        }
      });
    };

    server.onEvent("WorldUpdate", handleWorldUpdate);
  }, [server]);

  console.log(gameState);
    // Movement and attack functionality
    useEffect(() => {
        const handleKeyPress = (event) => {
          const { key } = event;
          switch (key) {
            case "w":
              server.invoke("MoveDirection", "up");
              break;
            case "a":
              server.invoke("MoveDirection", "left");
              break;
            case "s":
              server.invoke("MoveDirection", "down");
              break;
            case "d":
              server.invoke("MoveDirection", "right");
              break;
            case " ":
              server.invoke("Attack");
              break;
            default:
              break;
          }
        };
    
        window.addEventListener("keydown", handleKeyPress);
    
        // Clean up event listener when component unmounts
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }, [server]);
  const renderTiles = () => {
    if (!gameState || !gameState.ground || !gameState.clutter || !gameState.movables) return null;

// Render existing ground tiles
const groundTiles = gameState.ground.map((tile, index) => (
    <div key={index} className="grid-item ground">
      <img
        src={`./tiles/tile_${tile}.png`}
        alt={`Tile ${tile}`}
        style={{ width: '48px', height: '48px' }} // Set width and height inline
      />
    </div>
  ));
  
  // Render clutter tiles
  const clutterTiles = gameState.clutter.map((clutter) => (
    <div
      key={clutter.id}
      className={`grid-item clutter ${clutter.flipped ? "flip" : ""}`}
      style={{ left: clutter.xpos * 48, top: clutter.ypos * 48 }}
    >
      <img
        src={`./tiles/tile_${clutter.tile}.png`}
        alt={`Clutter ${clutter.tile}`}
        style={{ width: '48px', height: '48px' }} // Set width and height inline
      />
    </div>
  ));
  
  // Render movable tiles
  const movableTiles = gameState.movables.map((movable) => (
    <div
      key={movable.id}
      className={`grid-item movable ${movable.flipped ? "flip" : ""}`}
      style={{ left: movable.xpos * 48, top: movable.ypos * 48 }}
    >
      <img
        src={`./tiles/tile_${movable.tile}.png`}
        alt={`Movable ${movable.tile}`}
        style={{ width: '48px', height: '48px' }} // Set width and height inline
      />
    </div>
  ));
  
  

    return [...groundTiles, ...clutterTiles, ...movableTiles];
  };
  // Get the current script file's URL
const currentScriptUrl = import.meta.url;

// Extract the directory path from the URL
const currentScriptPath = new URL(currentScriptUrl).pathname;

console.log(currentScriptPath);


  return (
    <div className="grid-container">
      {renderTiles()}
    </div>
  );
}

export default Gameboard;
