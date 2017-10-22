import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';

@Middleware()
export class AuthorizationMiddleware implements NestMiddleware {

    resolve(name: string, ...args: any[]): ExpressMiddleware {

        return (req, res, next) => {
            req.user = {
                roles: ['admin']
            };
            next();
        };

    }

}