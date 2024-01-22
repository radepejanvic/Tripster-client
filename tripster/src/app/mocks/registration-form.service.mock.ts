import {
  PersonCRUD,
  UserStatus,
  UserType,
} from '../feature-modules/user-registration/model/user.model';

const person: PersonCRUD = {
  email: 'test@gmail.com',
  password: '11111',
  userType: UserType.GUEST,
  status: UserStatus.NEW,

  name: 'test',
  surname: 'test',
  phone: '0611111111',

  country: 'Serbia',
  city: 'Novi Sad',
  zipCode: '21000',
  street: 'Pavla Papa',
  number: '13',
};

export { person };
