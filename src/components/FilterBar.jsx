import { useTable } from '../context/TableContext';
import { exportToCSV } from '../utils/csvExport';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5 5 5-5M12 4v11" />
    </svg>
  );
}

export function FilterBar() {
  const { filterText, setFilterText, rows, processedRows } = useTable();

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white px-5 py-4 border-b border-slate-100">
      <div className="relative w-full sm:w-96">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <SearchIcon />
        </span>
        <input
          type="text"
          id="global-search"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          placeholder="Search by name, email, department…"
          className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 placeholder:text-slate-400"
        />
        {filterText && (
          <button
            onClick={() => setFilterText('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition text-base leading-none"
            title="Clear"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {filterText && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
            {processedRows.length.toLocaleString()} result{processedRows.length !== 1 ? 's' : ''}
          </span>
        )}
        <button
          id="export-csv-btn"
          onClick={() => exportToCSV(rows)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-150 shadow-sm shadow-indigo-200"
        >
          <DownloadIcon />
          Export CSV
        </button>
      </div>
    </div>
  );
}
