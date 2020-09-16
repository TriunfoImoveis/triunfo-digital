import { Router } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Office from '../entities/Office';
import CreateOfficeService from '../services/CreateOfficeService';
import idValidUuid from '../middlewares/idValidedUuid';
import UpdateOfficeService from '../services/UpdateOfficeService';

const officeRouter = Router();

officeRouter.get('/', async (request, response) => {
  const officesRepository = getRepository(Office);

  const officesList = await officesRepository.find({ where: { active: true } });

  return response.json(officesList);
});


officeRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createOffice = new CreateOfficeService();
  const office = await createOffice.execute({ name });

  return response.json(office);
});


officeRouter.get('/:id', idValidUuid, async (request, response) =>{

  const officeRepository = getRepository(Office);

  const office = await officeRepository.findOne(request.params.id);

  if (!office){
    throw new AppError('Office not exist.');
  }

  return response.json(office);
});


officeRouter.put('/:id', idValidUuid, async (request, response) => {

  const officeUpdateService = new UpdateOfficeService();
  const officeUpdated = await officeUpdateService.execute({
    id: request.params.id,
    body: request.body,
  });

  return response.json(officeUpdated);
});


officeRouter.delete('/:id', idValidUuid, async (request, response) => {

  const officeRepository = getRepository(Office);
  await officeRepository.delete(request.params.id);

  return response.status(204).send();
});

export default officeRouter;
