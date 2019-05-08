import { Application, Request, Response } from 'express'

import { Controller } from '../controllers/controller'
import { NextFunction } from 'connect';

export class Routes {

	public controller: Controller = new Controller()

	public routes(app: Application): void {
		app.route('/')
			.get(this.controller.default)

		app.route('/contact')
			.get((req: Request, res: Response, next: NextFunction) => {
				if (req.query.key !== process.env.apikey)
					res.status(401).send(`You shall not pass!`)
				else next()
			}, this.controller.getAll)
			.post(this.controller.create)

		app.route('/contact/:contactId')
			.get(this.controller.get)
			.put(this.controller.put)
			.delete(this.controller.delete)

	}
}