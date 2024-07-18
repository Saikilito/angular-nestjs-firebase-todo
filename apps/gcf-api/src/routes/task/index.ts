import { Router } from 'express';

import { authorizationMiddleware } from '../../middlewares';
import { TaskController } from '../../controllers';
import { TaskValidation } from '../../dependency-injection';

const taskRouter = Router();

taskRouter.get(
  '/',
  authorizationMiddleware,
  TaskValidation.validateGetAllQuery,
  TaskController.getAll
);

taskRouter.post(
  '/',
  authorizationMiddleware,
  TaskValidation.validateCreateTaskInput,
  TaskController.create
);

taskRouter.patch(
  '/:id',
  authorizationMiddleware,
  TaskValidation.validateTaskPartialInput,
  TaskController.updateById
);

taskRouter.delete(
  '/:id',
  authorizationMiddleware,
  TaskValidation.validateIdParams,
  TaskController.deleteById
);

export default taskRouter;
