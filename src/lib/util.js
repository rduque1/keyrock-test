import { default as Web3} from 'web3'
import { default as check } from 'express-validator/check'
const {validationResult} = check


/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
export function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
}

export const addressValidator = value => {
	if ( !Web3.utils.isAddress(value) ) {
			throw new Error('invalid ethereum address')
	}
	return value
}

export const hexValidor = value => {
	if ( !Web3.utils.isHex(value) ) {
			throw new Error('invalid ethereum key')
	}
	return value
}

export const numberValidator = value => {
	if ( isNaN(value) || parseFloat(value)<=0 ) {
			throw new Error('invalid amount')
	}
	return value
}

export const validationHandler = (req, res, next) => {
	const errors = validationResult(req)
	if ( !errors.isEmpty() ) {
		return res.status(422).json({ errors: errors.array() });
	} else {
		next()
	}
}
