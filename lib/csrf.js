Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function csrf(){
	
	return window.axios.get('/csrf-cookie');
};
exports.csrf = csrf;
