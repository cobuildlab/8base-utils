# 8base utils

This is a package for functions that are use full in common cases of working with the [8base.com](https://www.8base.com) platform.


## Index

| Function   | Description   | 
| ------ | ------ | 
| [`normalize8BaseReference`](#normalize8BaseReference) | Updates an object to change a property with a 8base `connect` operation. | 
| [`normalize8baseDocumentCreate`](#normalize8baseDocumentCreate) | Updates an object to change a property with a 8base `create` operation for a file object. | 
| [`normalize8baseDocumentsCreate`](#normalize8baseDocumentsCreate) | Updates an object to change a property with a 8base `create` operation for a list of files objects. | 


### `normalize8BaseReference(data, key)`

- Updates an object to change a property with a 8base `connect` operation.
- If the value of the key is undefined or null, the property gets deleted from the object.
- This function mutates the data object to reflect the change.
- This function assumes that all 8base IDs are of type string.

Example:


```javascript

const issue = {name :"Issues Name", project: "<Project ID>"   };

normalize8BaseReference(issue, "project");

console.log(issue);
// {name :"Issues Name", project: {connect:{id: "<Project ID>"}}};

``` 


### `normalize8baseDocumentCreate(data, key)`

- Updates an object to change a property with a 8base `create` operation.
- If the value of the key is undefined or null, the property gets deleted from the object.
- This function mutates the data object to reflect the change.

Example:


```javascript

const issue = {name :"Issues Name", document: {fileId: "<FILE-ID>"}  };

normalize8baseDocumentCreate(issue, "document");

console.log(issue);
// {name :"Issues Name", document: {create:{fileId: "<FILE-ID>"}}};

``` 



### `normalize8baseDocumentsCreate(data, key)`

- Updates an object to change a property with a 8base `create` operation.
- If the value of the key is undefined, null, or an empty array, the property gets deleted from the object.
- This function mutates the data object to reflect the change.

Example:


```javascript

const issue = {name :"Issues Name", document: [{fileId: "<FILE-ID1>"},{fileId: "<FILE-ID2>"}]  };

normalize8BaseReference(issue, "document");

console.log(issue);
// {name :"Issues Name", document: {create:[{fileId: "<FILE-ID1>"},{fileId: "<FILE-ID2>"}]}};

``` 
