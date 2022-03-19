const request = require('supertest');
const app = require('../app');
const db = require('../db');
const seed = require('../db/seed');
const data = require('../db/data');

afterAll(() => db.end());

beforeEach(() => seed(data));

describe('endpoints', () => {
  xdescribe('ERR: invalid path', () => {
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
  xdescribe('GET /staff', () => {
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

  /* ------- GET STAFF QUERIES ENDPOINTS ------- */
  describe('GET /staff queries', () => {
    test('status 200: query to filter by currentCohort', () => {
      return request(app)
        .get('/api/staff?currentCohort=september-2021')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(2);
          expect(staff[0].employee_name).toBe('kev morel');
          expect(staff[1].employee_name).toBe('rose mullan');
        });
    });
    test('status 404: currentCohort filter value not found', () => {
      return request(app)
        .get('/api/staff?currentCohort=september-2022')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
    test('status 200: query to filter by role', () => {
      return request(app)
        .get('/api/staff?role=junior-software-engineer-and-mentor')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(4);
          expect(staff[0].employee_name).toBe('kev morel');
          expect(staff[1].employee_name).toBe('rose mullan');
          expect(staff[2].employee_name).toBe('sam parry');
          expect(staff[3].employee_name).toBe('dominic harris');
        });
    });
    test('status 404: role filter value not found', () => {
      return request(app)
        .get('/api/staff?role=wild-card')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
    test('status 200: query to filter by campus', () => {
      return request(app)
        .get('/api/staff?campus=manchester')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(3);
          expect(staff[0].employee_name).toBe('kev morel');
          expect(staff[1].employee_name).toBe('rose mullan');
          expect(staff[2].employee_name).toBe('sam parry');
        });
    });
    test('status 404: campus filter value not found', () => {
      return request(app)
        .get('/api/staff?campus=paris')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
    test('status 200: query to filter by team', () => {
      return request(app)
        .get('/api/staff?team=classroom')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(5);
          expect(staff[0].employee_name).toBe('rose mullan');
          expect(staff[1].employee_name).toBe('sam parry');
          expect(staff[2].employee_name).toBe('poonam rajput');
          expect(staff[3].employee_name).toBe('vel georgieva');
          expect(staff[4].employee_name).toBe('dominic harris');
        });
    });
    test('status 404: team filter value not found', () => {
      return request(app)
        .get('/api/staff?team=listo_negotiators')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
    test('status 200: query to filter by pdp_scheme', () => {
      return request(app)
        .get('/api/staff?pdp_scheme=SCRUM-certification')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(3);
          expect(staff[0].employee_name).toBe('rose mullan');
          expect(staff[1].employee_name).toBe('poonam rajput');
          expect(staff[2].employee_name).toBe('vel georgieva');
        });
    });
    test('status 404: pdp_scheme filter value not found', () => {
      return request(app)
        .get('/api/staff?pdp_scheme=jedi_training')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
    test('status 200: query to filter by student', () => {
      return request(app)
        .get('/api/staff?student=12')
        .expect(200)
        .then(({ body: { staff } }) => {
          expect(staff).toHaveLength(2);
          expect(staff[0].employee_name).toBe('vel georgieva');
          expect(staff[1].employee_name).toBe('dominic harris');
        });
    });
    test('status 400: student filter value not valid', () => {
      return request(app)
        .get('/api/staff?student=not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 404: student filter value not found', () => {
      return request(app)
        .get('/api/staff?student=7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
  });

  /* ------- POST STAFF ENDPOINTS ------- */
  xdescribe('POST /staff', () => {
    test('status 201: staff member created', () => {
      return request(app)
        .post('/api/staff')
        .send({
          employee_name: 'andrea catania',
          role: 'junior-software-engineer-and-mentor',
          campus: 'manchester',
          team: 'classroom',
          start_date: Date.now(),
          event_id: null,
          holidays_left: 20,
          absences: 0,
          pdp_scheme: 'Flutter-course',
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
              role: 'junior-software-engineer-and-mentor',
              campus: 'manchester',
              team: 'classroom',
              start_date: expect.any(String),
              event_id: null,
              holidays_left: 20,
              absences: 0,
              pdp_scheme: 'Flutter-course',
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
          start_date: Date.now(),
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
    test('status 400: invalid body value', () => {
      return request(app)
        .post('/api/staff')
        .send({
          employee_name: 'andrea catania',
          role: 'junior software engineer and mentor',
          campus: 'manchester',
          team: 'classroom',
          start_date: Date.now(),
          event_id: null,
          holidays_left: 'NOT-A-NUMBER',
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
  });
});
