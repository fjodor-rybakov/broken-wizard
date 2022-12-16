import { RedisOptions } from 'ioredis';

export interface ClientRedisOptions {
  readonly ttl?: number;
  readonly property?: string;
  readonly url: string;
  readonly store?: RedisOptions;
  readonly getSessionKey?: (ctx: any) => any;
}
