
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('users', tbl =>{
        tbl.increments()
        tbl.string('username').notNullable().unique()
        tbl.string('password').notNullable()
        tbl.string('title')
        tbl.string('tagline')
        tbl.string('guideDuration')
    })

    await knex.schema.createTable('trips', tbl => {
        
        tbl.increments()

        tbl
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
        
        tbl.string('name', 128)
        tbl.string('state', 128)
        tbl.string('city', 128)   
        tbl.integer('zipcode', 128)
        tbl.boolean('isProfessional').defaultTo(false)

    })
  
};

exports.down = function(knex, Promise) {

    return knex.scheme.
    dropTableifExists('users')
    .dropTableifExistsdropTableifExists('trips')
  
};
