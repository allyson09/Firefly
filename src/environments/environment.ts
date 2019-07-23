// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { Keys } from '../../apiKey';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  selectedUID: string;
  loggedInUID: string;
  testing: {};
  constructor(private keys: Keys) { }

  environment = {
    production: false,
    firebaseConfig : {
      apiKey: this.keys.googleKey,
      authDomain: "firefly-9a9f4.firebaseapp.com",
      databaseURL: "https://firefly-9a9f4.firebaseio.com",
      projectId: "firefly-9a9f4",
      storageBucket: "",
      messagingSenderId: "272265709107"
    }
  }
}
