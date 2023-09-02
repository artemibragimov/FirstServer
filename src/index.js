"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
var jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
var db = {
    courses: [
        { id: 0, title: 'frontend' },
        { id: 1, title: 'backend' },
        { id: 2, title: 'api' },
        { id: 3, title: 'express' }
    ]
};
var HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
app.get('/', function (req, res) {
    res.send('HOME PAGE!');
});
app.get('/courses', function (req, res) {
    var foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(function (c) { return c.title.indexOf(req.query.title) > -1; });
    }
    res.status(HTTP_STATUSES.OK_200).json(foundCourses);
    /*
    fetch('http://localhost:3000/courses', {
    method: 'GET'})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
});
app.get('/courses/:id', function (req, res) {
    var foundCourses = db.courses.find(function (c) { return c.id === +req.params.id; });
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(200).json(foundCourses);
    /*
    fetch('http://localhost:3000/courses/1', {
    method: 'GET'})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
});
app.post('/courses', function (req, res) {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    var createdCourse = {
        id: db.courses.length,
        title: req.body.title
    };
    db.courses.push(createdCourse);
    res.status(201).json(createdCourse);
    /*
    fetch('http://localhost:3000/courses', {
    method: 'POST',
    body: JSON.stringify({title: '11111'}),
    headers: {'Content-Type': 'application/json'}})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
});
app.delete('/courses/:id', function (req, res) {
    db.courses = db.courses.filter(function (c) { return c.id !== +req.params.id; });
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    /*
    fetch('http://localhost:3000/courses/1', {
    method: 'DELETE'})
    */
});
app.put('/courses/:id', function (req, res) {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    var foundCourses = db.courses.find(function (c) { return c.id === +req.params.id; });
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundCourses.title = req.body.title;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    /*
    fetch('http://localhost:3000/courses/0', {
    method: 'PUT',
    body: JSON.stringify({title: 'artem'}),
    headers: {'Content-Type': 'application/json'}})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
