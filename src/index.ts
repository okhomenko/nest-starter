import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { ApplicationModule } from './modules/application.module';
import { LoggingInterceptor } from './modules/common/interceptors/logging.interceptor';
import { ValidationPipe } from './modules/common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.use(bodyParser.json());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(3000);
}

bootstrap();