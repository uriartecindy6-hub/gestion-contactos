import React from 'react';
import { SearchX, UserPlus, RotateCcw } from 'lucide-react';

export default function EmptyState({
  isSearching,
  searchTerm,
  selectedCategory,
  onClearFilters,
  onOpenCreate,
  onResetData
}) {
  if (isSearching) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md mx-auto my-12 shadow-xs">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No se encontraron contactos</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          No hay resultados que coincidan con{' '}
          {searchTerm && <span className="font-semibold text-slate-700">"{searchTerm}"</span>}
          {searchTerm && selectedCategory !== 'Todos' && ' en la categoría '}
          {selectedCategory !== 'Todos' && (
            <span className="font-semibold text-slate-700">"{selectedCategory}"</span>
          )}.
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          Limpiar filtros de búsqueda
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md mx-auto my-12 shadow-xs">
      <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
        <UserPlus className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">Sin contactos registrados</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Tu libreta de contactos está vacía. Puedes comenzar agregando un nuevo contacto o restablecer los datos de prueba iniciales.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenCreate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nuevo Contacto</span>
        </button>
        <button
          onClick={onResetData}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restablecer Datos</span>
        </button>
      </div>
    </div>
  );
}
