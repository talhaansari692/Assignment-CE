import { useTable } from '../context/TableContext';
import { FilterBar } from './FilterBar';
import { TableBody } from './TableBody';

function Pagination() {
  const { currentPage, totalPages, rowsPerPage, setRowsPerPage, goToPage, processedRows } = useTable();

  function getPageNumbers() {
    const pages = [];
    const delta = 1;
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  const startRecord = processedRows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, processedRows.length);

  const navBtn = (disabled) =>
    `w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-150 border ${disabled
      ? 'border-slate-200 text-slate-300 cursor-not-allowed'
      : 'border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
    }`;

  return (
    <div className="flex flex-col gap-3 px-4 py-4 bg-white border-t border-slate-100">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-slate-500 text-center sm:text-left">
          {processedRows.length === 0 ? (
            'No records'
          ) : (
            <>
              Showing{' '}
              <span className="font-semibold text-slate-700">{startRecord}–{endRecord}</span>
              {' '}of{' '}
              <span className="font-semibold text-slate-700">{processedRows.length.toLocaleString()}</span>
              {' '}records &mdash; Page{' '}
              <span className="font-semibold text-slate-700">{currentPage}</span>
              {' '}of{' '}
              <span className="font-semibold text-slate-700">{totalPages.toLocaleString()}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <span className="shrink-0">Rows:</span>
          <div className="flex gap-1">
            {[10, 50, 100].map(n => (
              <button
                key={n}
                onClick={() => setRowsPerPage(n)}
                className={`w-10 h-8 rounded-lg text-sm font-medium transition-all duration-150 border ${rowsPerPage === n
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 flex-wrap">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1} className={navBtn(currentPage === 1)} title="First">«</button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={navBtn(currentPage === 1)} title="Previous">‹</button>

        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={`dot-${i}`} className="w-8 text-center text-slate-400 text-sm select-none">…</span>
            ) : (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 border ${p === currentPage
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={navBtn(currentPage === totalPages)} title="Next">›</button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className={navBtn(currentPage === totalPages)} title="Last">»</button>
      </div>
    </div>
  );
}

function StatsBar() {
  const { rows, processedRows, editingRows } = useTable();
  const unsavedCount = Object.keys(editingRows).length;

  const card = 'flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-100 flex-1 min-w-[140px]';

  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <div className={card}>
        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-slate-400 font-medium truncate">Total Employees</p>
          <p className="text-sm font-bold text-slate-800">{rows.length.toLocaleString()}</p>
        </div>
      </div>

      <div className={card}>
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707L13 13.414V19a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 7 21v-7.586L3.293 6.707A1 1 0 0 1 3 6V4z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-slate-400 font-medium truncate">Filtered Results</p>
          <p className="text-sm font-bold text-slate-800">{processedRows.length.toLocaleString()}</p>
        </div>
      </div>

      {unsavedCount > 0 && (
        <div className="flex items-center gap-2.5 bg-amber-50 rounded-xl px-4 py-3 shadow-sm border border-amber-100 flex-1 min-w-[140px]">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-amber-600 font-medium truncate">Rows in Edit Mode</p>
            <p className="text-sm font-bold text-amber-700">{unsavedCount} unsaved</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function TableContainer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50/30 py-6 sm:py-10">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">

        <div className="mb-5 sm:mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Employee Directory</h1>
          <p className="text-slate-500 text-sm mt-1 hidden sm:block">Manage and update your team's information across all departments.</p>
        </div>

        <StatsBar />

        <div className="rounded-xl sm:rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden bg-white">
          <FilterBar />
          <TableBody />
          <Pagination />
        </div>
      </div>
    </div>
  );
}
