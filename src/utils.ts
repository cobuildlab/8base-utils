import { isNullOrUndefined } from "@cobuildlab/validation-utils";
import { ValidationError } from "./error/ValidationError";

/**
 * Validates a value for null, undefined or blank
 * @param {any}value - The Value.
 * @param {string} errorPrefix - An error prefix
 * @private
 */
export const _validateNullOrUndefinedOrBlank = (value: any, errorPrefix: string) => {
  if (value === "" || isNullOrUndefined(value)) {
    throw new ValidationError(
      `${errorPrefix}: value: can't be blank, null or undefined.`
    );
  }
};
/**
 * Validates that an object has a valid fileId property
 *
 * @param {object}file - The object to be validated.
 * @param errorPrefix - An error prefix for the Error
 * @private
 */
export const _validateFile = (file: any, errorPrefix: string) => {
  if (typeof file !== "object")
    throw new ValidationError(`${errorPrefix}: file is not a valid object.`);

  if (isNullOrUndefined(file.fileId))
    throw new ValidationError(`${errorPrefix}: object is not a valid file as it doesn't contain a valid fileId property.`);

  if (isNullOrUndefined(file.filename))
    throw new ValidationError(`${errorPrefix}: object is not a valid file as it doesn't contain a valid filename property.`);
};

/**
 * Validates that an object is a valid list of objects with  fileId properties.
 *
 * @param {Array}files - The objects to be validated.
 * @param errorPrefix - An error prefix for the Error
 * @private
 */
export const _validateFiles = (files: any, errorPrefix: string) => {
  if (!Array.isArray(files))
    throw new ValidationError(`${errorPrefix}: object is not a List.`);
  for (const file of files)
    _validateFile(file, errorPrefix);
};

/**
 * Validates that an object has a valid id property
 *
 * @param {object}obj - The object to be validated.
 * @param errorPrefix - An error prefix for the Error
 * @private
 */
export const _validateReference = (obj: any, errorPrefix: string) => {
  if (typeof obj !== "object" || isNullOrUndefined(obj.id))
    throw new ValidationError(`${errorPrefix}: object is not a valid reference as it doesn't contain a valid id property.`);
};

/**
 * Validates that an object is a valid list of objects with id properties.
 *
 * @param {Array}objs - The objects to be validated.
 * @param errorPrefix - An error prefix for the Error
 * @private
 */
export const _validateReferences = (objs: any, errorPrefix: string) => {
  if (!Array.isArray(objs))
    throw new ValidationError(`${errorPrefix}: object is not a List.`);
  for (const obj of objs)
    _validateReference(obj, errorPrefix);
};

/**
 * Parses the GraphQL error to JSON to get its message.
 * If a GraphQL message is not found, it will return the error's message instead.
 *
 * @param  {Error} error - The graphql error.
 * @returns {string} The error with the parsed message.
 */
export function getMessageFromGraphQLError(error: Error) {
  const { message } = error;
  try {
    const jsonStartIndex = message.indexOf(' {');
    const jsonEndIndex = message.lastIndexOf('}') + 1;
    const jsonBody = message.substring(jsonStartIndex, jsonEndIndex);

    const jsonError = JSON.parse(jsonBody);
    const { message: jsonMessage, raw } = jsonError;

    if (jsonMessage) {
      return jsonMessage;
    }

    if (raw && raw.message) {
      return raw.message;
    }
    // Return original message.
    return message;
  } catch (e) {
    console.error('getMessageFromGraphQLError Error: ', e);
    return message;
  }
};
