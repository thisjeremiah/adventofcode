const fs = require('fs')

// const txt = fs.readFileSync('./test.txt', 'utf8')
const txt = fs.readFileSync('./input.txt', 'utf8')

const input = txt
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split('').map(Number))

// Part 1

const final = [input.length - 1, input[0].length - 1]

let minCache = calculateInitialMinCache()

console.log('min:', minCache)

function calculateInitialMinCache() {
  let result = 1
  let i = 0
  while (i < input.length - 1) {
    result += input[i][i]
    result += input[i + 1][i]
    i++
  }
  return result
}

function shortestPathToEnd(path) {
  function returnEarly() {
    return pathSum(path) >= minCache
  }

  if (returnEarly()) return

  const prevPath = path[path.length - 1]
  const [x, y] = prevPath

  // const isEven = path.length % 2 === 0

  const dir1 = shortestPathToEndHelper(path, [x + 1, y])
  if (returnEarly()) return
  const dir2 = shortestPathToEndHelper(path, [x, y + 1])
  if (returnEarly()) return
  // const dir1 = shortestPathToEndHelper(path, isEven ? [x + 1, y] : [x, y + 1])
  // const dir2 = shortestPathToEndHelper(path, isEven ? [x, y + 1] : [x + 1, y])

  // const dir3 = shortestPathToEndHelper(path, [x - 1, y])
  // const dir4 = shortestPathToEndHelper(path, [x, y - 1])
  const dir3 = undefined
  const dir4 = undefined

  const paths = [dir1, dir2, dir3, dir4]
  const shortest = paths.filter(Boolean).reduce((acc, path) => {
    if (acc === undefined) {
      return path
    }
    return pathSum(acc) < pathSum(path) ? acc : path
  }, undefined)

  if (shortest) {
    if (pathSum(shortest) < minCache) {
      minCache = pathSum(shortest)
      console.log('min:', minCache)
      return shortest
    } else {
      return
    }
  }
  return shortest
}

function pathSum(path) {
  return path.reduce((acc, [x, y]) => acc + input[x][y], 0)
}

function shortestPathToEndHelper(path, next) {
  if (!inBounds(next)) {
    return undefined
  }
  // if (inPath(next, path)) {
  // throw new Error('in path', next, path)
  // return undefined
  // }
  if (coordEquals(final, next)) {
    return [...path, next]
  }
  const nextPath = [...path, next]
  return shortestPathToEnd(nextPath)
}

function inBounds([x, y]) {
  if (x < 0 || x > input.length - 1) {
    return false
  }
  if (y < 0 || y > input[0].length - 1) {
    return false
  }
  return true
}

function coordEquals(coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1]
}

function inPath(coord, path) {
  return path.some((c) => coordEquals(c, coord))
}

function part1() {
  const path = [[0, 0]]
  shortestPathToEnd(path)
  return minCache - input[0][0]
}

console.log('part 1:', part1())

// Part 2
function part2() {}

console.log('part 2:', part2())
