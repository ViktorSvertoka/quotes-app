const app = require('./src/app');
const { APP_PORT } = require('./src/config/config');
const dbInit = require('./src/config/dbInit');

const startServer = async () => {
  try {
    await dbInit();
    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  } catch (error) {
    console.error('Unable to sync database:', error);
    process.exit(1);
  }
};

startServer();
