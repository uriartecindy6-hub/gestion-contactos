import React, { useState, useEffect, useMemo } from 'react';
import { api } from './services/api';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchAndFilters from './components/SearchAndFilters';
import ContactCard from './components/ContactCard';
import ContactRow from './components/ContactRow';
import ContactModal from './components/ContactModal';
import ContactDetailModal from './components/ContactDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { exportToCSV } from './utils/helpers';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & View State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);
  const [deletingContact, setDeletingContact] = useState(null);

  // Status flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch all contacts on mount
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('No se pudo conectar con el servidor backend. Asegúrate de que esté ejecutándose en el puerto 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filtered and Sorted contacts computed in real time
  const filteredContacts = useMemo(() => {
    let result = [...contacts];

    // Filter by category
    if (selectedCategory && selectedCategory !== 'Todos') {
      result = result.filter(
        c => c.categoria && c.categoria.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by favorites
    if (onlyFavorites) {
      result = result.filter(c => Boolean(c.favorito));
    }

    // Real-time search query
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(c =>
        (c.nombre && c.nombre.toLowerCase().includes(term)) ||
        (c.telefono && c.telefono.toLowerCase().includes(term)) ||
        (c.email && c.email.toLowerCase().includes(term)) ||
        (c.categoria && c.categoria.toLowerCase().includes(term)) ||
        (c.notas && c.notas.toLowerCase().includes(term))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return (a.nombre || '').localeCompare(b.nombre || '', 'es', { sensitivity: 'base' });
      }
      if (sortBy === 'name-desc') {
        return (b.nombre || '').localeCompare(a.nombre || '', 'es', { sensitivity: 'base' });
      }
      if (sortBy === 'recent') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return 0;
    });

    return result;
  }, [contacts, selectedCategory, onlyFavorites, searchTerm, sortBy]);

  // Create or Update Contact
  const handleSaveContact = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingContact) {
        // Update
        const updated = await api.updateContact(editingContact.id, formData);
        setContacts(prev => prev.map(c => c.id === editingContact.id ? updated : c));
        showToast(`Contacto "${updated.nombre}" actualizado correctamente.`);
      } else {
        // Create
        const created = await api.createContact(formData);
        setContacts(prev => [created, ...prev]);
        showToast(`Contacto "${created.nombre}" creado exitosamente.`);
      }
      setIsModalOpen(false);
      setEditingContact(null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Contact
  const handleConfirmDelete = async (id) => {
    try {
      setIsDeleting(true);
      await api.deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      showToast('Contacto eliminado correctamente.');
      setDeletingContact(null);
      if (viewingContact && viewingContact.id === id) {
        setViewingContact(null);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = async (contact) => {
    const newFavoriteState = !contact.favorito;
    // Optimistic update
    setContacts(prev =>
      prev.map(c => (c.id === contact.id ? { ...c, favorito: newFavoriteState } : c))
    );

    try {
      await api.updateContact(contact.id, { favorito: newFavoriteState });
      showToast(
        newFavoriteState
          ? `"${contact.nombre}" marcado como favorito.`
          : `"${contact.nombre}" removido de favoritos.`,
        'info'
      );
    } catch (err) {
      // Revert if error
      setContacts(prev =>
        prev.map(c => (c.id === contact.id ? { ...c, favorito: contact.favorito } : c))
      );
      showToast('No se pudo actualizar el estado de favorito.', 'error');
    }
  };

  // Reset to initial mock data
  const handleResetData = async () => {
    try {
      setLoading(true);
      const defaultContacts = await api.resetMockData();
      setContacts(defaultContacts);
      setSearchTerm('');
      setSelectedCategory('Todos');
      setOnlyFavorites(false);
      showToast('Se restablecieron los datos de prueba iniciales.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Export to CSV
  const handleExport = () => {
    exportToCSV(filteredContacts);
    showToast(`Exportados ${filteredContacts.length} contactos a archivo CSV.`);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setOnlyFavorites(false);
  };

  const isFilterActive = searchTerm.trim() !== '' || selectedCategory !== 'Todos' || onlyFavorites;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenCreate={() => {
          setEditingContact(null);
          setIsModalOpen(true);
        }}
        onResetData={handleResetData}
        onExport={handleExport}
        totalCount={contacts.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Statistics Cards */}
        <StatsCards
          contacts={contacts}
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Real-time Search and Filter Controls */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onlyFavorites={onlyFavorites}
          onToggleFavorites={() => setOnlyFavorites(prev => !prev)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filteredCount={filteredContacts.length}
          totalCount={contacts.length}
        />

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
            <p className="text-sm font-medium text-slate-500">Cargando libreta de contactos...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-rose-900 mb-1">Error de conexión</h3>
            <p className="text-sm text-rose-700 mb-4">{error}</p>
            <button
              onClick={fetchContacts}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Reintentar conexión
            </button>
          </div>
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            isSearching={isFilterActive}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onClearFilters={handleClearFilters}
            onOpenCreate={() => {
              setEditingContact(null);
              setIsModalOpen(true);
            }}
            onResetData={handleResetData}
          />
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredContacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onView={(c) => setViewingContact(c)}
                onEdit={(c) => {
                  setEditingContact(c);
                  setIsModalOpen(true);
                }}
                onDelete={(c) => setDeletingContact(c)}
                onToggleFavorite={handleToggleFavorite}
                onCopy={(text) => showToast(`Copiado: "${text}"`, 'info')}
              />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredContacts.map(contact => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onView={(c) => setViewingContact(c)}
                onEdit={(c) => {
                  setEditingContact(c);
                  setIsModalOpen(true);
                }}
                onDelete={(c) => setDeletingContact(c)}
                onToggleFavorite={handleToggleFavorite}
                onCopy={(text) => showToast(`Copiado: "${text}"`, 'info')}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Sistema de Gestión de Contactos &bull; Node.js / Express + React & Tailwind CSS
          </p>
          <div className="flex items-center gap-4">
            <span>Diseño Responsive</span>
            <span>&bull;</span>
            <span>CRUD Completo</span>
            <span>&bull;</span>
            <span>Buscador en Tiempo Real</span>
          </div>
        </div>
      </footer>

      {/* Create / Edit Modal */}
      <ContactModal
        isOpen={isModalOpen}
        initialData={editingContact}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSubmit={handleSaveContact}
        isSubmitting={isSubmitting}
      />

      {/* Contact Details Modal */}
      <ContactDetailModal
        isOpen={Boolean(viewingContact)}
        contact={viewingContact}
        onClose={() => setViewingContact(null)}
        onEdit={(c) => {
          setViewingContact(null);
          setEditingContact(c);
          setIsModalOpen(true);
        }}
        onCopy={(text) => showToast(`Copiado: "${text}"`, 'info')}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingContact)}
        contact={deletingContact}
        onClose={() => setDeletingContact(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
