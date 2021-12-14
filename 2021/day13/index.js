const fs = require('fs')
const { argv0 } = require('process')

const txt = fs.readFileSync('./input.txt', 'utf8')
// const txt = fs.readFileSync('./test.txt', 'utf8')
let [coords, folds] = txt.split('\n\n').map((x) => x.split('\n'))

// [number, number][]
coords = coords.map((x) => x.split(',').map(Number))

// ['x' | 'y', number][]
folds = folds.filter(Boolean).map((x) =>
  x
    .split('along ')[1]
    .split('=')
    .map((_) => (_ === 'x' || _ === 'y' ? _ : Number(_))),
)

// console.log('coords', coords.map((x) => x.join(',')).join('|'))
// console.log('folds', folds.map((x) => x.join(',')).join('|'))

function print(grid) {
  let result = ''
  for (let j = 0; j < grid[0].length; j++) {
    let row = ''
    for (let i = 0; i < grid.length; i++) {
      row += grid[i][j]
    }
    result += row + '\n'
  }
  return result
}

function foldCoord(x, y, along, fold) {
  if (along === 'x') {
    return [foldNum(x, fold), y]
  } else {
    return [x, foldNum(y, fold)]
  }
}

function foldNum(num, fold) {
  if (num <= fold) {
    return num
  } else {
    return fold - (num - fold)
  }
}

function foldCoords(coords, fold) {
  return coords.map((coord) => {
    return foldCoord(coord[0], coord[1], fold[0], fold[1])
  })
}

// Part 1

function part1() {
  // console.log('coords', JSON.stringify(coords, null, 2))

  let maxX = coords.reduce((a, b) => Math.max(a, b[0]), 0) + 1
  let maxY = coords.reduce((a, b) => Math.max(a, b[1]), 0) + 1

  let _coords = [...coords]
  for (let i = 0; i < 1; i++) {
    const fold = folds[i]
    _coords = foldCoords(_coords, fold)
    if (fold[0] === 'x') {
      maxX = fold[1]
    } else {
      maxY = fold[1]
    }
  }

  const grid = Array(maxX)
    .fill()
    .map(() => Array(maxY).fill('.'))

  let dots = 0

  for (let coord of _coords) {
    if (grid[coord[0]][coord[1]] === '.') {
      dots += 1
      grid[coord[0]][coord[1]] = '#'
    }
  }

  // console.log('grid')
  // console.log(print(grid))

  return dots
}

console.log('part 1:', part1())

// Part 2
function part2() {
  let maxX = coords.reduce((a, b) => Math.max(a, b[0]), 0) + 1
  let maxY = coords.reduce((a, b) => Math.max(a, b[1]), 0) + 1

  let _coords = [...coords]
  for (let fold of folds) {
    _coords = foldCoords(_coords, fold)
    if (fold[0] === 'x') {
      maxX = fold[1]
    } else {
      maxY = fold[1]
    }
  }

  const grid = Array(maxX)
    .fill()
    .map(() => Array(maxY).fill(' '))

  for (let coord of _coords) {
    if (grid[coord[0]][coord[1]] === ' ') {
      grid[coord[0]][coord[1]] = '█'
    }
  }

  return '\n' + print(grid)
}

console.log('part 2:', part2())
