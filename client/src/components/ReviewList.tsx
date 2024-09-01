import AddIcon from '@mui/icons-material/Add';
import {
	Alert,
	Button,
	Container,
	Link,
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
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetBookQuery } from '../../store/features/books/booksApiSlice';
import { useGetReviewsQuery } from '../../store/features/reviews/reviewsApiSlice';
import { AddNewReviewModal } from './AddNewReviewModal';
import { TableLoader } from './TableLoader';

export const ReviewList: React.FC = () => {
	const { BookID } = useParams();
	const { data, error: bookErr } = useGetBookQuery(BookID!);
	const { data: reviews, error: reviewsErr, isLoading: reviewsLoading } = useGetReviewsQuery(Number(BookID));
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Portal>
				<Snackbar open={Boolean(bookErr)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>Loading book failed</Typography>
					</Alert>
				</Snackbar>
				<Snackbar open={Boolean(reviewsErr)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>Loading book failed</Typography>
					</Alert>
				</Snackbar>
			</Portal>
			<Container maxWidth="xl">
				<Grid container>
					<Grid>
						<Link component={RouterLink} to="/" color="primary">
							<Typography>Home</Typography>
						</Link>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={1}>
					<Grid>
						<Typography variant="h3">{data?.result.Title}</Typography>
						<Typography variant="caption">by {data?.result.Author}</Typography>
					</Grid>
					<Grid>
						<Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsOpen(true)}>
							Add Review
						</Button>
					</Grid>
				</Grid>
				<TableContainer component={Paper}>
					<Table aria-label="books table">
						<TableHead>
							<TableRow>
								<TableCell>Review</TableCell>
								<TableCell>Score</TableCell>
							</TableRow>
						</TableHead>
						{reviewsLoading && <TableLoader rows={5} colSpan={2} />}
						{!reviewsLoading && (
							<TableBody>
								{reviews &&
									reviews.result.map((row) => (
										<TableRow key={row.Id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell component="th" scope="row">
												{row.Review}
											</TableCell>
											<TableCell>{row.Score}</TableCell>
										</TableRow>
									))}
							</TableBody>
						)}
					</Table>
				</TableContainer>
			</Container>
			{isOpen && <AddNewReviewModal bookID={Number(BookID)} onClose={() => setIsOpen(false)} />}
		</>
	);
};
