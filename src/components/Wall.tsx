import { Component } from 'react';
import * as React from 'react';
import { Rectangle, Point } from '../geometry';
import { Path } from 'react-konva';
import { Store } from '../model';

export type WallProps = {
  key: number;
  bounds: Rectangle;
  type: Store.WallType;
};

export default class Wall extends Component<WallProps, {}> {

//    private getRandomColor() : string {
//        const letters = '0123456789ABCDEF';
//        let color = '#';
//        for (let i = 0; i < 6; i++) {
//            color += letters[Math.floor(Math.random() * 16)];
//        }
//        return color;
//    }

  line(x0: number, y0: number, x1: number, y1: number): string {
    return `M ${x0} ${y0} L${x1} ${y1}`;
  }

  curve(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): string {
    function moveTowardsFractional(movingPoint: Point, targetPoint: Point, fraction: number): Point {
      return movingPoint.offset(targetPoint.offset(movingPoint.negate).scale(fraction));
    }
    // The start and end of the curve are just our point moved towards the previous and neyt points, respectivly
    const p0 = new Point(x0, y0);
    const p1 = new Point(x1, y1);
    const p2 = new Point(x2, y2);

    let curveStart = moveTowardsFractional(p1, p0, .9);
    let curveEnd = moveTowardsFractional(p1, p2, .9);

    // The curve control points are halfway between the start/end of the curve and the original point
    var startControl = moveTowardsFractional(curveStart, p1, .5);
    var endControl = moveTowardsFractional(p1, curveEnd, .5);

    return `M${p0.x} ${p0.y} L${curveStart.x} ${curveStart.y} C${startControl.x} ${startControl.y} ${endControl.x} ${endControl.y} ${curveEnd.x} ${curveEnd.y} L${p2.x} ${p2.y}`;
  }

  generatePath(): string {
    const bounds = this.props.bounds;
    const x0 = bounds.x;
    const y0 = bounds.y;
    const x3 = x0 + bounds.dx;
    const y3 = y0 + bounds.dy;

    const yc = bounds.center.y;
    const xc = bounds.center.x;

    switch (this.props.type) {
      case Store.WallType.n:  return this.line(x0, yc, x3, yc);
      case Store.WallType.w:  return this.line(xc, y0, xc, y3);
      case Store.WallType.nw: return this.curve(xc, y3, xc, yc, x3, yc);
      case Store.WallType.ne: return this.curve(x0, yc, xc, yc, xc, y3);
      case Store.WallType.sw: return this.curve(xc, y0, xc, yc, x3, yc);
      case Store.WallType.se: return this.curve(x0, yc, xc, yc, xc, y0);
    }

    const x1w = x0 + bounds.dx * 0.20;
    const x2w = x0 + bounds.dx * 0.50;
    const x1e = x0 + bounds.dx * 0.50;
    const x2e = x0 + bounds.dx * 0.80;
    const y1n = y0 + bounds.dy * 0.20;
    const y2n = y0 + bounds.dy * 0.50;
    const y1s = y0 + bounds.dy * 0.50;
    const y2s = y0 + bounds.dy * 0.80;

    switch (this.props.type) {
      case Store.WallType.W:
        return this.line(x1w, y0, x1w, y3) + this.line(x2w, y0, x2w, y3);
      case Store.WallType.E:
        return this.line(x1e, y0, x1e, y3) + this.line(x2e, y0, x2e, y3);
      case Store.WallType.N:
        return this.line(x0, y1n, x3, y1n) + this.line(x0, y2n, x3, y2n);
      case Store.WallType.S:
        return this.line(x0, y1s, x3, y1s) + this.line(x0, y2s, x3, y2s);
      case Store.WallType.NW:
        return this.curve(x1w, y3, x1w, y1n, x3, y1n) + this.curve(x2w, y3, x2w, y2n, x3, y2n);
      case Store.WallType.NW2:
        return this.curve(x1e, y3, x1e, y1s, x3, y1s) + this.curve(x2e, y3, x2e, y2s, x3, y2s);
      case Store.WallType.NE:
        return this.curve(x0, y1n, x2e, y1n, x2e, y3) + this.curve(x0, y2n, x1e, y2n, x1e, y3);
      case Store.WallType.NE2:
        return this.curve(x0, y1s, x2w, y1s, x2w, y3) + this.curve(x0, y2s, x1w, y2s, x1w, y3);
      case Store.WallType.SW:
        return this.curve(x1w, y0, x1w, y2s, x3, y2s) + this.curve(x2w, y0, x2w, y1s, x3, y1s);
      case Store.WallType.SW2:
        return this.curve(x1e, y0, x1e, y2n, x3, y2n) + this.curve(x2e, y0, x2e, y1n, x3, y1n);
      case Store.WallType.SE:
        return this.curve(x0, y1s, x1e, y1s, x1e, y0) + this.curve(x0, y2s, x2e, y2s, x2e, y0);
      case Store.WallType.SE2:
        return this.curve(x0, y1n, x1w, y1n, x1w, y0) + this.curve(x0, y2n, x2w, y2n, x2w, y0);
      case Store.WallType.Ne:
        return this.line(x0, y1n, x3, y1n) + this.curve(x0, y2n, xc, y2n, xc, y3);
      case Store.WallType.Nw:
        return this.line(x3, y1n, x0, y1n) + this.curve(x3, y2n, xc, y2n, xc, y3);
      case Store.WallType.Ws:
        return this.line(x1w, y0, x1w, y3) + this.curve(x2w, y0, x2w, yc, x3, yc);
      case Store.WallType.Wn:
        return this.line(x1w, y3, x1w, y0) + this.curve(x2w, y3, x2w, yc, x3, yc);
      case Store.WallType.Es:
        return this.line(x2e, y0, x2e, y3) + this.curve(x1e, y0, x1e, yc, x0, yc);
      case Store.WallType.En:
        return this.line(x2e, y3, x2e, y0) + this.curve(x1e, y3, x1e, yc, x0, yc);

      default:
        return '';
    }  
  }
  render() {
        return (
          <Path 
            data={this.generatePath()}
            stroke="blue"
            strokeWidth={3} 
          />
     );
    }
}