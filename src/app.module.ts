import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { RedisSessionModule } from './redis/redis-session.module';
import { RedisSession } from './redis/redis-session';
import { BotModule } from './wizards/bot.module';
import { Context, MiddlewareFn } from 'telegraf';

function catchExceptionMiddleware(): MiddlewareFn<Context> {
  return async (ctx, next) => {
    try {
      return await next();
    } catch (err) {
      await ctx.reply('Sorry! Something wrong...');
    }
  };
}

@Module({
  imports: [
    BotModule,
    TelegrafModule.forRootAsync({
      imports: [RedisSessionModule],
      useFactory: (redisSession: RedisSession) => ({
        token: process.env.TELEGRAM_API_TOKEN,
        include: [BotModule],
        middlewares: [catchExceptionMiddleware(), redisSession],
        launchOptions: false,
      }),
      inject: [RedisSession],
    }),
  ],
})
export class AppModule {}
