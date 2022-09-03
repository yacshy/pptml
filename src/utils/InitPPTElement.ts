import { PPTStore } from '@/store/ppt'
import { LinePoolItem } from '@/configs/lines'
import { IImage, IPPT, IShape, IText, ILine, ITable, ITableCell, IVideo, IAudio } from '@/store/pptInterface'

interface IBasInfo {
  id: string
  top: number
  left: number
  width: number
  height: number
  zIndex: number
}

const defaultInfo = {
  shadow: {
    open: false,
    x: 0,
    y: 0,
    w: 0,
    color: '#000000'
  },
  angle: 0,
  opacity: 1
}

export const initPPT = (id: string): IPPT => {
  return {
    id,
    type: 'ppt',
    cover: '',
    background: {
      type: 'solid',
      image: {
        type: 'cover',
        url: ''
      },
      gradient: {
        type: 'linear',
        start: '#ffffff',
        end: '#ffffff'
      },
      solid: '#ffffff'
    },
    ratio: {
      label: '16-9',
      value: [1000, 562.5]
    },
    fontFamily: 'Microsoft Yahei',
    fontColor: '#000000',
    themeColor: '#0091ff',
    switchAnimation: ['none', 'none'],
    animation: [[]],
    content: []
  }
}

export const initText = (baseInfo: IBasInfo): IText => {
  return {
    ...baseInfo,
    ...JSON.parse(JSON.stringify(defaultInfo)),
    content: '',
    type: 'text',
    style: {
      color: '#000000',
      fontSize: 14,
      fontStyle: 'normal',
      textAlign: 'left',
      fontWeight: 'normal',
      decoration: 'none',
      fontFamily: 'Microsoft Yahei',
      background: 'transparent',
      lineHeight: 1.2,
      letterSpacing: 0
    },
    border: {
      open: false,
      type: 'solid',
      color: PPTStore.ppt.fontColor,
      width: 2
    }
  }
}

interface IImageParma {
  id: string
  width: number
  height: number
  zIndex: number
  url: string
}

export const initImage = (parma: IImageParma): IImage => {
  return {
    ...parma,
    ...JSON.parse(JSON.stringify(defaultInfo)),
    type: 'image',
    top: 0,
    left: 0,
    clip: {
      open: false,
      name: '矩形',
      shape: 'rect',
      style: 'inset(0% 0% 0% 0% round 0%)',
      radius: '0'
    },
    filter: {
      open: false,
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      saturate: 100,
      hueRotate: 0
    }
  }
}

interface IShapeParma {
  id: string
  top: number
  left: number
  width: number
  height: number
  zIndex: number
  path: string
}

export const initShape = (parma: IShapeParma): IShape => {
  return {
    ...parma,
    ...JSON.parse(JSON.stringify(defaultInfo)),
    type: 'shape',
    border: {
      open: false,
      type: 'solid',
      color: PPTStore.ppt.fontColor,
      width: 2
    },
    fill: PPTStore.ppt.themeColor
  }
}

interface ILineParma {
  id: string
  top: number
  left: number
  width: number
  zIndex: number
  angle: number
  line: LinePoolItem
  startPosition: number[]
  waistPosition: number[]
  endPosition: number[]
}

export const initLine = (parma: ILineParma): ILine => {
  return {
    ...JSON.parse(JSON.stringify(defaultInfo)),
    ...parma,
    type: 'line',
    stroke: '#999999',
    height: 2
  }
}

interface ITableParma {
  id: string
  col: number
  row: number
  zIndex: number
}

export const tableCellComponent: ITableCell = {
  type: 'tablecell',
  width: 100,
  height: 30,
  rowspan: 1,
  colspan: 1,
  content: '',
  color: '#000000',
  fontSize: 14,
  fontStyle: 'normal',
  textAlign: 'left',
  fontWeight: 'normal',
  decoration: 'none',
  fontFamily: 'Microsoft Yahei',
  background: '#ffffff'
}

export const initTable = (parma: ITableParma): ITable => {
  const table: Array<ITableCell[]> = []
  for (let i = 0; i < parma.row; i++) {
    const aRow: ITableCell[] = []
    for (let j = 0; j < parma.col; j++) {
      aRow.push(JSON.parse(JSON.stringify(tableCellComponent)))
    }
    table.push(aRow)
  }
  return {
    ...parma,
    type: 'table',
    top: 100,
    left: 500 - parma.col * 50,
    width: parma.col * 100, // 4 + (col - 1) + (col * 100)
    height: parma.row * 3,
    angle: 0,
    borderWidth: 2,
    borderColor: PPTStore.ppt.fontColor,
    activecell: [0, 0],
    table
  }
}

interface IAudioParma {
  id: string
  url: string
  zIndex: number
}

export const initAudio = (parma: IAudioParma): IAudio => {
  return {
    ...parma,
    type: 'audio',
    size: 30,
    top: 100,
    left: 100,
    loop: false,
    background: '#0091ff'
  }
}

interface IVideoParma {
  id: string
  width: number
  height: number
  zIndex: number
  url: string
}

export const initVideo = (parma: IVideoParma): IVideo => {
  const max = Math.max(parma.width / 1000, parma.height / 562.5)
  const ratio = max > 1 ? max : 1
  return {
    ...parma,
    top: 0,
    left: 0,
    type: 'video',
    width: parma.width / ratio,
    height: parma.height / ratio,
    cover: '',
    angle: 0
  }
}
