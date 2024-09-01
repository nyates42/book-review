import { Injectable } from '@nestjs/common';
import { BookReview, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async reviews(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.BookReviewWhereUniqueInput;
		where?: Prisma.BookReviewWhereInput;
		orderBy?: Prisma.BookReviewOrderByWithRelationInput;
	}): Promise<BookReview[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.bookReview.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async createReview(data: Prisma.BookReviewCreateInput): Promise<BookReview> {
		return this.prisma.bookReview.create({
			data,
		});
	}

	async getBookReviewsAvg() {
		const results = await this.prisma.bookReview.groupBy({
			by: ['BookID'],
			_avg: {
				Score: true,
			},
		});

		return results.map(({ BookID, _avg }) => {
			return {
				bookID: BookID,
				avgScore: _avg.Score,
			};
		});
	}
}
