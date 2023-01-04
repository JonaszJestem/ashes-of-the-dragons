import React, { FC } from "react";
import CardTile from "./CardTile";
import { CardType } from "../logic/Game";

const PlayerHand: FC<{
  cards: CardType[];
  selectedCard: number;
  onCardSelect: (index: number) => void;
}> = ({ cards, selectedCard, onCardSelect }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {cards.map((card, index) => (
        <CardTile
          selected={index === selectedCard}
          key={index}
          onClick={() => onCardSelect(index)}
          type={card}
        />
      ))}
    </div>
  );
};

export default PlayerHand;
