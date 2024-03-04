'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@auxyde/iut-encrypt')
const Jwt = require('@hapi/jwt');
const MailSender = require('./mailSender');

module.exports = class MovieService extends Service {
    async create(movie) {
        try {
            const { Movie } = this.server.models();
            await Movie.query().insertAndFetch(movie);
            const subject = 'New movie added : ' + movie.title;
            const message = 'A new movie has been added to the database. Check it out!';
            const mailSender = new MailSender();
            const { User } = this.server.models();
            const users = await User.query();
            for (let user of users) {
                await mailSender.sendMail(user.mail, subject, message);
            }
        }
        catch (err) {
            throw new Error('Error creating movie');
        }
        return movie;
    }

    delete(id) {
        const { Movie } = this.server.models();
        return Movie.query().deleteById(id);
    }

    update(id, movie) {
        const { Movie } = this.server.models();
        Movie.query().findById(id).then(movie => {
            if (movie === undefined) {
                return null;
            }
        })
        // Send mail to all users who have the film in their favorites to notify them of the change

        return Movie.query().patchAndFetchById(id, movie).then(movie => {
            const subject = 'Movie updated : ' + movie.title;
            const message = 'A movie has been updated. Check it out!';
            const mailSender = new MailSender();
            const { User } = this.server.models();
            User.query().join('user_movies', 'user.id', 'user_movies.userId').where('user_movies.movieId', id).then(users => {
                const usersId = users.map(user => user.id);
                User.query().whereIn('id', usersId).then(users => {
                    for (let user of users) {
                        mailSender.sendMail(user.mail, subject, message);
                    }
                });
            })

            return movie;
        });

    }


    getAll() {
        const { Movie } = this.server.models();
        return Movie.query();
    }

    getById(id) {
        const { Movie } = this.server.models();
        return Movie
            .query()
            .findById
            (id);
    }

    sendToCsv(){
        const { Movie } = this.server.models();
        Movie.query().then(movies => {

        });
    }
};
