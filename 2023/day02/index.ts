import fs from 'node:fs'

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14
}

function part1({test}: {test?: boolean} = {}) {
  const input = getInput({part: 1, test})
  let sum = 0

  for (const section of input) {
    let valid = true
    const id = Number(section[0].slice(4))
    const games = section[1].split('; ')

    for (let game of games) {
      const subsets = game.split(', ')
      for (let subset of subsets) {
        const [num, type] = subset.trim().split(' ') as [string, 'red' | 'green' | 'blue']
        if (maxCubes[type] < Number(num)) {
          valid = false
        }
      }
    }

    if (valid) {
      sum += id
    }
  }

  return sum
}

function part2({test}: {test?: boolean} = {}) {
  const input = getInput({part: 2, test})

  let sum = 0

  for (const section of input) {
    const games = section[1].split('; ')

    const minCubes = {
      red: 0,
      blue: 0,
      green: 0
    }

    for (let game of games) {
      const subsets = game.split(', ')

      for (let subset of subsets) {
        const [num, type] = subset.trim().split(' ') as [string, 'red' | 'blue' | 'green']
        if (Number(num) > minCubes[type]) {
          minCubes[type] = Number(num)
        }
      }
    }

    const power = minCubes.red * minCubes.green * minCubes.blue

    sum += power
  }

  return sum
}

function getInput({
  part,
  test = false
}: {
  part: 1 | 2;
  test?: boolean;
}) {
  const file = test ? `test_${part}.txt` : `input_${part}.txt`
  const filename = `${__dirname}/${file}`
  return fs.readFileSync(filename, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(':'))
}

console.log('part 1:', part1())
console.log('part 1 test:', part1({test: true}))
console.log('part 2:', part2())
console.log('part 2 test:', part2({test: true}))
