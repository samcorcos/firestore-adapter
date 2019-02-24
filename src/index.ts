import { convert } from './adapter';
import { data } from './resource';

const output = convert(data);
console.log(JSON.stringify(output));