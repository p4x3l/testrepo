import {Entity, validatedResource} from 'aurelia-orm';
import {ValidationRules} from 'aurelia-validation';
import * as _ from 'lodash';

@validatedResource('propsentity')
export default class PropsEntity extends Entity {
    prop1: string = null;
    prop2: string = null;
    prop3: string = null;
    prop4: string = null;

    constructor() {
        super();

        ValidationRules
            .ensureObject()
            .satisfies((obj) => _.some(obj, (prop) => prop != null && prop !== ''))
            .on(this);  
    }
}