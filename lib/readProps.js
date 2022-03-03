function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function readProps(component){
	
	let props = {};
	
	for (let $1 = 0, $2 = iter$__(component.attributes), $4 = $2.length; $1 < $4; $1++) {
		let prop = $2[$1];
		if (prop !== undefined && prop.name !== 'class') {
			
			try {
				
				const value = JSON.parse(prop.nodeValue);
				
				if (prop.name == 'env' && value.constructor == Object) {
					
					process.env = value;
					
					component.removeAttribute(prop.name);
				} else {
					
					props[prop.name] = value;
				};
			} catch ($3) {
				
				props[prop.name] = prop.nodeValue;
			};
		};
	};
	
	return props;
};
exports.readProps = readProps;
