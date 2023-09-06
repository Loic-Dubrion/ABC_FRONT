export interface DecodedToken {
  data: Data;
  iat: number;
  exp: number;
}

export interface Data {
  ip: string;
  id: number;
  username: string;
  roles: string[];
  permissions: string[];
}
