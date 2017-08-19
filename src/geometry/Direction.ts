export enum Direction {
    None,
    Up,
    Left,
    Down,
    Right
}

export function revertDirection(direction: Direction) : Direction
{
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
export const allDirections = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];