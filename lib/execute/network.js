'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeCompositeMutation = exports.executeCompositeRequests = undefined;

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _merge = require('lodash/object/merge');

var _merge2 = _interopRequireDefault(_merge);

var _RelayQuery = require('react-relay/lib/RelayQuery');

var _RelayQuery2 = _interopRequireDefault(_RelayQuery);

var _RelayQueryRequest = require('react-relay/lib/RelayQueryRequest');

var _RelayQueryRequest2 = _interopRequireDefault(_RelayQueryRequest);

var _RelayMutationRequest = require('react-relay/lib/RelayMutationRequest');

var _RelayMutationRequest2 = _interopRequireDefault(_RelayMutationRequest);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var executeCompositeRequests = exports.executeCompositeRequests = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(compositeRequests, context) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            compositeRequests.forEach(function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(compositeRequest) {
                var responses;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return Promise.all(compositeRequest.queries.map(function (query) {
                          return executeQuery(query, context);
                        }));

                      case 3:
                        responses = _context.sent;


                        compositeRequest.request.resolve(_merge2.default.apply(undefined, [{}].concat(_toConsumableArray(responses))));
                        _context.next = 10;
                        break;

                      case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        compositeRequest.request.reject(_context.t0);

                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined, [[0, 7]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function executeCompositeRequests(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var executeCompositeMutation = exports.executeCompositeMutation = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref4, context) {
    var mutation = _ref4.mutation,
        request = _ref4.request;
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return executeMutation(mutation, context);

          case 3:
            response = _context3.sent;

            request.resolve(response);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            request.reject(_context3.t0);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function executeCompositeMutation(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var executeQuery = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(query, context) {
    var request, networkLayer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            request = new _RelayQueryRequest2.default(query.query);
            networkLayer = context.layers[query.schema];


            networkLayer.sendQueries([request]);

            return _context4.abrupt('return', request.then(function (data) {
              return executeDependents(query, data, context);
            }));

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function executeQuery(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var executeMutation = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(mutation, context) {
    var request, networkLayer;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            request = new _RelayMutationRequest2.default(mutation.mutation);
            networkLayer = context.layers[mutation.schema];


            networkLayer.sendMutation(request);

            return _context5.abrupt('return', request.then(function (data) {
              return executeDependents(mutation, data, context);
            }));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function executeMutation(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var executeDependents = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(query, data, context) {
    var datasWithPath;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return Promise.all(query.dependents.map(function () {
              var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(_ref9) {
                var path = _ref9.path,
                    fragment = _ref9.fragment;
                var pathIds;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        pathIds = getIdsWithPath(data.response, path);
                        return _context7.abrupt('return', Promise.all(pathIds.map(function () {
                          var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(_ref11) {
                            var id = _ref11.id,
                                path = _ref11.path;
                            var query, data;
                            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:
                                    query = createCompositeQuery(fragment, id);
                                    _context6.next = 3;
                                    return executeQuery(query, context);

                                  case 3:
                                    data = _context6.sent;
                                    return _context6.abrupt('return', { data: data, path: path });

                                  case 5:
                                  case 'end':
                                    return _context6.stop();
                                }
                              }
                            }, _callee6, undefined);
                          }));

                          return function (_x14) {
                            return _ref10.apply(this, arguments);
                          };
                        }())));

                      case 2:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x13) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 2:
            datasWithPath = _context8.sent;
            return _context8.abrupt('return', (0, _utils.flatten)(datasWithPath).reduce(function (data, _ref12) {
              var path = _ref12.path,
                  depData = _ref12.data;

              return (0, _utils.updateIn)(data, ['response'].concat(_toConsumableArray(path)), function (node) {
                return (0, _merge2.default)({}, node, depData.response.node);
              });
            }, data));

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function executeDependents(_x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

var createCompositeQuery = function createCompositeQuery(_ref13, id) {
  var children = _ref13.children,
      schema = _ref13.schema,
      type = _ref13.type,
      dependents = _ref13.dependents;

  var query = _reactRelay2.default.createQuery({
    calls: [{
      kind: 'Call',
      metadata: {},
      name: 'id',
      value: {
        kind: 'CallVariable',
        callVariableName: 'id'
      }
    }],
    fieldName: 'node',
    kind: 'Query',
    metadata: {
      isAbstract: true,
      identifyingArgName: 'id'
    },
    name: 'App',
    type: 'Node',
    children: [{
      fieldName: 'id',
      kind: 'Field',
      metadata: {
        isGenerated: true,
        isRequisite: true
      },
      type: 'ID'
    }, {
      fieldName: '__typename',
      kind: 'Field',
      metadata: {
        isGenerated: true,
        isRequisite: true
      },
      type: 'String'
    }, {
      kind: 'Fragment',
      metadata: {},
      name: type,
      type: type,
      children: []
    }]
  }, { id: id });

  return {
    query: query.clone(query.getChildren().map(function (child) {
      if (child instanceof _RelayQuery2.default.Fragment) {
        return child.clone(children);
      } else {
        return child;
      }
    })),
    schema: schema,
    dependents: dependents
  };
};

var getIdsWithPath = function getIdsWithPath(data, path) {
  var backwardPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (path.length === 0) {
    var id = data.id;
    return id ? [{ id: id, path: backwardPath }] : [];
  } else {
    var segment = path[0];
    var sub = data[path[0]];
    var remaining = path.slice(1);
    if (sub) {
      if (Array.isArray(sub)) {
        return sub.reduce(function (ids, item, index) {
          return ids.concat(getIdsWithPath(item, remaining, backwardPath.concat([segment, index])));
        }, []);
      } else {
        return getIdsWithPath(sub, remaining, backwardPath.concat(segment));
      }
    } else {
      return [];
    }
  }
};