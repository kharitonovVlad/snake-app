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

  constructor(private board: IBoard) {
    this.iniAndSetOnBoard();
    this.setNotAvaliableCells();
  }

  private iniAndSetOnBoard(): void {
    this.headPositionIndex = this.getInitialPosition();
    this.board.cells[this.headPositionIndex].isSnakeHead = true;
  }

  private getInitialPosition(): number {
    return (
      (this.board.cells.length / this.board.size / 2) * this.board.size +
      this.board.cells.length / this.board.size / 2 -
      1
    );
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
