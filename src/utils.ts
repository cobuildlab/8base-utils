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
