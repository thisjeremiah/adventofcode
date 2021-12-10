const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')
// const txt = fs.readFileSync('./test.txt', 'utf8')
const lines = txt.split('\n')

// Part 1

function part1() {
  let totalSyntaxErrorScore = 0
  for (let line of lines) {
    const score = getScore(line)
    totalSyntaxErrorScore += score
  }
  return totalSyntaxErrorScore
}

const scores = {
  // close
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
  // open
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

const matches = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

function getScore(line) {
  const stack = []
  for (let char of line) {
    if (['{', '(', '[', '<'].includes(char)) {
      stack.push(char)
    } else {
      const open = stack.pop()
      if (char !== matches[open]) {
        return scores[char]
      }
    }
  }
  return 0
}

// assumes matching brackets
function autoCompleteScore(line) {
  const stack = []
  for (let char of line) {
    if (['{', '(', '[', '<'].includes(char)) {
      stack.push(char)
    } else {
      stack.pop()
    }
  }
  let score = 0
  let char
  while ((char = stack.pop())) {
    score *= 5
    score += scores[char]
  }
  return score
}

console.log('part 1:', part1())

// Part 2
function part2() {
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    if (getScore(line)) {
      lines.splice(i, 1)
    }
  }
  let scores = []
  for (let i = 0; i <= lines.length - 1; i++) {
    const line = lines[i]
    const score = autoCompleteScore(line)
    if (score !== 0) {
      scores.push(score)
    }
  }
  return scores.sort((a, b) => a - b)[(scores.length - 1) / 2]
}

console.log('part 2:', part2())
