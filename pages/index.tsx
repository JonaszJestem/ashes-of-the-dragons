import { FC, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Field } from "../src/logic/Field";
import {
  GameManager,
  PlayerPlacesCardTurn,
  Turn,
  TurnType,
} from "../src/logic/Game";
import { GameBoard } from "../src/logic/GameBoard";
import GameBoardTile from "../src/components/GameBoardTile";
import PlayerHand from "../src/components/PlayerHand";
import { Position } from "../src/components/types";
import { Box, Button } from "@mui/material";

const gameBoard = new GameBoard();
const gameManager = new GameManager(gameBoard);

const Home: FC = () => {
  const turn = gameManager.getCurrentTurn();
  const [selectedCard, setSelectedCard] = useState(-1);
  const [selectedGameField, setSelectedGameField] = useState<Position | null>(
    null
  );

  let turnNo = gameManager.getTurnNo();

  return (
    <>
      <div>Current turn: {turnNo}</div>
      <div>Current turn: {gameManager.getCurrentTurn().TURN_TYPE}</div>
      <div style={{ margin: 20, display: "grid", placeItems: "center" }}>
        <GameBoardTile
          gameBoard={gameBoard}
          key={turnNo}
          selectable={selectedCard > -1}
          selectedField={selectedGameField}
          onFieldSelect={(position: Position) => setSelectedGameField(position)}
        />
      </div>
      {selectedCard && selectedGameField && (
        <Box display="flex" justifyContent="center" mb={2}>
          <Button
            variant="contained"
            onClick={() => {
              gameManager.placeCard(
                (turn as PlayerPlacesCardTurn).cards[selectedCard],
                selectedGameField
              );
              setSelectedCard(-1);
              setSelectedGameField(null);
            }}
          >
            Confirm move
          </Button>
        </Box>
      )}
      {turn?.TURN_TYPE === TurnType.PLACE_CARD && (
        <PlayerHand
          selectedCard={selectedCard}
          key={turnNo}
          cards={(turn as PlayerPlacesCardTurn).cards}
          onCardSelect={(index) => setSelectedCard(index)}
        />
      )}
      {turn?.TURN_TYPE === TurnType.GAME_MOVE && (
        <Button
          variant="contained"
          onClick={() => {
            gameManager.executeTurn();
          }}
        >
          Execute turn
        </Button>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
