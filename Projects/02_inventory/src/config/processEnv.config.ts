const config = {
  MONGO: {
    URL:
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/inventory_management",
  },
  PORT: process.env.PORT || "9876",
  JWT: {
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || 10000,
    SECRET: process.env.JWT_SECRET || "myjwtsecret",
  },
};

export default config;
