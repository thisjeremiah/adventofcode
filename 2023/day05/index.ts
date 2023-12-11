import fs from 'node:fs'

function part1(input: Input) {
  const [seeds, ...maps] = input

  let curr = seeds[0]
  for (let map of maps) {
    const next = [...curr]
    for (let i = 0; i < curr.length; i++) {
      for (let [destRangeStart, sourceRangeStart, rangeLength] of map) {
        if (
          curr[i] >= sourceRangeStart &&
          curr[i] < sourceRangeStart + rangeLength
        ) {
          const diff = curr[i] - sourceRangeStart
          next[i] = destRangeStart + diff
        }
      }
    }
    curr = [...next]
  }

  return Math.min(...curr)
}

function part2(input: Input) {
  const [seeds, ...maps] = input

  const curr = seeds[0]
  let ranges: [number, number][] = []

  for (let i = 0; i < curr.length; i += 2) {
    ranges.push([curr[i], curr[i + 1]])
  }

  for (let map of maps) {
    const next: [number, number][] = [...ranges]

    let nextLength = next.length

    for (let i = 0; i < nextLength; i++) {
      for (let [dest, source, rangeSize] of map) {
        const [initial, size] = next[i]

        if (!size) continue

        const startInRange = (
          initial >= source &&
          initial < source + rangeSize
        )

        const endInRange = (
          initial + (size - 1) >= source &&
          initial + (size - 1) < source + rangeSize
        )

        if (startInRange && endInRange) {
          const diff = initial - source
          next[i] = [0, 0] // remove from list
          next.push([dest + diff, size])
        } else if (startInRange) {
          const diff = initial - source
          const rest = size - (rangeSize - diff)
          next.push([dest + diff, size - rest])
          next[i] = [initial + diff, rest]
        } else if (endInRange) {
          const diff = source - initial
          next[i] = [initial, diff]
          next.push([dest, size - diff])
        } else if (
          initial < source &&
          (initial + size) >= source + rangeSize
        ) {
          const diff = source - initial
          next.push([source, rangeSize])

          next[i] = [initial, diff]
          next.splice(i + 1, 0, [
            initial + (diff + rangeSize),
            size - (diff + rangeSize)
          ])
          nextLength += 1
        }
      }
    }

    ranges = [...next].filter(([_, size]) => size > 0)
  }

  return Math.min(...ranges.map(range => range[0]))
}

type Input = ReturnType<typeof getInput>

function getInput({
  part,
  test = false
}: {
  part: 1 | 2;
  test?: boolean;
}) {
  const file = test ? `test_${part}.txt` : `input_${part}.txt`
  const filename = `${__dirname}/${file}`
  const maps = fs.readFileSync(filename, 'utf8')
    .split('\n\n')
    .filter(Boolean)
    .map((line) => {
      const [first, ...rest] = line.trim().split('\n')
      const [_name, ...firstRest] = first.split(':').filter(Boolean)

      return [
        ...firstRest
          .map(s =>
            s.split(' ').filter(Boolean).map(Number)
          ),
        ...rest.map(s =>
          s.split(' ').filter(Boolean).map(Number)
        ),
      ]
    })

  return maps
}

console.log('part 1:', part1(getInput({part: 1})))
console.log('part 1 test:', part1(getInput({part: 1, test: true})))
console.log('part 2:', part2(getInput({part: 2})))
console.log('part 2 test:', part2(getInput({part: 2, test: true})))
