Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Form'/*$path$*/);
/**
@param {FormConfig} config
*/
function useForm(body = {},config = {}){
	
	return new $1.Form(body || {},config || {});
};
exports.useForm = useForm;
