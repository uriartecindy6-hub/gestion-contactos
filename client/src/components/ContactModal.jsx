import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Tag, FileText, Star, Briefcase, Heart, Smile } from 'lucide-react';
import { CATEGORIES } from '../utils/helpers';

export default function ContactModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    categoria: 'Trabajo',
    notas: '',
    favorito: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        telefono: initialData.telefono || '',
        email: initialData.email || '',
        categoria: initialData.categoria || 'Trabajo',
        notas: initialData.notas || '',
        favorito: Boolean(initialData.favorito)
      });
    } else {
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        categoria: 'Trabajo',
        notas: '',
        favorito: false
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = (data) => {
    const newErrors = {};
    if (!data.nombre || data.nombre.trim() === '') {
      newErrors.nombre = 'El nombre completo es obligatorio.';
    } else if (data.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }

    if (!data.telefono || data.telefono.trim() === '') {
      newErrors.telefono = 'El número de teléfono es obligatorio.';
    } else if (data.telefono.trim().length < 6) {
      newErrors.telefono = 'El teléfono debe tener un formato válido (mín. 6 dígitos).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || data.email.trim() === '') {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(data.email.trim())) {
      newErrors.email = 'Ingrese un correo electrónico válido (ej. usuario@dominio.com).';
    }

    if (!data.categoria) {
      newErrors.categoria = 'Seleccione una categoría.';
    }

    return newErrors;
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const fieldErrors = validate(updated);
      setErrors(fieldErrors);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      nombre: true,
      telefono: true,
      email: true,
      categoria: true
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Trabajo': return <Briefcase className="w-4 h-4" />;
      case 'Familia': return <Heart className="w-4 h-4" />;
      case 'Amigos': return <Smile className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialData ? 'Editar Contacto' : 'Crear Nuevo Contacto'}
              </h2>
              <p className="text-xs text-slate-500">
                {initialData ? 'Modifica los campos del contacto seleccionado' : 'Ingresa los datos para registrar el contacto'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nombre Completo <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                onBlur={() => handleBlur('nombre')}
                placeholder="Ej. Sofía Mendoza"
                className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.nombre && touched.nombre
                    ? 'border-rose-400 focus:ring-rose-400 text-rose-900'
                    : 'border-slate-200 focus:ring-indigo-500 text-slate-900'
                }`}
              />
            </div>
            {errors.nombre && touched.nombre && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{errors.nombre}</p>
            )}
          </div>

          {/* Teléfono & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Teléfono */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Teléfono <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  onBlur={() => handleBlur('telefono')}
                  placeholder="+34 612 345 678"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.telefono && touched.telefono
                      ? 'border-rose-400 focus:ring-rose-400 text-rose-900'
                      : 'border-slate-200 focus:ring-indigo-500 text-slate-900'
                  }`}
                />
              </div>
              {errors.telefono && touched.telefono && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{errors.telefono}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="sofia@ejemplo.com"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.email && touched.email
                      ? 'border-rose-400 focus:ring-rose-400 text-rose-900'
                      : 'border-slate-200 focus:ring-indigo-500 text-slate-900'
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Categoría Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Categoría <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = formData.categoria === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleChange('categoria', cat)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? cat === 'Trabajo'
                          ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                          : cat === 'Familia'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20'
                          : 'bg-amber-50 border-amber-500 text-amber-700 ring-2 ring-amber-500/20'
                        : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Notas / Observaciones (Opcional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                rows="2"
                value={formData.notas}
                onChange={(e) => handleChange('notas', e.target.value)}
                placeholder="Puesto de trabajo, relación o información relevante..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 transition-all resize-none"
              />
            </div>
          </div>

          {/* Favorito Checkbox */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <Star className={`w-4 h-4 ${formData.favorito ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Marcar como contacto favorito</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.favorito}
                onChange={(e) => handleChange('favorito', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : initialData ? 'Guardar Cambios' : 'Crear Contacto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
