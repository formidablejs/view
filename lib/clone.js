function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $1 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class Clone {
	
	
	/**
		 * Instantiate Clone.
		 *
		 * @param {String[]|null} list
		 * @returns {void}
		 */
	
	/**
	*
		 * Instantiate Clone.
		 *
		 * @param {String[]|null} list
		 * @returns {void}
		 
	@param {String[]} list
	*/
	constructor(list = null){
		
		this.list = list;
	}
	
	/**
		 * Set object to clone from.
		 *
		 * @param {object} object
		 * @returns {Clone} self
		 */
	
	/**
	*
		 * Set object to clone from.
		 *
		 * @param {object} object
		 * @returns {Clone} self
		 
	*/
	from(object){
		
		this.fromObject = object;
		
		return this;
	}
	
	/**
		 * Set object to clone to.
		 *
		 * @param {object} toObject
		 * @returns {void}
		 */
	
	/**
	*
		 * Set object to clone to.
		 *
		 * @param {object} toObject
		 * @returns {void}
		 
	*/
	to(toObject){
		var $2;
		
		if (this.fromObject == undefined && this.fromObject == null) {
			
			throw new Error('Object to clone from not set.');
		};
		
		const all = this.list ? this.list : Object.keys(this.fromObject);
		
		$2 = [];
		for (let $3 = 0, $4 = iter$__(all), $5 = $4.length; $3 < $5; $3++) {
			let prop = $4[$3];
			$2.push((!toObject[prop]) && (
				
				toObject[prop] = this.fromObject[prop]
			));
		};
		return $2;
	}
};

/**
 * Clone from object to another object.
 *
 * @param {String[]|null} list
 * @returns {Clone}
 */

/**
@param {String[]} list
*/
function clone(list = null){
	
	return new Clone(list);
};
exports.clone = clone;
