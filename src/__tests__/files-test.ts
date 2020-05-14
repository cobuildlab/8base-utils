import {
    normalize8baseDocumentCreate,
    normalize8baseDocumentDeleteAndUpdate,
    normalize8baseDocumentsCreate
} from '../files';
import {ValidationError} from '../error/ValidationError';


test('normalize8baseDocumentCreate:', () => {
    expect(() => normalize8baseDocumentCreate({}, '')).toThrowError(
        new ValidationError(`normalize8baseDocumentCreate:key: value: can't be blank, null or undefined.`),
    );

    const o1 = {a: null};
    normalize8baseDocumentCreate(o1, 'a');
    expect(o1).toMatchObject({});

    const o2 = {a: undefined};
    normalize8baseDocumentCreate(o2, 'a');
    expect(o2).toMatchObject({});

    const o3 = {a: 1};
    expect(() => normalize8baseDocumentCreate(o3, 'a')).toThrowError(
        new ValidationError(
            `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`,
        ),
    );

    const o4 = {a: "something"};
    expect(() => normalize8baseDocumentCreate(o4, 'a')).toThrowError(
        new ValidationError(
            `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`,
        ),
    );

    const o5 = {a: {fileId: null}};
    expect(() => normalize8baseDocumentCreate(o5, 'a')).toThrowError(
        new ValidationError(
            `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`,
        ),
    );

    const o6 = {a: {fileId: undefined}};
    expect(() => normalize8baseDocumentCreate(o6, 'a')).toThrowError(
        new ValidationError(
            `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`,
        ),
    );

    const o7 = {a: {fileId: '<ID>'}};
    normalize8baseDocumentCreate(o7, 'a');
    expect(o7).toMatchObject({a: {create: {fileId: '<ID>'}}});

});


test('normalize8baseDocumentsCreate:', () => {
    expect(() => normalize8baseDocumentsCreate({}, '')).toThrowError(
        new ValidationError(`normalize8baseDocumentsCreate:key: value: can't be blank, null or undefined.`),
    );

    const o1 = {a: null};
    normalize8baseDocumentsCreate(o1, 'a');
    expect(o1).toMatchObject({});

    const o2 = {a: undefined};
    normalize8baseDocumentsCreate(o2, 'a');
    expect(o2).toMatchObject({});

    const o3 = {a: 1};
    expect(() => normalize8baseDocumentsCreate(o3, 'a')).toThrowError(
        new ValidationError(
            `normalize8baseDocumentsCreate:currentValues: object is not a List.`,
        ),
    );

    const o4 = {a: "something"};
    expect(() => normalize8baseDocumentsCreate(o4, 'a')).toThrowError(
        new ValidationError(
            `normalize8baseDocumentsCreate:currentValues: object is not a List.`,
        ),
    );

    const o5 = {a: []};
    normalize8baseDocumentsCreate(o5, 'a');
    expect(o5).toMatchObject({});

    const o6 = {a: [{id: null}]};
    expect(() => normalize8baseDocumentsCreate(o6, 'a')).toThrowError(
        new ValidationError(`normalize8baseDocumentsCreate:currentValues: object is not a valid file as it doesn't contain a valid fileId property.`),
    );

    const o7 = {a: {fileId: null}};
    expect(() => normalize8baseDocumentsCreate(o7, 'a')).toThrowError(
        new ValidationError(`normalize8baseDocumentsCreate:currentValues: object is not a List.`),
    );

    const o8 = {a: [{fileId: '<ID>'}]};
    normalize8baseDocumentsCreate(o8, 'a');
    expect(o8).toMatchObject({a: {create: [{fileId: '<ID>'}]}});

    const o9 = {a: [{fileId: '<ID1>'}, {fileId: '<ID2>'}]};
    normalize8baseDocumentsCreate(o9, 'a');
    expect(o9).toMatchObject({a: {create: [{fileId: '<ID1>'}, {fileId: '<ID2>'}]}});

});


test('normalize8baseDocumentDeleteAndUpdate:', () => {
    expect(() => normalize8baseDocumentDeleteAndUpdate({}, '', {})).toThrowError(
        new ValidationError(`normalize8baseDocumentDeleteAndUpdate:key: value: can't be blank, null or undefined.`),
    );

    const newO1 = {a: null};
    const oldO1 = {a: null};
    normalize8baseDocumentDeleteAndUpdate(newO1, 'a', oldO1);
    expect(newO1).toMatchObject({});

    const newO2 = {a: undefined};
    const oldO2 = {a: undefined};
    normalize8baseDocumentDeleteAndUpdate(newO2, 'a', oldO2);
    expect(newO2).toMatchObject({});

    const newO3 = {a: null};
    const oldO3 = {a: 1};
    expect(() => normalize8baseDocumentDeleteAndUpdate(newO3, 'a', oldO3)).toThrowError(
        new ValidationError(
            `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`,
        ),
    );

    const newO4 = {a: null};
    const oldO4 = {a: "1"};
    expect(() => normalize8baseDocumentDeleteAndUpdate(newO4, 'a', oldO4)).toThrowError(
        new ValidationError(
            `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`,
        ),
    );

    const newO5 = {a: null};
    const oldO5 = {a: {}};
    expect(() => normalize8baseDocumentDeleteAndUpdate(newO5, 'a', oldO5)).toThrowError(
        new ValidationError(
            `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`,
        ),
    );

    const newO6 = {a: null};
    const oldO6 = {a: {id: null}};
    expect(() => normalize8baseDocumentDeleteAndUpdate(newO6, 'a', oldO6)).toThrowError(
        new ValidationError(
            `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`,
        ),
    );

    const newO7 = {a: null};
    const oldO7 = {a: {id: undefined}};
    expect(() => normalize8baseDocumentDeleteAndUpdate(newO7, 'a', oldO7)).toThrowError(
        new ValidationError(
            `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`,
        ),
    );

    const newO8 = {a: null};
    const oldO8 = {a: {id: "FILE-ID"}};
    normalize8baseDocumentDeleteAndUpdate(newO8, 'a', oldO8);
    expect(newO8).toMatchObject({a: {disconnect: {id: "FILE-ID"}}});

});
