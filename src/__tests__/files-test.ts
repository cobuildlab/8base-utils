import {normalize8baseDocumentCreate, normalize8baseDocumentsCreate} from '../files';
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
