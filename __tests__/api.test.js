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

  /* ------- STAFF ENDPOINTS ------- */
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
  /* ------- POST STAFF ENDPOINTS ------- */
  describe('POST /staff', () => {
    test('status 201: staff member created', () => {
      return request(app)
        .post('/api/staff')
        .send({
          employee_name: 'andrea catania',
          role: 'junior software engineer and mentor',
          campus: 'manchester',
          team: 'classroom',
          start_date: '2021-09-27',
          event_id: null,
          holidays_left: 20,
          absences: 0,
          pdp_scheme: 'Flutter course',
          computer_serial: 'not#a72serial',
          fob_serial: 'openSn0th1ng',
          notes:
            'Apart from the roads, the irrigation and the sanitization; what did the Romans do for us?',
        })
        .expect(201)
        .then(({ body: { employee } }) => {
          expect(employee[0]).toEqual(
            expect.objectContaining({
              staff_id: 7,
              employee_name: 'andrea catania',
              role: 'junior software engineer and mentor',
              campus: 'manchester',
              team: 'classroom',
              start_date: '2021-09-27',
              event_id: null,
              holidays_left: 20,
              absences: 0,
              pdp_scheme: 'Flutter course',
              computer_serial: 'not#a72serial',
              fob_serial: 'openSn0th1ng',
              notes:
                'Apart from the roads, the irrigation and the sanitization; what did the Romans do for us?',
            })
          );
        });
    });
    test('status 400: invalid body key', () => {
      return request(app)
        .post('/api/staff')
        .send({
          invalid_key: 'andrea catania',
          role: 'junior software engineer and mentor',
          campus: 'manchester',
          team: 'classroom',
          start_date: '2021-09-27',
          event_id: null,
          holidays_left: 20,
          absences: 0,
          pdp_scheme: 'Flutter course',
          computer_serial: 'not#a72serial',
          fob_serial: 'openSn0th1ng',
          notes:
            'Apart from the roads, the irrigation and the sanitization; what did the Romans do for us?',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    // test('status 400: invalid body value', () => {
    //   return request(app).post('/api/staff').send({
    //     employee_name: 1,
    //     role: 'junior software engineer and mentor',
    //     campus: 'manchester',
    //     team: 'classroom',
    //     start_date: '2021-09-27',
    //     event_id: null,
    //     holidays_left: 20,
    //     absences: 0,
    //     pdp_scheme: 'Flutter course',
    //     computer_serial: 'not#a72serial',
    //     fob_serial: 'openSn0th1ng',
    //     notes:
    //       'Apart from the roads, the irrigation and the sanitization; what did the Romans do for us?',
    //   }).expect(400).then(({ body }) => {
    //     expect(body.msg).toBe('Bad request');
    //   });
    // });
  });
});
