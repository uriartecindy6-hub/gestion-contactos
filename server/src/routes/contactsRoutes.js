const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Routes
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);
router.post('/reset/mock', contactsController.resetContacts);

module.exports = router;
