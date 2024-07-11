import { Router } from 'express';

import { TaskController } from '../../controllers';
import { TaskValidation } from '../../dependency-injection';

const taskRouter = Router();

taskRouter.get('/', TaskValidation.validateGetAllQuery, TaskController.getAll);

taskRouter.post(
  '/',
  TaskValidation.validateCreateTaskInput,
  TaskController.create
);

taskRouter.patch(
  '/:id',
  TaskValidation.validateTaskPartialInput,
  TaskController.updateById
);

taskRouter.delete(
  '/:id',
  TaskValidation.validateIdParams,
  TaskController.deleteById
);

export default taskRouter;
