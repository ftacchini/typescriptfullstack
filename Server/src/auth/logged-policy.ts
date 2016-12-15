import * as express from "express";
import * as jwt from "jwt-simple";
import { config } from "./auth-config";



function requireLogin(req: express.Request, res: express.Response, next: express.NextFunction) {

    if (req.header('Authorization')) {
        let token = req.header('Authorization').split(' ')[1];
        let payload = jwt.decode(token, config.TOKEN_SECRET);


        if (payload) {
            next();
        }
        else {
            error(res, next);
        }
    } else {
        error(res, next);
    }
}

function error(res: express.Response, next: express.NextFunction) {
    res.status(401);
    next("Unauthorized");
}

export function loggedPolicy(app: express.Express) {
    app.use("/api", requireLogin, (req, res, next) => { next(); });
}