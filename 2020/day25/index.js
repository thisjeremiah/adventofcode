const fs = require('fs')

const input = [6929599, 2448427]

// Part 1

function part1() {
  const cardPublicKey = input[0]
  const doorPublicKey = input[1]
  const subjectNum = 7
  const modNum = 20201227

  function computePublicKey(loopSize) {
    return expmod(subjectNum, loopSize, modNum)
  }

  function getLoopSize(publicKey) {
    let loopSize = 1
    while (computePublicKey(loopSize) !== publicKey) {
      loopSize++
    }
    return loopSize
  }

  const doorLoopSize = getLoopSize(doorPublicKey)
  const cardLoopSize = getLoopSize(cardPublicKey)

  const cardEncryptionKey = expmod(doorPublicKey, cardLoopSize, modNum)
  const doorEncryptionKey = expmod(cardPublicKey, doorLoopSize, modNum)

  if (cardEncryptionKey !== doorEncryptionKey) {
    throw new Error('Encryption keys do not match')
  }

  return cardEncryptionKey
}

// Efficiently compute the modular exponentiation of a^b mod m
function expmod(base, exp, mod) {
  if (exp == 0) return 1
  if (exp % 2 == 0) {
    return Math.pow(expmod(base, exp / 2, mod), 2) % mod
  } else {
    return (base * expmod(base, exp - 1, mod)) % mod
  }
}

console.log('part 1:', part1())

// Part 2
function part2() {}

console.log('part 2:', part2())
