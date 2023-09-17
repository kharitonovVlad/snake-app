import { BoardSizeEnum } from '../enums/board-size.enum';
import { EatsCountEnum } from '../enums/eats-count.enum';
import { IBoardCell } from './board-cell.interface';

export interface IBoard {
  cells: IBoardCell[];
  get size(): BoardSizeEnum;
  generateEats(count: EatsCountEnum): void;
}
