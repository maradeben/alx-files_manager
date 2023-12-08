import redis from 'redis';
import { promisify } from 'util';
class RedisClient {
  constructor () {
    this.client = redis.createClient();
    this.isConnected = true;
    this.client.on('error', (err) => {
      console.log('Redis client error:', err.toString());
      this.isConnected = false;
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  isAlive () {
    return this.isConnected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
    //return await this.client.get(key);
  }

  async set(key, value, duration) {
    return promisify(this.client.setex)
      .bind(this.client)(key, duration, value);
    // return await this.client.setex(key, duration, value);
  }

  async del(key) {
    return promisify(this.client.del).bind(this.client)(key);
    // return await this.client.del(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
