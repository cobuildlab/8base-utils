import { ValidationError } from './error/ValidationError';

/**
 * Helper to change non null keys to 8base 'connect' reference.
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8BaseConnect = (
  data: Record<string, any>,
  key: string,
) => {
  if (key === '' || key === null) {
    throw new ValidationError(
      `normalize8BaseConnect: key: can't be blank or null.`,
    );
  }

  const currentValue = data[key];
  if (currentValue === null || currentValue === '') {
    delete data[key];
    return;
  }

  if (typeof currentValue === 'string') {
    data[key] = { connect: { id: currentValue } };
    return;
  }

  if (typeof currentValue === 'object') {
    const currentId = currentValue.id;
    if (
      currentId === null ||
      currentId === undefined ||
      typeof currentId !== 'string' ||
      currentId === ''
    ) {
      throw new ValidationError(
        `normalize8BaseConnect: the value on data of the key: '${key}' is not a string, instead is: '${currentId}'`,
      );
    }
    data[key] = { connect: { id: currentId } };
    return;
  }

  throw new ValidationError(
    `normalize8BaseConnect: '${key}' in data is not a 'string' or a 'object'.`,
  );
};
