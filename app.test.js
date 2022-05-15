import supertest from 'supertest';
import app from './app.js';
import request from 'supertest'
import fs from 'fs';

const testData = [
    {
      "id": "1",
      "name": "updated name",
      "age": "22",
      "gender": "Male",
      "email": "userone@gmail.com"
    },
    {
      "id": "2",
      "name": "updated name",
      "age": "24",
      "gender": "Female",
      "email": "usertwo@gmail.com"
    },
    {
      "id": "3",
      "name": "user three",
      "age": "23",
      "gender": "Male",
      "email": "userthree@gmail.com"
    },
    {
      "id": "4",
      "name": "updated mark",
      "age": "22",
      "gender": "Male",
      "email": "userone@gmail.com"
    }
  ]

  beforeEach(() => {
    fs.writeFile('./post.json', JSON.stringify(testData, null, 2), err => {
      
  })
})
describe('GET /view', () => {

    it('it should get all users', async () => {
        const response =  await request(app).get("/view")
        expect(response.statusCode).toBe(200)
        expect(response.body).toContainEqual(  {
            "id": "4",
            "name": "updated mark",
            "age": "22",
            "gender": "Male",
            "email": "userone@gmail.com"
          })
    })
    it('it should get user 4', async () => {
        const response =  await request(app).get("/view?id=4")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            "id": "4",
            "name": "updated mark",
            "age": "22",
            "gender": "Male",
            "email": "userone@gmail.com"
          })
        })
  
  
})

describe('POST /add', () => {

    it('it should add a new user to the file', async () => {
        const response =  await request(app).post("/add").send({
            "id": "5",
            "name": "updated name",
            "age": "22",
            "gender": "Male",
            "email": "userone@gmail.com"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toContainEqual(  {
            "id": "5",
            "name": "updated name",
            "age": "22",
            "gender": "Male",
            "email": "userone@gmail.com"
          })
    })

})

describe("PATCH /edit", () => {
    it('it should edit a user', async () => {
        const response =  await request(app).patch("/edit/4").send({
            "name": "new name",
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toContainEqual(  
            {
                "id": "4",
                "name": "new name",
                "age": "22",
                "gender": "Male",
                "email": "userone@gmail.com"
              }
        )
    })
})