import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwt.decode(token);
      console.log(decoded);
      return true;
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
  }
}
