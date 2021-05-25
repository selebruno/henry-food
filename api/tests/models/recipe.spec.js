const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe('name', () => {
      it('Should create new recipe called Food', () => {
        Recipe.create({name: 'Food'})
      });
      it('Food recipe must be created', () => {
        Recipe.findOne({
          where:{
            name: 'Food'
          }  });
      });
    });
  });
});
