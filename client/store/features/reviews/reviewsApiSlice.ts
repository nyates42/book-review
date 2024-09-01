import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IReviewsAPIResponse {
	status: boolean;
	path: string;
	statusCode: number;
	result: IReview[];
}

export interface IReviewResponse {
	status: boolean;
	path: string;
	statusCode: number;
	result: IReview;
}

export interface IReview {
	Id: number;
	Review: string;
	Score: number;
	AddedDate: string;
	BookID: number;
}

export interface INewReviewForm {
	bookID: number;
	review: string;
	score: number;
}

export const reviewsApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	reducerPath: 'reviewsApi',
	// Tag types are used for caching and invalidation.
	tagTypes: ['Reviews'],
	endpoints: (build) => ({
		getReviews: build.query<IReviewsAPIResponse, number>({
			query: (bookId) => `/reviews/${bookId}`,
			providesTags: ['Reviews'],
		}),
		addNewReview: build.mutation<IReviewResponse, INewReviewForm>({
			query: (initialPost) => ({
				url: '/reviews',
				method: 'POST',
				body: initialPost,
			}),
			invalidatesTags: ['Reviews'],
		}),
	}),
});

export const { useGetReviewsQuery, useAddNewReviewMutation } = reviewsApiSlice;
