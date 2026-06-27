import { useTable } from '../context/TableContext';

const DEPT_COLORS = {
  Engineering:  'bg-blue-50 text-blue-700 ring-blue-200',
  Marketing:    'bg-pink-50 text-pink-700 ring-pink-200',
  Sales:        'bg-emerald-50 text-emerald-700 ring-emerald-200',
  HR:           'bg-purple-50 text-purple-700 ring-purple-200',
  Finance:      'bg-amber-50 text-amber-700 ring-amber-200',
  Design:       'bg-rose-50 text-rose-700 ring-rose-200',
  Operations:   'bg-cyan-50 text-cyan-700 ring-cyan-200',
  Legal:        'bg-slate-100 text-slate-700 ring-slate-200',
  Support:      'bg-orange-50 text-orange-700 ring-orange-200',
  Product:      'bg-violet-50 text-violet-700 ring-violet-200',
};

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 0 1 2.828 2.828L11.828 15.828a2 2 0 0 1-1.414.586H8v-2.414a2 2 0 0 1 .586-1.414z" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 0 1 0 10H9M3 10l4-4M3 10l4 4" />
    </svg>
  );
}

export const ROW_HEIGHT = 52;

export function TableRow({ row, index }) {
  const { editingRows, originalRows, startEdit, cancelEdit, updateField, saveEdit, undoEdit } = useTable();

  const isEditing = !!editingRows[row.id];
  const draft = editingRows[row.id] || {};
  const original = originalRows[row.id];
  const isDirty = original && JSON.stringify(original) !== JSON.stringify(row);
  const deptColor = DEPT_COLORS[row.department] || 'bg-slate-100 text-slate-600 ring-slate-200';

  const input = 'w-full px-2.5 py-1.5 text-sm border border-indigo-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white transition-all';
  const rowBg = isEditing ? 'bg-indigo-50/70' : index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60';

  return (
    <div
      style={{ height: ROW_HEIGHT }}
      className={`flex w-full border-b border-slate-100 group transition-colors duration-100 ${rowBg} ${!isEditing ? 'hover:bg-indigo-50/40' : ''}`}
    >
      <div className="flex items-center px-4 w-[8%] text-xs text-slate-400 font-mono shrink-0">
        #{row.id}
      </div>

      <div className="flex items-center px-3 w-[22%] text-sm font-medium text-slate-800 truncate">
        {isEditing
          ? <input className={input} value={draft.name} onChange={e => updateField(row.id, 'name', e.target.value)} autoFocus />
          : <span className="truncate">{row.name}</span>
        }
      </div>

      <div className="flex items-center px-3 w-[26%] text-sm text-slate-500 truncate">
        {isEditing
          ? <input type="email" className={input} value={draft.email} onChange={e => updateField(row.id, 'email', e.target.value)} />
          : <span className="truncate">{row.email}</span>
        }
      </div>

      <div className="flex items-center px-3 w-[20%]">
        {isEditing
          ? <input className={input} value={draft.department} onChange={e => updateField(row.id, 'department', e.target.value)} />
          : (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${deptColor}`}>
              {row.department}
            </span>
          )
        }
      </div>

      <div className="flex items-center px-3 w-[14%] font-mono text-sm font-semibold text-emerald-700">
        {isEditing
          ? <input type="number" className={input} value={draft.salary} onChange={e => updateField(row.id, 'salary', Number(e.target.value))} />
          : `$${row.salary.toLocaleString()}`
        }
      </div>

      <div className="flex items-center justify-end px-4 w-[10%] gap-1.5">
        {isEditing ? (
          <>
            <button
              onClick={() => saveEdit(row.id)}
              title="Save"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <SaveIcon /> Save
            </button>
            <button
              onClick={() => cancelEdit(row.id)}
              title="Cancel"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 bg-slate-200 hover:bg-slate-300 transition-colors"
            >
              <CancelIcon />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => startEdit(row)}
              title="Edit row"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <EditIcon /> Edit
            </button>
            {isDirty && (
              <button
                onClick={() => undoEdit(row.id)}
                title="Undo changes"
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <UndoIcon />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
