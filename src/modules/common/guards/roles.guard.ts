import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    hasRole(userRoles, roles) {
        return userRoles.find((userRole) => !!roles.find(role => role === userRole));
    }

    canActivate(req, context: ExecutionContext): boolean {
        const { handler, parent } = context;

        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        } else {
            const user = req.user;

            return user && user.roles && this.hasRole(user.roles, roles);
        }
    }

}