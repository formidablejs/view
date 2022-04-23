/**
 * Clone from object to another object.
 *
 * @param {String[]|null} list
 * @returns {Clone}
 */
/**
@param {String[]} list
*/
export function clone(list?: string[]): Clone;
declare class Clone {
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
    constructor(list?: string[] | null);
    list: string[];
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
    from(object: object): Clone;
    fromObject: any;
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
    to(toObject: object): void;
}
export {};
