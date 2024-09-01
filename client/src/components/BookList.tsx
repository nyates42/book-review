import AddIcon from '@mui/icons-material/Add';
import {
	Alert,
	Button,
	Container,
	Paper,
	Portal,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '../../store/features/books/booksApiSlice';
import { AddNewBookModal } from './AddNewBookModal';
import { TableLoader } from './TableLoader';

export const BookList: React.FC = () => {
	const { data, error, isLoading } = useGetBooksQuery(undefined, { refetchOnMountOrArgChange: true });
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<Portal>
				<Snackbar open={Boolean(error)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>Loading books failed</Typography>
					</Alert>
				</Snackbar>
			</Portal>
			<Container maxWidth="xl">
				<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={1}>
					<Grid>
						<Typography variant="h3">Book Reviews</Typography>
						<Typography variant="caption">Click on book to leave a review</Typography>
					</Grid>
					<Grid>
						<Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsOpen(true)}>
							Add Book
						</Button>
					</Grid>
				</Grid>
				<TableContainer component={Paper}>
					<Table aria-label="books table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>Author</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Avg Rating</TableCell>
							</TableRow>
						</TableHead>
						{isLoading && <TableLoader rows={5} colSpan={4} />}
						{!isLoading && (
							<TableBody>
								{data &&
									data.result.map((row) => (
										<TableRow
											key={row.Id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
											hover
											onClick={() => navigate(`/reviews/${row.Id}`)}
										>
											<TableCell component="th" scope="row">
												{row.Title}
											</TableCell>
											<TableCell>{row.Author}</TableCell>
											<TableCell>{row.Description}</TableCell>
											<TableCell>{row?.avgScore || '-'}</TableCell>
										</TableRow>
									))}
							</TableBody>
						)}
					</Table>
				</TableContainer>
			</Container>
			{isOpen && <AddNewBookModal onClose={() => setIsOpen(false)} />}
		</>
	);
};
