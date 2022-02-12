Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isWaiting(props){
	
	let count = 0;
	
	if (Array.isArray(props)) {
		
		count = props.length;
	} else if ((typeof props === 'object' || typeof props === 'function') && (props !== null)) {
		
		count = Object.keys(props).length;
	};
	
	return count === 0;
};
exports.isWaiting = isWaiting;
