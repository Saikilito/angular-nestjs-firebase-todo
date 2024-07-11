import { Router } from 'express';

import { TaskController } from '../../controllers';

const taskRouter = Router();

taskRouter.get('/', TaskController.getAll);

taskRouter.post('/', TaskController.create);

taskRouter.patch('/:id', TaskController.updateById);

taskRouter.delete('/:id', TaskController.deleteById);

export default taskRouter;
