"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rxdb = exports.prototypes = exports["default"] = exports.RxGraphQLReplicationState = void 0;
exports.syncGraphQL = syncGraphQL;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _graphqlClient = _interopRequireDefault(require("graphql-client"));

var _util = require("../../util");

var _core = _interopRequireDefault(require("../../core"));

var _helper = require("./helper");

var _crawlingCheckpoint = require("./crawling-checkpoint");

var _watchForChanges = _interopRequireDefault(require("../watch-for-changes"));

var _leaderElection = _interopRequireDefault(require("../leader-election"));

var _rxChangeEvent = require("../../rx-change-event");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

_core["default"].plugin(_leaderElection["default"]);
/**
 * add the watch-for-changes-plugin
 * so pouchdb will emit events when something gets written to it
 */


_core["default"].plugin(_watchForChanges["default"]);

var RxGraphQLReplicationState = /*#__PURE__*/function () {
  function RxGraphQLReplicationState(collection, url, headers, pull, push, deletedFlag, live, liveInterval, retryTime) {
    this._subjects = {
      recieved: new _rxjs.Subject(),
      // all documents that are recieved from the endpoint
      send: new _rxjs.Subject(),
      // all documents that are send to the endpoint
      error: new _rxjs.Subject(),
      // all errors that are revieced from the endpoint, emits new Error() objects
      canceled: new _rxjs.BehaviorSubject(false),
      // true when the replication was canceled
      active: new _rxjs.BehaviorSubject(false),
      // true when something is running, false when not
      initialReplicationComplete: new _rxjs.BehaviorSubject(false) // true the initial replication-cycle is over

    };
    this._runningPromise = Promise.resolve();
    this._subs = [];
    this._runQueueCount = 0;
    this.initialReplicationComplete$ = undefined;
    this.recieved$ = undefined;
    this.send$ = undefined;
    this.error$ = undefined;
    this.canceled$ = undefined;
    this.active$ = undefined;
    this.collection = collection;
    this.pull = pull;
    this.push = push;
    this.deletedFlag = deletedFlag;
    this.live = live;
    this.liveInterval = liveInterval;
    this.retryTime = retryTime;
    this.client = (0, _graphqlClient["default"])({
      url: url,
      headers: headers
    });
    this.endpointHash = (0, _util.hash)(url);

    this._prepare();
  }

  var _proto = RxGraphQLReplicationState.prototype;

  /**
   * things that are more complex to not belong into the constructor
   */
  _proto._prepare = function _prepare() {
    var _this = this;

    // stop sync when collection gets destroyed
    this.collection.onDestroy.then(function () {
      _this.cancel();
    }); // create getters for the observables

    Object.keys(this._subjects).forEach(function (key) {
      Object.defineProperty(_this, key + '$', {
        get: function get() {
          return this._subjects[key].asObservable();
        }
      });
    });
  };

  _proto.isStopped = function isStopped() {
    if (!this.live && this._subjects.initialReplicationComplete['_value']) return true;
    if (this._subjects.canceled['_value']) return true;else return false;
  };

  _proto.awaitInitialReplication = function awaitInitialReplication() {
    return this.initialReplicationComplete$.pipe((0, _operators.filter)(function (v) {
      return v === true;
    }), (0, _operators.first)()).toPromise();
  } // ensures this._run() does not run in parallel
  ;

  _proto.run =
  /*#__PURE__*/
  function () {
    var _run2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _this2 = this;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isStopped()) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!(this._runQueueCount > 2)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", this._runningPromise);

            case 4:
              this._runQueueCount++;
              this._runningPromise = this._runningPromise.then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var willRetry;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _this2._subjects.active.next(true);

                        _context.next = 3;
                        return _this2._run();

                      case 3:
                        willRetry = _context.sent;

                        _this2._subjects.active.next(false);

                        if (!willRetry && _this2._subjects.initialReplicationComplete['_value'] === false) _this2._subjects.initialReplicationComplete.next(true);
                        _this2._runQueueCount--;

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));
              return _context2.abrupt("return", this._runningPromise);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function run() {
      return _run2.apply(this, arguments);
    }

    return run;
  }();

  _proto._run = /*#__PURE__*/function () {
    var _run3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _this3 = this;

      var willRetry, ok, _ok;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              willRetry = false;

              if (!this.push) {
                _context3.next = 6;
                break;
              }

              _context3.next = 4;
              return this.runPush();

            case 4:
              ok = _context3.sent;

              if (!ok) {
                willRetry = true;
                setTimeout(function () {
                  return _this3.run();
                }, this.retryTime);
              }

            case 6:
              if (!this.pull) {
                _context3.next = 11;
                break;
              }

              _context3.next = 9;
              return this.runPull();

            case 9:
              _ok = _context3.sent;

              if (!_ok) {
                willRetry = true;
                setTimeout(function () {
                  return _this3.run();
                }, this.retryTime);
              }

            case 11:
              return _context3.abrupt("return", willRetry);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _run() {
      return _run3.apply(this, arguments);
    }

    return _run;
  }()
  /**
   * @return true if no errors occured
   */
  ;

  _proto.runPull =
  /*#__PURE__*/
  function () {
    var _runPull = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var _this4 = this;

      var latestDocument, latestDocumentData, pullGraphQL, result, data, modified, docIds, docsWithRevisions, newLatestDocument;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.isStopped()) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", Promise.resolve(false));

            case 2:
              _context4.next = 4;
              return (0, _crawlingCheckpoint.getLastPullDocument)(this.collection, this.endpointHash);

            case 4:
              latestDocument = _context4.sent;
              latestDocumentData = latestDocument ? latestDocument : null;
              pullGraphQL = this.pull.queryBuilder(latestDocumentData);
              _context4.prev = 7;
              _context4.next = 10;
              return this.client.query(pullGraphQL.query, pullGraphQL.variables);

            case 10:
              result = _context4.sent;

              if (!result.errors) {
                _context4.next = 13;
                break;
              }

              throw new Error(result.errors);

            case 13:
              _context4.next = 20;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](7);

              this._subjects.error.next(_context4.t0);

              setTimeout(function () {
                return _this4.run();
              }, this.retryTime);
              return _context4.abrupt("return", false);

            case 20:
              // this assumes that there will be always only one property in the response
              // is this correct?
              data = result.data[Object.keys(result.data)[0]];
              modified = data.map(function (doc) {
                return _this4.pull.modifier(doc);
              });
              docIds = modified.map(function (doc) {
                return doc[_this4.collection.schema.primaryPath];
              });
              _context4.next = 25;
              return (0, _helper.getDocsWithRevisionsFromPouch)(this.collection, docIds);

            case 25:
              docsWithRevisions = _context4.sent;
              _context4.next = 28;
              return Promise.all(modified.map(function (doc) {
                return _this4.handleDocumentFromRemote(doc, docsWithRevisions);
              }));

            case 28:
              modified.map(function (doc) {
                return _this4._subjects.recieved.next(doc);
              });

              if (!(modified.length === 0)) {
                _context4.next = 33;
                break;
              }

              if (this.live) {// console.log('no more docs, wait for ping');
              } else {// console.log('RxGraphQLReplicationState._run(): no more docs and not live; complete = true');
              }

              _context4.next = 38;
              break;

            case 33:
              newLatestDocument = modified[modified.length - 1];
              _context4.next = 36;
              return (0, _crawlingCheckpoint.setLastPullDocument)(this.collection, this.endpointHash, newLatestDocument);

            case 36:
              _context4.next = 38;
              return this.runPull();

            case 38:
              return _context4.abrupt("return", true);

            case 39:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[7, 15]]);
    }));

    function runPull() {
      return _runPull.apply(this, arguments);
    }

    return runPull;
  }();

  _proto.runPush = /*#__PURE__*/function () {
    var _runPush = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var _this5 = this;

      var changes, changesWithDocs, lastSuccessfullChange, i, changeWithDoc, pushObj, result;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _crawlingCheckpoint.getChangesSinceLastPushSequence)(this.collection, this.endpointHash, this.push.batchSize);

            case 2:
              changes = _context5.sent;
              changesWithDocs = changes.results.map(function (change) {
                var doc = change['doc'];
                doc[_this5.deletedFlag] = !!change['deleted'];
                delete doc._rev;
                delete doc._deleted;
                delete doc._attachments;
                doc = _this5.push.modifier(doc);
                var seq = change.seq;
                return {
                  doc: doc,
                  seq: seq
                };
              });
              lastSuccessfullChange = null;
              _context5.prev = 5;
              i = 0;

            case 7:
              if (!(i < changesWithDocs.length)) {
                _context5.next = 22;
                break;
              }

              changeWithDoc = changesWithDocs[i];
              pushObj = this.push.queryBuilder(changeWithDoc.doc);
              _context5.next = 12;
              return this.client.query(pushObj.query, pushObj.variables);

            case 12:
              result = _context5.sent;

              if (!result.errors) {
                _context5.next = 17;
                break;
              }

              throw new Error(result.errors);

            case 17:
              this._subjects.send.next(changeWithDoc.doc);

              lastSuccessfullChange = changeWithDoc;

            case 19:
              i++;
              _context5.next = 7;
              break;

            case 22:
              _context5.next = 32;
              break;

            case 24:
              _context5.prev = 24;
              _context5.t0 = _context5["catch"](5);

              if (!lastSuccessfullChange) {
                _context5.next = 29;
                break;
              }

              _context5.next = 29;
              return (0, _crawlingCheckpoint.setLastPushSequence)(this.collection, this.endpointHash, lastSuccessfullChange.seq);

            case 29:
              this._subjects.error.next(_context5.t0);

              setTimeout(function () {
                return _this5.run();
              }, this.retryTime);
              return _context5.abrupt("return", false);

            case 32:
              _context5.next = 34;
              return (0, _crawlingCheckpoint.setLastPushSequence)(this.collection, this.endpointHash, changes.last_seq);

            case 34:
              if (!(changes.results.length === 0)) {
                _context5.next = 38;
                break;
              }

              if (this.live) {// console.log('no more docs to push, wait for ping');
              } else {// console.log('RxGraphQLReplicationState._runPull(): no more docs to push and not live; complete = true');
              }

              _context5.next = 40;
              break;

            case 38:
              _context5.next = 40;
              return this.runPush();

            case 40:
              return _context5.abrupt("return", true);

            case 41:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[5, 24]]);
    }));

    function runPush() {
      return _runPush.apply(this, arguments);
    }

    return runPush;
  }();

  _proto.handleDocumentFromRemote = /*#__PURE__*/function () {
    var _handleDocumentFromRemote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(doc, docsWithRevisions) {
      var deletedValue, toPouch, primaryValue, pouchState, newRevision, newRevisionHeight, revisionId, originalDoc, cE;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deletedValue = doc[this.deletedFlag];
              toPouch = this.collection._handleToPouch(doc); // console.log('handleDocumentFromRemote(' + toPouch._id + ') start');

              toPouch._deleted = deletedValue;
              delete toPouch[this.deletedFlag];
              primaryValue = toPouch._id;
              pouchState = docsWithRevisions[primaryValue];
              newRevision = (0, _helper.createRevisionForPulledDocument)(this.endpointHash, toPouch);

              if (pouchState) {
                newRevisionHeight = pouchState.revisions.start + 1;
                revisionId = newRevision;
                newRevision = newRevisionHeight + '-' + newRevision;
                toPouch._revisions = {
                  start: newRevisionHeight,
                  ids: pouchState.revisions.ids
                };

                toPouch._revisions.ids.unshift(revisionId);
              } else {
                newRevision = '1-' + newRevision;
              }

              toPouch._rev = newRevision;
              _context6.next = 11;
              return this.collection.pouch.bulkDocs([toPouch], {
                new_edits: false
              });

            case 11:
              /**
               * because bulkDocs with new_edits: false
               * does not stream changes to the pouchdb,
               * we create the event and emit it,
               * so other instances get informed about it
               */
              originalDoc = (0, _util.flatClone)(toPouch);

              if (deletedValue) {
                originalDoc._deleted = deletedValue;
              } else {
                delete originalDoc._deleted;
              }

              delete originalDoc[this.deletedFlag];
              delete originalDoc._revisions;
              originalDoc._rev = newRevision;
              cE = (0, _rxChangeEvent.changeEventfromPouchChange)(originalDoc, this.collection);
              this.collection.$emit(cE);

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function handleDocumentFromRemote(_x, _x2) {
      return _handleDocumentFromRemote.apply(this, arguments);
    }

    return handleDocumentFromRemote;
  }();

  _proto.cancel = function cancel() {
    if (this.isStopped()) return Promise.resolve(false);

    this._subs.forEach(function (sub) {
      return sub.unsubscribe();
    });

    this._subjects.canceled.next(true); // TODO


    return Promise.resolve(true);
  };

  return RxGraphQLReplicationState;
}();

