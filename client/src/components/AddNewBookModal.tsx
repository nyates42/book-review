import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Dialog, DialogContent, IconButton, Portal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { INewBookForm, useAddNewBookMutation } from '../../store/features/books/booksApiSlice';

type AddNewBookModalProps = {
	onClose: () => void;
};

export const AddNewBookModal: React.FC<AddNewBookModalProps> = ({ onClose }) => {
	const [addNewBook, { error }] = useAddNewBookMutation();

	const interestHoldSchema = object({
		title: string().required('Title is required').max(512),
		author: string().required('Author is required').max(512),
		description: string().required('Description is required').max(1028),
	});

	const initialValues: INewBookForm = {
		title: '',
		author: '',
		description: '',
	};

	const handleSubmit = async (values: INewBookForm) => {
		try {
			const res = await addNewBook({ title: values.title, author: values.author, description: values.description }).unwrap();
			if (res && res.status) {
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
						<Typography>Failed to save new book</Typography>
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
									<Grid size={{ xs: 12, md: 6 }}>
										<Typography variant="subtitle2" gutterBottom>
											Title
										</Typography>
										<TextField
											error={Boolean(touched.title && errors.title)}
											fullWidth
											variant="outlined"
											name="title"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.title}
											helperText={touched.title && errors.title}
										/>
									</Grid>
									<Grid size={{ xs: 12, md: 6 }}>
										<Typography variant="subtitle2" gutterBottom>
											Author
										</Typography>
										<TextField
											error={Boolean(touched.author && errors.author)}
											fullWidth
											variant="outlined"
											name="author"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.author}
											helperText={touched.author && errors.author}
										/>
									</Grid>
									<Grid size={{ xs: 12, md: 12 }}>
										<Typography variant="subtitle2" gutterBottom>
											Description
										</Typography>
										<TextField
											error={Boolean(touched.description && errors.description)}
											fullWidth
											multiline
											minRows={3}
											variant="outlined"
											name="description"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.description}
											helperText={touched.description && errors.description}
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
