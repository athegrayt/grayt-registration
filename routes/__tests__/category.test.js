const mongoose = require('mongoose');
const supertest = require('supertest');
const Category = require('../models/category');
const app = require('../app.js');
const request = supertest(app);
const testCategories = require('../utils/testCategories');

const userInfo = [];

beforeAll(async () => {
  await request
    .post('/api/signin')
    .send({
      email: 'berry@gmail.com',
      password: 'bbbbb9',
    })
    .then((res) => {
      userInfo.push(res.body.token, res.body.user._id);
    });
});

afterAll(async () => {
  await Category.deleteMany({ name: `${testCategories[0]}` });
  await Category.deleteMany({ name: `${testCategories[1]}` });
  await Category.deleteMany({ name: `${testCategories[2]}` });
  await Category.deleteMany({ name: `${testCategories[3]}` });
  await mongoose.connection.close();
});

describe('Category Routes', () => {
  test('GET /category/:categoryId', async () => {
    //arrange

    //Create Category
    const res = await request
      .post(`/api/category/create/${userInfo[1]}`)
      .auth(`${userInfo[0]}`, { type: 'bearer' })
      .type('application/json')
      .send({
        name: `${testCategories[0]}`,
      });
    //act

    //Get Category
    const product = await request.get(`/api/category/${res.body._id}`);
    //assertion

    expect(product.status).toBe(200);
    expect(product.body.name).toBe(`${testCategories[0]}`);
  });
  test('GET /category/:categoryId (category does not exist)', async () => {
    //arrange
    //act
    const product = await request.get(`/api/category/fakeCategoryId`);
    //assertion
    expect(product.status).toBe(400);
    expect(product.body.error).toBe('Category does not exist');
  });
  test('POST /category/create/:userId (admin access)', async (done) => {
    //arrange
    try {
      //act
      const res = await request
        .post(`/api/category/create/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          name: `${testCategories[1]}`,
        });
      //assertions
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(`${testCategories[1]}`);
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  test('Error if category already exists (Create)', async (done) => {
    //arrange
    try {
      //act
      const category1 = await request
        .post(`/api/category/create/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          name: `${testCategories[0]}`,
        });
      const res = await request
        .post(`/api/category/create/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          name: `${testCategories[0]}`,
        });
      //assertions
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(
        `"${testCategories[0]}" already exists as a category`
      );
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  test('Error if schema requirements are not met when creating a category (Create)', async (done) => {
    try {
      //arrange
      const expectedValue = /32/;
      //act
      const res = await request
        .post(`/api/category/create/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          name: `${testCategories[2]} gives life to everyone on the web`,
        });
      //assertions
      expect(res.status).toBe(400);
      expect(res.body.error).toEqual(expect.stringMatching(expectedValue));
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  test('DELETE /category/:categoryId/:userId', async () => {
    //arrange
    //Create Product
    const category = await request
      .post(`/api/category/create/${userInfo[1]}`)
      .auth(`${userInfo[0]}`, { type: 'bearer' })
      .type('application/json')
      .send({
        name: `${testCategories[2]}`,
      });
    //act
    //Delete Product
    const res = await request
      .delete(`/api/category/${category.body._id}/${userInfo[1]}`)
      .auth(`${userInfo[0]}`, { type: 'bearer' });
    //assertion
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Category was removed');
  });
  test('PUT /category/:categoryId/:userId (Update)', async (done) => {
    //arrange
    try {
      //act
      //Create Product
      const category = await request
        .post(`/api/category/create/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .type('application/json')
        .send({
          name: `${testCategories[2]}`,
        });
      //Update Product
      const res = await request
        .put(`/api/category/${category.body._id}/${userInfo[1]}`)
        .auth(`${userInfo[0]}`, { type: 'bearer' })
        .send({
          name: `${testCategories[3]}`,
        });
      //assertions

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(`${testCategories[3]}`);
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  test('GET /categories (List of categories)', async (done) => {
    //arrange
    try {
      //act
      //Create Product
      const categoryList = await request.get(`/api/categories`);

      //assertions
      expect(categoryList.status).toBe(200);
      expect(Array.isArray(categoryList.body.data)).toBeTruthy();
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
});
