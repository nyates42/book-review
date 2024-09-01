import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/books (GET)', () => {
		return request(app.getHttpServer()).get('/books').expect(200);
	});

	it('should create a new book', () => {
		const newBook = {
			title: 'Test E2E book',
			author: 'Test Author',
			description: 'Test book description from tests.',
		};

		return request(app.getHttpServer())
			.post('/books')
			.send(newBook)
			.expect(201)
			.expect(({ body }) => {
				expect(body.Title).toEqual(newBook.title);
				expect(body.Author).toEqual(newBook.author);
				expect(body.Description).toBeDefined();
			});
	});
});
