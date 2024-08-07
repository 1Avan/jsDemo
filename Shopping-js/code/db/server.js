const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // 请确保db.json文件路径正确
const middlewares = jsonServer.defaults();

// 日志记录，确保中间件被正确使用
console.log("Initializing CORS middleware...");

// 使用CORS中间件，允许所有来源
server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
