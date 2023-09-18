import { BoardSizeEnum } from '../enums/board-size.enum';
import { getRangeArray } from './get-range-array.utils';

export class PositionLocationHelper {
  public static isOnTopLine(index: number, boardSize: BoardSizeEnum): boolean {
    const lastTopLineIndex: number = boardSize - 1;
    const firstTopLineIndex: number = lastTopLineIndex - (boardSize - 1);
    const rangeOfTopLineIndexes: number[] = getRangeArray(
      firstTopLineIndex,
      lastTopLineIndex,
      1,
    );

    return rangeOfTopLineIndexes.includes(index);
  }

  public static isOnRightLine(
    index: number,
    boardSize: BoardSizeEnum,
  ): boolean {
    const lastRightLineIndex: number = boardSize * boardSize - 1;
    const firstRightLineIndex: number = boardSize - 1;
    const rangeOfRightLineIndexes: number[] = getRangeArray(
      firstRightLineIndex,
      lastRightLineIndex,
      boardSize,
    );

    return rangeOfRightLineIndexes.includes(index);
  }

  public static isOnBottomLine(
    index: number,
    boardSize: BoardSizeEnum,
  ): boolean {
    const lastBottomLineIndex: number = boardSize * boardSize - 1;
    const firstBottomLineIndex: number = lastBottomLineIndex - (boardSize - 1);
    const rangeOfBottomLineIndexes: number[] = getRangeArray(
      firstBottomLineIndex,
      lastBottomLineIndex,
      1,
    );

    return rangeOfBottomLineIndexes.includes(index);
  }

  public static isOnLeftLine(index: number, boardSize: BoardSizeEnum): boolean {
    const lastLeftLineIndex: number =
      boardSize * boardSize - 1 - (boardSize - 1);
    const firstLeftLineIndex: number = 0;
    const rangeOfLeftLineIndexes: number[] = getRangeArray(
      firstLeftLineIndex,
      lastLeftLineIndex,
      boardSize,
    );

    return rangeOfLeftLineIndexes.includes(index);
  }
}
