import { ArrowKeyCodes } from '../../enums/arrow-key-codes.enum';
import { DirectionEnum } from '../../enums/direction.enum';
import { IBoard } from '../../interfaces/board.interface';
import { ISnake } from '../../interfaces/snake.interface';
import { PositionLocationAssumptions } from '../../types/position-location-assumptions.type';
import { UnavailableIndexesPosition } from '../../types/unavailable-indexes-position.type';
import { UnavailableIndexes } from '../../types/unavailable-indexes.type';
import { PositionLocationHelper } from '../../utils/position-location-helper.util';
import { removeItem } from '../../utils/remove-item-from-array-by-value.util';

export class Snake implements ISnake {
  private headPositionIndex: number = 0;
  private tailPositionsIndexes: number[] = [];

  private direction: DirectionEnum;
  private directionQueue: DirectionEnum[] = [];

  constructor(private board: IBoard) {
    this.setOnBoard(this.getInitialPosition());
    this.setNotAvaliableCells();
    this.direction = DirectionEnum.Up;
    this.startMove();
    this.startListenMoveControlls();
  }

  private setOnBoard(position: number): void {
    this.headPositionIndex = position;
    this.board.cells.map((cell, index) => {
      cell.isSnakeHead = false;
      if (position === index && cell.isEat) {
        this.tailPositionsIndexes.push(this.getNextTailPositionIndex());
        cell.isEat = false;
        this.board.generateEats();
      }
    });
    this.board.cells[this.headPositionIndex].isSnakeHead = true;
  }

  private getInitialPosition(): number {
    return (
      (this.board.cells.length / this.board.size / 2) * this.board.size +
      this.board.cells.length / this.board.size / 2 -
      1
    );
  }

  private getNextTailPositionIndex(): number {
    switch (this.direction) {
      case DirectionEnum.Up: {
        return this.headPositionIndex + this.board.size;
      }
      case DirectionEnum.Right: {
        return this.headPositionIndex - 1;
      }
      case DirectionEnum.Down: {
        return this.headPositionIndex - this.board.size;
      }
      case DirectionEnum.Left: {
        return this.headPositionIndex + 1;
      }
    }
  }

  private setNotAvaliableCells(): void {
    const unavailableIndexes = this.unavailableIndexes();
    const positionLocationAssumptions = {
      head: this.getPositionLocationAssumptions(this.headPositionIndex),
    };

    const listOfUnavailableIndexes: number[] = this.getListOfUnavailableIndexes(
      unavailableIndexes,
      positionLocationAssumptions,
    );

    this.board.cells = this.board.cells.map((cell, index) => {
      cell.isAvailable = !listOfUnavailableIndexes.includes(index);
      return cell;
    });
  }

  private startMove(): void {
    setInterval(this.moveNextDirection.bind(this), 500);
  }

  private moveNextDirection(): void {
    const nextQueueDirection = this.directionQueue.length
      ? this.directionQueue.shift()
      : this.direction;

    switch (nextQueueDirection) {
      case DirectionEnum.Up: {
        if (this.direction !== DirectionEnum.Down) {
          this.direction = nextQueueDirection;
          this.moveUp();
        }
        break;
      }
      case DirectionEnum.Right: {
        if (this.direction !== DirectionEnum.Left) {
          this.moveRight();
          this.direction = nextQueueDirection;
        }
        break;
      }
      case DirectionEnum.Down: {
        if (this.direction !== DirectionEnum.Up) {
          this.moveDown();
          this.direction = nextQueueDirection;
        }
        break;
      }
      case DirectionEnum.Left: {
        if (this.direction !== DirectionEnum.Right) {
          this.moveLeft();
          this.direction = nextQueueDirection;
        }
        break;
      }
    }
  }

