// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Helpers to read/write in-memory data (JSON files)
function readData(fileName) {
  const filePath = path.join(__dirname, 'data', fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
}

function writeData(fileName, data) {
  const filePath = path.join(__dirname, 'data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Route: GET /api/cleaner (list all) ────────────────────────────────────────
app.get('/api/cleaner', (req, res) => {
  const cleaners = readData('cleaners.json');
  res.json(cleaners);
});

// ─── Route: POST /api/cleaner (create/update) ──────────────────────────────────
app.post('/api/cleaner', (req, res) => {
  const { name, email, description, services, pricePerHour } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const cleaners = readData('cleaners.json');
  const newId = cleaners.length ? cleaners[cleaners.length - 1].id + 1 : 1;
  const cleaner = {
    id: newId,
    name,
    email,
    description: description || '',
    services: services || [],
    pricePerHour: pricePerHour || 0
  };
  cleaners.push(cleaner);
  writeData('cleaners.json', cleaners);
  return res.status(201).json({ message: 'Cleaner profile created.', cleaner });
});

// ─── Route: GET /api/availability (list all) ───────────────────────────────────
app.get('/api/availability', (req, res) => {
  const slots = readData('availability.json');
  res.json(slots);
});

// ─── Route: POST /api/availability (add slot) ──────────────────────────────────
app.post('/api/availability', (req, res) => {
  const { date, startTime, endTime, cleanerId } = req.body;
  if (!date || !startTime || !endTime || !cleanerId) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const slots = readData('availability.json');
  const newId = slots.length ? slots[slots.length - 1].id + 1 : 1;
  const slot = { id: newId, date, startTime, endTime, cleanerId };
  slots.push(slot);
  writeData('availability.json', slots);
  return res.status(201).json({ message: 'Availability slot added.', slot });
});

// ─── Route: POST /api/booking (submit booking) ─────────────────────────────────
app.post('/api/booking', (req, res) => {
  const { customerName, customerEmail, date, startTime, endTime, cleanerId, amount } = req.body;
  if (!customerName || !customerEmail || !date || !startTime || !endTime || !cleanerId || !amount) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const bookings = readData('bookings.json');
  const newId = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
  const booking = {
    id: newId,
    customerName,
    customerEmail,
    date,
    startTime,
    endTime,
    cleanerId,
    amount,
    status: 'pending'
  };
  bookings.push(booking);
  writeData('bookings.json', bookings);

  // Simulate sending a booking notification (we just log to console)
  console.log(`Notification: New booking #${newId} for Cleaner ${cleanerId}`);

  return res.status(201).json({ message: 'Booking submitted.', booking });
});

// ─── Route: POST /api/payment (mock payment) ───────────────────────────────────
app.post('/api/payment', (req, res) => {
  const { bookingId, cardNumber, expiry, cvc } = req.body;
  if (!bookingId || !cardNumber || !expiry || !cvc) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  // In a real app, you would verify card validity, charge, etc. Here we just simulate success.
  console.log(`Payment received for booking #${bookingId}`);
  res.json({ message: 'Payment successful (mock).' });
});

// ─── Fallback: serve index.html at root ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start server ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`MyClean App stub server running at http://localhost:${PORT}`);
});

module.exports = app;