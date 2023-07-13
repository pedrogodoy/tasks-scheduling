import { Controller, Get, MessageEvent, Res, Sse, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('task-notification')
export class TaskNotificationController {
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(resolve(__dirname, './index.html')).toString());
  }

  @Sse('sse')
  @UseGuards(JwtAuthGuard)
  sse(): Observable<MessageEvent> {
    console.log(' chamou ss')
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }
}
