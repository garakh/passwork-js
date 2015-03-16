'use strict';

var PWCachedTransport = function(transport, storage){

    var pull = function(key, cb, pusher){
        storage.get(key, function(r){
            if(r){
                cb(r);
                return;
            }
            
            pusher(function(data){
                storage.set(key, data, function(){
                    cb(data);
                });
            });
        });
    }

    this.getData = function(cb){
        
        pull('getData', cb, function(save){
            transport.getData(function(data){
                save(data);
            });
        });
    }
    
    for(var i in transport){
        if( (typeof transport[i] === 'function') && !this[i])
            this[i] = function(){
                return function(){
                    transport[i].apply(null, arguments);
                }
            }();
    }
}    
