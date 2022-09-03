export const calcQuadrant = (sx: number, sy: number, ex: number, ey: number): number => {
  if (sx < ex) return sy < ey ? 4 : 1
  return sy > ey ? 2 : 3
}

export const calcAngle = (sx: number, sy: number, ex: number, ey: number): number => {
  const quadrant = calcQuadrant(sx, sy, ex, ey)
  return quadrant === 1 || quadrant === 4
    ? (Math.atan((ey - sy) / (ex - sx)) * 180) / Math.PI
    : (Math.atan((ey - sy) / (ex - sx)) * 180) / Math.PI + 180
}

export const calcDistanceFromPointToLine = (point: number[], start: number[], end: number[]): number => {
  const A = (end[1] - start[1]) / (end[0] - start[0])
  const C = end[1] - end[0] * A
  return -1 * (A * point[0] - point[1] + C) / Math.sqrt(A ** 2 + 1)
}
