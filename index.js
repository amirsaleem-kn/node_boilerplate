const app = require('./server/public/app');
const PORT = process.env.PORT || 5000;
const logger = require('./server/lib/logger');
logger.callingModule = module;
require('./server/public/middlewares');
require('./server/public/routes');
app.listen(PORT, () => {
    logger.warning(`Server listening to port: ${PORT}`);
});