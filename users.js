import {HttpClient} from 'aurelia-fetch-client';

export class Users {
  static inject = [HttpClient];
  
  users = [];

  constructor(http) {
    // console.log('users:ctor');
    this.http = http;
    this.baseUrl = `https://randomuser.me/`;
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.baseUrl);
    });
  }

  attached() {
    // console.log('users:activate');
    return this.getUsers().then(data => {
      // console.log('users:activate - data', data);
      this.users = data.results;
    });
  }
  getUsers(numberUsers = 6) {
    let path = `api?nat=us&results=${numberUsers}`;
    return this.http.fetch(path)
      .then(response => response.json());
  }
}

