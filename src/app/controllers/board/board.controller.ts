import { IBoard } from '../../interfaces/board.interface';
import { BoardSizeEnum } from '../../enums/board-size.enum';
import { getBoardView } from '../../views/board/board.view';
import { IRenderer } from '../../interfaces/renderer.interface';
import { EatsCountEnum } from '../../enums/eats-count.enum';
import { IBoardCell } from '../../interfaces/board-cell.interface';
import { getRandomInt } from '../../utils/get-random-int.util';
import { ISnake } from '../../interfaces/snake.interface';
import { Snake } from '../snake/snake.controller';

export class Board implements IBoard, IRenderer {
  public cells: IBoardCell[] = [];

  public get size(): BoardSizeEnum {
    return this._size;
  }

  private snake: ISnake;

  constructor(private readonly _size: BoardSizeEnum) {
    this.createBoardCells();
    this.snake = new Snake(this);
  }

  public render(elementToDraw: Element): void {
    elementToDraw.insertAdjacentHTML('beforeend', getBoardView.call(this));
  }

  public generateEats(count: EatsCountEnum): void {
    while (count) {
      const indexToGenerateEat = getRandomInt(0, this.cells.length);

      if (!this.cells[indexToGenerateEat].isEat) {
        this.cells[indexToGenerateEat].isEat = true;
        count--;
      }
    }
  }

  private createBoardCells(): void {
    for (let i = 0; i < this._size * this._size; i++) {
      this.cells.push(this.getDefaultCell());
    }
  }

  private getDefaultCell(): IBoardCell {
    return {
      isEat: false,
      isSnake: false,
      isSnakeHead: false,
      isAvailable: true,
    };
  }
}
