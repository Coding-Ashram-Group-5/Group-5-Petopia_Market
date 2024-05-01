import { Router } from 'express';
import {
  addPet,
  buyPet,
  deletePetById,
  getAllPets,
  getPetById,
  updatePetDetails,
} from '../controllers/Pet.controller.js';
import { uploadMiddleware } from '../middlewares/multer.middleware.js';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';

const router: Router = Router();

// Protected Routes
router.route('/add').post(isAuthenticate, uploadMiddleware, addPet);
router.route('/delete/:id').delete(isAuthenticate, deletePetById);
router.route('/update/:id').put(isAuthenticate, uploadMiddleware, updatePetDetails);
router.route('/purchase/:id').patch(isAuthenticate, buyPet);

// Public Route
router.route('/getDetails/all').get(getAllPets);
router.route('/getDetails/:id').get(getPetById);

export default router;
