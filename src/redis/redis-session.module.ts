import { FactoryProvider, Module } from '@nestjs/common';
import { ClientRedisOptions } from './client-redis-options';
import { REDIS_OPTIONS } from './redis-options.contant';
import { RedisSession } from './redis-session';

const redisOptionsProvider: FactoryProvider<ClientRedisOptions> = {
  provide: REDIS_OPTIONS,
  useFactory: () => {
    return {
      url: process.env.TELEGRAM_REDIS_URL,
    };
  },
};

@Module({
  providers: [redisOptionsProvider, RedisSession],
  exports: [RedisSession],
})
export class RedisSessionModule {}
