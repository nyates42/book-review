import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookService } from './book.service';
import { PrismaService } from './prisma.service';
import { ReviewService } from './review.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [BookService, ReviewService, PrismaService],
})
export class AppModule {}
