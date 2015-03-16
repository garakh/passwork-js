'use strict';

var PWStorage = function(options){
    var db = null;
    
    this.get = function(key, cb){
       // init();
       //    
       // db.get('cache', key).always(function(record) {
       //     cb(record ? record.data : null);
       // });    
        //  localStorage.removeItem(key);
        // db.put('getData', null);
        // db.put('login', null);
         
       
       try
       {
            var item = JSON.parse(SYS.STORAGE().getItem(key));
            setTimeout(function() {
                cb(item);     
            },1)           
       }
       catch(e)
       {
            setTimeout(function() {
                cb(false);     
            },1)           
           
       }
       

       
      
    }
    
    this.set = function(key, value, cb){
       //  init();
       // 
       //  db.put('cache', {data:value}, key).always(function(key){
       //      cb && cb(key);
       //  });
       //  
        var item = SYS.STORAGE().setItem(key, JSON.stringify(value))
        setTimeout(function() {
             cb && cb(key);   
        },1)
       
    }    
    
    var init = function(cb){
        if(db)
            return;
        db = new ydn.db.Storage('passwork');
        
       
    }
}

