const BASE = 'position: absolute; background-color: #fff; border: 1px solid #000; '

const T_B_BASE = 'width: 30px; height: 6px; left: 50%; transform: translateX(-50%); ' + BASE

export const CLIP_TOP = 'top: 0px; ' + T_B_BASE

export const CLIP_BOTTOM = 'bottom: 0px; ' + T_B_BASE

const L_R_BASE = 'top: 50%; width: 6px; height: 30px; transform: translateY(-50%); ' + BASE

export const CLIP_LEFT = 'left: 0px; ' + L_R_BASE

export const CLIP_RIGHT = 'right: 0px; ' + L_R_BASE
