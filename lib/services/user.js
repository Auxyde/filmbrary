'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@auxyde/iut-encrypt')
const Jwt = require('@hapi/jwt');
const MailSender = require('./mailSender');

module.exports = class UserService extends Service {
    async create(user) {
        try {
            user.password = Encrypt.sha1(user.password);
            const { User } = this.server.models();
            await User.query().insertAndFetch(user);
        }
        catch (err) {
            throw new Error('Error creating user');
        }
        try {
            const mailSender = new MailSender();
            await mailSender.sendGreetingMail(user.mail);
        }
        catch (err) {
            await User.query().deleteById(user.id);
            throw new Error('Error sending greeting email');
        }
        return user;
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    update(id, user) {
        const { User } = this.server.models();
        //Check if user exists
        User.query().findById(id).then
        (user => {
            if (user === undefined) {
                return null;
            }
        })
        return User.query().patchAndFetchById(id, user);
    }

    getAll() {
        const { User } = this.server.models();
        return User.query();
    }

    async login(username, password) {
        const { User } = this.server.models();
        const user = await User.query().findOne({ username });
        if (user && Encrypt.compareSha1(password, user.password)) {
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    scope: user.scope
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );
            return token;
        }
        return null;
    }


    addMovieToFavorites(userId, movieId) {
        const { User } = this.server.models();
        // Check if the film exists
        const { Movie } = this.server.models();
        Movie.query().findById(movieId).then(movie => {
            if (movie === undefined) {
                return null;
            }
        })
        // Check if user doesn't already have the movie in his favorites
        User.relatedQuery('movies').for(userId).then(movies => {
            if (movies.includes(movieId)) {
                return null;
            }
        })
        return User.relatedQuery('movies').for(userId).relate(movieId);
    }
};
