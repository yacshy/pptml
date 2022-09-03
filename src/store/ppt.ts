import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { IPPT, IAfterFindElement, IEleType, IAfterFindPPT, IText, IFindElementParma, ILine, ITable, IPPTBase, IImage, IShape, IAudio, IVideo, ITableCell } from './pptInterface'
import { tableCellComponent } from '@/utils/InitPPTElement'

import store from './index'

export interface IPPTState {
  list: Array<IPPT>
  pptId: string
  activeId: string
}

@Module({
  name: 'ppt',
  dynamic: true,
  store
})
export default class PPT extends VuexModule implements IPPTState {
  list: Array<IPPT> = []
  pptId = ''
  activeId = ''

  get ppt(): IPPT {
    return (this.list.find(i => i.id === this.pptId) as IPPT)
  }

  get pptIndex(): number {
    return this.list.findIndex(i => i.id === this.pptId)
  }

  get active(): IEleType['all'] {
    return /^ppt_/.test(this.activeId) ? this.ppt : (this.ppt.content.find(i => i.id === this.activeId) as IEleType['ele'])
  }

  get activeIndex(): number {
    return /^ppt_/.test(this.activeId) ? -1 : this.ppt.content.findIndex(i => i.id === this.activeId)
  }

  @Action
  afterFindPPT({ mutation, pptid, eleid, data }: IFindElementParma): void {
    const i = this.list.findIndex(p => p.id === pptid)
    const j = this.list[i].content.findIndex(e => e.id === eleid)
    this.context.commit(mutation, { i, j, data })
  }

  @Mutation
  setActiveId(id: string): void {
    this.activeId = id
  }

  @Mutation
  setPptId(id: string): void {
    this.pptId = id
  }

  /**
   * 设置ppt相关信息
   */
  @Mutation
  setPPTBaseInfo({ index, data }: IAfterFindPPT['pptbase']): void {
    const ppt = this.list[index]
    const bg = this.list[index].background
    const { cover, type, solid, imageType, imageUrl, grandientType, grandientEnd, grandientStart, ratio, fontColor, fontFamily, themeColor, switchAnimation } = data
    if (cover) ppt.cover = cover
    if (type) bg.type = type
    if (solid) bg.solid = solid
    if (imageType) bg.image.type = imageType
    if (imageUrl) bg.image.url = imageUrl
    if (grandientType) bg.gradient.type = grandientType
    if (grandientEnd) bg.gradient.end = grandientEnd
    if (grandientStart) bg.gradient.start = grandientStart
    if (ratio) ppt.ratio = ratio
    if (fontColor) ppt.fontColor = fontColor
    if (fontFamily) ppt.fontFamily = fontFamily
    if (themeColor) ppt.themeColor = themeColor
    if (switchAnimation) ppt.switchAnimation = switchAnimation
  }

  @Mutation
  useCurrentBGToAllPPt(index: number): void {
    const bg = this.list[index].background
    for (let i = 0; i < this.list.length; i++) {
      if (i !== index) {
        this.list[i].background = JSON.parse(JSON.stringify(bg))
      }
    }
  }

  @Mutation
  useCurrentThemeToAllPPt(index: number): void {
    const ppt = this.list[index]
    const solid = ppt.background.solid
    const fontCOlor = ppt.fontColor
    const themeColor = ppt.themeColor
    for (let i = 0; i < this.list.length; i++) {
      if (i === index) return
      const aim = this.list[i]
      aim.fontColor = fontCOlor
      aim.themeColor = themeColor
      aim.background.solid = solid
      aim.background.type = 'solid'
    }
  }

  @Mutation
  useCurrentSwitchAnimationToAllPPt(index: number): void {
    const switchAnimation = this.list[index].switchAnimation
    for (let i = 0; i < this.list.length; i++) {
      if (i === index) return
      this.list[i].switchAnimation = [...switchAnimation]
    }
  }

