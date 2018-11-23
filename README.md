# Backend
The backend for the CeeSpot webapp

# Getting Started

### Prerequisites

- NodeJS
- npm
- MySQL server

### Installing

Pull the repository into a folder of your liking
```
git clone https://github.com/CeeSpot/Backend.git
```

Install the node modules
```
npm install
```

You can change the SQL-database settings in `/api/config.js`. You will find the following code there :
```
con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "the_cee_database"
});
```
You can edit the settings to match your SQL-server.

To start the server run
```
npm start
```

## Running the tests

Coming soon

### Break down into end to end tests

We use Jest to run our tests

```
Not available
```

## Deployment

Not available

## Built With

* [NodeJS](https://nodejs.org/) - Javascript framework
* [Express](https://expressjs.com/) - Minimalist web framework for NodeJS
* [mysqljs/mysql](https://github.com/mysqljs/mysql) - MySQL driver for NodeJS
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT for authentication in NodeJS

## Contributing

Coming soon

## Versioning

We use [Github](http://github.com/) for versioning.

## Authors

* **Kylian leemkuil** - *Team lead* - [Kylian](https://github.com/kylianleemkuil)
* **Stijn Klarenbeek** - *Project core* - [Stijn](https://github.com/Waro1234)
* **Michael Brown** - *Front end* - [Michael](https://github.com/michaelbrownie)
* **Frank Grevelink** - *Front end* - [Frank](https://github.com/fgrevelink)

See also the list of [contributors](https://github.com/orgs/CeeSpot/people) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/CeeSpot/Backend/blob/master/LICENSE) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
