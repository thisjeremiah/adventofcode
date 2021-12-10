const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

// Part 1

function part1() {
  const entries = txt
    .split('\n')
    .map((line) =>
      line
        .split('|')
        .map((x) => x.split(' ').filter((x) => x.length))
        .filter((x) => x.length),
    )
    .filter((x) => x.length)
  let count = 0
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const output = entry[0]
    for (let j = 0; j < output.length; j++) {
      // 1
      if (output[j].length === 2) {
        count += 1
      }
      // 4
      if (output[j].length === 4) {
        count += 1
      }
      // 7
      if (output[j].length === 3) {
        count += 1
      }
      // 8
      if (output[j].length === 7) {
        count += 1
      }
    }
  }
  return count
}

console.log('part 1:', part1())

const abcDefs = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',
}

const lenMap = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
}

// Part 2
function part2() {
  const entries = txt
    .split('\n')
    .map((line) =>
      line
        .split('|')
        .map((x) => x.split(' ').filter((x) => x.length))
        .filter((x) => x.length),
    )
    .filter((x) => x.length)
  let result = 0
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    let input = entry[0]
    let output = entry[1]

    const mappings = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
    }

    let encodedDigits = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    }

    for (let j = 0; j < input.length; j++) {
      const encodedDigit = input[j]
      if ([2, 4, 3, 7].indexOf(encodedDigit.length) >= 0) {
        const digit = lenMap[encodedDigit.length]
        encodedDigits[digit] = encodedDigit
        const abcDef = abcDefs[digit]
        for (let c of encodedDigit) {
          let result = []
          for (let k of abcDef) {
            // if list exists, only add characters that are in both
            if (mappings[c].length > 0) {
              if (mappings[c].indexOf(k) >= 0) {
                result.push(k)
              }
              // if nothing in list, add characters
            } else {
              result.push(k)
            }
          }
          mappings[c] = result
        }
      }
    }

    input = input.filter((line) => [2, 4, 3, 7].indexOf(line.length) < 0)

    // diff digits 7 and 1
    // determine segment a
    const charA = encodedDigits[7]
      .split('')
      .filter((char) => !encodedDigits[1].includes(char))[0]
    // filter out a
    for (let key of Object.keys(mappings)) {
      mappings[key] = mappings[key].filter((x) => x !== 'a')
    }
    // determine a
    mappings[charA] = ['a']

    // diff digits 4 and 1
    // better determine segments b,d and c,f
    const segsBD = encodedDigits[4]
      .split('')
      .filter((char) => !encodedDigits[1].includes(char))
    // filter out b, d
    for (let key of Object.keys(mappings)) {
      mappings[key] = mappings[key].filter((x) => (x !== 'd') & (x !== 'b'))
    }
    // set b, d
    for (let seg of segsBD) {
      mappings[seg] = ['b', 'd']
    }

    // determine segments c,f
    const segsCf = encodedDigits[1].split('')
    // filter out c, f
    for (let key of Object.keys(mappings)) {
      mappings[key] = mappings[key].filter((x) => (x !== 'c') & (x !== 'f'))
    }
    // set c, f
    for (let seg of segsCf) {
      mappings[seg] = ['c', 'f']
    }

    // determine `0`, length 6
    input
      .filter((x) => x.length === 6)
      .forEach((value) => {
        const missing = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter(
          (x) => !value.includes(x),
        )
        const missingEither = mappings[missing]
        let seg
        let digit
        if (missingEither.includes('e')) {
          seg = 'e'
          digit = 9
        } else if (missingEither.includes('c')) {
          seg = 'c'
          digit = 6
        } else {
          seg = 'd'
          digit = 0
        }

        encodedDigits[digit] = value

        for (let key of Object.keys(mappings)) {
          mappings[key] = mappings[key].filter((x) => x !== seg)
        }

        mappings[missing] = [seg]
      })

    function convert(str) {
      const res = str
        .split('')
        .map((x) => mappings[x][0])
        .sort()
        .join('')
      return res
    }

    function sort(str) {
      return str.split('').sort().join('')
    }

    encodedDigits[2] = input.find((x) => convert(x) === abcDefs[2])
    encodedDigits[3] = input.find((x) => convert(x) === abcDefs[3])
    encodedDigits[5] = input.find((x) => convert(x) === abcDefs[5])

    const code = Number(
      output
        .map((x) => {
          const res = Object.entries(encodedDigits).find(
            ([, value]) => sort(x) === sort(value),
          )
          return res[0]
        })
        .join(''),
    )
    result += code
  }
  return result
}

console.log('part 2:', part2())
