import React, { useState, useEffect } from "react";
import "./game.css"; // Import the CSS file

function Gameboard({  server}) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const handleWorldUpdate = (response) => {
      setGameState(response);
    };

    server.onEvent("WorldUpdate", handleWorldUpdate);

    // Clean up event listener when component unmounts
  }, [server]);

  const renderTiles = () => {
    if (!gameState || !gameState.ground) return null;
  
    return gameState.ground.map((tile, index) => (
      <div key={index} className="grid-item ground">
        <img src={`./tiles/tile_${tile}.png`} alt={`Tile ${tile}`} />
      </div>
    ));
  };
  console.log(gameState)
  const renderClutter = () => {
    if (!gameState || !gameState.clutter) return null;
  
    return gameState.clutter.map((clutter) => (
      <div
        key={clutter.id}
        className={`clutter ${clutter.flipped ? "flip" : ""}`}
        style={{ left: clutter.xpos * 48, top: clutter.ypos * 48 }}
      >
        <img src={`./tiles/tile_${clutter.tile}.png`} alt={`Clutter ${clutter.tile}`} />
      </div>
    ));
  };
  
  const renderMovables = () => {
    if (!gameState || !gameState.movables) return null;
  
    return gameState.movables.map((movable) => (
      <div
        key={movable.id}
        className={`movable ${movable.flipped ? "flip" : ""}`}
        style={{ left: movable.xpos * 48, top: movable.ypos * 48 }}
      >
        <img src={`./tiles/${movable.tile}.png`} alt={`Movable ${movable.tile}`} />
      </div>
    ));
  };
  

  return (
    <div className="grid-container gameboard">
      {renderTiles()}
      {renderClutter()}
      {renderMovables()}
    </div>
  );
}

export default Gameboard;
