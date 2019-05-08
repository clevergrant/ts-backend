import { Application, Request, Response } from 'express'

import { Controller } from '../controllers/controller'
import { NextFunction } from 'connect';

export class Routes {

	public controller: Controller = new Controller()

	public routes(app: Application): void {
		app.route('/')
			.get(this.controller.default)

		app.route('/contact')
			.get(this.checkAuth, this.controller.getAll)
			.post(this.checkAuth, this.controller.create)

		app.route('/contact/:contactId')
			.get(this.checkAuth, this.controller.get)
			.put(this.checkAuth, this.controller.put)
			.delete(this.checkAuth, this.controller.delete)

	}

	private checkAuth(req: Request, res: Response, next: NextFunction): void {
		const { authorization } = req.headers
		let token: string = null
		if (authorization && authorization.startsWith('Bearer ')) token = authorization.slice(7, authorization.length)

		if (token !== null && token === process.env.apikey) next()
		else res.status(401).send(`You shall not pass!`)
	}
}