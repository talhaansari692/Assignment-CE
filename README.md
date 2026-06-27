# Advanced Editable Data Table

A data-intensive editable table component built with **React** and **Tailwind CSS**, handling 10,000+ rows with pagination, inline editing, sorting, filtering, and CSV export.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/talhaansari692/Assignment-CE.git
   cd Assignment-CE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production** *(optional)*
   ```bash
   npm run build
   ```

## Dependencies

This project uses **only React and Tailwind CSS**. No UI component library, no icon library, no external data-generation library.

| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `tailwindcss` + `@tailwindcss/vite` | Styling via Vite plugin (v4) |
| `vite` + `@vitejs/plugin-react` | Build tool |

## Approach & Decisions

### Framework
React with Vite — fast dev server, minimal configuration, and ESM-native builds.

### Styling
Tailwind CSS v4, integrated as a Vite plugin (`@tailwindcss/vite`) instead of the legacy PostCSS approach. No `tailwind.config.js` is needed — Tailwind scans source files automatically.

### Mock Data
10,000 rows are generated on page load using plain `Math.random()` with hardcoded name, department, and domain arrays. No external library (`faker`) is used — this keeps the dependency list small and the logic easy to explain.

### State Management
A single React Context (`TableContext.jsx`) manages the entire table state:
- The full dataset (`rows`)
- Filtered + sorted view (`processedRows`)
- The current page slice (`paginatedRows`)
- Per-row edit drafts (`editingRows`) and last-saved snapshots (`originalRows`)
- Sort config, filter text, and pagination state

This avoids prop-drilling while keeping all logic in one readable file.

### Pagination
Users can choose to display 10, 50, or 100 rows per page (default: 10). The pagination controls show:
- Current record range (e.g. "Showing 1–10 of 10,000 records")
- Current page and total pages
- Page number buttons with smart ellipsis for large page counts
- Previous / Next navigation

Changing the filter, sort column, or rows-per-page automatically resets to page 1.

### Inline Editing
Each row has an Edit button (visible on hover). Clicking it puts that row into edit mode, rendering `<input>` fields for all editable columns (Name, Email, Department, Salary). Actions per row:
- **Save** — writes the draft back into the main dataset
- **Cancel** — discards the draft and exits edit mode
- **Undo** — reverts a previously saved row back to its original state

### Sorting
Clicking any column header cycles through: Ascending → Descending → No sort. An arrow indicator (↑ / ↓) shows the active sort direction. Sorting is handled in-memory via `Array.sort` inside a `useMemo`.

### Filtering
A single global search input filters across all fields (ID, Name, Email, Department, Salary) using a case-insensitive string match. A clear (×) button resets the filter instantly.

### CSV Export
The Export CSV button triggers a browser download of the full 10,000-row dataset using the native `Blob` and `URL.createObjectURL` APIs. No library required.

### Unsaved Changes Warning
A `beforeunload` event listener is registered whenever any row is in edit mode. If the user attempts to refresh or close the tab, the browser shows a confirmation prompt.

### Icons
All icons are inline SVGs — no icon library dependency. They are defined as small, reusable React components in each file that uses them.

## Project Structure

```
src/
├── context/
│   └── TableContext.jsx   # Global state: data, sort, filter, pagination, editing
├── components/
│   ├── TableContainer.jsx # Page layout + Pagination controls
│   ├── TableBody.jsx      # Table header + paginated row list
│   ├── TableRow.jsx       # Single row: view mode and edit mode
│   └── FilterBar.jsx      # Search input + CSV export button
└── utils/
    ├── mockData.js         # Generates 10,000 mock employee records
    └── csvExport.js        # Converts data to CSV and triggers download
```

## Known Limitations

- **Column-level filtering** is not implemented. The search applies globally across all fields. Per-column filter inputs could be added to the `TableContext` state with minimal refactoring.
- **No row validation** — negative salaries or malformed emails are accepted. Basic HTML5 input types (`type="email"`, `type="number"`) provide minimal browser-level hints only.
- **Mobile layout** — the table requires horizontal space. On narrow screens, rightmost columns may be partially obscured. A responsive card-per-row layout would improve the mobile experience.
