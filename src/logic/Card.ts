import { CardType, PlayerId } from "./Game";
import { GameBoard } from "./GameBoard";
import { config } from "./Config";

type ActionResult = {
  globalBuffs?: {
    gatheringModifier: number;
  };
};

export abstract class Card {
  public gatheringSpeed = config.game.gatheringSpeed;
  public abstract readonly type: CardType;

  constructor(public readonly owner: PlayerId) {}

  static of(type: CardType, player: PlayerId): Card {
    switch (type) {
      case CardType.PEASANT:
        return new Peasant(player);

      default:
        throw new Error();
    }
  }

  public abstract onPlaced(gameBoard: GameBoard): ActionResult;

  public abstract onRemoved(gameBoard: GameBoard): ActionResult;

  public abstract onAction(gameBoard: GameBoard): ActionResult;
}

class Peasant extends Card {
  public readonly type = CardType.PEASANT;

  constructor(
    public readonly owner: PlayerId,
    private turnsToBuffGathering = config.cards.peasant.turnsToBuff
  ) {
    super(owner);
  }

  onAction(gameBoard: GameBoard): ActionResult {
    this.turnsToBuffGathering--;
    console.log(`Peasant will buff someone in ${this.turnsToBuffGathering}`);
    if (this.turnsToBuffGathering <= 0) {
      const ally = gameBoard.getRandomAlly(this.owner);
      if (ally) {
        console.log(`Peasant buffs ${ally.type}`);
        ally.gatheringSpeed++;
      } else {
        console.log(`No ally to buff found`);
      }

      this.turnsToBuffGathering = config.cards.peasant.turnsToBuff;
    }

    return {};
  }

  onPlaced(gameBoard: GameBoard): ActionResult {
    return {};
  }

  onRemoved(gameBoard: GameBoard): ActionResult {
    return {};
  }
}
