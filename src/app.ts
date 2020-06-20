import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import ContactsRoutes from "./routes/contacts.route";
import AuthRoutes from "./routes/auth.route";
import bodyParser from "body-parser";
import { TokenValidation } from "./lib/verifyToken";

export class App {
    private app: Application;

    constructor( private port?: number | string ) {
        this.app =  express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3100);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/contacts', TokenValidation, ContactsRoutes);
        this.app.use('/api/auth', AuthRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server listening on port: ', this.app.get('port'))
    }
}