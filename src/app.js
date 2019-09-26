import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import UserController from './controllers/user.controller';

const settings = {
  port: 3000,
};
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', UserController.list);

app.listen(settings.port, function () {
  console.log(`App listening on port ${settings.port}!`);
});

export default app;
