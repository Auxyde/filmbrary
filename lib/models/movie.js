'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movie';
    }

    static get relationMappings() {
        const User = require('./user'); // Assurez-vous que le chemin est correct

        return {
            users: { // Utilisateurs liés à ce film
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'movie.id',
                    through: {
                        from: 'user_movies.movieId', // Correction ici
                        to: 'user_movies.userId' // Et ici
                    },
                    to: 'user.id'
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Jaws').description('Title of the movie'),
            description: Joi.string().example('A movie about a shark').description('Description of the movie'),
            releaseDate: Joi.date().description('Release date of the movie'),
            director: Joi.string().min(3).example('Steven Spielberg').description('Director of the movie'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};
