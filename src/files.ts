import {isNullOrUndefined} from "@cobuildlab/validation-utils";
import {_validateFile, _validateFiles, _validateNullOrUndefinedOrBlank, _validateReference} from "./utils";


/**
 * Helper to change non null keys to 8base 'create' reference for files.
 * If the value of the key is undefined or null, the property gets deleted from the object.
 * WARNING: This function mutates the data.
 * WARNING: This functions assumes that all 8base keys are strings.
 *
 * @param {object} data - The Object to be Mutated.
 * @param {string} key - The key in the Object.
 */
export const normalize8baseDocumentCreate = (
    data: Record<string, any>,
    key: string,
) => {
    _validateNullOrUndefinedOrBlank(key, 'normalize8baseDocumentCreate:key');

    const currentValue = data[key];
    if (isNullOrUndefined(currentValue)) {
        delete data[key];
        return;
    }

    _validateFile(currentValue, "normalize8baseDocumentCreate:currentValue");
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
    _validateNullOrUndefinedOrBlank(key, 'normalize8baseDocumentsCreate:key');

    const currentValues = data[key];
    if (isNullOrUndefined(currentValues)) {
        delete data[key];
        return;
    }

    _validateFiles(currentValues, "normalize8baseDocumentsCreate:currentValues");

    if (currentValues.length === 0) {
        delete data[key];
        return;
    }

    const documents: Record<string, any>[] = [];
    for (const file of currentValues) {
        _validateFile(file, 'normalize8baseDocumentsCreate:file.fileId');
        documents.push({fileId: file.fileId});
    }

    data[key] = {create: documents};
}


/**
 * Helper to update or delete one document key from an Object.
 * WARNING: This function mutates the data.
 *
 * @param {object}data - Data for mutation.
 * @param {string}key - Key object.
 * @param {object}originalData - Original object.
 */
export const normalize8baseDocumentDeleteAndUpdate = (data: Record<string, any>,
                                                      key: string, originalData: Record<string, any>,) => {
    _validateNullOrUndefinedOrBlank(key, 'normalize8baseDocumentDeleteAndUpdate:key');

    const newFile = data[key];
    const oldFile = originalData[key];

    if (isNullOrUndefined(newFile)) {
        if (isNullOrUndefined(oldFile)) {
            delete data[key];
        } else {
            _validateReference(oldFile, 'normalize8baseDocumentDeleteAndUpdate:oldFile');
            data[key] = {disconnect: {id: oldFile.id}};
        }
        return;
    }

    _validateFile(newFile, 'normalize8baseDocumentDeleteAndUpdate:newFile');

    if (isNullOrUndefined(newFile.id)) {
        data[key] = {create: {fileId: newFile.fileId}};
        return;
    }

    delete data[key];
};


/**
 * Helper to change non null keys to 8base 'delete & create' reference for Documents Lists
 * WARNING: This function mutates the data.
 *
 * @param {object} data - To mutate.
 * @param {string} key - The key of the property to mutate.
 * @param {Array} originalData - The documents originals.
 */
export const normalize8BaseDocumentsDeleteAndUpdate = (data: Record<string, any>, key: string, originalData: Record<string, any>) => {

    _validateNullOrUndefinedOrBlank(key, 'normalize8BaseDocumentsDeleteAndUpdate:key');

    const newFiles = data[key];
    const oldFiles = originalData[key];

    if (isNullOrUndefined(newFiles)) {
        if (isNullOrUndefined(oldFiles)) {
            delete data[key];
        } else {
            _validateFiles(oldFiles, "normalize8BaseDocumentsDeleteAndUpdate:oldFiles");
            data[key] = {
                disconnect: oldFiles.map((file: Record<string, string>) => {
                    return {fileId: file.fileId}
                })
            };
        }
        return;
    }

    _validateFiles(newFiles, "normalize8BaseDocumentsDeleteAndUpdate:newFiles");
    _validateFiles(oldFiles, "normalize8BaseDocumentsDeleteAndUpdate:oldFiles");

    const toBeDeleted: Record<string, string>[] = [];
    const toBeCreated: Record<string, string>[] = [];

    newFiles.forEach((file: Record<string, string>) => {
        if (file.id === undefined)
            toBeCreated.push(file);
    });

    oldFiles.forEach((oldFile: Record<string, string>) => {
        for (const newFile of newFiles) {
            if (newFile.id === oldFile.id)
                return;
        }
        toBeDeleted.push(oldFile);
    });

    if (toBeCreated.length === 0 && toBeDeleted.length === 0) {
        delete data[key];
        return;
    }

    data[key] = {};
    if (toBeCreated.length > 0)
        data[key].create = toBeCreated.map(file => {
            return {fileId: file.fileId};
        });
    if (toBeDeleted.length > 0)
        data[key].disconnect = toBeDeleted.map(file => {
            return {id: file.id};
        });
};
