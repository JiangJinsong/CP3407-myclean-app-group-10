// tests/test_booking_submission.test.js
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../src/server');

// Before each test, clear the bookings.json file
beforeEach(() => {
  const filePath = path.join(__dirname, '../src/data/bookings.json');
  fs.writeFileSync(filePath, '[]');
});

describe('POST /api/booking', () => {
  test('should create a new booking', async () => {
    // First, add one cleaner so cleanerId is valid (optional step)
    const cleanerDataPath = path.join(__dirname, '../src/data/cleaners.json');
    fs.writeFileSync(cleanerDataPath, JSON.stringify([{ id: 1, name: 'Bob', email: 'bob@example.com', description: '', services: [], pricePerHour: 20 }]));

    const payload = {
      customerName: 'Charlie Customer',
      customerEmail: 'charlie@example.com',
      date: '2025-06-05',
      startTime: '10:00',
      endTime: '12:00',
      cleanerId: 1,
      amount: 50.0
    };

    const res = await request(app).post('/api/booking').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body.booking).toHaveProperty('id');
    expect(res.body.booking.customerName).toBe('Charlie Customer');

    // Verify JSON file was updated
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/bookings.json')));
    expect(data.length).toBe(1);
    expect(data[0].customerEmail).toBe('charlie@example.com');
  });

  test('should return 400 if any field is missing', async () => {
    const res = await request(app).post('/api/booking').send({ date: '2025-06-05' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
