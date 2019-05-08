import * as mongoose from 'mongoose'
import { ContactSchema } from '../models/model'
import { Request, Response } from 'express'

import { NextFunction } from 'connect'

const Contact = mongoose.model('Contact', ContactSchema)

export class Controller {

	public default(req: Request, res: Response): void {
		res.status(200).send({ message: 'Welcome to my API!' })
	}

	public getAll(req: Request, res: Response): void {
		Contact.find(
			{},
			(err: any, contact: any): void => {
				if (err) {
					res.send(err)
				}
				res.json(contact)
			})
	}

	public create(req: Request, res: Response): void {
		const newContact = new Contact(req.body)
		newContact.save(
			(err: any, contact: any): void => {
				if (err) {
					res.send(err)
				}
				res.json(contact)
			})
	}

	public get(req: Request, res: Response): void {
		Contact.findById(
			req.params.contactId,
			(err: any, contact: any): void => {
				if (err) {
					res.send(err)
				}
				res.json(contact)
			})
	}

	public put(req: Request, res: Response): void {
		Contact.findOneAndUpdate(
			{ _id: req.params.contactId },
			req.body,
			{ new: true, useFindAndModify: false },
			(err: any, contact: any): void => {
				if (err) {
					res.send(err)
				}
				res.json(contact)
			})
	}

	public delete(req: Request, res: Response): void {
		Contact.deleteOne(
			{ _id: req.params.contactId },
			(err: any, contact: any): void => {
				if (err) {
					res.send(err)
				}
				res.json({ message: 'DELORTED!@!!' })
			})
	}

}
