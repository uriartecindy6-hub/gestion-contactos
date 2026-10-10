import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, Edit3, Star, Copy, Check, Briefcase, Heart, Smile, ExternalLink } from 'lucide-react';
import { getInitials, CATEGORY_CONFIG } from '../utils/helpers';

export default function ContactDetailModal({
  isOpen,
  contact,
  onClose,
  onEdit,
  onCopy
}) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen || !contact) return null;

  const config = CATEGORY_CONFIG[contact.categoria] || {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    avatarBg: 'from-slate-500 to-slate-700',
    label: contact.categoria
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Trabajo': return <Briefcase className="w-4 h-4 mr-1.5" />;
      case 'Familia': return <Heart className="w-4 h-4 mr-1.5" />;
      case 'Amigos': return <Smile className="w-4 h-4 mr-1.5" />;
      default: return null;
    }
  };

  const handleCopyText = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formattedDate = contact.createdAt
    ? new Date(contact.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with gradient */}
        <div className={`h-28 bg-gradient-to-tr ${config.avatarBg} relative p-4 flex justify-between items-start`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar & Header Profile */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="-mt-14 flex items-end justify-between mb-4">
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${config.avatarBg} text-white flex items-center justify-center text-3xl font-extrabold shadow-lg ring-4 ring-white`}>
              {getInitials(contact.nombre)}
            </div>

            <div className="flex items-center gap-2">
              {contact.favorito && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  Favorito
                </span>
              )}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.badge}`}>
                {getCategoryIcon(contact.categoria)}
                {contact.categoria}
              </span>
            </div>
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{contact.nombre}</h2>

          {/* Detailed Info Cards */}
          <div className="mt-5 space-y-3">
            {/* Phone */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-indigo-600 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Teléfono</span>
                  <a href={`tel:${contact.telefono}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                    {contact.telefono}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyText(contact.telefono, 'phone')}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
                  title="Copiar teléfono"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`tel:${contact.telefono}`}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Llamar"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-indigo-600 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Correo Electrónico</span>
                  <a href={`mailto:${contact.email}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyText(contact.email, 'email')}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
                  title="Copiar correo"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`mailto:${contact.email}`}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Enviar correo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Notes */}
            {contact.notas && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Notas</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{contact.notas}</p>
              </div>
            )}

            {/* Created At */}
            {formattedDate && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 px-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Registrado el {formattedDate}</span>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onEdit(contact);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
