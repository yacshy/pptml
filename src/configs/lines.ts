export interface LinePoolItem {
  path: string
  style: string
  points: [string, string]
  isBroken: boolean
  isCurve: boolean
}

export interface ILine {
  type: string
  children: Array<LinePoolItem>
}

const noBroken = { isBroken: false }
const noCurve = { isCurve: false }
const noBrokenAndCurve = { ...noBroken, ...noCurve }

export const LINE_LIST: Array<ILine> = [
  {
    type: '直线',
    children: [
      { path: 'M 0 0 L 20 20', style: 'solid', points: ['', ''], ...noBrokenAndCurve },
      { path: 'M 0 0 L 20 20', style: 'dashed', points: ['', ''], ...noBrokenAndCurve },
      { path: 'M 0 0 L 20 20', style: 'solid', points: ['', 'arrow'], ...noBrokenAndCurve },
      { path: 'M 0 0 L 20 20', style: 'dashed', points: ['', 'arrow'], ...noBrokenAndCurve },
      { path: 'M 0 0 L 20 20', style: 'solid', points: ['', 'dot'], ...noBrokenAndCurve }
    ]
  },
  {
    type: '折线、曲线',
    children: [
      { path: 'M 0 0 L 0 20 L 20 20', style: 'solid', points: ['', 'arrow'], isBroken: true, ...noCurve },
      { path: 'M 0 0 Q 0 20 20 20', style: 'solid', points: ['', 'arrow'], ...noBroken, isCurve: true }
    ]
  }
]
