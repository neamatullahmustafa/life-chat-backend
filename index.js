const  express = require('express');
const cors = require('cors');
const app = express();
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1912317",
  key: "5f137363a1a9a7a57eea",
  secret: "16e0c00a8f1b4c1c63e7",
  cluster: "eu",
  useTLS: true
});

app.use(cors({origin:['http://localhost:3000', 'http://localhost:8080','http://localhost:4200']}))
app.use(express.json());
const port = 8000

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/message', async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Username and message are required.' });
  }

  await pusher.trigger("chat", "message", { username, message, date: new Date().toISOString() });
  res.json({ success: true });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))