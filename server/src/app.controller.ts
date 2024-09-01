import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Book as BookModel, BookReview as ReviewModel } from '@prisma/client';
import { BookService } from './book.service';
import { ReviewService } from './review.service';

interface BooksWithScore extends BookModel {
	avgScore: number;
}

@Controller()
export class AppController {
	constructor(
		private readonly bookService: BookService,
		private readonly reviewService: ReviewService,
	) {}

	@Get('books')
	async getBooks(): Promise<BooksWithScore[]> {
		const prom1 = this.bookService.books({});
		const prom2 = this.reviewService.getBookReviewsAvg();
		const [books, avgReviews] = await Promise.all([prom1, prom2]);
		// Join the average review score onto books obj
		return books.map((t1) => ({ ...t1, ...avgReviews.find((t2) => t2.bookID === t1.Id) }));
	}

	@Get('books/:id')
	async getBookByBookID(@Param('id') id: string): Promise<BookModel> {
		const book = await this.bookService.books({
			where: { Id: Number(id) },
		});
		return book[0];
	}

	@Post('books')
	async createBook(@Body() postData: { title: string; author: string; description: string }): Promise<BookModel> {
		const { title, author, description } = postData;
		return this.bookService.createBook({
			Title: title,
			Author: author,
			Description: description,
		});
	}

	@Get('reviews/:id')
	async getReviewsByBookID(@Param('id') id: string): Promise<ReviewModel[]> {
		return this.reviewService.reviews({
			where: { BookID: Number(id) },
		});
	}

	@Post('reviews')
	async createReview(@Body() postData: { bookID: number; review: string; score: number }): Promise<ReviewModel> {
		const { bookID, review, score } = postData;
		return this.reviewService.createReview({
			Book: { connect: { Id: bookID } },
			Review: review,
			Score: score,
		});
	}
}
