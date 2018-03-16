

let proxyTable =  {
  '/pmpheep': {
    target: 'http://39.107.80.79',//设置你调用的接口域名和端口号 别忘了加http
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
  },
  'pmph_vedio':{
    target: 'http://39.107.80.79:11000',//设置你调用的接口域名和端口号 别忘了加http
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
  },
  '/v': {
    target: 'http://39.107.80.79:11100',//设置你调用的接口域名和端口号 别忘了加http
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
  }
};
module.exports = proxyTable;
