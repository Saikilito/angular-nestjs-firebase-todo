import { ZodError } from 'zod';

export const zodMapError = (zodError: ZodError) => {
  const { errors } = zodError;

  const errorMap = {
    message: new Set<string>(),
    path: [],
  };

  errors.forEach((error) => {
    errorMap.message.add(error.message);
    error.path.forEach((path) => errorMap.path.push(path));
  });

  return {
    message: Array.from(errorMap.message).join(', '),
    path: errorMap.path.join(', '),
  };
};

export const zodMapErrors = (zodErrors: ZodError[]) => {
  const errorMap = {
    message: [],
    path: [],
  };

  zodErrors.map(zodMapError).forEach((map) => {
    errorMap.message.push(map.message);
    errorMap.path.push(map.path);
  });

  return {
    message: errorMap.message.join(', '),
    path: errorMap.path.join(', '),
  };
};
