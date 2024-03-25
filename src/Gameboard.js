import React, { useState, useEffect } from "react";
import "./game.css";

function Gameboard({ server, onLogOut, onConnectionClosed }) {
  const [gameState, setGameState] = useState(null);
  const [attackCooldown, setAttackCooldown] = useState(false);
  const [moveCooldown, setMoveCooldown] = useState(false);
  const [biome, setBiome] = useState("");
  const [xpos, setXpos] = useState(0);
  const [ypos, setYpos] = useState(0);
  const [attackSound] = useState(new Audio("/sounds/attack.mp3"));
  attackSound.volume = 0.1;
  useEffect(() => {
    const handleWorldUpdate = (response) => {
      setGameState((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            ...response,
          };
        } else {
          return response;
        }
      });
      setBiome(response.info.biome);
      setXpos(response.info.xpos);
      setYpos(response.info.ypos);
    };
    
    server.onEvent("WorldUpdate", handleWorldUpdate);
  }, [server]);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      switch (key) {
        case "w":
          if (!moveCooldown) {
            server.invoke("MoveDirection", "up");
            setMoveCooldown(true);
            setTimeout(() => setMoveCooldown(false), 200);
          }
          break;
        case "a":
          if (!moveCooldown) {
            server.invoke("MoveDirection", "left");
            setMoveCooldown(true);
            setTimeout(() => setMoveCooldown(false), 200);
          }
          break;
        case "s":
          if (!moveCooldown) {
            server.invoke("MoveDirection", "down");
            setMoveCooldown(true);
            setTimeout(() => setMoveCooldown(false), 200);
          }
          break;
        case "d":
          if (!moveCooldown) {
            server.invoke("MoveDirection", "right");
            setMoveCooldown(true);
            setTimeout(() => setMoveCooldown(false), 200);
          }
          break;
        case "k":
          if (!attackCooldown) {
            server.invoke("Attack");
            attackSound.play();
            setGameState((prevState) => ({ ...prevState, effects: null })); // Remove effects after attack
            setTimeout(
              () =>
                setGameState((prevState) => ({ ...prevState, effects: null })),
              200
            ); // Remove effects after 1 second (adjust the duration as needed)
            setAttackCooldown(true);
            setTimeout(() => setAttackCooldown(false), 300);
          }
          break;
        default:
          break;
      }
    };

    const handleKeyDown = (event) => {
      if (document.activeElement.classList.contains("grid-container")) {
        handleKeyPress(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [server, attackCooldown, moveCooldown]);

  useEffect(() => {
    const handleSocketClose = () => {
      console.log("WebSocket connection closed");
      onConnectionClosed(); // Call onConnectionClosed function when the socket is closed
    };

    if (server.connection) {
      server.connection.onclose = handleSocketClose;
    }

    return () => {
      if (server.connection) {
        server.connection.onclose = null;
      }
    };
  }, [server, onConnectionClosed]);

  const renderTiles = () => {
    if (!gameState || !gameState.ground || !gameState.clutter || !gameState.movables)
      return null;

    const groundTiles = gameState.ground.map((tile, index) => (
      <div key={index} className="grid-item ground">
        <img
          src={`./tiles/tile_${tile}.png`}
          alt={`Tile ${tile}`}
          style={{ width: "48px", height: "48px", border: "1px solid black"}}
        />
      </div>
    ));

    const clutterTiles = gameState.clutter.map((clutter) => (
      <div
        key={clutter.id}
        className={`grid-item clutter ${clutter.flipped ? "flip" : ""}`}
        style={{ left: clutter.xpos * 48, top: clutter.ypos * 48 }}
      >
        <img
          src={`./tiles/tile_${clutter.tile}.png`}
          alt={`Clutter ${clutter.tile}`}
          style={{ width: "48px", height: "48px" }}
        />
      </div>
    ));

    const movableTiles = gameState.movables.map((movable) => (
      <div key={movable.id} className="movable-container">
        <div
          className={`grid-item movable ${movable.flipped ? "flip" : ""}`}
          style={{ left: movable.xpos * 48, top: movable.ypos * 48 }}
        >
          <div className="movable-info">
            {movable.tile === "p01" ? (
              <span className={`grid-item player-name movable ${movable.flipped ? "flip" : ""}`}>
                {movable.id}
                <div className={`position-info`}>
                  <br></br>
                  <br></br>
                  <p>X: {movable.xpos}</p>
                  <p>Y: {movable.ypos}</p>
                </div>
              </span>
            ) : (
              <span className={`grid-item movable ${movable.flipped ? "flip" : ""}`}>
                {movable.tile}
              </span>
            )}
            <img
              src={`./tiles/tile_${movable.tile}.png`}
              alt={`Movable ${movable.tile}`}
              style={{ width: "48px", height: "48px" }}
            />
          </div>
        </div>
      </div>
    ));

    const attackEffect = gameState.effects ? (
      <div
        key={gameState.effects.id}
        className={`grid-item ${gameState.effects.flipped ? "flip" : ""} effect`}
        style={{ left: gameState.effects[0].xpos * 48, top: gameState.effects[0].ypos * 48 }}
      >
        <img
          className="effect"
          src={`./tiles/tile_attack.png`}
          alt={`Attack Effect`}
          style={{ width: "48px", height: "48px" }}
        />
      </div>
    ) : null;

    return [...groundTiles, ...clutterTiles, ...movableTiles, attackEffect];
  };

  return (
    <div className="game-container">
      <div className="position-info" style={{border: "1px solid black"}} >
        <p>X: {xpos}</p>
        <p>Y: {ypos}</p>
        <p>Biome: {biome}</p>
      </div>
      <div className="grid-container" tabIndex="0">
        {/* Add tabIndex="0" to make it focusable */}
        {renderTiles()}
      </div>
    </div>
  );
}

export default Gameboard;
