import { IBoard } from '../../interfaces/board.interface';
import { ISnake } from '../../interfaces/snake.interface';
import { PositionLocationHelper } from '../../utils/position-location-helper.util';

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
    const unavailableIndexes: number[] = [];

    const headPositionLocationAssumptions =
      this.getHeadPositionLocationAssumptions();
    this.board.cells = this.board.cells.map((cell) => {
      // TODO: Добавить логику подсчета индексов не доступных ячеек

      return cell;
    });
  }

  private getHeadPositionLocationAssumptions(): {
    isOnTopLine: boolean;
    isOnRightLine: boolean;
    isOnBottomLine: boolean;
    isOnLeftLine: boolean;
  } {
    return {
      isOnTopLine: PositionLocationHelper.isOnTopLine(
        this.headPositionIndex,
        this.board.size,
      ),
      isOnRightLine: PositionLocationHelper.isOnRightLine(
        this.headPositionIndex,
        this.board.size,
      ),
      isOnBottomLine: PositionLocationHelper.isOnBottomLine(
        this.headPositionIndex,
        this.board.size,
      ),
      isOnLeftLine: PositionLocationHelper.isOnLeftLine(
        this.headPositionIndex,
        this.board.size,
      ),
    };
  }
}
