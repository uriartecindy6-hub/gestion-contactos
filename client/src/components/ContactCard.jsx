import React, { useState } from 'react';
import { Phone, Mail, Edit3, Trash2, Star, Eye, Copy, Check, Briefcase, Heart, Smile } from 'lucide-react';
import { getInitials, CATEGORY_CONFIG } from '../utils/helpers';

export default function ContactCard({
  contact,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCopy
}) {
  const [copiedField, setCopiedField] = useState(null);
  const config = CATEGORY_CONFIG[contact.categoria] || {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    avatarBg: 'from-slate-500 to-slate-700',
    dot: 'bg-slate-500',
    label: contact.categoria
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Trabajo': return <Briefcase className="w-3 h-3 mr-1" />;
      case 'Familia': return <Heart className="w-3 h-3 mr-1" />;
      case 'Amigos': return <Smile className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const handleCopyText = (e, text, field) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      {/* Top row: Avatar, Name & Favorite */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Styled Avatar with Initials */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${config.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-white shrink-0`}>
              {getInitials(contact.nombre)}
            </div>

            {/* Name & Category badge */}
            <div>
              <h3 
                onClick={() => onView(contact)} 
                className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer text-base leading-snug line-clamp-1"
                title={contact.nombre}
              >
                {contact.nombre}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                  {getCategoryIcon(contact.categoria)}
                  {contact.categoria}
                </span>
              </div>
            </div>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(contact)}
            className={`p-1.5 rounded-xl transition-all ${
              contact.favorito
                ? 'text-amber-400 hover:text-amber-500 bg-amber-50'
                : 'text-slate-300 hover:text-amber-400 hover:bg-slate-50'
            }`}
            title={contact.favorito ? 'Quitar de favoritos' : 'Marcar como favorito'}
          >
            <Star className={`w-4 h-4 ${contact.favorito ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Contact info list */}
        <div className="mt-4 space-y-2 text-xs sm:text-sm">
          {/* Phone */}
          <div className="flex items-center justify-between text-slate-600 hover:text-slate-900 group/row py-0.5">
            <a
              href={`tel:${contact.telefono}`}
              className="flex items-center gap-2 hover:text-indigo-600 truncate transition-colors"
              title="Llamar"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400 group-hover/row:text-indigo-500 shrink-0" />
              <span className="truncate">{contact.telefono}</span>
            </a>
            <button
              onClick={(e) => handleCopyText(e, contact.telefono, 'phone')}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 rounded transition-opacity"
              title="Copiar teléfono"
            >
              {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between text-slate-600 hover:text-slate-900 group/row py-0.5">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 hover:text-indigo-600 truncate transition-colors"
              title="Enviar correo"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400 group-hover/row:text-indigo-500 shrink-0" />
              <span className="truncate">{contact.email}</span>
            </a>
            <button
              onClick={(e) => handleCopyText(e, contact.email, 'email')}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 rounded transition-opacity"
              title="Copiar correo"
            >
              {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Notes snippet */}
        {contact.notas && (
          <p className="mt-3 text-xs text-slate-500 italic bg-slate-50 rounded-lg p-2 line-clamp-2 border border-slate-100">
            "{contact.notas}"
          </p>
        )}
      </div>

      {/* Footer action buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onView(contact)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ver detalles</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(contact)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Editar contacto"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contact)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Eliminar contacto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
