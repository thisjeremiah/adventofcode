const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')
const crabs = txt.split(',').map(Number)

// Part 1

function part1() {
  const max = Math.max(...crabs)

  function getRuns(n, arr) {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += Math.abs(arr[i] - n)
    }
    return result
  }

  const result = { pos: 0, runs: getRuns(0, crabs) }

  for (let pos = 0; pos <= max; pos++) {
    let runs = getRuns(pos, crabs)
    if (runs < result.runs) {
      result.pos = pos
      result.runs = runs
    }
  }

  return result.runs
}

console.log('part 1:', part1())

// Part 2
function part2() {
  const max = Math.max(...crabs)

  function getRuns(n, arr) {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      const x = Math.abs(arr[i] - n)
      result += 0.5 * x * (x + 1)
    }
    return result
  }

  const result = { pos: 0, runs: getRuns(0, crabs) }

  for (let pos = 0; pos <= max; pos++) {
    let runs = getRuns(pos, crabs)
    if (runs < result.runs) {
      result.pos = pos
      result.runs = runs
    }
  }

  return result.runs
}

console.log('part 2:', part2())
