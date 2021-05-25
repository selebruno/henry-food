/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: false })
    .then(() => Recipe.findOne({
      where:{
        name: recipe.name
      }
    })));
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
  });
  
    it('espera que sea json', function(){
      return agent.get('/types')
        .expect('Content-Type', /json/);
    });
  });

  describe('GET /recipes/:idReceta', function () {
    it('sends 404 when page does not exist', () => {
      return agent.get('/recipes:idReceta/noexiste')
        .expect(404);
    });
    
  });

  
