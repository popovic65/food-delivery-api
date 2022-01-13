import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestUser } from 'src/authentication/interfaces/requestUser.interface';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestUser>();
      const user = request.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
