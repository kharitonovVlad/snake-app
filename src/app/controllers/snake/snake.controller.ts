import { IBoard } from '../../interfaces/board.interface';
import { ISnake } from '../../interfaces/snake.interface';

export class Snake implements ISnake {
  private headPositionIndex: number = 0;
  private tailPositionsIndexes: number[] = [];

  constructor(private board: IBoard) {
    this.iniAndSetOnBoard();
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
}
