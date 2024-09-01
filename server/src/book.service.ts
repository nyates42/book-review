import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BookService {
	constructor(private prisma: PrismaService) {}

	async books(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.BookWhereUniqueInput;
		where?: Prisma.BookWhereInput;
		orderBy?: Prisma.BookOrderByWithRelationInput;
	}): Promise<Book[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.book.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async createBook(data: Prisma.BookCreateInput): Promise<Book> {
		return this.prisma.book.create({
			data,
		});
	}
}
