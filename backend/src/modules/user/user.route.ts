import { userController } from './user.controller';
import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router=Router();

router.patch(
  "/",
  auth(Role.CUSTOMER,Role.CUSTOMER,Role.ADMIN,Role.PROVIDER),
  userController.updateMyProfile
);

router.delete(
  "/",
  auth(Role.CUSTOMER),
  userController.deleteMyProfile
);

export const userRoutes=router;