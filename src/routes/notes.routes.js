const {Router} = require('express')
const router = Router()
const {renderNotes, renderAddNote, addNote, renderEditNote, updateNote, deleteNote} = require('../controllers/notes.controller')
const {isAuthenticated} = require('../helpers/auth')
// listar todas las notas
router.get('/notes', isAuthenticated, renderNotes)

// mostar formulario y agregar nota
router.get('/note/add', isAuthenticated, renderAddNote)
router.post('/note/add', isAuthenticated, addNote)

// mostar formulario y actualizar nota
router.get('/note/edit/:id', isAuthenticated, renderEditNote)
router.put('/note/edit/:id', isAuthenticated, updateNote)

// eliminar nota
router.delete('/note/delete/:id', isAuthenticated, deleteNote)

module.exports = router