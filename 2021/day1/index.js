const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')
const depths = txt.split('\n').map(Number)

// Part 1

function part1() {
  let increases = 0
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      increases++
    }
  }
  return increases
}

console.log('part 1:', part1())

// Part 2
function part2() {
  const SLIDING_WINDOW_SIZE = 3
  let increases = 0
  for (let i = SLIDING_WINDOW_SIZE; i < depths.length; i += 1) {
    const prevWindow = depths.slice(i - SLIDING_WINDOW_SIZE, i)
    const currWindow = depths.slice(i - SLIDING_WINDOW_SIZE + 1, i + 1)
    if (sum(currWindow) > sum(prevWindow)) {
      increases++
    }
  }
  return increases
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

console.log('part 2:', part2())
