import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

let db = {
    courses: [
        {id: 0, title: 'frontend'},
        {id: 1, title: 'backend'},
        {id: 2, title: 'api'},
        {id: 3, title: 'express'}
    ]
}

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204:204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

app.get('/', (req, res) => {
    res.send('THIS IS HOME PAGE!')
})
app.get('/courses', (req, res) => {
    let foundCourses = db.courses
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    res.status(HTTP_STATUSES.OK_200).json(foundCourses)
    /*
    fetch('http://localhost:3000/courses', {
    method: 'GET'})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
})
app.get('/courses/:id', (req, res) => {
    const foundCourses = db.courses.find(c => c.id === +req.params.id)
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(200).json(foundCourses)
    /*
    fetch('http://localhost:3000/courses/1', {
    method: 'GET'})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
})
app.post('/courses', (req, res) => {

    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    let createdCourse = {
        id: db.courses.length,
        title: req.body.title
    }
    db.courses.push(createdCourse)
    res.status(201).json(createdCourse)
    /*
    fetch('http://localhost:3000/courses', {
    method: 'POST',
    body: JSON.stringify({title: '11111'}),
    headers: {'Content-Type': 'application/json'}})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    /*
    fetch('http://localhost:3000/courses/1', {
    method: 'DELETE'})
    */
})
app.put('/courses/:id', (req, res)=>{
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    const foundCourses = db.courses.find(c => c.id === +req.params.id)
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    foundCourses.title = req.body.title
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    /*
    fetch('http://localhost:3000/courses/0', {
    method: 'PUT',
    body: JSON.stringify({title: 'artem'}),
    headers: {'Content-Type': 'application/json'}})
    .then(res=>res.json())
    .then(json=>console.log(json))
    */
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})