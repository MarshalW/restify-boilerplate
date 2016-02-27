"use strict";

import restify from 'restify';
import util from './core/util';

class Server {
    constructor() {
        let port = process.env.PORT || 3000;
        // define restify serve
        this.server = restify.createServer();

        this.server.listen(port, (err) => {
            if (err)
                console.error(err);
            else
                console.log('App is ready at : ' + port);
        });

        this.server.get('/echo/:name', (req, res, next)=> {
            console.log('echo~');
            res.send(req.params);
            return next();
        });
    }
}
new Server();