import express from 'express';
import mongoose from 'mongoose';
import redis from "redis";
// import pg from 'pg';
import 'dotenv/config.js';

// const { Client } = pg;
const port = process.env.PORT || 4000;
const app = express();

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';

//  Connect to Redis
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
    console.log('Error connecting to Redis', err);
});

redisClient.connect();


//  Connect to db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';
// const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
//
//
// const client = new Client({
//     connectionString: URI
// });
//
// client.connect(undefined)
//     .then(() => {
//     console.log('Connected to Postgres');})
//     .catch(err => {
//     console.log('Error connecting to Postgres', err);});

app.get('/', (req, res) => {
    redisClient.set("product", "Products....");
    res.send(
        '<h1>Hello Docker from AWS</h1>'
    );
});

app.post('/data', (req, res) => {
    const product = redisClient.get("product");
    res.send(
        `<h1>Hello Docker! Dev</h1><h2>${product}</h2>`
    );
})


const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI, {}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});