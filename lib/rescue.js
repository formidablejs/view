Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {Promise<any>|Function} func
@param {any} default
*/
function rescue(func,default$ = undefined){
	
	if (func instanceof Promise) {
		
		let res;
		
		func.then(function(response) { return res = response; }).catch(function() { return res = default$; });
		
		return res;
	};
	
	try {
		
		return func();
	} catch ($1) {
		
		return default$;
	};
};
exports.rescue = rescue;
