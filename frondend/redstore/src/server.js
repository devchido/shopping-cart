import express from 'express';

const app = express();
const POST = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
// const express = require("express");
// const cors = require("cors");

// const corsOptions = {
//   origin: process.env.REACT_URL,
// };

// const app = express();
// app.use(cors(corsOptions));