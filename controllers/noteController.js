const Note = require('../models/note');



// Create a note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user._id
    });
    await note.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get all notes for a user
exports.getAllNotes = async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user._id });
      console.log(notes);
      res.render('pages/notes', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, content });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = exports;
