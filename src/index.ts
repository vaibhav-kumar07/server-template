import { Request, Response } from 'express';
import createServer from './app';
import CommonVariables from './common/common-variables';
import { defaultErrorHandler } from './common/middleware/error-middleware';

const app = createServer();
const { PORT, NODE_ENV, APP_SERVICE_NAME } = CommonVariables;

app.get('/', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const response = {
		message: 'Welcome to Inventory Management Backend Service',
		environment: NODE_ENV,
		service: APP_SERVICE_NAME,
	};
	res.json(response);
});

// ARoutes
// app.use('/api/admin/parties', adminPartyRoute);

// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./../swagger.json')));

// Error Handler Middleware
app.use(defaultErrorHandler);

app.listen(PORT, () => {
	console.log(`Application is listening on port: ${PORT}, environment: ${NODE_ENV}, service: ${APP_SERVICE_NAME}`);
});
