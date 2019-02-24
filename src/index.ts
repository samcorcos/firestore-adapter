import Adapter from './adapter';
import { data } from './resource';

const adapter = new Adapter(data);
console.log(JSON.stringify(adapter.convert()));