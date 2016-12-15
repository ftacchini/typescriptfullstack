import { UsersRepository } from "./users-repository";
import { FriendsRepository } from "../friend/friends-repository";
import { User } from "./user";
import * as request from "request";
import * as jwt from "jwt-simple";
import * as express from "Express";
import * as moment from "moment";
import { config } from "../auth/auth-config";

export class LoginController {
    constructor(
        private app: express.Express,
        private usersRepo: UsersRepository,
        private friendRepo: FriendsRepository
    ) {
    }

    private createJWT(user: User) {
        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    }


    public initialize() {

        this.app.post('/auth/facebook', async (req: express.Request, res: express.Response) => {
            return await this.login(req, res);
        });
    }

    private async login(req: express.Request, res: express.Response){
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
            var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
            var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
            var params = {
                code: req.body.code,
                client_id: req.body.clientId,
                client_secret: config.FACEBOOK_SECRET,
                redirect_uri: req.body.redirectUri
            };

            // Step 1. Exchange authorization code for access token.
            request.get({ url: accessTokenUrl, qs: params, json: true }, (err, response, accessToken) => {
                if (response.statusCode !== 200) {
                    return res.status(500).send({ message: accessToken.error.message });
                }

                // Step 2. Retrieve profile information about the current user.
                request.get({ url: graphApiUrl, qs: accessToken, json: true }, async (err, response, profile) => {
                    if (response.statusCode !== 200) {
                        return res.status(500).send({ message: profile.error.message });
                    }
                    if (req.header('Authorization')) {
                        let existingUser = await this.usersRepo.findOne({ facebook: profile.id });

                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
                        }
                        let token = req.header('Authorization').split(' ')[1];
                        let payload = jwt.decode(token, config.TOKEN_SECRET);

                        let user = await this.usersRepo.findById(payload.sub)
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.facebook = profile.id;
                        user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.displayName = user.displayName || profile.name;
                        await user.save();
                        token = this.createJWT(user);
                        res.send({ token: token });
                        
                    } else {
                        // Step 3. Create a new user account or return an existing one.
                        let existingUser = await this.usersRepo.findOne({ facebook: profile.id });
                        if (existingUser) {
                            var token = this.createJWT(existingUser);
                            return res.send({ token: token });
                        }
                        let user = new User(this.usersRepo);
                        user.facebook = profile.id;
                        user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.displayName = profile.name;
                        await user.save();
                    
                        this.getFriends(user, accessToken);
                        
                        token = this.createJWT(user);
                        res.send({ token: token });
                    }
                });
            });
    }

    private getFriends(user: User, accessToken: any){
        var requestUrl = `https://graph.facebook.com/v2.8/${user.facebook}/friends`;

        request.get({ url: requestUrl, qs: accessToken, json: true }, async (err, response, friends) => {
            //There is a problem with this, and now we cant get all user friends
            console.log(err);
            console.log(friends.data);
        });
    }
}


