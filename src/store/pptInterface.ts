import { LinePoolItem } from '@/configs/lines'

export interface IPPTBase {
  id: string
  type: 'text' | 'image' | 'line' | 'shape' | 'table' | 'media'
  top: number
  left: number
  width: number
  height: number
  shadow: {
    open: boolean
    x: number
    y: number
    w: number
    color: string
  }
  angle: number
  zIndex: number
  opacity: number
}

export interface IAnimation {
  type: string
  name: string
  value: string
  activeId: string
}

export interface IText extends IPPTBase {
  content: string
  style: {
    color: string
    fontSize: number
    fontStyle: string // 倾斜
    textAlign: 'left' | 'right' | 'center'
    fontWeight: string
    decoration: string
    fontFamily: string
    background: string
    lineHeight: number
    letterSpacing: number
  }
  border: {
    open: boolean
    type: string
    width: number
    color: string
  }
}

export interface IImage extends IPPTBase {
  url: string
  clip: {
    open: boolean
    name: string
    shape: string
    style: string
    radius: string
  },
  filter: {
    open: boolean
    blur: number
    brightness: number
    contrast: number
    grayscale: number
    saturate: number
    hueRotate: number
  }
}

export interface IShape extends IPPTBase {
  path: string
  border: {
    open: boolean
    type: string
    width: number
    color: string
  }
  fill: string
}

export interface ILine extends IPPTBase {
  stroke: string
  line: LinePoolItem
  startPosition: number[]
  waistPosition: number[]
  endPosition: number[]
}

export interface ITableCell {
  type: string
  rowspan: number
  colspan: number
  content: string
  width: number
  height: number
  color: string
  fontSize: number
  fontStyle: string // 倾斜
  textAlign: 'left' | 'right' | 'center'
  fontWeight: string
  decoration: string
  fontFamily: string
  background: string
}

export interface ITable {
  id: string
  type: 'table'
  top: number
  left: number
  width: number
  height: number
  angle: number
  zIndex: number

  activecell: number[]

  col: number
  row: number
  borderWidth: number
  borderColor: string
  table: Array<ITableCell[]>
}

export interface IAudio {
  id: string
  type: 'audio'
  top: number
  left: number
  size: number
  zIndex: number
  loop: boolean
  background: string
  url: string
}

export interface IVideo {
  id: string
  type: 'video'
  top: number
  left: number
  width: number
  height: number
  zIndex: number
  cover: string
  angle: number
  url: string
}

export interface IPPT {
  id: string
  type: 'ppt',
  cover: string
  background: {
    type: string
    image: {
      type: string,
      url: string
    }
    gradient: {
      type: string
      start: string
      end: string
    }
    solid: string
  }
  ratio: {
    label: string
    value: number[]
  }
  fontFamily: string
  fontColor: string
  themeColor: string
  switchAnimation: string[]
  animation: Array<IAnimation[]> // animation[0]就是进入就触发 ，触发类型分为：自动，与上次同时，在上次之后
  content: Array<IText | IImage | IShape | ILine | ITable | IAudio | IVideo>
}

/*****************************************************************
 * 一些边角料
 */

export interface IEleType {
  all: IPPT | IText | IImage | IShape | ILine | ITable | IAudio | IVideo
  ele: IText | IImage | IShape | ILine | ITable | IAudio | IVideo
  base: IText | IImage | IShape | ILine | ITable
}

export interface IAfterFindPPT {
  ele: {
    index: number
    data: IEleType['ele']
  }
  pptbase: {
    index: number
    data: {
      cover?: string
      type?: string
      solid?: string
      imageType?: string
      imageUrl?: string
      grandientType?: string
      grandientEnd?: string
      grandientStart?: string
      ratio?: {
        label: string
        value: number[]
      }
      fontFamily?: string
      fontColor?: string
      themeColor?: string
      switchAnimation?: string[]
    }
  }
  num: {
    index: number
    data: number
  }
  str: {
    index: number
    data: string
  }
  animation: {
    index: number
    data: IAnimation
  }
  delanimation: {
    index: number
    data: {
      i: number
      j: number
    }
  }
  orderanimation: {
    index: number
    data: {
      i: number
      j: number
      type: string
    }
  }
}

export interface IFindElementParma {
  mutation: string
  pptid: string
  eleid: string
  data: unknown
}

export interface IAfterFindElement {
  shadow: {
    i: number
    j: number
    data: {
      open?: boolean
      x?: number
      y?: number
      w?: number
      color?: string
    }
  }
  border: {
    i: number
    j: number
    data: {
      open?: boolean
      type?: string
      width?: number
      color?: string
    }
  }
  text: {
    i: number
    j: number
    data: {
      content?: string
      color?: string
      fontSize?: number
      fontStyle?: string // 倾斜
      textAlign?: 'left' | 'right' | 'center'
      fontWeight?: string
      decoration?: string
      fontFamily?: string
      background?: string
      lineHeight?: number
      letterSpacing?: number
    }
  }
  elebase: {
    i: number
    j: number
    data: {
      top?: number
      left?: number
      width?: number
      height?: number
      zIndex?: number
      angle?: number
      opacity?: number
    }
  }
  imageClip: {
    i: number
    j: number
    data: {
      open?: boolean
      name?: string
      shape?: string
      style?: string
      radius?: string
    }
  }
  imageFilter: {
    i: number
    j: number
    data: {
      open?: boolean
      blur?: number
      brightness?: number
      contrast?: number
      grayscale?: number
      saturate?: number
      hueRotate?: number
    }
  }
  lineSizeandPosition: {
    i: number
    j: number
    data: {
      top?: number
      left?: number
      angle?: number
      width?: number
      startPosition?: number[]
      waistPosition?: number[]
      endPosition?: number[]
    }
  }
  lineStyle: {
    i: number
    j: number
    data: {
      style?: string
      stroke?: string
      pointsStart?: string
      pointsEnd?: string
    }
  }
  tableInfo: {
    i: number
    j: number
    data: {
      col?: number
      row?: number
      cell?: number[]
      borderWidth?: number
      borderColor?: string
    }
  }
  tableCellOption: {
    i: number
    j: number
    posi: number[]
    data: {
      width?: number
      rowspan?: number
      colspan?: number
      content?: string
      color?: string
      fontSize?: number
      fontStyle?: string // 倾斜
      textAlign?: 'left' | 'right' | 'center'
      fontWeight?: string
      decoration?: string
      fontFamily?: string
      background?: string
    }
  }
  spliceTableCell: {
    i: number
    j: number
    data: {
      type: string
      index: number
    }
  }
  mergecell: {
    i: number
    j: number
    data: {
      start: number[]
      end: number[]
    }
  }
}

/*****************************************************************
 * 为设置line的position和size
 */
