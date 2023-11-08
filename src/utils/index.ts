// Separate number by comma (thousands)
export function getNumbersWithCommaSeparate(v: number) {
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getNumberFromSeparatedByComma(v: string) {
  return +v.replace(/,/g,'');
}

//function find key by value
export function findKeyByValue<T extends Record<string, any>>(object: T, value: T[keyof T]): keyof T | undefined {
  return Object.keys(object).find((key) => object[key] === value) as keyof T | undefined;
}

//function if weight === 'kg' then carbon else carbon * 2.20462
export function getWeight(weight: string, carbon: number) {
  const resp = weight === 'kg' ? carbon : carbon * 2.20462
  return resp.toFixed(2)
}

// function if length === 'km' then distance else distance * 0.621371

export function getLength(length: string, distance: number) {
  const resp = length === 'km' ? distance : distance * 0.621371
  return resp.toFixed(2)
}

export function getWeightByLength(length: string, distance: number) {
  const resp = length === 'km' ? distance : distance / 0.621371
  return resp.toFixed(2)
}