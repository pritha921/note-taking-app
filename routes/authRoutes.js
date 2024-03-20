const express = require('express');
const passport = require('passport');
const router = express.Router();
const noteController = require('../controllers/noteController')

router.post('/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
  successRedirect:'pages/notes',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/notes/add', isAuthenticated, noteController.createNote);
router.get('/notes', isAuthenticated, noteController.getAllNotes);
router.put('/notes/:id', isAuthenticated, noteController.updateNote);
router.delete('/notes/:id', isAuthenticated, noteController.deleteNote);

module.exports = router;

