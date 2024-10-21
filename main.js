import express from 'express'

const app = express()

// Global currentToken object
let currentToken;

async function updateToken() {
  try {
    const token = await createRoomToken()
    currentToken = token
    console.log('Token updated:', currentToken)
  } catch (error) {
    console.error('Error updating token:', error)
  }
}

function checkAndUpdateToken() {
  const now = new Date()
  const minutes = now.getMinutes()
  if (minutes === 24 || minutes === 54) {
    updateToken()
  }
}

// Update token immediately on startup
updateToken()

// Check and update token every minute
setInterval(checkAndUpdateToken, 60000)

app.get('/', async (req, res) => {
  res.send(currentToken)
})

async function createRoomToken() {
  let result = await fetch("https://webbouncer-live-v8-0.agario.miniclippt.com/v4/createToken", {
      "method": "POST",
      "body": "\n\u0013\n\u000fEU-London:party\u0012\u0000",
  });
  let token = (await result.json()).token
  return token
}

app.listen(1248, () => {
  console.log('Server is running on http://localhost:1248')
})
