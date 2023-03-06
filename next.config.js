require('dotenv').config({ path: `../.env` });

module.exports = {
  env: {
    // Reference a variable that was defined in the .env.* file and make it available at Build Time
    NEXT_PUBLIC_NETWORK_ID: process.env.PUBLIC_NETWORK_ID,
    NEXT_PUBLIC_TARGET_CHAIN_ID: process.env.TARGET_CHAIN_ID,
  },
};