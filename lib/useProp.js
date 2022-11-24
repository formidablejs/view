const $beforeReconcile$ = Symbol.for('#beforeReconcile'), $afterReconcile$ = Symbol.for('#afterReconcile');
var $7 = Symbol();
const {styles: imba_styles, Component: imba_Component, createComponent: imba_createComponent, defineTag: imba_defineTag} = require('imba'/*$path$*/);
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./hasAttr'/*$path$*/);
var $2 = require('./isWaiting'/*$path$*/);
var $3 = require('./readProps'/*$path$*/);

let props = {};
let ready = false;

class Props extends imba_Component {
	
	render(){
		var $4, $5, $6;
		
		$4=this;
		$4[$beforeReconcile$]();
		($5=$6=1,$4[$7] === 1) || ($5=$6=0,$4[$7]=1);
		if ($2.isWaiting(props) && $1.hasAttr(this)) {
			
			props = $3.readProps(this);
			ready = true;
		} else if (!($1.hasAttr(this))) {
			
			ready = true;
		};
		$4[$afterReconcile$]($6);
		return $4;
	}
}; imba_defineTag('props-bctujx-ag',Props,{});

function waitForProps(){
	
	const condition = function() { return ready === true; };
	
	const poll = function(resolve) {
		
		if (condition()) { return resolve() } else {
			return setTimeout(function() { return poll(resolve); },100);
		};
	};
	
	return new Promise(poll);
};

// Get prop value.
// 
/** @param {string|null} prop*/
// @returns {any}
function useProp(prop = null){
	
	return prop ? props[prop] : props;
};

exports.props = props;
exports.Props = Props;
exports.waitForProps = waitForProps;
exports.useProp = useProp;

imba_styles.register('bctujx',`
props-bctujx-ag { display:block; }
`);