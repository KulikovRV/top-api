import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	await app.listen(3010, () => {
		console.log('SERVER START ON PORT 3010');
		});
}
bootstrap();
