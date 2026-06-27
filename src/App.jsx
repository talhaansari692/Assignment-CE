import { TableProvider } from './context/TableContext';
import { TableContainer } from './components/TableContainer';

export default function App() {
  return (
    <TableProvider>
      <TableContainer />
    </TableProvider>
  );
}
