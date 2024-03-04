'use strict';

const Joi = require('joi');

const getMovie = {
    method: 'get',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin', 'user']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Movie id')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.getById(request.params.id);
    }
};


const getMovies = {
    method: 'get',
    path: '/movies',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin', 'user']
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.getAll();
    }
};

const createMovie = {
    method: 'post',
    path: '/movie',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                title: Joi.string().required().min(3).example('Jaws').description('Title of the movie'),
                description: Joi.string().example('A movie about a shark').description('Description of the movie'),
                releaseDate: Joi.date().description('Release date of the movie'),
                director: Joi.string().required().min(3).example('Steven Spielberg').description('Director of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();


        return await movieService.create(request.payload);
    }
};

const editMovie = {
    method: 'patch',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Movie id')
            }),
            payload: Joi.object({
                title: Joi.string().min(3).example('Jaws').description('Title of the movie'),
                description: Joi.string().example('A movie about a shark').description('Description of the movie'),
                releaseDate: Joi.date().description('Release date of the movie'),
                director: Joi.string().min(3).example('Steven Spielberg').description('Director of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.update(request.params.id, request.payload);
    }
}

const deleteMovie = {
    method: 'delete',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Movie id')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.delete(request.payload);
    }
}



module.exports = [
    getMovie,
    getMovies,
    createMovie,
    editMovie,
    deleteMovie
];
