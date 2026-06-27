import { useTable } from '../context/TableContext';
import { TableRow } from './TableRow';

function SortIcon({ column }) {
  const { sortConfig } = useTable();
  if (sortConfig.key !== column) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {sortConfig.dir === 'asc'
        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      }
    </svg>
  );
}

function Header() {
  const { requestSort } = useTable();
  const th = 'flex items-center px-3 py-3.5 text-xs font-semibold text-indigo-200 uppercase tracking-wider cursor-pointer hover:text-white hover:bg-white/10 transition-all duration-150 select-none group';
  return (
    <div className="hidden sm:flex w-full bg-gradient-to-r from-indigo-700 to-indigo-600 shrink-0">
      <div className={`${th} w-[8%] cursor-default hover:bg-transparent pl-4`}>ID</div>
      <div className={`${th} w-[22%]`} onClick={() => requestSort('name')}>Name <SortIcon column="name" /></div>
      <div className={`${th} w-[26%]`} onClick={() => requestSort('email')}>Email <SortIcon column="email" /></div>
      <div className={`${th} w-[20%]`} onClick={() => requestSort('department')}>Department <SortIcon column="department" /></div>
      <div className={`${th} w-[14%]`} onClick={() => requestSort('salary')}>Salary <SortIcon column="salary" /></div>
      <div className={`${th} w-[10%] cursor-default hover:bg-transparent justify-end pr-4`}>Actions</div>
    </div>
  );
}

function MobileSortBar() {
  const { requestSort, sortConfig } = useTable();
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Dept' },
    { key: 'salary', label: 'Salary' },
  ];
  return (
    <div className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-indigo-700 overflow-x-auto">
      <span className="text-indigo-300 text-xs font-medium shrink-0">Sort by:</span>
      <div className="flex gap-1.5">
        {columns.map(col => {
          const active = sortConfig.key === col.key;
          return (
            <button
              key={col.key}
              onClick={() => requestSort(col.key)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                active
                  ? 'bg-white text-indigo-700'
                  : 'bg-white/10 text-indigo-200 hover:bg-white/20'
              }`}
            >
              {col.label}
              {active && (sortConfig.dir === 'asc' ? ' ↑' : ' ↓')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TableBody() {
  const { paginatedRows } = useTable();

  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <MobileSortBar />

      {paginatedRows.length > 0 ? (
        <div className="overflow-y-auto">
          {paginatedRows.map((row, index) => (
            <TableRow key={row.id} row={row} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">No records found</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
