#query-params-parser
## Installation

`npm i query-params-parser` 

## Documentation

### .js / .ts

```
import parseParams from 'query-params-parser';

class ReferenceClass {
  prop1 = '';
  prop2 = 0;
  prop3 = false;
  prop4 = ['i1', 'i2'];
}

console.log('result by class', parseParams(new ReferenceClass()))

// or the following with object declaration

console.log('result by object', parseParams({prop1: '', prop2: 0}))

```

```
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