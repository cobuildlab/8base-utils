import {normalize8BaseConnect} from "../index";
import {ValidationError} from "../error/ValidationError";

const t = () => {
    throw new Error("");
}

test('normalize8baseConnect:', () => {
    expect(() => normalize8BaseConnect({}, "")).toThrowError(new ValidationError(`normalize8BaseConnect: key: can't be blank or null.`));

    const o1 = {a: null};
    normalize8BaseConnect(o1, "a");
    expect(o1).toMatchObject({});

    const o2 = {a: ""};
    normalize8BaseConnect(o2, "a");
    expect(o1).toMatchObject({});

    const o3 = {a: "<ID>"};
    normalize8BaseConnect(o3, "a");
    expect(o3).toMatchObject({a: {connect: {id: "<ID>"}}});

    const o4 = {a: {id: "<ID>"}};
    normalize8BaseConnect(o4, "a");
    expect(o4).toMatchObject({a: {connect: {id: "<ID>"}}});

    const o5 = {a: 1};
    expect(() => normalize8BaseConnect(o5, "a")).toThrowError(new ValidationError(`normalize8BaseConnect: 'a' in data is not a 'string' or a 'object'.`));

    const o6 = {a: {id: null}};
    expect(() => normalize8BaseConnect(o6, "a")).toThrowError(new ValidationError(`normalize8BaseConnect: the value on data of the key: 'a' is not a string, instead is: 'null'`));

    const o7 = {a: {id: undefined}};
    expect(() => normalize8BaseConnect(o7, "a")).toThrowError(new ValidationError(`normalize8BaseConnect: the value on data of the key: 'a' is not a string, instead is: 'undefined'`));

    const o8 = {a: {id: 1}};
    expect(() => normalize8BaseConnect(o8, "a")).toThrowError(new ValidationError(`normalize8BaseConnect: the value on data of the key: 'a' is not a string, instead is: '1'`));

    const o9 = {a: {id: ""}};
    expect(() => normalize8BaseConnect(o9, "a")).toThrowError(new ValidationError(`normalize8BaseConnect: the value on data of the key: 'a' is not a string, instead is: ''`));
})

