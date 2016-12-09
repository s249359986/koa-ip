# koa-ip
koa-ip is a ip filter middleware for koa,support whitelist,blacklist,tips message,proxy.

# Install

```
npm koajs-ip --save
```
# params

- options{Object}
    - whiteList{Array}:whiteList
    - blackList{Array}:blackList
    - proxy{Function}:nginx proxy,default:this.ip
    - msg:{String}:default:非法ip

# Usage

```

var koa = require('koa');
var ip = require('koajs-ip');

var app = koa();

app.use(ip('192.168.0.*'));
// or
// app.use(ip(['192.168.0.*', '8.8.8.[0-3]']));
// or
// app.use(ip({
//   whiteList: ['192.168.0.*', '8.8.8.[0-3]'],
//   blackList: ['144.144.*']
// }));
// app.use(ip({
//   whiteList: ['192.168.0.*', '8.8.8.[0-3]'],
//   blackList: ['144.144.*'],
//      msg:"error ip"
// }));
// app.use(ip({
//   whiteList: ['192.168.0.*', '8.8.8.[0-3]'],
//   blackList: ['144.144.*'],
//      msg:{code:1,msg:"error ip"}
// }));
// app.use(ip({
//   whiteList: ['192.168.0.*', '8.8.8.[0-3]'],
//   blackList: ['144.144.*'],
//      msg:{code:1,msg:"error ip"},
//      proxy:function(opt){return this.request.get("X-Real-Ip")}
// }));



app.use(...);

app.listen(3000);

```


