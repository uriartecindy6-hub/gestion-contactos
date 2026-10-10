const BASE_URL = '/api/contacts';

export const api = {
  // Get all contacts with optional search & category
  async getContacts(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.categoria && params.categoria !== 'Todos') query.append('categoria', params.categoria);

    const url = `${BASE_URL}${query.toString() ? `?${query.toString()}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener los contactos');
    }
    return data.data;
  },

  // Get contact by ID
  async getContact(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener el contacto');
    }
    return data.data;
  },

  // Create new contact
  async createContact(contactData) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    const data = await response.json();
    if (!response.ok) {
      const errMessage = data.errors ? data.errors.join(' ') : (data.message || 'Error al crear el contacto');
      throw new Error(errMessage);
    }
    return data.data;
  },

  // Update contact
  async updateContact(id, contactData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    const data = await response.json();
    if (!response.ok) {
      const errMessage = data.errors ? data.errors.join(' ') : (data.message || 'Error al actualizar el contacto');
      throw new Error(errMessage);
    }
    return data.data;
  },

  // Delete contact
  async deleteContact(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar el contacto');
    }
    return data.data;
  },

  // Reset to initial mock data
  async resetMockData() {
    const response = await fetch(`${BASE_URL}/reset/mock`, {
      method: 'POST'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al restablecer los datos de prueba');
    }
    return data.data;
  }
};
