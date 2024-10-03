import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      _id?: string;
      username: string;
      email: string;
      isMasterAdmin?: boolean;
    } ;
  }

  interface User {
    name: string;
    _id: string;
    username: string;
    email: string;
    isMasterAdmin: boolean;
   
  }

  interface AdapterUser {
    name: string;
    _id: string;
    username: string;
    email: string;
    isMasterAdmin: boolean;
  }

  interface JWT {
    name: string;
    _id: string;
    username: string;
    email: string;
    isMasterAdmin: boolean;
  }
}