import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheConnectionTester implements OnModuleInit {
   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
 
   async onModuleInit() {
     try {
       await (this.cacheManager as any).set('redis-test', 'ok', { ttl: 20000 });
       const value = await (this.cacheManager as any).get('redis-test');
       if (value !== 'ok') {
         throw new Error('Redis not storing values!');
       }
       console.log('Redis is connected and working.');
     } catch (err) {
       console.error('Redis connection failed! App will exit.', err);
       process.exit(1);
   }
 }
}
