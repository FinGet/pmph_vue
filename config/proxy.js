

let proxyTable =  {
  '/pmpheep/websocket': {
    target: 'ws://120.76.221.250:11000',//设置你调用的接口域名和端口号 别忘了加http
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
  },
  '/pmpheep': {
    target: 'http://120.76.221.250',//设置你调用的接口域名和端口号 别忘了加http
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
  },
};
module.exports = proxyTable;
