import { IBoard } from '../../models/board.interface';

export function getBoardView(this: IBoard): string {
  let view: string = '<div class="board">';
  for (let i = 0; i < this.size; i++) {
    view += `<div class="board-row">`;
    for (let j = 0; j < this.size; j++) {
      view += `<span class="board-item"></span>`;
    }
    view += `</div>`;
  }
  view += '</div>';

  return view;
}
