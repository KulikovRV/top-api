import { AuthDto } from '../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { disconnect } from 'mongoose';
import passport from 'passport';

const loginDto: AuthDto = {
	login: '123@mail.com',
	password: '123'
};

describe('AuthController (e2)', () => {
	let app: INestApplication;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success',async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				token = body.access_token;
				expect(token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail password',async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '2'})
			.expect(401);
	});

	it('/auth/login (POST) - fail login',async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'mail.com'})
			.expect(401);
	});

	afterAll(() => {
		disconnect();
	});
});
