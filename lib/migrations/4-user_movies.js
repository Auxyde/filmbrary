'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user_movies', (table) => {
                table.increments('id').primary();
                table.integer('userId').unsigned().notNull().references('id').inTable('user');
                table.integer('movieId').unsigned().notNull().references('id').inTable('movie');
                table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
                table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('user_movies');
    }
};
