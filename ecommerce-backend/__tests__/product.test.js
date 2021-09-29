const mongoose = require('mongoose')
const supertest = require('supertest')
const Product = require('../models/product')
const Category = require('../models/category')
const app = require('../app.js')
const request = supertest(app)
const testCategories = require('../utils/testCategories')
const testProducts = require('../utils/testProducts')
const { test, expect } = require('@jest/globals')

const userInfo = []
let categoryId = ""
 
beforeAll(async () => {
    await request.post('/api/signin').send({
                        "email": "berry@gmail.com",
                        "password": "bbbbb9"
            }).then(res => {
                userInfo.push(res.body.token, res.body.user._id) 
            })
    await request.post(`/api/category/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('application/json').send({
                name: `${testCategories[0]}`
    }).then(res => {
                categoryId = res.body._id
            })
})

afterAll(async() => {
    testCategories.map(async testCat => {
        await Category.deleteMany({name: `${testCat}`})
    })
    testProducts.map(async testPro => {
        await Product.deleteMany({name: `${testPro}`})
    })
})

describe("PRODUCT ROUTES", () => {
    test("Create product with admin access", async (done) => {
         //arrange   
        try {
            //act
            const res = await request.post(`/api/product/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('form').set({connection: 'keep-alive'})
                .field('name', `${testProducts[0].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
                
            //assertions
            expect(res.status).toBe(200)
            
            done()
        } catch (err) {
            console.log(err.message);
            done(err)
       }
    })
    test("display error if all required field are not defined when creating product", async (done) => {
         //arrange   
        try {
            //act
            const res = await request.post(`/api/product/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('form')
                //.field('name', `${testProducts[0].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
            
            //assertions
            expect(res.status).toBe(400)
            expect(res.body.error).toBe("All fields are required")
            done()
        } catch (err) {
            console.log(err);
            done(err)
       }
    })
    test("GET PRODUCT /product/:productId", async (done) => {
         //arrange   
        try {
            //act
            const res = await request.post(`/api/product/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('form')
                .field('name', `${testProducts[0].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
                .then(res => res.body.result._id)
            const product = await request.get(`/api/product/${res}`)
            //assertions
            expect(product.status).toBe(200)
            expect(product.body.name).toBe(`${testProducts[0].name}`)
            done()
        } catch (err) {
            console.log(err);
            done(err)
       }
    })
    test("DELETE PRODUCT /product/:productId/:userId", async (done) => {
         //arrange   
        try {
            //act
            const res = await request.post(`/api/product/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('form')
                .field('name', `${testProducts[0].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
                .then(res => res.body.result._id)
            const removeProduct = await request.delete(`/api/product/${res}/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' })
            //assertions
            expect(removeProduct.status).toBe(200)
            expect(removeProduct.body.message).toBe("Product was deleted")
            done()
        } catch (err) {
            console.log(err);
            done(err)
       }
    })
    test("UPDATE PRODUCT (/product/:productId/:userId)", async (done) => {
         //arrange   
        try {
            //act
            //Create

            const res = await request.post(`/api/product/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('form')
                .field('name', `${testProducts[0].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
                .then(res => res.body.result._id)
            
            //Update Product

            const productUpdate = await request.put(`/api/product/${res}/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' })
                .field('name', `${testProducts[1].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
            
            //assertions
            expect(productUpdate.status).toBe(200)
            expect(productUpdate.body.result.name).toBe(`${testProducts[1].name}`)
            done()
        } catch (err) {
            console.log(err);
            done(err)
       }
    })
    test("display error if all required field are not defined when updating product", async (done) => {
        try {
            //arrange 
            //Create Product
            const res = await request.post(`/api/product/create/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' }).type('form')
            .field('name', `${testProducts[0].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
            .then(res => res.body.result._id)
            
            //act
            //Update Product
            const productUpdate = await request.put(`/api/product/${res}/${userInfo[1]}`).auth(`${userInfo[0]}`, { type: 'bearer' })
                //.field('name', `${testProducts[1].name}`)
                .field('description', `${testProducts[0].description}`)
                .field('price', testProducts[0].price)
                .field('category', categoryId)
                .field('shipping', false)
                .field('quantity', 100)
                .attach('photo', `${testProducts[0].photo}`)
                
            //assertions
            expect(productUpdate.status).toBe(400)
            expect(productUpdate.body.error).toBe("All fields are required")
            done()
        } catch (err) {
            console.log(err);
            done(err)
       }
    })
    test("GET a list of all products", async (done) => {
        try {
            const res = await request.get('/api/products')
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body.products)).toBeTruthy()
            done()
        } catch (err) {
            console.log(err);
            done(err)
        }

    })
})
