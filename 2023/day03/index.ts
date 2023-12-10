import fs from 'node:fs'

function encodeCoords(x: number, y: number) {
  return `${x}:${y}`
}

function decodeCoords(coords: string) {
  return coords.split(':').map(Number)
}

function isNumber(char: string) {
  return char >= '0' && char <= '9'
}

const symbols = new Set(['*', '+', '-', '$', '#', '@', '=', '%', '/', '&'])

function isSymbol(char: string) {
  return symbols.has(char)
}

function part1({test}: {test?: boolean} = {}) {
  const input = getInput({part: 1, test})

  let sum = 0

  const coords = new Set<string>()

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isSymbol(input[i][j])) {
        const checks = [
          [i - 1, j],
          [i - 1, j - 1],
          [i - 1, j + 1],
          [i + 1, j],
          [i + 1, j - 1],
          [i + 1, j + 1],
          [i, j - 1],
          [i, j + 1]
        ]
        for (let [y, x] of checks) {
          if (y >= input.length || y < 0) continue
          if (x >= input[i].length || x < 0) continue
          if (!isNumber(input[y][x])) continue

          while (x > 0 && isNumber(input[y][x - 1])) {
            x -= 1
          }

          coords.add(encodeCoords(x, y))
        }
      }
    }
  }

  for (let coord of coords) {
    let [x, y] = decodeCoords(coord)
    let num = input[y][x]
    while (x < input[y].length && isNumber(input[y][x + 1])) {
      x += 1
      num += input[y][x]
    }
    sum += Number(num)
  }

  return sum
}

function part2({test}: {test?: boolean} = {}) {
  const input = getInput({part: 2, test})
  let sum = 0

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isSymbol(input[i][j])) {
        const localCoords = new Set<string>()

        const checks = [
          [i - 1, j],
          [i - 1, j - 1],
          [i - 1, j + 1],
          [i + 1, j],
          [i + 1, j - 1],
          [i + 1, j + 1],
          [i, j - 1],
          [i, j + 1]
        ]

        for (let [y, x] of checks) {
          if (y >= input.length || y < 0) continue
          if (x >= input[i].length || x < 0) continue
          if (!isNumber(input[y][x])) continue

          while (x > 0 && isNumber(input[y][x - 1])) {
            x -= 1
          }

          localCoords.add(encodeCoords(x, y))
        }

        if (localCoords.size === 2 && input[i][j] === '*') {
          let gearRatio = 1
          for (let coord of localCoords) {
            let [x, y] = decodeCoords(coord)
            let num = input[y][x]
            while (x < input[y].length && isNumber(input[y][x + 1])) {
              x += 1
              num += input[y][x]
            }
            gearRatio *= Number(num)
          }
          sum += gearRatio
        }
      }
    }
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
    .map((line) => line.split(''))
}

console.log('part 1:', part1())
console.log('part 1 test:', part1({test: true}))
console.log('part 2:', part2())
console.log('part 2 test:', part2({test: true}))
