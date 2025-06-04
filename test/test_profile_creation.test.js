// tests/test_profile_creation.test.js
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../src/server'); // Ensure server.js exports the Express app

// Before each test, clear the cleaners.json file
beforeEach(() => {
  const filePath = path.join(__dirname, '../src/data/cleaners.json');
  fs.writeFileSync(filePath, '[]');
});

describe('POST /api/cleaner', () => {
  test('should create a new cleaner profile', async () => {
    const payload = {
      name: 'Alice Cleaner',
      email: 'alice@example.com',
      description: 'Expert cleaner',
      services: ['Standard', 'Deep Clean'],
      pricePerHour: 25.5
    };

    const res = await request(app).post('/api/cleaner').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('cleaner');
    expect(res.body.cleaner.name).toBe('Alice Cleaner');
    expect(res.body.cleaner.email).toBe('alice@example.com');

    // Verify JSON file was updated
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/cleaners.json')));
    expect(data.length).toBe(1);
    expect(data[0].name).toBe('Alice Cleaner');
  });

  test('should return 400 if name or email is missing', async () => {
    const res = await request(app).post('/api/cleaner').send({ name: '', email: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
