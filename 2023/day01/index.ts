import fs from 'node:fs'

function part1({test}: {test?: boolean} = {}) {
  return getInput({part: 1, test}).reduce((acc, line) => {
    let first: string | undefined = undefined
    let last: string | undefined = undefined

    for (let char of line) {
      if (char >= '0' && char <= '9') {
        if (!first) {
          first = char
        }
        last = char
      }
    }

    const lineNumber = `${first}${last}`

    return acc + Number(lineNumber)
  }, 0)
}

function part2({test}: {test?: boolean} = {}) {
  return getInput({part: 2, test}).reduce((acc, line) => {
    let first: string | number | undefined = undefined
    let last: string | number | undefined = undefined

    const lineStr = line.join('')

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char >= '0' && char <= '9') {
        if (!first) {
          first = char
        }
        last = char
      } else {
        for (let word of numberWords) {
          if (word === lineStr.substring(i - word.length + 1, i + 1)) {
            const num = numberWordsLookup[word]
            if (!first) {
              first = num
            }
            last = num
          }
        }
      }
    }

    const lineNumber = `${first}${last}`

    return acc + Number(lineNumber)
  }, 0)
}

const numberWordsLookup: Record<string, number> = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}

const numberWords = Object.keys(numberWordsLookup)

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
