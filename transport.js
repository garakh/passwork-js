'use strict';

var PWTransport = function(creds) {
    var sessionCode = null;

    var makeUrl = function(method) {
        return creds.url + 'api2/' + method;
    }

    var request = function(url, data, cb, iter) {
        
        if (url === 'openSession') {
            $.post(makeUrl(url), data, function(d) {
                if (d.response) {
                    cb(d.response.code, d.response);
                    return;
                }

                cb(false);
            }, 'json').fail(function(data){
                alert('No internet connection.\nPlease enable Wi-Fi or mobile internet');
                cb(false);
            });
            return;
        }

        if (!sessionCode) {
            openSession(function() {
                request(url, data, cb, true);
            }, function(){
                cb(null);
            });
            return;
        }

        data.session = sessionCode;

        $.post(makeUrl(url), data, function(d) {
            if (d.response) {
                cb(d.response);
                return;
            }

            if (d.errorCode === 'expired') {
                if (iter){
                    d.error = true;
                    cb(d);
                    throw new Exception('PWTransport can not open session');
                }

                openSession(function() {
                    request(url, data, cb, true);
                });
                
                return;
            }
            
            d.error = true;
            cb(d);
            

        }, 'json').fail(function(data){
                alert('No internet connection.\nPlease enable Wi-Fi or mobile internet');
                cb(false);
            });

    }

    var openSession = function(cb, errorCb) {
        
        request('openSession', {'email': creds.email, 'password': creds.password}, function(code, session) {
            sessionCode = code;
            if(!sessionCode){
                errorCb && errorCb();
            }else{
                cb && cb(session);
            }
        });
    }

    this.getData = function(cb) {
        request('getData', {}, function(data) {
            cb && cb(data);
        });
    }
    
    this.login = function(cb){
        openSession(function(session){
            cb(true, session);
        }, function(){
            cb(false);
        });
    }
}
