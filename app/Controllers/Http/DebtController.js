"use strict";

const Debts = use("App/Models/Debt");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with debts
 */
class DebtController {
  /**
   * Show a list of all debts.
   * GET debts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const debts = Debts.all();

    return debts;
  }

  /**
   * Render a form to be used for creating a new debt.
   * GET debts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ auth, request, response }) {
    const { id } = auth.user;
    const data = request.only([
      "user_id", 
      "user_name", 
      "reason", 
      "date", 
      "value"]);

    const debt = await Debts.create({...data , user_id: id})
    
    return debt
  }

  /**
   * Display a single debt.
   * GET debts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const debt = await Debts.findOrFail(params.id);

    return debt;
  }

  /**
   * Render a form to update an existing debt.
   * GET debts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update({ params, request, response }) {
    const debt = await Debts.findOrFail(params.id)
    
    const data = request.only([
      "user_id", 
      "user_name", 
      "reason", 
      "date", 
      "value"]);

      debt.merge(data)

      await debt.save()

      return debt
  }

  /**
   * Delete a debt with id.
   * DELETE debts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const debt = await Debts.findOrFail(params.id);

    if (debt.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }

    await debt.delete();
  }
}

module.exports = DebtController;
