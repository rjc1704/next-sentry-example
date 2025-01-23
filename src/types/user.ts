// 사용자의 주소 내 위치 정보를 위한 인터페이스
interface Geo {
  lat: string;
  lng: string;
}

// 사용자의 주소 정보를 위한 인터페이스
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// 사용자의 회사 정보를 위한 인터페이스
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// 사용자 정보를 위한 메인 인터페이스
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
