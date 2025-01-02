import dotenv from "dotenv";

dotenv.config();

const config = {
  node_dev: process.env.NODE_DEV,
  avatarUrl: process.env.AVATAR_URL,
  redisUrl: process.env.REDIS_URL,
};

export default config;
