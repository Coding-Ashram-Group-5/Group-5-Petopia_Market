// ! Remaining Test Case
// ! 1. Owner Can't Buy a Pet
// ! 2. one user can't update the pet details if he is not owner

import 'dotenv/config';
import request from 'supertest';
import app from '../src/index.js';
import mongoose from 'mongoose';
import fs from 'fs';
import { Server } from 'http';

let server: Server, agent: any, token: string;

const login = async (): Promise<void> => {
  try {
    const res = await agent.post('/api/v1/users/signin').send({ email: 'test_db@gmail.com', password: '12345678' });
    token = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
  } catch (error) {
    console.log(error);
  }
};

describe('Petopia test suite ', () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost:27017/Patopia_Test`);

    server = app.listen(3005, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  // Users API Endpoints Test Suit
  test('Users Can Signup', async () => {
    const res = await agent.post('/api/v1/users/signup').send({
      firstName: 'Javid',
      lastName: 'Sumara',
      email: 'test_db@gmail.com',
      password: '12345678',
    });

    // Extract the token from the set-cookie header
    token = res.headers['set-cookie'][0].split(';')[0].split('=')[1];

    expect(res.statusCode).toBe(200);
  });

  test('Users Can Signout', async () => {
    // Set the Authorization header with the extracted token
    const res = await agent.get('/api/v1/users/logout').send({ token });

    expect(res.statusCode).toBe(200);
  });

  test('Users Can Sign In', async () => {
    const res = await agent.post('/api/v1/users/signin').send({ email: 'test_db@gmail.com', password: '12345678' });

    expect(res.statusCode).toBe(200);
  });

  // Pets API Endpoints Test Suit
  test('User can Add New Pet', async () => {
    await login();
    const imageBuffer = fs.readFileSync(__dirname + '/TEST_Image.jpg');
    const res = await agent
      .post('/api/v1/pets/add')
      .field({
        petName: 'Test Pet Name',
        petDescription: 'This is Pet Test Description',
        price: 500,
        isFree: false,
        petType: 'Test Type',
        petBread: 'Test Bread',
        diseases: 'Test Diseases',
        token,
      })
      .attach('images', imageBuffer, 'TEST_Image.jpg');

    expect(res.statusCode).toBe(200);
  });

  test('User Can Get Details of all Pets', async () => {
    const res = await agent.get('/api/v1/pets/getDetails/all');
    expect(res.statusCode).toBe(200);

    const parsedResponse = JSON.parse(res.text);
    expect(parsedResponse.data.length).toBe(1);
  });

  test('User Can Get Details of Specific Pet by Id', async () => {
    let res = await agent.get('/api/v1/pets/getDetails/all');

    expect(res.statusCode).toBe(200);

    let parsedResponse = JSON.parse(res.text);

    const id = parsedResponse?.data[0]?._id;

    res = await agent.get(`/api/v1/pets/getDetails/${id}`).send({ token });

    parsedResponse = JSON.parse(res.text);

    expect(parsedResponse?.data?.petName).toBe('Test Pet Name');
  });

  test('User can Update the Pets Detail', async () => {
    let res = await agent.get('/api/v1/pets/getDetails/all');

    expect(res.statusCode).toBe(200);

    let parsedResponse = JSON.parse(res.text);

    const id = parsedResponse?.data[0]?._id;

    res = await agent.put(`/api/v1/pets/update/${id}`).send({
      petName: 'Updated Test Pet Name',
      petDescription: 'This is Pet Test Description',
      price: 500,
      isFree: false,
      petType: 'Test Type',
      petBread: 'Test Bread',
      diseases: 'Test Diseases',
      token,
    });

    expect(res.statusCode).toBe(200);
    res = JSON.parse(res.text);
    expect(res?.data?.petName).toBe('Updated Test Pet Name');
  });

  // test('User Can Purchase a Pet', () => {});

  // User Delete Test
  test('User Can Delete Account', async () => {
    let res = await agent.post('/api/v1/users/signin').send({ email: 'test_db@gmail.com', password: '12345678' });

    const id = JSON.parse(res.text)?.data?._id;

    res = await agent.delete(`/api/v1/users/delete/${id}`).send({ token });

    expect(res.statusCode).toBe(200);
  });
});
