import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IBooksAPIResponse {
	status: boolean;
	path: string;
	statusCode: number;
	result: IBook[];
}

export interface IBookResponse {
	status: boolean;
	path: string;
	statusCode: number;
	result: IBook;
}

export interface IBook {
	Id: number;
	Title: string;
	Author: string;
	Description: string;
	AddedDate: string;
	bookID?: number;
	avgScore?: number;
}

export interface INewBookForm {
	title: string;
	author: string;
	description: string;
}

export const booksApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	reducerPath: 'booksApi',
	// Tag types are used for caching and invalidation.
	tagTypes: ['Books'],
	endpoints: (build) => ({
		getBooks: build.query<IBooksAPIResponse, string | undefined>({
			query: () => `/books`,
			providesTags: ['Books'],
		}),
		getBook: build.query<IBookResponse, string>({
			query: (bookId) => `/books/${bookId}`,
		}),
		addNewBook: build.mutation<IBookResponse, INewBookForm>({
			query: (initialPost) => ({
				url: '/books',
				method: 'POST',
				body: initialPost,
			}),
			invalidatesTags: ['Books'],
		}),
	}),
});

export const { useGetBooksQuery, useGetBookQuery, useAddNewBookMutation } = booksApiSlice;