  @Mutation
  setList({ index, data }: { index: number, data?: IPPT }): void {
    if (data) {
      this.list.splice(index, 0, data)
      this.pptId = data.id
      this.activeId = data.id
    } else {
      this.list.splice(index, 1)
      const i = index - 1 >= 0 ? index - 1 : index
      this.pptId = this.list[i].id
      this.activeId = this.list[i].id
    }
  }

  @Mutation
  changeListOrder(newList: IPPT[]): void {
    this.list = newList
  }

  @Mutation
  pushElement({ index, data }: IAfterFindPPT['ele']): void {
    this.list[index].content.push(data)
    this.activeId = data.id
  }

  @Mutation
  delElement({ index, data }: IAfterFindPPT['num']): void {
    const ppt = this.list[index]
    // 删除该元素相关的动画
    ppt.animation.forEach((anis, i) => {
      anis.forEach((ani, j) => {
        if (ani.activeId === ppt.content[data].id) {
          ppt.animation[i].splice(j, 1)
          if (i !== 0 && ppt.animation[i].length === 0) ppt.animation.splice(i, 1)
        }
      })
    })
    ppt.content.splice(data, 1)
    // 重定向activeId
    this.activeId = this.pptId
  }

  @Mutation
  setElementBaseInfo({ i, j, data }: IAfterFindElement['elebase']): void {
    const activeEle = this.list[i].content[j]
    const { top, left, width, height, zIndex, opacity, angle } = data
    if (top) activeEle.top = top
    if (left) activeEle.left = left
    if (angle) (activeEle as IPPTBase).angle = angle
    if (width) {
      if (activeEle.type === 'table') {
        const offset = width - activeEle.width
        const table = (activeEle as ITable).table
        table.forEach((cells, i) => {
          cells.forEach((_, j) => {
            const cell = (activeEle as ITable).table[i][j]
            cell.width += offset * cell.colspan / (activeEle as ITable).col
          })
        })
      }
      (activeEle as IPPTBase).width = width
    }
    if (height) (activeEle as IPPTBase).height = height
    if (zIndex) activeEle.zIndex = zIndex
    if (opacity) (activeEle as IPPTBase).opacity = opacity
  }

  @Mutation
  setElementShadow({ i, j, data }: IAfterFindElement['shadow']): void {
    const sd = (this.list[i].content[j] as IPPTBase).shadow
    const { open, x, y, w, color } = data
    if (typeof open === 'boolean') sd.open = open
    if (x) sd.x = x
    if (y) sd.y = y
    if (w) sd.w = w
    if (color) sd.color = color
  }

  @Mutation
  setElementBorder({ i, j, data }: IAfterFindElement['border']): void {
    const border = (this.list[i].content[j] as IText).border
    const { open, type, width, color } = data
    if (typeof open === 'boolean') border.open = open
    if (type) border.type = type
    if (width) border.width = width
    if (color) border.color = color
  }

  /**
   * text
   */
  @Mutation
  setTextElementInfo({ i, j, data }: IAfterFindElement['text']): void {
    const { content, color, fontSize, fontStyle, textAlign, fontWeight, decoration, fontFamily, background, lineHeight, letterSpacing } = data
    const text = this.list[i].content[j] as IText
    if (content) text.content = content
    const style = text.style
    if (color) style.color = color
    if (fontSize) style.fontSize = fontSize
    if (fontStyle) style.fontStyle = fontStyle
    if (textAlign) style.textAlign = textAlign
    if (fontWeight) style.fontWeight = fontWeight
    if (decoration) style.decoration = decoration
    if (fontFamily) style.fontFamily = fontFamily
    if (background) style.background = background
    if (lineHeight) style.lineHeight = lineHeight
    if (letterSpacing) style.letterSpacing = letterSpacing
  }

