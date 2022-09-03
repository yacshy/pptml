import { PPTStore } from '@/store/ppt'
import { ITable } from '@/store/pptInterface'

export const afterFindPpt = (data: any): any => {
  return { index: PPTStore.pptIndex, data }
}

export const afterFindElement = (data: any): any => {
  return {
    i: PPTStore.pptIndex,
    j: PPTStore.activeIndex,
    data
  }
}

export const afterFindTableCell = (data: any): any => {
  return {
    i: PPTStore.pptIndex,
    j: PPTStore.activeIndex,
    posi: (PPTStore.active as ITable).activecell,
    data
  }
}
