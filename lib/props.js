const $5 = Symbol.for('#beforeReconcile'), $9 = Symbol.for('#afterReconcile');
var $8 = Symbol();
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
		var $4, $6, $7;
		
		$4=this;
		$4[$5]();
		($6=$7=1,$4[$8] === 1) || ($6=$7=0,$4[$8]=1);
		if ($2.isWaiting(props) && $1.hasAttr(this)) {
			
			props = $3.readProps(this);
			ready = true;
		} else if (!($1.hasAttr(this))) {
			
			ready = true;
		};
		$4[$9]($7);
		return $4;
	}
}; imba_defineTag('props-hdfn4a-ag',Props,{});

function waitForProps(){
	
	const condition = function() { return ready === true; };
	
	const poll = function(resolve) {
		
		if (condition()) { return resolve() } else {
			return setTimeout(function() { return poll(resolve); },100);
		};
	};
	
	return new Promise(poll);
};

exports.props = props;
exports.Props = Props;
exports.waitForProps = waitForProps;

imba_styles.register('hdfn4a',`
props-hdfn4a-ag { display:block; }
`);