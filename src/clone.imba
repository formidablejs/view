class Clone

	/**
	 * Instantiate Clone.
	 *
	 * @param {String[]|null} list
	 * @returns {void}
	 */
	def constructor list\String[] = null
		self.list = list
	
	/**
	 * Set object to clone from.
	 *
	 * @param {object} object
	 * @returns {Clone} self
	 */
	def from object
		self.fromObject = object
		
		self
	
	/**
	 * Set object to clone to.
	 *
	 * @param {object} toObject
	 * @returns {void}
	 */
	def to toObject
		if self.fromObject == undefined && self.fromObject == null
			throw new Error 'Object to clone from not set.'

		const all = self.list ? self.list : Object.keys(self.fromObject)

		for prop in all
			if !toObject[prop]
				toObject[prop] = self.fromObject[prop]

/**
 * Clone from object to another object.
 *
 * @param {String[]|null} list
 * @returns {Clone}
 */
export def clone list\String[] = null
	new Clone(list)
