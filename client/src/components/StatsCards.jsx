import React from 'react';
import { Users, Briefcase, Heart, Smile } from 'lucide-react';

export default function StatsCards({ contacts, activeCategory, onSelectCategory }) {
  const stats = {
    total: contacts.length,
    trabajo: contacts.filter(c => c.categoria === 'Trabajo').length,
    familia: contacts.filter(c => c.categoria === 'Familia').length,
    amigos: contacts.filter(c => c.categoria === 'Amigos').length
  };

  const cards = [
    {
      id: 'Todos',
      label: 'Total Contactos',
      count: stats.total,
      icon: Users,
      color: 'indigo',
      activeBorder: 'ring-2 ring-indigo-500 border-indigo-500 shadow-indigo-100',
      iconBg: 'bg-indigo-50 text-indigo-600',
      badgeColor: 'bg-indigo-100/70 text-indigo-700'
    },
    {
      id: 'Trabajo',
      label: 'Trabajo',
      count: stats.trabajo,
      icon: Briefcase,
      color: 'blue',
      activeBorder: 'ring-2 ring-blue-500 border-blue-500 shadow-blue-100',
      iconBg: 'bg-blue-50 text-blue-600',
      badgeColor: 'bg-blue-100/70 text-blue-700'
    },
    {
      id: 'Familia',
      label: 'Familia',
      count: stats.familia,
      icon: Heart,
      color: 'emerald',
      activeBorder: 'ring-2 ring-emerald-500 border-emerald-500 shadow-emerald-100',
      iconBg: 'bg-emerald-50 text-emerald-600',
      badgeColor: 'bg-emerald-100/70 text-emerald-700'
    },
    {
      id: 'Amigos',
      label: 'Amigos',
      count: stats.amigos,
      icon: Smile,
      color: 'amber',
      activeBorder: 'ring-2 ring-amber-500 border-amber-500 shadow-amber-100',
      iconBg: 'bg-amber-50 text-amber-600',
      badgeColor: 'bg-amber-100/70 text-amber-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
      {cards.map(card => {
        const Icon = card.icon;
        const isActive = activeCategory === card.id;

        return (
          <button
            key={card.id}
            onClick={() => onSelectCategory(card.id)}
            className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 transition-all duration-200 text-left hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
              isActive ? `${card.activeBorder} shadow-sm bg-slate-50/50` : 'hover:border-slate-300'
            }`}
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase block">
                {card.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.count}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                  {stats.total > 0 ? Math.round((card.count / stats.total) * 100) : 0}%
                </span>
              </div>
            </div>

            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
