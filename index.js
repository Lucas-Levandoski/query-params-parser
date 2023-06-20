export function readParams(baseClass, params = new URLSearchParams(window.location.search), arrSeparator = ',') {
  if(!params?.get) throw new Error('search params must be initialized like "new URLSearchParams(query)"');
  if(!arrSeparator) throw new Error('arr separator must not be empty');
  if(!baseClass || typeof(baseClass) !== 'object') throw new Error('baseClass property must be declared and a object');

  const obj = {};

  for(const key in baseClass) {    
    const param = params.get(key);

    if(param !== null)  
      obj[key] = parseByType(param, baseClass[key], arrSeparator);
    else 
      obj[key] = null;
  }

  return obj;
}

function parseByType (variable, property, arrSeparator) {
  if (typeof(variable) !== 'string') throw new Error('variable and type must be strings');

  let result;

  switch(typeof(property)){
    case 'string':
      result = variable;
      break;
    case 'number':
      result = +variable;
      break;
    case 'object':
      if(Array.isArray(property))
        result = variable.split(arrSeparator);
      break;
    case 'boolean':
      result = stringToBoolean(variable);
      break;
    default:
      console.log(`type ${typeof(property)} not mapped`)
  }

  return result;
}


function stringToBoolean (stringValue) {
  switch(stringValue?.toLowerCase()?.trim()){
      case "true": 
      case "yes": 
      case "1": 
        return true;

      case "false": 
      case "no": 
      case "0": 
      case null: 
      case undefined:
        return false;

      default: 
        return false;
  }
}