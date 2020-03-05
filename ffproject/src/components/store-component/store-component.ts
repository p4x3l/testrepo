import { autoinject } from 'aurelia-framework';
import { connectTo } from 'aurelia-store';
import { ContactState } from 'store/state';
import { pluck, isEmpty } from 'rxjs/operators';
import { updateContactName, updateContactAddress } from 'store/actions';
import * as _ from 'lodash';
import Address from 'models/Address';
import PropsEntity from 'models/PropsEnitity';
import { ValidationController } from 'aurelia-validation';

@autoinject
@connectTo<ContactState>((store) => store.state.pipe(pluck('contact')))
export class StoreComponent {
  private name: string;
  private address: Address;
  private props: PropsEntity;

  constructor(private validationController: ValidationController) {
    this.props = new PropsEntity();
  }

  private stateChanged(newState: ContactState, oldState: ContactState) {
    if (newState) {
      this.name = newState.name;
      this.address = newState.address;
    }
  }

  private changeName() {
    const name = Math.random()
      .toString(36)
      .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    updateContactName(name);
  }

  private changeAddress() {
    const address = Math.random()
      .toString(36)
      .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    let newAddress: Address;

    if (this.address) {
      newAddress = _.cloneDeep(this.address);
      newAddress.street = address;
    } else {
      newAddress = {
        street: address,
        postalCode: '12345',
        city: 'Norrkoping'
      };
    }

    updateContactAddress(newAddress);
  }

  private reset() {
    this.props.prop1 = null;
    this.props.prop2 = null;
    this.props.prop3 = null;
    this.props.prop4 = null;
  }

  private isValid() {
    if (this.props) {
      this.validationController.validate({ object: this.props})
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log(error))
    }
  }
}
