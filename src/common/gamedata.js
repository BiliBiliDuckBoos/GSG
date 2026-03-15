import storage from '@system.storage'

let gameStats = {
  totalGames: 0,
  successfulExtracts: 0,
  failedExtracts: 0
}

function loadStats(callback) {
  storage.get({
    key: 'gameStats',
    success: function(data) {
      if (data) {
        try {
          gameStats = JSON.parse(data)
        } catch (e) {
          gameStats = { totalGames: 0, successfulExtracts: 0, failedExtracts: 0 }
        }
      }
      if (callback) callback(gameStats)
    },
    fail: function() {
      if (callback) callback(gameStats)
    }
  })
}

function saveStats() {
  storage.set({
    key: 'gameStats',
    value: JSON.stringify(gameStats)
  })
}

function recordGame(success) {
  storage.get({
    key: 'gameStats',
    success: function(data) {
      if (data) {
        try {
          gameStats = JSON.parse(data)
        } catch (e) {}
      }
      gameStats.totalGames++
      if (success) {
        gameStats.successfulExtracts++
      } else {
        gameStats.failedExtracts++
      }
      storage.set({
        key: 'gameStats',
        value: JSON.stringify(gameStats)
      })
    },
    fail: function() {
      gameStats.totalGames++
      if (success) {
        gameStats.successfulExtracts++
      } else {
        gameStats.failedExtracts++
      }
      storage.set({
        key: 'gameStats',
        value: JSON.stringify(gameStats)
      })
    }
  })
}

function getStats() {
  return gameStats
}

export default {
  loadStats,
  saveStats,
  recordGame,
  getStats
}
