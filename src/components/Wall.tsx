import { Component } from 'react';
import * as React from 'react';
import { Rectangle, Point } from '../geometry';
import { Path } from 'react-konva';
import { Store } from "../model";

export type WallProps = {
  bounds: Rectangle;
  type: Store.WallType;
}

export default class Wall extends Component<WallProps, {}> {

//    private getRandomColor() : string {
//        const letters = '0123456789ABCDEF';
//        let color = '#';
//        for (let i = 0; i < 6; i++) {
//            color += letters[Math.floor(Math.random() * 16)];
//        }
//        return color;
//    }

  line(x0: number, y0: number, x1: number, y1: number) : string {
    return `M ${x0} ${y0} L${x1} ${y1}`
  }


  curve(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) : string {
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

  generatePath() : string {
    const bounds = this.props.bounds;
    const x0 = bounds.x;
    const y0 = bounds.y;
    const x3 = x0 + bounds.dx;
    const y3 = y0 + bounds.dy;

    const yc = bounds.center.y;
    const xc = bounds.center.x;

    switch (this.props.type) {
      case Store.WallType.n: return this.line(x0, yc, x3, yc);
      case Store.WallType.w: return this.line(xc, y0, xc, y3);
      case Store.WallType.nw:return this.curve(xc, y3, xc, yc, x3, yc);
      case Store.WallType.ne:return this.curve(x0, yc, xc, yc, xc, y3);
      case Store.WallType.sw:return this.curve(xc, y0, xc, yc, x3, yc);
      case Store.WallType.se:return this.curve(x0, yc, xc, yc, xc, y0);
    }

    const x1 = x0 + bounds.dx * 0.30;
    const x2 = x0 + bounds.dx * 0.70;
    const y1 = y0 + bounds.dy * 0.30;
    const y2 = y0 + bounds.dy * 0.70;

    switch (this.props.type) {
    case Store.WallType.W:
        return this.line(x1, y0, x1, y3) + this.line(x2, y0, x2, y3);
      case Store.WallType.N:
        return this.line(x0, y1, x3, y1) + this.line(x0, y2, x3, y2);
      case Store.WallType.NW:
        return this.curve(x1, y3, x1, y1, x3, y1) + this.curve(x2, y3, x2, y2, x3, y2);
      case Store.WallType.NE:
        return this.curve(x0, y1, x2, y1, x2, y3) + this.curve(x0, y2, x1, y2, x1, y3);
      case Store.WallType.SW:
        return this.curve(x1, y0, x1, y2, x3, y2) + this.curve(x2, y0, x2, y1, x3, y1);
      case Store.WallType.SE:
        return this.curve(x0, y1, x1, y1, x1, y0) + this.curve(x0, y2, x2, y2, x2, y0);
      case Store.WallType.Ne:
        return this.line(x0, y1, x3, y1) + this.curve(x0, y2, xc, y2, xc, y3);
      case Store.WallType.Nw:
        return this.line(x3, y1, x0, y1) + this.curve(x3, y2, xc, y2, xc, y3);
      case Store.WallType.Ws:
        return this.line(x1, y0, x1, y3) + this.curve(x2, y0, x2, yc, x3, yc);
      case Store.WallType.Wn:
        return this.line(x1, y3, x1, y0) + this.curve(x2, y3, x2, yc, x3, yc);
      case Store.WallType.Es:
        return this.line(x2, y0, x2, y3) + this.curve(x1, y0, x1, yc, x0, yc);
      case Store.WallType.En:
        return this.line(x2, y3, x2, y0) + this.curve(x1, y3, x1, yc, x0, yc);

      default:
        return "";
    }  
  }
  render(): any {
      
        return (
          <Path data={this.generatePath()}
            stroke="blue"
           strokeWidth={3} 
          />
     );
    }
}

