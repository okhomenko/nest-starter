import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthorizationMiddleware } from './common/middlewares/authorization.middleware';

@Module({
    modules: [
        CatsModule,
    ],
})
export class ApplicationModule implements NestModule {

    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthorizationMiddleware)
            .forRoutes(
                { path: '**', method: RequestMethod.ALL }
            );
    }

}