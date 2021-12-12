const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')
// const txt = fs.readFileSync('./test.txt', 'utf8')

function getInput() {
  return txt
    .split('\n')
    .map((line) => line.split('').map(Number))
    .filter((line) => line.length > 0)
}

function print(arr) {
  let str = ''
  for (let row of arr) {
    let result = ''
    for (let cell of row) {
      result += cell + ''
    }
    result += ''
    str += result + '\n'
  }
  return str
}

// Part 1

function part1() {
  const arr = getInput()

  let flashes = 0

  for (let steps = 1; steps <= 100; steps++) {
    flashes += run(arr)
  }

  return flashes
}

console.log('part 1:', part1())

// Part 2
function part2() {
  const arr = getInput()
  const MAX = arr.length * arr[0].length

  let steps = 1

  while (true) {
    const flashes = run(arr)
    if (flashes === MAX) {
      return steps
    }
    steps += 1
  }
}

console.log('part 2:', part2())

function flash(input, i, j) {
  let result = 1

  const checks = [[i], [j]]

  if (i > 0) {
    checks[0].push(i - 1)
  }
  if (i < input.length - 1) {
    checks[0].push(i + 1)
  }
  if (j > 0) {
    checks[1].push(j - 1)
  }
  if (j < input[i].length - 1) {
    checks[1].push(j + 1)
  }

  for (let _i of checks[0]) {
    for (let _j of checks[1]) {
      if (_i === i && _j === j) continue
      result += step(input, _i, _j)
    }
  }

  return result
}

function run(input) {
  let result = 0

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      result += step(input, i, j)
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      reset(input, i, j)
    }
  }

  return result
}

function step(input, i, j) {
  let result = 0
  if (input[i][j] < 10) {
    input[i][j] += 1
    if (input[i][j] === 10) {
      result += flash(input, i, j)
    }
  }
  return result
}

function reset(input, i, j) {
  if (input[i][j] === 10) {
    input[i][j] = 0
  }
}
