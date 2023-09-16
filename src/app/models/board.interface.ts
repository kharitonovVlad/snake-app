import { BoardSizeEnum } from "../enums/board-size.enum";

export interface IBoard {
  get size(): BoardSizeEnum;
  render(elementToDraw: Element): void;
}
