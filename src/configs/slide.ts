export interface ISlide {
  name: string
  value: {
    in: string
    out: string
  }
}

export const SLIDE: Array<ISlide> = [
  {
    name: '无',
    value: {
      in: '',
      out: ''
    }
  },
  {
    name: '淡出淡入',
    value: {
      in: 'fadeIn',
      out: 'fadeOut'
    }
  },
  {
    name: '左右推移',
    value: {
      in: 'slideInLeft',
      out: 'slideOutRight'
    }
  },
  {
    name: '上下推移',
    value: {
      in: 'slideInDown',
      out: 'slideOutUp'
    }
  }
]
