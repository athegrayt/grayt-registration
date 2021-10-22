const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');
const User = require('../models/user');
const { expect } = require('@jest/globals');
const request = supertest(app);

afterAll(async () => {
  await User.deleteMany({ firstName: 'Nataly' });
  await User.deleteOne({ firstName: 'Robert' });
  await mongoose.connection.close();
});

describe('POST /signup', () => {
  test('create a new user in db.collection(users)', async (done) => {
    try {
      const res = await request.post('/api/signup').send({
        firstName: 'Nataly',
        lastName: 'Cieza',
        email: 'natcieza@hotmail.com',
        password: 'zxcvbnm123',
      });
      expect(res.status).toBe(200);
      done();
    } catch (error) {
      console.log(error.message);
      done(error);
    }
  });
  test('Password is encrypted and saved upon creating a new user', async (done) => {
    try {
      const res = await request.post('/api/signup').send({
        firstName: 'Robert',
        lastName: 'Smith',
        email: 'robert@hotmail.com',
        password: 'zxcvbnm123',
      });
      expect(res.status).toBe(200);
      expect(res.body.password).not.toBe('zxcvbnm123');
      done();
    } catch (error) {
      done(error);
    }
  });
  test('error trying to create a new user without name', async (done) => {
    try {
      const res = await request.post('/api/signup').send({
        //name: "Nataly",
        email: 'natcieza@hotmail.com',
        password: 'zxcvbnm123',
      });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('First name is required');
      done();
    } catch (error) {
      done(error);
    }
  });
  test('400 error when trying to create same user in db.collection(users)', async (done) => {
    try {
      const res = await request.post('/api/signup').send({
        firstName: 'Anthony',
        lastName: 'Noel',
        email: 'anthony@hotmail.com',
        password: 'zxcvbnm123',
      });
      expect(res.status).toBe(400);
      done();
    } catch (error) {
      done(error);
    }
  });
  test.skip('one-time password reset sent', async (done) => {
    try {
      const res = await request.post('/api/signup').send({
        firstName: 'Jerry',
        lastName: 'Springer',
        email: 'jerry@hotmail.com',
        password: 'zxcvbnm123',
      });
      const account = await request.post('/api/account-lookup').send({
        email: 'jerry@hotmail.com',
      });

      // expect(account.status).toBe(200)
      // expect(account.body.message).toMatch(/success/)
      done();
    } catch (error) {
      done(error);
    }
  });
});
