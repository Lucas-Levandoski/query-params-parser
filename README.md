#query-params-parser
## In a Nutshell
This library is supposed to fix the problem of always returning strings from the query parameters, to prevent problems or bad conversions like pageNumber to be a string, or "readOnly" to carry the "true" instead of the boolean value true.

It is only focused on fixing the query/search params, the one you get from window.location.search or with the pattern `?param1=value1&param2=100`


## Installation

`npm i query-params-parser` 

## Documentation

### .js / .ts

```jsx
import parseParams from 'query-params-parser';

class ReferenceClass {
  prop1 = '';
  prop2 = 0;
  prop3 = false;
  prop4 = [];
}

/* 
This class will work for the following uri:
home/page?prop1=value%20as%20string&prop2=100&prop3=no&prop4=item1,item2,item3

and will return the following object:
{
    "prop1": "value as string",
    "prop2": 100,
    "prop3": false,
    "prop4": [
        "item1",
        "item2",
        "item3"
    ]
}
*/

console.log('result by class', parseParams(new ReferenceClass()))

// or the following with object declaration

console.log('result by object', parseParams({prop1: '', prop2: 0}))

```

```jsx
import { stringToBoolean, parseByType} from 'query-params-parser';

const byType = parseByType('item1, item2', [], ', '); 
// byType will be ['item1', 'item2'];


const fromString = stringToBoolean('yes');
// fromString will be a boolean true;

```

As javascript is a weak typed language, we cannot use the type definition to parse properties, so it is expecting a initialized object like a class with values defined to have typescript checking for its types.


### parseParams (default export) parameters
| Property Name | Description                                                                                  | Required / Default                               |
|---------------|----------------------------------------------------------------------------------------------|--------------------------------------------------|
| baseObject    | object with initialized values, like { prop1: "test", prop2: 100 }                               | yes / none                                       |
| params        | initialized class URLSearchParams                                                            | no / new URLSearchParams(window.location.search) |
| arrSeparator  | when spliting the array from the search param it expects a split string .split(arrSeparator) | no / ','                                         |


### parseByType parameters
| Property Name | Description                                                                                  | Required / Default |
|---------------|----------------------------------------------------------------------------------------------|--------------------|
| variable      | variable carrying the not parsed value typed as a string                                     | yes / none         |
| property      | expects a primitive value like 'this', 10, false or ['t', 'e']                               | yes / none         |
| arrSeparator  | when spliting the array from the search param it expects a split string .split(arrSeparator) | yes / none         |

### stringToBoolean parameters
| Property Name | Description                        | Required / Default |
|---------------|------------------------------------|--------------------|
| stringValue   | string with the value to be parsed | yes / none         |

examples of string values, they are not case sensitive

| section          | examples                                     |
|------------------|----------------------------------------------|
| values for true  | "true", "yes" and "1"                        |
| values for false | "false", "no", "0", null, undefined, default |