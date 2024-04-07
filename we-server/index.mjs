import Koa from 'koa';
// import config from './config.mjs';

const app = new Koa()
// let msg = 0
// setInterval(() => {
//   msg++
//   console.log(msg);
// }, config.refresh_time)

app.listen(8080)