import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> | any {
    const request = context.switchToHttp().getRequest();
    // const headers = request.headers;
    console.log(request.headers['authorization']);
    return true;
  }
}
