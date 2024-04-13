import 'dotenv/config.js';
import request from 'supertest';
import app from '../src/index.js';
import mongoose from 'mongoose';
import fs from 'fs';
import { Server } from 'http';

let server: Server;
let agent: any;
let token: string;

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

  test('Users Can Signup', async () => {
    const res = await agent.post('/api/v1/users/signup').send({
      firstName: 'Javid',
      lastName: 'Sumara',
      email: 'test_db@gmail.com',
      password: '12345678',
    });

    console.log(res?.headers);

    // Extract the token from the set-cookie header
    token = res.headers['set-cookie'][0].split(';')[0].split('=')[1];

    expect(res.statusCode).toBe(200);
  });

  test('Users Can Signout', async () => {
    // Set the Authorization header with the extracted token
    console.log(token);
    const res = await agent.get('/api/v1/users/logout').send({ token });

    expect(res.statusCode).toBe(200);
  });

  test('Users Can Sign In', async () => {
    const res = await agent.post('/api/v1/users/signin').send({ email: 'test_db@gmail.com', password: '12345678' });

    expect(res.statusCode).toBe(200);
  });

  test('User Can Delete Account', async () => {
    let res = await agent.post('/api/v1/users/signin').send({ email: 'test_db@gmail.com', password: '12345678' });

    const id = JSON.parse(res.text)?.data?._id;

    console.log(id);

    res = await agent.delete(`/api/v1/users/delete/${id}`).send({ token });

    expect(res.statusCode).toBe(200);
  });
});
