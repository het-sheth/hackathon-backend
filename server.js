require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({limit:'64kb'}));
app.use(express.static(require('node:path').join(__dirname,'dist')));

const exercises = [
  {
    id: 1,
    title: 'C major scale, slow',
    targetSkill: 'pitch_accuracy',
    difficulty: 1,
    tempoBpm: 60,
    notes: [
      { pitch: 'C4', startBeat: 0, durationBeats: 1 },
      { pitch: 'D4', startBeat: 1, durationBeats: 1 }
    ]
  }
];
const attempts = [];

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/exercises', (req, res) => res.json(exercises));

app.post('/attempts', (req, res) => {
  const attempt = { id: attempts.length + 1, ...req.body, playedAt: new Date() };
  attempts.push(attempt);
  res.status(201).json(attempt);
});

app.get('/attempts', (req, res) => res.json(attempts));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));