  /**
   * image
   */
  @Mutation
  setImageElementClip({ i, j, data }: IAfterFindElement['imageClip']): void {
    const clip = (this.list[i].content[j] as IImage).clip
    const { open, name, shape, style, radius } = data
    if (typeof open === 'boolean') clip.open = open
    if (name) clip.name = name
    if (shape) clip.shape = shape
    if (style) clip.style = style
    if (radius) clip.radius = radius
  }

  @Mutation
  setImageElementFilter({ i, j, data }: IAfterFindElement['imageFilter']): void {
    const filter = (this.list[i].content[j] as IImage).filter
    const { open, blur, brightness, contrast, grayscale, saturate, hueRotate } = data
    if (typeof open === 'boolean') filter.open = open
    if (blur) filter.blur = blur
    if (brightness) filter.brightness = brightness
    if (contrast) filter.contrast = contrast
    if (grayscale) filter.grayscale = grayscale
    if (saturate) filter.saturate = saturate
    if (hueRotate) filter.hueRotate = hueRotate
  }

  /**
   * shape
   */
  @Mutation
  setShapeFill({ i, j, data }: { i: number, j: number, data: string }): void {
    (this.list[i].content[j] as IShape).fill = data
  }

  /**
   * line
   */
  @Mutation
  setLineElementSizeAndPosition({ i, j, data }: IAfterFindElement['lineSizeandPosition']): void {
    const Line = (this.list[i].content[j] as ILine)
    const { top, left, angle, width, endPosition, waistPosition, startPosition } = data
    if (top) Line.top = top
    if (left) Line.left = left
    if (angle) Line.angle = angle
    if (width) Line.width = width
    if (endPosition) Line.endPosition = endPosition
    if (waistPosition) Line.waistPosition = waistPosition
    if (startPosition) Line.startPosition = startPosition
  }

  @Mutation
  setLineElementStyle({ i, j, data }: IAfterFindElement['lineStyle']): void {
    const lineEle = this.list[i].content[j] as ILine
    const line = lineEle.line
    const { style, stroke, pointsStart, pointsEnd } = data
    if (style) line.style = style
    if (pointsStart) line.points[0] = pointsStart
    if (pointsEnd) line.points[1] = pointsEnd
    if (stroke) lineEle.stroke = stroke
  }

  /**
   * 设置cell 的信息
   */
  @Mutation
  setTableElementInfo({ i, j, data }: IAfterFindElement['tableInfo']): void {
    const table = this.list[i].content[j] as ITable
    const { col, row, borderWidth, borderColor, cell } = data
    if (col) table.col = col
    if (row) table.row = row
    if (cell) table.activecell = cell
    if (borderWidth) table.borderWidth = borderWidth
    if (borderColor) table.borderColor = borderColor
  }

  @Mutation
  setTableElementCell({ i, j, posi, data }: IAfterFindElement['tableCellOption']): void {
    const { width, rowspan, colspan, content, color, fontSize, fontStyle, textAlign, fontWeight, decoration, fontFamily, background } = data
    const cell = (this.list[i].content[j] as ITable).table[posi[0]][posi[1]]
    if (width) cell.width = width
    if (rowspan) cell.rowspan = rowspan
    if (colspan) cell.colspan = colspan
    if (content) cell.content = content
    if (color) cell.color = color
    if (fontSize) cell.fontSize = fontSize
    if (fontStyle) cell.fontStyle = fontStyle
    if (textAlign) cell.textAlign = textAlign
    if (fontWeight) cell.fontWeight = fontWeight
    if (decoration) cell.decoration = decoration
    if (fontFamily) cell.fontFamily = fontFamily
    if (background) cell.background = background
  }

