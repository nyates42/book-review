import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { BookList } from './components/BookList';
import { NotFound } from './components/NotFound';
import { ReviewList } from './components/ReviewList';

export const routes = (): RouteObject[] => [
	{
		path: '/',
		element: <Outlet />,
		children: [
			{ index: true, element: <BookList /> },
			{ path: '/reviews/:BookID', element: <ReviewList /> },
			{ path: '/404', element: <NotFound /> },
			{ path: '*', element: <Navigate to="/404" replace /> },
		],
	},
];
