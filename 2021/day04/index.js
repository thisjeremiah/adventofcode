const fs = require('fs')
const input1 = fs.readFileSync('./input1.txt', 'utf8')
const input2 = fs.readFileSync('./input2.txt', 'utf8')

const calledNumbers = input1.split(',').map(Number)
const boards = input2
  .split('\n\n')
  .map((board) =>
    board.split('\n').map((row) =>
      row
        .split(' ')
        .filter((x) => x !== '')
        .map((x) => ({
          value: Number(x),
          isCalled: false,
        })),
    ),
  )
  .slice(0, 100)

// Part 1
function part1() {
  function getWinningBoard() {
    for (let num of calledNumbers) {
      // set called numbers
      for (let board of boards) {
        for (let i = 0; i < board[0].length; i++) {
          for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.value === num) {
              cell.isCalled = true
            }
          }
        }
      }

      // check if rows or cols are filled
      for (let board of boards) {
        for (let i = 0; i < board[0].length; i++) {
          // row complete
          if (board[i].every((cell) => cell.isCalled)) {
            return [board, num]
          }

          // col complete
          let colComplete = true
          for (let j = 0; j < board[0].length; j++) {
            if (!board[j][i].isCalled) {
              colComplete = false
            }
          }
          if (colComplete) return [board, num]
        }
      }
    }
  }

  function sumOfAllUnmarkedCells(board) {
    let sum = 0
    for (let row of board) {
      for (let cell of row) {
        if (!cell.isCalled) {
          sum += cell.value
        }
      }
    }
    return sum
  }

  const [board, num] = getWinningBoard()
  return sumOfAllUnmarkedCells(board) * num
}

console.log('part 1:', part1())

// Part 2

function part2() {
  function getWinningBoard() {
    for (let num of calledNumbers) {
      // set called numbers
      for (let board of boards) {
        for (let i = 0; i < board[0].length; i++) {
          for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.value === num) {
              cell.isCalled = true
            }
          }
        }
      }

      // check if rows or cols are filled
      let deleteIndices = []
      for (let k = 0; k < boards.length; k++) {
        const board = boards[k]
        for (let i = 0; i < board[0].length; i++) {
          // row complete
          if (board[i].every((cell) => cell.isCalled)) {
            deleteIndices.push(k)
          }

          // col complete
          let colComplete = true
          for (let j = 0; j < board[0].length; j++) {
            if (!board[j][i].isCalled) {
              colComplete = false
            }
          }
          if (colComplete) {
            deleteIndices.push(k)
          }
        }
      }

      if (boards.length === 1 && deleteIndices.length) {
        return [boards[0], num]
      }

      // delete boards
      for (let i = deleteIndices.length - 1; i >= 0; i--) {
        boards.splice(deleteIndices[i], 1)
      }
    }
  }

  function sumOfAllUnmarkedCells(board) {
    let sum = 0
    for (let row of board) {
      for (let cell of row) {
        if (!cell.isCalled) {
          sum += cell.value
        }
      }
    }
    return sum
  }

  const [board, num] = getWinningBoard()
  return sumOfAllUnmarkedCells(board) * num
}

console.log('part 2:', part2())
