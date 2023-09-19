import '../styles/style.scss';
import '../styles/board.scss';
import './controllers/board/board.controller';

import { Board } from './controllers/board/board.controller';
import { BoardSizeEnum } from './enums/board-size.enum';
import { EatsCountEnum } from './enums/eats-count.enum';

const app = document.querySelector('#app');

if (app && app instanceof HTMLDivElement) {
  const board = new Board(BoardSizeEnum.Small);
  board.generateEats(EatsCountEnum.Three);
  setInterval(() => {
    board.render(app);
  }, 100);
}
