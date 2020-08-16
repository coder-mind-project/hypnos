import { Request, Response, NextFunction } from 'express'
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress'
import IContactService from '../../02_domain/interfaces/services/IContactService'

class ContactAction {
    private readonly _app: IExpress
    private readonly _contactService: IContactService

    constructor(app: IExpress) {
        const resource = '/contact'

        this._app = app
        this._contactService = app.get('contactService')

        this._app.route(`${resource}`).post(this.sendMessage)
    }

    sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this._contactService.sendMessage(req.body.email, req.body.message);
            res.status(204).send();
        } catch (err) {
            next(err)
        }
    }
}

export default ContactAction
