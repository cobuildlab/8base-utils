import {isNullOrUndefined} from "@cobuildlab/validation-utils";
import {ValidationError} from "./error/ValidationError";

/**
 * Validates a value for null, undefined or blank
 * @param {any}value - The Value.
 * @param {string} errorPrefix - An error prefix
 * @private
 */
export const _validateNullOrUndefinedOrBlank = (value: any, errorPrefix: string) => {
    if (value === '' || isNullOrUndefined(value)) {
        throw new ValidationError(
            `${errorPrefix}: value: can't be blank, null or undefined.`,
        );
    }
}
/**
 * Validates that an object has a valid fileId property
 *
 * @param {object}file - The object to be validated.
 * @param errorPrefix - An error prefix for the Error
 * @private
 */
export const _validateFile = (file: any, errorPrefix: string) => {
    if (typeof file !== 'object' || isNullOrUndefined(file.fileId))
        throw new ValidationError(`${errorPrefix}: object is not a valid file as it doesn't contain a valid fileId property.`);
}

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
}

/**
 * Validates that an object has a valid id property
 *
 * @param {object}obj - The object to be validated.
 * @param errorPrefix - An error prefix for the Error
 * @private
 */
export const _validateReference = (obj: any, errorPrefix: string) => {
    if (typeof obj !== 'object' || isNullOrUndefined(obj.id))
        throw new ValidationError(`${errorPrefix}: object is not a valid reference as it doesn't contain a valid id property.`);
}

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
}
