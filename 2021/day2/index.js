const fs = require('fs')
const txt = fs.readFileSync('./input.txt', 'utf8')
const commands = txt.split('\n').map((line) => line.split(' '))

// Part 1

function part1() {
  let depth = 0
  let position = 0
  for (let [dir, amt] of commands) {
    switch (dir) {
      case 'forward':
        position += Number(amt)
        break
      case 'up':
        depth -= Number(amt)
        break
      case 'down':
        depth += Number(amt)
        break
    }
  }
  return position * depth
}

console.log('part 1:', part1())

// Part 2
function part2() {
  let depth = 0
  let position = 0
  let aim = 0
  for (let [dir, amt] of commands) {
    switch (dir) {
      case 'down':
        aim += Number(amt)
        break
      case 'up':
        aim -= Number(amt)
        break
      case 'forward':
        position += Number(amt)
        depth += aim * Number(amt)
        break
    }
  }
  return position * depth
}

console.log('part 2:', part2())
