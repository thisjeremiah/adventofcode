const fs = require('fs')

// const txt = fs.readFileSync('./test.txt', 'utf8')
const txt = fs.readFileSync('./input.txt', 'utf8')
const paths = txt.split('\n').filter(Boolean)

const graph = {}

for (let path of paths) {
  const [from, to] = path.split('-')
  if (!graph[from]) {
    graph[from] = []
  }
  graph[from].push(to)
  if (!graph[to]) {
    graph[to] = []
  }
  graph[to].push(from)
}

// Part 1

function part1() {
  let completePaths = []

  function traverse(path) {
    if (path[path.length - 1] === 'end') {
      completePaths.push(path)
      return
    }
    const nextPaths = graph[path[path.length - 1]]
    for (let nextPath of nextPaths) {
      if (nextPath === 'start') continue // don't go back to start
      if (isLowercase(nextPath) && path.includes(nextPath)) continue // don't repeat lowercase letters
      traverse([...path, nextPath])
    }
  }

  traverse(['start'])

  return completePaths.length
}

console.log('part 1:', part1())

// Part 2
function part2() {
  let completePaths = []

  function traverse(curr, prev) {
    const path = [...prev, curr]

    // finish traverse at end
    if (curr === 'end') {
      completePaths.push(path)
      return
    }
    const nextPaths = graph[curr]
    for (let next of nextPaths) {
      // don't go back to start
      if (next === 'start') {
        continue
      }

      // don't repeat lowercase letters
      // except one letter, once
      if (isLowercase(next) && path.includes(next) && hasRevisit(path)) {
        continue
      }

      traverse(next, path)
    }
  }

  function hasRevisit(path) {
    let lookup = {}
    for (let curr of path) {
      if (curr === 'start' || !isLowercase(curr)) {
        continue
      }
      if (!lookup[curr]) {
        lookup[curr] = 1
      } else {
        return true
      }
    }
    return false
  }

  traverse('start', [])

  return completePaths.length
}

console.log('part 2:', part2())

function isLowercase(str) {
  return str.toLowerCase() === str
}
