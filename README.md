# 8base utils

This is a package for functions that are use full in common cases of working with the [8base.com](https://www.8base.com) platform.


## Install

`npm i --save @cobuildlab/8base-utils`

## API

| Function   | Description   | 
| ------ | ------ | 
| [`normalize8baseReference`](#normalize8baseReference) | Updates an object to change a property with a 8base `connect` operation. | 
| [`normalize8baseDocumentCreate`](#normalize8baseDocumentCreate) | Updates an object to change a property with a 8base `create` operation for a file object. | 
| [`normalize8baseDocumentsCreate`](#normalize8baseDocumentsCreate) | Updates an object to change a property with a 8base `create` operation for a list of files objects. | 
| [`normalize8baseDocumentDeleteAndUpdate`](#normalize8baseDocumentDeleteAndUpdate) | Updates an object to change a property with a 8base `create` and/or `disconnect` operation for a list of files objects. | 
| [`normalize8baseDocumentsDeleteAndUpdate`](#normalize8baseDocumentsDeleteAndUpdate) | Updates an object to change a property with a 8base `create` and/or `disconnect` operation for a list of files objects. | 


### `normalize8baseReference(data, key)`

- Updates an object to change a property with a 8base `connect` operation.
- If the value of the key is undefined or null, the property gets deleted from the object.
- This function mutates the data object to reflect the change.
- This function assumes that all 8base IDs are of type string.

Example:


```javascript
import {normalize8baseReference} from "@cobuildlab/8base-utils";

const issue = {name :"Issues Name", project: "<Project ID>"   };

normalize8baseReference(issue, "project");

console.log(issue);
// {name :"Issues Name", project: {connect:{id: "<Project ID>"}}};

``` 


### `normalize8baseDocumentCreate(data, key)`

- Updates an object to change a property with a 8base `create` operation.
- If the value of the key is undefined or null, the property gets deleted from the object.
- This function mutates the data object to reflect the change.

Example:


```javascript
import {normalize8baseDocumentCreate} from "@cobuildlab/8base-utils";

const issue = {name :"Issues Name", document: {fileId: "<FILE-ID>", filename:"<FILENAME>"}  };

normalize8baseDocumentCreate(issue, "document");

console.log(issue);
// {name :"Issues Name", document: {create:{fileId: "<FILE-ID>", filename:"<FILENAME>"}}};

``` 



### `normalize8baseDocumentsCreate(data, key)`

- Updates an object to change a property with a 8base `create` operation.
- If the value of the key is undefined, null, or an empty array, the property gets deleted from the object.
- This function mutates the data object to reflect the change.

Example:


```javascript
import {normalize8baseDocumentsCreate} from "@cobuildlab/8base-utils";

const issue = {name :"Issues Name", document: [{fileId: "<FILE-ID1>", filename:"<FILENAME1>"},{fileId: "<FILE-ID2>", filename:"<FILENAME2>"}]  };

normalize8baseDocumentsCreate(issue, "document");

console.log(issue);
// {name :"Issues Name", document: {create:[{fileId: "<FILE-ID1>",, filename:"<FILENAME1>"},{fileId: "<FILE-ID2>",, filename:"<FILENAME2>"}]}};

``` 




### `normalize8baseDocumentDeleteAndUpdate(data, key, oldData)`

- Helper to update or delete one document key from an Object.
- Updates an object to change a property with a 8base `create` and/or `disconnect` operation.
- If the value of the key is undefined, null, or an empty array, the property gets deleted from the object.
- This function mutates the data object to reflect the change.

Example:


```javascript
import {normalize8baseDocumentDeleteAndUpdate} from "@cobuildlab/8base-utils";

const new12 = { a: { fileId: "FILE-ID1", filename:"<FILENAME>" } };
const old12 = {};
normalize8baseDocumentDeleteAndUpdate(new12, "a", old12);
expect(new12).toEqual({ a: { create: { fileId: "FILE-ID1", filename:"<FILENAME>" } } });

``` 




### `normalize8baseDocumentsDeleteAndUpdate(data, key, oldData)`

- Helper to change non null keys to 8base 'delete & create' reference for Documents Lists
- Updates an object to change a property with a 8base `create` and/or `disconnect` operation.
- If the value of the key is undefined, null, or an empty array, the property gets deleted from the object.
- This function mutates the data object to reflect the change.

Example:


```javascript
import {normalize8baseDocumentsDeleteAndUpdate} from "@cobuildlab/8base-utils";

const new15 = { a: [{ fileId: "FILE-ID1", filename:"<FILENAME1>" }, { id: "ID2", fileId: "FILE-ID2", filename:"<FILENAME2>" }] };
const old15 = { a: [{ id: "FILE-ID2" }, { id: "ID2" }] };
normalize8baseDocumentsDeleteAndUpdate(new15, "a", old15);
expect(new15).toEqual({ a: { create: [{ fileId: "FILE-ID1", filename:"<FILENAME1>" }], disconnect: [{ id: "FILE-ID2" }] } });

``` 
