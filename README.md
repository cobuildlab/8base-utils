# 8base utils

This is a package for functions that are use full in common cases of working with the [8base.com](https://www.8base.com) platform.


## Index

| Function   | Description   | 
| ------ | ------ | 
| [`normalize8BaseReference`](#normalize8BaseReference) | Updates an object to change a property with a 8base `connect` operation. | 


### `normalize8BaseReference(data, key)`

- Updates an object to change a property with a 8base `connect` operation.
- This function mutates the data object to reflect the change.
- This function assumes that all 8base IDs are of type string.

Example:


```javascript

const issue = {name :"Issues Name", project: "<Project ID>"   };

normalize8BaseReference(issue, "project");

console.log(issue);
// {name :"Issues Name", project: {connect:{id: "<Project ID>"}}};

``` 

