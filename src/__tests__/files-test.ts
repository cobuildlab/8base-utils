import {
  normalize8baseDocumentCreate,
  normalize8baseDocumentsCreateItems,
  normalize8baseDocumentDeleteAndUpdate,
  normalize8baseDocumentsCreate, normalize8baseDocumentsDeleteAndUpdate
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
      `normalize8baseDocumentCreate:currentValue: file is not a valid object.`
    )
  );

  const o4 = { a: "something" };
  expect(() => normalize8baseDocumentCreate(o4, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentCreate:currentValue: file is not a valid object.`
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
  expect(() => normalize8baseDocumentCreate(o7, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentCreate:currentValue: object is not a valid file as it doesn't contain a valid filename property.`
    )
  );

  const o8 = { a: { fileId: "<ID>", filename: "<FILENAME>" } };
  normalize8baseDocumentCreate(o8, "a");
  expect(o8).toEqual({ a: { create: { fileId: "<ID>", filename: "<FILENAME>" } } });

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

  const o8 = { a: [{ fileId: "<ID>", filename: "<FILENAME>" }] };
  normalize8baseDocumentsCreate(o8, "a");
  expect(o8).toEqual({ a: { create: [{ fileId: "<ID>", filename: "<FILENAME>" }] } });

  const o9 = { a: [{ fileId: "<ID1>", filename: "<FILENAME1>" }, { fileId: "<ID2>", filename: "<FILENAME2>" }] };
  normalize8baseDocumentsCreate(o9, "a");
  expect(o9).toEqual({
    a: {
      create: [{ fileId: "<ID1>", filename: "<FILENAME1>" }, {
        fileId: "<ID2>",
        filename: "<FILENAME2>"
      }]
    }
  });

  const o10 = { a: [{ fileId: "<ID>" }] };
  expect(() => normalize8baseDocumentsCreate(o10, "a")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreate:currentValues: object is not a valid file as it doesn't contain a valid filename property.`)
  );

});

test("normalize8baseDocumentsCreateItems:", () => {
  expect(() => normalize8baseDocumentsCreateItems({}, "")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreateItems:key: value: can't be blank, null or undefined.`)
  );

  const o0 = { a: null };
  normalize8baseDocumentsCreateItems(o0, "a");
  expect(o0).toEqual({});

  const o1 = { a: { items: null } };
  normalize8baseDocumentsCreateItems(o1, "a");
  expect(o1).toEqual({});

  const o2 = { a: { items: undefined } };
  normalize8baseDocumentsCreateItems(o2, "a");
  expect(o2).toEqual({});

  const o3 = { a: { items: 0 }};
  expect(() => normalize8baseDocumentsCreateItems(o3, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsCreateItems:currentValues: object is not a List.`
    )
  );

  const o4 = { a: { items: "something" } };
  expect(() => normalize8baseDocumentsCreateItems(o4, "a")).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsCreateItems:currentValues: object is not a List.`
    )
  );

  const o5 = { a: { items: [] } };
  normalize8baseDocumentsCreateItems(o5, "a");
  expect(o5).toEqual({});

  const o6 = { a: {items: [{ id: null }]} };
  expect(() => normalize8baseDocumentsCreateItems(o6, "a")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreateItems:currentValues: object is not a valid file as it doesn't contain a valid fileId property.`)
  );

  const o7 = { a: {items: { fileId: null }} };
  expect(() => normalize8baseDocumentsCreateItems(o7, "a")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreateItems:currentValues: object is not a List.`)
  );

  const o8 = { a: {items: [{ fileId: "<ID>", filename: "<FILENAME>" }]} };
  normalize8baseDocumentsCreateItems(o8, "a");
  expect(o8).toEqual({ a: { create: [{ fileId: "<ID>", filename: "<FILENAME>" }] } });

  const o9 = { a: {items: [{ fileId: "<ID1>", filename: "<FILENAME1>" }, { fileId: "<ID2>", filename: "<FILENAME2>" }]} };
  normalize8baseDocumentsCreateItems(o9, "a");
  expect(o9).toEqual({
    a: {
      create: [{ fileId: "<ID1>", filename: "<FILENAME1>" }, {
        fileId: "<ID2>",
        filename: "<FILENAME2>"
      }]
    }
  });

  const o10 = { a: {items: [{ fileId: "<ID>" }]} };
  expect(() => normalize8baseDocumentsCreateItems(o10, "a")).toThrowError(
    new ValidationError(`normalize8baseDocumentsCreateItems:currentValues: object is not a valid file as it doesn't contain a valid filename property.`)
  );

});

