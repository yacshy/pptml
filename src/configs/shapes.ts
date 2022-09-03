export interface ShapePoolItem {
  viewBox: number
  path: string
}

export interface IShapeList {
  type: string
  children: Array<ShapePoolItem>
}

export const SHAPE_LIST: Array<IShapeList> = [
  {
    type: '矩形',
    children: [
      {
        viewBox: 200,
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: 200,
        path: 'M 20 0 L 180 0 Q 200 0 200 20 L 200 180 Q 200 200 180 200 L 20 200 Q 0 200 0 180 L 0 20 Q 0 0 20 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 150 L 0 0 L 150 0 L 200 50 L 200 200 L 50 200 L 0 150 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 200 L 0 0 L 150 0 L 200 50 L 200 200 L 0 200'
      },
      {
        viewBox: 200,
        path: 'M 0 50 L 50 0 L 150 0 L 200 50 L 200 200 L 0 200 L 0 50 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 140 0 Q 200 0 200 60 L 200 200 L 60 200 Q 0 200 0 140 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 140 0 Q 200 0 200 60 L 200 200 L 0 200 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 50 Q 0 0 50 0 L 150 0 Q 200 0 200 50 L 200 200 L 0 200 L 0 50 Z'
      }
    ]
  },

  {
    type: '常用形状',
    children: [
      {
        viewBox: 200,
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 200 A 50 100 0 1 1 200 200 L 0 200 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 100 100 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 200 0 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 200 0 Q 200 200 0 200 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 0 200 L 200 200 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 0 200 L 200 200 Z'
      },
      {
        viewBox: 200,
        path: 'M 50 0 L 200 0 L 150 200 L 0 200 L 50 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 150 0 L 200 200 L 50 200 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 50 0 L 150 0 L 200 200 L 0 200 L 50 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 0 100 L 100 200 L 200 100 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 0 90 L 50 200 L 150 200 L 200 90 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 0 60 L 0 140 L 100 200 L 200 140 L 200 60 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 60 0 L 140 0 L 200 60 L 200 140 L 140 200 L 60 200 L 0 140 L 0 60 L 60 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 75 0 L 125 0 L 175 25 L 200 75 L 200 125 L 175 175 L 125 200 L 75 200 L 25 175 L 0 125 L 0 75 L 25 25 L 75 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 0 50 L 0 200 L 200 200 L 200 50 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 150 0 A 50 100 0 1 1 150 200 L 0 200 L 0 0 L 150 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 150 0 A 50 100 0 1 1 150 200 L 0 200 A 50 100 0 0 0 0 0 L 150 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 100 L 150 0 L 0 0 L 50 100 L 0 200 L 150 200 L 200 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 0 L 200 200 L 0 200 L 0 100 L 200 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 200 100 L 200 200 L 0 200 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 0 L 100 0 L 0 100 L 0 200 L 200 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 50 0 L 150 0 L 150 50 L 200 50 L 200 150 L 150 150 L 150 200 L 50 200 L 50 150 L 0 150 L 0 50 L 50 50 L 50 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 0 200 L 200 200 L 200 140 L 60 140 L 60 0 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 70 0 L 70 70 L 0 70 L 0 130 L 70 130 L 70 200 L 130 200 L 130 130 L 200 130 L 200 70 L 130 70 L 130 0 L 70 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 40 0 L 0 40 L 60 100 L 0 160 L 40 200 L 100 140 L 160 200 L 200 160 L 140 100 L 200 40 L 160 0 L 100 60 L 40 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 200 0 L 200 160 L 100 160 L 60 200 L 60 160 L 0 160 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 40 Q 0 0 40 0 L 160 0 Q 200 0 200 40 L 200 120 Q 200 160 160 160 L 100 160 L 60 200 L 60 160 L 40 160 Q 0 160 0 120 L 0 40 Z'
      },
      {
        viewBox: 200,
        path: 'M 180 160 A 100 100 0 1 0 100 200 L 200 200 L 200 160 L 180 160 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 0 L 0 0 L 200 200 L 0 200 L 200 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 20 C 60 60 140 -40 200 20 L 200 180 C 140 140 60 240 0 180 L 0 20 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 20 C 40 -40 60 60 100 20 C 140 -40 160 60 200 20 L 200 180 C 140 240 160 140 100 180 C 40 240 60 140 0 180 L 0 20 Z'
      }
    ]
  },

  {
    type: '箭头',
    children: [
      {
        viewBox: 200,
        path: 'M 100 0 L 0 100 L 50 100 L 50 200 L 150 200 L 150 100 L 200 100 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 200 L 200 100 L 150 100 L 150 0 L 50 0 L 50 100 L 0 100 L 100 200 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 100 L 100 0 L 100 50 L 200 50 L 200 150 L 100 150 L 100 200 L 0 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 100 L 100 0 L 100 50 L 0 50 L 0 150 L 100 150 L 100 200 L 200 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 0 60 L 60 60 L 60 140 L 0 140 L 100 200 L 200 140 L 140 140 L 140 60 L 200 60 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 100 L 60 0 L 60 60 L 140 60 L 140 0 L 200 100 L 140 200 L 140 140 L 60 140 L 60 200 L 0 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 100 0 L 60 40 L 80 40 L 80 80 L 40 80 L 40 60 L 0 100 L 40 140 L 40 120 L 80 120 L 80 160 L 60 160 L 100 200 L 140 160 L 120 160 L 120 120 L 160 120 L 160 140 L 200 100 L 160 60 L 160 80 L 120 80 L 120 40 L 140 40 L 100 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 100 L 100 0 L 100 50 L 200 50 L 150 100 L 200 150 L 100 150 L 100 200 L 0 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 100 L 100 0 L 100 50 L 0 50 L 50 100 L 0 150 L 100 150 L 100 200 L 200 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 100 L 80 20 L 80 80 L 120 80 L 120 0 L 200 0 L 200 200 L 120 200 L 120 120 L 80 120 L 80 180 L 0 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 100 L 120 20 L 120 80 L 80 80 L 80 0 L 0 0 L 0 200 L 80 200 L 80 120 L 120 120 L 120 180 L 200 100 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 120 0 L 200 100 L 120 200 L 0 200 L 80 100 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 80 0 L 200 0 L 120 100 L 200 200 L 80 200 L 0 100 L 80 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 140 0 L 200 100 L 140 200 L 0 200 L 0 100 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 60 0 L 200 0 L 200 100 L 200 200 L 60 200 L 0 100 L 60 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 200 100 L 0 200 L 60 100 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 0 L 0 100 L 200 200 L 140 100 L 200 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 0 L 80 0 L 200 100 L 80 200 L 0 200 L 120 100 L 0 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 200 0 L 120 0 L 0 100 L 120 200 L 200 200 L 80 100 L 200 0 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 200 L 180 200 L 180 40 L 200 40 L 160 0 L 120 40 L 140 40 L 140 160 L 0 160 L 0 200 Z'
      },
      {
        viewBox: 200,
        path: 'M 0 200 L 0 20 L 160 20 L 160 0 L 200 40 L 160 80 L 160 60 L 40 60 L 40 200 L 0 200 Z'
      },
      {
        viewBox: 200,
        path: 'M 40 180 L 180 180 L 180 40 L 200 40 L 160 0 L 120 40 L 140 40 L 140 140 L 40 140 L 40 120 L 0 160 L 40 200 L 40 180 Z'
      }
    ]
  }
]
