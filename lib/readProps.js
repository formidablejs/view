function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function readProps(component){
	
	let props = {};
	
	for (let iφ = 0, itemsφ = iter$__(component.attributes), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
		let prop = itemsφ[iφ];
		if (prop !== undefined && prop.name !== 'class') {
			
			try {
				
				const value = JSON.parse(prop.nodeValue);
				
				if (prop.name == 'env' && value.constructor == Object) {
					
					process.env = value;
					
					component.removeAttribute(prop.name);
				} else {
					
					props[prop.name] = value;
				};
			} catch (φ) {
				
				props[prop.name] = prop.nodeValue;
			};
		};
	};
	
	return props;
};
exports.readProps = readProps;
