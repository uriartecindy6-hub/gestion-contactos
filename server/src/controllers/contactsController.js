const storage = require('../data/storage');

const VALID_CATEGORIES = ['Trabajo', 'Familia', 'Amigos'];

// Helper to validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Helper to validate contact fields
function validateContactData(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.nombre !== undefined) {
    if (!data.nombre || typeof data.nombre !== 'string' || data.nombre.trim().length === 0) {
      errors.push('El nombre es obligatorio.');
    } else if (data.nombre.trim().length > 100) {
      errors.push('El nombre no puede exceder los 100 caracteres.');
    }
  }

  if (!isUpdate || data.telefono !== undefined) {
    if (!data.telefono || typeof data.telefono !== 'string' || data.telefono.trim().length === 0) {
      errors.push('El teléfono es obligatorio.');
    } else if (data.telefono.trim().length < 5 || data.telefono.trim().length > 25) {
      errors.push('El teléfono debe tener entre 5 y 25 caracteres.');
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
      errors.push('El correo electrónico es obligatorio.');
    } else if (!isValidEmail(data.email.trim())) {
      errors.push('El formato del correo electrónico no es válido.');
    }
  }

  if (!isUpdate || data.categoria !== undefined) {
    if (!data.categoria || typeof data.categoria !== 'string' || !VALID_CATEGORIES.includes(data.categoria.trim())) {
      errors.push(`La categoría debe ser una de las siguientes: ${VALID_CATEGORIES.join(', ')}.`);
    }
  }

  return errors;
}

// GET /api/contacts
exports.getAllContacts = (req, res) => {
  try {
    const { search, categoria } = req.query;
    const contacts = storage.getAllContacts({
      search: search || '',
      category: categoria || ''
    });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los contactos.',
      error: error.message
    });
  }
};

// GET /api/contacts/:id
exports.getContactById = (req, res) => {
  try {
    const { id } = req.params;
    const contact = storage.getContactById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún contacto con el ID "${id}".`
      });
    }

    return res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el contacto.',
      error: error.message
    });
  }
};

// POST /api/contacts
exports.createContact = (req, res) => {
  try {
    const { nombre, telefono, email, categoria, notas, favorito } = req.body;

    const validationErrors = validateContactData({ nombre, telefono, email, categoria });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos de contacto inválidos.',
        errors: validationErrors
      });
    }

    const created = storage.createContact({
      nombre,
      telefono,
      email,
      categoria,
      notas,
      favorito
    });

    return res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente.',
      data: created
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear el contacto.',
      error: error.message
    });
  }
};

// PUT /api/contacts/:id
exports.updateContact = (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email, categoria, notas, favorito } = req.body;

    const existing = storage.getContactById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún contacto con el ID "${id}".`
      });
    }

    const validationErrors = validateContactData({ nombre, telefono, email, categoria }, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos de actualización inválidos.',
        errors: validationErrors
      });
    }

    const updated = storage.updateContact(id, {
      nombre,
      telefono,
      email,
      categoria,
      notas,
      favorito
    });

    return res.status(200).json({
      success: true,
      message: 'Contacto actualizado exitosamente.',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el contacto.',
      error: error.message
    });
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = storage.deleteContact(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún contacto con el ID "${id}".`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contacto eliminado correctamente.',
      data: { id }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el contacto.',
      error: error.message
    });
  }
};

// POST /api/contacts/reset
exports.resetContacts = (req, res) => {
  try {
    const defaultData = storage.resetContacts();
    return res.status(200).json({
      success: true,
      message: 'Datos de prueba restablecidos correctamente.',
      count: defaultData.length,
      data: defaultData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al restablecer los datos.',
      error: error.message
    });
  }
};
