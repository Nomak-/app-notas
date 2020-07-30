const Note = require('../models/Notes')
const notesController = {}

notesController.renderNotes = async (req, res) => {
    const userPassportId = req.user.id
    const notes = await Note.find({user: userPassportId}).lean() //filtra que la nota tenga el id del mismo usuario que inicio sesion
    res.render('notes/all-notes', {notes})
}

notesController.renderAddNote = (req, res) => {
    res.render('notes/add-note')
}

notesController.addNote = async(req, res) => {
    const {title, description} = req.body
    const note = new Note ({title, description})
    note.user = req.user.id
    await note.save()
    req.flash('success_msg','nota creada')
    res.redirect('/notes')
}

notesController.renderEditNote = async (req, res) => {
    const {id} = req.params
    const note = await Note.findById(id).lean()

    if (note.user != req.user.id) {
        req.flash('error_msg','¡Ey! esta nota no es de tu propiedad..')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', {note})
}

notesController.updateNote = async (req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    const note = await Note.findByIdAndUpdate(id, {title, description})
    await note.save()
    req.flash('success_msg','¡Nota actualizada!')
    res.redirect('/notes')
}

notesController.deleteNote = async(req, res) => {
    const {id} = req.params
    await Note.findByIdAndDelete(id)
    req.flash('success_msg','¡Nota eliminada!')
    res.redirect('/notes')
}

module.exports = notesController