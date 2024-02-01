// create web server
// create a router
// create a route for GET /comments
// create a route for POST /comments
// create a route for GET /comments/:id
// create a route for PUT /comments/:id
// create a route for DELETE /comments/:id
// create a route for GET /comments/:id/flag
// create a route for POST /comments/:id/flag
// create a route for GET /comments/:id/flagged
// create a route for GET /comments/:id/flagged/:id
// create a route for DELETE /comments/:id/flagged/:id
// create a route for GET /comments/:id/flagged/:id/resolve
// create a route for POST /comments/:id/flagged/:id/resolve

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const comments = require('./comments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/comments', (req, res) => {
  res.send(comments.getComments());
});

router.post('/comments', (req, res) => {
  res.send(comments.addComment(req.body));
});

router.get('/comments/:id', (req, res) => {
  res.send(comments.getComment(req.params.id));
});

router.put('/comments/:id', (req, res) => {
  res.send(comments.updateComment(req.params.id, req.body));
});

router.delete('/comments/:id', (req, res) => {
  res.send(comments.deleteComment(req.params.id));
});

router.get('/comments/:id/flag', (req, res) => {
  res.send(comments.flagComment(req.params.id));
});

router.post('/comments/:id/flag', (req, res) => {
  res.send(comments.flagComment(req.params.id));
});

router.get('/comments/:id/flagged', (req, res) => {
    res.send(comments.getFlaggedComments(req.params.id));
});

router.get('/comments/:id/flagged/:id', (req, res) => {
    res.send(comments.getFlaggedComment(req.params.id, req.params.id));
});

router.delete('/comments/:id/flagged/:id', (req, res) => {
    res.send(comments.deleteFlaggedComment(req.params.id, req.params.id));
});

router.get('/comments/:id/flagged/:id/resolve', (req, res) => {
    res.send(comments.resolveFlaggedComment(req.params.id, req.params.id));
});
