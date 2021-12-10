const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')
const map = txt
  .split('\n')
  .map((line) => line.split('').map(Number))
  .filter((x) => x.length > 0)

// Part 1

function part1() {
  let result = 0
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const cell = map[i][j]
      const top = map[i - 1]?.[j] ?? Math.Infinity
      const bottom = map[i + 1]?.[j] ?? Math.Infinity
      const left = map[i][j - 1] ?? Math.Infinity
      const right = map[i][j + 1] ?? Math.Infinity
      if (cell < bottom && cell < top && cell < left && cell < right) {
        result += cell + 1
      }
    }
  }
  return result
}

console.log('part 1:', part1())

// Part 2
function part2() {
  const cache = {}
  const basins = {}

  function setCache(i, j, value) {
    cache[i] = {
      ...(cache[i] ?? {}),
      [j]: value,
    }
    if (value >= 0) {
      basins[value] = basins[value] ? basins[value] + 1 : 1
    }
  }

  function checkBasin(i, j, basin) {
    if (i < 0 || j < 0 || i >= map.length || j >= map[0].length) {
      return false
    }
    if (cache[i]?.[j] !== undefined) {
      return false
    }
    if (map[i][j] === 9) {
      setCache(i, j, -1)
      return false
    }
    setCache(i, j, basin)
    checkBasin(i - 1, j, basin)
    checkBasin(i + 1, j, basin)
    checkBasin(i, j - 1, basin)
    checkBasin(i, j + 1, basin)
    return true
  }

  let basin = 1
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (checkBasin(i, j, basin)) {
        basin += 1
      }
    }
  }

  const result = Object.entries(basins)
    .sort((a, b) => b[1] - a[1])
    .map(([, value]) => value)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)

  return result
}

console.log('part 2:', part2())
