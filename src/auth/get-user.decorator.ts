import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';

export const User = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext): Promise<UserEntity> => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
