import assert from 'node:assert';
import parseParams , { parseByType, stringToBoolean } from './index.js';


{
  // testing the parse Params
  {
    assert.throws(() => {
      parseParams('not an object', new URLSearchParams(''));
    },
    {
      message: 'baseObject property must be declared and a object'
    })
  }

  {
    assert.throws(() => {
      parseParams({ item1: 0}, null, null);
    }, 
    {
      message:  'search params must be initialized like "new URLSearchParams(query)"'
    });
  }


  { 
    assert.throws(() => {
      parseParams({ item1: 0}, new URLSearchParams(''), null);
    }, 
    {
      message: 'arr separator must not be empty'
    });
  }
}

{ 
  // testing parseByType
  {
    assert.throws(() => {
      parseByType(true, 'name', ',');
    },
    {
      message: 'variable and type must be strings'
    })
  }

  {
    const toBeParsed = [
      {
        value: 'toString',
        type: 'string',
        expected: 'toString'
      },
      {
        value: 'yEs',
        type: false,
        expected: true,
      },
      {
        value: '100',
        type: 0,
        expected: 100
      },
      {
        value: 'var1,var2',
        type: [],
        expected: [ 'var1', 'var2' ]
      },
    ]

    for(const toParse of toBeParsed) {
      assert.deepEqual(
        parseByType(toParse.value, toParse.type, ','), 
        toParse.expected, 
        `type (${typeof(toParse.type)}) is failing`
      );
    }
  }
}


{
  // testing stringToBoolean
  {
    const trueStrings = ['yes', 'YeS', '1', 'true', 'TrUe'];

    for(const string of trueStrings) {
      assert.strictEqual(stringToBoolean(string), true);
    }
  }

  {
    const trueStrings = ['no', 'nO', '0', undefined, null];

    for(const string of trueStrings) {
      assert.strictEqual(stringToBoolean(string), false);
    }
  } 
}




