import pool from '../db/db.js';
import validatePetInputs from '../middlewares/validate.js';

const petController = {
  getAllPets: async (req, res) => {
    const result = await pool.query('SELECT * FROM pets');
    res.render('index', { pets: result.rows });
  },

  addNewPet: async (req, res) => {
    res.render('addPet');
  },

  getPetDetails: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send('Invalid ID');
    }
    const result = await pool.query('SELECT * FROM pets WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.render('petDetails', { pet: result.rows[0] });
    } else {
      res.status(404).send('Pet not found');
    }
  },

  getPetEdit: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send('Invalid ID');
    }
    const result = await pool.query('SELECT * FROM pets WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.render('editPet', { pet: result.rows[0] });
    } else {
      res.status(404).send('Pet not found');
    }
  },

  createPet: async (req, res) => {
    const errors = validatePetInputs(req.body);
    if (errors.length > 0) {
      return res.status(400).render('addPet', { errors });
    }
    const { name, species, age, breed, gender, status } = req.body;
    
    const query = `
        INSERT INTO pets (name, species, age, breed, gender, status) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id
    `;
    const values = [name, species, age, breed, gender, status];
    await pool.query(query, values);
    
    console.log("Pet created successfully");
    res.redirect(`/`);
  },

  updatePet: async (req, res) => {
    const errors = validatePetInputs(req.body);
    if (errors.length > 0) {
      return res.status(400).render('editPet', { errors, pet: req.body });
    }
    const { id } = req.params;
    const { name, species, age, breed, gender, status } = req.body;
    const query = `
        UPDATE pets 
        SET name = $1, species = $2, age = $3, breed = $4, gender = $5, status = $6 
        WHERE id = $7
    `;
    const values = [name, species, age, breed, gender, status, id];
    await pool.query(query, values);
    res.redirect(`/`);
  },

  deletePet: async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).send('Invalid ID');
    }
    await pool.query('DELETE FROM pets WHERE id = $1', [id]);
    res.redirect('/');
  },
};

export default petController;
