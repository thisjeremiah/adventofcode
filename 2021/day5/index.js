const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

let lines = input.split('\n').map((x) => {
  return x.split('->').map((y) => {
    return y.split(',').map((z) => parseInt(z))
  })
})

lines = lines.slice(0, lines.length - 1)

const size = 1000

// Part 1
function part1() {
  const grid = new Array(size).fill(0).map(() => new Array(size).fill(0))

  for (let line of lines) {
    const [coord1, coord2] = line
    const [x1, y1] = coord1
    const [x2, y2] = coord2
    if (x1 === x2) {
      const x = x1
      if (y1 < y2) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y]++
        }
      } else {
        for (let y = y2; y <= y1; y++) {
          grid[x][y]++
        }
      }
    } else if (y1 === y2) {
      const y = y1
      if (x1 < x2) {
        for (let x = x1; x <= x2; x++) {
          grid[x][y]++
        }
      } else {
        for (let x = x2; x <= x1; x++) {
          grid[x][y]++
        }
      }
    }
  }

  let count = 0

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] > 1) {
        count++
      }
    }
  }

  return count
}

console.log('part 1:', part1())

// Part 2
function part2() {
  const grid = new Array(size).fill(0).map(() => new Array(size).fill(0))

  for (let line of lines) {
    const [coord1, coord2] = line
    const [x1, y1] = coord1
    const [x2, y2] = coord2
    if (x1 === x2) {
      const x = x1
      if (y1 < y2) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y]++
        }
      } else {
        for (let y = y2; y <= y1; y++) {
          grid[x][y]++
        }
      }
    } else if (y1 === y2) {
      const y = y1
      if (x1 < x2) {
        for (let x = x1; x <= x2; x++) {
          grid[x][y]++
        }
      } else {
        for (let x = x2; x <= x1; x++) {
          grid[x][y]++
        }
      }
    } else {
      const coords = getMarkedCoords(coord1, coord2)
      for (let coord of coords) {
        grid[coord[0]][coord[1]]++
      }
    }
  }

  let count = 0

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] > 1) {
        count++
      }
    }
  }

  return count
}

function getMarkedCoords(coord1, coord2) {
  const [x1, y1] = coord1
  const [x2, y2] = coord2
  const coords = []
  let y = y1
  for (let x = x1; x1 < x2 ? x <= x2 : x >= x2; x1 < x2 ? x++ : x--) {
    coords.push([x, y])
    if (x === x2 && y === y2) {
      return coords
    }
    if (y1 < y2) {
      y++
    } else {
      y--
    }
  }

  return []
}

console.log('part 2:', part2())
