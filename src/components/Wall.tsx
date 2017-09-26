import { Component } from 'react';
import * as React from 'react';
import { Rectangle } from '../geometry';
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

  generatePath() : string {
    const bounds = this.props.bounds;
    const x0 = bounds.x;
    const y0 = bounds.y;
    const x3 = x0 + bounds.dx;
    const y3 = y0 + bounds.dy;

    const yc = bounds.center.y;
    const xc = bounds.center.x;

    switch (this.props.type) {
    case Store.WallType.n:
      return `M ${x0} ${yc} L${x3} ${yc}`;
    case Store.WallType.w:
      return `M ${xc} ${y0} L${xc} ${y3}`;
    case Store.WallType.nw:
      return `M ${xc} ${y3} L${xc} ${yc} L${x3} ${yc}`;
    case Store.WallType.ne:
      return `M ${x0} ${yc} L${xc} ${yc} L${xc} ${y3}`;
    case Store.WallType.sw:
      return `M ${xc} ${y0} L${xc} ${yc} L${x3} ${yc}`;
    case Store.WallType.se:
      return `M ${x0} ${yc} L${xc} ${yc} L${xc} ${y0}`;
    }

    const x1 = x0 + Math.round(bounds.dx / 30) * 10;
    const x2 = x0 + Math.round(bounds.dx / 30) * 20;
    const y1 = y0 + Math.round(bounds.dy / 30) * 10;
    const y2 = y0 + Math.round(bounds.dy / 30) * 20;

    switch (this.props.type) {
    case Store.WallType.W:
        return `M ${x1} ${y0} L${x1} ${y3} M${x2} ${y0} L${x2} ${y3}`;
      case Store.WallType.N:
        return `M ${x0} ${y1} L${x3} ${y1} M${x0} ${y2} L${x3} ${y2}`;
      case Store.WallType.NW:
        return `M ${x1} ${y3} L${x1} ${y1} L${x3} ${y1} M ${x2} ${y3} L${x2} ${y2} L${x3} ${y2} `;
      case Store.WallType.NE:
        return `M ${x0} ${y1} L${x2} ${y1} L${x2} ${y3} M ${x0} ${y2} L${x1} ${y2} L${x1} ${y3}`;
      case Store.WallType.SW:
        return `M ${x1} ${y0} L${x1} ${y2} L${x3} ${y2} M ${x2} ${y0} L${x2} ${y1} L${x3} ${y1}`;
      case Store.WallType.SE:
        return `M ${x0} ${y1} L${x1} ${y1} L${x1} ${y0} M ${x0} ${y2} L${x2} ${y2} L${x2} ${y0}`;
      case Store.WallType.Ne:
        return `M ${x0} ${y1} L${x3} ${y1} M ${x0} ${y2} L${xc} ${y2} L${xc} ${y3}`;
      case Store.WallType.Nw:
        return `M ${x3} ${y1} L${x0} ${y1} M ${x3} ${y2} L${xc} ${y2} L${xc} ${y3}`;
      case Store.WallType.Ws:
        return `M ${x1} ${y0} L${x1} ${y3} M ${x2} ${y0} L${x2} ${yc} L${x3} ${yc}`;
      case Store.WallType.Wn:
        return `M ${x1} ${y3} L${x1} ${y0} M ${x2} ${y3} L${x2} ${yc} L${x3} ${yc}`;
      case Store.WallType.Es:
        return `M ${x2} ${y0} L${x2} ${y3} M ${x1} ${y0} L${x1} ${yc} L${x0} ${yc}`;
      case Store.WallType.En:
        return `M ${x2} ${y3} L${x2} ${y0} M ${x1} ${y3} L${x1} ${yc} L${x0} ${yc}`;

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

