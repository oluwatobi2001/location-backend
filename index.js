const express = require("express");
const app = express();
const dotenv = require("dotenv")

dotenv.config({path: '../.env' });

const connectDB  = require("./Config/db")
const authRoute = require("./routes/Auth")
const userRoute = require("./routes/Users")
const notificationRoute = require("./routes/Notifications")
const locationRoute = require("./routes/Location")
const bodyParser = require("body-parser");
const cors = require("cors")

console.log(require("dotenv").config())



  /* app.post("/books", (req, res) => {
      const q = "INSERT INTO users (`username`, `email`,  `password`) VALUES (?)"
      const values = ["Ayomi", "Ayomiii", "1234"]
  db.query(q, [values], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
  })
    })
  
    app.delete("/books/:id", (req, res) => {
        const bookID  = req.params.id

    
    const q = "DELETE FROM users  where id=?";
db.query(q,  [bookID] ,(err, data) => {
    if (err) return res.json(err)
    return res.json(data)
})
    })
app.get("/books", (req, res) => {
    const q = "SELECT * FROM users"
   
db.query(q,  (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
})



    
});

*/

app.use(cors({
origin: '*',
}))
app.use(express.json());
connectDB()
app.use(bodyParser.json());
app.use(bodyParser.json())
app.use("/api/auth", authRoute)
app.use("/api/locations", locationRoute)
app.use("/api/users", userRoute)
app.use("/api/notification", notificationRoute)

app.listen(process.env.PORT  || 5000, ()=> {
    console.log("tobi is king");
})

