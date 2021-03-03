import { isNullOrUndefined } from '@cobuildlab/validation-utils';
import { ValidationError } from './error/ValidationError';
import { ResponseBody } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Validates a value for null, undefined or blank.
 *
 * @param {any}value - The Value.
 * @param {string} errorPrefix - An error prefix.
 * @private
 */
export const _validateNullOrUndefinedOrBlank = (
  value: any,
  errorPrefix: string,
): void | never => {
  if (value === '' || isNullOrUndefined(value)) {
    throw new ValidationError(
      `${errorPrefix}: value: can't be blank, null or undefined.`,
    );
  }
};

/**
 * Validates that an object has a valid fileId property.
 *
 * @param {object}file - The object to be validated.
 * @param errorPrefix - An error prefix for the Error.
 * @private
 */
export const _validateFile = (file: any, errorPrefix: string): void | never => {
  if (typeof file !== 'object')
    throw new ValidationError(`${errorPrefix}: file is not a valid object.`);

  if (isNullOrUndefined(file.fileId))
    throw new ValidationError(
      `${errorPrefix}: object is not a valid file as it doesn't contain a valid fileId property.`,
    );

  if (isNullOrUndefined(file.filename))
    throw new ValidationError(
      `${errorPrefix}: object is not a valid file as it doesn't contain a valid filename property.`,
    );
};

/**
 * Validates that an object is a valid list of objects with  fileId properties.
 *
 * @param {Array}files - The objects to be validated.
 * @param errorPrefix - An error prefix for the Error.
 * @private
 */
export const _validateFiles = (
  files: any,
  errorPrefix: string,
): void | never => {
  if (!Array.isArray(files))
    throw new ValidationError(`${errorPrefix}: object is not a List.`);
  for (const file of files) _validateFile(file, errorPrefix);
};

/**
 * Validates that an object has a valid id property.
 *
 * @param {object}obj - The object to be validated.
 * @param errorPrefix - An error prefix for the Error.
 * @private
 */
export const _validateReference = (
  obj: any,
  errorPrefix: string,
): void | never => {
  if (typeof obj !== 'object' || isNullOrUndefined(obj.id))
    throw new ValidationError(
      `${errorPrefix}: object is not a valid reference as it doesn't contain a valid id property.`,
    );
};

/**
 * Validates that an object is a valid list of objects with id properties.
 *
 * @param {Array}objs - The objects to be validated.
 * @param errorPrefix - An error prefix for the Error.
 * @private
 */
export const _validateReferences = (
  objs: any,
  errorPrefix: string,
): void | never => {
  if (!Array.isArray(objs))
    throw new ValidationError(`${errorPrefix}: object is not a List.`);
  for (const obj of objs) _validateReference(obj, errorPrefix);
};

/**
 * Parses the GraphQL error to JSON to get its message.
 * If a GraphQL message is not found, it will return the error's message instead.
 *
 * @param  {Error} error - The graphql error.
 * @returns {string} The error with the parsed message.
 */
export function getMessageFromGraphQLError(error: Error): string {
  const { message } = error;

  const jsonStartIndex = message.indexOf(' {');
  const jsonEndIndex = message.lastIndexOf('}') + 1;
  const jsonBody = message.substring(jsonStartIndex, jsonEndIndex);

  let jsonError;
  try {
    jsonError = JSON.parse(jsonBody);
  } catch (e) {
    console.error('getMessageFromGraphQLError Error: ', e);
    return message;
  }

  const { message: jsonMessage, raw } = jsonError;

  if (jsonMessage) {
    return jsonMessage;
  }

  if (raw && raw.message) {
    return raw.message;
  }
  // Return original message.
  return message;
}

/**
 * Http response builder.
 *
 * @param code - Http status code.
 * @param message - Message to response.
 * @param headers - Http headers.
 * @returns Response object.
 */
export const responseBuilder = (
  code = 200,
  message?: string,
  headers?: Record<string, unknown>,
): ResponseBody => {
  const bodyData = typeof message === 'string' ? { message } : message;

  return {
    body: JSON.stringify(bodyData),
    statusCode: code,
    headers: headers ?? {},
  };
};

/**
 * Checks that the current environment is the one given.
 *
 * @param env - The environment in which code is running, production|development|test.
 *
 * @returns Result of comparing the equality between the given env and the current NODE_ENV.
 */
export const isEnvironment = (env: string): boolean =>
  process.env.NODE_ENV === env;

/**
 * Logs the error in Cloud Function.
 *
 * @param title - Title of the error to.
 * @param err - The error object thrown.
 * @param data - Data to identify the function state in the moment of the error.
 */
export const report = (title: string, err: Error, data = {}): void => {
  console.log(title);
  console.log(JSON.stringify(data, null, 2));
  console.log(JSON.stringify(err));
  console.log(err.message);
};
