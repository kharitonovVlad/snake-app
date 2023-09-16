import '../styles/style.scss';
import '../styles/board.scss';
import './controllers/board/board.controller';

import { Board } from './controllers/board/board.controller';
import { BoardSizeEnum } from './enums/board-size.enum';

const app = document.querySelector('#app');

if (app && app instanceof HTMLDivElement) {
  const board = new Board(BoardSizeEnum.Small);
  board.render(app);
}
