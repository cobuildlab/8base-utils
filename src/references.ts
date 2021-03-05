import { isNullOrUndefined } from '@cobuildlab/validation-utils';

import { _validateNullOrUndefinedOrBlank } from './utils';
import { ValidationError } from './error/ValidationError';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Helper to change non null keys to 8base 'connect' reference.
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings.
 *
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8baseReferenceConnect = (
  data: Record<string, any>,
  key: string,
): void => {
  _validateNullOrUndefinedOrBlank(key, 'normalize8baseReferenceConnect:key');

  const currentValue = data[key];
  if (currentValue === null || currentValue === '') {
    delete data[key];
    return;
  }

  // If currentValue is an string we assume that this is the ID for the connect
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
        `normalize8baseReferenceConnect: the value on data of the key: '${key}' is not a string, instead is: '${currentId}'`,
      );
    }
    data[key] = { connect: { id: currentId } };
    return;
  }

  throw new ValidationError(
    `normalize8baseReferenceConnect: '${key}' in data is not a 'string' or a 'object'.`,
  );
};

/**
 * Helper to change non null keys to 8base 'update' reference.
 * If the value of the key is undefined or null, the property gets deleted from the object.
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings.
 *
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8baseDocumentUpdate = (
  data: Record<string, any>,
  key: string,
): void => {
  _validateNullOrUndefinedOrBlank(key, 'normalize8baseDocumentUpdate:key');

  const currentValue = data[key];
  
  if (isNullOrUndefined(currentValue)) {
    delete data[key];
    return;
  }

  data[key] = {
    update: { ...currentValue },
  };
};
