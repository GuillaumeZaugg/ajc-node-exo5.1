const PORT = 3000

const express = require("express")
const app = express()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/chinook.db'
});
const Artist = sequelize.define('Artist', {
  ArtistId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Name: DataTypes.STRING
}, { timestamps: false })

app.use(express.json())

// Get all artists
// curl http://localhost:3000/artists
app.get("/artists", async (req, res) => {
  try {
    const artist = await Artist.findAll();

    res.json(artist)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

// Create a new artist
// curl -X POST http://localhost:3000/artists -H "Content-Type: application/json" -d '{ "Name": "toto" }'
app.post("/artists", async (req, res) => {
  const { Name } = req.body
  try {
    const newArtist = await Artist.create({ Name });

    res.json(newArtist)
  } catch (e) {
    res.sendStatus(422)
  }
})

app.listen(PORT, () => {
  console.log("[+] Server running on port " + PORT)
  console.log("http://localhost:" + PORT)
})
