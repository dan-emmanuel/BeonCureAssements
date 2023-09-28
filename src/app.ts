import express from 'express';
import apiRoutes from 'routes/apiRoutes';
import { LoggerService } from 'utils/loggerService';

import services from 'utils/services';


const app = express();
const PORT = 3000;
const HOST = 'localhost';
const logger = services.getLogger('APP');




app.use(LoggerService.traceMiddleware);

app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello world!');
})

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on port http://${HOST}:${PORT}`);
});

export default app;
