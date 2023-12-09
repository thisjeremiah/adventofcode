import fs from 'node:fs'

function getGraph(input: string[]) {

}

function part1({test}: {test?: boolean} = {}) {
  const input = getInput({part: 1, test})
  let sum = 0

  return sum
}

function part2({test}: {test?: boolean} = {}) {
  const input = getInput({part: 2, test})
  let sum = 0

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
