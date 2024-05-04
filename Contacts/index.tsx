export type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  phone2?: string;
  address?: string;
};

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'John',
    email: 'test@gmail.com',
    phone: '123-45-6789',
    phone2: '123-11-2134',
  },
  {
    id: 'test',
    name: 'Jane',
    email: 'test2@hotmail.com',
    phone: '343-45-2233',
    phone2: '123-11-2134',
  },
  {
    id: '3',
    name: 'Joe',
    email: 'test2@gmail.com',
    phone: '212-45-6789',
    phone2: '123-11-2134',
  },
  {
    id: '4',
    name: 'Brad',
    email: 'test4@yahoo.com',
    phone: '123-45-6789',
    phone2: '123-11-2134',
  },
  {
    id: '5',
    name: 'Gina',
    email: '124td@test.com',
    phone: '123-45-6789',
    phone2: '123-11-2134',
  },
  {
    id: '6',
    name: 'Steve',
    email: 'test#hotmail.com',
    phone: '123-45-6789',
  },
  {
    id: '7',
    name: 'Brian',
    email: '',
    phone: '123-45-6789',
  },
  {
    id: '8',
    name: 'Abe',
    email: '',
    phone: '123-45-6789',
  },
  {
    id: '9',
    name: 'Mike',
    email: '',
    phone: '123-45-6789',
  },
  {
    id: '10',
    name: 'Drew',
    email: '',
    phone: '123-45-6789',
  },
];

// #3 filter - above, filter by dup names, filter by dup phone, filter by contacts that need attention.

// #4 reduce - I want to reduce the array into a single value.

// I want a string of selected contacts.

export const selectedContactNames = (contacts: Contact[]) => {
  return contacts.reduce((acc, contact) => {
    return acc + contact.name + ', ';
  }, '');
};

// #5 find - find index - I want to find an element in the array.

// search by name, find all etc.

// bonus = array some, array every.

// ex - I want to check if all contacts have email, I want to check if any contact has email.

// finally: for loop main reason - when you want to break out of the loop or continue.

// flexible, can do same as some, find, can also await. (not possible with map, filter, reduce, etc)

// while loop: mostly when the condition is not directly related to the array elements.

// ex - I want to keep fetching until I get 10 contacts.

// last resort - for loop.
// Lodash - a library that has a lot of utility functions for arrays and objects.
