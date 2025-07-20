/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import Hash from 'src/utils/hash';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    // Check if password exists in the request body
    if (body && body.password) {
      // Hash the password before proceeding
      body.password = await Hash.hashString(body.password);
    }

    return next.handle();
  }
}
