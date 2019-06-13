export enum Direction {
    None = 'none',
    Up = 'up',
    Left = 'left',
    Down = 'down',
    Right = 'right'
}

export function revertDirection(direction: Direction): Direction {
  switch (direction) {
  case Direction.Down:
    return Direction.Up;
  case Direction.Up:
    return Direction.Down;
  case Direction.Left:
    return Direction.Right;
  case Direction.Right:
    return Direction.Left;
  default:
    return Direction.None;
  }  
}

export function rotateDirection(direction: Direction, clockwise: boolean): Direction {
  switch (direction) {
  case Direction.Down:
    return clockwise ? Direction.Left : Direction.Right;
  case Direction.Up:
      return clockwise ? Direction.Right : Direction.Left;
  case Direction.Left:
    return clockwise ? Direction.Up : Direction.Down;
  case Direction.Right:
    return clockwise ? Direction.Down : Direction.Up;
  default:
    return Direction.None;
  }
}

export const allDirections = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];