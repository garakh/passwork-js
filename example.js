'use strict';

var login = {
    'email' : 'login@email.com',
    'password' : 'auth password',
    'crypto' : 'secret word',
    'url' : 'https://passwork.me/',	
};

var storage = new PWStorage({});

var transport = new PWTransport(login);
var transportWithCache = new PWCachedTransport(transport, storage);
var crypt = new PWCrypt(login);
var api = new PWApi(transportWithCache, crypt);

api.login(function(){
	api.getData(function(data){
		var password = data.groups[0].passwords[0];
		var decrypted = password.getPassword();
	});
});

