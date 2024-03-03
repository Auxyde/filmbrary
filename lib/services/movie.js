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
        Movie.query().findById(id).then
        (movie => {
            if (movie === undefined) {
                return null;
            }
        })
        return Movie.query().patchAndFetchById(id, movie);
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
};