test("normalize8baseDocumentDeleteAndUpdate:", () => {
  expect(() => normalize8baseDocumentDeleteAndUpdate({}, "", {})).toThrowError(
    new ValidationError(`normalize8baseDocumentDeleteAndUpdate:key: value: can't be blank, null or undefined.`)
  );

  const newO0 = { a: { id: "ID", fileId: "fileID", filename: "<FILENAME>" } };
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

  const new12 = { a: { fileId: "FILE-ID1", filename: "<FILENAME>" } };
  const old12 = {};
  normalize8baseDocumentDeleteAndUpdate(new12, "a", old12);
  expect(new12).toEqual({ a: { create: { fileId: "FILE-ID1", filename: "<FILENAME>" } } });

  const new13 = { a: { fileId: "FILE-ID1" } };
  const old13 = {};
  expect(() => normalize8baseDocumentDeleteAndUpdate(new13, "a", old13)).toThrowError(
    new ValidationError(`normalize8baseDocumentDeleteAndUpdate:newFile: object is not a valid file as it doesn't contain a valid filename property.`)
  );

});


test("normalize8baseDocumentsDeleteAndUpdate:", () => {
  expect(() => normalize8baseDocumentsDeleteAndUpdate({}, "", {})).toThrowError(
    new ValidationError(`normalize8baseDocumentsDeleteAndUpdate:key: value: can't be blank, null or undefined.`)
  );


  const newO1 = { a: null };
  const oldO1 = { a: null };
  normalize8baseDocumentsDeleteAndUpdate(newO1, "a", oldO1);
  expect(newO1).toEqual({});

  const newO2 = { a: undefined };
  const oldO2 = { a: undefined };
  normalize8baseDocumentsDeleteAndUpdate(newO2, "a", oldO2);
  expect(newO2).toEqual({});

  // Bad old Files
  const newO3 = { a: null };
  const oldO3 = { a: 1 };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(newO3, "a", oldO3)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:oldFiles: object is not a List.`
    )
  );

  const newO4 = { a: null };
  const oldO4 = { a: "1" };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(newO4, "a", oldO4)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:oldFiles: object is not a List.`
    )
  );

  const newO5 = { a: null };
  const oldO5 = { a: {} };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(newO5, "a", oldO5)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:oldFiles: object is not a List.`
    )
  );

  const newO6 = { a: null };
  const oldO6 = { a: [] };
  normalize8baseDocumentsDeleteAndUpdate(newO6, "a", oldO6);
  expect(newO6).toEqual({});


  const newO7 = { a: null };
  const oldO7 = { a: [{ id: null }] };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(newO7, "a", oldO7)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:oldFiles: object is not a valid reference as it doesn't contain a valid id property.`
    )
  );

  // Bad new files
  const newO8 = { a: 1 };
  const oldO8 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(newO8, "a", oldO8)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:newFiles: object is not a List.`
    )
  );

  const newO9 = { a: {} };
  const oldO9 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(newO9, "a", oldO9)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:newFiles: object is not a List.`
    )
  );

  const new10 = { a: [{ fileId: null }] };
  const old10 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(new10, "a", old10)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:newFiles: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );
  //
  const new11 = { a: [{ fileId: undefined }] };
  const old11 = { a: [{ id: "FILE-ID" }] };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(new11, "a", old11)).toThrowError(
    new ValidationError(
      `normalize8baseDocumentsDeleteAndUpdate:newFiles: object is not a valid file as it doesn't contain a valid fileId property.`
    )
  );
  //
  const new12 = { a: [] };
  const old12 = { a: [] };
  normalize8baseDocumentsDeleteAndUpdate(new12, "a", old12);
  expect(new12).toEqual({});

  const new13 = { a: null };
  const old13 = { a: [{ id: "ID" }] };
  normalize8baseDocumentsDeleteAndUpdate(new13, "a", old13);
  expect(new13).toEqual({ a: { disconnect: [{ id: "ID" }] } });

  const new14 = { a: [{ fileId: "FILE-ID1", filename: "<FILENAME>" }] };
  const old14 = { a: [{ id: "FILE-ID2" }] };
  normalize8baseDocumentsDeleteAndUpdate(new14, "a", old14);
  expect(new14).toEqual({
    a: {
      create: [{ fileId: "FILE-ID1", filename: "<FILENAME>" }],
      disconnect: [{ id: "FILE-ID2" }]
    }
  });

  const new15 = {
    a: [{ fileId: "FILE-ID1", filename: "<FILENAME1>" }, {
      id: "ID2",
      fileId: "FILE-ID2",
      filename: "<FILENAME2>"
    }]
  };
  const old15 = { a: [{ id: "FILE-ID2" }, { id: "ID2" }] };
  normalize8baseDocumentsDeleteAndUpdate(new15, "a", old15);
  expect(new15).toEqual({
    a: {
      create: [{ fileId: "FILE-ID1", filename: "<FILENAME1>" }],
      disconnect: [{ id: "FILE-ID2" }]
    }
  });

  const new16 = { a: [{ fileId: "FILE-ID1" }, { id: "ID2", fileId: "FILE-ID2", filename: "<FILENAME2>" }] };
  const old16 = { a: [{ id: "FILE-ID2" }, { id: "ID2" }] };
  expect(() => normalize8baseDocumentsDeleteAndUpdate(new16, "a", old16)).toThrowError(
    new ValidationError(`normalize8baseDocumentsDeleteAndUpdate:newFiles: object is not a valid file as it doesn't contain a valid filename property.`)
  );

});
