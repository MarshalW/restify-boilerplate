'use strict';

const get={
	echo:(req,res,next)=>{
		console.log('echo~');
        res.send(req.params);
        return next();
	}
}

export {get};