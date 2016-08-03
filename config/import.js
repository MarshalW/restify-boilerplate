'use strict';

const bcrypt = require('bcrypt');
let users = require('./mongo-seed/init.json');
const nconf = require('./');
const mongoose = require('mongoose');
const Users = require('../lib/mongo').Users;


function importUsers() {
    let now = new Date();
    users.forEach((item) => {
        item.createTime = now;
        item.updatedTime = now;
        const t1 = new Date().getTime();
        const salt = bcrypt.genSaltSync();
        console.log(`salt: ${salt}`);
        const plainPassword=item.password;
        item.password = bcrypt.hashSync(item.password, salt);
        console.log(new Date().getTime() - t1);

        const t2=new Date().getTime();
        const result = bcrypt.compareSync(plainPassword, item.password);
        console.log(new Date().getTime() - t2);
    });

    Users.insertMany(users).then((docs) => {
        console.log('import ..OK');
        process.exit(0);
    }).catch((err) => {
        console.err(err);
    });
}

// mongoose.connection.on('open', function() {
//     mongoose.connection.db.dropDatabase((err, result) => {
//         if (err) throw err;
//         console.log('drop db ..OK.')
//         importUsers();
//     });
// });

setTimeout(() => {
  console.log('run import ..'+mongoose.connection.readyState);
  mongoose.connection.db.dropDatabase((err, result) => {
      if (err) throw err;
      console.log('drop db ..OK.')
      importUsers();
  });
}, 1000);
