import { getRandomEnumValue } from "./utils";
import { sample, sortBy } from "lodash";
import { Field, FieldType } from "./Field";
import { Position } from "../components/types";
import { CardType, PlayerId, PlayerPlacesCardTurn } from "./Game";
import { Card } from "./Card";

const NUMBER_OF_COLUMNS = 16;
const NUMBER_OF_ROWS = 16;

export class GameBoard {
  private readonly fields: Field[] = [];

  constructor() {
    this.initializeFields();
  }

  private initializeFields() {
    for (let column = 0; column < NUMBER_OF_COLUMNS; column++) {
      for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        this.fields.push(new Field(row, column, getRandomEnumValue(FieldType)));
      }
    }
  }

  public getFields() {
    return sortBy(this.fields, ["row", "column"]);
  }

  public placeCard(cardType: CardType, position: Position, player: PlayerId) {
    this.fields
      .find(
        (field) =>
          field.column === position.column && field.row === position.row
      )
      ?.placeCard(Card.of(cardType, player));
  }

  public getRandomAlly(player: PlayerId): Card | undefined {
    const allies = this.fields.filter((field) => field.card?.owner === player);
    return sample(allies)?.card;
  }
}
