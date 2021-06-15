const express = require("express")
const cors = require("cors")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(express.json())


app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.get('/', (req, res) => {
  res.send(`Welcome ${`\n`} View player at ${process.env.CLIENT_ID} , ${process.env.CLIENT_SECRET}`)
})

var port = process.env.PORT || 3001;
app.listen(port, console.log(`Server running on ${port}`))