'use strict';

var bcrypt = require('bcrypt');
const password = '12345';

var salt = bcrypt.genSaltSync();
var hash = bcrypt.hashSync(password, salt);

var result = bcrypt.compareSync('password', hash);

console.log(`password: ${password}, salt: ${salt}, hash: ${hash}, ${result}`);
