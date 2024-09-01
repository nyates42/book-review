import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new ResponseInterceptor());

	const config = new DocumentBuilder().setTitle('Books example').setDescription('The book API description').setVersion('1.0').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.enableCors();
	await app.listen(3000);
}
bootstrap();
