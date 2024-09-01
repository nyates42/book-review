import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

function App() {
	const routing = useRoutes(routes());
	return (
		<>
			<CssBaseline />
			{routing}
		</>
	);
}

export default App;
