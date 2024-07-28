import { Router } from 'express';
import {
  addPet,
  buyPet,
  deletePetById,
  getAdoptedPet,
  getAllPets,
  getPetById,
  updatePetDetails,
} from '../controllers/Pet.controller.js';
import { uploadMiddleware } from '../middlewares/multer.middleware.js';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';
import { redisCacheMiddleware, redisFlush } from '../middlewares/redisCache.middleware.js';

const router: Router = Router();

// Protected Routes
router.route('/add').post(isAuthenticate(false), uploadMiddleware, redisFlush, addPet);
router.route('/delete/:id').delete(isAuthenticate(false), redisFlush, deletePetById);
router.route('/update/:id').put(isAuthenticate(false), uploadMiddleware, redisFlush, updatePetDetails);
router.route('/adopt/:id').patch(isAuthenticate(false), redisFlush, buyPet);

// Route to get User Specific Adopted Pets
router.route('/getAdoptedPet/:id').get(isAuthenticate(false), getAdoptedPet);

// Public Route
router.route('/getDetails/all').get(redisCacheMiddleware({ EX: 21600 }), getAllPets);
router.route('/getDetails/:id').get(getPetById);

export default router;
