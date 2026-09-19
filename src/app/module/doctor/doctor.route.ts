import { Router } from "express";
import { upload } from "../../lib/multer";
import { DoctorController } from "./doctor.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";


const router = Router();

router.post(
	"/apply-as-doctor",
	// validateRequest(UserValidation.ResetPasswordZodSchema),
	upload.fields([
		{
			name: "resume",
			maxCount: 1,
		},

		{
			name: "additionalFiles",
			maxCount: 10,
		},
	]),
	DoctorController.applyAsDoctor,
);

router.post(
	"/apply-as-doctor/verify-email",
	DoctorController.verifyDoctorEmail,
);

router.post(
	"/approve-doctor",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	DoctorController.verifyDoctorEmail,
);

export const DoctorRoutes = router;