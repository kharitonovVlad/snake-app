import { IBoard } from '../../interfaces/board.interface';

export function getBoardView(this: IBoard): string {
  let view: string = '<div class="board">';
  let index: number = 0;
  for (let i = 0; i < this.cells.length / this.size; i++) {
    view += `<div class="board-row">`;
    for (let j = 0; j < this.cells.length / this.size; j++) {
      view += `<div class="board-item">${
        this.cells[index].isEat ? `<div class="eat"></div>` : ``
      }${
        this.cells[index].isSnakeHead ? `<div class="snake-head"></div>` : ``
      }</div>`;
      index++;
    }
    view += `</div>`;
  }
  view += '</div>';

  return view;
}
