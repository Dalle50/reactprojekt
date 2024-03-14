import React, { useState, useEffect } from "react";
import "./game.css"; // Import the CSS file

function Gameboard({ server }) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const handleWorldUpdate = (response) => {
      setGameState((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            ...response
          };
        } else {
          return response;
        }
      });
    };

    server.onEvent("WorldUpdate", handleWorldUpdate);

    // Clean up event listener when component unmounts
    return () => {
      server.offEvent("WorldUpdate", handleWorldUpdate);
    };
  }, [server]);

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
        case "k":
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

  console.log(gameState);

  const renderTiles = () => {
    if (!gameState || !gameState.ground || !gameState.clutter || !gameState.movables) return null;

    const groundTiles = gameState.ground.map((tile, index) => (
      <div key={index} className="grid-item ground">
        <img src={`./tiles/tile_${tile}.png`} alt={`Tile ${tile}`} style={{ width: '48px', height: '48px' }} />
      </div>
    ));

    const clutterTiles = gameState.clutter.map((clutter) => (
      <div
        key={clutter.id}
        className={`grid-item clutter ${clutter.flipped ? "flip" : ""}`}
        style={{ left: clutter.xpos * 48, top: clutter.ypos * 48 }}
      >
        <img src={`./tiles/tile_${clutter.tile}.png`} alt={`Clutter ${clutter.tile}`} style={{ width: '48px', height: '48px' }} />
      </div>
    ));

    const movableTiles = gameState.movables.map((movable) => (
      <div
        key={movable.id}
        className={`grid-item movable ${movable.flipped ? "flip" : ""}`}
        style={{ left: movable.xpos * 48, top: movable.ypos * 48 }}
      >
        <img src={`./tiles/tile_${movable.tile}.png`} alt={`Movable ${movable.tile}`} style={{ width: '48px', height: '48px' }} />
      </div>
    ));
    
    const attackEffect = gameState.effects ? (
        <div
          key={gameState.effects.id}
          className={`grid-item effect ${gameState.effects.flipped ? "flip" : ""}`}
          style={{ left: gameState.effects.xpos * 48, top: gameState.effects.ypos * 48 }}
        >
          <img src={`./tiles/tile_attack.png`} alt={`Attack Effect`} style={{ width: '48px', height: '48px' }} />
        </div>
      ) : null;
      
  
      return [...groundTiles, ...clutterTiles, ...movableTiles, attackEffect];
    };

  return (
    <div className="grid-container">
      {renderTiles()}
    </div>
  );
}

export default Gameboard;
