const router = require('express').Router();
const Upload = require('upload');
const output_files = require('../output_files')

var express = require('express');
var app = express();

app.get('/download', function(req, res){
    const file = `${__dirname}/output_files/file.originalname`;
    res.download(file); // Set disposition and send it.
});

