import fs from 'node:fs'

function computePoints(num: number): number {
  if (num < 2) return num
  return computePoints(num - 1) * 2
}

function part1({test}: {test?: boolean} = {}) {
  const input = getInput({part: 1, test})
  let sum = 0

  for (let [winning, numbers] of input) {
    const winningSet = new Set(winning)
    const matchingNumbers = new Set<number>()

    for (let number of numbers) {
      if (winningSet.has(number)) {
        matchingNumbers.add(number)
      }
    }

    sum += computePoints(matchingNumbers.size)
  }

  return sum
}

function part2({test}: {test?: boolean} = {}) {
  const input = getInput({part: 2, test})
  let sum = 0

  const copies = new Map<number, number>()

  let i = 0
  for (let [winning, numbers] of input) {
    const winningSet = new Set(winning)
    const matchingNumbers = new Set<number>()

    for (let number of numbers) {
      if (winningSet.has(number)) {
        matchingNumbers.add(number)
      }
    }

    const numCopies = (copies.get(i) || 0)
    sum += numCopies + 1

    for (let j = 1; j <= matchingNumbers.size; j++) {
      if (i + j < input.length) {
        copies.set(i + j, (copies.get(i + j) || 0) + numCopies + 1)
      }
    }

    i += 1
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
    .map((line) => {
      const [, allNumbers] = line.split(':')
      const [winning, numbers] = allNumbers.split(' | ')
      return [
        winning.split(' ').filter(Boolean).map(Number),
        numbers.split(' ').filter(Boolean).map(Number)
      ]
    })
}

console.log('part 1:', part1())
console.log('part 1 test:', part1({test: true}))
console.log('part 2:', part2())
console.log('part 2 test:', part2({test: true}))
