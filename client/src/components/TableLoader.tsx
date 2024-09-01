import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

type TableLoaderProps = {
	rows: number;
	colSpan: number;
};

export const TableLoader: React.FC<TableLoaderProps> = ({ rows, colSpan }) => {
	const arr = Array(rows).fill(null);
	return (
		<>
			{arr.map((_item, i) => (
				<TableBody key={i}>
					<TableRow>
						<TableCell colSpan={colSpan}>
							<Skeleton />
						</TableCell>
					</TableRow>
				</TableBody>
			))}
		</>
	);
};
