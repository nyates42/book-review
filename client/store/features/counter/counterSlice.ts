import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../createAppSlice';

export interface CounterSliceState {
	bookIds: number[];
}

const initialState: CounterSliceState = {
	bookIds: [],
};

export const counterSlice = createAppSlice({
	name: 'counter',
	initialState,
	reducers: (create) => ({
		addToList: create.reducer((state, action: PayloadAction<number>) => {
			state.bookIds = [...state.bookIds, action.payload];
		}),
	}),
	selectors: {
		selectReviewList: (counter) => counter.bookIds,
	},
});

export const { addToList } = counterSlice.actions;
export const { selectReviewList } = counterSlice.selectors;