exports.RxGraphQLReplicationState = RxGraphQLReplicationState;

function syncGraphQL(_ref2) {
  var url = _ref2.url,
      _ref2$headers = _ref2.headers,
      headers = _ref2$headers === void 0 ? {} : _ref2$headers,
      _ref2$waitForLeadersh = _ref2.waitForLeadership,
      waitForLeadership = _ref2$waitForLeadersh === void 0 ? true : _ref2$waitForLeadersh,
      pull = _ref2.pull,
      push = _ref2.push,
      deletedFlag = _ref2.deletedFlag,
      _ref2$live = _ref2.live,
      live = _ref2$live === void 0 ? false : _ref2$live,
      _ref2$liveInterval = _ref2.liveInterval,
      liveInterval = _ref2$liveInterval === void 0 ? 1000 * 10 : _ref2$liveInterval,
      _ref2$retryTime = _ref2.retryTime,
      retryTime = _ref2$retryTime === void 0 ? 1000 * 5 : _ref2$retryTime,
      _ref2$autoStart = _ref2.autoStart,
      autoStart = _ref2$autoStart === void 0 ? true : _ref2$autoStart;
  var collection = this; // fill in defaults for pull & push

  if (pull) {
    if (!pull.modifier) pull.modifier = _helper.DEFAULT_MODIFIER;
  }

  if (push) {
    if (!push.modifier) push.modifier = _helper.DEFAULT_MODIFIER;
  } // ensure the collection is listening to plain-pouchdb writes


  collection.watchForChanges();
  var replicationState = new RxGraphQLReplicationState(collection, url, headers, pull, push, deletedFlag, live, liveInterval, retryTime);
  if (!autoStart) return replicationState; // run internal so .sync() does not have to be async

  var waitTillRun = waitForLeadership ? this.database.waitForLeadership() : (0, _util.promiseWait)(0);
  waitTillRun.then(function () {
    // trigger run once
    replicationState.run(); // start sync-interval

    if (replicationState.live) {
      if (pull) {
        (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (replicationState.isStopped()) {
                    _context7.next = 9;
                    break;
                  }

                  _context7.next = 3;
                  return (0, _util.promiseWait)(replicationState.liveInterval);

                case 3:
                  if (!replicationState.isStopped()) {
                    _context7.next = 5;
                    break;
                  }

                  return _context7.abrupt("return");

                case 5:
                  _context7.next = 7;
                  return replicationState.run();

                case 7:
                  _context7.next = 0;
                  break;

                case 9:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }))();
      }

      if (push) {
        /**
         * we have to use the rxdb changestream
         * because the pouchdb.changes stream sometimes
         * does not emit events or stucks
         */
        var changeEventsSub = collection.$.subscribe(function (changeEvent) {
          if (replicationState.isStopped()) return;
          var rev = changeEvent.data.v._rev;

          if (rev && !(0, _helper.wasRevisionfromPullReplication)(replicationState.endpointHash, rev)) {
            replicationState.run();
          }
        });

        replicationState._subs.push(changeEventsSub);
      }
    }
  });
  return replicationState;
}

var rxdb = true;
exports.rxdb = rxdb;
var prototypes = {
  RxCollection: function RxCollection(proto) {
    proto.syncGraphQL = syncGraphQL;
  }
};
exports.prototypes = prototypes;
var _default = {
  rxdb: rxdb,
  prototypes: prototypes
};
exports["default"] = _default;

//# sourceMappingURL=index.js.map