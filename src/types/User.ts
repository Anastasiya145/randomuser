type DetailedInfo = {
  seed: string,
  results: number,
  page: 1,
  version: string,
}

type UserName = {
  title: string,
  first: string,
  last: string,
}

type Location = {
  street: {
    number: number,
    name: string,
  },
  city: string,
  state: string,
  country: string,
  postcode: string,
  coordinates: Cordinates,
  timezone: Timezone,
}

type Cordinates = {
  latitude: string,
  longitude: string,
}

type Timezone = {
  offset: string,
  description: string,
}

type Login = {
  uuid: string,
  username: string,
  password: string,
  salt: string,
  md5: string,
  sha1: string,
  sha256: string,
}

type PersonalData = {
  data: string,
  age: string,
}

type Picture = {
  large: string,
  medium: string,
  thumbnail: string,
}

export type User = {
  results: DetailedUser[],
  info: DetailedInfo,
};

export type UserNormalized = DetailedUser & DetailedInfo & {
  fullName: string,
};

type DetailedUser = {
  cell: string,
  dob: PersonalData,
  email: string,
  gender: string,
  id: {
    name: string,
    value: string,
  },
  location: Location,
  name: UserName,
  nat: string,
  login: Login,
  phone: string,
  picture: Picture,
  registered: PersonalData,
};
