import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/users/roles.enum';
import { RolesGuard } from './roles.guard';

export const AuthRoles = (...roles: Roles[]) =>
  applyDecorators(
    UseGuards(AuthGuard('jwt'), RolesGuard),
    SetMetadata('roles', roles),
  );
