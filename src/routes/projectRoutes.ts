import { Router } from "express";
import * as projectController from "../controllers/projectController";

const router = Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.post("/:id/members", projectController.assignUserToProject);
router.delete("/:id/members/:userId", projectController.removeUserFromProject);

export default router;
