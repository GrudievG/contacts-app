export class Contact {
  id?: number;
  name: Name;
  phone: string[];
}

interface Name {
  first: string;
  last: string;
}
