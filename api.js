'use strict';

var PWApi = function(transport, crypt) {
    this.getData = function(cb) {
        transport.getData(function(data) {
            if(!data || data.error){
                cb(null);
                return;
                
            }
            
            data.groups = data.groups.map(function(el) {
                crypt.parseGroup(el);
                return el;
            });

            cb(data);
        });
    }
    
    this.login = function(cb){
        transport.login(cb);
    }
}