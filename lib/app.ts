import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Routes } from './routes/routes'

import * as mongoose from 'mongoose'

require('dotenv').config()

class App {

	public app: express.Application
	public routePrv: Routes = new Routes()

	public mongoUrl: string = `mongodb://localhost/db`

	constructor() {
		this.app = express()
		this.config()
		this.routePrv.routes(this.app)
		this.mongoSetup()
	}

	private config(): void {
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: false }))
	}

	private mongoSetup(): void {
		mongoose.Promise = global.Promise
		mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
	}
}

export default new App().app