  @Mutation
  spliceCol({ i, j, data }: IAfterFindElement['spliceTableCell']): void {
    const tableEle = this.list[i].content[j] as ITable
    const table = tableEle.table
    if (data.type === 'insert') {
      table.forEach((_, index) => {
        table[index].splice(data.index, 0, JSON.parse(JSON.stringify(tableCellComponent)))
      })
      tableEle.width += tableEle.width / tableEle.col
      tableEle.col += 1
    } else if (data.type === 'delete') {
      tableEle.width -= table[0][data.index].width
      tableEle.col -= 1
      table.forEach((_, index) => {
        table[index].splice(data.index, 1)
      })
    }
  }

  @Mutation
  spliceRow({ i, j, data }: IAfterFindElement['spliceTableCell']): void {
    const tableEle = this.list[i].content[j] as ITable
    const table = tableEle.table
    if (data.type === 'insert') {
      const aRow = []
      for (let index = 0; index < tableEle.row; index++) {
        const newCell = JSON.parse(JSON.stringify(tableCellComponent))
        newCell.width = tableEle.width / tableEle.col
        aRow.push(newCell)
      }
      table.splice(data.index, 0, aRow)
      tableEle.row += 1
      tableEle.height += 30
    } else if (data.type === 'delete') {
      table.splice(data.index, 1)
      tableEle.height -= 30
      tableEle.row -= 1
    }
  }

  @Mutation
  mergeCell({ i, j, data }: IAfterFindElement['mergecell']): void {
    const table = (this.list[i].content[j] as ITable).table
    const { start, end } = data
    const [sr, sc] = start
    const [er, ec] = end
    const [minR, maxR, minC, maxC] = [
      Math.min(sr, er), Math.max(sr, er), Math.min(sc, ec), Math.max(sc, ec)
    ]
    const cell: ITableCell = JSON.parse(JSON.stringify(table[sr][sc]))
    let width = 0
    let height = 0
    table.forEach((Row, r) => {
      Row.forEach((_, c) => {
        if (minR <= r && r <= maxR && minC <= c && c <= maxC) {
          width += _.width
          height += _.height
          table[r][c].colspan = 0
          table[r][c].rowspan = 0
        }
      })
    })
    cell.colspan = Math.abs(sc - ec) + 1
    cell.rowspan = Math.abs(sr - er) + 1
    cell.width = width / cell.rowspan
    cell.height = height / cell.colspan
    table[sr].splice(sc, 1, cell)
  }

  /**
   * audio
   */
  @Mutation
  setAudioBaseInfo({ i, j, data }: {
    i: number
    j: number
    data: {
      size?: number
      loop?: boolean
      background?: string
    }
  }): void {
    const audio = this.list[i].content[j] as IAudio
    const { size, loop, background } = data
    if (size) audio.size = size
    if (typeof loop === 'boolean') audio.loop = loop
    if (background) audio.background = background
  }

  /**
   * video
   */
  @Mutation
  setVideoElementInfo({ i, j, data }: {
    i: number
    j: number
    data: string
  }): void {
    (this.list[i].content[j] as IVideo).cover = data
  }

  /**
   * 动画
   */
  @Mutation
  pushAnimation({ index, data }: IAfterFindPPT['animation']): void {
    const animation = this.list[index].animation
    animation.push([data])
  }

  @Mutation
  deletAnimation({ index, data }: IAfterFindPPT['delanimation']): void {
    const { i, j } = data
    const animation = this.list[index].animation
    animation[i].splice(j, 1)
    if (animation[i].length === 0) {
      animation.splice(i, 1)
    }
  }

  @Mutation
  changeAnimationOrder({ index, data }: IAfterFindPPT['orderanimation']): void {
    const animation = this.list[index].animation
    const { i, j, type } = data
    const ani = animation[i][j]
    animation[i].splice(j, 1)
    if (type === '0') {
      animation[0].push(ani)
    } else if (type === '1') {
      animation[i - 1].push(ani)
    } else if (type === '2') {
      animation.push([ani])
    }
    // 删除空的动画层，（如果不是第一层的话）
    if (i !== 0 && animation[i].length === 0) animation.splice(i, 1)
  }
}

export const PPTStore = getModule(PPT)
