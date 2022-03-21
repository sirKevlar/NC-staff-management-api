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
  /* -------------------------------
   ------- STAFF ENDPOINTS ------- 
   ------------------------------- */
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
  xdescribe('GET /staff queries', () => {
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
    test('status 400: invalid query key', () => {
      return request(app)
        .get('/api/staff?invalid=key')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
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
          expect(employee).toEqual(
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
  /* ------- GET STAFF BY ID ENDPOINTS ------- */
  xdescribe('GET /staff/:staff_id', () => {
    test('status 200: fetches single employee object', () => {
      return request(app)
        .get('/api/staff/1')
        .expect(200)
        .then(({ body: { employee } }) => {
          expect(employee).toEqual(
            expect.objectContaining({
              staff_id: 1,
              employee_name: 'kev morel',
              role: 'junior-software-engineer-and-mentor',
              campus: 'manchester',
              team: 'classroom-clown',
              start_date: expect.any(String),
              event_id: 1,
              holidays_left: 20,
              absences: 0,
              pdp_scheme: 'AWS-cloud-certification',
              computer_serial: 'not#a12serial',
              fob_serial: 'open2n0th1ng',
              notes: 'Not the messiah, just a very naughty boy',
            })
          );
        });
    });
    test('status 400: invalid staff_id', () => {
      return request(app)
        .get('/api/staff/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 404: valid but non existent id', () => {
      return request(app)
        .get('/api/staff/7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
  /* ------- PATCH STAFF BY ID ENDPOINTS ------- */
  xdescribe('PATCH /staff/:staff_id', () => {
    test('status 200: returns patched employee object', () => {
      return request(app)
        .patch('/api/staff/1')
        .send({ holidays_left: 15 })
        .expect(200)
        .then(({ body: { employee } }) => {
          expect(employee).toEqual(
            expect.objectContaining({
              staff_id: 1,
              employee_name: 'kev morel',
              role: 'junior-software-engineer-and-mentor',
              campus: 'manchester',
              team: 'classroom-clown',
              start_date: expect.any(String),
              event_id: 1,
              holidays_left: 15,
              absences: 0,
              pdp_scheme: 'AWS-cloud-certification',
              computer_serial: 'not#a12serial',
              fob_serial: 'open2n0th1ng',
              notes: 'Not the messiah, just a very naughty boy',
            })
          );
        });
    });
    test('status 400: invalid value on patch body', () => {
      return request(app)
        .patch('/api/staff/1')
        .send({ holidays_left: 'not-a-number' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 400: invalid key on patch body', () => {
      return request(app)
        .patch('/api/staff/1')
        .send({ invalid_key: 15 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* ------- DELETE STAFF BY ID ENDPOINTS ------- */
  xdescribe('DELETE /staff/:staff_id', () => {
    test('status 204: employee deleted', () => {
      return request(app).delete('/api/staff/1').expect(204);
    });
    test('status 400: invalid staff_id', () => {
      return request(app)
        .delete('/api/staff/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 404: valid but non existent id', () => {
      return request(app)
        .delete('/api/staff/7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
  /* -------------------------------
   ------- STUDENTS ENDPOINTS ------- 
   ------------------------------- */
  xdescribe('GET /students', () => {
    test('status 200: fetches array of student objects', () => {
      return request(app)
        .get('/api/students')
        .expect(200)
        .then(({ body: { students } }) => {
          expect(students).toHaveLength(14);
          students.forEach((staffMember) => {
            expect.objectContaining({
              student_id: expect.any(Number),
              student_name: expect.any(String),
              cohort_name: expect.any(String),
              seminar_group_name: expect.any(String),
              mentor_group_name: expect.any(String),
              notes: expect.any(String),
            });
          });
        });
    });
  });
  /* ------- POST STUDENT ENDPOINTS ------- */
  xdescribe('POST /students', () => {
    test('status 201: student created', () => {
      return request(app)
        .post('/api/students')
        .send({
          student_name: 'jespen haarne',
          cohort_name: 'january-2022',
          notes: 'something interesting',
        })
        .expect(201)
        .then(({ body: { newStudent } }) => {
          expect(newStudent).toEqual(
            expect.objectContaining({
              student_id: 15,
              student_name: 'jespen haarne',
              cohort_name: 'january-2022',
              notes: 'something interesting',
            })
          );
        });
    });
    test('status 400: invalid body key', () => {
      return request(app)
        .post('/api/students')
        .send({
          invalid_key: 'jespen haarne',
          cohort_name: 'january-2022',
          notes: 'something interesting',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 400: invalid body value', () => {
      return request(app)
        .post('/api/students')
        .send({
          student_name: null,
          cohort_name: 'january-2022',
          notes: 'something interesting',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* ------- GET STUDENTS QUERIES ENDPOINTS ------- */
  xdescribe('GET /students queries', () => {
    test('status 200: query to filter by cohort', () => {
      return request(app)
        .get('/api/students?cohort=september-2021')
        .expect(200)
        .then(({ body: { students } }) => {
          expect(students).toHaveLength(4);
          expect(students[0].student_name).toBe('john smith');
          expect(students[1].student_name).toBe('jane smith');
          expect(students[2].student_name).toBe('jim jones');
          expect(students[3].student_name).toBe('joan jones');
        });
    });
    test('status 404: cohort filter value not found', () => {
      return request(app)
        .get('/api/students?cohort=september-2042')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('filter value not found');
        });
    });
    test('status 400: invalid query key', () => {
      return request(app)
        .get('/api/students?invalid=key')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* ------- GET STUDENT BY ID ENDPOINTS ------- */
  xdescribe('GET /student/:student_id', () => {
    test('status 200: fetches single student object', () => {
      return request(app)
        .get('/api/students/1')
        .expect(200)
        .then(({ body: { student } }) => {
          expect(student).toEqual(
            expect.objectContaining({
              student_id: 1,
              student_name: 'john smith',
              cohort_name: 'september-2021',
              notes: 'something interesting',
            })
          );
        });
    });
    test('status 400: invalid student_id', () => {
      return request(app)
        .get('/api/students/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 404: valid but non existent id', () => {
      return request(app)
        .get('/api/students/7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
  /* ------- PATCH STUDENT BY ID ENDPOINTS ------- */
  xdescribe('PATCH /student/:student_id', () => {
    test('status 200: returns patched student object', () => {
      return request(app)
        .patch('/api/students/1')
        .send({ student_name: 'jonathan smith' })
        .expect(200)
        .then(({ body: { student } }) => {
          expect(student).toEqual(
            expect.objectContaining({
              student_id: 1,
              student_name: 'jonathan smith',
              cohort_name: 'september-2021',
              notes: 'something interesting',
            })
          );
        });
    });
    test('status 400: invalid key on patch body', () => {
      return request(app)
        .patch('/api/students/1')
        .send({ invalid_key: 'jonathan smith' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* ------- DELETE STUDENT BY ID ENDPOINTS ------- */
  xdescribe('DELETE /student/:student_id', () => {
    test('status 204: student deleted', () => {
      return request(app).delete('/api/students/1').expect(204);
    });
    test('status 400: invalid student_id', () => {
      return request(app)
        .delete('/api/students/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 404: valid but non existent id', () => {
      return request(app)
        .delete('/api/students/7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
  /* -------------------------------
   ------- COHORTS ENDPOINTS ------- 
   ------------------------------- */
  xdescribe('GET /cohorts', () => {
    test('status 200: fetches array of cohort objects', () => {
      return request(app)
        .get('/api/cohorts')
        .expect(200)
        .then(({ body: { cohorts } }) => {
          expect(cohorts).toHaveLength(4);
          cohorts.forEach((cohort) => {
            expect.objectContaining({
              cohort_name: expect.any(String),
              status: expect.any(String),
              type: expect.any(String),
              student_count: expect.any(Number),
              start_date: expect.any(String),
              end_date: expect.any(String),
              percent_in_work: expect.any(Number),
            });
          });
        });
    });
  });
  /* ------- POST COHORT ENDPOINTS ------- */
  xdescribe('POST /cohorts', () => {
    test('status 201: cohort created', () => {
      return request(app)
        .post('/api/cohorts')
        .send({
          cohort_name: 'march-2022',
          status: 'in progress',
          type: 'full-stack boot camp',
          student_count: 95,
          start_date: '2022-03-04',
          end_date: '2022-06-10',
          percent_in_work: 0,
        })
        .expect(201)
        .then(({ body: { newCohort } }) => {
          expect(newCohort).toEqual(
            expect.objectContaining({
              cohort_name: 'march-2022',
              status: 'in progress',
              type: 'full-stack boot camp',
              student_count: 95,
              start_date: '2022-03-04',
              end_date: '2022-06-10',
              percent_in_work: 0,
            })
          );
        });
    });
    test('status 400: invalid body key', () => {
      return request(app)
        .post('/api/cohorts')
        .send({
          invalid_key: 'march-2022',
          status: 'in progress',
          type: 'full-stack boot camp',
          student_count: 95,
          start_date: '2022-03-04',
          end_date: '2022-06-10',
          percent_in_work: 0,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 400: invalid body value', () => {
      return request(app)
        .post('/api/cohorts')
        .send({
          invalid_key: 'march-2022',
          status: 'in progress',
          type: 'full-stack boot camp',
          student_count: 'not-a-number',
          start_date: '2022-03-04',
          end_date: '2022-06-10',
          percent_in_work: 0,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* ------- GET COHORT BY ID ENDPOINTS ------- */
  xdescribe('GET /cohort/:cohort_name', () => {
    test('status 200: fetches single cohort object', () => {
      return request(app)
        .get('/api/cohorts/january-2022')
        .expect(200)
        .then(({ body: { cohort } }) => {
          expect(cohort).toEqual(
            expect.objectContaining({
              cohort_name: 'january-2022',
              status: 'in progress',
              type: 'full-stack boot camp',
              student_count: 105,
              start_date: '2022-01-04',
              end_date: '2022-04-10',
              percent_in_work: 0,
            })
          );
        });
    });
    test('status 404: valid but non existent id', () => {
      return request(app)
        .get('/api/cohorts/7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
  /* ------- PATCH COHORT BY ID ENDPOINTS ------- */
  xdescribe('PATCH /cohort/:cohort_name', () => {
    test('status 200: returns patched cohort object', () => {
      return request(app)
        .patch('/api/cohorts/january-2022')
        .send({ percent_in_work: 15 })
        .expect(200)
        .then(({ body: { cohort } }) => {
          expect(cohort).toEqual(
            expect.objectContaining({
              cohort_name: 'january-2022',
              status: 'in progress',
              type: 'full-stack boot camp',
              student_count: 105,
              start_date: '2022-01-04',
              end_date: '2022-04-10',
              percent_in_work: 15,
            })
          );
        });
    });
    test('status 400: invalid value on patch body', () => {
      return request(app)
        .patch('/api/cohorts/january-2022')
        .send({ percent_in_work: 'not-a-number' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 400: invalid key on patch body', () => {
      return request(app)
        .patch('/api/cohorts/january-2022')
        .send({ invalid_key: 15 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* -------------------------------
   ------- PDP SCHEME ENDPOINTS ------- 
   ------------------------------- */
  xdescribe('GET /pdps', () => {
    test('status 200: fetches array of pdp_scheme objects', () => {
      return request(app)
        .get('/api/pdps')
        .expect(200)
        .then(({ body: { pdps } }) => {
          expect(pdps).toHaveLength(3);
          pdps.forEach((pdp) => {
            expect.objectContaining({
              pdp_scheme: expect.any(String),
              details: expect.any(String),
              duration_in_days: expect.any(Number),
              url: expect.any(String),
            });
          });
        });
    });
  });
  /* ------- POST PDP ENDPOINTS ------- */
  describe('POST /pdps', () => {
    test('status 201: pdp created', () => {
      return request(app)
        .post('/api/pdps')
        .send({
          pdp_scheme: 'React-course',
          details: 'This is where we would put some useful info',
          duration_in_days: 180,
          url: 'www.click-bait.com',
        })
        .expect(201)
        .then(({ body: { newPdp } }) => {
          expect(newPdp).toEqual(
            expect.objectContaining({
              pdp_scheme: 'React-course',
              details: 'This is where we would put some useful info',
              duration_in_days: 180,
              url: 'www.click-bait.com',
            })
          );
        });
    });
    test('status 400: invalid body key', () => {
      return request(app)
        .post('/api/pdps')
        .send({
          invalid_key: 'React-course',
          details: 'This is where we would put some useful info',
          duration_in_days: 180,
          url: 'www.click-bait.com',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('status 400: invalid body value', () => {
      return request(app)
        .post('/api/pdps')
        .send({
          pdp_scheme: 'React-course',
          details: 'This is where we would put some useful info',
          duration_in_days: 'not-a-number',
          url: 'www.click-bait.com',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
  });
  /* ------- GET PDP BY ID ENDPOINTS ------- */
  xdescribe('GET /pdp/:pdp_scheme', () => {
    test('status 200: fetches single pdp object', () => {
      return request(app)
        .get('/api/pdps/Flutter-course')
        .expect(200)
        .then(({ body: { pdp } }) => {
          expect(pdp).toEqual(
            expect.objectContaining({
              pdp_scheme: 'Flutter-course',
              details:
                "Burrow under covers, mew mew lick butt. Love blinks and purr purr purr purr yawn poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree or stare at owner accusingly then wink or sleep nap get poop stuck in paws jumping out of litter box and run around the house scream meowing and smearing hot cat mud all over or cat cat moo moo lick ears lick paws so have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat. Sleep nap sleep on keyboard trip owner up in kitchen i want food human is in bath tub, emergency! drowning! meooowww!. Cat cat moo moo lick ears lick paws mark territory, for run in circles meow in empty rooms give me attention or face the wrath of my claws yet let me in let me out let me in let me out let me in let me out who broke this door anyway . Sleep everywhere, but not in my bed slap kitten brother with paw for swipe at owner's legs. I bet my nine lives on you-oooo-ooo-hooo cats woo so scratch the furniture nap all day get my claw stuck in the dog's ear for meowing chowing and wowing and attack dog, run away and pretend to be victim. When owners are asleep, cry for no apparent reason it's 3am, time to create some chaos howl uncontrollably for no reason but sweet beast, but rub my belly hiss.",
              duration_in_days: 90,
              url: 'www.popup-hell.com',
            })
          );
        });
    });
    test('status 404: valid but non existent id', () => {
      return request(app)
        .get('/api/pdps/7777')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
});
