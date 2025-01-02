import express from 'express';
import petController from '../controllers/petController.js';

const router = express.Router();

router.get('/new', petController.addNewPet);
router.get('/', petController.getAllPets);
router.get('/:id/edit', petController.getPetEdit);
router.get('/:id', petController.getPetDetails);
router.post('/', petController.createPet);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

export default router;
