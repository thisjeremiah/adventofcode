const fs = require('fs')
const txt = fs.readFileSync('./input.txt', 'utf8')
const items = txt.split('\n')

// Part 1

function part1() {
  const length = items[0].length
  const counters = new Array(length).fill(0)
  for (let data of items) {
    for (let i = 0; i < length; i++) {
      if (data[i] === '1') {
        counters[i]++
      } else {
        counters[i]--
      }
    }
  }

  const gammaRate = counters
    .map((count) => {
      if (count > 0) {
        return 1
      } else {
        return 0
      }
    })
    .join('')

  const epsilonRate = counters
    .map((count) => {
      if (count > 0) {
        return 0
      } else {
        return 1
      }
    })
    .join('')

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2) // powerConsumption
}

console.log('part 1:', part1())

// Part 2
function part2() {
  function compute(type) {
    let candidates = [...items]

    let i = 0
    while (candidates.length > 1) {
      let counter = 0
      for (let candidate of candidates) {
        if (candidate[i] === '1') {
          counter++
        } else {
          counter--
        }
      }
      let num
      if (type === 'most common') {
        num = counter === 0 ? 1 : counter > 0 ? 1 : 0
      } else {
        num = counter === 0 ? 0 : counter > 0 ? 0 : 1
      }
      candidates = candidates.filter(
        (candidate) => Number(candidate[i]) === num,
      )
      i++
    }

    return candidates[0]
  }

  const oxygenGeneratorRating = compute('most common')
  const co2ScrubberRating = compute('least common')

  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2) // lifeSupportRating
}

console.log('part 2:', part2())
