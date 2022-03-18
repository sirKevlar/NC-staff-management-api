const request = require('supertest');
const app = require('../app');
const db = require('../db');
const seed = require('../db/seed');
const data = require('../db/data');

afterAll(() => db.end());

beforeEach(() => seed(data));

describe('endpoints', () => {
  describe('ERR: invalid path', () => {
    test('status 404: path not found', () => {
      return request(app)
        .get('/api/not-a-valid-path')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('path not found');
        });
    });
  });

  describe('GET /staff', () => {
    test('status 200: fetches array of staff objects', () => {
      return request(app)
        .get('/api/staff')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(6);
          staff.forEach((staffMember) => {
            expect.objectContaining({
              staff_id: expect.any(Number),
              employee_name: expect.any(String),
              role: expect.any(String),
              campus: expect.any(String),
              team: expect.any(String),
              start_date: expect.any(String),
              event_id: expect.any(Number),
              holidays_left: expect.any(Number),
              absences: expect.any(Number),
              pdp_scheme: expect.any(String),
              computer_serial: expect.any(String),
              fob_serial: expect.any(String),
              notes: expect.any(String),
            });
          });
        });
    });
  });
});
