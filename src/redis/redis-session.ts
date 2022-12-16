import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { default as Redis } from 'ioredis';
import { MiddlewareFn, MiddlewareObj } from 'telegraf';

import { ClientRedisOptions } from './client-redis-options';
import { REDIS_OPTIONS } from './redis-options.contant';

@Injectable()
export class RedisSession implements MiddlewareObj<any>, OnApplicationShutdown {
  private readonly options: ClientRedisOptions;
  private readonly client: InstanceType<typeof Redis>;

  constructor(
    @Inject(REDIS_OPTIONS)
    options: ClientRedisOptions,
  ) {
    this.options = {
      property: 'session',
      url: options.url,
      getSessionKey: (ctx) =>
        ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`,
      store: {},
      ...options,
    };

    this.client = new Redis(this.options.url, this.options.store);
  }

  public async onApplicationShutdown(): Promise<void> {
    await this.client.disconnect();
  }

  public async getSession(key): Promise<Record<string, any>> {
    const json = await this.client.get(key);

    if (json) {
      try {
        return JSON.parse(json);
      } catch (error) {
        console.error('Parse session state failed', error);
      }
    }
  }

  public async clearSession(key): Promise<void> {
    await this.client.del(key);
  }

  public async saveSession(key, session): Promise<void> {
    if (!session || Object.keys(session).length === 0) {
      return this.clearSession(key);
    }

    await this.client.set(key, JSON.stringify(session));
    if (this.options.ttl) {
      await this.client.expire(key, this.options.ttl);
    }
  }

  public middleware(): MiddlewareFn<any> {
    return async (ctx, next) => {
      const key = this.options.getSessionKey(ctx);

      if (!key) {
        return next();
      }

      return this.getSession(key).then((session) => {
        Object.defineProperty(ctx, this.options.property, {
          get: () => session,
          set: (newValue) => {
            session = Object.assign({}, newValue);
          },
        });

        return next().then(() => this.saveSession(key, session));
      });
    };
  }
}
