export const CATEGORIES = ['Trabajo', 'Familia', 'Amigos'];

export const CATEGORY_CONFIG = {
  Trabajo: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10',
    avatarBg: 'from-blue-500 to-indigo-600',
    dot: 'bg-blue-500',
    label: 'Trabajo'
  },
  Familia: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10',
    avatarBg: 'from-emerald-500 to-teal-600',
    dot: 'bg-emerald-500',
    label: 'Familia'
  },
  Amigos: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10',
    avatarBg: 'from-amber-500 to-orange-600',
    dot: 'bg-amber-500',
    label: 'Amigos'
  }
};

// Returns user initials for stylish avatar
export function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Download list as CSV file
export function exportToCSV(contacts) {
  if (!contacts || contacts.length === 0) return;
  const headers = ['Nombre', 'Teléfono', 'Email', 'Categoría', 'Notas', 'Favorito', 'Fecha Creación'];
  const rows = contacts.map(c => [
    `"${(c.nombre || '').replace(/"/g, '""')}"`,
    `"${(c.telefono || '').replace(/"/g, '""')}"`,
    `"${(c.email || '').replace(/"/g, '""')}"`,
    `"${(c.categoria || '').replace(/"/g, '""')}"`,
    `"${(c.notas || '').replace(/"/g, '""')}"`,
    c.favorito ? 'Sí' : 'No',
    c.createdAt || ''
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `contactos_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
