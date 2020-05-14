import {ValidationError} from './error/ValidationError';
import {isNullOrUndefined} from "@cobuildlab/validation-utils";

const _validateNullOrUndefined = (value: any, errorPrefix: string) => {
    if (value === '' || isNullOrUndefined(value)) {
        throw new ValidationError(
            `${errorPrefix}: value: can't be blank, null or undefined.`,
        );
    }
}

/**
 * Helper to change non null keys to 8base 'connect' reference.
 *
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8BaseReferenceConnect = (
    data: Record<string, any>,
    key: string,
) => {
    _validateNullOrUndefined(key, 'normalize8BaseReferenceConnect:key');

    const currentValue = data[key];
    if (currentValue === null || currentValue === '') {
        delete data[key];
        return;
    }

    // If currentValue is an string we assume that this is the ID for the connect
    if (typeof currentValue === 'string') {
        data[key] = {connect: {id: currentValue}};
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
                `normalize8BaseReferenceConnect: the value on data of the key: '${key}' is not a string, instead is: '${currentId}'`,
            );
        }
        data[key] = {connect: {id: currentId}};
        return;
    }

    throw new ValidationError(
        `normalize8BaseReferenceConnect: '${key}' in data is not a 'string' or a 'object'.`,
    );
};

/**
 * Helper to change non null keys to 8base 'create' reference for files.
 *
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8baseDocumentCreate = (
    data: Record<string, any>,
    key: string,
) => {
    _validateNullOrUndefined(key, 'normalize8baseDocumentCreate:key');

    const currentValue = data[key];
    if (isNullOrUndefined(currentValue)) {
        delete data[key];
        return;
    }

    if (typeof currentValue !== 'object' || isNullOrUndefined(currentValue.fileId)) {
        throw new ValidationError(
            `normalize8baseDocumentCreate: value has to be an object with a fileId key.`,
        );
    }

    data[key] = {create: {fileId: currentValue.fileId}};
}


/**
 * Helper to change non null keys to 8base 'create' reference for files.
 *
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8baseDocumentsCreate = (
    data: Record<string, any>,
    key: string,
) => {
    _validateNullOrUndefined(key, 'normalize8baseDocumentsCreate:key');

    const currentValue = data[key];
    if (isNullOrUndefined(currentValue)) {
        delete data[key];
        return;
    }

    if (!Array.isArray(currentValue)){
        throw new ValidationError(
            `normalize8baseDocumentsCreate: value has to be an array of objects with a fileId key.`,
        );
    };

    if (currentValue.length === 0){
        delete data[key];
        return;
    };

    const documents:Record<string,any>[] = [];
    for(const file of currentValue){
        _validateNullOrUndefined(file.fileId, 'normalize8baseDocumentsCreate:object.fileId');
        documents.push({fileId:file.fileId});
    };

    data[key] = {create: documents};
}
