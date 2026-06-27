export function exportToCSV(data, filename = 'employees.csv') {
  if (!data || data.length === 0) return;

  const headers = ['ID', 'Name', 'Email', 'Department', 'Salary'];
  const keys = ['id', 'name', 'email', 'department', 'salary'];

  const rows = data.map(row =>
    keys.map(k => `"${String(row[k]).replace(/"/g, '""')}"`).join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
