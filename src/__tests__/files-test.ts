import {
  normalize8baseDocumentCreate,
  normalize8baseDocumentDeleteAndUpdate,
  normalize8baseDocumentsCreate, normalize8BaseDocumentsDeleteAndUpdate
} from "../files";
import { ValidationError } from "../error/ValidationError";


test("normalize8baseDocumentCreate:", () => {
  expect(() => normalize8baseDocumentCreate({}, "")).toThrowError(
    new ValidationError(`normalize8baseDocumentCreate:key: value: can't be blank, null or undefined.`)
  );

  const o1 = { a: null };
  normalize8baseDocumentCreate(o1, "a");
  expect(o1).toEqual({});

  const o2 = { a: undefined };
  normalize8baseDocumentCreate(o2, "a");
  expect(o2).toEqual({});

  const o3 = { a: 1 };
  expect(() => normalize8baseDocumentCreate(o3, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const o4 = { a: "something" };
  expect(() => normalize8baseDocumentCreate(o4, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const o5 = { a: { fileId: null } };
  expect(() => normalize8baseDocumentCreate(o5, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const o6 = { a: { fileId: undefined } };
  expect(() => normalize8baseDocumentCreate(o6, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const o7 = { a: { fileId: "<ID>" } };
  normalize8baseDocumentCreate(o7, "a");
  expect(o7).toEqual({ a: { create: { fileId: "<ID>" } } });

});


test("normalize8baseDocumentsCreate:", () => {
  expect(() => normalize8baseDocumentsCreate({}, "")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreate:key: value: can't be blank, null or undefined.`)
  );

  const o1 = { a: null };
  normalize8baseDocumentsCreate(o1, "a");
  expect(o1).toEqual({});

  const o2 = { a: undefined };
  normalize8baseDocumentsCreate(o2, "a");
  expect(o2).toEqual({});

  const o3 = { a: 1 };
  expect(() => normalize8baseDocumentsCreate(o3, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsCreate:currentValues: object is not a List.`
    )
  );

  const o4 = { a: "something" };
  expect(() => normalize8baseDocumentsCreate(o4, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsCreate:currentValues: object is not a List.`
    )
  );

  const o5 = { a: [] };
  normalize8baseDocumentsCreate(o5, "a");
  expect(o5).toEqual({});

  const o6 = { a: [{ id: null }] };
  expect(() => normalize8baseDocumentsCreate(o6, "a")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreate:currentValues: object is not a valid file as it doesn't contain a valid fileId property.`)
  );

  const o7 = { a: { fileId: null } };
  expect(() => normalize8baseDocumentsCreate(o7, "a")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreate:currentValues: object is not a List.`)
  );

  const o8 = { a: [{ fileId: "<ID>" }] };
  normalize8baseDocumentsCreate(o8, "a");
  expect(o8).toEqual({ a: { create: [{ fileId: "<ID>" }] } });

  const o9 = { a: [{ fileId: "<ID1>" }, { fileId: "<ID2>" }] };
  normalize8baseDocumentsCreate(o9, "a");
  expect(o9).toEqual({ a: { create: [{ fileId: "<ID1>" }, { fileId: "<ID2>" }] } });

});


test("normalize8baseDocumentDeleteAndUpdate:", () => {
  expect(() => normalize8baseDocumentDeleteAndUpdate({}, "", {})).toThrowError(
    new ValidationError(`normalize8baseDocumentDeleteAndUpdate:key: value: can't be blank, null or undefined.`)
  );

  const newO0 = { a: { id: "ID", fileId: "fileID" , filename: "filename" } };
  const oldO0 = { a: null };
  normalize8baseDocumentDeleteAndUpdate(newO0, "a", oldO0);
  expect(newO0).toEqual({});

  const newO1 = { a: null };
  const oldO1 = { a: null };
  normalize8baseDocumentDeleteAndUpdate(newO1, "a", oldO1);
  expect(newO1).toEqual({});

  const newO2 = { a: undefined };
  const oldO2 = { a: undefined };
  normalize8baseDocumentDeleteAndUpdate(newO2, "a", oldO2);
  expect(newO2).toEqual({});

  const newO3 = { a: null };
  const oldO3 = { a: 1 };
  expect(() => normalize8baseDocumentDeleteAndUpdate(newO3, "a", oldO3)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  const newO4 = { a: null };
  const oldO4 = { a: "1" };
  expect(() => normalize8baseDocumentDeleteAndUpdate(newO4, "a", oldO4)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  const newO5 = { a: null };
  const oldO5 = { a: {} };
  expect(() => normalize8baseDocumentDeleteAndUpdate(newO5, "a", oldO5)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  const newO6 = { a: null };
  const oldO6 = { a: { id: null } };
  expect(() => normalize8baseDocumentDeleteAndUpdate(newO6, "a", oldO6)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  const newO7 = { a: null };
  const oldO7 = { a: { id: undefined } };
  expect(() => normalize8baseDocumentDeleteAndUpdate(newO7, "a", oldO7)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:oldFile: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  const newO8 = { a: null };
  const oldO8 = { a: { id: "FILE-ID" } };
  normalize8baseDocumentDeleteAndUpdate(newO8, "a", oldO8);
  expect(newO8).toEqual({ a: { disconnect: { id: "FILE-ID" } } });

  const newO9 = { a: {} };
  const oldO9 = { a: { id: "FILE-ID" } };
  expect(() => normalize8baseDocumentDeleteAndUpdate(newO9, "a", oldO9)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:newFile: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const new10 = { a: { fileId: null } };
  const old10 = { a: { id: "FILE-ID" } };
  expect(() => normalize8baseDocumentDeleteAndUpdate(new10, "a", old10)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:newFile: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const new11 = { a: { fileId: undefined } };
  const old11 = {};
  expect(() => normalize8baseDocumentDeleteAndUpdate(new11, "a", old11)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentDeleteAndUpdate:newFile: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );

  const new12 = { a: { fileId: "FILE-ID1" , filename:'filename'} };
  const old12 = {};
  normalize8baseDocumentDeleteAndUpdate(new12, "a", old12);
  expect(new12).toEqual({ a: { create: { fileId: "FILE-ID1" , filename:'filename'} } });

});


test("normalize8BaseDocumentsDeleteAndUpdate:", () => {
  expect(() => normalize8BaseDocumentsDeleteAndUpdate({}, "", {})).toThrowError(
    new ValidationError(`normalize8BaseDocumentsDeleteAndUpdate:key: value: can't be blank, null or undefined.`)
  );


  const newO1 = { a: null };
  const oldO1 = { a: null };
  normalize8BaseDocumentsDeleteAndUpdate(newO1, "a", oldO1);
  expect(newO1).toEqual({});

  const newO2 = { a: undefined };
  const oldO2 = { a: undefined };
  normalize8BaseDocumentsDeleteAndUpdate(newO2, "a", oldO2);
  expect(newO2).toEqual({});

  // Bad old Files
  const newO3 = { a: null };
  const oldO3 = { a: 1 };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(newO3, "a", oldO3)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:oldFiles: object is not a List.`
    )
  );

  const newO4 = { a: null };
  const oldO4 = { a: "1" };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(newO4, "a", oldO4)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:oldFiles: object is not a List.`
    )
  );

  const newO5 = { a: null };
  const oldO5 = { a: {} };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(newO5, "a", oldO5)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:oldFiles: object is not a List.`
    )
  );

  const newO6 = { a: null };
  const oldO6 = { a: [] };
  normalize8BaseDocumentsDeleteAndUpdate(newO6, "a", oldO6);
  expect(newO6).toEqual({});


  const newO7 = { a: null };
  const oldO7 = { a: [{ id: null }] };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(newO7, "a", oldO7)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:oldFiles: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  // Bad new files
  const newO8 = { a: 1 };
  const oldO8 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(newO8, "a", oldO8)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:newFiles: object is not a List.`
    )
  );

  const newO9 = { a: {} };
  const oldO9 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(newO9, "a", oldO9)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:newFiles: object is not a List.`
    )
  );

  const new10 = { a: [{ fileId: null }] };
  const old10 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(new10, "a", old10)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:newFiles: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );
  //
  const new11 = { a: [{ fileId: undefined }] };
  const old11 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8BaseDocumentsDeleteAndUpdate(new11, "a", old11)).toThrowError(
    new ValidationError(
      `normalize8BaseDocumentsDeleteAndUpdate:newFiles: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );
  //
  const new12 = { a: [] };
  const old12 = { a: [] };
  normalize8BaseDocumentsDeleteAndUpdate(new12, "a", old12);
  expect(new12).toEqual({});

  const new13 = { a: null };
  const old13 = { a: [{ id: "ID" }] };
  normalize8BaseDocumentsDeleteAndUpdate(new13, "a", old13);
  expect(new13).toEqual({ a: { disconnect: [{ id: "ID" }] } });

  const new14 = { a: [{ fileId: "FILE-ID1" , filename:'filename' }] };
  const old14 = { a: [{ id: "FILE-ID2" }] };
  normalize8BaseDocumentsDeleteAndUpdate(new14, "a", old14);
  expect(new14).toEqual({ a: { create: [{ fileId: "FILE-ID1" , filename:'filename'}], disconnect: [{ id: "FILE-ID2" }] } });


  const new15 = { a: [{ fileId: "FILE-ID1" , filename:'filename'  }, { id: "ID2", fileId: "FILE-ID2" , filename:'filename' }] };
  const old15 = { a: [{ id: "FILE-ID2" }, { id: "ID2" }] };
  normalize8BaseDocumentsDeleteAndUpdate(new15, "a", old15);
  expect(new15).toEqual({ a: { create: [{ fileId: "FILE-ID1" , filename:'filename'}], disconnect: [{ id: "FILE-ID2" }] } });

});
