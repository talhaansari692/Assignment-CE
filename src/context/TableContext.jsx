import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { generateMockData } from '../utils/mockData';

const TableContext = createContext(null);

export function useTable() {
  return useContext(TableContext);
}

export function TableProvider({ children }) {
  const [rows, setRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, dir: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [editingRows, setEditingRows] = useState({});
  const [originalRows, setOriginalRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const data = generateMockData(10000);
    setRows(data);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterText, sortConfig, rowsPerPage]);

  useEffect(() => {
    const hasUnsaved = Object.keys(editingRows).length > 0;
    const handler = (e) => {
      if (hasUnsaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [editingRows]);

  function requestSort(key) {
    setSortConfig(prev => {
      if (prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return { key: null, dir: 'asc' };
    });
  }

  function startEdit(row) {
    setEditingRows(prev => ({ ...prev, [row.id]: { ...row } }));
    setOriginalRows(prev => ({ ...prev, [row.id]: { ...row } }));
  }

  function cancelEdit(id) {
    setEditingRows(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function updateField(id, field, value) {
    setEditingRows(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  }

  function saveEdit(id) {
    const updated = editingRows[id];
    setRows(prev => prev.map(r => (r.id === id ? updated : r)));
    cancelEdit(id);
    setOriginalRows(prev => ({ ...prev, [id]: updated }));
  }

  function undoEdit(id) {
    const original = originalRows[id];
    if (!original) return;
    setRows(prev => prev.map(r => (r.id === id ? original : r)));
    cancelEdit(id);
  }

  const processedRows = useMemo(() => {
    let result = rows;

    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      result = result.filter(r =>
        Object.values(r).some(v => String(v).toLowerCase().includes(q))
      );
    }

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const av = a[sortConfig.key];
        const bv = b[sortConfig.key];
        if (typeof av === 'number') {
          return sortConfig.dir === 'asc' ? av - bv : bv - av;
        }
        const cmp = String(av).localeCompare(String(bv));
        return sortConfig.dir === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [rows, filterText, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(processedRows.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return processedRows.slice(start, start + rowsPerPage);
  }, [processedRows, safePage, rowsPerPage]);

  function goToPage(page) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  const value = {
    rows,
    processedRows,
    paginatedRows,
    sortConfig,
    requestSort,
    filterText,
    setFilterText,
    editingRows,
    originalRows,
    startEdit,
    cancelEdit,
    updateField,
    saveEdit,
    undoEdit,
    currentPage: safePage,
    rowsPerPage,
    totalPages,
    setRowsPerPage,
    goToPage,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}
