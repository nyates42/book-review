import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Dialog, DialogContent, IconButton, Portal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import { addToList, selectReviewList } from '../../store/features/counter/counterSlice';
import { INewReviewForm, useAddNewReviewMutation } from '../../store/features/reviews/reviewsApiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useState } from 'react';

type AddNewReviewModalProps = {
	bookID: number;
	onClose: () => void;
};

export const AddNewReviewModal: React.FC<AddNewReviewModalProps> = ({ bookID, onClose }) => {
	const dispatch = useAppDispatch();
	const currentList = useAppSelector(selectReviewList);
	const [addNewBook, { error }] = useAddNewReviewMutation();
	const [unqErr, setUnqErr] = useState(false);

	const interestHoldSchema = object({
		review: string().required('Review is required').max(1028),
		score: number().required('Score is required').min(1, 'Score must be between 1 - 5').max(5, 'Score must be between 1 - 5'),
	});

	const initialValues: INewReviewForm = {
		bookID,
		review: '',
		score: 0,
	};

	const handleSubmit = async (values: INewReviewForm) => {
		const match = currentList.includes(Number(bookID));
		if (match) {
			return setUnqErr(true);
		}
		try {
			const res = await addNewBook({ bookID, review: values.review, score: Number(values.score) }).unwrap();
			if (res && res.status) {
				dispatch(addToList(bookID));
				return onClose();
			}
		} catch (err) {
			console.error('Failed to save the book: ', err);
		}
	};

	return (
		<>
			<Portal>
				<Snackbar open={Boolean(error)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>Failed to save new review</Typography>
					</Alert>
				</Snackbar>
				<Snackbar open={unqErr} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>You can only review the same book once.</Typography>
					</Alert>
				</Snackbar>
			</Portal>
			<Dialog open onClose={onClose} maxWidth="sm" fullWidth>
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent sx={{ p: 6 }}>
					<Stack mb={2}>
						<Grid container direction="row" justifyContent="center" alignItems="flex-start" mb={1}>
							<BookIcon color="primary" sx={{ fontSize: 60 }} />
						</Grid>
						<Typography align="center" variant="h4">
							Add Book
						</Typography>
					</Stack>
					<Formik initialValues={initialValues} validationSchema={interestHoldSchema} onSubmit={handleSubmit} validateOnChange validateOnBlur>
						{({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
							<Form autoComplete="off">
								<Grid container spacing={2} mt={2}>
									<Grid size={{ xs: 12 }}>
										<Typography variant="subtitle2" gutterBottom>
											Score
										</Typography>
										<TextField
											error={Boolean(touched.score && errors.score)}
											fullWidth
											variant="outlined"
											name="score"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.score}
											helperText={touched.score && errors.score}
										/>
									</Grid>
									<Grid size={{ xs: 12 }}>
										<Typography variant="subtitle2" gutterBottom>
											Review
										</Typography>
										<TextField
											error={Boolean(touched.review && errors.review)}
											fullWidth
											multiline
											minRows={3}
											variant="outlined"
											name="review"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.review}
											helperText={touched.review && errors.review}
										/>
									</Grid>
								</Grid>
								<Stack direction="row" justifyContent="center" spacing={4} mt={6}>
									<Button fullWidth size="large" color="primary" variant="outlined" onClick={onClose}>
										Cancel
									</Button>
									<LoadingButton fullWidth size="large" color="primary" variant="contained" type="submit" loading={isSubmitting}>
										Submit
									</LoadingButton>
								</Stack>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);
};
