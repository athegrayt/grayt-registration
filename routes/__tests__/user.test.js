const supertest = require('supertest');
const app = require('../app.js');
const request = supertest(app);

const userInfo = [];
beforeAll(async () => {
  try {
    await request
      .post('/api/signin')
      .send({
        email: 'berry@gmail.com',
        password: 'bbbbb9',
      })
      .then((res) => {
        userInfo.push(res.body.token, res.body.user._id);
      });
  } catch (err) {
    console.log(err);
  }
});

describe('GET /secret/:userId (Admin Access)', () => {
  test('failing to access user with Id due to not being admin', async (done) => {
    //arrange
    try {
      const userInfo = await request
        .post('/api/signin')
        .send({
          email: 'dave@gmail.com',
          password: 'rrrrry9',
        })
        .then((res) => {
          return [res.body.token, res.body.user._id];
        });
      //act
      const res = await request
        .get(`/api/secret/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json');
      //assertions
      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Admin resource! Access denied');
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  test('accessing admin account', async (done) => {
    //arrange
    try {
      //act
      const res = await request
        .get(`/api/secret/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json');
      //assertions
      expect(res.status).toBe(200);
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

  test('get user data', async (done) => {
    try {
      //act
      const res = await request
        .get(`/api/user/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json');
      //assertions
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Berry');
      done();
    } catch (error) {
      console.log(error);
      done(error);
    }
  });
  test('update user data', async (done) => {
    try {
      //act
      const res = await request
        .put(`/api/user/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          firstName: 'BERRY',
        });
      //assertions
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('BERRY');
      const result = await request
        .put(`/api/user/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          firstName: 'Berry',
        });
      //assertions
      expect(result.status).toBe(200);
      expect(result.body.firstName).toBe('Berry');
      done();
    } catch (error) {
      console.log(error);
      done(error);
    }
  });
});
