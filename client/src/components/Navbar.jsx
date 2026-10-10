import React from 'react';
import { Users, UserPlus, RotateCcw, Download } from 'lucide-react';

export default function Navbar({ onOpenCreate, onResetData, onExport, totalCount }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-100">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Contact<span className="text-indigo-600">Hub</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {totalCount} {totalCount === 1 ? 'contacto' : 'contactos'}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Sistema Integral de Gestión de Contactos
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reset mock data button */}
            <button
              onClick={onResetData}
              title="Restablecer a datos de prueba originales"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all duration-150 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span className="hidden md:inline">Restablecer datos</span>
            </button>

            {/* Export CSV button */}
            <button
              onClick={onExport}
              title="Exportar contactos a formato CSV"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all duration-150 active:scale-95"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span className="hidden md:inline">Exportar</span>
            </button>

            {/* Add Contact button */}
            <button
              onClick={onOpenCreate}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-150 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Nuevo Contacto</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
