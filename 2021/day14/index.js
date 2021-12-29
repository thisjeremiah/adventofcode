const fs = require('fs')

// const txt = fs.readFileSync('./test.txt', 'utf8')
const txt = fs.readFileSync('./input.txt', 'utf8')

const [polymerInput, pairInput] = txt.split('\n\n')

const polymerTemplate = polymerInput.split('')

const pairInsertionRules = pairInput
  .split('\n')
  .filter(Boolean)
  .reduce((acc, str) => {
    const [a, b] = str.split(' -> ')
    return {
      ...acc,
      [a]: b,
    }
  }, {})

function computeResult(arr) {
  const cache = {}

  for (let item of arr) {
    if (cache[item]) {
      cache[item]++
    } else {
      cache[item] = 1
    }
  }

  const minKey = Object.keys(cache).reduce((acc, key) => {
    if (cache[key] < (acc === -1 ? Infinity : cache[acc])) {
      return key
    }
    return acc
  }, -1)

  const maxKey = Object.keys(cache).reduce((acc, key) => {
    if (cache[key] > (cache[acc] || 0)) {
      return key
    }
    return acc
  }, '')

  const max = cache[maxKey]
  const min = cache[minKey]

  return max - min
}

function computeResultGraph(graph, extraChar) {
  const cache = { [extraChar]: 1 }

  for (let key of Object.keys(graph)) {
    const amt = Object.values(graph[key]).reduce((acc, val) => acc + val, 0)

    if (cache[key]) {
      cache[key] += amt
    } else {
      cache[key] = amt
    }
  }

  const minKey = Object.keys(cache).reduce((acc, key) => {
    if (cache[key] < (acc === -1 ? Infinity : cache[acc])) {
      return key
    }
    return acc
  }, -1)

  const maxKey = Object.keys(cache).reduce((acc, key) => {
    if (cache[key] > (cache[acc] || 0)) {
      return key
    }
    return acc
  }, '')

  const max = cache[maxKey]
  const min = cache[minKey]

  return max - min
}

// Part 1

function part1() {
  const template = [...polymerTemplate]

  for (let step = 1; step <= 10; step++) {
    for (let i = 0; i < template.length - 1; i++) {
      const curr = template[i]
      const next = template[i + 1]
      const insert = pairInsertionRules[curr + next]
      if (insert) {
        template.splice(i + 1, 0, insert)
        i++
      }
    }
  }

  return computeResult(template)
}

console.log('part 1:', part1())

// Part 2
function part2() {
  const template = [...polymerTemplate]

  const graph = {}
  const extraChar = template[template.length - 1]

  for (let i = 0; i < template.length - 1; i++) {
    const curr = template[i]
    const next = template[i + 1]
    if (graph[curr]) {
      if (graph[curr][next]) {
        graph[curr][next]++
      } else {
        graph[curr][next] = 1
      }
    } else {
      graph[curr] = { [next]: 1 }
    }
  }

  for (let step = 1; step <= 40; step++) {
    const changes = []

    for (let left of Object.keys(graph)) {
      for (let [right, value] of Object.entries(graph[left])) {
        const insert = pairInsertionRules[left + right]
        if (insert) {
          // insert `value` times
          changes.push([left, insert, value])
          changes.push([insert, right, value])

          // remove `value` times
          changes.push([left, right, -value])
        }
      }
    }

    // apply changes
    for (let change of changes) {
      const [left, right, value] = change
      if (graph[left]) {
        graph[left][right] = (graph[left][right] || 0) + value
      } else {
        graph[left] = { [right]: value }
      }
      if (graph[left][right] === 0) {
        delete graph[left][right]
      }
    }
  }

  return computeResultGraph(graph, extraChar)
}

console.log('part 2:', part2())
