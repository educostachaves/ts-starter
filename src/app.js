import { helloWorld } from './core/helloWorld'
import * as express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send(helloWorld());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});