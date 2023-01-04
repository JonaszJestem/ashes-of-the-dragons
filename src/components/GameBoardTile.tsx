import React, { FC } from "react";
import { GameBoard } from "../logic/GameBoard";
import FieldTile from "./FieldTile";
import { Position } from "./types";

const GameBoardTile: FC<{
  gameBoard: GameBoard;
  selectable: boolean;
  selectedField: Position | null;
  onFieldSelect: (position: Position) => void;
}> = ({ gameBoard, selectable, selectedField, onFieldSelect }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "(gutter) 1fr repeat(16, (col) 4.25fr (gutter) 1fr )",
        gridTemplateRows: "(gutter) 1fr repeat(16, (col) 4.25fr (gutter) 1fr )",
      }}
    >
      {gameBoard.getFields().map((field) => (
        <FieldTile
          selected={
            selectedField?.row === field.row &&
            selectedField?.column === field.column
          }
          onClick={() =>
            onFieldSelect({ row: field.row, column: field.column })
          }
          key={`${field.row}-${field.column}`}
          field={field}
          selectable={selectable}
        />
      ))}
    </div>
  );
};

export default GameBoardTile;
