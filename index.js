export function parseParams(baseObject, params = new URLSearchParams(window.location.search), arrSeparator = ',') {
  errorsCheck(baseObject, params, arrSeparator);

  const obj = {};

  for(const key in baseObject) {    
    const param = params.get(key);

    if(param !== null)  
      obj[key] = parseByType(param, baseObject[key], arrSeparator);
    else 
      obj[key] = null;
  }

  return obj;
}

export function setParams(baseObject, params = new URLSearchParams(window.location.search), arrSeparator = ',') {
  errorsCheck(baseObject, params, arrSeparator);

  for(const [key, value] of Object.entries(baseObject)) {
    if(!value) continue;

    if(params.has(key)) {
      params.set(key, value)
      continue;
    }

    params.append(key, value)
  }

  updateUrl(params);
}

export function parseByType(variable, property, arrSeparator) {
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


export function stringToBoolean (stringValue) {
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

function updateUrl(queryParams) {
  const hasQueryParams = queryParams.toString() !== '';

  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState({}, '', hasQueryParams ? newUrl : window.location.pathname);
}

function errorsCheck(baseObject, params, arrSeparator) {
  if(!baseObject || typeof(baseObject) !== 'object') throw new Error('baseObject property must be declared and a object');
  if(!params?.get) throw new Error('search params must be initialized like "new URLSearchParams(query)"');
  if(!arrSeparator) throw new Error('arr separator must not be empty');
}