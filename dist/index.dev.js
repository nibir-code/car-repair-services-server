"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ServerApiVersion = _require.ServerApiVersion;

require('dotenv').config();

var ObjectId = require('mongodb').ObjectId;

var port = process.env.PORT || 5000; //MIDDLEWARE

app.use(cors());
app.use(express.json());
var uri = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASS, "@cluster0.nt4kotb.mongodb.net/?retryWrites=true&w=majority");
var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

function run() {
  var database, serviceCollection;
  return regeneratorRuntime.async(function run$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          try {
            database = client.db("carMechanic");
            serviceCollection = database.collection("services"); //GET API

            app.get('/services', function _callee(req, res) {
              var cursor, services;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      cursor = serviceCollection.find({});
                      _context.next = 3;
                      return regeneratorRuntime.awrap(cursor.toArray());

                    case 3:
                      services = _context.sent;
                      res.send(services);

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }); //GET SINGLE SERVICE

            app.get('/services/:id', function _callee2(req, res) {
              var id, query, service;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      id = req.params.id;
                      query = {
                        _id: ObjectId(id)
                      };
                      _context2.next = 4;
                      return regeneratorRuntime.awrap(serviceCollection.findOne(query));

                    case 4:
                      service = _context2.sent;
                      res.json(service);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }); // POST API

            app.post('/services', function _callee3(req, res) {
              var service, result;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      service = req.body;
                      console.log('hit', service);
                      _context3.next = 4;
                      return regeneratorRuntime.awrap(serviceCollection.insertOne(service));

                    case 4:
                      result = _context3.sent;
                      console.log("A document was inserted with the _id: ".concat(result.insertedId));
                      res.json(result);

                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            }); //DELETE API

            app["delete"]('/services', function _callee4(req, res) {
              var id, query, result;
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      id = req.params.id;
                      query = {
                        _id: ObjectId(id)
                      };
                      _context4.next = 4;
                      return regeneratorRuntime.awrap(serviceCollection.deleteOne(query));

                    case 4:
                      result = _context4.sent;
                      res.json(result);

                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });
          } finally {//await client.close();
          }

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

run()["catch"](console.dir);
app.get('/', function (req, res) {
  res.send('running');
});
app.listen(port, function () {
  console.log('running on port', port);
});