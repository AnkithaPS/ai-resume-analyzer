import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("err", (err) => console.error("Redis Error:", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (error) {
    console.log("Redis connection failed ", error);
  }
})();
