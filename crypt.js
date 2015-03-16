'use strict';

var PWCrypt = function(creds) {

    var encode = function(data, pwd) {
        pwd = pwd ? pwd : creds.crypto;
        var result = base32.encode(CryptoJS.AES.encrypt(data, pwd).toString());
        return result;
    }

    var decode = function(data, pwd) {
        pwd = pwd ? pwd : creds.crypto;
        try {
            var result = CryptoJS.AES.decrypt(base32.decode(data), pwd).toString(CryptoJS.enc.Utf8);
            return result;
        }
        catch (e) {
            return null;
        }
    }

    this.parsePassword = function(data, groupPassword) {
        var groupPassword = decode(groupPassword);
        data.getPassword = function() {
            return decode(this.cryptedPassword, groupPassword);
        }

        data.getCustom = function() {
            if (!data.custom)
                return [];

            return this.custom.map(function(el) {
                return {
                    'name': decode(el.name, groupPassword),
                    'value': decode(el.value, groupPassword)
                };
            });
        }
    }

    this.parseGroup = function(data) {
        var self = this;
        if (data.passwords)
            data.passwords = data.passwords.map(function(el) {
                self.parsePassword(el, data.passwordCrypted);
                return el;
            });


        if (data.folders)
            data.folders = data.folders.map(function(el) {
                if (el.passwords)
                    el.passwords = el.passwords.map(function(el) {
                        self.parsePassword(el, data.passwordCrypted);
                        return el;
                    });
                return el;
            });
    }
}
