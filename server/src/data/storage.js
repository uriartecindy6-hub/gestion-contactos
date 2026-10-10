const fs = require('fs');
const path = require('path');
const initialContacts = require('./mockContacts');

const DATA_FILE = path.join(__dirname, 'contacts.json');

// Helper to ensure data file exists
function initStorage() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialContacts, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error al inicializar almacenamiento:', error);
  }
}

// Read contacts from file
function readContacts() {
  initStorage();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [...initialContacts];
  } catch (error) {
    console.error('Error al leer contactos del archivo, restaurando valores iniciales:', error);
    writeContacts(initialContacts);
    return [...initialContacts];
  }
}

// Write contacts to file
function writeContacts(contacts) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error al guardar contactos en archivo:', error);
    throw new Error('No se pudo persistir la información en disco.');
  }
}

// Get all contacts with optional filter
function getAllContacts({ search = '', category = '' } = {}) {
  let contacts = readContacts();

  if (category && category !== 'Todos') {
    contacts = contacts.filter(
      c => c.categoria.toLowerCase() === category.toLowerCase()
    );
  }

  if (search && search.trim() !== '') {
    const term = search.trim().toLowerCase();
    contacts = contacts.filter(c => 
      (c.nombre && c.nombre.toLowerCase().includes(term)) ||
      (c.categoria && c.categoria.toLowerCase().includes(term)) ||
      (c.email && c.email.toLowerCase().includes(term)) ||
      (c.telefono && c.telefono.toLowerCase().includes(term))
    );
  }

  return contacts;
}

// Find contact by ID
function getContactById(id) {
  const contacts = readContacts();
  return contacts.find(c => String(c.id) === String(id));
}

// Create new contact
function createContact(data) {
  const contacts = readContacts();
  const newContact = {
    id: `cnt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    nombre: data.nombre.trim(),
    telefono: data.telefono.trim(),
    email: data.email.trim().toLowerCase(),
    categoria: data.categoria.trim(),
    notas: data.notas ? data.notas.trim() : '',
    favorito: Boolean(data.favorito),
    createdAt: new Date().toISOString()
  };

  contacts.unshift(newContact); // Add to the top
  writeContacts(contacts);
  return newContact;
}

// Update existing contact
function updateContact(id, data) {
  const contacts = readContacts();
  const index = contacts.findIndex(c => String(c.id) === String(id));
  
  if (index === -1) {
    return null;
  }

  const existing = contacts[index];
  const updatedContact = {
    ...existing,
    nombre: data.nombre !== undefined ? data.nombre.trim() : existing.nombre,
    telefono: data.telefono !== undefined ? data.telefono.trim() : existing.telefono,
    email: data.email !== undefined ? data.email.trim().toLowerCase() : existing.email,
    categoria: data.categoria !== undefined ? data.categoria.trim() : existing.categoria,
    notas: data.notas !== undefined ? data.notas.trim() : existing.notas,
    favorito: data.favorito !== undefined ? Boolean(data.favorito) : existing.favorito,
    updatedAt: new Date().toISOString()
  };

  contacts[index] = updatedContact;
  writeContacts(contacts);
  return updatedContact;
}

// Delete contact
function deleteContact(id) {
  const contacts = readContacts();
  const initialLength = contacts.length;
  const filtered = contacts.filter(c => String(c.id) !== String(id));

  if (filtered.length === initialLength) {
    return false;
  }

  writeContacts(filtered);
  return true;
}

// Reset contacts to initial mock data
function resetContacts() {
  writeContacts(initialContacts);
  return [...initialContacts];
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  resetContacts
};
