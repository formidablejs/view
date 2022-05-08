Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {Object} object
*/
function trim(object){
	
	if (object && typeof object === 'object') {
		
		Object.keys(object).map(function(key) {
			
			if (typeof object[key] === 'object') {
				
				return object[key] = trim(object[key]);
			} else if (typeof object[key] === 'string') {
				
				return object[key] = object[key].trim();
			};
		});
	};
	
	return object;
};
exports.trim = trim;
