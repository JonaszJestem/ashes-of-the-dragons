import { Card } from "./Card";

export enum FieldType {
  GOLD = "GOLD",
  LIFE_FOUNTAIN = "LIFE_FOUNTAIN",
  STEEL = "STEEL",
  FIELDS = "FIELDS",
  OIL = "OIL",
}

export class Field {
  public card?: Card;

  constructor(
    public readonly row: number,
    public readonly column: number,
    public readonly fieldType: FieldType
  ) {}

  public getImage() {
    return fieldTypeToImg[this.fieldType];
  }

  public placeCard(card: Card) {
    this.card = card;
  }
}

export const fieldTypeToImg: Record<FieldType, string> = {
  [FieldType.GOLD]: "/gold.png",
  [FieldType.STEEL]: "/iron.png",
  [FieldType.OIL]: "/oil.png",
  [FieldType.FIELDS]: "/wheat.png",
  [FieldType.LIFE_FOUNTAIN]: "/potion.png",
};
