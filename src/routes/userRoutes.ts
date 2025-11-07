import { Router } from "express";
import * as userController from '../controllers/userController'
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id/role", userController.updateUserRole);
router.delete("/:id", userController.deleteUser);

export default router;