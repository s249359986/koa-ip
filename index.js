/**
 * Created by songdonghong on 2016/12/9.
 */

function ip(conf) {
    var MSG="非法ip";
    var PROXY="X-Real-IP";
    if (typeof conf !== 'object') {
        if (typeof conf === 'string') {
            conf = {whiteList: [conf]};
        } else {
            conf = {
            };
        }
    }
    if (Array.isArray(conf)) {
        conf = {whiteList: conf};
    }
    return function* (next) {
        var _this=this;
        var tempReq=_this.request;
        var _ip = tempReq.get(conf.proxy||PROXY) || tempReq.get("X-Forwarded-For")||_this.ip;
        var pass = false;
        if (conf.whiteList && Array.isArray(conf.whiteList)) {
            pass = conf.whiteList.some(function (item) {
                return RegExp(item).test(_ip);
            });
        }
        if (conf.blackList && Array.isArray(conf.blackList)) {
            pass = !conf.blackList.some(function (item) {
                return RegExp(item).test(_ip);
            });
        }
        if (pass) {
            console.log((new Date).toUTCString() + ' ' + _ip + ' -> ok');
            yield next;
        } else {
            console.log((new Date).toUTCString() + ' ' + _ip + ' -> no');
            _this.status=403;
            _this.body=conf.msg||MSG;
        }
    }
}

module.exports = ip;