'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DebtsSchema extends Schema {
  up () {
    this.create('debts', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      table.string('user_name', 120).notNullable()
      table.string('reason').notNullable()
      table.date('date').notNullable()
      table.decimal('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('debts')
  }
}

module.exports = DebtsSchema
