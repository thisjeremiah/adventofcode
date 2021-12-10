const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

// Part 1

function part1() {
  const ages = txt.split(',').map(Number)
  const days = 80
  const count = 8
  for (let day = 0; day < days; day++) {
    const len = ages.length
    for (let i = 0; i < len; i++) {
      const age = ages[i]
      if (age === 0) {
        ages[i] = count - 2
        ages.push(count)
      } else {
        ages[i] -= 1
      }
    }
  }
  return ages.length
}

console.log('part 1:', part1())

function part2() {
  const COUNT = 8
  const counts = new Array(COUNT + 1).fill(0)
  const ages = txt.split(',').map(Number)
  for (let age of ages) {
    counts[age] += 1
  }
  const days = 256
  for (let day = 0; day < days; day++) {
    let shifted = 0

    for (let age = 0; age < counts.length; age++) {
      if (age === 0) {
        shifted += counts[age]
        counts[age] = 0
      } else {
        counts[age - 1] = counts[age]
        counts[age] = 0
      }
    }

    counts[COUNT - 2] += shifted
    counts[COUNT] = shifted
  }
  return counts.reduce((a, b) => a + b)
}

console.log('part 2:', part2())
