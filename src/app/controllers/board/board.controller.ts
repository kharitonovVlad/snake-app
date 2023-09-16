import { IBoard } from '../../models/board.interface';
import { BoardSizeEnum } from '../../enums/board-size.enum';
import { getBoardView } from '../../views/board/board.view';

export class Board implements IBoard {
  get size(): BoardSizeEnum {
    return this._size;
  }

  constructor(private readonly _size: BoardSizeEnum) {}

  public render(elementToDraw: Element): void {
    elementToDraw.insertAdjacentHTML('beforeend', getBoardView.call(this));
  }
}
