import { GameBoard } from "./GameBoard";
import { config } from "./Config";
import { getRandomEnumValue } from "./utils";
import { Position } from "../components/types";

export enum PlayerId {
  PLAYER_1 = "PLAYER_1",
  PLAYER_2 = "PLAYER_2",
}

export enum TurnType {
  PLACE_CARD = "PLACE_CARD",
  GAME_MOVE = "GAME_MOVE",
}

export enum CardType {
  PEASANT = "PEASANT",
  // KNIGHT = "KNIGHT",
  // SORCERER = "SORCERER",
  // TALKER = "TALKER",
  // MISTYK = "MISTYK",
  // SZEJK = "SZEJK",
  // MISTRZ = "MISTRZ",
  // HANDLARZ = "HANDLARZ",
  // HARLEQUIN = "HARLEQUIN",
  // JOKER = "JOKER",
  // TARAN = "TARAN",
  // SMOK = "SMOK",
  // KUGLARZ = "KUGLARZ",
  // SAPER = "SAPER",
  // WYKIDAJŁO = "WYKIDAJŁO",
}

export abstract class Turn {
  public abstract TURN_TYPE: TurnType;
}

export class PlayerPlacesCardTurn implements Turn {
  public readonly TURN_TYPE = TurnType.PLACE_CARD;
  public readonly cards = new Array(5)
    .fill(null)
    .map(() => getRandomEnumValue(CardType));

  constructor(public readonly playerId: PlayerId) {}
}

export class GameMakesMove implements Turn {
  TURN_TYPE = TurnType.GAME_MOVE;

  constructor() {}
}

const turnsToExecute = [
  ...new Array(config.game.numberOfPlayerTurns)
    .fill(null)
    .flatMap(() => [
      new PlayerPlacesCardTurn(PlayerId.PLAYER_1),
      new PlayerPlacesCardTurn(PlayerId.PLAYER_2),
    ]),
  ...new Array(config.game.numberOfGameTurns)
    .fill(null)
    .map(() => new GameMakesMove()),
];

export class GameManager {
  private readonly turnsToExecute: Turn[] = turnsToExecute;
  private currentTurn = 0;

  constructor(private readonly gameBoard: GameBoard) {}

  public executeTurn() {
    const fieldsWithCard = this.gameBoard
      .getFields()
      .filter((field) => field.card);
    console.log(fieldsWithCard);
    fieldsWithCard.forEach((field) => {
      field.card?.onAction(this.gameBoard);
    });
  }

  private goToNextTurn() {
    this.currentTurn++;
  }

  public getCurrentTurn() {
    return this.turnsToExecute[this.currentTurn];
  }

  public getTurnNo() {
    return this.currentTurn;
  }

  public placeCard(cardType: CardType, position: Position) {
    const currentTurn = this.getCurrentTurn() as PlayerPlacesCardTurn;

    this.gameBoard.placeCard(cardType, position, currentTurn.playerId);
    this.goToNextTurn();
  }
}

class Peasant {
  //  Doubles all gatherings
  //  Sometimes buffs someone to increase his gatherings
}

class Knight {
  //  Removes opponent card from the board on adjacent field
  //  Once every 10 turns converts random steel -> gold
  //  Moves between gold mines (1 field max)
}

class Sorcerer {
  //  When attacked -> attacker switches sides -> costs wheat
}

class Talker {}
