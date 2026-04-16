import { redisClient } from "../config/redis";

//Get cache
export const getCache = async (key: string) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

//Set cache
export const setCache = async (key: string, value: string) => {
  await redisClient.setEx(key, 3600, JSON.stringify(value)); //expiry 1hr
};
