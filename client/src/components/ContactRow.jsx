import React, { useState } from 'react';
import { Phone, Mail, Edit3, Trash2, Star, Eye, Copy, Check, Briefcase, Heart, Smile } from 'lucide-react';
import { getInitials, CATEGORY_CONFIG } from '../utils/helpers';

export default function ContactRow({
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
    <div className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 p-4 transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
      {/* Left: Avatar & Main info */}
      <div className="flex items-center gap-3.5 min-w-[240px]">
        {/* Favorite star */}
        <button
          onClick={() => onToggleFavorite(contact)}
          className={`p-1 rounded-lg transition-colors ${
            contact.favorito
              ? 'text-amber-400 hover:text-amber-500'
              : 'text-slate-300 hover:text-amber-400'
          }`}
          title={contact.favorito ? 'Quitar de favoritos' : 'Marcar como favorito'}
        >
          <Star className={`w-4 h-4 ${contact.favorito ? 'fill-current' : ''}`} />
        </button>

        {/* Avatar */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${config.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}>
          {getInitials(contact.nombre)}
        </div>

        {/* Name and notes preview */}
        <div>
          <h4
            onClick={() => onView(contact)}
            className="font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors text-sm"
          >
            {contact.nombre}
          </h4>
          {contact.notas && (
            <p className="text-xs text-slate-400 truncate max-w-xs">{contact.notas}</p>
          )}
        </div>
      </div>

      {/* Middle: Category badge */}
      <div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.badge}`}>
          {getCategoryIcon(contact.categoria)}
          {contact.categoria}
        </span>
      </div>

      {/* Middle-Right: Phone & Email */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <a href={`tel:${contact.telefono}`} className="hover:text-indigo-600 transition-colors">
            {contact.telefono}
          </a>
          <button
            onClick={(e) => handleCopyText(e, contact.telefono, 'phone')}
            className="text-slate-400 hover:text-slate-700"
            title="Copiar"
          >
            {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <a href={`mailto:${contact.email}`} className="hover:text-indigo-600 transition-colors">
            {contact.email}
          </a>
          <button
            onClick={(e) => handleCopyText(e, contact.email, 'email')}
            className="text-slate-400 hover:text-slate-700"
            title="Copiar"
          >
            {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 self-end md:self-auto">
        <button
          onClick={() => onView(contact)}
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Ver detalle"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(contact)}
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Editar"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