  private startListenMoveControlls(): void {
    addEventListener('keyup', (event) => {
      if (this.directionQueue.length < 2) {
        switch (event.code) {
          case ArrowKeyCodes.ArrowUp: {
            this.directionQueue.push(DirectionEnum.Up);
            break;
          }
          case ArrowKeyCodes.ArrowRight: {
            this.directionQueue.push(DirectionEnum.Right);
            break;
          }
          case ArrowKeyCodes.ArrowDown: {
            this.directionQueue.push(DirectionEnum.Down);
            break;
          }
          case ArrowKeyCodes.ArrowLeft: {
            this.directionQueue.push(DirectionEnum.Left);
            break;
          }
        }
      }
    });
  }

  private moveUp(): void {
    const canMove = !PositionLocationHelper.isOnTopLine(
      this.headPositionIndex,
      this.board.size,
    );

    if (canMove) {
      this.setOnBoard(this.headPositionIndex - this.board.size);
    }
  }

  private moveRight(): void {
    const canMove = !PositionLocationHelper.isOnRightLine(
      this.headPositionIndex,
      this.board.size,
    );

    if (canMove) {
      this.setOnBoard(this.headPositionIndex + 1);
    }
  }

  private moveDown(): void {
    const canMove = !PositionLocationHelper.isOnBottomLine(
      this.headPositionIndex,
      this.board.size,
    );

    if (canMove) {
      this.setOnBoard(this.headPositionIndex + this.board.size);
    }
  }

  private moveLeft(): void {
    const canMove = !PositionLocationHelper.isOnLeftLine(
      this.headPositionIndex,
      this.board.size,
    );

    if (canMove) {
      this.setOnBoard(this.headPositionIndex - 1);
    }
  }

  private getPositionLocationAssumptions(
    positionIndex: number,
  ): PositionLocationAssumptions {
    return {
      isOnTopLine: PositionLocationHelper.isOnTopLine(
        positionIndex,
        this.board.size,
      ),
      isOnRightLine: PositionLocationHelper.isOnRightLine(
        positionIndex,
        this.board.size,
      ),
      isOnBottomLine: PositionLocationHelper.isOnBottomLine(
        positionIndex,
        this.board.size,
      ),
      isOnLeftLine: PositionLocationHelper.isOnLeftLine(
        positionIndex,
        this.board.size,
      ),
    };
  }

  private unavailableIndexes(): {
    head: UnavailableIndexes;
    tail: UnavailableIndexes[];
  } {
    return {
      head: {
        topLeft: this.headPositionIndex - this.board.size - 1,
        top: this.headPositionIndex - this.board.size,
        topRight: this.headPositionIndex - this.board.size + 1,
        right: this.headPositionIndex + 1,
        bottomRight: this.headPositionIndex + this.board.size + 1,
        bottom: this.headPositionIndex + this.board.size,
        bottomLeft: this.headPositionIndex + this.board.size - 1,
        left: this.headPositionIndex - 1,
      },
      tail: [],
    };
  }

  private getListOfUnavailableIndexes(
    unavailableIndexes: UnavailableIndexesPosition,
    positionLocationAssumptions: { head: PositionLocationAssumptions },
  ): number[] {
    const listOfUnavailableIndexes: number[] = [];

    for (let key in unavailableIndexes.head) {
      // @ts-ignore
      listOfUnavailableIndexes.push(unavailableIndexes.head[key]);
    }
    if (positionLocationAssumptions.head.isOnTopLine) {
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.topLeft);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.top);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.topRight);
    }
    if (positionLocationAssumptions.head.isOnRightLine) {
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.topRight);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.right);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.bottomRight);
    }
    if (positionLocationAssumptions.head.isOnBottomLine) {
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.bottomRight);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.bottom);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.bottomLeft);
    }
    if (positionLocationAssumptions.head.isOnLeftLine) {
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.bottomLeft);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.left);
      removeItem(listOfUnavailableIndexes, unavailableIndexes.head.topLeft);
    }

    return listOfUnavailableIndexes;
  }
}
