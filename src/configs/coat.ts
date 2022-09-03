
const BASE = 'position: absolute; width: 10px; height: 10px; background-color: orange; z-index: 900;'

export const CENTER = 'top: -30px; left: 50%; transform: translateX(-50%); cursor: grab;' + BASE

export const TOP = 'top: -6px; left: 50%; transform: translateX(-50%); cursor: n-resize;' + BASE

export const LEFT = 'top: 50%; left: -6px; transform: translateY(-50%); cursor: e-resize;' + BASE

export const RIGHT = 'top: 50%; right: -6px; transform: translateY(-50%); cursor: w-resize;' + BASE

export const BOTTOM = 'left: 50%; bottom: -6px; transform: translateX(-50%); cursor: s-resize;' + BASE

export const MOVE = 'top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); cursor: move; position: absolute; background-color: orange; width: 30px; height: 30px; border-radius: 100%; opacity: 0.7;'

export const LEFT_TOP = 'top: -6px; left: -6px; cursor: se-resize;' + BASE

export const LEFT_BOTTOM = 'bottom: -6px; left: -6px; cursor: ne-resize;' + BASE

export const RIGHT_TOP = 'top: -6px; right: -6px; cursor: sw-resize;' + BASE

export const RIGHT_BOTTOM = 'bottom: -6px; right: -6px; cursor: se-resize;' + BASE
