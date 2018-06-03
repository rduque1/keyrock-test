import { Router } from 'express';
import ethereum from './ethereum';

export default ({ config }) => {
	let api = Router();

	api.use('/', ethereum(config) );

	return api;
}
