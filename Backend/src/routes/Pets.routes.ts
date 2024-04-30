import { Router } from 'express';
import { addPet, deletePetById, getAllPets, getPetById, updatePetDetails } from '../controllers/Pet.controller.js';
import { uploadMiddleware } from '../middlewares/multer.middleware.js';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';

const router: Router = Router();

// Protected Routes
router.route('/add').post(isAuthenticate, uploadMiddleware, addPet);
router.route('/delete/:id').delete(isAuthenticate, deletePetById);
router.route('/update/:id').patch(isAuthenticate, uploadMiddleware, updatePetDetails);

// Public Route
router.route('/getDetails/all').get(getAllPets);
router.route('/getDetails/:id').get(getPetById);

export default router;
