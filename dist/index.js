var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toCommandProperties = exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports2.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issueCommand = void 0;
    var fs2 = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs2.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs2.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports2.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkBypass = exports2.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self2.requests.length; i < len; ++i) {
          var pending = self2.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self2.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self2 = this;
      var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push(options);
        return;
      }
      self2.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self2.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self2.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports2.debug = debug;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports2, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpClient = exports2.isHttps = exports2.HttpClientResponse = exports2.HttpClientError = exports2.getProxyUrl = exports2.MediaTypes = exports2.Headers = exports2.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports2.Headers || (exports2.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports2.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve(output.toString());
            });
          }));
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports2.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        });
      }
      requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
          if (!info.options.headers) {
            info.options.headers = {};
          }
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info.httpModule.request(info.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info.options);
          }
        }
        return info;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          }));
        });
      }
    };
    exports2.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PersonalAccessTokenCredentialHandler = exports2.BearerCredentialHandler = exports2.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports2.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.summary = exports2.markdownSummary = exports2.SUMMARY_DOCS_URL = exports2.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports2.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports2.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports2.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports2.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      stringify() {
        return this._buffer;
      }
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports2.markdownSummary = _summary;
    exports2.summary = _summary;
  }
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toPlatformPath = exports2.toWin32Path = exports2.toPosixPath = void 0;
    var path = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports2.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports2.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path.sep);
    }
    exports2.toPlatformPath = toPlatformPath;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getIDToken = exports2.getState = exports2.saveState = exports2.group = exports2.endGroup = exports2.startGroup = exports2.info = exports2.notice = exports2.warning = exports2.error = exports2.debug = exports2.isDebug = exports2.setFailed = exports2.setCommandEcho = exports2.setOutput = exports2.getBooleanInput = exports2.getMultilineInput = exports2.getInput = exports2.addPath = exports2.setSecret = exports2.exportVariable = exports2.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports2.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports2.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports2.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports2.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports2.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports2.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports2.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports2, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports2, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports2, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports2, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports2, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/wireEncoder.js
var require_wireEncoder = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/wireEncoder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var DEFAULT_OFFSET = 0;
    exports2.MAGIC_BYTE = Buffer.alloc(1);
    exports2.encode = (registryId, payload) => {
      const registryIdBuffer = Buffer.alloc(4);
      registryIdBuffer.writeInt32BE(registryId, DEFAULT_OFFSET);
      return Buffer.concat([exports2.MAGIC_BYTE, registryIdBuffer, payload]);
    };
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/wireDecoder.js
var require_wireDecoder = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/wireDecoder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (buffer) => ({
      magicByte: buffer.slice(0, 1),
      registryId: buffer.slice(1, 5).readInt32BE(0),
      payload: buffer.slice(5, buffer.length)
    });
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/constants.js
var require_constants = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var COMPATIBILITY;
    (function(COMPATIBILITY2) {
      COMPATIBILITY2["NONE"] = "NONE";
      COMPATIBILITY2["FULL"] = "FULL";
      COMPATIBILITY2["BACKWARD"] = "BACKWARD";
      COMPATIBILITY2["FORWARD"] = "FORWARD";
      COMPATIBILITY2["BACKWARD_TRANSITIVE"] = "BACKWARD_TRANSITIVE";
      COMPATIBILITY2["FORWARD_TRANSITIVE"] = "FORWARD_TRANSITIVE";
      COMPATIBILITY2["FULL_TRANSITIVE"] = "FULL_TRANSITIVE";
    })(COMPATIBILITY = exports2.COMPATIBILITY || (exports2.COMPATIBILITY = {}));
    exports2.DEFAULT_SEPERATOR = ".";
    exports2.DEFAULT_API_CLIENT_ID = "Confluent_Schema_Registry";
  }
});

// node_modules/mappersmith/method-descriptor.js
var require_method_descriptor = __commonJS({
  "node_modules/mappersmith/method-descriptor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.MethodDescriptor = void 0;
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var MethodDescriptor = /* @__PURE__ */ _createClass(function MethodDescriptor2(params) {
      _classCallCheck(this, MethodDescriptor2);
      _defineProperty(this, "allowResourceHostOverride", void 0);
      _defineProperty(this, "parameterEncoder", void 0);
      _defineProperty(this, "authAttr", void 0);
      _defineProperty(this, "binary", void 0);
      _defineProperty(this, "bodyAttr", void 0);
      _defineProperty(this, "headers", void 0);
      _defineProperty(this, "headersAttr", void 0);
      _defineProperty(this, "host", void 0);
      _defineProperty(this, "hostAttr", void 0);
      _defineProperty(this, "method", void 0);
      _defineProperty(this, "middleware", void 0);
      _defineProperty(this, "params", void 0);
      _defineProperty(this, "path", void 0);
      _defineProperty(this, "queryParamAlias", void 0);
      _defineProperty(this, "timeoutAttr", void 0);
      this.allowResourceHostOverride = params.allowResourceHostOverride || false;
      this.parameterEncoder = params.parameterEncoder || encodeURIComponent;
      this.binary = params.binary || false;
      this.headers = params.headers;
      this.host = params.host;
      this.method = params.method || "get";
      this.params = params.params;
      this.path = params.path;
      this.queryParamAlias = params.queryParamAlias || {};
      this.authAttr = params.authAttr || "auth";
      this.bodyAttr = params.bodyAttr || "body";
      this.headersAttr = params.headersAttr || "headers";
      this.hostAttr = params.hostAttr || "host";
      this.timeoutAttr = params.timeoutAttr || "timeout";
      var resourceMiddleware = params.middleware || params.middlewares || [];
      this.middleware = resourceMiddleware;
    });
    exports2.MethodDescriptor = MethodDescriptor;
    var _default = MethodDescriptor;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/mappersmith/utils/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validKeys = exports.toQueryString = exports.performanceNow = exports.parseResponseHeaders = exports.lowerCaseObjectKeys = exports.isPlainObject = exports.isObject = exports.buildRecursive = exports.btoa = exports.assign = void 0;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    var _process;
    var getNanoSeconds;
    var loadTime;
    try {
      _process = eval('typeof __TEST_WEB__ === "undefined" && typeof process === "object" ? process : undefined');
    } catch (e) {
    }
    var hasProcessHrtime = function hasProcessHrtime2() {
      return typeof _process !== "undefined" && _process !== null && _process.hrtime;
    };
    if (hasProcessHrtime()) {
      getNanoSeconds = function getNanoSeconds2() {
        var hr = _process.hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      loadTime = getNanoSeconds();
    }
    var R20 = /%20/g;
    var isNeitherNullNorUndefined = function isNeitherNullNorUndefined2(x) {
      return x !== null && x !== void 0;
    };
    var validKeys = function validKeys2(entry) {
      return Object.keys(entry).filter(function(key) {
        return isNeitherNullNorUndefined(entry[key]);
      });
    };
    exports.validKeys = validKeys;
    var buildRecursive = function buildRecursive2(key, value) {
      var suffix = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      var encoderFn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : encodeURIComponent;
      if (Array.isArray(value)) {
        return value.map(function(v) {
          return buildRecursive2(key, v, suffix + "[]", encoderFn);
        }).join("&");
      }
      if (_typeof(value) !== "object") {
        return "".concat(encoderFn(key + suffix), "=").concat(encoderFn(value));
      }
      return Object.keys(value).map(function(nestedKey) {
        var nestedValue = value[nestedKey];
        if (isNeitherNullNorUndefined(nestedValue)) {
          return buildRecursive2(key, nestedValue, suffix + "[" + nestedKey + "]", encoderFn);
        }
        return null;
      }).filter(isNeitherNullNorUndefined).join("&");
    };
    exports.buildRecursive = buildRecursive;
    var toQueryString = function toQueryString2(entry) {
      var encoderFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : encodeURIComponent;
      if (!isPlainObject(entry)) {
        return entry;
      }
      return Object.keys(entry).map(function(key) {
        var value = entry[key];
        if (isNeitherNullNorUndefined(value)) {
          return buildRecursive(key, value, "", encoderFn);
        }
        return null;
      }).filter(isNeitherNullNorUndefined).join("&").replace(R20, "+");
    };
    exports.toQueryString = toQueryString;
    var performanceNow = function performanceNow2() {
      if (hasProcessHrtime() && getNanoSeconds !== void 0) {
        var now = getNanoSeconds();
        if (now !== void 0 && loadTime !== void 0) {
          return (now - loadTime) / 1e6;
        }
      }
      return Date.now();
    };
    exports.performanceNow = performanceNow;
    var parseResponseHeaders = function parseResponseHeaders2(headerStr) {
      var headers = {};
      if (!headerStr) {
        return headers;
      }
      var headerPairs = headerStr.split("\r\n");
      for (var i = 0; i < headerPairs.length; i++) {
        var headerPair = headerPairs[i];
        var index = headerPair.indexOf(": ");
        if (index > 0) {
          var key = headerPair.substring(0, index).toLowerCase().trim();
          var val = headerPair.substring(index + 2).trim();
          headers[key] = val;
        }
      }
      return headers;
    };
    exports.parseResponseHeaders = parseResponseHeaders;
    var lowerCaseObjectKeys = function lowerCaseObjectKeys2(obj) {
      return Object.keys(obj).reduce(function(target, key) {
        target[key.toLowerCase()] = obj[key];
        return target;
      }, {});
    };
    exports.lowerCaseObjectKeys = lowerCaseObjectKeys;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var assign = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    exports.assign = assign;
    var toString = Object.prototype.toString;
    var isPlainObject = function isPlainObject2(value) {
      return toString.call(value) === "[object Object]" && Object.getPrototypeOf(value) === Object.getPrototypeOf({});
    };
    exports.isPlainObject = isPlainObject;
    var isObject = function isObject2(value) {
      return _typeof(value) === "object" && value !== null && !Array.isArray(value);
    };
    exports.isObject = isObject;
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var btoa = function btoa2(input) {
      var output = "";
      var map = CHARS;
      var str = String(input);
      for (var block = 0, charCode, idx = 0; str.charAt(idx | 0) || (map = "=", idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 255) {
          throw new Error("[Mappersmith] 'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
      }
      return output;
    };
    exports.btoa = btoa;
  }
});

// node_modules/mappersmith/manifest.js
var require_manifest = __commonJS({
  "node_modules/mappersmith/manifest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.Manifest = void 0;
    var _methodDescriptor = require_method_descriptor();
    var _utils = require_utils2();
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var Manifest = /* @__PURE__ */ function() {
      function Manifest2(options, _ref) {
        var gatewayConfigs = _ref.gatewayConfigs, _ref$middleware = _ref.middleware, middleware = _ref$middleware === void 0 ? [] : _ref$middleware, _ref$context = _ref.context, context = _ref$context === void 0 ? {} : _ref$context;
        _classCallCheck(this, Manifest2);
        _defineProperty(this, "host", void 0);
        _defineProperty(this, "allowResourceHostOverride", void 0);
        _defineProperty(this, "parameterEncoder", void 0);
        _defineProperty(this, "bodyAttr", void 0);
        _defineProperty(this, "headersAttr", void 0);
        _defineProperty(this, "authAttr", void 0);
        _defineProperty(this, "timeoutAttr", void 0);
        _defineProperty(this, "hostAttr", void 0);
        _defineProperty(this, "clientId", void 0);
        _defineProperty(this, "gatewayConfigs", void 0);
        _defineProperty(this, "resources", void 0);
        _defineProperty(this, "context", void 0);
        _defineProperty(this, "middleware", void 0);
        this.host = options.host;
        this.allowResourceHostOverride = options.allowResourceHostOverride || false;
        this.parameterEncoder = options.parameterEncoder || encodeURIComponent;
        this.bodyAttr = options.bodyAttr;
        this.headersAttr = options.headersAttr;
        this.authAttr = options.authAttr;
        this.timeoutAttr = options.timeoutAttr;
        this.hostAttr = options.hostAttr;
        this.clientId = options.clientId || null;
        this.gatewayConfigs = (0, _utils.assign)({}, gatewayConfigs, options.gatewayConfigs);
        this.resources = options.resources || {};
        this.context = context;
        var clientMiddleware = options.middleware || options.middlewares || [];
        if (options.ignoreGlobalMiddleware) {
          this.middleware = clientMiddleware;
        } else {
          this.middleware = [].concat(_toConsumableArray(clientMiddleware), _toConsumableArray(middleware));
        }
      }
      _createClass(Manifest2, [{
        key: "eachResource",
        value: function eachResource(callback) {
          var _this = this;
          Object.keys(this.resources).forEach(function(resourceName) {
            var methods = _this.eachMethod(resourceName, function(methodName) {
              return {
                name: methodName,
                descriptor: _this.createMethodDescriptor(resourceName, methodName)
              };
            });
            callback(resourceName, methods);
          });
        }
      }, {
        key: "eachMethod",
        value: function eachMethod(resourceName, callback) {
          return Object.keys(this.resources[resourceName]).map(callback);
        }
      }, {
        key: "createMethodDescriptor",
        value: function createMethodDescriptor(resourceName, methodName) {
          var definition = this.resources[resourceName][methodName];
          if (!definition || !definition.path) {
            throw new Error('[Mappersmith] path is undefined for resource "'.concat(resourceName, '" method "').concat(methodName, '"'));
          }
          return new _methodDescriptor.MethodDescriptor((0, _utils.assign)({
            host: this.host,
            allowResourceHostOverride: this.allowResourceHostOverride,
            parameterEncoder: this.parameterEncoder,
            bodyAttr: this.bodyAttr,
            headersAttr: this.headersAttr,
            authAttr: this.authAttr,
            timeoutAttr: this.timeoutAttr,
            hostAttr: this.hostAttr
          }, definition));
        }
      }, {
        key: "createMiddleware",
        value: function createMiddleware(args) {
          var _this2 = this;
          var createInstance = function createInstance2(middlewareFactory) {
            var defaultDescriptor = {
              __name: middlewareFactory.name || middlewareFactory.toString(),
              response: function response(next) {
                return next();
              },
              prepareRequest: function prepareRequest(next) {
                var _this3 = this;
                return this.request ? next().then(function(req) {
                  var _this3$request;
                  return (_this3$request = _this3.request) === null || _this3$request === void 0 ? void 0 : _this3$request.call(_this3, req);
                }) : next();
              }
            };
            var middlewareParams = (0, _utils.assign)(args, {
              clientId: _this2.clientId,
              context: (0, _utils.assign)({}, _this2.context)
            });
            return (0, _utils.assign)(defaultDescriptor, middlewareFactory(middlewareParams));
          };
          var name = args.resourceName, method = args.resourceMethod;
          var resourceMiddleware = this.createMethodDescriptor(name, method).middleware;
          var middlewares = [].concat(_toConsumableArray(resourceMiddleware), _toConsumableArray(this.middleware));
          return middlewares.map(createInstance);
        }
      }]);
      return Manifest2;
    }();
    exports2.Manifest = Manifest;
    var _default = Manifest;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/request.js
var require_request = __commonJS({
  "node_modules/mappersmith/request.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.Request = void 0;
    var _utils = require_utils2();
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var REGEXP_DYNAMIC_SEGMENT = /{([^}?]+)\??}/;
    var REGEXP_OPTIONAL_DYNAMIC_SEGMENT = /\/?{([^}?]+)\?}/g;
    var REGEXP_TRAILING_SLASH = /\/$/;
    var Request = /* @__PURE__ */ function() {
      function Request2(methodDescriptor) {
        var requestParams = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _classCallCheck(this, Request2);
        _defineProperty(this, "methodDescriptor", void 0);
        _defineProperty(this, "requestParams", void 0);
        this.methodDescriptor = methodDescriptor;
        this.requestParams = requestParams;
      }
      _createClass(Request2, [{
        key: "isParam",
        value: function isParam(key) {
          return key !== this.methodDescriptor.headersAttr && key !== this.methodDescriptor.bodyAttr && key !== this.methodDescriptor.authAttr && key !== this.methodDescriptor.timeoutAttr && key !== this.methodDescriptor.hostAttr;
        }
      }, {
        key: "params",
        value: function params() {
          var _this = this;
          var params2 = (0, _utils.assign)({}, this.methodDescriptor.params, this.requestParams);
          return Object.keys(params2).reduce(function(obj, key) {
            if (_this.isParam(key)) {
              obj[key] = params2[key];
            }
            return obj;
          }, {});
        }
      }, {
        key: "method",
        value: function method() {
          return this.methodDescriptor.method.toLowerCase();
        }
      }, {
        key: "host",
        value: function host() {
          var _this$methodDescripto = this.methodDescriptor, allowResourceHostOverride = _this$methodDescripto.allowResourceHostOverride, hostAttr = _this$methodDescripto.hostAttr, host2 = _this$methodDescripto.host;
          var originalHost = allowResourceHostOverride ? this.requestParams[hostAttr] || host2 || "" : host2 || "";
          if (typeof originalHost === "string") {
            return originalHost.replace(REGEXP_TRAILING_SLASH, "");
          }
          return "";
        }
      }, {
        key: "path",
        value: function path() {
          var _this2 = this;
          var params = this.params();
          var path2;
          if (typeof this.methodDescriptor.path === "function") {
            path2 = this.methodDescriptor.path(params);
          } else {
            path2 = this.methodDescriptor.path;
          }
          if (path2[0] !== "/") {
            path2 = "/".concat(path2);
          }
          var regexp = new RegExp(REGEXP_DYNAMIC_SEGMENT, "g");
          var dynamicSegmentKeys = [];
          var match;
          while ((match = regexp.exec(path2)) !== null) {
            dynamicSegmentKeys.push(match[1]);
          }
          for (var _i = 0, _dynamicSegmentKeys = dynamicSegmentKeys; _i < _dynamicSegmentKeys.length; _i++) {
            var key = _dynamicSegmentKeys[_i];
            var pattern = new RegExp("{".concat(key, "\\??}"), "g");
            var value = params[key];
            if (value != null && _typeof2(value) !== "object") {
              path2 = path2.replace(pattern, this.methodDescriptor.parameterEncoder(value));
              delete params[key];
            }
          }
          path2 = path2.replace(REGEXP_OPTIONAL_DYNAMIC_SEGMENT, "");
          var missingDynamicSegmentMatch = path2.match(REGEXP_DYNAMIC_SEGMENT);
          if (missingDynamicSegmentMatch) {
            throw new Error("[Mappersmith] required parameter missing (".concat(missingDynamicSegmentMatch[1], '), "').concat(path2, '" cannot be resolved'));
          }
          var aliasedParams = Object.keys(params).reduce(function(aliased, key2) {
            var aliasedKey = _this2.methodDescriptor.queryParamAlias[key2] || key2;
            var value2 = params[key2];
            if (value2 != null) {
              aliased[aliasedKey] = value2;
            }
            return aliased;
          }, {});
          var queryString = (0, _utils.toQueryString)(aliasedParams, this.methodDescriptor.parameterEncoder);
          if (typeof queryString === "string" && queryString.length !== 0) {
            var hasQuery = path2.includes("?");
            path2 += "".concat(hasQuery ? "&" : "?").concat(queryString);
          }
          return path2;
        }
      }, {
        key: "pathTemplate",
        value: function pathTemplate() {
          var path = this.methodDescriptor.path;
          var prependSlash = function prependSlash2(str) {
            return str[0] !== "/" ? "/".concat(str) : str;
          };
          if (typeof path === "function") {
            return prependSlash(path(this.params()));
          }
          return prependSlash(path);
        }
      }, {
        key: "url",
        value: function url() {
          return "".concat(this.host()).concat(this.path());
        }
      }, {
        key: "headers",
        value: function headers() {
          var headerAttr = this.methodDescriptor.headersAttr;
          var headers2 = this.requestParams[headerAttr] || {};
          var mergedHeaders = _objectSpread(_objectSpread({}, this.methodDescriptor.headers), headers2);
          return (0, _utils.lowerCaseObjectKeys)(mergedHeaders);
        }
      }, {
        key: "header",
        value: function header(name) {
          var key = name.toLowerCase();
          if (key in this.headers()) {
            return this.headers()[key];
          }
          return void 0;
        }
      }, {
        key: "body",
        value: function body() {
          return this.requestParams[this.methodDescriptor.bodyAttr];
        }
      }, {
        key: "auth",
        value: function auth() {
          return this.requestParams[this.methodDescriptor.authAttr];
        }
      }, {
        key: "timeout",
        value: function timeout() {
          return this.requestParams[this.methodDescriptor.timeoutAttr];
        }
      }, {
        key: "enhance",
        value: function enhance(extras) {
          var authKey = this.methodDescriptor.authAttr;
          var bodyKey = this.methodDescriptor.bodyAttr;
          var headerKey = this.methodDescriptor.headersAttr;
          var hostKey = this.methodDescriptor.hostAttr;
          var timeoutKey = this.methodDescriptor.timeoutAttr;
          var requestParams = (0, _utils.assign)({}, this.requestParams, extras.params);
          var headers = this.requestParams[headerKey];
          var mergedHeaders = (0, _utils.assign)({}, headers, extras.headers);
          requestParams[headerKey] = mergedHeaders;
          extras.auth && (requestParams[authKey] = extras.auth);
          extras.body && (requestParams[bodyKey] = extras.body);
          extras.host && (requestParams[hostKey] = extras.host);
          extras.timeout && (requestParams[timeoutKey] = extras.timeout);
          return new Request2(this.methodDescriptor, requestParams);
        }
      }, {
        key: "isBinary",
        value: function isBinary() {
          return this.methodDescriptor.binary;
        }
      }]);
      return Request2;
    }();
    exports2.Request = Request;
    var _default = Request;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/client-builder.js
var require_client_builder = __commonJS({
  "node_modules/mappersmith/client-builder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.ClientBuilder = void 0;
    var _manifest = require_manifest();
    var _request = require_request();
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var isFactoryConfigured = function isFactoryConfigured2(factory) {
      if (!factory || !factory()) {
        return false;
      }
      return true;
    };
    var ClientBuilder = /* @__PURE__ */ function() {
      function ClientBuilder2(manifestDefinition, GatewayClassFactory, configs) {
        _classCallCheck(this, ClientBuilder2);
        _defineProperty(this, "Promise", void 0);
        _defineProperty(this, "manifest", void 0);
        _defineProperty(this, "GatewayClassFactory", void 0);
        _defineProperty(this, "maxMiddlewareStackExecutionAllowed", void 0);
        if (!manifestDefinition) {
          throw new Error("[Mappersmith] invalid manifest (".concat(manifestDefinition, ")"));
        }
        if (!isFactoryConfigured(GatewayClassFactory)) {
          throw new Error("[Mappersmith] gateway class not configured (configs.gateway)");
        }
        if (!configs.Promise) {
          throw new Error("[Mappersmith] Promise not configured (configs.Promise)");
        }
        this.Promise = configs.Promise;
        this.manifest = new _manifest.Manifest(manifestDefinition, configs);
        this.GatewayClassFactory = GatewayClassFactory;
        this.maxMiddlewareStackExecutionAllowed = configs.maxMiddlewareStackExecutionAllowed;
      }
      _createClass(ClientBuilder2, [{
        key: "build",
        value: function build() {
          var _this = this;
          var client = {
            _manifest: this.manifest
          };
          this.manifest.eachResource(function(resourceName, methods) {
            client[resourceName] = _this.buildResource(resourceName, methods);
          });
          return client;
        }
      }, {
        key: "buildResource",
        value: function buildResource(resourceName, methods) {
          var _this2 = this;
          var initialResourceValue = {};
          var resource = methods.reduce(function(resource2, method) {
            var resourceMethod = function resourceMethod2(requestParams) {
              var request = new _request.Request(method.descriptor, requestParams);
              return _this2.invokeMiddlewares(String(resourceName), method.name, request);
            };
            return _objectSpread(_objectSpread({}, resource2), {}, _defineProperty({}, method.name, resourceMethod));
          }, initialResourceValue);
          return resource;
        }
      }, {
        key: "invokeMiddlewares",
        value: function invokeMiddlewares(resourceName, resourceMethod, initialRequest) {
          var _this3 = this;
          var middleware = this.manifest.createMiddleware({
            resourceName,
            resourceMethod
          });
          var GatewayClass = this.GatewayClassFactory();
          var gatewayConfigs = this.manifest.gatewayConfigs;
          var requestPhaseFailureContext = {
            middleware: null,
            returnedInvalidRequest: false,
            abortExecution: false
          };
          var getInitialRequest = function getInitialRequest2() {
            return _this3.Promise.resolve(initialRequest);
          };
          var chainRequestPhase = function chainRequestPhase2(next, middleware2) {
            return function() {
              var abort = function abort2(error) {
                requestPhaseFailureContext.abortExecution = true;
                throw error;
              };
              return _this3.Promise.resolve().then(function() {
                return middleware2.prepareRequest(next, abort);
              }).then(function(request) {
                if (request instanceof _request.Request) {
                  return request;
                }
                requestPhaseFailureContext.returnedInvalidRequest = true;
                var typeValue = _typeof2(request);
                var prettyType = typeValue === "object" || typeValue === "function" ? request.name || typeValue : typeValue;
                throw new Error('[Mappersmith] middleware "'.concat(middleware2.__name, '" should return "Request" but returned "').concat(prettyType, '"'));
              })["catch"](function(e) {
                requestPhaseFailureContext.middleware = middleware2.__name || null;
                throw e;
              });
            };
          };
          var prepareRequest = middleware.reduce(chainRequestPhase, getInitialRequest);
          var executions = 0;
          var executeMiddlewareStack = function executeMiddlewareStack2() {
            return prepareRequest()["catch"](function(e) {
              var returnedInvalidRequest = requestPhaseFailureContext.returnedInvalidRequest, abortExecution = requestPhaseFailureContext.abortExecution, middleware2 = requestPhaseFailureContext.middleware;
              if (returnedInvalidRequest || abortExecution) {
                throw e;
              }
              var error = new Error('[Mappersmith] middleware "'.concat(middleware2, '" failed in the request phase: ').concat(e.message));
              error.stack = e.stack;
              throw error;
            }).then(function(finalRequest) {
              executions++;
              if (executions > _this3.maxMiddlewareStackExecutionAllowed) {
                throw new Error("[Mappersmith] infinite loop detected (middleware stack invoked ".concat(executions, ' times). Check the use of "renew" in one of the middleware.'));
              }
              var renew = executeMiddlewareStack2;
              var chainResponsePhase = function chainResponsePhase2(previousValue, currentValue) {
                return function() {
                  var nextValue = currentValue.response(previousValue, renew);
                  return nextValue;
                };
              };
              var callGateway = function callGateway2() {
                return new GatewayClass(finalRequest, gatewayConfigs).call();
              };
              var execute = middleware.reduce(chainResponsePhase, callGateway);
              return execute();
            });
          };
          return new this.Promise(function(resolve, reject) {
            executeMiddlewareStack().then(function(response) {
              return resolve(response);
            })["catch"](reject);
          });
        }
      }]);
      return ClientBuilder2;
    }();
    exports2.ClientBuilder = ClientBuilder;
    var _default = ClientBuilder;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/version.json
var require_version = __commonJS({
  "node_modules/mappersmith/version.json"(exports2, module2) {
    module2.exports = { version: "2.39.1" };
  }
});

// node_modules/mappersmith/response.js
var require_response = __commonJS({
  "node_modules/mappersmith/response.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.Response = void 0;
    var _utils = require_utils2();
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var REGEXP_CONTENT_TYPE_JSON = /^application\/(json|.*\+json)/;
    var Response = /* @__PURE__ */ function() {
      function Response2(originalRequest, responseStatus, responseData, responseHeaders, errors) {
        _classCallCheck(this, Response2);
        _defineProperty(this, "originalRequest", void 0);
        _defineProperty(this, "responseStatus", void 0);
        _defineProperty(this, "responseData", void 0);
        _defineProperty(this, "responseHeaders", void 0);
        _defineProperty(this, "errors", void 0);
        _defineProperty(this, "timeElapsed", void 0);
        var auth = originalRequest.requestParams && originalRequest.requestParams.auth;
        if (auth) {
          var maskedAuth = _objectSpread(_objectSpread({}, auth), {}, {
            password: "***"
          });
          this.originalRequest = originalRequest.enhance({
            auth: maskedAuth
          });
        } else {
          this.originalRequest = originalRequest;
        }
        this.responseStatus = responseStatus;
        this.responseData = responseData !== null && responseData !== void 0 ? responseData : null;
        this.responseHeaders = responseHeaders || {};
        this.errors = errors || [];
        this.timeElapsed = null;
      }
      _createClass(Response2, [{
        key: "request",
        value: function request() {
          return this.originalRequest;
        }
      }, {
        key: "status",
        value: function status() {
          if (this.responseStatus === 1223) {
            return 204;
          }
          return this.responseStatus;
        }
      }, {
        key: "success",
        value: function success() {
          var status = this.status();
          return status >= 200 && status < 400;
        }
      }, {
        key: "headers",
        value: function headers() {
          return (0, _utils.lowerCaseObjectKeys)(this.responseHeaders);
        }
      }, {
        key: "header",
        value: function header(name) {
          var key = name.toLowerCase();
          if (key in this.headers()) {
            return this.headers()[key];
          }
          return void 0;
        }
      }, {
        key: "rawData",
        value: function rawData() {
          return this.responseData;
        }
      }, {
        key: "data",
        value: function data() {
          if (this.isContentTypeJSON() && this.responseData !== null) {
            try {
              return JSON.parse(this.responseData);
            } catch (e) {
            }
          }
          return this.responseData;
        }
      }, {
        key: "isContentTypeJSON",
        value: function isContentTypeJSON() {
          var contentType = this.header("content-type");
          if (contentType === void 0) {
            return false;
          }
          return REGEXP_CONTENT_TYPE_JSON.test(contentType);
        }
      }, {
        key: "error",
        value: function error() {
          var lastError = this.errors[this.errors.length - 1] || null;
          if (typeof lastError === "string") {
            return new Error(lastError);
          }
          return lastError;
        }
      }, {
        key: "enhance",
        value: function enhance(extras) {
          var mergedHeaders = _objectSpread(_objectSpread({}, this.headers()), extras.headers || {});
          var enhancedResponse = new Response2(this.request(), extras.status || this.status(), extras.rawData || this.rawData(), mergedHeaders, extras.error ? [].concat(_toConsumableArray(this.errors), [extras.error]) : _toConsumableArray(this.errors));
          enhancedResponse.timeElapsed = this.timeElapsed;
          return enhancedResponse;
        }
      }]);
      return Response2;
    }();
    exports2.Response = Response;
    var _default = Response;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/mappersmith.js
var require_mappersmith = __commonJS({
  "node_modules/mappersmith/mappersmith.js"(exports2) {
    "use strict";
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "Response", {
      enumerable: true,
      get: function get() {
        return _response.Response;
      }
    });
    exports2.configs = void 0;
    exports2["default"] = forge;
    exports2.version = exports2.setContext = void 0;
    var _clientBuilder = _interopRequireDefault(require_client_builder());
    var _utils = require_utils2();
    var Version = _interopRequireWildcard(require_version());
    var _response = require_response();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var version = Version.version;
    exports2.version = version;
    var configs = {
      context: {},
      middleware: [],
      Promise: typeof Promise === "function" ? Promise : null,
      fetch: typeof fetch === "function" ? fetch : null,
      maxMiddlewareStackExecutionAllowed: 2,
      gateway: null,
      gatewayConfigs: {
        emulateHTTP: false,
        enableHTTP408OnTimeouts: false,
        XHR: {
          withCredentials: false,
          configure: null
        },
        HTTP: {
          useSocketConnectionTimeout: false,
          configure: null,
          onRequestWillStart: null,
          onRequestSocketAssigned: null,
          onSocketLookup: null,
          onSocketConnect: null,
          onSocketSecureConnect: null,
          onResponseReadable: null,
          onResponseEnd: null
        },
        Fetch: {
          credentials: "omit"
        }
      }
    };
    exports2.configs = configs;
    var setContext = function setContext2(context) {
      console.warn("The use of setContext is deprecated - you need to find another way to pass data between your middlewares.");
      configs.context = (0, _utils.assign)(configs.context, context);
    };
    exports2.setContext = setContext;
    function forge(manifest) {
      var GatewayClassFactory = function GatewayClassFactory2() {
        return configs.gateway;
      };
      return new _clientBuilder["default"](manifest, GatewayClassFactory, configs).build();
    }
  }
});

// node_modules/mappersmith/gateway/timeout-error.js
var require_timeout_error = __commonJS({
  "node_modules/mappersmith/gateway/timeout-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isTimeoutError = exports2.createTimeoutError = void 0;
    var isTimeoutError = function isTimeoutError2(e) {
      return e && e.name === "TimeoutError";
    };
    exports2.isTimeoutError = isTimeoutError;
    var createTimeoutError = function createTimeoutError2(message) {
      var error = new Error(message);
      error.name = "TimeoutError";
      return error;
    };
    exports2.createTimeoutError = createTimeoutError;
  }
});

// node_modules/mappersmith/gateway.js
var require_gateway = __commonJS({
  "node_modules/mappersmith/gateway.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.Gateway = void 0;
    var _utils = require_utils2();
    var _mappersmith = require_mappersmith();
    var _response = require_response();
    var _timeoutError = require_timeout_error();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var REGEXP_EMULATE_HTTP = /^(delete|put|patch)/i;
    var Gateway = /* @__PURE__ */ function() {
      function Gateway2(request, configs) {
        _classCallCheck(this, Gateway2);
        _defineProperty(this, "request", void 0);
        _defineProperty(this, "configs", void 0);
        _defineProperty(this, "successCallback", void 0);
        _defineProperty(this, "failCallback", void 0);
        this.request = request;
        this.configs = configs;
        this.successCallback = function() {
          return void 0;
        };
        this.failCallback = function() {
          return void 0;
        };
      }
      _createClass(Gateway2, [{
        key: "get",
        value: function get() {
          throw new Error("Not implemented");
        }
      }, {
        key: "head",
        value: function head() {
          throw new Error("Not implemented");
        }
      }, {
        key: "post",
        value: function post() {
          throw new Error("Not implemented");
        }
      }, {
        key: "put",
        value: function put() {
          throw new Error("Not implemented");
        }
      }, {
        key: "patch",
        value: function patch() {
          throw new Error("Not implemented");
        }
      }, {
        key: "delete",
        value: function _delete() {
          throw new Error("Not implemented");
        }
      }, {
        key: "options",
        value: function options() {
          return this.configs;
        }
      }, {
        key: "shouldEmulateHTTP",
        value: function shouldEmulateHTTP() {
          return this.options().emulateHTTP && REGEXP_EMULATE_HTTP.test(this.request.method());
        }
      }, {
        key: "call",
        value: function call() {
          var _arguments = arguments, _this = this;
          var timeStart = (0, _utils.performanceNow)();
          if (!_mappersmith.configs.Promise) {
            throw new Error("[Mappersmith] Promise not configured (configs.Promise)");
          }
          return new _mappersmith.configs.Promise(function(resolve, reject) {
            _this.successCallback = function(response) {
              response.timeElapsed = (0, _utils.performanceNow)() - timeStart;
              resolve(response);
            };
            _this.failCallback = function(response) {
              response.timeElapsed = (0, _utils.performanceNow)() - timeStart;
              reject(response);
            };
            try {
              _this[_this.request.method()].apply(_this, _arguments);
            } catch (e) {
              var err = e;
              _this.dispatchClientError(err.message, err);
            }
          });
        }
      }, {
        key: "dispatchResponse",
        value: function dispatchResponse(response) {
          response.success() ? this.successCallback(response) : this.failCallback(response);
        }
      }, {
        key: "dispatchClientError",
        value: function dispatchClientError(message, error) {
          if ((0, _timeoutError.isTimeoutError)(error) && this.options().enableHTTP408OnTimeouts) {
            this.failCallback(new _response.Response(this.request, 408, message, {}, [error]));
          } else {
            this.failCallback(new _response.Response(this.request, 400, message, {}, [error]));
          }
        }
      }, {
        key: "prepareBody",
        value: function prepareBody(method, headers) {
          var body = this.request.body();
          if (this.shouldEmulateHTTP()) {
            body = body || {};
            (0, _utils.isPlainObject)(body) && (body["_method"] = method);
            headers["x-http-method-override"] = method;
          }
          var bodyString = (0, _utils.toQueryString)(body);
          if (bodyString) {
            if ((0, _utils.isPlainObject)(body)) {
              headers["content-type"] = "application/x-www-form-urlencoded;charset=utf-8";
            }
          }
          return bodyString;
        }
      }]);
      return Gateway2;
    }();
    exports2.Gateway = Gateway;
    var _default = Gateway;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/gateway/xhr.js
var require_xhr = __commonJS({
  "node_modules/mappersmith/gateway/xhr.js"(exports2) {
    "use strict";
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.XHR = void 0;
    var _gateway = require_gateway();
    var _response = _interopRequireDefault(require_response());
    var _utils = require_utils2();
    var _timeoutError = require_timeout_error();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var toBase64 = window.btoa || _utils.btoa;
    var XHR = /* @__PURE__ */ function(_Gateway) {
      _inherits(XHR2, _Gateway);
      var _super = _createSuper(XHR2);
      function XHR2() {
        var _this;
        _classCallCheck(this, XHR2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "canceled", false);
        _defineProperty(_assertThisInitialized(_this), "timer", void 0);
        return _this;
      }
      _createClass(XHR2, [{
        key: "get",
        value: function get() {
          var xmlHttpRequest = this.createXHR();
          xmlHttpRequest.open("GET", this.request.url(), true);
          this.setHeaders(xmlHttpRequest, {});
          this.configureTimeout(xmlHttpRequest);
          this.configureBinary(xmlHttpRequest);
          xmlHttpRequest.send();
        }
      }, {
        key: "head",
        value: function head() {
          var xmlHttpRequest = this.createXHR();
          xmlHttpRequest.open("HEAD", this.request.url(), true);
          this.setHeaders(xmlHttpRequest, {});
          this.configureTimeout(xmlHttpRequest);
          this.configureBinary(xmlHttpRequest);
          xmlHttpRequest.send();
        }
      }, {
        key: "post",
        value: function post() {
          this.performRequest("post");
        }
      }, {
        key: "put",
        value: function put() {
          this.performRequest("put");
        }
      }, {
        key: "patch",
        value: function patch() {
          this.performRequest("patch");
        }
      }, {
        key: "delete",
        value: function _delete() {
          this.performRequest("delete");
        }
      }, {
        key: "configureBinary",
        value: function configureBinary(xmlHttpRequest) {
          if (this.request.isBinary()) {
            xmlHttpRequest.responseType = "blob";
          }
        }
      }, {
        key: "configureTimeout",
        value: function configureTimeout(xmlHttpRequest) {
          var _this2 = this;
          this.canceled = false;
          this.timer = void 0;
          var timeout = this.request.timeout();
          if (timeout) {
            xmlHttpRequest.timeout = timeout;
            xmlHttpRequest.addEventListener("timeout", function() {
              _this2.canceled = true;
              _this2.timer && clearTimeout(_this2.timer);
              var error = (0, _timeoutError.createTimeoutError)("Timeout (".concat(timeout, "ms)"));
              _this2.dispatchClientError(error.message, error);
            });
            this.timer = setTimeout(function() {
              _this2.canceled = true;
              var error = (0, _timeoutError.createTimeoutError)("Timeout (".concat(timeout, "ms)"));
              _this2.dispatchClientError(error.message, error);
            }, timeout + 1);
          }
        }
      }, {
        key: "configureCallbacks",
        value: function configureCallbacks(xmlHttpRequest) {
          var _this3 = this;
          xmlHttpRequest.addEventListener("load", function() {
            if (_this3.canceled) {
              return;
            }
            _this3.timer && clearTimeout(_this3.timer);
            _this3.dispatchResponse(_this3.createResponse(xmlHttpRequest));
          });
          xmlHttpRequest.addEventListener("error", function(e) {
            if (_this3.canceled) {
              return;
            }
            _this3.timer && clearTimeout(_this3.timer);
            var guessedErrorCause = e ? e.message || e.name : xmlHttpRequest.responseText;
            var errorMessage = "Network error";
            var enhancedMessage = guessedErrorCause ? ": ".concat(guessedErrorCause) : "";
            var error = new Error("".concat(errorMessage).concat(enhancedMessage));
            _this3.dispatchClientError(errorMessage, error);
          });
          var xhrOptions = this.options().XHR;
          if (xhrOptions.withCredentials) {
            xmlHttpRequest.withCredentials = true;
          }
          if (xhrOptions.configure) {
            xhrOptions.configure(xmlHttpRequest);
          }
        }
      }, {
        key: "performRequest",
        value: function performRequest(method) {
          var requestMethod = this.shouldEmulateHTTP() ? "post" : method;
          var xmlHttpRequest = this.createXHR();
          xmlHttpRequest.open(requestMethod.toUpperCase(), this.request.url(), true);
          var customHeaders = {};
          var body = this.prepareBody(method, customHeaders);
          this.setHeaders(xmlHttpRequest, customHeaders);
          this.configureTimeout(xmlHttpRequest);
          this.configureBinary(xmlHttpRequest);
          xmlHttpRequest.send(body);
        }
      }, {
        key: "createResponse",
        value: function createResponse(xmlHttpRequest) {
          var status = xmlHttpRequest.status;
          var data = this.request.isBinary() ? xmlHttpRequest.response : xmlHttpRequest.responseText;
          var responseHeaders = (0, _utils.parseResponseHeaders)(xmlHttpRequest.getAllResponseHeaders());
          return new _response["default"](this.request, status, data, responseHeaders);
        }
      }, {
        key: "setHeaders",
        value: function setHeaders(xmlHttpRequest, customHeaders) {
          var auth = this.request.auth();
          var headers = (0, _utils.assign)(customHeaders, _objectSpread(_objectSpread({}, this.request.headers()), auth ? {
            authorization: "Basic ".concat(toBase64("".concat(auth.username, ":").concat(auth.password)))
          } : {}));
          Object.keys(headers).forEach(function(headerName) {
            xmlHttpRequest.setRequestHeader(headerName, "".concat(headers[headerName]));
          });
        }
      }, {
        key: "createXHR",
        value: function createXHR() {
          var xmlHttpRequest = new XMLHttpRequest();
          this.configureCallbacks(xmlHttpRequest);
          return xmlHttpRequest;
        }
      }]);
      return XHR2;
    }(_gateway.Gateway);
    exports2.XHR = XHR;
    var _default = XHR;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/gateway/http.js
var require_http = __commonJS({
  "node_modules/mappersmith/gateway/http.js"(exports2) {
    "use strict";
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.HTTP = void 0;
    var url = _interopRequireWildcard(require("url"));
    var http = _interopRequireWildcard(require("http"));
    var https = _interopRequireWildcard(require("https"));
    var _utils = require_utils2();
    var _gateway = require_gateway();
    var _response = _interopRequireDefault(require_response());
    var _timeoutError = require_timeout_error();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var HTTP = /* @__PURE__ */ function(_Gateway) {
      _inherits(HTTP2, _Gateway);
      var _super = _createSuper(HTTP2);
      function HTTP2() {
        var _this;
        _classCallCheck(this, HTTP2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "canceled", false);
        return _this;
      }
      _createClass(HTTP2, [{
        key: "get",
        value: function get() {
          this.performRequest("get");
        }
      }, {
        key: "head",
        value: function head() {
          this.performRequest("head");
        }
      }, {
        key: "post",
        value: function post() {
          this.performRequest("post");
        }
      }, {
        key: "put",
        value: function put() {
          this.performRequest("put");
        }
      }, {
        key: "patch",
        value: function patch() {
          this.performRequest("patch");
        }
      }, {
        key: "delete",
        value: function _delete() {
          this.performRequest("delete");
        }
      }, {
        key: "performRequest",
        value: function performRequest(method) {
          var _this2 = this;
          var headers = {};
          var defaults = url.parse(this.request.url());
          var requestMethod = this.shouldEmulateHTTP() ? "post" : method;
          var body = this.prepareBody(method, headers);
          var timeout = this.request.timeout();
          this.canceled = false;
          if (body && typeof body !== "boolean" && typeof body !== "number" && typeof body.length === "number") {
            headers["content-length"] = Buffer.byteLength(body);
          }
          var handler = defaults.protocol === "https:" ? https : http;
          var requestParams = (0, _utils.assign)(defaults, {
            method: requestMethod,
            headers: (0, _utils.assign)(headers, this.request.headers())
          });
          var auth = this.request.auth();
          if (auth) {
            var username = auth.username || "";
            var password = auth.password || "";
            requestParams["auth"] = "".concat(username, ":").concat(password);
          }
          var httpOptions = this.options().HTTP;
          if (httpOptions.useSocketConnectionTimeout) {
            requestParams["timeout"] = timeout;
          }
          if (httpOptions.configure) {
            (0, _utils.assign)(requestParams, httpOptions.configure(requestParams));
          }
          if (httpOptions.onRequestWillStart) {
            httpOptions.onRequestWillStart(requestParams);
          }
          var httpRequest = handler.request(requestParams, function(httpResponse) {
            return _this2.onResponse(httpResponse, httpOptions, requestParams);
          });
          httpRequest.on("socket", function(socket) {
            if (httpOptions.onRequestSocketAssigned) {
              httpOptions.onRequestSocketAssigned(requestParams);
            }
            socket.on("lookup", function() {
              if (httpOptions.onSocketLookup) {
                httpOptions.onSocketLookup(requestParams);
              }
            });
            socket.on("connect", function() {
              if (httpOptions.onSocketConnect) {
                httpOptions.onSocketConnect(requestParams);
              }
            });
            socket.on("secureConnect", function() {
              if (httpOptions.onSocketSecureConnect) {
                httpOptions.onSocketSecureConnect(requestParams);
              }
            });
          });
          httpRequest.on("error", function(e) {
            return _this2.onError(e);
          });
          body && httpRequest.write(body);
          if (timeout) {
            if (!httpOptions.useSocketConnectionTimeout) {
              httpRequest.setTimeout(timeout);
            }
            httpRequest.on("timeout", function() {
              _this2.canceled = true;
              httpRequest.abort();
              var error = (0, _timeoutError.createTimeoutError)("Timeout (".concat(timeout, "ms)"));
              _this2.dispatchClientError(error.message, error);
            });
          }
          httpRequest.end();
        }
      }, {
        key: "onResponse",
        value: function onResponse(httpResponse, httpOptions, requestParams) {
          var _this3 = this;
          var rawData = [];
          if (!this.request.isBinary()) {
            httpResponse.setEncoding("utf8");
          }
          httpResponse.once("readable", function() {
            if (httpOptions.onResponseReadable) {
              httpOptions.onResponseReadable(requestParams);
            }
          });
          httpResponse.on("data", function(chunk) {
            return rawData.push(chunk);
          }).on("end", function() {
            if (_this3.canceled) {
              return;
            }
            _this3.dispatchResponse(_this3.createResponse(httpResponse, rawData));
          });
          httpResponse.on("end", function() {
            if (httpOptions.onResponseEnd) {
              httpOptions.onResponseEnd(requestParams);
            }
          });
        }
      }, {
        key: "onError",
        value: function onError(e) {
          if (this.canceled) {
            return;
          }
          this.dispatchClientError(e.message, e);
        }
      }, {
        key: "createResponse",
        value: function createResponse(httpResponse, rawData) {
          var responseData = this.request.isBinary() ? Buffer.concat(rawData) : rawData.join("");
          return new _response["default"](this.request, httpResponse.statusCode, responseData, httpResponse.headers);
        }
      }]);
      return HTTP2;
    }(_gateway.Gateway);
    exports2.HTTP = HTTP;
    var _default = HTTP;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/gateway/fetch.js
var require_fetch = __commonJS({
  "node_modules/mappersmith/gateway/fetch.js"(exports2) {
    "use strict";
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = exports2.Fetch = void 0;
    var _gateway = require_gateway();
    var _response = _interopRequireDefault(require_response());
    var _mappersmith = require_mappersmith();
    var _utils = require_utils2();
    var _timeoutError = require_timeout_error();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    var Fetch = /* @__PURE__ */ function(_Gateway) {
      _inherits(Fetch2, _Gateway);
      var _super = _createSuper(Fetch2);
      function Fetch2() {
        _classCallCheck(this, Fetch2);
        return _super.apply(this, arguments);
      }
      _createClass(Fetch2, [{
        key: "get",
        value: function get() {
          this.performRequest("get");
        }
      }, {
        key: "head",
        value: function head() {
          this.performRequest("head");
        }
      }, {
        key: "post",
        value: function post() {
          this.performRequest("post");
        }
      }, {
        key: "put",
        value: function put() {
          this.performRequest("put");
        }
      }, {
        key: "patch",
        value: function patch() {
          this.performRequest("patch");
        }
      }, {
        key: "delete",
        value: function _delete() {
          this.performRequest("delete");
        }
      }, {
        key: "performRequest",
        value: function performRequest(method) {
          var _this = this;
          var fetch2 = _mappersmith.configs.fetch;
          if (!fetch2) {
            throw new Error('[Mappersmith] global fetch does not exist, please assign "configs.fetch" to a valid implementation');
          }
          var customHeaders = {};
          var body = this.prepareBody(method, customHeaders);
          var auth = this.request.auth();
          if (auth) {
            var username = auth.username || "";
            var password = auth.password || "";
            customHeaders["authorization"] = "Basic ".concat((0, _utils.btoa)("".concat(username, ":").concat(password)));
          }
          var headers = (0, _utils.assign)(customHeaders, this.request.headers());
          var requestMethod = this.shouldEmulateHTTP() ? "post" : method;
          var init = (0, _utils.assign)({
            method: requestMethod,
            headers,
            body
          }, this.options().Fetch);
          var timeout = this.request.timeout();
          var timer = null;
          var canceled = false;
          if (timeout) {
            timer = setTimeout(function() {
              canceled = true;
              var error = (0, _timeoutError.createTimeoutError)("Timeout (".concat(timeout, "ms)"));
              _this.dispatchClientError(error.message, error);
            }, timeout);
          }
          fetch2(this.request.url(), init).then(function(fetchResponse) {
            if (canceled) {
              return;
            }
            timer && clearTimeout(timer);
            var responseData;
            if (_this.request.isBinary()) {
              if (typeof fetchResponse.buffer === "function") {
                responseData = fetchResponse.buffer();
              } else {
                responseData = fetchResponse.arrayBuffer();
              }
            } else {
              responseData = fetchResponse.text();
            }
            responseData.then(function(data) {
              _this.dispatchResponse(_this.createResponse(fetchResponse, data));
            });
          })["catch"](function(error) {
            if (canceled) {
              return;
            }
            timer && clearTimeout(timer);
            _this.dispatchClientError(error.message, error);
          });
        }
      }, {
        key: "createResponse",
        value: function createResponse(fetchResponse, data) {
          var status = fetchResponse.status;
          var responseHeaders = {};
          fetchResponse.headers.forEach(function(value, key) {
            responseHeaders[key] = value;
          });
          return new _response["default"](this.request, status, data, responseHeaders);
        }
      }]);
      return Fetch2;
    }(_gateway.Gateway);
    exports2.Fetch = Fetch;
    var _default = Fetch;
    exports2["default"] = _default;
  }
});

// node_modules/mappersmith/index.js
var require_mappersmith2 = __commonJS({
  "node_modules/mappersmith/index.js"(exports, module) {
    "use strict";
    var lib = require_mappersmith();
    var _process;
    var defaultGateway;
    try {
      _process = eval('typeof __TEST_SERVICE_WORKER__ === "undefined" && typeof process === "object" ? process : undefined');
    } catch (e) {
    }
    if (typeof XMLHttpRequest !== "undefined") {
      defaultGateway = require_xhr()["default"];
    } else if (typeof _process !== "undefined") {
      defaultGateway = require_http()["default"];
    } else if (typeof self !== "undefined") {
      defaultGateway = require_fetch()["default"];
    }
    lib.configs.gateway = defaultGateway;
    module.exports = lib;
  }
});

// node_modules/mappersmith/middleware/retry/v2/index.js
var require_v2 = __commonJS({
  "node_modules/mappersmith/middleware/retry/v2/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.defaultRetryConfigs = exports2["default"] = exports2.calculateExponentialRetryTime = void 0;
    var _index = require_mappersmith2();
    var _utils = require_utils2();
    var _response = require_response();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof2(obj);
    }
    var defaultRetryConfigs = {
      headerRetryCount: "X-Mappersmith-Retry-Count",
      headerRetryTime: "X-Mappersmith-Retry-Time",
      maxRetryTimeInSecs: 5,
      initialRetryTimeInSecs: 0.1,
      factor: 0.2,
      multiplier: 2,
      retries: 5,
      validateRetry: function validateRetry(response) {
        return response.responseStatus >= 500;
      }
    };
    exports2.defaultRetryConfigs = defaultRetryConfigs;
    var _default = function _default2() {
      var customConfigs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return function RetryMiddleware() {
        return {
          request: function request(_request) {
            this.enableRetry = _request.method() === "get";
            this.inboundRequest = _request;
            return _request;
          },
          response: function response(next) {
            var retryConfigs = (0, _utils.assign)({}, defaultRetryConfigs, customConfigs);
            var inboundRequest = this.inboundRequest;
            if (!this.enableRetry) {
              return next();
            }
            if (!_index.configs.Promise) {
              return next();
            }
            if (!inboundRequest) {
              return next();
            }
            return new _index.configs.Promise(function(resolve, reject) {
              var retryTime = retryConfigs.initialRetryTimeInSecs * 1e3;
              retriableRequest(resolve, reject, next, inboundRequest)(randomFromRetryTime(retryTime, retryConfigs.factor), 0, retryConfigs);
            });
          }
        };
      };
    };
    exports2["default"] = _default;
    var retriableRequest = function retriableRequest2(resolve, reject, next, request) {
      var retry = function retry2(retryTime, retryCount, retryConfigs) {
        var nextRetryTime = calculateExponentialRetryTime(retryTime, retryConfigs);
        var shouldRetry = retryCount < retryConfigs.retries;
        var scheduleRequest = function scheduleRequest2() {
          setTimeout(function() {
            return retry2(nextRetryTime, retryCount + 1, retryConfigs);
          }, retryTime);
        };
        next().then(function(response) {
          if (shouldRetry && retryConfigs.validateRetry(response)) {
            scheduleRequest();
          } else {
            try {
              resolve(enhancedResponse(response, retryConfigs.headerRetryCount, retryCount, retryConfigs.headerRetryTime, retryTime));
            } catch (e) {
              var errorMessage = "";
              if (response instanceof Error) {
                errorMessage = response.message;
              }
              if (_typeof2(e) === "object" && e !== null && "message" in e) {
                errorMessage = e.message;
              }
              reject(new _response.Response(request, 400, errorMessage, {}, [response]));
            }
          }
        })["catch"](function(response) {
          if (shouldRetry && retryConfigs.validateRetry(response)) {
            scheduleRequest();
          } else {
            try {
              reject(enhancedResponse(response, retryConfigs.headerRetryCount, retryCount, retryConfigs.headerRetryTime, retryTime));
            } catch (e) {
              var errorMessage = "";
              if (response instanceof Error) {
                errorMessage = response.message;
              }
              if (_typeof2(e) === "object" && e !== null && "message" in e) {
                errorMessage = e.message;
              }
              reject(new _response.Response(request, 400, errorMessage, {}, [response]));
            }
          }
        });
      };
      return retry;
    };
    var calculateExponentialRetryTime = function calculateExponentialRetryTime2(retryTime, retryConfigs) {
      return Math.min(randomFromRetryTime(retryTime, retryConfigs.factor) * retryConfigs.multiplier, retryConfigs.maxRetryTimeInSecs * 1e3);
    };
    exports2.calculateExponentialRetryTime = calculateExponentialRetryTime;
    var randomFromRetryTime = function randomFromRetryTime2(retryTime, factor) {
      var delta = factor * retryTime;
      return random(retryTime - delta, retryTime + delta);
    };
    var random = function random2(min, max) {
      return Math.random() * (max - min) + min;
    };
    var enhancedResponse = function enhancedResponse2(response, headerRetryCount, retryCount, headerRetryTime, retryTime) {
      var _headers;
      return response.enhance({
        headers: (_headers = {}, _defineProperty(_headers, headerRetryCount, retryCount), _defineProperty(_headers, headerRetryTime, retryTime), _headers)
      });
    };
  }
});

// node_modules/mappersmith/middleware/basic-auth.js
var require_basic_auth = __commonJS({
  "node_modules/mappersmith/middleware/basic-auth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = void 0;
    var _utils = require_utils2();
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var _default = function _default2(authConfig) {
      return function BasicAuthMiddleware() {
        return {
          prepareRequest: function prepareRequest(next) {
            return _asyncToGenerator(function* () {
              var request = yield next();
              var auth = request.auth();
              return !auth ? request.enhance({
                auth: (0, _utils.assign)({}, authConfig)
              }) : request;
            })();
          }
        };
      };
    };
    exports2["default"] = _default;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/api/middleware/errorMiddleware.js
var require_errorMiddleware = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/api/middleware/errorMiddleware.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ResponseError = class extends Error {
      constructor(clientName, response) {
        super(`${clientName} - ${response.data().message || `Error, status ${response.status()}${response.data() ? `: ${response.data()}` : ""}`}`);
        const request = response.request();
        this.name = this.constructor.name;
        this.status = response.status();
        this.unauthorized = this.status === 401;
        this.url = `${request.method()} ${request.url()}`;
      }
    };
    var errorMiddleware = ({ clientId }) => ({
      response: (next) => new Promise((resolve, reject) => next().then(resolve).catch((response) => reject(new ResponseError(clientId, response))))
    });
    exports2.default = errorMiddleware;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/api/middleware/confluentEncoderMiddleware.js
var require_confluentEncoderMiddleware = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/api/middleware/confluentEncoderMiddleware.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var REQUEST_HEADERS = {
      "Content-Type": "application/vnd.schemaregistry.v1+json"
    };
    var updateContentType = (response) => response.enhance({
      headers: {
        "content-type": "application/json"
      }
    });
    var confluentEncoderMiddleware = () => ({
      request: (req) => {
        try {
          if (req.body()) {
            return req.enhance({
              headers: REQUEST_HEADERS,
              body: JSON.stringify(req.body())
            });
          }
        } catch (_) {
        }
        return req.enhance({ headers: REQUEST_HEADERS });
      },
      response: (next) => next().then(updateContentType).catch((response) => {
        throw updateContentType(response);
      })
    });
    exports2.default = confluentEncoderMiddleware;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/api/index.js
var require_api = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/api/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var mappersmith_1 = __importDefault(require_mappersmith2());
    var v2_1 = __importDefault(require_v2());
    var basic_auth_1 = __importDefault(require_basic_auth());
    var constants_1 = require_constants();
    var errorMiddleware_1 = __importDefault(require_errorMiddleware());
    var confluentEncoderMiddleware_1 = __importDefault(require_confluentEncoderMiddleware());
    var DEFAULT_RETRY = {
      maxRetryTimeInSecs: 5,
      initialRetryTimeInSecs: 0.1,
      factor: 0.2,
      multiplier: 2,
      retries: 3
    };
    exports2.default = ({ auth, clientId, host, retry = {}, agent }) => {
      const manifest = {
        clientId: clientId || constants_1.DEFAULT_API_CLIENT_ID,
        ignoreGlobalMiddleware: true,
        host,
        middleware: [
          confluentEncoderMiddleware_1.default,
          v2_1.default(Object.assign(DEFAULT_RETRY, retry)),
          errorMiddleware_1.default,
          ...auth ? [basic_auth_1.default(auth)] : []
        ],
        resources: {
          Schema: {
            find: {
              method: "get",
              path: "/schemas/ids/{id}"
            }
          },
          Subject: {
            all: {
              method: "get",
              path: "/subjects"
            },
            latestVersion: {
              method: "get",
              path: "/subjects/{subject}/versions/latest"
            },
            version: {
              method: "get",
              path: "/subjects/{subject}/versions/{version}"
            },
            registered: {
              method: "post",
              path: "/subjects/{subject}"
            },
            config: {
              method: "get",
              path: "/config/{subject}"
            },
            updateConfig: {
              method: "put",
              path: "/config/{subject}"
            },
            register: {
              method: "post",
              path: "/subjects/{subject}/versions"
            },
            compatible: {
              method: "post",
              path: "/compatibility/subjects/{subject}/versions/{version}",
              params: { version: "latest" }
            }
          }
        }
      };
      if (agent) {
        ;
        manifest.gatewayConfigs = {
          HTTP: {
            configure: () => ({ agent })
          }
        };
      }
      return mappersmith_1.default(manifest);
    };
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/cache.js
var require_cache = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/cache.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Cache = class {
      constructor() {
        this.getLatestRegistryId = (subject) => this.registryIdBySubject[subject];
        this.setLatestRegistryId = (subject, id) => {
          this.registryIdBySubject[subject] = id;
          return this.registryIdBySubject[subject];
        };
        this.getSchema = (registryId) => this.schemasByRegistryId[registryId];
        this.setSchema = (registryId, type, schema) => {
          this.schemasByRegistryId[registryId] = { type, schema };
          return this.schemasByRegistryId[registryId];
        };
        this.clear = () => {
          this.registryIdBySubject = {};
          this.schemasByRegistryId = {};
        };
        this.registryIdBySubject = {};
        this.schemasByRegistryId = {};
      }
    };
    exports2.default = Cache;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/errors.js
var require_errors = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ConfluentSchemaRegistryError = class extends Error {
      constructor(error) {
        super(error.message || error);
        this.name = this.constructor.name;
      }
    };
    exports2.ConfluentSchemaRegistryError = ConfluentSchemaRegistryError;
    var ConfluentSchemaRegistryArgumentError = class extends ConfluentSchemaRegistryError {
    };
    exports2.ConfluentSchemaRegistryArgumentError = ConfluentSchemaRegistryArgumentError;
    var ConfluentSchemaRegistryCompatibilityError = class extends ConfluentSchemaRegistryError {
    };
    exports2.ConfluentSchemaRegistryCompatibilityError = ConfluentSchemaRegistryCompatibilityError;
    var ConfluentSchemaRegistryInvalidSchemaError = class extends ConfluentSchemaRegistryError {
    };
    exports2.ConfluentSchemaRegistryInvalidSchemaError = ConfluentSchemaRegistryInvalidSchemaError;
    var ConfluentSchemaRegistryValidationError = class extends ConfluentSchemaRegistryError {
      constructor(error, paths) {
        super(error);
        this.paths = paths;
      }
    };
    exports2.ConfluentSchemaRegistryValidationError = ConfluentSchemaRegistryValidationError;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/@types.js
var require_types = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/@types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var SchemaType2;
    (function(SchemaType3) {
      SchemaType3["AVRO"] = "AVRO";
      SchemaType3["JSON"] = "JSON";
      SchemaType3["PROTOBUF"] = "PROTOBUF";
      SchemaType3["UNKNOWN"] = "UNKNOWN";
    })(SchemaType2 = exports2.SchemaType || (exports2.SchemaType = {}));
  }
});

// node_modules/avsc/lib/utils.js
var require_utils3 = __commonJS({
  "node_modules/avsc/lib/utils.js"(exports2, module2) {
    "use strict";
    var crypto = require("crypto");
    var util = require("util");
    var POOL = new BufferPool(4096);
    var NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
    var f = util.format;
    function newBuffer(size) {
      if (typeof Buffer.alloc == "function") {
        return Buffer.alloc(size);
      } else {
        return new Buffer(size);
      }
    }
    function bufferFrom(data, enc) {
      if (typeof Buffer.from == "function") {
        return Buffer.from(data, enc);
      } else {
        return new Buffer(data, enc);
      }
    }
    function capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    function compare(n1, n2) {
      return n1 === n2 ? 0 : n1 < n2 ? -1 : 1;
    }
    function getOption(opts, key, def) {
      var value = opts[key];
      return value === void 0 ? def : value;
    }
    function getHash(str, algorithm) {
      algorithm = algorithm || "md5";
      var hash = crypto.createHash(algorithm);
      hash.end(str);
      return hash.read();
    }
    function singleIndexOf(arr, v) {
      var pos = -1;
      var i, l;
      if (!arr) {
        return -1;
      }
      for (i = 0, l = arr.length; i < l; i++) {
        if (arr[i] === v) {
          if (pos >= 0) {
            return -2;
          }
          pos = i;
        }
      }
      return pos;
    }
    function toMap(arr, fn) {
      var obj = {};
      var i, elem;
      for (i = 0; i < arr.length; i++) {
        elem = arr[i];
        obj[fn(elem)] = elem;
      }
      return obj;
    }
    function objectValues(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    }
    function hasDuplicates(arr, fn) {
      var obj = /* @__PURE__ */ Object.create(null);
      var i, l, elem;
      for (i = 0, l = arr.length; i < l; i++) {
        elem = arr[i];
        if (fn) {
          elem = fn(elem);
        }
        if (obj[elem]) {
          return true;
        }
        obj[elem] = true;
      }
      return false;
    }
    function copyOwnProperties(src, dst, overwrite) {
      var names = Object.getOwnPropertyNames(src);
      var i, l, name;
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (!dst.hasOwnProperty(name) || overwrite) {
          var descriptor = Object.getOwnPropertyDescriptor(src, name);
          Object.defineProperty(dst, name, descriptor);
        }
      }
      return dst;
    }
    function isValidName(str) {
      return NAME_PATTERN.test(str);
    }
    function qualify(name, namespace) {
      if (~name.indexOf(".")) {
        name = name.replace(/^\./, "");
      } else if (namespace) {
        name = namespace + "." + name;
      }
      name.split(".").forEach(function(part) {
        if (!isValidName(part)) {
          throw new Error(f("invalid name: %j", name));
        }
      });
      return name;
    }
    function unqualify(name) {
      var parts = name.split(".");
      return parts[parts.length - 1];
    }
    function impliedNamespace(name) {
      var match = /^(.*)\.[^.]+$/.exec(name);
      return match ? match[1] : void 0;
    }
    function jsonEnd(str, pos) {
      pos = pos | 0;
      var c = str.charAt(pos++);
      if (/[\d-]/.test(c)) {
        while (/[eE\d.+-]/.test(str.charAt(pos))) {
          pos++;
        }
        return pos;
      } else if (/true|null/.test(str.slice(pos - 1, pos + 3))) {
        return pos + 3;
      } else if (/false/.test(str.slice(pos - 1, pos + 4))) {
        return pos + 4;
      }
      var depth = 0;
      var literal = false;
      do {
        switch (c) {
          case "{":
          case "[":
            if (!literal) {
              depth++;
            }
            break;
          case "}":
          case "]":
            if (!literal && !--depth) {
              return pos;
            }
            break;
          case '"':
            literal = !literal;
            if (!depth && !literal) {
              return pos;
            }
            break;
          case "\\":
            pos++;
        }
      } while (c = str.charAt(pos++));
      return -1;
    }
    function abstractFunction() {
      throw new Error("abstract");
    }
    function addDeprecatedGetters(obj, props) {
      var proto = obj.prototype;
      var i, l, prop, getter;
      for (i = 0, l = props.length; i < l; i++) {
        prop = props[i];
        getter = "get" + capitalize(prop);
        proto[getter] = util.deprecate(createGetter(prop), "use `." + prop + "` instead of `." + getter + "()`");
      }
      function createGetter(prop2) {
        return function() {
          var delegate = this[prop2];
          return typeof delegate == "function" ? delegate.apply(this, arguments) : delegate;
        };
      }
    }
    function BufferPool(len) {
      this._len = len | 0;
      this._pos = 0;
      this._slab = newBuffer(this._len);
    }
    BufferPool.prototype.alloc = function(len) {
      if (len < 0) {
        throw new Error("negative length");
      }
      var maxLen = this._len;
      if (len > maxLen) {
        return newBuffer(len);
      }
      if (this._pos + len > maxLen) {
        this._slab = newBuffer(maxLen);
        this._pos = 0;
      }
      return this._slab.slice(this._pos, this._pos += len);
    };
    function Lcg(seed) {
      var a = 1103515245;
      var c = 12345;
      var m = Math.pow(2, 31);
      var state = Math.floor(seed || Math.random() * (m - 1));
      this._max = m;
      this._nextInt = function() {
        return state = (a * state + c) % m;
      };
    }
    Lcg.prototype.nextBoolean = function() {
      return !!(this._nextInt() % 2);
    };
    Lcg.prototype.nextInt = function(start, end) {
      if (end === void 0) {
        end = start;
        start = 0;
      }
      end = end === void 0 ? this._max : end;
      return start + Math.floor(this.nextFloat() * (end - start));
    };
    Lcg.prototype.nextFloat = function(start, end) {
      if (end === void 0) {
        end = start;
        start = 0;
      }
      end = end === void 0 ? 1 : end;
      return start + (end - start) * this._nextInt() / this._max;
    };
    Lcg.prototype.nextString = function(len, flags) {
      len |= 0;
      flags = flags || "aA";
      var mask = "";
      if (flags.indexOf("a") > -1) {
        mask += "abcdefghijklmnopqrstuvwxyz";
      }
      if (flags.indexOf("A") > -1) {
        mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (flags.indexOf("#") > -1) {
        mask += "0123456789";
      }
      if (flags.indexOf("!") > -1) {
        mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
      }
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(this.choice(mask));
      }
      return result.join("");
    };
    Lcg.prototype.nextBuffer = function(len) {
      var arr = [];
      var i;
      for (i = 0; i < len; i++) {
        arr.push(this.nextInt(256));
      }
      return bufferFrom(arr);
    };
    Lcg.prototype.choice = function(arr) {
      var len = arr.length;
      if (!len) {
        throw new Error("choosing from empty array");
      }
      return arr[this.nextInt(len)];
    };
    function OrderedQueue() {
      this._index = 0;
      this._items = [];
    }
    OrderedQueue.prototype.push = function(item) {
      var items = this._items;
      var i = items.length | 0;
      var j;
      items.push(item);
      while (i > 0 && items[i].index < items[j = i - 1 >> 1].index) {
        item = items[i];
        items[i] = items[j];
        items[j] = item;
        i = j;
      }
    };
    OrderedQueue.prototype.pop = function() {
      var items = this._items;
      var len = items.length - 1 | 0;
      var first = items[0];
      if (!first || first.index > this._index) {
        return null;
      }
      this._index++;
      if (!len) {
        items.pop();
        return first;
      }
      items[0] = items.pop();
      var mid = len >> 1;
      var i = 0;
      var i1, i2, j, item, c, c1, c2;
      while (i < mid) {
        item = items[i];
        i1 = (i << 1) + 1;
        i2 = i + 1 << 1;
        c1 = items[i1];
        c2 = items[i2];
        if (!c2 || c1.index <= c2.index) {
          c = c1;
          j = i1;
        } else {
          c = c2;
          j = i2;
        }
        if (c.index >= item.index) {
          break;
        }
        items[j] = item;
        items[i] = c;
        i = j;
      }
      return first;
    };
    function Tap(buf, pos) {
      this.buf = buf;
      this.pos = pos | 0;
      if (this.pos < 0) {
        throw new Error("negative offset");
      }
    }
    Tap.prototype.isValid = function() {
      return this.pos <= this.buf.length;
    };
    Tap.prototype._invalidate = function() {
      this.pos = this.buf.length + 1;
    };
    Tap.prototype.readBoolean = function() {
      return !!this.buf[this.pos++];
    };
    Tap.prototype.skipBoolean = function() {
      this.pos++;
    };
    Tap.prototype.writeBoolean = function(b) {
      this.buf[this.pos++] = !!b;
    };
    Tap.prototype.readInt = Tap.prototype.readLong = function() {
      var n = 0;
      var k = 0;
      var buf = this.buf;
      var b, h, f2, fk;
      do {
        b = buf[this.pos++];
        h = b & 128;
        n |= (b & 127) << k;
        k += 7;
      } while (h && k < 28);
      if (h) {
        f2 = n;
        fk = 268435456;
        do {
          b = buf[this.pos++];
          f2 += (b & 127) * fk;
          fk *= 128;
        } while (b & 128);
        return (f2 % 2 ? -(f2 + 1) : f2) / 2;
      }
      return n >> 1 ^ -(n & 1);
    };
    Tap.prototype.skipInt = Tap.prototype.skipLong = function() {
      var buf = this.buf;
      while (buf[this.pos++] & 128) {
      }
    };
    Tap.prototype.writeInt = Tap.prototype.writeLong = function(n) {
      var buf = this.buf;
      var f2, m;
      if (n >= -1073741824 && n < 1073741824) {
        m = n >= 0 ? n << 1 : ~n << 1 | 1;
        do {
          buf[this.pos] = m & 127;
          m >>= 7;
        } while (m && (buf[this.pos++] |= 128));
      } else {
        f2 = n >= 0 ? n * 2 : -n * 2 - 1;
        do {
          buf[this.pos] = f2 & 127;
          f2 /= 128;
        } while (f2 >= 1 && (buf[this.pos++] |= 128));
      }
      this.pos++;
    };
    Tap.prototype.readFloat = function() {
      var buf = this.buf;
      var pos = this.pos;
      this.pos += 4;
      if (this.pos > buf.length) {
        return 0;
      }
      return this.buf.readFloatLE(pos);
    };
    Tap.prototype.skipFloat = function() {
      this.pos += 4;
    };
    Tap.prototype.writeFloat = function(f2) {
      var buf = this.buf;
      var pos = this.pos;
      this.pos += 4;
      if (this.pos > buf.length) {
        return;
      }
      return this.buf.writeFloatLE(f2, pos);
    };
    Tap.prototype.readDouble = function() {
      var buf = this.buf;
      var pos = this.pos;
      this.pos += 8;
      if (this.pos > buf.length) {
        return 0;
      }
      return this.buf.readDoubleLE(pos);
    };
    Tap.prototype.skipDouble = function() {
      this.pos += 8;
    };
    Tap.prototype.writeDouble = function(d) {
      var buf = this.buf;
      var pos = this.pos;
      this.pos += 8;
      if (this.pos > buf.length) {
        return;
      }
      return this.buf.writeDoubleLE(d, pos);
    };
    Tap.prototype.readFixed = function(len) {
      var pos = this.pos;
      this.pos += len;
      if (this.pos > this.buf.length) {
        return;
      }
      var fixed = POOL.alloc(len);
      this.buf.copy(fixed, 0, pos, pos + len);
      return fixed;
    };
    Tap.prototype.skipFixed = function(len) {
      this.pos += len;
    };
    Tap.prototype.writeFixed = function(buf, len) {
      len = len || buf.length;
      var pos = this.pos;
      this.pos += len;
      if (this.pos > this.buf.length) {
        return;
      }
      buf.copy(this.buf, pos, 0, len);
    };
    Tap.prototype.readBytes = function() {
      var len = this.readLong();
      if (len < 0) {
        this._invalidate();
        return;
      }
      return this.readFixed(len);
    };
    Tap.prototype.skipBytes = function() {
      var len = this.readLong();
      if (len < 0) {
        this._invalidate();
        return;
      }
      this.pos += len;
    };
    Tap.prototype.writeBytes = function(buf) {
      var len = buf.length;
      this.writeLong(len);
      this.writeFixed(buf, len);
    };
    if (typeof Buffer.prototype.utf8Slice == "function") {
      Tap.prototype.readString = function() {
        var len = this.readLong();
        if (len < 0) {
          this._invalidate();
          return "";
        }
        var pos = this.pos;
        var buf = this.buf;
        this.pos += len;
        if (this.pos > buf.length) {
          return;
        }
        return this.buf.utf8Slice(pos, pos + len);
      };
    } else {
      Tap.prototype.readString = function() {
        var len = this.readLong();
        if (len < 0) {
          this._invalidate();
          return "";
        }
        var pos = this.pos;
        var buf = this.buf;
        this.pos += len;
        if (this.pos > buf.length) {
          return;
        }
        return this.buf.slice(pos, pos + len).toString();
      };
    }
    Tap.prototype.skipString = function() {
      var len = this.readLong();
      if (len < 0) {
        this._invalidate();
        return;
      }
      this.pos += len;
    };
    Tap.prototype.writeString = function(s) {
      var len = Buffer.byteLength(s);
      var buf = this.buf;
      this.writeLong(len);
      var pos = this.pos;
      this.pos += len;
      if (this.pos > buf.length) {
        return;
      }
      if (len > 64 && typeof Buffer.prototype.utf8Write == "function") {
        buf.utf8Write(s, pos, len);
      } else {
        var i, l, c1, c2;
        for (i = 0, l = len; i < l; i++) {
          c1 = s.charCodeAt(i);
          if (c1 < 128) {
            buf[pos++] = c1;
          } else if (c1 < 2048) {
            buf[pos++] = c1 >> 6 | 192;
            buf[pos++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = s.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            i++;
            buf[pos++] = c1 >> 18 | 240;
            buf[pos++] = c1 >> 12 & 63 | 128;
            buf[pos++] = c1 >> 6 & 63 | 128;
            buf[pos++] = c1 & 63 | 128;
          } else {
            buf[pos++] = c1 >> 12 | 224;
            buf[pos++] = c1 >> 6 & 63 | 128;
            buf[pos++] = c1 & 63 | 128;
          }
        }
      }
    };
    if (typeof Buffer.prototype.latin1Write == "function") {
      Tap.prototype.writeBinary = function(str, len) {
        var pos = this.pos;
        this.pos += len;
        if (this.pos > this.buf.length) {
          return;
        }
        this.buf.latin1Write(str, pos, len);
      };
    } else if (typeof Buffer.prototype.binaryWrite == "function") {
      Tap.prototype.writeBinary = function(str, len) {
        var pos = this.pos;
        this.pos += len;
        if (this.pos > this.buf.length) {
          return;
        }
        this.buf.binaryWrite(str, pos, len);
      };
    } else {
      Tap.prototype.writeBinary = function(s, len) {
        var pos = this.pos;
        this.pos += len;
        if (this.pos > this.buf.length) {
          return;
        }
        this.buf.write(s, pos, len, "binary");
      };
    }
    Tap.prototype.matchBoolean = function(tap) {
      return this.buf[this.pos++] - tap.buf[tap.pos++];
    };
    Tap.prototype.matchInt = Tap.prototype.matchLong = function(tap) {
      var n1 = this.readLong();
      var n2 = tap.readLong();
      return n1 === n2 ? 0 : n1 < n2 ? -1 : 1;
    };
    Tap.prototype.matchFloat = function(tap) {
      var n1 = this.readFloat();
      var n2 = tap.readFloat();
      return n1 === n2 ? 0 : n1 < n2 ? -1 : 1;
    };
    Tap.prototype.matchDouble = function(tap) {
      var n1 = this.readDouble();
      var n2 = tap.readDouble();
      return n1 === n2 ? 0 : n1 < n2 ? -1 : 1;
    };
    Tap.prototype.matchFixed = function(tap, len) {
      return this.readFixed(len).compare(tap.readFixed(len));
    };
    Tap.prototype.matchBytes = Tap.prototype.matchString = function(tap) {
      var l1 = this.readLong();
      var p1 = this.pos;
      this.pos += l1;
      var l2 = tap.readLong();
      var p2 = tap.pos;
      tap.pos += l2;
      var b1 = this.buf.slice(p1, this.pos);
      var b2 = tap.buf.slice(p2, tap.pos);
      return b1.compare(b2);
    };
    Tap.prototype.unpackLongBytes = function() {
      var res = newBuffer(8);
      var n = 0;
      var i = 0;
      var j = 6;
      var buf = this.buf;
      var b, neg;
      b = buf[this.pos++];
      neg = b & 1;
      res.fill(0);
      n |= (b & 127) >> 1;
      while (b & 128) {
        b = buf[this.pos++];
        n |= (b & 127) << j;
        j += 7;
        if (j >= 8) {
          j -= 8;
          res[i++] = n;
          n >>= 8;
        }
      }
      res[i] = n;
      if (neg) {
        invert(res, 8);
      }
      return res;
    };
    Tap.prototype.packLongBytes = function(buf) {
      var neg = (buf[7] & 128) >> 7;
      var res = this.buf;
      var j = 1;
      var k = 0;
      var m = 3;
      var n;
      if (neg) {
        invert(buf, 8);
        n = 1;
      } else {
        n = 0;
      }
      var parts = [
        buf.readUIntLE(0, 3),
        buf.readUIntLE(3, 3),
        buf.readUIntLE(6, 2)
      ];
      while (m && !parts[--m]) {
      }
      while (k < m) {
        n |= parts[k++] << j;
        j += 24;
        while (j > 7) {
          res[this.pos++] = n & 127 | 128;
          n >>= 7;
          j -= 7;
        }
      }
      n |= parts[m] << j;
      do {
        res[this.pos] = n & 127;
        n >>= 7;
      } while (n && (res[this.pos++] |= 128));
      this.pos++;
      if (neg) {
        invert(buf, 8);
      }
    };
    function invert(buf, len) {
      while (len--) {
        buf[len] = ~buf[len];
      }
    }
    module2.exports = {
      abstractFunction,
      addDeprecatedGetters,
      bufferFrom,
      capitalize,
      copyOwnProperties,
      getHash,
      compare,
      getOption,
      impliedNamespace,
      isValidName,
      jsonEnd,
      newBuffer,
      objectValues,
      qualify,
      toMap,
      singleIndexOf,
      hasDuplicates,
      unqualify,
      BufferPool,
      Lcg,
      OrderedQueue,
      Tap
    };
  }
});

// node_modules/avsc/lib/types.js
var require_types2 = __commonJS({
  "node_modules/avsc/lib/types.js"(exports2, module2) {
    "use strict";
    var utils = require_utils3();
    var buffer = require("buffer");
    var util = require("util");
    var Tap = utils.Tap;
    var debug = util.debuglog("avsc:types");
    var f = util.format;
    var TYPES = {
      "array": ArrayType,
      "boolean": BooleanType,
      "bytes": BytesType,
      "double": DoubleType,
      "enum": EnumType,
      "error": RecordType,
      "fixed": FixedType,
      "float": FloatType,
      "int": IntType,
      "long": LongType,
      "map": MapType,
      "null": NullType,
      "record": RecordType,
      "string": StringType
    };
    var RANDOM = new utils.Lcg();
    var TAP = new Tap(new buffer.SlowBuffer(1024));
    var LOGICAL_TYPE = null;
    var UNDERLYING_TYPES = [];
    function Type(schema, opts) {
      var type;
      if (LOGICAL_TYPE) {
        type = LOGICAL_TYPE;
        UNDERLYING_TYPES.push([LOGICAL_TYPE, this]);
        LOGICAL_TYPE = null;
      } else {
        type = this;
      }
      this._hash = new Hash();
      this.name = void 0;
      this.aliases = void 0;
      this.doc = schema && schema.doc ? "" + schema.doc : void 0;
      if (schema) {
        var name = schema.name;
        var namespace = schema.namespace === void 0 ? opts && opts.namespace : schema.namespace;
        if (name !== void 0) {
          name = maybeQualify(name, namespace);
          if (isPrimitive(name)) {
            throw new Error(f("cannot rename primitive type: %j", name));
          }
          var registry = opts && opts.registry;
          if (registry) {
            if (registry[name] !== void 0) {
              throw new Error(f("duplicate type name: %s", name));
            }
            registry[name] = type;
          }
        } else if (opts && opts.noAnonymousTypes) {
          throw new Error(f("missing name property in schema: %j", schema));
        }
        this.name = name;
        this.aliases = schema.aliases ? schema.aliases.map(function(s) {
          return maybeQualify(s, namespace);
        }) : [];
      }
    }
    Type.forSchema = function(schema, opts) {
      opts = opts || {};
      opts.registry = opts.registry || {};
      var UnionType2 = function(wrapUnions) {
        if (wrapUnions === true) {
          wrapUnions = "always";
        } else if (wrapUnions === false) {
          wrapUnions = "never";
        } else if (wrapUnions === void 0) {
          wrapUnions = "auto";
        } else if (typeof wrapUnions == "string") {
          wrapUnions = wrapUnions.toLowerCase();
        }
        switch (wrapUnions) {
          case "always":
            return WrappedUnionType;
          case "never":
            return UnwrappedUnionType;
          case "auto":
            return void 0;
          default:
            throw new Error(f("invalid wrap unions option: %j", wrapUnions));
        }
      }(opts.wrapUnions);
      if (schema === null) {
        throw new Error('invalid type: null (did you mean "null"?)');
      }
      if (Type.isType(schema)) {
        return schema;
      }
      var type;
      if (opts.typeHook && (type = opts.typeHook(schema, opts))) {
        if (!Type.isType(type)) {
          throw new Error(f("invalid typehook return value: %j", type));
        }
        return type;
      }
      if (typeof schema == "string") {
        schema = maybeQualify(schema, opts.namespace);
        type = opts.registry[schema];
        if (type) {
          return type;
        }
        if (isPrimitive(schema)) {
          return opts.registry[schema] = Type.forSchema({ type: schema }, opts);
        }
        throw new Error(f("undefined type name: %s", schema));
      }
      if (schema.logicalType && opts.logicalTypes && !LOGICAL_TYPE) {
        var DerivedType = opts.logicalTypes[schema.logicalType];
        if (DerivedType) {
          var namespace = opts.namespace;
          var registry = {};
          Object.keys(opts.registry).forEach(function(key) {
            registry[key] = opts.registry[key];
          });
          try {
            debug("instantiating logical type for %s", schema.logicalType);
            return new DerivedType(schema, opts);
          } catch (err) {
            debug("failed to instantiate logical type for %s", schema.logicalType);
            if (opts.assertLogicalTypes) {
              throw err;
            }
            LOGICAL_TYPE = null;
            opts.namespace = namespace;
            opts.registry = registry;
          }
        }
      }
      if (Array.isArray(schema)) {
        var logicalType = LOGICAL_TYPE;
        LOGICAL_TYPE = null;
        var types = schema.map(function(obj) {
          return Type.forSchema(obj, opts);
        });
        if (!UnionType2) {
          UnionType2 = isAmbiguous(types) ? WrappedUnionType : UnwrappedUnionType;
        }
        LOGICAL_TYPE = logicalType;
        type = new UnionType2(types, opts);
      } else {
        type = function(typeName) {
          var Type2 = TYPES[typeName];
          if (Type2 === void 0) {
            throw new Error(f("unknown type: %j", typeName));
          }
          return new Type2(schema, opts);
        }(schema.type);
      }
      return type;
    };
    Type.forValue = function(val, opts) {
      opts = opts || {};
      opts.emptyArrayType = opts.emptyArrayType || Type.forSchema({
        type: "array",
        items: "null"
      });
      if (opts.valueHook) {
        var type = opts.valueHook(val, opts);
        if (type !== void 0) {
          if (!Type.isType(type)) {
            throw new Error(f("invalid value hook return value: %j", type));
          }
          return type;
        }
      }
      switch (typeof val) {
        case "string":
          return Type.forSchema("string", opts);
        case "boolean":
          return Type.forSchema("boolean", opts);
        case "number":
          if ((val | 0) === val) {
            return Type.forSchema("int", opts);
          } else if (Math.abs(val) < 9007199254740991) {
            return Type.forSchema("float", opts);
          }
          return Type.forSchema("double", opts);
        case "object":
          if (val === null) {
            return Type.forSchema("null", opts);
          } else if (Array.isArray(val)) {
            if (!val.length) {
              return opts.emptyArrayType;
            }
            return Type.forSchema({
              type: "array",
              items: Type.forTypes(val.map(function(v) {
                return Type.forValue(v, opts);
              }), opts)
            }, opts);
          } else if (Buffer.isBuffer(val)) {
            return Type.forSchema("bytes", opts);
          }
          var fieldNames = Object.keys(val);
          if (fieldNames.some(function(s) {
            return !utils.isValidName(s);
          })) {
            return Type.forSchema({
              type: "map",
              values: Type.forTypes(fieldNames.map(function(s) {
                return Type.forValue(val[s], opts);
              }), opts)
            }, opts);
          }
          return Type.forSchema({
            type: "record",
            fields: fieldNames.map(function(s) {
              return { name: s, type: Type.forValue(val[s], opts) };
            })
          }, opts);
        default:
          throw new Error(f("cannot infer type from: %j", val));
      }
    };
    Type.forTypes = function(types, opts) {
      if (!types.length) {
        throw new Error("no types to combine");
      }
      if (types.length === 1) {
        return types[0];
      }
      opts = opts || {};
      var expanded = [];
      var numWrappedUnions = 0;
      var isValidWrappedUnion = true;
      types.forEach(function(type) {
        switch (type.typeName) {
          case "union:unwrapped":
            isValidWrappedUnion = false;
            expanded = expanded.concat(type.types);
            break;
          case "union:wrapped":
            numWrappedUnions++;
            expanded = expanded.concat(type.types);
            break;
          case "null":
            expanded.push(type);
            break;
          default:
            isValidWrappedUnion = false;
            expanded.push(type);
        }
      });
      if (numWrappedUnions) {
        if (!isValidWrappedUnion) {
          throw new Error("cannot combine wrapped union");
        }
        var branchTypes = {};
        expanded.forEach(function(type) {
          var name = type.branchName;
          var branchType = branchTypes[name];
          if (!branchType) {
            branchTypes[name] = type;
          } else if (!type.equals(branchType)) {
            throw new Error("inconsistent branch type");
          }
        });
        var wrapUnions = opts.wrapUnions;
        var unionType;
        opts.wrapUnions = true;
        try {
          unionType = Type.forSchema(Object.keys(branchTypes).map(function(name) {
            return branchTypes[name];
          }), opts);
        } catch (err) {
          opts.wrapUnions = wrapUnions;
          throw err;
        }
        opts.wrapUnions = wrapUnions;
        return unionType;
      }
      var bucketized = {};
      expanded.forEach(function(type) {
        var bucket = getTypeBucket(type);
        var bucketTypes = bucketized[bucket];
        if (!bucketTypes) {
          bucketized[bucket] = bucketTypes = [];
        }
        bucketTypes.push(type);
      });
      var buckets = Object.keys(bucketized);
      var augmented = buckets.map(function(bucket) {
        var bucketTypes = bucketized[bucket];
        if (bucketTypes.length === 1) {
          return bucketTypes[0];
        } else {
          switch (bucket) {
            case "null":
            case "boolean":
              return bucketTypes[0];
            case "number":
              return combineNumbers(bucketTypes);
            case "string":
              return combineStrings(bucketTypes, opts);
            case "buffer":
              return combineBuffers(bucketTypes, opts);
            case "array":
              bucketTypes = bucketTypes.filter(function(t) {
                return t !== opts.emptyArrayType;
              });
              if (!bucketTypes.length) {
                return opts.emptyArrayType;
              }
              return Type.forSchema({
                type: "array",
                items: Type.forTypes(bucketTypes.map(function(t) {
                  return t.itemsType;
                }), opts)
              }, opts);
            default:
              return combineObjects(bucketTypes, opts);
          }
        }
      });
      if (augmented.length === 1) {
        return augmented[0];
      } else {
        return Type.forSchema(augmented, opts);
      }
    };
    Type.isType = function() {
      var l = arguments.length;
      if (!l) {
        return false;
      }
      var any = arguments[0];
      if (!any || typeof any._update != "function" || typeof any.fingerprint != "function") {
        return false;
      }
      if (l === 1) {
        return true;
      }
      var typeName = any.typeName;
      var i;
      for (i = 1; i < l; i++) {
        if (typeName.indexOf(arguments[i]) === 0) {
          return true;
        }
      }
      return false;
    };
    Type.__reset = function(size) {
      debug("resetting type buffer to %d", size);
      TAP.buf = new buffer.SlowBuffer(size);
    };
    Object.defineProperty(Type.prototype, "branchName", {
      enumerable: true,
      get: function() {
        var type = Type.isType(this, "logical") ? this.underlyingType : this;
        if (type.name) {
          return type.name;
        }
        if (Type.isType(type, "abstract")) {
          return type._concreteTypeName;
        }
        return Type.isType(type, "union") ? void 0 : type.typeName;
      }
    });
    Type.prototype.clone = function(val, opts) {
      if (opts) {
        opts = {
          coerce: !!opts.coerceBuffers | 0,
          fieldHook: opts.fieldHook,
          qualifyNames: !!opts.qualifyNames,
          skip: !!opts.skipMissingFields,
          wrap: !!opts.wrapUnions | 0
        };
        return this._copy(val, opts);
      } else {
        return this.fromBuffer(this.toBuffer(val));
      }
    };
    Type.prototype.compare = utils.abstractFunction;
    Type.prototype.compareBuffers = function(buf1, buf2) {
      return this._match(new Tap(buf1), new Tap(buf2));
    };
    Type.prototype.createResolver = function(type, opts) {
      if (!Type.isType(type)) {
        throw new Error(f("not a type: %j", type));
      }
      if (!Type.isType(this, "union", "logical") && Type.isType(type, "logical")) {
        return this.createResolver(type.underlyingType, opts);
      }
      opts = opts || {};
      opts.registry = opts.registry || {};
      var resolver, key;
      if (Type.isType(this, "record", "error") && Type.isType(type, "record", "error")) {
        key = this.name + ":" + type.name;
        resolver = opts.registry[key];
        if (resolver) {
          return resolver;
        }
      }
      resolver = new Resolver(this);
      if (key) {
        opts.registry[key] = resolver;
      }
      if (Type.isType(type, "union")) {
        var resolvers = type.types.map(function(t) {
          return this.createResolver(t, opts);
        }, this);
        resolver._read = function(tap) {
          var index = tap.readLong();
          var resolver2 = resolvers[index];
          if (resolver2 === void 0) {
            throw new Error(f("invalid union index: %s", index));
          }
          return resolvers[index]._read(tap);
        };
      } else {
        this._update(resolver, type, opts);
      }
      if (!resolver._read) {
        throw new Error(f("cannot read %s as %s", type, this));
      }
      return Object.freeze(resolver);
    };
    Type.prototype.decode = function(buf, pos, resolver) {
      var tap = new Tap(buf, pos);
      var val = readValue(this, tap, resolver);
      if (!tap.isValid()) {
        return { value: void 0, offset: -1 };
      }
      return { value: val, offset: tap.pos };
    };
    Type.prototype.encode = function(val, buf, pos) {
      var tap = new Tap(buf, pos);
      this._write(tap, val);
      if (!tap.isValid()) {
        return buf.length - tap.pos;
      }
      return tap.pos;
    };
    Type.prototype.equals = function(type, opts) {
      var canon = Type.isType(type) && this.fingerprint().equals(type.fingerprint());
      if (!canon || !(opts && opts.strict)) {
        return canon;
      }
      return JSON.stringify(this.schema({ exportAttrs: true })) === JSON.stringify(type.schema({ exportAttrs: true }));
    };
    Type.prototype.fingerprint = function(algorithm) {
      if (!algorithm) {
        if (!this._hash.str) {
          var schemaStr = JSON.stringify(this.schema());
          this._hash.str = utils.getHash(schemaStr).toString("binary");
        }
        return utils.bufferFrom(this._hash.str, "binary");
      } else {
        return utils.getHash(JSON.stringify(this.schema()), algorithm);
      }
    };
    Type.prototype.fromBuffer = function(buf, resolver, noCheck) {
      var tap = new Tap(buf);
      var val = readValue(this, tap, resolver, noCheck);
      if (!tap.isValid()) {
        throw new Error("truncated buffer");
      }
      if (!noCheck && tap.pos < buf.length) {
        throw new Error("trailing data");
      }
      return val;
    };
    Type.prototype.fromString = function(str) {
      return this._copy(JSON.parse(str), { coerce: 2 });
    };
    Type.prototype.inspect = function() {
      var typeName = this.typeName;
      var className = getClassName(typeName);
      if (isPrimitive(typeName)) {
        return f("<%s>", className);
      } else {
        var obj = this.schema({ exportAttrs: true, noDeref: true });
        if (typeof obj == "object" && !Type.isType(this, "logical")) {
          obj.type = void 0;
        }
        return f("<%s %j>", className, obj);
      }
    };
    Type.prototype.isValid = function(val, opts) {
      var flags = (opts && opts.noUndeclaredFields) | 0;
      var errorHook = opts && opts.errorHook;
      var hook, path;
      if (errorHook) {
        path = [];
        hook = function(any, type) {
          errorHook.call(this, path.slice(), any, type, val);
        };
      }
      return this._check(val, flags, hook, path);
    };
    Type.prototype.random = utils.abstractFunction;
    Type.prototype.schema = function(opts) {
      return this._attrs({
        exportAttrs: !!(opts && opts.exportAttrs),
        noDeref: !!(opts && opts.noDeref)
      });
    };
    Type.prototype.toBuffer = function(val) {
      TAP.pos = 0;
      this._write(TAP, val);
      var buf = utils.newBuffer(TAP.pos);
      if (TAP.isValid()) {
        TAP.buf.copy(buf, 0, 0, TAP.pos);
      } else {
        this._write(new Tap(buf), val);
      }
      return buf;
    };
    Type.prototype.toJSON = function() {
      return this.schema({ exportAttrs: true });
    };
    Type.prototype.toString = function(val) {
      if (val === void 0) {
        return JSON.stringify(this.schema({ noDeref: true }));
      }
      return JSON.stringify(this._copy(val, { coerce: 3 }));
    };
    Type.prototype.wrap = function(val) {
      var Branch = this._branchConstructor;
      return Branch === null ? null : new Branch(val);
    };
    Type.prototype._attrs = function(opts) {
      opts.derefed = opts.derefed || {};
      var name = this.name;
      if (name !== void 0) {
        if (opts.noDeref || opts.derefed[name]) {
          return name;
        }
        opts.derefed[name] = true;
      }
      var schema = {};
      if (this.name !== void 0) {
        schema.name = name;
      }
      schema.type = this.typeName;
      var derefedSchema = this._deref(schema, opts);
      if (derefedSchema !== void 0) {
        schema = derefedSchema;
      }
      if (opts.exportAttrs) {
        if (this.aliases && this.aliases.length) {
          schema.aliases = this.aliases;
        }
        if (this.doc !== void 0) {
          schema.doc = this.doc;
        }
      }
      return schema;
    };
    Type.prototype._createBranchConstructor = function() {
      var name = this.branchName;
      if (name === "null") {
        return null;
      }
      var attr = ~name.indexOf(".") ? "this['" + name + "']" : "this." + name;
      var body = "return function Branch$(val) { " + attr + " = val; };";
      var Branch = new Function(body)();
      Branch.type = this;
      Branch.prototype.unwrap = new Function("return " + attr + ";");
      Branch.prototype.unwrapped = Branch.prototype.unwrap;
      return Branch;
    };
    Type.prototype._peek = function(tap) {
      var pos = tap.pos;
      var val = this._read(tap);
      tap.pos = pos;
      return val;
    };
    Type.prototype._check = utils.abstractFunction;
    Type.prototype._copy = utils.abstractFunction;
    Type.prototype._deref = utils.abstractFunction;
    Type.prototype._match = utils.abstractFunction;
    Type.prototype._read = utils.abstractFunction;
    Type.prototype._skip = utils.abstractFunction;
    Type.prototype._update = utils.abstractFunction;
    Type.prototype._write = utils.abstractFunction;
    Type.prototype.getAliases = function() {
      return this.aliases;
    };
    Type.prototype.getFingerprint = Type.prototype.fingerprint;
    Type.prototype.getName = function(asBranch) {
      return this.name || !asBranch ? this.name : this.branchName;
    };
    Type.prototype.getSchema = Type.prototype.schema;
    Type.prototype.getTypeName = function() {
      return this.typeName;
    };
    function PrimitiveType(noFreeze) {
      Type.call(this);
      this._branchConstructor = this._createBranchConstructor();
      if (!noFreeze) {
        Object.freeze(this);
      }
    }
    util.inherits(PrimitiveType, Type);
    PrimitiveType.prototype._update = function(resolver, type) {
      if (type.typeName === this.typeName) {
        resolver._read = this._read;
      }
    };
    PrimitiveType.prototype._copy = function(val) {
      this._check(val, void 0, throwInvalidError);
      return val;
    };
    PrimitiveType.prototype._deref = function() {
      return this.typeName;
    };
    PrimitiveType.prototype.compare = utils.compare;
    function NullType() {
      PrimitiveType.call(this);
    }
    util.inherits(NullType, PrimitiveType);
    NullType.prototype._check = function(val, flags, hook) {
      var b = val === null;
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    NullType.prototype._read = function() {
      return null;
    };
    NullType.prototype._skip = function() {
    };
    NullType.prototype._write = function(tap, val) {
      if (val !== null) {
        throwInvalidError(val, this);
      }
    };
    NullType.prototype._match = function() {
      return 0;
    };
    NullType.prototype.compare = NullType.prototype._match;
    NullType.prototype.typeName = "null";
    NullType.prototype.random = NullType.prototype._read;
    function BooleanType() {
      PrimitiveType.call(this);
    }
    util.inherits(BooleanType, PrimitiveType);
    BooleanType.prototype._check = function(val, flags, hook) {
      var b = typeof val == "boolean";
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    BooleanType.prototype._read = function(tap) {
      return tap.readBoolean();
    };
    BooleanType.prototype._skip = function(tap) {
      tap.skipBoolean();
    };
    BooleanType.prototype._write = function(tap, val) {
      if (typeof val != "boolean") {
        throwInvalidError(val, this);
      }
      tap.writeBoolean(val);
    };
    BooleanType.prototype._match = function(tap1, tap2) {
      return tap1.matchBoolean(tap2);
    };
    BooleanType.prototype.typeName = "boolean";
    BooleanType.prototype.random = function() {
      return RANDOM.nextBoolean();
    };
    function IntType() {
      PrimitiveType.call(this);
    }
    util.inherits(IntType, PrimitiveType);
    IntType.prototype._check = function(val, flags, hook) {
      var b = val === (val | 0);
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    IntType.prototype._read = function(tap) {
      return tap.readInt();
    };
    IntType.prototype._skip = function(tap) {
      tap.skipInt();
    };
    IntType.prototype._write = function(tap, val) {
      if (val !== (val | 0)) {
        throwInvalidError(val, this);
      }
      tap.writeInt(val);
    };
    IntType.prototype._match = function(tap1, tap2) {
      return tap1.matchInt(tap2);
    };
    IntType.prototype.typeName = "int";
    IntType.prototype.random = function() {
      return RANDOM.nextInt(1e3) | 0;
    };
    function LongType() {
      PrimitiveType.call(this);
    }
    util.inherits(LongType, PrimitiveType);
    LongType.prototype._check = function(val, flags, hook) {
      var b = typeof val == "number" && val % 1 === 0 && isSafeLong(val);
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    LongType.prototype._read = function(tap) {
      var n = tap.readLong();
      if (!isSafeLong(n)) {
        throw new Error("potential precision loss");
      }
      return n;
    };
    LongType.prototype._skip = function(tap) {
      tap.skipLong();
    };
    LongType.prototype._write = function(tap, val) {
      if (typeof val != "number" || val % 1 || !isSafeLong(val)) {
        throwInvalidError(val, this);
      }
      tap.writeLong(val);
    };
    LongType.prototype._match = function(tap1, tap2) {
      return tap1.matchLong(tap2);
    };
    LongType.prototype._update = function(resolver, type) {
      switch (type.typeName) {
        case "int":
          resolver._read = type._read;
          break;
        case "abstract:long":
        case "long":
          resolver._read = this._read;
      }
    };
    LongType.prototype.typeName = "long";
    LongType.prototype.random = function() {
      return RANDOM.nextInt();
    };
    LongType.__with = function(methods, noUnpack) {
      methods = methods || {};
      var mapping = {
        toBuffer: "_toBuffer",
        fromBuffer: "_fromBuffer",
        fromJSON: "_fromJSON",
        toJSON: "_toJSON",
        isValid: "_isValid",
        compare: "compare"
      };
      var type = new AbstractLongType(noUnpack);
      Object.keys(mapping).forEach(function(name) {
        if (methods[name] === void 0) {
          throw new Error(f("missing method implementation: %s", name));
        }
        type[mapping[name]] = methods[name];
      });
      return Object.freeze(type);
    };
    function FloatType() {
      PrimitiveType.call(this);
    }
    util.inherits(FloatType, PrimitiveType);
    FloatType.prototype._check = function(val, flags, hook) {
      var b = typeof val == "number";
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    FloatType.prototype._read = function(tap) {
      return tap.readFloat();
    };
    FloatType.prototype._skip = function(tap) {
      tap.skipFloat();
    };
    FloatType.prototype._write = function(tap, val) {
      if (typeof val != "number") {
        throwInvalidError(val, this);
      }
      tap.writeFloat(val);
    };
    FloatType.prototype._match = function(tap1, tap2) {
      return tap1.matchFloat(tap2);
    };
    FloatType.prototype._update = function(resolver, type) {
      switch (type.typeName) {
        case "float":
        case "int":
          resolver._read = type._read;
          break;
        case "abstract:long":
        case "long":
          resolver._read = function(tap) {
            return tap.readLong();
          };
      }
    };
    FloatType.prototype.typeName = "float";
    FloatType.prototype.random = function() {
      return RANDOM.nextFloat(1e3);
    };
    function DoubleType() {
      PrimitiveType.call(this);
    }
    util.inherits(DoubleType, PrimitiveType);
    DoubleType.prototype._check = function(val, flags, hook) {
      var b = typeof val == "number";
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    DoubleType.prototype._read = function(tap) {
      return tap.readDouble();
    };
    DoubleType.prototype._skip = function(tap) {
      tap.skipDouble();
    };
    DoubleType.prototype._write = function(tap, val) {
      if (typeof val != "number") {
        throwInvalidError(val, this);
      }
      tap.writeDouble(val);
    };
    DoubleType.prototype._match = function(tap1, tap2) {
      return tap1.matchDouble(tap2);
    };
    DoubleType.prototype._update = function(resolver, type) {
      switch (type.typeName) {
        case "double":
        case "float":
        case "int":
          resolver._read = type._read;
          break;
        case "abstract:long":
        case "long":
          resolver._read = function(tap) {
            return tap.readLong();
          };
      }
    };
    DoubleType.prototype.typeName = "double";
    DoubleType.prototype.random = function() {
      return RANDOM.nextFloat();
    };
    function StringType() {
      PrimitiveType.call(this);
    }
    util.inherits(StringType, PrimitiveType);
    StringType.prototype._check = function(val, flags, hook) {
      var b = typeof val == "string";
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    StringType.prototype._read = function(tap) {
      return tap.readString();
    };
    StringType.prototype._skip = function(tap) {
      tap.skipString();
    };
    StringType.prototype._write = function(tap, val) {
      if (typeof val != "string") {
        throwInvalidError(val, this);
      }
      tap.writeString(val);
    };
    StringType.prototype._match = function(tap1, tap2) {
      return tap1.matchString(tap2);
    };
    StringType.prototype._update = function(resolver, type) {
      switch (type.typeName) {
        case "bytes":
        case "string":
          resolver._read = this._read;
      }
    };
    StringType.prototype.typeName = "string";
    StringType.prototype.random = function() {
      return RANDOM.nextString(RANDOM.nextInt(32));
    };
    function BytesType() {
      PrimitiveType.call(this);
    }
    util.inherits(BytesType, PrimitiveType);
    BytesType.prototype._check = function(val, flags, hook) {
      var b = Buffer.isBuffer(val);
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    BytesType.prototype._read = function(tap) {
      return tap.readBytes();
    };
    BytesType.prototype._skip = function(tap) {
      tap.skipBytes();
    };
    BytesType.prototype._write = function(tap, val) {
      if (!Buffer.isBuffer(val)) {
        throwInvalidError(val, this);
      }
      tap.writeBytes(val);
    };
    BytesType.prototype._match = function(tap1, tap2) {
      return tap1.matchBytes(tap2);
    };
    BytesType.prototype._update = StringType.prototype._update;
    BytesType.prototype._copy = function(obj, opts) {
      var buf;
      switch ((opts && opts.coerce) | 0) {
        case 3:
          this._check(obj, void 0, throwInvalidError);
          return obj.toString("binary");
        case 2:
          if (typeof obj != "string") {
            throw new Error(f("cannot coerce to buffer: %j", obj));
          }
          buf = utils.bufferFrom(obj, "binary");
          this._check(buf, void 0, throwInvalidError);
          return buf;
        case 1:
          if (!isJsonBuffer(obj)) {
            throw new Error(f("cannot coerce to buffer: %j", obj));
          }
          buf = utils.bufferFrom(obj.data);
          this._check(buf, void 0, throwInvalidError);
          return buf;
        default:
          this._check(obj, void 0, throwInvalidError);
          return utils.bufferFrom(obj);
      }
    };
    BytesType.prototype.compare = Buffer.compare;
    BytesType.prototype.typeName = "bytes";
    BytesType.prototype.random = function() {
      return RANDOM.nextBuffer(RANDOM.nextInt(32));
    };
    function UnionType(schema, opts) {
      Type.call(this);
      if (!Array.isArray(schema)) {
        throw new Error(f("non-array union schema: %j", schema));
      }
      if (!schema.length) {
        throw new Error("empty union");
      }
      this.types = Object.freeze(schema.map(function(obj) {
        return Type.forSchema(obj, opts);
      }));
      this._branchIndices = {};
      this.types.forEach(function(type, i) {
        if (Type.isType(type, "union")) {
          throw new Error("unions cannot be directly nested");
        }
        var branch = type.branchName;
        if (this._branchIndices[branch] !== void 0) {
          throw new Error(f("duplicate union branch name: %j", branch));
        }
        this._branchIndices[branch] = i;
      }, this);
    }
    util.inherits(UnionType, Type);
    UnionType.prototype._branchConstructor = function() {
      throw new Error("unions cannot be directly wrapped");
    };
    UnionType.prototype._skip = function(tap) {
      this.types[tap.readLong()]._skip(tap);
    };
    UnionType.prototype._match = function(tap1, tap2) {
      var n1 = tap1.readLong();
      var n2 = tap2.readLong();
      if (n1 === n2) {
        return this.types[n1]._match(tap1, tap2);
      } else {
        return n1 < n2 ? -1 : 1;
      }
    };
    UnionType.prototype._deref = function(schema, opts) {
      return this.types.map(function(t) {
        return t._attrs(opts);
      });
    };
    UnionType.prototype.getTypes = function() {
      return this.types;
    };
    function UnwrappedUnionType(schema, opts) {
      UnionType.call(this, schema, opts);
      this._dynamicBranches = null;
      this._bucketIndices = {};
      this.types.forEach(function(type, index) {
        if (Type.isType(type, "abstract", "logical")) {
          if (!this._dynamicBranches) {
            this._dynamicBranches = [];
          }
          this._dynamicBranches.push({ index, type });
        } else {
          var bucket = getTypeBucket(type);
          if (this._bucketIndices[bucket] !== void 0) {
            throw new Error(f("ambiguous unwrapped union: %j", this));
          }
          this._bucketIndices[bucket] = index;
        }
      }, this);
      Object.freeze(this);
    }
    util.inherits(UnwrappedUnionType, UnionType);
    UnwrappedUnionType.prototype._getIndex = function(val) {
      var index = this._bucketIndices[getValueBucket(val)];
      if (this._dynamicBranches) {
        index = this._getBranchIndex(val, index);
      }
      return index;
    };
    UnwrappedUnionType.prototype._getBranchIndex = function(any, index) {
      var logicalBranches = this._dynamicBranches;
      var i, l, branch;
      for (i = 0, l = logicalBranches.length; i < l; i++) {
        branch = logicalBranches[i];
        if (branch.type._check(any)) {
          if (index === void 0) {
            index = branch.index;
          } else {
            throw new Error("ambiguous conversion");
          }
        }
      }
      return index;
    };
    UnwrappedUnionType.prototype._check = function(val, flags, hook, path) {
      var index = this._getIndex(val);
      var b = index !== void 0;
      if (b) {
        return this.types[index]._check(val, flags, hook, path);
      }
      if (hook) {
        hook(val, this);
      }
      return b;
    };
    UnwrappedUnionType.prototype._read = function(tap) {
      var index = tap.readLong();
      var branchType = this.types[index];
      if (branchType) {
        return branchType._read(tap);
      } else {
        throw new Error(f("invalid union index: %s", index));
      }
    };
    UnwrappedUnionType.prototype._write = function(tap, val) {
      var index = this._getIndex(val);
      if (index === void 0) {
        throwInvalidError(val, this);
      }
      tap.writeLong(index);
      if (val !== null) {
        this.types[index]._write(tap, val);
      }
    };
    UnwrappedUnionType.prototype._update = function(resolver, type, opts) {
      var i, l, typeResolver;
      for (i = 0, l = this.types.length; i < l; i++) {
        try {
          typeResolver = this.types[i].createResolver(type, opts);
        } catch (err) {
          continue;
        }
        resolver._read = function(tap) {
          return typeResolver._read(tap);
        };
        return;
      }
    };
    UnwrappedUnionType.prototype._copy = function(val, opts) {
      var coerce = opts && opts.coerce | 0;
      var wrap = opts && opts.wrap | 0;
      var index;
      if (wrap === 2) {
        index = 0;
      } else {
        switch (coerce) {
          case 1:
            if (isJsonBuffer(val) && this._bucketIndices.buffer !== void 0) {
              index = this._bucketIndices.buffer;
            } else {
              index = this._getIndex(val);
            }
            break;
          case 2:
            if (val === null) {
              index = this._bucketIndices["null"];
            } else if (typeof val === "object") {
              var keys = Object.keys(val);
              if (keys.length === 1) {
                index = this._branchIndices[keys[0]];
                val = val[keys[0]];
              }
            }
            break;
          default:
            index = this._getIndex(val);
        }
        if (index === void 0) {
          throwInvalidError(val, this);
        }
      }
      var type = this.types[index];
      if (val === null || wrap === 3) {
        return type._copy(val, opts);
      } else {
        switch (coerce) {
          case 3:
            var obj = {};
            obj[type.branchName] = type._copy(val, opts);
            return obj;
          default:
            return type._copy(val, opts);
        }
      }
    };
    UnwrappedUnionType.prototype.compare = function(val1, val2) {
      var index1 = this._getIndex(val1);
      var index2 = this._getIndex(val2);
      if (index1 === void 0) {
        throwInvalidError(val1, this);
      } else if (index2 === void 0) {
        throwInvalidError(val2, this);
      } else if (index1 === index2) {
        return this.types[index1].compare(val1, val2);
      } else {
        return utils.compare(index1, index2);
      }
    };
    UnwrappedUnionType.prototype.typeName = "union:unwrapped";
    UnwrappedUnionType.prototype.random = function() {
      var index = RANDOM.nextInt(this.types.length);
      return this.types[index].random();
    };
    function WrappedUnionType(schema, opts) {
      UnionType.call(this, schema, opts);
      Object.freeze(this);
    }
    util.inherits(WrappedUnionType, UnionType);
    WrappedUnionType.prototype._check = function(val, flags, hook, path) {
      var b = false;
      if (val === null) {
        b = this._branchIndices["null"] !== void 0;
      } else if (typeof val == "object") {
        var keys = Object.keys(val);
        if (keys.length === 1) {
          var name = keys[0];
          var index = this._branchIndices[name];
          if (index !== void 0) {
            if (hook) {
              path.push(name);
              b = this.types[index]._check(val[name], flags, hook, path);
              path.pop();
              return b;
            } else {
              return this.types[index]._check(val[name], flags);
            }
          }
        }
      }
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    WrappedUnionType.prototype._read = function(tap) {
      var type = this.types[tap.readLong()];
      if (!type) {
        throw new Error(f("invalid union index"));
      }
      var Branch = type._branchConstructor;
      if (Branch === null) {
        return null;
      } else {
        return new Branch(type._read(tap));
      }
    };
    WrappedUnionType.prototype._write = function(tap, val) {
      var index, keys, name;
      if (val === null) {
        index = this._branchIndices["null"];
        if (index === void 0) {
          throwInvalidError(val, this);
        }
        tap.writeLong(index);
      } else {
        keys = Object.keys(val);
        if (keys.length === 1) {
          name = keys[0];
          index = this._branchIndices[name];
        }
        if (index === void 0) {
          throwInvalidError(val, this);
        }
        tap.writeLong(index);
        this.types[index]._write(tap, val[name]);
      }
    };
    WrappedUnionType.prototype._update = function(resolver, type, opts) {
      var i, l, typeResolver, Branch;
      for (i = 0, l = this.types.length; i < l; i++) {
        try {
          typeResolver = this.types[i].createResolver(type, opts);
        } catch (err) {
          continue;
        }
        Branch = this.types[i]._branchConstructor;
        if (Branch) {
          resolver._read = function(tap) {
            return new Branch(typeResolver._read(tap));
          };
        } else {
          resolver._read = function() {
            return null;
          };
        }
        return;
      }
    };
    WrappedUnionType.prototype._copy = function(val, opts) {
      var wrap = opts && opts.wrap | 0;
      if (wrap === 2) {
        var firstType = this.types[0];
        if (val === null && firstType.typeName === "null") {
          return null;
        }
        return new firstType._branchConstructor(firstType._copy(val, opts));
      }
      if (val === null && this._branchIndices["null"] !== void 0) {
        return null;
      }
      var i, l, obj;
      if (typeof val == "object") {
        var keys = Object.keys(val);
        if (keys.length === 1) {
          var name = keys[0];
          i = this._branchIndices[name];
          if (i === void 0 && opts.qualifyNames) {
            var j, type;
            for (j = 0, l = this.types.length; j < l; j++) {
              type = this.types[j];
              if (type.name && name === utils.unqualify(type.name)) {
                i = j;
                break;
              }
            }
          }
          if (i !== void 0) {
            obj = this.types[i]._copy(val[name], opts);
          }
        }
      }
      if (wrap === 1 && obj === void 0) {
        i = 0;
        l = this.types.length;
        while (i < l && obj === void 0) {
          try {
            obj = this.types[i]._copy(val, opts);
          } catch (err) {
            i++;
          }
        }
      }
      if (obj !== void 0) {
        return wrap === 3 ? obj : new this.types[i]._branchConstructor(obj);
      }
      throwInvalidError(val, this);
    };
    WrappedUnionType.prototype.compare = function(val1, val2) {
      var name1 = val1 === null ? "null" : Object.keys(val1)[0];
      var name2 = val2 === null ? "null" : Object.keys(val2)[0];
      var index = this._branchIndices[name1];
      if (name1 === name2) {
        return name1 === "null" ? 0 : this.types[index].compare(val1[name1], val2[name1]);
      } else {
        return utils.compare(index, this._branchIndices[name2]);
      }
    };
    WrappedUnionType.prototype.typeName = "union:wrapped";
    WrappedUnionType.prototype.random = function() {
      var index = RANDOM.nextInt(this.types.length);
      var type = this.types[index];
      var Branch = type._branchConstructor;
      if (!Branch) {
        return null;
      }
      return new Branch(type.random());
    };
    function EnumType(schema, opts) {
      Type.call(this, schema, opts);
      if (!Array.isArray(schema.symbols) || !schema.symbols.length) {
        throw new Error(f("invalid enum symbols: %j", schema.symbols));
      }
      this.symbols = Object.freeze(schema.symbols.slice());
      this._indices = {};
      this.symbols.forEach(function(symbol, i) {
        if (!utils.isValidName(symbol)) {
          throw new Error(f("invalid %s symbol: %j", this, symbol));
        }
        if (this._indices[symbol] !== void 0) {
          throw new Error(f("duplicate %s symbol: %j", this, symbol));
        }
        this._indices[symbol] = i;
      }, this);
      this.default = schema.default;
      if (this.default !== void 0 && this._indices[this.default] === void 0) {
        throw new Error(f("invalid %s default: %j", this, this.default));
      }
      this._branchConstructor = this._createBranchConstructor();
      Object.freeze(this);
    }
    util.inherits(EnumType, Type);
    EnumType.prototype._check = function(val, flags, hook) {
      var b = this._indices[val] !== void 0;
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    EnumType.prototype._read = function(tap) {
      var index = tap.readLong();
      var symbol = this.symbols[index];
      if (symbol === void 0) {
        throw new Error(f("invalid %s enum index: %s", this.name, index));
      }
      return symbol;
    };
    EnumType.prototype._skip = function(tap) {
      tap.skipLong();
    };
    EnumType.prototype._write = function(tap, val) {
      var index = this._indices[val];
      if (index === void 0) {
        throwInvalidError(val, this);
      }
      tap.writeLong(index);
    };
    EnumType.prototype._match = function(tap1, tap2) {
      return tap1.matchLong(tap2);
    };
    EnumType.prototype.compare = function(val1, val2) {
      return utils.compare(this._indices[val1], this._indices[val2]);
    };
    EnumType.prototype._update = function(resolver, type, opts) {
      var symbols = this.symbols;
      if (type.typeName === "enum" && hasCompatibleName(this, type, !opts.ignoreNamespaces) && (type.symbols.every(function(s) {
        return ~symbols.indexOf(s);
      }) || this.default !== void 0)) {
        resolver.symbols = type.symbols.map(function(s) {
          return this._indices[s] === void 0 ? this.default : s;
        }, this);
        resolver._read = type._read;
      }
    };
    EnumType.prototype._copy = function(val) {
      this._check(val, void 0, throwInvalidError);
      return val;
    };
    EnumType.prototype._deref = function(schema) {
      schema.symbols = this.symbols;
    };
    EnumType.prototype.getSymbols = function() {
      return this.symbols;
    };
    EnumType.prototype.typeName = "enum";
    EnumType.prototype.random = function() {
      return RANDOM.choice(this.symbols);
    };
    function FixedType(schema, opts) {
      Type.call(this, schema, opts);
      if (schema.size !== (schema.size | 0) || schema.size < 0) {
        throw new Error(f("invalid %s size", this.branchName));
      }
      this.size = schema.size | 0;
      this._branchConstructor = this._createBranchConstructor();
      Object.freeze(this);
    }
    util.inherits(FixedType, Type);
    FixedType.prototype._check = function(val, flags, hook) {
      var b = Buffer.isBuffer(val) && val.length === this.size;
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    FixedType.prototype._read = function(tap) {
      return tap.readFixed(this.size);
    };
    FixedType.prototype._skip = function(tap) {
      tap.skipFixed(this.size);
    };
    FixedType.prototype._write = function(tap, val) {
      if (!Buffer.isBuffer(val) || val.length !== this.size) {
        throwInvalidError(val, this);
      }
      tap.writeFixed(val, this.size);
    };
    FixedType.prototype._match = function(tap1, tap2) {
      return tap1.matchFixed(tap2, this.size);
    };
    FixedType.prototype.compare = Buffer.compare;
    FixedType.prototype._update = function(resolver, type, opts) {
      if (type.typeName === "fixed" && this.size === type.size && hasCompatibleName(this, type, !opts.ignoreNamespaces)) {
        resolver.size = this.size;
        resolver._read = this._read;
      }
    };
    FixedType.prototype._copy = BytesType.prototype._copy;
    FixedType.prototype._deref = function(schema) {
      schema.size = this.size;
    };
    FixedType.prototype.getSize = function() {
      return this.size;
    };
    FixedType.prototype.typeName = "fixed";
    FixedType.prototype.random = function() {
      return RANDOM.nextBuffer(this.size);
    };
    function MapType(schema, opts) {
      Type.call(this);
      if (!schema.values) {
        throw new Error(f("missing map values: %j", schema));
      }
      this.valuesType = Type.forSchema(schema.values, opts);
      this._branchConstructor = this._createBranchConstructor();
      Object.freeze(this);
    }
    util.inherits(MapType, Type);
    MapType.prototype._check = function(val, flags, hook, path) {
      if (!val || typeof val != "object" || Array.isArray(val)) {
        if (hook) {
          hook(val, this);
        }
        return false;
      }
      var keys = Object.keys(val);
      var b = true;
      var i, l, j, key;
      if (hook) {
        j = path.length;
        path.push("");
        for (i = 0, l = keys.length; i < l; i++) {
          key = path[j] = keys[i];
          if (!this.valuesType._check(val[key], flags, hook, path)) {
            b = false;
          }
        }
        path.pop();
      } else {
        for (i = 0, l = keys.length; i < l; i++) {
          if (!this.valuesType._check(val[keys[i]], flags)) {
            return false;
          }
        }
      }
      return b;
    };
    MapType.prototype._read = function(tap) {
      var values = this.valuesType;
      var val = {};
      var n;
      while (n = readArraySize(tap)) {
        while (n--) {
          var key = tap.readString();
          val[key] = values._read(tap);
        }
      }
      return val;
    };
    MapType.prototype._skip = function(tap) {
      var values = this.valuesType;
      var len, n;
      while (n = tap.readLong()) {
        if (n < 0) {
          len = tap.readLong();
          tap.pos += len;
        } else {
          while (n--) {
            tap.skipString();
            values._skip(tap);
          }
        }
      }
    };
    MapType.prototype._write = function(tap, val) {
      if (!val || typeof val != "object" || Array.isArray(val)) {
        throwInvalidError(val, this);
      }
      var values = this.valuesType;
      var keys = Object.keys(val);
      var n = keys.length;
      var i, key;
      if (n) {
        tap.writeLong(n);
        for (i = 0; i < n; i++) {
          key = keys[i];
          tap.writeString(key);
          values._write(tap, val[key]);
        }
      }
      tap.writeLong(0);
    };
    MapType.prototype._match = function() {
      throw new Error("maps cannot be compared");
    };
    MapType.prototype._update = function(rsv, type, opts) {
      if (type.typeName === "map") {
        rsv.valuesType = this.valuesType.createResolver(type.valuesType, opts);
        rsv._read = this._read;
      }
    };
    MapType.prototype._copy = function(val, opts) {
      if (val && typeof val == "object" && !Array.isArray(val)) {
        var values = this.valuesType;
        var keys = Object.keys(val);
        var i, l, key;
        var copy = {};
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          copy[key] = values._copy(val[key], opts);
        }
        return copy;
      }
      throwInvalidError(val, this);
    };
    MapType.prototype.compare = MapType.prototype._match;
    MapType.prototype.typeName = "map";
    MapType.prototype.getValuesType = function() {
      return this.valuesType;
    };
    MapType.prototype.random = function() {
      var val = {};
      var i, l;
      for (i = 0, l = RANDOM.nextInt(10); i < l; i++) {
        val[RANDOM.nextString(RANDOM.nextInt(20))] = this.valuesType.random();
      }
      return val;
    };
    MapType.prototype._deref = function(schema, opts) {
      schema.values = this.valuesType._attrs(opts);
    };
    function ArrayType(schema, opts) {
      Type.call(this);
      if (!schema.items) {
        throw new Error(f("missing array items: %j", schema));
      }
      this.itemsType = Type.forSchema(schema.items, opts);
      this._branchConstructor = this._createBranchConstructor();
      Object.freeze(this);
    }
    util.inherits(ArrayType, Type);
    ArrayType.prototype._check = function(val, flags, hook, path) {
      if (!Array.isArray(val)) {
        if (hook) {
          hook(val, this);
        }
        return false;
      }
      var items = this.itemsType;
      var b = true;
      var i, l, j;
      if (hook) {
        j = path.length;
        path.push("");
        for (i = 0, l = val.length; i < l; i++) {
          path[j] = "" + i;
          if (!items._check(val[i], flags, hook, path)) {
            b = false;
          }
        }
        path.pop();
      } else {
        for (i = 0, l = val.length; i < l; i++) {
          if (!items._check(val[i], flags)) {
            return false;
          }
        }
      }
      return b;
    };
    ArrayType.prototype._read = function(tap) {
      var items = this.itemsType;
      var i = 0;
      var val, n;
      while (n = tap.readLong()) {
        if (n < 0) {
          n = -n;
          tap.skipLong();
        }
        val = val || new Array(n);
        while (n--) {
          val[i++] = items._read(tap);
        }
      }
      return val || [];
    };
    ArrayType.prototype._skip = function(tap) {
      var items = this.itemsType;
      var len, n;
      while (n = tap.readLong()) {
        if (n < 0) {
          len = tap.readLong();
          tap.pos += len;
        } else {
          while (n--) {
            items._skip(tap);
          }
        }
      }
    };
    ArrayType.prototype._write = function(tap, val) {
      if (!Array.isArray(val)) {
        throwInvalidError(val, this);
      }
      var items = this.itemsType;
      var n = val.length;
      var i;
      if (n) {
        tap.writeLong(n);
        for (i = 0; i < n; i++) {
          items._write(tap, val[i]);
        }
      }
      tap.writeLong(0);
    };
    ArrayType.prototype._match = function(tap1, tap2) {
      var n1 = tap1.readLong();
      var n2 = tap2.readLong();
      var f2;
      while (n1 && n2) {
        f2 = this.itemsType._match(tap1, tap2);
        if (f2) {
          return f2;
        }
        if (!--n1) {
          n1 = readArraySize(tap1);
        }
        if (!--n2) {
          n2 = readArraySize(tap2);
        }
      }
      return utils.compare(n1, n2);
    };
    ArrayType.prototype._update = function(resolver, type, opts) {
      if (type.typeName === "array") {
        resolver.itemsType = this.itemsType.createResolver(type.itemsType, opts);
        resolver._read = this._read;
      }
    };
    ArrayType.prototype._copy = function(val, opts) {
      if (!Array.isArray(val)) {
        throwInvalidError(val, this);
      }
      var items = new Array(val.length);
      var i, l;
      for (i = 0, l = val.length; i < l; i++) {
        items[i] = this.itemsType._copy(val[i], opts);
      }
      return items;
    };
    ArrayType.prototype._deref = function(schema, opts) {
      schema.items = this.itemsType._attrs(opts);
    };
    ArrayType.prototype.compare = function(val1, val2) {
      var n1 = val1.length;
      var n2 = val2.length;
      var i, l, f2;
      for (i = 0, l = Math.min(n1, n2); i < l; i++) {
        if (f2 = this.itemsType.compare(val1[i], val2[i])) {
          return f2;
        }
      }
      return utils.compare(n1, n2);
    };
    ArrayType.prototype.getItemsType = function() {
      return this.itemsType;
    };
    ArrayType.prototype.typeName = "array";
    ArrayType.prototype.random = function() {
      var arr = [];
      var i, l;
      for (i = 0, l = RANDOM.nextInt(10); i < l; i++) {
        arr.push(this.itemsType.random());
      }
      return arr;
    };
    function RecordType(schema, opts) {
      opts = opts || {};
      var namespace = opts.namespace;
      if (schema.namespace !== void 0) {
        opts.namespace = schema.namespace;
      } else if (schema.name) {
        var ns = utils.impliedNamespace(schema.name);
        if (ns !== void 0) {
          opts.namespace = ns;
        }
      }
      Type.call(this, schema, opts);
      if (!Array.isArray(schema.fields)) {
        throw new Error(f("non-array record fields: %j", schema.fields));
      }
      if (utils.hasDuplicates(schema.fields, function(f2) {
        return f2.name;
      })) {
        throw new Error(f("duplicate field name: %j", schema.fields));
      }
      this._fieldsByName = {};
      this.fields = Object.freeze(schema.fields.map(function(f2) {
        var field = new Field(f2, opts);
        this._fieldsByName[field.name] = field;
        return field;
      }, this));
      this._branchConstructor = this._createBranchConstructor();
      this._isError = schema.type === "error";
      this.recordConstructor = this._createConstructor(opts.errorStackTraces, opts.omitRecordMethods);
      this._read = this._createReader();
      this._skip = this._createSkipper();
      this._write = this._createWriter();
      this._check = this._createChecker();
      opts.namespace = namespace;
      Object.freeze(this);
    }
    util.inherits(RecordType, Type);
    RecordType.prototype._getConstructorName = function() {
      return this.name ? utils.capitalize(utils.unqualify(this.name)) : this._isError ? "Error$" : "Record$";
    };
    RecordType.prototype._createConstructor = function(errorStack, plainRecords) {
      var outerArgs = [];
      var innerArgs = [];
      var ds = [];
      var innerBody = "";
      var i, l, field, name, defaultValue, hasDefault, stackField;
      for (i = 0, l = this.fields.length; i < l; i++) {
        field = this.fields[i];
        defaultValue = field.defaultValue;
        hasDefault = defaultValue() !== void 0;
        name = field.name;
        if (errorStack && this._isError && name === "stack" && Type.isType(field.type, "string") && !hasDefault) {
          stackField = field;
        }
        innerArgs.push("v" + i);
        innerBody += "  ";
        if (!hasDefault) {
          innerBody += "this." + name + " = v" + i + ";\n";
        } else {
          innerBody += "if (v" + i + " === undefined) { ";
          innerBody += "this." + name + " = d" + ds.length + "(); ";
          innerBody += "} else { this." + name + " = v" + i + "; }\n";
          outerArgs.push("d" + ds.length);
          ds.push(defaultValue);
        }
      }
      if (stackField) {
        innerBody += "  if (this.stack === undefined) { ";
        if (typeof Error.captureStackTrace == "function") {
          innerBody += "Error.captureStackTrace(this, this.constructor);";
        } else {
          innerBody += "this.stack = Error().stack;";
        }
        innerBody += " }\n";
      }
      var outerBody = "return function " + this._getConstructorName() + "(";
      outerBody += innerArgs.join() + ") {\n" + innerBody + "};";
      var Record = new Function(outerArgs.join(), outerBody).apply(void 0, ds);
      if (plainRecords) {
        return Record;
      }
      var self2 = this;
      Record.getType = function() {
        return self2;
      };
      Record.type = self2;
      if (this._isError) {
        util.inherits(Record, Error);
        Record.prototype.name = this._getConstructorName();
      }
      Record.prototype.clone = function(o) {
        return self2.clone(this, o);
      };
      Record.prototype.compare = function(v) {
        return self2.compare(this, v);
      };
      Record.prototype.isValid = function(o) {
        return self2.isValid(this, o);
      };
      Record.prototype.toBuffer = function() {
        return self2.toBuffer(this);
      };
      Record.prototype.toString = function() {
        return self2.toString(this);
      };
      Record.prototype.wrap = function() {
        return self2.wrap(this);
      };
      Record.prototype.wrapped = Record.prototype.wrap;
      return Record;
    };
    RecordType.prototype._createChecker = function() {
      var names = [];
      var values = [];
      var name = this._getConstructorName();
      var body = "return function check" + name + "(v, f, h, p) {\n";
      body += "  if (\n";
      body += "    v === null ||\n";
      body += "    typeof v != 'object' ||\n";
      body += "    (f && !this._checkFields(v))\n";
      body += "  ) {\n";
      body += "    if (h) { h(v, this); }\n";
      body += "    return false;\n";
      body += "  }\n";
      if (!this.fields.length) {
        body += "  return true;\n";
      } else {
        for (i = 0, l = this.fields.length; i < l; i++) {
          field = this.fields[i];
          names.push("t" + i);
          values.push(field.type);
          if (field.defaultValue() !== void 0) {
            body += "  var v" + i + " = v." + field.name + ";\n";
          }
        }
        body += "  if (h) {\n";
        body += "    var b = 1;\n";
        body += "    var j = p.length;\n";
        body += "    p.push('');\n";
        var i, l, field;
        for (i = 0, l = this.fields.length; i < l; i++) {
          field = this.fields[i];
          body += "    p[j] = '" + field.name + "';\n";
          body += "    b &= ";
          if (field.defaultValue() === void 0) {
            body += "t" + i + "._check(v." + field.name + ", f, h, p);\n";
          } else {
            body += "v" + i + " === undefined || ";
            body += "t" + i + "._check(v" + i + ", f, h, p);\n";
          }
        }
        body += "    p.pop();\n";
        body += "    return !!b;\n";
        body += "  } else {\n    return (\n      ";
        body += this.fields.map(function(field2, i2) {
          return field2.defaultValue() === void 0 ? "t" + i2 + "._check(v." + field2.name + ", f)" : "(v" + i2 + " === undefined || t" + i2 + "._check(v" + i2 + ", f))";
        }).join(" &&\n      ");
        body += "\n    );\n  }\n";
      }
      body += "};";
      return new Function(names.join(), body).apply(void 0, values);
    };
    RecordType.prototype._createReader = function() {
      var names = [];
      var values = [this.recordConstructor];
      var i, l;
      for (i = 0, l = this.fields.length; i < l; i++) {
        names.push("t" + i);
        values.push(this.fields[i].type);
      }
      var name = this._getConstructorName();
      var body = "return function read" + name + "(t) {\n";
      body += "  return new " + name + "(\n    ";
      body += names.map(function(s) {
        return s + "._read(t)";
      }).join(",\n    ");
      body += "\n  );\n};";
      names.unshift(name);
      return new Function(names.join(), body).apply(void 0, values);
    };
    RecordType.prototype._createSkipper = function() {
      var args = [];
      var body = "return function skip" + this._getConstructorName() + "(t) {\n";
      var values = [];
      var i, l;
      for (i = 0, l = this.fields.length; i < l; i++) {
        args.push("t" + i);
        values.push(this.fields[i].type);
        body += "  t" + i + "._skip(t);\n";
      }
      body += "}";
      return new Function(args.join(), body).apply(void 0, values);
    };
    RecordType.prototype._createWriter = function() {
      var args = [];
      var name = this._getConstructorName();
      var body = "return function write" + name + "(t, v) {\n";
      var values = [];
      var i, l, field, value;
      for (i = 0, l = this.fields.length; i < l; i++) {
        field = this.fields[i];
        args.push("t" + i);
        values.push(field.type);
        body += "  ";
        if (field.defaultValue() === void 0) {
          body += "t" + i + "._write(t, v." + field.name + ");\n";
        } else {
          value = field.type.toBuffer(field.defaultValue()).toString("binary");
          args.push("d" + i);
          values.push(value);
          body += "var v" + i + " = v." + field.name + ";\n";
          body += "if (v" + i + " === undefined) {\n";
          body += "    t.writeBinary(d" + i + ", " + value.length + ");\n";
          body += "  } else {\n    t" + i + "._write(t, v" + i + ");\n  }\n";
        }
      }
      body += "}";
      return new Function(args.join(), body).apply(void 0, values);
    };
    RecordType.prototype._update = function(resolver, type, opts) {
      if (!hasCompatibleName(this, type, !opts.ignoreNamespaces)) {
        throw new Error(f("no alias found for %s", type.name));
      }
      var rFields = this.fields;
      var wFields = type.fields;
      var wFieldsMap = utils.toMap(wFields, function(f2) {
        return f2.name;
      });
      var innerArgs = [];
      var resolvers = {};
      var i, j, field, name, names, matches, fieldResolver;
      for (i = 0; i < rFields.length; i++) {
        field = rFields[i];
        names = getAliases(field);
        matches = [];
        for (j = 0; j < names.length; j++) {
          name = names[j];
          if (wFieldsMap[name]) {
            matches.push(name);
          }
        }
        if (matches.length > 1) {
          throw new Error(f("ambiguous aliasing for %s.%s (%s)", type.name, field.name, matches));
        }
        if (!matches.length) {
          if (field.defaultValue() === void 0) {
            throw new Error(f("no matching field for default-less %s.%s", type.name, field.name));
          }
          innerArgs.push("undefined");
        } else {
          name = matches[0];
          fieldResolver = {
            resolver: field.type.createResolver(wFieldsMap[name].type, opts),
            name: "_" + field.name
          };
          if (!resolvers[name]) {
            resolvers[name] = [fieldResolver];
          } else {
            resolvers[name].push(fieldResolver);
          }
          innerArgs.push(fieldResolver.name);
        }
      }
      var lazyIndex = -1;
      i = wFields.length;
      while (i && resolvers[wFields[--i].name] === void 0) {
        lazyIndex = i;
      }
      var uname = this._getConstructorName();
      var args = [uname];
      var values = [this.recordConstructor];
      var body = "  return function read" + uname + "(t, b) {\n";
      for (i = 0; i < wFields.length; i++) {
        if (i === lazyIndex) {
          body += "  if (!b) {\n";
        }
        field = type.fields[i];
        name = field.name;
        if (resolvers[name] === void 0) {
          body += ~lazyIndex && i >= lazyIndex ? "    " : "  ";
          args.push("r" + i);
          values.push(field.type);
          body += "r" + i + "._skip(t);\n";
        } else {
          j = resolvers[name].length;
          while (j--) {
            body += ~lazyIndex && i >= lazyIndex ? "    " : "  ";
            args.push("r" + i + "f" + j);
            fieldResolver = resolvers[name][j];
            values.push(fieldResolver.resolver);
            body += "var " + fieldResolver.name + " = ";
            body += "r" + i + "f" + j + "._" + (j ? "peek" : "read") + "(t);\n";
          }
        }
      }
      if (~lazyIndex) {
        body += "  }\n";
      }
      body += "  return new " + uname + "(" + innerArgs.join() + ");\n};";
      resolver._read = new Function(args.join(), body).apply(void 0, values);
    };
    RecordType.prototype._match = function(tap1, tap2) {
      var fields = this.fields;
      var i, l, field, order, type;
      for (i = 0, l = fields.length; i < l; i++) {
        field = fields[i];
        order = field._order;
        type = field.type;
        if (order) {
          order *= type._match(tap1, tap2);
          if (order) {
            return order;
          }
        } else {
          type._skip(tap1);
          type._skip(tap2);
        }
      }
      return 0;
    };
    RecordType.prototype._checkFields = function(obj) {
      var keys = Object.keys(obj);
      var i, l;
      for (i = 0, l = keys.length; i < l; i++) {
        if (!this._fieldsByName[keys[i]]) {
          return false;
        }
      }
      return true;
    };
    RecordType.prototype._copy = function(val, opts) {
      var hook = opts && opts.fieldHook;
      var values = [void 0];
      var i, l, field, value;
      for (i = 0, l = this.fields.length; i < l; i++) {
        field = this.fields[i];
        value = val[field.name];
        if (value === void 0 && field.hasOwnProperty("defaultValue")) {
          value = field.defaultValue();
        }
        if (opts && !opts.skip || value !== void 0) {
          value = field.type._copy(value, opts);
        }
        if (hook) {
          value = hook(field, value, this);
        }
        values.push(value);
      }
      var Record = this.recordConstructor;
      return new (Record.bind.apply(Record, values))();
    };
    RecordType.prototype._deref = function(schema, opts) {
      schema.fields = this.fields.map(function(field) {
        var fieldType = field.type;
        var fieldSchema = {
          name: field.name,
          type: fieldType._attrs(opts)
        };
        if (opts.exportAttrs) {
          var val = field.defaultValue();
          if (val !== void 0) {
            fieldSchema["default"] = fieldType._copy(val, { coerce: 3, wrap: 3 });
          }
          var fieldOrder = field.order;
          if (fieldOrder !== "ascending") {
            fieldSchema.order = fieldOrder;
          }
          var fieldAliases = field.aliases;
          if (fieldAliases.length) {
            fieldSchema.aliases = fieldAliases;
          }
          var fieldDoc = field.doc;
          if (fieldDoc !== void 0) {
            fieldSchema.doc = fieldDoc;
          }
        }
        return fieldSchema;
      });
    };
    RecordType.prototype.compare = function(val1, val2) {
      var fields = this.fields;
      var i, l, field, name, order, type;
      for (i = 0, l = fields.length; i < l; i++) {
        field = fields[i];
        name = field.name;
        order = field._order;
        type = field.type;
        if (order) {
          order *= type.compare(val1[name], val2[name]);
          if (order) {
            return order;
          }
        }
      }
      return 0;
    };
    RecordType.prototype.random = function() {
      var fields = this.fields.map(function(f2) {
        return f2.type.random();
      });
      fields.unshift(void 0);
      var Record = this.recordConstructor;
      return new (Record.bind.apply(Record, fields))();
    };
    RecordType.prototype.field = function(name) {
      return this._fieldsByName[name];
    };
    RecordType.prototype.getField = RecordType.prototype.field;
    RecordType.prototype.getFields = function() {
      return this.fields;
    };
    RecordType.prototype.getRecordConstructor = function() {
      return this.recordConstructor;
    };
    Object.defineProperty(RecordType.prototype, "typeName", {
      enumerable: true,
      get: function() {
        return this._isError ? "error" : "record";
      }
    });
    function LogicalType(schema, opts) {
      this._logicalTypeName = schema.logicalType;
      Type.call(this);
      LOGICAL_TYPE = this;
      try {
        this._underlyingType = Type.forSchema(schema, opts);
      } finally {
        LOGICAL_TYPE = null;
        var l = UNDERLYING_TYPES.length;
        if (l && UNDERLYING_TYPES[l - 1][0] === this) {
          UNDERLYING_TYPES.pop();
        }
      }
      if (Type.isType(this.underlyingType, "union")) {
        this._branchConstructor = this.underlyingType._branchConstructor;
      } else {
        this._branchConstructor = this.underlyingType._createBranchConstructor();
      }
    }
    util.inherits(LogicalType, Type);
    Object.defineProperty(LogicalType.prototype, "typeName", {
      enumerable: true,
      get: function() {
        return "logical:" + this._logicalTypeName;
      }
    });
    Object.defineProperty(LogicalType.prototype, "underlyingType", {
      enumerable: true,
      get: function() {
        if (this._underlyingType) {
          return this._underlyingType;
        }
        var i, l, arr;
        for (i = 0, l = UNDERLYING_TYPES.length; i < l; i++) {
          arr = UNDERLYING_TYPES[i];
          if (arr[0] === this) {
            return arr[1];
          }
        }
      }
    });
    LogicalType.prototype.getUnderlyingType = function() {
      return this.underlyingType;
    };
    LogicalType.prototype._read = function(tap) {
      return this._fromValue(this.underlyingType._read(tap));
    };
    LogicalType.prototype._write = function(tap, any) {
      this.underlyingType._write(tap, this._toValue(any));
    };
    LogicalType.prototype._check = function(any, flags, hook, path) {
      try {
        var val = this._toValue(any);
      } catch (err) {
      }
      if (val === void 0) {
        if (hook) {
          hook(any, this);
        }
        return false;
      }
      return this.underlyingType._check(val, flags, hook, path);
    };
    LogicalType.prototype._copy = function(any, opts) {
      var type = this.underlyingType;
      switch (opts && opts.coerce) {
        case 3:
          return type._copy(this._toValue(any), opts);
        case 2:
          return this._fromValue(type._copy(any, opts));
        default:
          return this._fromValue(type._copy(this._toValue(any), opts));
      }
    };
    LogicalType.prototype._update = function(resolver, type, opts) {
      var _fromValue = this._resolve(type, opts);
      if (_fromValue) {
        resolver._read = function(tap) {
          return _fromValue(type._read(tap));
        };
      }
    };
    LogicalType.prototype.compare = function(obj1, obj2) {
      var val1 = this._toValue(obj1);
      var val2 = this._toValue(obj2);
      return this.underlyingType.compare(val1, val2);
    };
    LogicalType.prototype.random = function() {
      return this._fromValue(this.underlyingType.random());
    };
    LogicalType.prototype._deref = function(schema, opts) {
      var type = this.underlyingType;
      var isVisited = type.name !== void 0 && opts.derefed[type.name];
      schema = type._attrs(opts);
      if (!isVisited && opts.exportAttrs) {
        if (typeof schema == "string") {
          schema = { type: schema };
        }
        schema.logicalType = this._logicalTypeName;
        this._export(schema);
      }
      return schema;
    };
    LogicalType.prototype._skip = function(tap) {
      this.underlyingType._skip(tap);
    };
    LogicalType.prototype._export = function() {
    };
    LogicalType.prototype._fromValue = utils.abstractFunction;
    LogicalType.prototype._toValue = utils.abstractFunction;
    LogicalType.prototype._resolve = utils.abstractFunction;
    function AbstractLongType(noUnpack) {
      this._concreteTypeName = "long";
      PrimitiveType.call(this, true);
      this._noUnpack = !!noUnpack;
    }
    util.inherits(AbstractLongType, LongType);
    AbstractLongType.prototype.typeName = "abstract:long";
    AbstractLongType.prototype._check = function(val, flags, hook) {
      var b = this._isValid(val);
      if (!b && hook) {
        hook(val, this);
      }
      return b;
    };
    AbstractLongType.prototype._read = function(tap) {
      var buf, pos;
      if (this._noUnpack) {
        pos = tap.pos;
        tap.skipLong();
        buf = tap.buf.slice(pos, tap.pos);
      } else {
        buf = tap.unpackLongBytes(tap);
      }
      if (tap.isValid()) {
        return this._fromBuffer(buf);
      }
    };
    AbstractLongType.prototype._write = function(tap, val) {
      if (!this._isValid(val)) {
        throwInvalidError(val, this);
      }
      var buf = this._toBuffer(val);
      if (this._noUnpack) {
        tap.writeFixed(buf);
      } else {
        tap.packLongBytes(buf);
      }
    };
    AbstractLongType.prototype._copy = function(val, opts) {
      switch (opts && opts.coerce) {
        case 3:
          return this._toJSON(val);
        case 2:
          return this._fromJSON(val);
        default:
          return this._fromJSON(this._toJSON(val));
      }
    };
    AbstractLongType.prototype._deref = function() {
      return "long";
    };
    AbstractLongType.prototype._update = function(resolver, type) {
      var self2 = this;
      switch (type.typeName) {
        case "int":
          resolver._read = function(tap) {
            return self2._fromJSON(type._read(tap));
          };
          break;
        case "abstract:long":
        case "long":
          resolver._read = function(tap) {
            return self2._read(tap);
          };
      }
    };
    AbstractLongType.prototype.random = function() {
      return this._fromJSON(LongType.prototype.random());
    };
    AbstractLongType.prototype._fromBuffer = utils.abstractFunction;
    AbstractLongType.prototype._toBuffer = utils.abstractFunction;
    AbstractLongType.prototype._fromJSON = utils.abstractFunction;
    AbstractLongType.prototype._toJSON = utils.abstractFunction;
    AbstractLongType.prototype._isValid = utils.abstractFunction;
    AbstractLongType.prototype.compare = utils.abstractFunction;
    function Field(schema, opts) {
      var name = schema.name;
      if (typeof name != "string" || !utils.isValidName(name)) {
        throw new Error(f("invalid field name: %s", name));
      }
      this.name = name;
      this.type = Type.forSchema(schema.type, opts);
      this.aliases = schema.aliases || [];
      this.doc = schema.doc !== void 0 ? "" + schema.doc : void 0;
      this._order = function(order) {
        switch (order) {
          case "ascending":
            return 1;
          case "descending":
            return -1;
          case "ignore":
            return 0;
          default:
            throw new Error(f("invalid order: %j", order));
        }
      }(schema.order === void 0 ? "ascending" : schema.order);
      var value = schema["default"];
      if (value !== void 0) {
        var type = this.type;
        var val = type._copy(value, { coerce: 2, wrap: 2 });
        if (isPrimitive(type.typeName) && type.typeName !== "bytes") {
          this.defaultValue = function() {
            return val;
          };
        } else {
          this.defaultValue = function() {
            return type._copy(val);
          };
        }
      }
      Object.freeze(this);
    }
    Field.prototype.defaultValue = function() {
    };
    Object.defineProperty(Field.prototype, "order", {
      enumerable: true,
      get: function() {
        return ["descending", "ignore", "ascending"][this._order + 1];
      }
    });
    Field.prototype.getAliases = function() {
      return this.aliases;
    };
    Field.prototype.getDefault = Field.prototype.defaultValue;
    Field.prototype.getName = function() {
      return this.name;
    };
    Field.prototype.getOrder = function() {
      return this.order;
    };
    Field.prototype.getType = function() {
      return this.type;
    };
    function Resolver(readerType) {
      this._readerType = readerType;
      this._read = null;
      this.itemsType = null;
      this.size = 0;
      this.symbols = null;
      this.valuesType = null;
    }
    Resolver.prototype._peek = Type.prototype._peek;
    Resolver.prototype.inspect = function() {
      return "<Resolver>";
    };
    function Hash() {
      this.str = void 0;
    }
    function readValue(type, tap, resolver, lazy) {
      if (resolver) {
        if (resolver._readerType !== type) {
          throw new Error("invalid resolver");
        }
        return resolver._read(tap, lazy);
      } else {
        return type._read(tap);
      }
    }
    function getAliases(obj) {
      var names = {};
      if (obj.name) {
        names[obj.name] = true;
      }
      var aliases = obj.aliases;
      var i, l;
      for (i = 0, l = aliases.length; i < l; i++) {
        names[aliases[i]] = true;
      }
      return Object.keys(names);
    }
    function hasCompatibleName(reader, writer, strict) {
      if (!writer.name) {
        return true;
      }
      var name = strict ? writer.name : utils.unqualify(writer.name);
      var aliases = getAliases(reader);
      var i, l, alias;
      for (i = 0, l = aliases.length; i < l; i++) {
        alias = aliases[i];
        if (!strict) {
          alias = utils.unqualify(alias);
        }
        if (alias === name) {
          return true;
        }
      }
      return false;
    }
    function isPrimitive(typeName) {
      var type = TYPES[typeName];
      return type && type.prototype instanceof PrimitiveType;
    }
    function getClassName(typeName) {
      if (typeName === "error") {
        typeName = "record";
      } else {
        var match = /^([^:]+):(.*)$/.exec(typeName);
        if (match) {
          if (match[1] === "union") {
            typeName = match[2] + "Union";
          } else {
            typeName = match[1];
          }
        }
      }
      return utils.capitalize(typeName) + "Type";
    }
    function readArraySize(tap) {
      var n = tap.readLong();
      if (n < 0) {
        n = -n;
        tap.skipLong();
      }
      return n;
    }
    function isSafeLong(n) {
      return n >= -9007199254740990 && n <= 9007199254740990;
    }
    function isJsonBuffer(obj) {
      return obj && obj.type === "Buffer" && Array.isArray(obj.data);
    }
    function throwInvalidError(val, type) {
      throw new Error(f("invalid %j: %j", type.schema(), val));
    }
    function maybeQualify(name, ns) {
      var unqualified = utils.unqualify(name);
      return isPrimitive(unqualified) ? unqualified : utils.qualify(name, ns);
    }
    function getTypeBucket(type) {
      var typeName = type.typeName;
      switch (typeName) {
        case "double":
        case "float":
        case "int":
        case "long":
          return "number";
        case "bytes":
        case "fixed":
          return "buffer";
        case "enum":
          return "string";
        case "map":
        case "error":
        case "record":
          return "object";
        default:
          return typeName;
      }
    }
    function getValueBucket(val) {
      if (val === null) {
        return "null";
      }
      var bucket = typeof val;
      if (bucket === "object") {
        if (Array.isArray(val)) {
          return "array";
        } else if (Buffer.isBuffer(val)) {
          return "buffer";
        }
      }
      return bucket;
    }
    function isAmbiguous(types) {
      var buckets = {};
      var i, l, bucket, type;
      for (i = 0, l = types.length; i < l; i++) {
        type = types[i];
        if (!Type.isType(type, "logical")) {
          bucket = getTypeBucket(type);
          if (buckets[bucket]) {
            return true;
          }
          buckets[bucket] = true;
        }
      }
      return false;
    }
    function combineNumbers(types) {
      var typeNames = ["int", "long", "float", "double"];
      var superIndex = -1;
      var superType = null;
      var i, l, type, index;
      for (i = 0, l = types.length; i < l; i++) {
        type = types[i];
        index = typeNames.indexOf(type.typeName);
        if (index > superIndex) {
          superIndex = index;
          superType = type;
        }
      }
      return superType;
    }
    function combineStrings(types, opts) {
      var symbols = {};
      var i, l, type, typeSymbols;
      for (i = 0, l = types.length; i < l; i++) {
        type = types[i];
        if (type.typeName === "string") {
          return type;
        }
        typeSymbols = type.symbols;
        var j, m;
        for (j = 0, m = typeSymbols.length; j < m; j++) {
          symbols[typeSymbols[j]] = true;
        }
      }
      return Type.forSchema({ type: "enum", symbols: Object.keys(symbols) }, opts);
    }
    function combineBuffers(types, opts) {
      var size = -1;
      var i, l, type;
      for (i = 0, l = types.length; i < l; i++) {
        type = types[i];
        if (type.typeName === "bytes") {
          return type;
        }
        if (size === -1) {
          size = type.size;
        } else if (type.size !== size) {
          size = -2;
        }
      }
      return size < 0 ? Type.forSchema("bytes", opts) : types[0];
    }
    function combineObjects(types, opts) {
      var allTypes = [];
      var fieldTypes = {};
      var fieldDefaults = {};
      var isValidRecord = true;
      var i, l, type, fields;
      for (i = 0, l = types.length; i < l; i++) {
        type = types[i];
        if (type.typeName === "map") {
          isValidRecord = false;
          allTypes.push(type.valuesType);
        } else {
          fields = type.fields;
          var j, m, field, fieldDefault, fieldName, fieldType;
          for (j = 0, m = fields.length; j < m; j++) {
            field = fields[j];
            fieldName = field.name;
            fieldType = field.type;
            allTypes.push(fieldType);
            if (isValidRecord) {
              if (!fieldTypes[fieldName]) {
                fieldTypes[fieldName] = [];
              }
              fieldTypes[fieldName].push(fieldType);
              fieldDefault = field.defaultValue();
              if (fieldDefault !== void 0) {
                fieldDefaults[fieldName] = fieldDefault;
              }
            }
          }
        }
      }
      if (isValidRecord) {
        var fieldNames = Object.keys(fieldTypes);
        for (i = 0, l = fieldNames.length; i < l; i++) {
          fieldName = fieldNames[i];
          if (fieldTypes[fieldName].length < types.length && fieldDefaults[fieldName] === void 0) {
            if (opts && opts.strictDefaults) {
              isValidRecord = false;
            } else {
              fieldTypes[fieldName].unshift(Type.forSchema("null", opts));
              fieldDefaults[fieldName] = null;
            }
          }
        }
      }
      var schema;
      if (isValidRecord) {
        schema = {
          type: "record",
          fields: fieldNames.map(function(s) {
            var fieldType2 = Type.forTypes(fieldTypes[s], opts);
            var fieldDefault2 = fieldDefaults[s];
            if (fieldDefault2 !== void 0 && ~fieldType2.typeName.indexOf("union")) {
              var unionTypes = fieldType2.types.slice();
              var i2, l2;
              for (i2 = 0, l2 = unionTypes.length; i2 < l2; i2++) {
                if (unionTypes[i2].isValid(fieldDefault2)) {
                  break;
                }
              }
              if (i2 > 0) {
                var unionType = unionTypes[0];
                unionTypes[0] = unionTypes[i2];
                unionTypes[i2] = unionType;
                fieldType2 = Type.forSchema(unionTypes, opts);
              }
            }
            return {
              name: s,
              type: fieldType2,
              "default": fieldDefaults[s]
            };
          })
        };
      } else {
        schema = {
          type: "map",
          values: Type.forTypes(allTypes, opts)
        };
      }
      return Type.forSchema(schema, opts);
    }
    module2.exports = {
      Type,
      getTypeBucket,
      getValueBucket,
      isPrimitive,
      builtins: function() {
        var types = {
          LogicalType,
          UnwrappedUnionType,
          WrappedUnionType
        };
        var typeNames = Object.keys(TYPES);
        var i, l, typeName;
        for (i = 0, l = typeNames.length; i < l; i++) {
          typeName = typeNames[i];
          types[getClassName(typeName)] = TYPES[typeName];
        }
        return types;
      }()
    };
  }
});

// node_modules/avsc/lib/containers.js
var require_containers = __commonJS({
  "node_modules/avsc/lib/containers.js"(exports2, module2) {
    "use strict";
    var types = require_types2();
    var utils = require_utils3();
    var stream = require("stream");
    var util = require("util");
    var zlib = require("zlib");
    var OPTS = { namespace: "org.apache.avro.file" };
    var LONG_TYPE = types.Type.forSchema("long", OPTS);
    var MAP_BYTES_TYPE = types.Type.forSchema({ type: "map", values: "bytes" }, OPTS);
    var HEADER_TYPE = types.Type.forSchema({
      name: "Header",
      type: "record",
      fields: [
        { name: "magic", type: { type: "fixed", name: "Magic", size: 4 } },
        { name: "meta", type: MAP_BYTES_TYPE },
        { name: "sync", type: { type: "fixed", name: "Sync", size: 16 } }
      ]
    }, OPTS);
    var BLOCK_TYPE = types.Type.forSchema({
      name: "Block",
      type: "record",
      fields: [
        { name: "count", type: "long" },
        { name: "data", type: "bytes" },
        { name: "sync", type: "Sync" }
      ]
    }, OPTS);
    var MAGIC_BYTES = utils.bufferFrom("Obj");
    var f = util.format;
    var Tap = utils.Tap;
    function RawDecoder(schema, opts) {
      opts = opts || {};
      var noDecode = !!opts.noDecode;
      stream.Duplex.call(this, {
        readableObjectMode: !noDecode,
        allowHalfOpen: false
      });
      this._type = types.Type.forSchema(schema);
      this._tap = new Tap(utils.newBuffer(0));
      this._writeCb = null;
      this._needPush = false;
      this._readValue = createReader(noDecode, this._type);
      this._finished = false;
      this.on("finish", function() {
        this._finished = true;
        this._read();
      });
    }
    util.inherits(RawDecoder, stream.Duplex);
    RawDecoder.prototype._write = function(chunk, encoding, cb) {
      this._writeCb = cb;
      var tap = this._tap;
      tap.buf = Buffer.concat([tap.buf.slice(tap.pos), chunk]);
      tap.pos = 0;
      if (this._needPush) {
        this._needPush = false;
        this._read();
      }
    };
    RawDecoder.prototype._read = function() {
      this._needPush = false;
      var tap = this._tap;
      var pos = tap.pos;
      var val = this._readValue(tap);
      if (tap.isValid()) {
        this.push(val);
      } else if (!this._finished) {
        tap.pos = pos;
        this._needPush = true;
        if (this._writeCb) {
          this._writeCb();
        }
      } else {
        this.push(null);
      }
    };
    function BlockDecoder(opts) {
      opts = opts || {};
      var noDecode = !!opts.noDecode;
      stream.Duplex.call(this, {
        allowHalfOpen: true,
        readableObjectMode: !noDecode
      });
      this._rType = opts.readerSchema !== void 0 ? types.Type.forSchema(opts.readerSchema) : void 0;
      this._wType = null;
      this._codecs = opts.codecs;
      this._codec = void 0;
      this._parseHook = opts.parseHook;
      this._tap = new Tap(utils.newBuffer(0));
      this._blockTap = new Tap(utils.newBuffer(0));
      this._syncMarker = null;
      this._readValue = null;
      this._noDecode = noDecode;
      this._queue = new utils.OrderedQueue();
      this._decompress = null;
      this._index = 0;
      this._remaining = void 0;
      this._needPush = false;
      this._finished = false;
      this.on("finish", function() {
        this._finished = true;
        if (this._needPush) {
          this._read();
        }
      });
    }
    util.inherits(BlockDecoder, stream.Duplex);
    BlockDecoder.defaultCodecs = function() {
      return {
        "null": function(buf, cb) {
          cb(null, buf);
        },
        "deflate": zlib.inflateRaw
      };
    };
    BlockDecoder.getDefaultCodecs = BlockDecoder.defaultCodecs;
    BlockDecoder.prototype._decodeHeader = function() {
      var tap = this._tap;
      if (tap.buf.length < MAGIC_BYTES.length) {
        return false;
      }
      if (!MAGIC_BYTES.equals(tap.buf.slice(0, MAGIC_BYTES.length))) {
        this.emit("error", new Error("invalid magic bytes"));
        return false;
      }
      var header = HEADER_TYPE._read(tap);
      if (!tap.isValid()) {
        return false;
      }
      this._codec = (header.meta["avro.codec"] || "null").toString();
      var codecs = this._codecs || BlockDecoder.getDefaultCodecs();
      this._decompress = codecs[this._codec];
      if (!this._decompress) {
        this.emit("error", new Error(f("unknown codec: %s", this._codec)));
        return;
      }
      try {
        var schema = JSON.parse(header.meta["avro.schema"].toString());
        if (this._parseHook) {
          schema = this._parseHook(schema);
        }
        this._wType = types.Type.forSchema(schema);
      } catch (err) {
        this.emit("error", err);
        return;
      }
      try {
        this._readValue = createReader(this._noDecode, this._wType, this._rType);
      } catch (err) {
        this.emit("error", err);
        return;
      }
      this._syncMarker = header.sync;
      this.emit("metadata", this._wType, this._codec, header);
      return true;
    };
    BlockDecoder.prototype._write = function(chunk, encoding, cb) {
      var tap = this._tap;
      tap.buf = Buffer.concat([tap.buf, chunk]);
      tap.pos = 0;
      if (!this._decodeHeader()) {
        process.nextTick(cb);
        return;
      }
      this._write = this._writeChunk;
      this._write(utils.newBuffer(0), encoding, cb);
    };
    BlockDecoder.prototype._writeChunk = function(chunk, encoding, cb) {
      var tap = this._tap;
      tap.buf = Buffer.concat([tap.buf.slice(tap.pos), chunk]);
      tap.pos = 0;
      var nBlocks = 1;
      var block;
      while (block = tryReadBlock(tap)) {
        if (!this._syncMarker.equals(block.sync)) {
          this.emit("error", new Error("invalid sync marker"));
          return;
        }
        nBlocks++;
        this._decompress(block.data, this._createBlockCallback(block.data.length, block.count, chunkCb));
      }
      chunkCb();
      function chunkCb() {
        if (!--nBlocks) {
          cb();
        }
      }
    };
    BlockDecoder.prototype._createBlockCallback = function(size, count, cb) {
      var self2 = this;
      var index = this._index++;
      return function(cause, data) {
        if (cause) {
          var err = new Error(f("%s codec decompression error", self2._codec));
          err.cause = cause;
          self2.emit("error", err);
          cb();
        } else {
          self2.emit("block", new BlockInfo(count, data.length, size));
          self2._queue.push(new BlockData(index, data, cb, count));
          if (self2._needPush) {
            self2._read();
          }
        }
      };
    };
    BlockDecoder.prototype._read = function() {
      this._needPush = false;
      var tap = this._blockTap;
      if (!this._remaining) {
        var data = this._queue.pop();
        if (!data || !data.count) {
          if (this._finished) {
            this.push(null);
          } else {
            this._needPush = true;
          }
          if (data) {
            data.cb();
          }
          return;
        }
        data.cb();
        this._remaining = data.count;
        tap.buf = data.buf;
        tap.pos = 0;
      }
      this._remaining--;
      var val;
      try {
        val = this._readValue(tap);
        if (!tap.isValid()) {
          throw new Error("truncated block");
        }
      } catch (err) {
        this._remaining = 0;
        this.emit("error", err);
        return;
      }
      this.push(val);
    };
    function RawEncoder(schema, opts) {
      opts = opts || {};
      stream.Transform.call(this, {
        writableObjectMode: true,
        allowHalfOpen: false
      });
      this._type = types.Type.forSchema(schema);
      this._writeValue = function(tap, val) {
        try {
          this._type._write(tap, val);
        } catch (err) {
          this.emit("typeError", err, val, this._type);
        }
      };
      this._tap = new Tap(utils.newBuffer(opts.batchSize || 65536));
      this.on("typeError", function(err) {
        this.emit("error", err);
      });
    }
    util.inherits(RawEncoder, stream.Transform);
    RawEncoder.prototype._transform = function(val, encoding, cb) {
      var tap = this._tap;
      var buf = tap.buf;
      var pos = tap.pos;
      this._writeValue(tap, val);
      if (!tap.isValid()) {
        if (pos) {
          this.push(copyBuffer(tap.buf, 0, pos));
        }
        var len = tap.pos - pos;
        if (len > buf.length) {
          tap.buf = utils.newBuffer(2 * len);
        }
        tap.pos = 0;
        this._writeValue(tap, val);
      }
      cb();
    };
    RawEncoder.prototype._flush = function(cb) {
      var tap = this._tap;
      var pos = tap.pos;
      if (pos) {
        this.push(tap.buf.slice(0, pos));
      }
      cb();
    };
    function BlockEncoder(schema, opts) {
      opts = opts || {};
      stream.Duplex.call(this, {
        allowHalfOpen: true,
        writableObjectMode: true
      });
      var type;
      if (types.Type.isType(schema)) {
        type = schema;
        schema = void 0;
      } else {
        type = types.Type.forSchema(schema);
      }
      this._schema = schema;
      this._type = type;
      this._writeValue = function(tap, val) {
        try {
          this._type._write(tap, val);
        } catch (err) {
          this.emit("typeError", err, val, this._type);
          return false;
        }
        return true;
      };
      this._blockSize = opts.blockSize || 65536;
      this._tap = new Tap(utils.newBuffer(this._blockSize));
      this._codecs = opts.codecs;
      this._codec = opts.codec || "null";
      this._blockCount = 0;
      this._syncMarker = opts.syncMarker || new utils.Lcg().nextBuffer(16);
      this._queue = new utils.OrderedQueue();
      this._pending = 0;
      this._finished = false;
      this._needHeader = false;
      this._needPush = false;
      this._metadata = opts.metadata || {};
      if (!MAP_BYTES_TYPE.isValid(this._metadata)) {
        throw new Error("invalid metadata");
      }
      var codec = this._codec;
      this._compress = (this._codecs || BlockEncoder.getDefaultCodecs())[codec];
      if (!this._compress) {
        throw new Error(f("unsupported codec: %s", codec));
      }
      if (opts.omitHeader !== void 0) {
        opts.writeHeader = opts.omitHeader ? "never" : "auto";
      }
      switch (opts.writeHeader) {
        case false:
        case "never":
          break;
        case void 0:
        case "auto":
          this._needHeader = true;
          break;
        default:
          this._writeHeader();
      }
      this.on("finish", function() {
        this._finished = true;
        if (this._blockCount) {
          this._flushChunk();
        } else if (this._finished && this._needPush) {
          this.push(null);
        }
      });
      this.on("typeError", function(err) {
        this.emit("error", err);
      });
    }
    util.inherits(BlockEncoder, stream.Duplex);
    BlockEncoder.defaultCodecs = function() {
      return {
        "null": function(buf, cb) {
          cb(null, buf);
        },
        "deflate": zlib.deflateRaw
      };
    };
    BlockEncoder.getDefaultCodecs = BlockEncoder.defaultCodecs;
    BlockEncoder.prototype._writeHeader = function() {
      var schema = JSON.stringify(this._schema ? this._schema : this._type.getSchema({ exportAttrs: true }));
      var meta = utils.copyOwnProperties(this._metadata, { "avro.schema": utils.bufferFrom(schema), "avro.codec": utils.bufferFrom(this._codec) }, true);
      var Header = HEADER_TYPE.getRecordConstructor();
      var header = new Header(MAGIC_BYTES, meta, this._syncMarker);
      this.push(header.toBuffer());
    };
    BlockEncoder.prototype._write = function(val, encoding, cb) {
      if (this._needHeader) {
        this._writeHeader();
        this._needHeader = false;
      }
      var tap = this._tap;
      var pos = tap.pos;
      var flushing = false;
      if (this._writeValue(tap, val)) {
        if (!tap.isValid()) {
          if (pos) {
            this._flushChunk(pos, cb);
            flushing = true;
          }
          var len = tap.pos - pos;
          if (len > this._blockSize) {
            this._blockSize = len * 2;
          }
          tap.buf = utils.newBuffer(this._blockSize);
          tap.pos = 0;
          this._writeValue(tap, val);
        }
        this._blockCount++;
      } else {
        tap.pos = pos;
      }
      if (!flushing) {
        cb();
      }
    };
    BlockEncoder.prototype._flushChunk = function(pos, cb) {
      var tap = this._tap;
      pos = pos || tap.pos;
      this._compress(tap.buf.slice(0, pos), this._createBlockCallback(pos, cb));
      this._blockCount = 0;
    };
    BlockEncoder.prototype._read = function() {
      var self2 = this;
      var data = this._queue.pop();
      if (!data) {
        if (this._finished && !this._pending) {
          process.nextTick(function() {
            self2.push(null);
          });
        } else {
          this._needPush = true;
        }
        return;
      }
      this.push(LONG_TYPE.toBuffer(data.count, true));
      this.push(LONG_TYPE.toBuffer(data.buf.length, true));
      this.push(data.buf);
      this.push(this._syncMarker);
      if (!this._finished) {
        data.cb();
      }
    };
    BlockEncoder.prototype._createBlockCallback = function(size, cb) {
      var self2 = this;
      var index = this._index++;
      var count = this._blockCount;
      this._pending++;
      return function(cause, data) {
        if (cause) {
          var err = new Error(f("%s codec compression error", self2._codec));
          err.cause = cause;
          self2.emit("error", err);
          return;
        }
        self2._pending--;
        self2.emit("block", new BlockInfo(count, size, data.length));
        self2._queue.push(new BlockData(index, data, cb, count));
        if (self2._needPush) {
          self2._needPush = false;
          self2._read();
        }
      };
    };
    function BlockInfo(count, raw, compressed) {
      this.valueCount = count;
      this.rawDataLength = raw;
      this.compressedDataLength = compressed;
    }
    function BlockData(index, buf, cb, count) {
      this.index = index;
      this.buf = buf;
      this.cb = cb;
      this.count = count | 0;
    }
    function tryReadBlock(tap) {
      var pos = tap.pos;
      var block = BLOCK_TYPE._read(tap);
      if (!tap.isValid()) {
        tap.pos = pos;
        return null;
      }
      return block;
    }
    function createReader(noDecode, writerType, readerType) {
      if (noDecode) {
        return function(skipper) {
          return function(tap) {
            var pos = tap.pos;
            skipper(tap);
            return tap.buf.slice(pos, tap.pos);
          };
        }(writerType._skip);
      } else if (readerType) {
        var resolver = readerType.createResolver(writerType);
        return function(tap) {
          return resolver._read(tap);
        };
      } else {
        return function(tap) {
          return writerType._read(tap);
        };
      }
    }
    function copyBuffer(buf, pos, len) {
      var copy = utils.newBuffer(len);
      buf.copy(copy, 0, pos, pos + len);
      return copy;
    }
    module2.exports = {
      BLOCK_TYPE,
      HEADER_TYPE,
      MAGIC_BYTES,
      streams: {
        BlockDecoder,
        BlockEncoder,
        RawDecoder,
        RawEncoder
      }
    };
  }
});

// node_modules/avsc/lib/services.js
var require_services = __commonJS({
  "node_modules/avsc/lib/services.js"(exports2, module2) {
    "use strict";
    var types = require_types2();
    var utils = require_utils3();
    var events = require("events");
    var stream = require("stream");
    var util = require("util");
    var Tap = utils.Tap;
    var Type = types.Type;
    var debug = util.debuglog("avsc:services");
    var f = util.format;
    var OPTS = { namespace: "org.apache.avro.ipc" };
    var BOOLEAN_TYPE = Type.forSchema("boolean", OPTS);
    var MAP_BYTES_TYPE = Type.forSchema({ type: "map", values: "bytes" }, OPTS);
    var STRING_TYPE = Type.forSchema("string", OPTS);
    var HANDSHAKE_REQUEST_TYPE = Type.forSchema({
      name: "HandshakeRequest",
      type: "record",
      fields: [
        { name: "clientHash", type: { name: "MD5", type: "fixed", size: 16 } },
        { name: "clientProtocol", type: ["null", "string"], "default": null },
        { name: "serverHash", type: "MD5" },
        { name: "meta", type: ["null", MAP_BYTES_TYPE], "default": null }
      ]
    }, OPTS);
    var HANDSHAKE_RESPONSE_TYPE = Type.forSchema({
      name: "HandshakeResponse",
      type: "record",
      fields: [
        {
          name: "match",
          type: {
            name: "HandshakeMatch",
            type: "enum",
            symbols: ["BOTH", "CLIENT", "NONE"]
          }
        },
        { name: "serverProtocol", type: ["null", "string"], "default": null },
        { name: "serverHash", type: ["null", "MD5"], "default": null },
        { name: "meta", type: ["null", MAP_BYTES_TYPE], "default": null }
      ]
    }, OPTS);
    var PREFIX_LENGTH = 16;
    var PING_MESSAGE = new Message("", Type.forSchema({ name: "PingRequest", type: "record", fields: [] }, OPTS), Type.forSchema(["string"], OPTS), Type.forSchema("null", OPTS));
    function Message(name, reqType, errType, resType, oneWay, doc) {
      this.name = name;
      if (!Type.isType(reqType, "record")) {
        throw new Error("invalid request type");
      }
      this.requestType = reqType;
      if (!Type.isType(errType, "union") || !Type.isType(errType.getTypes()[0], "string")) {
        throw new Error("invalid error type");
      }
      this.errorType = errType;
      if (oneWay) {
        if (!Type.isType(resType, "null") || errType.getTypes().length > 1) {
          throw new Error("inapplicable one-way parameter");
        }
      }
      this.responseType = resType;
      this.oneWay = !!oneWay;
      this.doc = doc !== void 0 ? "" + doc : void 0;
      Object.freeze(this);
    }
    Message.forSchema = function(name, schema, opts) {
      opts = opts || {};
      if (!utils.isValidName(name)) {
        throw new Error(f("invalid message name: %s", name));
      }
      if (!Array.isArray(schema.request)) {
        throw new Error(f("invalid message request: %s", name));
      }
      var recordName = f("%s.%sRequest", OPTS.namespace, utils.capitalize(name));
      var reqType = Type.forSchema({
        name: recordName,
        type: "record",
        namespace: opts.namespace || "",
        fields: schema.request
      }, opts);
      delete opts.registry[recordName];
      if (!schema.response) {
        throw new Error(f("invalid message response: %s", name));
      }
      var resType = Type.forSchema(schema.response, opts);
      if (schema.errors !== void 0 && !Array.isArray(schema.errors)) {
        throw new Error(f("invalid message errors: %s", name));
      }
      var errType = Type.forSchema(["string"].concat(schema.errors || []), opts);
      var oneWay = !!schema["one-way"];
      return new Message(name, reqType, errType, resType, oneWay, schema.doc);
    };
    Message.prototype.schema = Type.prototype.getSchema;
    Message.prototype._attrs = function(opts) {
      var reqSchema = this.requestType._attrs(opts);
      var schema = {
        request: reqSchema.fields,
        response: this.responseType._attrs(opts)
      };
      var msgDoc = this.doc;
      if (msgDoc !== void 0) {
        schema.doc = msgDoc;
      }
      var errSchema = this.errorType._attrs(opts);
      if (errSchema.length > 1) {
        schema.errors = errSchema.slice(1);
      }
      if (this.oneWay) {
        schema["one-way"] = true;
      }
      return schema;
    };
    utils.addDeprecatedGetters(Message, ["name", "errorType", "requestType", "responseType"]);
    Message.prototype.isOneWay = util.deprecate(function() {
      return this.oneWay;
    }, "use `.oneWay` directly instead of `.isOneWay()`");
    function Service(name, messages, types2, ptcl, server) {
      if (typeof name != "string") {
        return Service.forProtocol(name, messages);
      }
      this.name = name;
      this._messagesByName = messages || {};
      this.messages = Object.freeze(utils.objectValues(this._messagesByName));
      this._typesByName = types2 || {};
      this.types = Object.freeze(utils.objectValues(this._typesByName));
      this.protocol = ptcl;
      this._hashStr = utils.getHash(JSON.stringify(ptcl)).toString("binary");
      this.doc = ptcl.doc ? "" + ptcl.doc : void 0;
      this._server = server || this.createServer({ silent: true });
      Object.freeze(this);
    }
    Service.Client = Client;
    Service.Server = Server;
    Service.compatible = function(clientSvc, serverSvc) {
      try {
        createReaders(clientSvc, serverSvc);
      } catch (err) {
        return false;
      }
      return true;
    };
    Service.forProtocol = function(ptcl, opts) {
      opts = opts || {};
      var name = ptcl.protocol;
      if (!name) {
        throw new Error("missing protocol name");
      }
      if (ptcl.namespace !== void 0) {
        opts.namespace = ptcl.namespace;
      } else {
        var match = /^(.*)\.[^.]+$/.exec(name);
        if (match) {
          opts.namespace = match[1];
        }
      }
      name = utils.qualify(name, opts.namespace);
      if (ptcl.types) {
        ptcl.types.forEach(function(obj) {
          Type.forSchema(obj, opts);
        });
      }
      var msgs;
      if (ptcl.messages) {
        msgs = {};
        Object.keys(ptcl.messages).forEach(function(key) {
          msgs[key] = Message.forSchema(key, ptcl.messages[key], opts);
        });
      }
      return new Service(name, msgs, opts.registry, ptcl);
    };
    Service.isService = function(any) {
      return !!any && any.hasOwnProperty("_hashStr");
    };
    Service.prototype.createClient = function(opts) {
      var client = new Client(this, opts);
      process.nextTick(function() {
        if (opts && opts.server) {
          var obj = { objectMode: true };
          var pts = [new stream.PassThrough(obj), new stream.PassThrough(obj)];
          opts.server.createChannel({ readable: pts[0], writable: pts[1] }, obj);
          client.createChannel({ readable: pts[1], writable: pts[0] }, obj);
        } else if (opts && opts.transport) {
          client.createChannel(opts.transport);
        }
      });
      return client;
    };
    Service.prototype.createServer = function(opts) {
      return new Server(this, opts);
    };
    Object.defineProperty(Service.prototype, "hash", {
      enumerable: true,
      get: function() {
        return utils.bufferFrom(this._hashStr, "binary");
      }
    });
    Service.prototype.message = function(name) {
      return this._messagesByName[name];
    };
    Service.prototype.type = function(name) {
      return this._typesByName[name];
    };
    Service.prototype.inspect = function() {
      return f("<Service %j>", this.name);
    };
    utils.addDeprecatedGetters(Service, ["message", "messages", "name", "type", "types"]);
    Service.prototype.createEmitter = util.deprecate(function(transport, opts) {
      opts = opts || {};
      var client = this.createClient({
        cache: opts.cache,
        buffering: false,
        strictTypes: opts.strictErrors,
        timeout: opts.timeout
      });
      var channel = client.createChannel(transport, opts);
      forwardErrors(client, channel);
      return channel;
    }, "use `.createClient()` instead of `.createEmitter()`");
    Service.prototype.createListener = util.deprecate(function(transport, opts) {
      if (opts && opts.strictErrors) {
        throw new Error("use `.createServer()` to support strict errors");
      }
      return this._server.createChannel(transport, opts);
    }, "use `.createServer().createChannel()` instead of `.createListener()`");
    Service.prototype.emit = util.deprecate(function(name, req, channel, cb) {
      if (!channel || !this.equals(channel.client._svc$)) {
        throw new Error("invalid emitter");
      }
      var client = channel.client;
      Client.prototype.emitMessage.call(client, name, req, cb && cb.bind(this));
      return channel.getPending();
    }, "create a client via `.createClient()` to emit messages instead of `.emit()`");
    Service.prototype.equals = util.deprecate(function(any) {
      return Service.isService(any) && this.getFingerprint().equals(any.getFingerprint());
    }, "equality testing is deprecated, compare the `.protocol`s instead");
    Service.prototype.getFingerprint = util.deprecate(function(algorithm) {
      return utils.getHash(JSON.stringify(this.protocol), algorithm);
    }, "use `.hash` instead of `.getFingerprint()`");
    Service.prototype.getSchema = util.deprecate(Type.prototype.getSchema, "use `.protocol` instead of `.getSchema()`");
    Service.prototype.on = util.deprecate(function(name, handler) {
      var self2 = this;
      this._server.onMessage(name, function(req, cb) {
        return handler.call(self2, req, this.channel, cb);
      });
      return this;
    }, "use `.createServer().onMessage()` instead of `.on()`");
    Service.prototype.subprotocol = util.deprecate(function() {
      var parent = this._server;
      var opts = { strictTypes: parent._strict, cache: parent._cache };
      var server = new Server(parent.service, opts);
      server._handlers = Object.create(parent._handlers);
      return new Service(this.name, this._messagesByName, this._typesByName, this.protocol, server);
    }, "`.subprotocol()` will be removed in 5.1");
    Service.prototype._attrs = function(opts) {
      var ptcl = { protocol: this.name };
      var types2 = [];
      this.types.forEach(function(t) {
        if (t.getName() === void 0) {
          return;
        }
        var typeSchema = t._attrs(opts);
        if (typeof typeSchema != "string") {
          types2.push(typeSchema);
        }
      });
      if (types2.length) {
        ptcl.types = types2;
      }
      var msgNames = Object.keys(this._messagesByName);
      if (msgNames.length) {
        ptcl.messages = {};
        msgNames.forEach(function(name) {
          ptcl.messages[name] = this._messagesByName[name]._attrs(opts);
        }, this);
      }
      if (opts && opts.exportAttrs && this.doc !== void 0) {
        ptcl.doc = this.doc;
      }
      return ptcl;
    };
    function discoverProtocol(transport, opts, cb) {
      if (cb === void 0 && typeof opts == "function") {
        cb = opts;
        opts = void 0;
      }
      var svc = new Service({ protocol: "Empty" }, OPTS);
      var ptclStr;
      svc.createClient({ timeout: opts && opts.timeout }).createChannel(transport, {
        scope: opts && opts.scope,
        endWritable: typeof transport == "function"
      }).once("handshake", function(hreq, hres) {
        ptclStr = hres.serverProtocol;
        this.destroy(true);
      }).once("eot", function(pending, err) {
        if (err && !/interrupted/.test(err)) {
          cb(err);
        } else {
          cb(null, JSON.parse(ptclStr));
        }
      });
    }
    function Client(svc, opts) {
      opts = opts || {};
      events.EventEmitter.call(this);
      this._svc$ = svc;
      this._channels$ = [];
      this._fns$ = [];
      this._buffering$ = !!opts.buffering;
      this._cache$ = opts.cache || {};
      this._policy$ = opts.channelPolicy;
      this._strict$ = !!opts.strictTypes;
      this._timeout$ = utils.getOption(opts, "timeout", 1e4);
      if (opts.remoteProtocols) {
        insertRemoteProtocols(this._cache$, opts.remoteProtocols, svc, true);
      }
      this._svc$.messages.forEach(function(msg) {
        this[msg.name] = this._createMessageHandler$(msg);
      }, this);
    }
    util.inherits(Client, events.EventEmitter);
    Client.prototype.activeChannels = function() {
      return this._channels$.slice();
    };
    Client.prototype.createChannel = function(transport, opts) {
      var objectMode = opts && opts.objectMode;
      var channel;
      if (typeof transport == "function") {
        var writableFactory;
        if (objectMode) {
          writableFactory = transport;
        } else {
          writableFactory = function(cb) {
            var encoder2 = new FrameEncoder();
            var writable2 = transport(function(err, readable2) {
              if (err) {
                cb(err);
                return;
              }
              var decoder2 = new FrameDecoder().once("error", function(err2) {
                channel.destroy(err2);
              });
              cb(null, readable2.pipe(decoder2));
            });
            if (writable2) {
              encoder2.pipe(writable2);
              return encoder2;
            }
          };
        }
        channel = new StatelessClientChannel(this, writableFactory, opts);
      } else {
        var readable, writable;
        if (isStream(transport)) {
          readable = writable = transport;
        } else {
          readable = transport.readable;
          writable = transport.writable;
        }
        if (!objectMode) {
          var decoder = new NettyDecoder();
          readable = readable.pipe(decoder);
          var encoder = new NettyEncoder();
          encoder.pipe(writable);
          writable = encoder;
        }
        channel = new StatefulClientChannel(this, readable, writable, opts);
        if (!objectMode) {
          channel.once("eot", function() {
            readable.unpipe(decoder);
            encoder.unpipe(writable);
          });
          decoder.once("error", function(err) {
            channel.destroy(err);
          });
        }
      }
      var channels = this._channels$;
      channels.push(channel);
      channel.once("_drain", function() {
        channels.splice(channels.indexOf(this), 1);
      });
      this._buffering$ = false;
      this.emit("channel", channel);
      return channel;
    };
    Client.prototype.destroyChannels = function(opts) {
      this._channels$.forEach(function(channel) {
        channel.destroy(opts && opts.noWait);
      });
    };
    Client.prototype.emitMessage = function(name, req, opts, cb) {
      var msg = getExistingMessage(this._svc$, name);
      var wreq = new WrappedRequest(msg, {}, req);
      this._emitMessage$(wreq, opts, cb);
    };
    Client.prototype.remoteProtocols = function() {
      return getRemoteProtocols(this._cache$, true);
    };
    Object.defineProperty(Client.prototype, "service", {
      enumerable: true,
      get: function() {
        return this._svc$;
      }
    });
    Client.prototype.use = function() {
      var i, l, fn;
      for (i = 0, l = arguments.length; i < l; i++) {
        fn = arguments[i];
        this._fns$.push(fn.length < 3 ? fn(this) : fn);
      }
      return this;
    };
    Client.prototype._emitMessage$ = function(wreq, opts, cb) {
      if (!cb && typeof opts === "function") {
        cb = opts;
        opts = void 0;
      }
      var self2 = this;
      var channels = this._channels$;
      var numChannels = channels.length;
      if (!numChannels) {
        if (this._buffering$) {
          debug("no active client channels, buffering call");
          this.once("channel", function() {
            this._emitMessage$(wreq, opts, cb);
          });
        } else {
          var err = new Error("no active channels");
          process.nextTick(function() {
            if (cb) {
              cb.call(new CallContext(wreq._msg), err);
            } else {
              self2.emit("error", err);
            }
          });
        }
        return;
      }
      opts = opts || {};
      if (opts.timeout === void 0) {
        opts.timeout = this._timeout$;
      }
      var channel;
      if (numChannels === 1) {
        channel = channels[0];
      } else if (this._policy$) {
        channel = this._policy$(this._channels$.slice());
        if (!channel) {
          debug("policy returned no channel, skipping call");
          return;
        }
      } else {
        channel = channels[Math.floor(Math.random() * numChannels)];
      }
      channel._emit(wreq, opts, function(err2, wres) {
        var ctx = this;
        var errType = ctx.message.errorType;
        if (err2) {
          if (self2._strict$) {
            err2 = errType.clone(err2.message, { wrapUnions: true });
          }
          done(err2);
          return;
        }
        if (!wres) {
          done();
          return;
        }
        err2 = wres.error;
        if (!self2._strict$) {
          if (err2 === void 0) {
            err2 = null;
          } else {
            if (Type.isType(errType, "union:unwrapped")) {
              if (typeof err2 == "string") {
                err2 = new Error(err2);
              }
            } else if (err2 && err2.string && typeof err2.string == "string") {
              err2 = new Error(err2.string);
            }
          }
        }
        done(err2, wres.response);
        function done(err3, res) {
          if (cb) {
            cb.call(ctx, err3, res);
          } else if (err3) {
            self2.emit("error", err3);
          }
        }
      });
    };
    Client.prototype._createMessageHandler$ = function(msg) {
      var fields = msg.requestType.getFields();
      var names = fields.map(function(f2) {
        return f2.getName();
      });
      var body = "return function " + msg.name + "(";
      if (names.length) {
        body += names.join(", ") + ", ";
      }
      body += "opts, cb) {\n";
      body += "  var req = {";
      body += names.map(function(n) {
        return n + ": " + n;
      }).join(", ");
      body += "};\n";
      body += "  return this.emitMessage('" + msg.name + "', req, opts, cb);\n";
      body += "};";
      return new Function(body)();
    };
    function Server(svc, opts) {
      opts = opts || {};
      events.EventEmitter.call(this);
      this.service = svc;
      this._handlers = {};
      this._fns = [];
      this._channels = {};
      this._nextChannelId = 1;
      this._cache = opts.cache || {};
      this._defaultHandler = opts.defaultHandler;
      this._sysErrFormatter = opts.systemErrorFormatter;
      this._silent = !!opts.silent;
      this._strict = !!opts.strictTypes;
      if (opts.remoteProtocols) {
        insertRemoteProtocols(this._cache, opts.remoteProtocols, svc, false);
      }
      svc.messages.forEach(function(msg) {
        var name = msg.name;
        if (!opts.noCapitalize) {
          name = utils.capitalize(name);
        }
        this["on" + name] = this._createMessageHandler(msg);
      }, this);
    }
    util.inherits(Server, events.EventEmitter);
    Server.prototype.activeChannels = function() {
      return utils.objectValues(this._channels);
    };
    Server.prototype.createChannel = function(transport, opts) {
      var objectMode = opts && opts.objectMode;
      var channel;
      if (typeof transport == "function") {
        var readableFactory;
        if (objectMode) {
          readableFactory = transport;
        } else {
          readableFactory = function(cb) {
            var decoder2 = new FrameDecoder().once("error", function(err) {
              channel.destroy(err);
            });
            return transport(function(err, writable2) {
              if (err) {
                cb(err);
                return;
              }
              var encoder2 = new FrameEncoder();
              encoder2.pipe(writable2);
              cb(null, encoder2);
            }).pipe(decoder2);
          };
        }
        channel = new StatelessServerChannel(this, readableFactory, opts);
      } else {
        var readable, writable;
        if (isStream(transport)) {
          readable = writable = transport;
        } else {
          readable = transport.readable;
          writable = transport.writable;
        }
        if (!objectMode) {
          var decoder = new NettyDecoder();
          readable = readable.pipe(decoder);
          var encoder = new NettyEncoder();
          encoder.pipe(writable);
          writable = encoder;
        }
        channel = new StatefulServerChannel(this, readable, writable, opts);
        if (!objectMode) {
          channel.once("eot", function() {
            readable.unpipe(decoder);
            encoder.unpipe(writable);
          });
          decoder.once("error", function(err) {
            channel.destroy(err);
          });
        }
      }
      if (!this.listeners("error").length) {
        this.on("error", this._onError);
      }
      var channelId = this._nextChannelId++;
      var channels = this._channels;
      channels[channelId] = channel.once("eot", function() {
        delete channels[channelId];
      });
      this.emit("channel", channel);
      return channel;
    };
    Server.prototype.onMessage = function(name, handler) {
      getExistingMessage(this.service, name);
      this._handlers[name] = handler;
      return this;
    };
    Server.prototype.remoteProtocols = function() {
      return getRemoteProtocols(this._cache, false);
    };
    Server.prototype.use = function() {
      var i, l, fn;
      for (i = 0, l = arguments.length; i < l; i++) {
        fn = arguments[i];
        this._fns.push(fn.length < 3 ? fn(this) : fn);
      }
      return this;
    };
    Server.prototype._createMessageHandler = function(msg) {
      var name = msg.name;
      var fields = msg.requestType.fields;
      var numArgs = fields.length;
      var args = fields.length ? ", " + fields.map(function(f2) {
        return "req." + f2.name;
      }).join(", ") : "";
      var body = "return function (handler) {\n";
      body += "  if (handler.length > " + numArgs + ") {\n";
      body += "    return this.onMessage('" + name + "', function (req, cb) {\n";
      body += "      return handler.call(this" + args + ", cb);\n";
      body += "    });\n";
      body += "  } else {\n";
      body += "    return this.onMessage('" + name + "', function (req) {\n";
      body += "      return handler.call(this" + args + ");\n";
      body += "    });\n";
      body += "  }\n";
      body += "};\n";
      return new Function(body)();
    };
    Server.prototype._onError = function(err) {
      if (!this._silent && err.rpcCode !== "UNKNOWN_PROTOCOL") {
        console.error();
        if (err.rpcCode) {
          console.error(err.rpcCode);
          console.error(err.cause);
        } else {
          console.error("INTERNAL_SERVER_ERROR");
          console.error(err);
        }
      }
    };
    function ClientChannel(client, opts) {
      opts = opts || {};
      events.EventEmitter.call(this);
      this.client = client;
      this.timeout = utils.getOption(opts, "timeout", client._timeout$);
      this._endWritable = !!utils.getOption(opts, "endWritable", true);
      this._prefix = normalizedPrefix(opts.scope);
      var cache = client._cache$;
      var clientSvc = client._svc$;
      var hash = opts.serverHash;
      if (!hash) {
        hash = clientSvc.hash;
      }
      var adapter = cache[hash];
      if (!adapter) {
        hash = clientSvc.hash;
        adapter = cache[hash] = new Adapter(clientSvc, clientSvc, hash);
      }
      this._adapter = adapter;
      this._registry = new Registry(this, PREFIX_LENGTH);
      this.pending = 0;
      this.destroyed = false;
      this.draining = false;
      this.once("_eot", function(pending, err) {
        debug("client channel EOT");
        this.destroyed = true;
        this.emit("eot", pending, err);
      });
    }
    util.inherits(ClientChannel, events.EventEmitter);
    ClientChannel.prototype.destroy = function(noWait) {
      debug("destroying client channel");
      if (!this.draining) {
        this.draining = true;
        this.emit("_drain");
      }
      var registry = this._registry;
      var pending = this.pending;
      if (noWait) {
        registry.clear();
      }
      if (noWait || !pending) {
        if (isError(noWait)) {
          debug("fatal client channel error: %s", noWait);
          this.emit("_eot", pending, noWait);
        } else {
          this.emit("_eot", pending);
        }
      } else {
        debug("client channel entering drain mode (%s pending)", pending);
      }
    };
    ClientChannel.prototype.ping = function(timeout, cb) {
      if (!cb && typeof timeout == "function") {
        cb = timeout;
        timeout = void 0;
      }
      var self2 = this;
      var wreq = new WrappedRequest(PING_MESSAGE);
      this._emit(wreq, { timeout }, function(err) {
        if (cb) {
          cb.call(self2, err);
        } else if (err) {
          self2.destroy(err);
        }
      });
    };
    ClientChannel.prototype._createHandshakeRequest = function(adapter, noSvc) {
      var svc = this.client._svc$;
      return {
        clientHash: svc.hash,
        clientProtocol: noSvc ? null : JSON.stringify(svc.protocol),
        serverHash: adapter._hash
      };
    };
    ClientChannel.prototype._emit = function(wreq, opts, cb) {
      var msg = wreq._msg;
      var wres = msg.oneWay ? void 0 : new WrappedResponse(msg, {});
      var ctx = new CallContext(msg, this);
      var self2 = this;
      this.pending++;
      process.nextTick(function() {
        if (!msg.name) {
          onTransition(wreq, wres, onCompletion);
        } else {
          self2.emit("outgoingCall", ctx, opts);
          var fns = self2.client._fns$;
          debug("starting client middleware chain (%s middleware)", fns.length);
          chainMiddleware({
            fns,
            ctx,
            wreq,
            wres,
            onTransition,
            onCompletion,
            onError
          });
        }
      });
      function onTransition(wreq2, wres2, prev) {
        var err, reqBuf;
        if (self2.destroyed) {
          err = new Error("channel destroyed");
        } else {
          try {
            reqBuf = wreq2.toBuffer();
          } catch (cause) {
            err = serializationError(f("invalid %j request", msg.name), wreq2, [
              { name: "headers", type: MAP_BYTES_TYPE },
              { name: "request", type: msg.requestType }
            ]);
          }
        }
        if (err) {
          prev(err);
          return;
        }
        var timeout = opts && opts.timeout !== void 0 ? opts.timeout : self2.timeout;
        var id = self2._registry.add(timeout, function(err2, resBuf, adapter) {
          if (!err2 && !msg.oneWay) {
            try {
              adapter._decodeResponse(resBuf, wres2, msg);
            } catch (cause) {
              err2 = cause;
            }
          }
          prev(err2);
        });
        id |= self2._prefix;
        debug("sending message %s", id);
        self2._send(id, reqBuf, !!msg && msg.oneWay);
      }
      function onCompletion(err) {
        self2.pending--;
        cb.call(ctx, err, wres);
        if (self2.draining && !self2.destroyed && !self2.pending) {
          self2.destroy();
        }
      }
      function onError(err) {
        self2.client.emit("error", err, self2);
      }
    };
    ClientChannel.prototype._getAdapter = function(hres) {
      var hash = hres.serverHash;
      var cache = this.client._cache$;
      var adapter = cache[hash];
      if (adapter) {
        return adapter;
      }
      var ptcl = JSON.parse(hres.serverProtocol);
      var serverSvc = Service.forProtocol(ptcl);
      adapter = new Adapter(this.client._svc$, serverSvc, hash, true);
      return cache[hash] = adapter;
    };
    ClientChannel.prototype._matchesPrefix = function(id) {
      return matchesPrefix(id, this._prefix);
    };
    ClientChannel.prototype._send = utils.abstractFunction;
    utils.addDeprecatedGetters(ClientChannel, ["pending", "timeout"]);
    ClientChannel.prototype.getCache = util.deprecate(function() {
      return this.client._cache$;
    }, "use `.remoteProtocols()` instead of `.getCache()`");
    ClientChannel.prototype.getProtocol = util.deprecate(function() {
      return this.client._svc$;
    }, "use `.service` instead or `.getProtocol()`");
    ClientChannel.prototype.isDestroyed = util.deprecate(function() {
      return this.destroyed;
    }, "use `.destroyed` instead of `.isDestroyed`");
    function StatelessClientChannel(client, writableFactory, opts) {
      ClientChannel.call(this, client, opts);
      this._writableFactory = writableFactory;
      if (!opts || !opts.noPing) {
        debug("emitting ping request");
        this.ping();
      }
    }
    util.inherits(StatelessClientChannel, ClientChannel);
    StatelessClientChannel.prototype._send = function(id, reqBuf) {
      var cb = this._registry.get(id);
      var adapter = this._adapter;
      var self2 = this;
      process.nextTick(emit);
      return true;
      function emit(retry) {
        if (self2.destroyed) {
          return;
        }
        var hreq = self2._createHandshakeRequest(adapter, !retry);
        var writable = self2._writableFactory.call(self2, function(err, readable) {
          if (err) {
            cb(err);
            return;
          }
          readable.on("data", function(obj) {
            debug("received response %s", obj.id);
            var buf = Buffer.concat(obj.payload);
            try {
              var parts = readHead(HANDSHAKE_RESPONSE_TYPE, buf);
              var hres = parts.head;
              if (hres.serverHash) {
                adapter = self2._getAdapter(hres);
              }
            } catch (cause) {
              cb(cause);
              return;
            }
            var match = hres.match;
            debug("handshake match: %s", match);
            self2.emit("handshake", hreq, hres);
            if (match === "NONE") {
              process.nextTick(function() {
                emit(true);
              });
            } else {
              self2._adapter = adapter;
              cb(null, parts.tail, adapter);
            }
          });
        });
        if (!writable) {
          cb(new Error("invalid writable stream"));
          return;
        }
        writable.write({
          id,
          payload: [HANDSHAKE_REQUEST_TYPE.toBuffer(hreq), reqBuf]
        });
        if (self2._endWritable) {
          writable.end();
        }
      }
    };
    function StatefulClientChannel(client, readable, writable, opts) {
      ClientChannel.call(this, client, opts);
      this._readable = readable;
      this._writable = writable;
      this._connected = !!(opts && opts.noPing);
      this._readable.on("end", onEnd);
      this._writable.on("finish", onFinish);
      var self2 = this;
      var timer = null;
      this.once("eot", function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        if (!self2._connected) {
          self2.emit("_ready");
        }
        this._writable.removeListener("finish", onFinish);
        if (this._endWritable) {
          debug("ending transport");
          this._writable.end();
        }
        this._readable.removeListener("data", onPing).removeListener("data", onMessage).removeListener("end", onEnd);
      });
      var hreq;
      if (this._connected) {
        this._readable.on("data", onMessage);
      } else {
        this._readable.on("data", onPing);
        process.nextTick(ping);
        if (self2.timeout) {
          timer = setTimeout(function() {
            self2.destroy(new Error("timeout"));
          }, self2.timeout);
        }
      }
      function ping(retry) {
        if (self2.destroyed) {
          return;
        }
        hreq = self2._createHandshakeRequest(self2._adapter, !retry);
        var payload = [
          HANDSHAKE_REQUEST_TYPE.toBuffer(hreq),
          utils.bufferFrom([0, 0])
        ];
        self2._writable.write({ id: self2._prefix, payload });
      }
      function onPing(obj) {
        if (!self2._matchesPrefix(obj.id)) {
          debug("discarding unscoped response %s (still connecting)", obj.id);
          return;
        }
        var buf = Buffer.concat(obj.payload);
        try {
          var hres = readHead(HANDSHAKE_RESPONSE_TYPE, buf).head;
          if (hres.serverHash) {
            self2._adapter = self2._getAdapter(hres);
          }
        } catch (cause) {
          self2.destroy(cause);
          return;
        }
        var match = hres.match;
        debug("handshake match: %s", match);
        self2.emit("handshake", hreq, hres);
        if (match === "NONE") {
          process.nextTick(function() {
            ping(true);
          });
        } else {
          debug("successfully connected");
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          self2._readable.removeListener("data", onPing).on("data", onMessage);
          self2._connected = true;
          self2.emit("_ready");
          hreq = null;
        }
      }
      function onMessage(obj) {
        var id = obj.id;
        if (!self2._matchesPrefix(id)) {
          debug("discarding unscoped message %s", id);
          return;
        }
        var cb = self2._registry.get(id);
        if (cb) {
          process.nextTick(function() {
            debug("received message %s", id);
            cb(null, Buffer.concat(obj.payload), self2._adapter);
          });
        }
      }
      function onEnd() {
        self2.destroy(true);
      }
      function onFinish() {
        self2.destroy();
      }
    }
    util.inherits(StatefulClientChannel, ClientChannel);
    StatefulClientChannel.prototype._emit = function() {
      if (this._connected || this.draining) {
        ClientChannel.prototype._emit.apply(this, arguments);
      } else {
        debug("queuing request");
        var args = [];
        var i, l;
        for (i = 0, l = arguments.length; i < l; i++) {
          args.push(arguments[i]);
        }
        this.once("_ready", function() {
          this._emit.apply(this, args);
        });
      }
    };
    StatefulClientChannel.prototype._send = function(id, reqBuf, oneWay) {
      if (oneWay) {
        var self2 = this;
        process.nextTick(function() {
          self2._registry.get(id)(null, utils.bufferFrom([0, 0, 0]), self2._adapter);
        });
      }
      return this._writable.write({ id, payload: [reqBuf] });
    };
    function ServerChannel(server, opts) {
      opts = opts || {};
      events.EventEmitter.call(this);
      this.server = server;
      this._endWritable = !!utils.getOption(opts, "endWritable", true);
      this._prefix = normalizedPrefix(opts.scope);
      var cache = server._cache;
      var svc = server.service;
      var hash = svc.hash;
      if (!cache[hash]) {
        cache[hash] = new Adapter(svc, svc, hash);
      }
      this._adapter = null;
      this.destroyed = false;
      this.draining = false;
      this.pending = 0;
      this.once("_eot", function(pending, err) {
        debug("server channel EOT");
        this.emit("eot", pending, err);
      });
    }
    util.inherits(ServerChannel, events.EventEmitter);
    ServerChannel.prototype.destroy = function(noWait) {
      if (!this.draining) {
        this.draining = true;
        this.emit("_drain");
      }
      if (noWait || !this.pending) {
        this.destroyed = true;
        if (isError(noWait)) {
          debug("fatal server channel error: %s", noWait);
          this.emit("_eot", this.pending, noWait);
        } else {
          this.emit("_eot", this.pending);
        }
      }
    };
    ServerChannel.prototype._createHandshakeResponse = function(err, hreq) {
      var svc = this.server.service;
      var buf = svc.hash;
      var serverMatch = hreq && hreq.serverHash.equals(buf);
      return {
        match: err ? "NONE" : serverMatch ? "BOTH" : "CLIENT",
        serverProtocol: serverMatch ? null : JSON.stringify(svc.protocol),
        serverHash: serverMatch ? null : buf
      };
    };
    ServerChannel.prototype._getAdapter = function(hreq) {
      var hash = hreq.clientHash;
      var adapter = this.server._cache[hash];
      if (adapter) {
        return adapter;
      }
      if (!hreq.clientProtocol) {
        throw toRpcError("UNKNOWN_PROTOCOL");
      }
      var ptcl = JSON.parse(hreq.clientProtocol);
      var clientSvc = Service.forProtocol(ptcl);
      adapter = new Adapter(clientSvc, this.server.service, hash, true);
      return this.server._cache[hash] = adapter;
    };
    ServerChannel.prototype._matchesPrefix = function(id) {
      return matchesPrefix(id, this._prefix);
    };
    ServerChannel.prototype._receive = function(reqBuf, adapter, cb) {
      var self2 = this;
      var wreq;
      try {
        wreq = adapter._decodeRequest(reqBuf);
      } catch (cause) {
        cb(self2._encodeSystemError(toRpcError("INVALID_REQUEST", cause)));
        return;
      }
      var msg = wreq._msg;
      var wres = new WrappedResponse(msg, {});
      if (!msg.name) {
        wres.response = null;
        cb(wres.toBuffer(), false);
        return;
      }
      var ctx = new CallContext(msg, this);
      self2.emit("incomingCall", ctx);
      var fns = this.server._fns;
      debug("starting server middleware chain (%s middleware)", fns.length);
      self2.pending++;
      chainMiddleware({
        fns,
        ctx,
        wreq,
        wres,
        onTransition,
        onCompletion,
        onError
      });
      function onTransition(wreq2, wres2, prev) {
        var handler = self2.server._handlers[msg.name];
        if (!handler) {
          var defaultHandler = self2.server._defaultHandler;
          if (defaultHandler) {
            defaultHandler.call(ctx, wreq2, wres2, prev);
          } else {
            var cause = new Error(f("no handler for %s", msg.name));
            prev(toRpcError("NOT_IMPLEMENTED", cause));
          }
        } else {
          var pending = !msg.oneWay;
          try {
            if (pending) {
              handler.call(ctx, wreq2.request, function(err, res) {
                pending = false;
                wres2.error = err;
                wres2.response = res;
                prev();
              });
            } else {
              handler.call(ctx, wreq2.request);
              prev();
            }
          } catch (err) {
            if (pending) {
              pending = false;
              prev(err);
            } else {
              onError(err);
            }
          }
        }
      }
      function onCompletion(err) {
        self2.pending--;
        var server = self2.server;
        var resBuf;
        if (!err) {
          var resErr = wres.error;
          var isStrict = server._strict;
          if (!isStrict) {
            if (isError(resErr)) {
              wres.error = msg.errorType.clone(resErr.message, { wrapUnions: true });
            } else if (resErr === null) {
              resErr = wres.error = void 0;
            }
            if (resErr === void 0 && wres.response === void 0 && msg.responseType.isValid(null)) {
              wres.response = null;
            }
          }
          try {
            resBuf = wres.toBuffer();
          } catch (cause) {
            if (wres.error !== void 0) {
              err = serializationError(f("invalid %j error", msg.name), wres, [
                { name: "headers", type: MAP_BYTES_TYPE },
                { name: "error", type: msg.errorType }
              ]);
            } else {
              err = serializationError(f("invalid %j response", msg.name), wres, [
                { name: "headers", type: MAP_BYTES_TYPE },
                { name: "response", type: msg.responseType }
              ]);
            }
          }
        }
        if (!resBuf) {
          resBuf = self2._encodeSystemError(err, wres.headers);
        } else if (resErr !== void 0) {
          server.emit("error", toRpcError("APPLICATION_ERROR", resErr));
        }
        cb(resBuf, msg.oneWay);
        if (self2.draining && !self2.pending) {
          self2.destroy();
        }
      }
      function onError(err) {
        self2.server.emit("error", err, self2);
      }
    };
    utils.addDeprecatedGetters(ServerChannel, ["pending"]);
    ServerChannel.prototype.getCache = util.deprecate(function() {
      return this.server._cache;
    }, "use `.remoteProtocols()` instead of `.getCache()`");
    ServerChannel.prototype.getProtocol = util.deprecate(function() {
      return this.server.service;
    }, "use `.service` instead of `.getProtocol()`");
    ServerChannel.prototype.isDestroyed = util.deprecate(function() {
      return this.destroyed;
    }, "use `.destroyed` instead of `.isDestroyed`");
    ServerChannel.prototype._encodeSystemError = function(err, header) {
      var server = this.server;
      server.emit("error", err, this);
      var errStr;
      if (server._sysErrFormatter) {
        errStr = server._sysErrFormatter.call(this, err);
      } else if (err.rpcCode) {
        errStr = err.message;
      }
      var hdrBuf;
      if (header) {
        try {
          hdrBuf = MAP_BYTES_TYPE.toBuffer(header);
        } catch (cause) {
          server.emit("error", cause, this);
        }
      }
      return Buffer.concat([
        hdrBuf || utils.bufferFrom([0]),
        utils.bufferFrom([1, 0]),
        STRING_TYPE.toBuffer(errStr || "internal server error")
      ]);
    };
    function StatelessServerChannel(server, readableFactory, opts) {
      ServerChannel.call(this, server, opts);
      this._writable = void 0;
      var self2 = this;
      var readable;
      process.nextTick(function() {
        readable = readableFactory.call(self2, function(err, writable) {
          process.nextTick(function() {
            if (err) {
              onFinish(err);
              return;
            }
            self2._writable = writable.on("finish", onFinish);
            self2.emit("_writable");
          });
        }).on("data", onRequest).on("end", onEnd);
      });
      function onRequest(obj) {
        var id = obj.id;
        var buf = Buffer.concat(obj.payload);
        var err;
        try {
          var parts = readHead(HANDSHAKE_REQUEST_TYPE, buf);
          var hreq = parts.head;
          var adapter = self2._getAdapter(hreq);
        } catch (cause) {
          err = toRpcError("INVALID_HANDSHAKE_REQUEST", cause);
        }
        var hres = self2._createHandshakeResponse(err, hreq);
        self2.emit("handshake", hreq, hres);
        if (err) {
          done(self2._encodeSystemError(err));
        } else {
          self2._receive(parts.tail, adapter, done);
        }
        function done(resBuf) {
          if (!self2.destroyed) {
            if (!self2._writable) {
              self2.once("_writable", function() {
                done(resBuf);
              });
              return;
            }
            self2._writable.write({
              id,
              payload: [HANDSHAKE_RESPONSE_TYPE.toBuffer(hres), resBuf]
            });
          }
          if (self2._writable && self2._endWritable) {
            self2._writable.end();
          }
        }
      }
      function onEnd() {
        self2.destroy();
      }
      function onFinish(err) {
        readable.removeListener("data", onRequest).removeListener("end", onEnd);
        self2.destroy(err || true);
      }
    }
    util.inherits(StatelessServerChannel, ServerChannel);
    function StatefulServerChannel(server, readable, writable, opts) {
      ServerChannel.call(this, server, opts);
      this._adapter = void 0;
      this._writable = writable.on("finish", onFinish);
      this._readable = readable.on("data", onHandshake).on("end", onEnd);
      this.once("_drain", function() {
        this._readable.removeListener("data", onHandshake).removeListener("data", onRequest).removeListener("end", onEnd);
      }).once("eot", function() {
        this._writable.removeListener("finish", onFinish);
        if (this._endWritable) {
          this._writable.end();
        }
      });
      var self2 = this;
      function onHandshake(obj) {
        var id = obj.id;
        if (!self2._matchesPrefix(id)) {
          return;
        }
        var buf = Buffer.concat(obj.payload);
        var err;
        try {
          var parts = readHead(HANDSHAKE_REQUEST_TYPE, buf);
          var hreq = parts.head;
          self2._adapter = self2._getAdapter(hreq);
        } catch (cause) {
          err = toRpcError("INVALID_HANDSHAKE_REQUEST", cause);
        }
        var hres = self2._createHandshakeResponse(err, hreq);
        self2.emit("handshake", hreq, hres);
        if (err) {
          done(self2._encodeSystemError(err));
        } else {
          self2._readable.removeListener("data", onHandshake).on("data", onRequest);
          self2._receive(parts.tail, self2._adapter, done);
        }
        function done(resBuf) {
          if (self2.destroyed) {
            return;
          }
          self2._writable.write({
            id,
            payload: [HANDSHAKE_RESPONSE_TYPE.toBuffer(hres), resBuf]
          });
        }
      }
      function onRequest(obj) {
        var id = obj.id;
        if (!self2._matchesPrefix(id)) {
          return;
        }
        var reqBuf = Buffer.concat(obj.payload);
        self2._receive(reqBuf, self2._adapter, function(resBuf, oneWay) {
          if (self2.destroyed || oneWay) {
            return;
          }
          self2._writable.write({ id, payload: [resBuf] });
        });
      }
      function onEnd() {
        self2.destroy();
      }
      function onFinish() {
        self2.destroy(true);
      }
    }
    util.inherits(StatefulServerChannel, ServerChannel);
    function WrappedRequest(msg, hdrs, req) {
      this._msg = msg;
      this.headers = hdrs || {};
      this.request = req || {};
    }
    WrappedRequest.prototype.toBuffer = function() {
      var msg = this._msg;
      return Buffer.concat([
        MAP_BYTES_TYPE.toBuffer(this.headers),
        STRING_TYPE.toBuffer(msg.name),
        msg.requestType.toBuffer(this.request)
      ]);
    };
    function WrappedResponse(msg, hdr, err, res) {
      this._msg = msg;
      this.headers = hdr;
      this.error = err;
      this.response = res;
    }
    WrappedResponse.prototype.toBuffer = function() {
      var hdr = MAP_BYTES_TYPE.toBuffer(this.headers);
      var hasError = this.error !== void 0;
      return Buffer.concat([
        hdr,
        BOOLEAN_TYPE.toBuffer(hasError),
        hasError ? this._msg.errorType.toBuffer(this.error) : this._msg.responseType.toBuffer(this.response)
      ]);
    };
    function CallContext(msg, channel) {
      this.channel = channel;
      this.locals = {};
      this.message = msg;
      Object.freeze(this);
    }
    function Registry(ctx, prefixLength) {
      this._ctx = ctx;
      this._mask = ~0 >>> (prefixLength | 0);
      this._id = 0;
      this._n = 0;
      this._cbs = {};
    }
    Registry.prototype.get = function(id) {
      return this._cbs[id & this._mask];
    };
    Registry.prototype.add = function(timeout, fn) {
      this._id = this._id + 1 & this._mask;
      var self2 = this;
      var id = this._id;
      var timer;
      if (timeout > 0) {
        timer = setTimeout(function() {
          cb(new Error("timeout"));
        }, timeout);
      }
      this._cbs[id] = cb;
      this._n++;
      return id;
      function cb() {
        if (!self2._cbs[id]) {
          return;
        }
        delete self2._cbs[id];
        self2._n--;
        if (timer) {
          clearTimeout(timer);
        }
        fn.apply(self2._ctx, arguments);
      }
    };
    Registry.prototype.clear = function() {
      Object.keys(this._cbs).forEach(function(id) {
        this._cbs[id](new Error("interrupted"));
      }, this);
    };
    function Adapter(clientSvc, serverSvc, hash, isRemote) {
      this._clientSvc = clientSvc;
      this._serverSvc = serverSvc;
      this._hash = hash;
      this._isRemote = !!isRemote;
      this._readers = createReaders(clientSvc, serverSvc);
    }
    Adapter.prototype._decodeRequest = function(buf) {
      var tap = new Tap(buf);
      var hdr = MAP_BYTES_TYPE._read(tap);
      var name = STRING_TYPE._read(tap);
      var msg, req;
      if (name) {
        msg = this._serverSvc.message(name);
        req = this._readers[name + "?"]._read(tap);
      } else {
        msg = PING_MESSAGE;
      }
      if (!tap.isValid()) {
        throw new Error(f("truncated %s request", name || "ping$"));
      }
      return new WrappedRequest(msg, hdr, req);
    };
    Adapter.prototype._decodeResponse = function(buf, wres, msg) {
      var tap = new Tap(buf);
      utils.copyOwnProperties(MAP_BYTES_TYPE._read(tap), wres.headers, true);
      var isError2 = BOOLEAN_TYPE._read(tap);
      var name = msg.name;
      if (name) {
        var reader = this._readers[name + (isError2 ? "*" : "!")];
        msg = this._clientSvc.message(name);
        if (isError2) {
          wres.error = reader._read(tap);
        } else {
          wres.response = reader._read(tap);
        }
        if (!tap.isValid()) {
          throw new Error(f("truncated %s response", name));
        }
      } else {
        msg = PING_MESSAGE;
      }
    };
    function FrameDecoder() {
      stream.Transform.call(this, { readableObjectMode: true });
      this._id = void 0;
      this._buf = utils.newBuffer(0);
      this._bufs = [];
      this.on("finish", function() {
        this.push(null);
      });
    }
    util.inherits(FrameDecoder, stream.Transform);
    FrameDecoder.prototype._transform = function(buf, encoding, cb) {
      buf = Buffer.concat([this._buf, buf]);
      var frameLength;
      while (buf.length >= 4 && buf.length >= (frameLength = buf.readInt32BE(0)) + 4) {
        if (frameLength) {
          this._bufs.push(buf.slice(4, frameLength + 4));
        } else {
          var bufs = this._bufs;
          this._bufs = [];
          this.push({ id: null, payload: bufs });
        }
        buf = buf.slice(frameLength + 4);
      }
      this._buf = buf;
      cb();
    };
    FrameDecoder.prototype._flush = function(cb) {
      if (this._buf.length || this._bufs.length) {
        var bufs = this._bufs.slice();
        bufs.unshift(this._buf);
        var err = toRpcError("TRAILING_DATA");
        err.trailingData = Buffer.concat(bufs).toString();
        this.emit("error", err);
      }
      cb();
    };
    function FrameEncoder() {
      stream.Transform.call(this, { writableObjectMode: true });
      this.on("finish", function() {
        this.push(null);
      });
    }
    util.inherits(FrameEncoder, stream.Transform);
    FrameEncoder.prototype._transform = function(obj, encoding, cb) {
      var bufs = obj.payload;
      var i, l, buf;
      for (i = 0, l = bufs.length; i < l; i++) {
        buf = bufs[i];
        this.push(intBuffer(buf.length));
        this.push(buf);
      }
      this.push(intBuffer(0));
      cb();
    };
    function NettyDecoder() {
      stream.Transform.call(this, { readableObjectMode: true });
      this._id = void 0;
      this._frameCount = 0;
      this._buf = utils.newBuffer(0);
      this._bufs = [];
      this.on("finish", function() {
        this.push(null);
      });
    }
    util.inherits(NettyDecoder, stream.Transform);
    NettyDecoder.prototype._transform = function(buf, encoding, cb) {
      buf = Buffer.concat([this._buf, buf]);
      while (true) {
        if (this._id === void 0) {
          if (buf.length < 8) {
            this._buf = buf;
            cb();
            return;
          }
          this._id = buf.readInt32BE(0);
          this._frameCount = buf.readInt32BE(4);
          buf = buf.slice(8);
        }
        var frameLength;
        while (this._frameCount && buf.length >= 4 && buf.length >= (frameLength = buf.readInt32BE(0)) + 4) {
          this._frameCount--;
          this._bufs.push(buf.slice(4, frameLength + 4));
          buf = buf.slice(frameLength + 4);
        }
        if (this._frameCount) {
          this._buf = buf;
          cb();
          return;
        } else {
          var obj = { id: this._id, payload: this._bufs };
          this._bufs = [];
          this._id = void 0;
          this.push(obj);
        }
      }
    };
    NettyDecoder.prototype._flush = FrameDecoder.prototype._flush;
    function NettyEncoder() {
      stream.Transform.call(this, { writableObjectMode: true });
      this.on("finish", function() {
        this.push(null);
      });
    }
    util.inherits(NettyEncoder, stream.Transform);
    NettyEncoder.prototype._transform = function(obj, encoding, cb) {
      var bufs = obj.payload;
      var l = bufs.length;
      var buf;
      buf = utils.newBuffer(8);
      buf.writeInt32BE(obj.id, 0);
      buf.writeInt32BE(l, 4);
      this.push(buf);
      var i;
      for (i = 0; i < l; i++) {
        buf = bufs[i];
        this.push(intBuffer(buf.length));
        this.push(buf);
      }
      cb();
    };
    function intBuffer(n) {
      var buf = utils.newBuffer(4);
      buf.writeInt32BE(n);
      return buf;
    }
    function readHead(type, buf) {
      var tap = new Tap(buf);
      var head = type._read(tap);
      if (!tap.isValid()) {
        throw new Error(f("truncated %j", type.schema()));
      }
      return { head, tail: tap.buf.slice(tap.pos) };
    }
    function createReader(rtype, wtype) {
      return rtype.equals(wtype) ? rtype : rtype.createResolver(wtype);
    }
    function createReaders(clientSvc, serverSvc) {
      var obj = {};
      clientSvc.messages.forEach(function(c) {
        var n = c.name;
        var s = serverSvc.message(n);
        try {
          if (!s) {
            throw new Error(f("missing server message: %s", n));
          }
          if (s.oneWay !== c.oneWay) {
            throw new Error(f("inconsistent one-way message: %s", n));
          }
          obj[n + "?"] = createReader(s.requestType, c.requestType);
          obj[n + "*"] = createReader(c.errorType, s.errorType);
          obj[n + "!"] = createReader(c.responseType, s.responseType);
        } catch (cause) {
          throw toRpcError("INCOMPATIBLE_PROTOCOL", cause);
        }
      });
      return obj;
    }
    function insertRemoteProtocols(cache, ptcls, svc, isClient) {
      Object.keys(ptcls).forEach(function(hash) {
        var ptcl = ptcls[hash];
        var clientSvc, serverSvc;
        if (isClient) {
          clientSvc = svc;
          serverSvc = Service.forProtocol(ptcl);
        } else {
          clientSvc = Service.forProtocol(ptcl);
          serverSvc = svc;
        }
        cache[hash] = new Adapter(clientSvc, serverSvc, hash, true);
      });
    }
    function getRemoteProtocols(cache, isClient) {
      var ptcls = {};
      Object.keys(cache).forEach(function(hs) {
        var adapter = cache[hs];
        if (adapter._isRemote) {
          var svc = isClient ? adapter._serverSvc : adapter._clientSvc;
          ptcls[hs] = svc.protocol;
        }
      });
      return ptcls;
    }
    function isError(any) {
      return !!any && Object.prototype.toString.call(any) === "[object Error]";
    }
    function forwardErrors(src, dst) {
      return src.on("error", function(err) {
        dst.emit("error", err, src);
      });
    }
    function toError(msg, cause) {
      var err = new Error(msg);
      err.cause = cause;
      return err;
    }
    function toRpcError(rpcCode, cause) {
      var err = toError(rpcCode.toLowerCase().replace(/_/g, " "), cause);
      err.rpcCode = cause && cause.rpcCode ? cause.rpcCode : rpcCode;
      return err;
    }
    function serializationError(msg, obj, fields) {
      var details = [];
      var i, l, field;
      for (i = 0, l = fields.length; i < l; i++) {
        field = fields[i];
        field.type.isValid(obj[field.name], { errorHook });
      }
      var detailsStr = details.map(function(obj2) {
        return f("%s = %j but expected %s", obj2.path, obj2.value, obj2.type);
      }).join(", ");
      var err = new Error(f("%s (%s)", msg, detailsStr));
      err.details = details;
      return err;
      function errorHook(parts, any, type) {
        var strs = [];
        var i2, l2, part;
        for (i2 = 0, l2 = parts.length; i2 < l2; i2++) {
          part = parts[i2];
          if (isNaN(part)) {
            strs.push("." + part);
          } else {
            strs.push("[" + part + "]");
          }
        }
        details.push({
          path: field.name + strs.join(""),
          value: any,
          type
        });
      }
    }
    function normalizedPrefix(scope) {
      return scope ? utils.getHash(scope).readInt16BE(0) << 32 - PREFIX_LENGTH : 0;
    }
    function matchesPrefix(id, prefix) {
      return (id ^ prefix) >> 32 - PREFIX_LENGTH === 0;
    }
    function isStream(any) {
      return !!(any && any.pipe);
    }
    function getExistingMessage(svc, name) {
      var msg = svc.message(name);
      if (!msg) {
        throw new Error(f("unknown message: %s", name));
      }
      return msg;
    }
    function chainMiddleware(params) {
      var args = [params.wreq, params.wres];
      var cbs = [];
      var cause;
      forward(0);
      function forward(pos) {
        var isDone = false;
        if (pos < params.fns.length) {
          params.fns[pos].apply(params.ctx, args.concat(function(err, cb) {
            if (isDone) {
              params.onError(toError("duplicate forward middleware call", err));
              return;
            }
            isDone = true;
            if (err || params.wres && (params.wres.error !== void 0 || params.wres.response !== void 0)) {
              cause = err;
              backward();
              return;
            }
            if (cb) {
              cbs.push(cb);
            }
            forward(++pos);
          }));
        } else {
          params.onTransition.apply(params.ctx, args.concat(function(err) {
            if (isDone) {
              params.onError(toError("duplicate handler call", err));
              return;
            }
            isDone = true;
            cause = err;
            process.nextTick(backward);
          }));
        }
      }
      function backward() {
        var cb = cbs.pop();
        if (cb) {
          var isDone = false;
          cb.call(params.ctx, cause, function(err) {
            if (isDone) {
              params.onError(toError("duplicate backward middleware call", err));
              return;
            }
            cause = err;
            isDone = true;
            backward();
          });
        } else {
          params.onCompletion.call(params.ctx, cause);
        }
      }
    }
    module2.exports = {
      Adapter,
      HANDSHAKE_REQUEST_TYPE,
      HANDSHAKE_RESPONSE_TYPE,
      Message,
      Registry,
      Service,
      discoverProtocol,
      streams: {
        FrameDecoder,
        FrameEncoder,
        NettyDecoder,
        NettyEncoder
      }
    };
  }
});

// node_modules/avsc/lib/files.js
var require_files = __commonJS({
  "node_modules/avsc/lib/files.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var path = require("path");
    function createImportHook() {
      var imports = {};
      return function(fpath, kind, cb) {
        fpath = path.resolve(fpath);
        if (imports[fpath]) {
          process.nextTick(cb);
          return;
        }
        imports[fpath] = true;
        fs2.readFile(fpath, { encoding: "utf8" }, cb);
      };
    }
    function createSyncImportHook() {
      var imports = {};
      return function(fpath, kind, cb) {
        fpath = path.resolve(fpath);
        if (imports[fpath]) {
          cb();
        } else {
          imports[fpath] = true;
          cb(null, fs2.readFileSync(fpath, { encoding: "utf8" }));
        }
      };
    }
    module2.exports = {
      createImportHook,
      createSyncImportHook,
      existsSync: fs2.existsSync,
      readFileSync: fs2.readFileSync
    };
  }
});

// node_modules/avsc/lib/specs.js
var require_specs = __commonJS({
  "node_modules/avsc/lib/specs.js"(exports2, module2) {
    "use strict";
    var files = require_files();
    var utils = require_utils3();
    var path = require("path");
    var util = require("util");
    var f = util.format;
    var TYPE_REFS = {
      date: { type: "int", logicalType: "date" },
      decimal: { type: "bytes", logicalType: "decimal" },
      time_ms: { type: "long", logicalType: "time-millis" },
      timestamp_ms: { type: "long", logicalType: "timestamp-millis" }
    };
    function assembleProtocol(fpath, opts, cb) {
      if (!cb && typeof opts == "function") {
        cb = opts;
        opts = void 0;
      }
      opts = opts || {};
      if (!opts.importHook) {
        opts.importHook = files.createImportHook();
      }
      importFile(fpath, function(err, protocol) {
        if (err) {
          cb(err);
          return;
        }
        if (!protocol) {
          cb(new Error("empty root import"));
          return;
        }
        var schemas = protocol.types;
        if (schemas) {
          var namespace = protocolNamespace(protocol) || "";
          schemas.forEach(function(schema) {
            if (schema.namespace === namespace) {
              delete schema.namespace;
            }
          });
        }
        cb(null, protocol);
      });
      function importFile(fpath2, cb2) {
        opts.importHook(fpath2, "idl", function(err, str) {
          if (err) {
            cb2(err);
            return;
          }
          if (str === void 0) {
            cb2();
            return;
          }
          try {
            var reader = new Reader(str, opts);
            var obj = reader._readProtocol(str, opts);
          } catch (err2) {
            err2.path = fpath2;
            cb2(err2);
            return;
          }
          fetchImports(obj.protocol, obj.imports, path.dirname(fpath2), cb2);
        });
      }
      function fetchImports(protocol, imports, dpath, cb2) {
        var importedProtocols = [];
        next();
        function next() {
          var info = imports.shift();
          if (!info) {
            importedProtocols.reverse();
            try {
              importedProtocols.forEach(function(imported) {
                mergeImport(protocol, imported);
              });
            } catch (err) {
              cb2(err);
              return;
            }
            cb2(null, protocol);
            return;
          }
          var importPath = path.join(dpath, info.name);
          if (info.kind === "idl") {
            importFile(importPath, function(err, imported) {
              if (err) {
                cb2(err);
                return;
              }
              if (imported) {
                importedProtocols.push(imported);
              }
              next();
            });
          } else {
            opts.importHook(importPath, info.kind, function(err, str) {
              if (err) {
                cb2(err);
                return;
              }
              switch (info.kind) {
                case "protocol":
                case "schema":
                  if (str === void 0) {
                    next();
                    return;
                  }
                  try {
                    var obj = JSON.parse(str);
                  } catch (err2) {
                    err2.path = importPath;
                    cb2(err2);
                    return;
                  }
                  var imported = info.kind === "schema" ? { types: [obj] } : obj;
                  importedProtocols.push(imported);
                  next();
                  return;
                default:
                  cb2(new Error(f("invalid import kind: %s", info.kind)));
              }
            });
          }
        }
      }
      function mergeImport(protocol, imported) {
        var schemas = imported.types || [];
        schemas.reverse();
        schemas.forEach(function(schema) {
          if (!protocol.types) {
            protocol.types = [];
          }
          if (schema.namespace === void 0) {
            schema.namespace = protocolNamespace(imported) || "";
          }
          protocol.types.unshift(schema);
        });
        Object.keys(imported.messages || {}).forEach(function(name) {
          if (!protocol.messages) {
            protocol.messages = {};
          }
          if (protocol.messages[name]) {
            throw new Error(f("duplicate message: %s", name));
          }
          protocol.messages[name] = imported.messages[name];
        });
      }
    }
    function read(str) {
      var schema;
      if (typeof str == "string" && ~str.indexOf(path.sep) && files.existsSync(str)) {
        var contents = files.readFileSync(str, { encoding: "utf8" });
        try {
          return JSON.parse(contents);
        } catch (err) {
          var opts = { importHook: files.createSyncImportHook() };
          assembleProtocol(str, opts, function(err2, protocolSchema) {
            schema = err2 ? contents : protocolSchema;
          });
        }
      } else {
        schema = str;
      }
      if (typeof schema != "string" || schema === "null") {
        return schema;
      }
      try {
        return JSON.parse(schema);
      } catch (err) {
        try {
          return Reader.readProtocol(schema);
        } catch (err2) {
          try {
            return Reader.readSchema(schema);
          } catch (err3) {
            return schema;
          }
        }
      }
    }
    function Reader(str, opts) {
      opts = opts || {};
      this._tk = new Tokenizer(str);
      this._ackVoidMessages = !!opts.ackVoidMessages;
      this._implicitTags = !opts.delimitedCollections;
      this._typeRefs = opts.typeRefs || TYPE_REFS;
    }
    Reader.readProtocol = function(str, opts) {
      var reader = new Reader(str, opts);
      var protocol = reader._readProtocol();
      if (protocol.imports.length) {
        throw new Error("unresolvable import");
      }
      return protocol.protocol;
    };
    Reader.readSchema = function(str, opts) {
      var reader = new Reader(str, opts);
      var doc = reader._readJavadoc();
      var schema = reader._readType(doc === void 0 ? {} : { doc }, true);
      reader._tk.next({ id: "(eof)" });
      return schema;
    };
    Reader.prototype._readProtocol = function() {
      var tk = this._tk;
      var imports = [];
      var types = [];
      var messages = {};
      var pos;
      this._readImports(imports);
      var protocolSchema = {};
      var protocolJavadoc = this._readJavadoc();
      if (protocolJavadoc !== void 0) {
        protocolSchema.doc = protocolJavadoc;
      }
      this._readAnnotations(protocolSchema);
      tk.next({ val: "protocol" });
      if (!tk.next({ val: "{", silent: true })) {
        protocolSchema.protocol = tk.next({ id: "name" }).val;
        tk.next({ val: "{" });
      }
      while (!tk.next({ val: "}", silent: true })) {
        if (!this._readImports(imports)) {
          var javadoc = this._readJavadoc();
          var typeSchema = this._readType({}, true);
          var numImports = this._readImports(imports, true);
          var message = void 0;
          pos = tk.pos;
          if (!numImports && (message = this._readMessage(typeSchema))) {
            if (javadoc !== void 0 && message.schema.doc === void 0) {
              message.schema.doc = javadoc;
            }
            var oneWay = false;
            if (message.schema.response === "void" || message.schema.response.type === "void") {
              oneWay = !this._ackVoidMessages && !message.schema.errors;
              if (message.schema.response === "void") {
                message.schema.response = "null";
              } else {
                message.schema.response.type = "null";
              }
            }
            if (oneWay) {
              message.schema["one-way"] = true;
            }
            if (messages[message.name]) {
              throw new Error(f("duplicate message: %s", message.name));
            }
            messages[message.name] = message.schema;
          } else {
            if (javadoc) {
              if (typeof typeSchema == "string") {
                typeSchema = { doc: javadoc, type: typeSchema };
              } else if (typeSchema.doc === void 0) {
                typeSchema.doc = javadoc;
              }
            }
            types.push(typeSchema);
            tk.pos = pos;
            tk.next({ val: ";", silent: true });
          }
          javadoc = void 0;
        }
      }
      tk.next({ id: "(eof)" });
      if (types.length) {
        protocolSchema.types = types;
      }
      if (Object.keys(messages).length) {
        protocolSchema.messages = messages;
      }
      return { protocol: protocolSchema, imports };
    };
    Reader.prototype._readAnnotations = function(schema) {
      var tk = this._tk;
      while (tk.next({ val: "@", silent: true })) {
        var parts = [];
        while (!tk.next({ val: "(", silent: true })) {
          parts.push(tk.next().val);
        }
        schema[parts.join("")] = tk.next({ id: "json" }).val;
        tk.next({ val: ")" });
      }
    };
    Reader.prototype._readMessage = function(responseSchema) {
      var tk = this._tk;
      var schema = { request: [], response: responseSchema };
      this._readAnnotations(schema);
      var name = tk.next().val;
      if (tk.next().val !== "(") {
        return;
      }
      if (!tk.next({ val: ")", silent: true })) {
        do {
          schema.request.push(this._readField());
        } while (!tk.next({ val: ")", silent: true }) && tk.next({ val: "," }));
      }
      var token = tk.next();
      switch (token.val) {
        case "throws":
          schema.errors = [];
          do {
            schema.errors.push(this._readType());
          } while (!tk.next({ val: ";", silent: true }) && tk.next({ val: "," }));
          break;
        case "oneway":
          schema["one-way"] = true;
          tk.next({ val: ";" });
          break;
        case ";":
          break;
        default:
          throw tk.error("invalid message suffix", token);
      }
      return { name, schema };
    };
    Reader.prototype._readJavadoc = function() {
      var token = this._tk.next({ id: "javadoc", emitJavadoc: true, silent: true });
      if (token) {
        return token.val;
      }
    };
    Reader.prototype._readField = function() {
      var tk = this._tk;
      var javadoc = this._readJavadoc();
      var schema = { type: this._readType() };
      if (javadoc !== void 0 && schema.doc === void 0) {
        schema.doc = javadoc;
      }
      this._readAnnotations(schema);
      schema.name = tk.next({ id: "name" }).val;
      if (tk.next({ val: "=", silent: true })) {
        schema["default"] = tk.next({ id: "json" }).val;
      }
      return schema;
    };
    Reader.prototype._readType = function(schema, top) {
      schema = schema || {};
      this._readAnnotations(schema);
      schema.type = this._tk.next({ id: "name" }).val;
      switch (schema.type) {
        case "record":
        case "error":
          return this._readRecord(schema);
        case "fixed":
          return this._readFixed(schema);
        case "enum":
          return this._readEnum(schema, top);
        case "map":
          return this._readMap(schema);
        case "array":
          return this._readArray(schema);
        case "union":
          if (Object.keys(schema).length > 1) {
            throw new Error("union annotations are not supported");
          }
          return this._readUnion();
        default:
          var ref = this._typeRefs[schema.type];
          if (ref) {
            delete schema.type;
            utils.copyOwnProperties(ref, schema);
          }
          return Object.keys(schema).length > 1 ? schema : schema.type;
      }
    };
    Reader.prototype._readFixed = function(schema) {
      var tk = this._tk;
      if (!tk.next({ val: "(", silent: true })) {
        schema.name = tk.next({ id: "name" }).val;
        tk.next({ val: "(" });
      }
      schema.size = parseInt(tk.next({ id: "number" }).val);
      tk.next({ val: ")" });
      return schema;
    };
    Reader.prototype._readMap = function(schema) {
      var tk = this._tk;
      var silent = this._implicitTags;
      var implicitTags = tk.next({ val: "<", silent }) === void 0;
      schema.values = this._readType();
      tk.next({ val: ">", silent: implicitTags });
      return schema;
    };
    Reader.prototype._readArray = function(schema) {
      var tk = this._tk;
      var silent = this._implicitTags;
      var implicitTags = tk.next({ val: "<", silent }) === void 0;
      schema.items = this._readType();
      tk.next({ val: ">", silent: implicitTags });
      return schema;
    };
    Reader.prototype._readEnum = function(schema, top) {
      var tk = this._tk;
      if (!tk.next({ val: "{", silent: true })) {
        schema.name = tk.next({ id: "name" }).val;
        tk.next({ val: "{" });
      }
      schema.symbols = [];
      do {
        schema.symbols.push(tk.next().val);
      } while (!tk.next({ val: "}", silent: true }) && tk.next({ val: "," }));
      if (top && tk.next({ val: "=", silent: true })) {
        schema.default = tk.next().val;
        tk.next({ val: ";" });
      }
      return schema;
    };
    Reader.prototype._readUnion = function() {
      var tk = this._tk;
      var arr = [];
      tk.next({ val: "{" });
      do {
        arr.push(this._readType());
      } while (!tk.next({ val: "}", silent: true }) && tk.next({ val: "," }));
      return arr;
    };
    Reader.prototype._readRecord = function(schema) {
      var tk = this._tk;
      if (!tk.next({ val: "{", silent: true })) {
        schema.name = tk.next({ id: "name" }).val;
        tk.next({ val: "{" });
      }
      schema.fields = [];
      while (!tk.next({ val: "}", silent: true })) {
        schema.fields.push(this._readField());
        tk.next({ val: ";" });
      }
      return schema;
    };
    Reader.prototype._readImports = function(imports, maybeMessage) {
      var tk = this._tk;
      var numImports = 0;
      var pos = tk.pos;
      while (tk.next({ val: "import", silent: true })) {
        if (!numImports && maybeMessage && tk.next({ val: "(", silent: true })) {
          tk.pos = pos;
          return;
        }
        var kind = tk.next({ id: "name" }).val;
        var fname = JSON.parse(tk.next({ id: "string" }).val);
        tk.next({ val: ";" });
        imports.push({ kind, name: fname });
        numImports++;
      }
      return numImports;
    };
    function Tokenizer(str) {
      this._str = str;
      this.pos = 0;
    }
    Tokenizer.prototype.next = function(opts) {
      var token = { pos: this.pos, id: void 0, val: void 0 };
      var javadoc = this._skip(opts && opts.emitJavadoc);
      if (typeof javadoc == "string") {
        token.id = "javadoc";
        token.val = javadoc;
      } else {
        var pos = this.pos;
        var str = this._str;
        var c = str.charAt(pos);
        if (!c) {
          token.id = "(eof)";
        } else {
          if (opts && opts.id === "json") {
            token.id = "json";
            this.pos = this._endOfJson();
          } else if (c === '"') {
            token.id = "string";
            this.pos = this._endOfString();
          } else if (/[0-9]/.test(c)) {
            token.id = "number";
            this.pos = this._endOf(/[0-9]/);
          } else if (/[`A-Za-z_.]/.test(c)) {
            token.id = "name";
            this.pos = this._endOf(/[`A-Za-z0-9_.]/);
          } else {
            token.id = "operator";
            this.pos = pos + 1;
          }
          token.val = str.slice(pos, this.pos);
          if (token.id === "json") {
            try {
              token.val = JSON.parse(token.val);
            } catch (err2) {
              throw this.error("invalid JSON", token);
            }
          } else if (token.id === "name") {
            token.val = token.val.replace(/`/g, "");
          }
        }
      }
      var err;
      if (opts && opts.id && opts.id !== token.id) {
        err = this.error(f("expected ID %s", opts.id), token);
      } else if (opts && opts.val && opts.val !== token.val) {
        err = this.error(f("expected value %s", opts.val), token);
      }
      if (!err) {
        return token;
      } else if (opts && opts.silent) {
        this.pos = token.pos;
        return void 0;
      } else {
        throw err;
      }
    };
    Tokenizer.prototype.error = function(reason, context) {
      var isToken = typeof context != "number";
      var pos = isToken ? context.pos : context;
      var str = this._str;
      var lineNum = 1;
      var lineStart = 0;
      var i;
      for (i = 0; i < pos; i++) {
        if (str.charAt(i) === "\n") {
          lineNum++;
          lineStart = i;
        }
      }
      var msg = isToken ? f("invalid token %j: %s", context, reason) : reason;
      var err = new Error(msg);
      err.token = isToken ? context : void 0;
      err.lineNum = lineNum;
      err.colNum = pos - lineStart;
      return err;
    };
    Tokenizer.prototype._skip = function(emitJavadoc) {
      var str = this._str;
      var isJavadoc = false;
      var pos, c;
      while ((c = str.charAt(this.pos)) && /\s/.test(c)) {
        this.pos++;
      }
      pos = this.pos;
      if (c === "/") {
        switch (str.charAt(this.pos + 1)) {
          case "/":
            this.pos += 2;
            while ((c = str.charAt(this.pos)) && c !== "\n") {
              this.pos++;
            }
            return this._skip(emitJavadoc);
          case "*":
            this.pos += 2;
            if (str.charAt(this.pos) === "*") {
              isJavadoc = true;
            }
            while (c = str.charAt(this.pos++)) {
              if (c === "*" && str.charAt(this.pos) === "/") {
                this.pos++;
                if (isJavadoc && emitJavadoc) {
                  return extractJavadoc(str.slice(pos + 3, this.pos - 2));
                }
                return this._skip(emitJavadoc);
              }
            }
            throw this.error("unterminated comment", pos);
        }
      }
    };
    Tokenizer.prototype._endOf = function(pat) {
      var pos = this.pos;
      var str = this._str;
      while (pat.test(str.charAt(pos))) {
        pos++;
      }
      return pos;
    };
    Tokenizer.prototype._endOfString = function() {
      var pos = this.pos + 1;
      var str = this._str;
      var c;
      while (c = str.charAt(pos)) {
        if (c === '"') {
          return pos + 1;
        }
        if (c === "\\") {
          pos += 2;
        } else {
          pos++;
        }
      }
      throw this.error("unterminated string", pos - 1);
    };
    Tokenizer.prototype._endOfJson = function() {
      var pos = utils.jsonEnd(this._str, this.pos);
      if (pos < 0) {
        throw this.error("invalid JSON", pos);
      }
      return pos;
    };
    function extractJavadoc(str) {
      var lines = str.replace(/^[ \t]+|[ \t]+$/g, "").split("\n").map(function(line, i) {
        return i ? line.replace(/^\s*\*\s?/, "") : line;
      });
      while (lines.length && !lines[0]) {
        lines.shift();
      }
      while (lines.length && !lines[lines.length - 1]) {
        lines.pop();
      }
      return lines.join("\n");
    }
    function protocolNamespace(protocol) {
      if (protocol.namespace) {
        return protocol.namespace;
      }
      var match = /^(.*)\.[^.]+$/.exec(protocol.protocol);
      return match ? match[1] : void 0;
    }
    module2.exports = {
      Tokenizer,
      assembleProtocol,
      read,
      readProtocol: Reader.readProtocol,
      readSchema: Reader.readSchema
    };
  }
});

// node_modules/avsc/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/avsc/lib/index.js"(exports2, module2) {
    "use strict";
    var containers = require_containers();
    var services = require_services();
    var specs = require_specs();
    var types = require_types2();
    var utils = require_utils3();
    var fs2 = require("fs");
    var util = require("util");
    function parse(any, opts) {
      var schemaOrProtocol = specs.read(any);
      return schemaOrProtocol.protocol ? services.Service.forProtocol(schemaOrProtocol, opts) : types.Type.forSchema(schemaOrProtocol, opts);
    }
    function extractFileHeader(path, opts) {
      opts = opts || {};
      var decode = opts.decode === void 0 ? true : !!opts.decode;
      var size = Math.max(opts.size || 4096, 4);
      var buf = utils.newBuffer(size);
      var fd = fs2.openSync(path, "r");
      try {
        var pos = fs2.readSync(fd, buf, 0, size);
        if (pos < 4 || !containers.MAGIC_BYTES.equals(buf.slice(0, 4))) {
          return null;
        }
        var tap = new utils.Tap(buf);
        var header = null;
        do {
          header = containers.HEADER_TYPE._read(tap);
        } while (!isValid());
        if (decode !== false) {
          var meta = header.meta;
          meta["avro.schema"] = JSON.parse(meta["avro.schema"].toString());
          if (meta["avro.codec"] !== void 0) {
            meta["avro.codec"] = meta["avro.codec"].toString();
          }
        }
        return header;
      } finally {
        fs2.closeSync(fd);
      }
      function isValid() {
        if (tap.isValid()) {
          return true;
        }
        var len = 2 * tap.buf.length;
        var buf2 = utils.newBuffer(len);
        len = fs2.readSync(fd, buf2, 0, len);
        tap.buf = Buffer.concat([tap.buf, buf2]);
        tap.pos = 0;
        return false;
      }
    }
    function createFileDecoder(path, opts) {
      return fs2.createReadStream(path).pipe(new containers.streams.BlockDecoder(opts));
    }
    function createFileEncoder(path, schema, opts) {
      var encoder = new containers.streams.BlockEncoder(schema, opts);
      encoder.pipe(fs2.createWriteStream(path, { defaultEncoding: "binary" }));
      return encoder;
    }
    module2.exports = {
      Service: services.Service,
      Type: types.Type,
      assembleProtocol: specs.assembleProtocol,
      createFileDecoder,
      createFileEncoder,
      discoverProtocol: services.discoverProtocol,
      extractFileHeader,
      parse,
      readProtocol: specs.readProtocol,
      readSchema: specs.readSchema,
      streams: containers.streams,
      types: types.builtins,
      Protocol: services.Service,
      assemble: util.deprecate(specs.assembleProtocol, "use `assembleProtocol` instead"),
      combine: util.deprecate(types.Type.forTypes, "use `Type.forTypes` intead"),
      infer: util.deprecate(types.Type.forValue, "use `Type.forValue` instead")
    };
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/AvroHelper.js
var require_AvroHelper = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/AvroHelper.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_1 = require_errors();
    var avsc_1 = __importDefault(require_lib2());
    var AvroHelper = class {
      getRawAvroSchema(schema) {
        return typeof schema.schema === "string" ? JSON.parse(schema.schema) : schema.schema;
      }
      getAvroSchema(schema, opts) {
        const rawSchema = this.isRawAvroSchema(schema) ? schema : this.getRawAvroSchema(schema);
        const avroSchema = avsc_1.default.Type.forSchema(rawSchema, opts);
        return avroSchema;
      }
      validate(avroSchema) {
        if (!avroSchema.name) {
          throw new errors_1.ConfluentSchemaRegistryArgumentError(`Invalid name: ${avroSchema.name}`);
        }
      }
      getSubject(schema, avroSchema, separator) {
        const rawSchema = this.getRawAvroSchema(schema);
        if (!rawSchema.namespace) {
          throw new errors_1.ConfluentSchemaRegistryArgumentError(`Invalid namespace: ${rawSchema.namespace}`);
        }
        const subject = {
          name: [rawSchema.namespace, rawSchema.name].join(separator)
        };
        return subject;
      }
      isRawAvroSchema(schema) {
        const asRawAvroSchema = schema;
        return asRawAvroSchema.name != null && asRawAvroSchema.type != null;
      }
    };
    exports2.default = AvroHelper;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/JsonHelper.js
var require_JsonHelper = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/JsonHelper.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_1 = require_errors();
    var JsonHelper = class {
      validate(schema) {
        return;
      }
      getSubject(confluentSchema, schema, separator) {
        throw new errors_1.ConfluentSchemaRegistryError("not implemented yet");
      }
    };
    exports2.default = JsonHelper;
  }
});

// node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "node_modules/ajv/dist/compile/rules.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRules = exports2.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports2.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: __spreadProps(__spreadValues({}, groups), { integer: true, boolean: true, null: true }),
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports2.getRules = getRules;
  }
});

// node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "node_modules/ajv/dist/compile/validate/applicability.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shouldUseRule = exports2.shouldUseGroup = exports2.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self: self2 }, type) {
      const group = self2.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports2.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports2.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports2.shouldUseRule = shouldUseRule;
  }
});

// node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "node_modules/ajv/dist/compile/codegen/code.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getProperty = exports2.safeStringify = exports2.stringify = exports2.strConcat = exports2.addCodeArg = exports2.str = exports2._ = exports2.nil = exports2._Code = exports2.Name = exports2.IDENTIFIER = exports2._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports2._CodeOrName = _CodeOrName;
    exports2.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports2.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports2.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports2._Code = _Code;
    exports2.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports2._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports2.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports2.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports2.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports2.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports2.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports2.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports2.getProperty = getProperty;
  }
});

// node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "node_modules/ajv/dist/compile/codegen/scope.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValueScope = exports2.ValueScopeName = exports2.Scope = exports2.varKinds = exports2.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState = exports2.UsedValueState || (exports2.UsedValueState = {}));
    exports2.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports2.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = code_1._`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports2.ValueScopeName = ValueScopeName;
    var line = code_1._`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = __spreadProps(__spreadValues({}, opts), { _n: opts.lines ? line : code_1.nil });
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return code_1._`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports2.varKinds.var : exports2.varKinds.const;
              code = code_1._`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = code_1._`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports2.ValueScope = ValueScope;
  }
});

// node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/ajv/dist/compile/codegen/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.or = exports2.and = exports2.not = exports2.CodeGen = exports2.operators = exports2.varKinds = exports2.ValueScopeName = exports2.ValueScope = exports2.Scope = exports2.Name = exports2.stringify = exports2.getProperty = exports2.nil = exports2.strConcat = exports2.str = exports2._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports2, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports2, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports2, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports2, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports2, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports2, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports2.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : __spreadValues({}, this.lhs.names);
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = __spreadProps(__spreadValues({}, opts), { _n: opts.lines ? "\n" : "" });
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      name(prefix) {
        return this._scope.name(prefix);
      }
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports2.operators.ADD, rhs));
      }
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            code_1.addCodeArg(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      else() {
        return this._elseNode(new Else());
      }
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, code_1._`${arr}.length`, (i) => {
            this.var(name, code_1._`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, code_1._`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      endFor() {
        return this._endBlockNode(For);
      }
      label(label) {
        return this._leafNode(new Label(label));
      }
      break(label) {
        return this._leafNode(new Break(label));
      }
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports2.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : code_1._`!${par(x)}`;
    }
    exports2.not = not;
    var andCode = mappend(exports2.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports2.and = and;
    var orCode = mappend(exports2.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports2.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : code_1._`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : code_1._`(${x})`;
    }
  }
});

// node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "node_modules/ajv/dist/compile/names.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      data: new codegen_1.Name("data"),
      valCxt: new codegen_1.Name("valCxt"),
      dataPath: new codegen_1.Name("dataPath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      vErrors: new codegen_1.Name("vErrors"),
      errors: new codegen_1.Name("errors"),
      this: new codegen_1.Name("this"),
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports2.default = names;
  }
});

// node_modules/ajv/dist/compile/errors.js
var require_errors2 = __commonJS({
  "node_modules/ajv/dist/compile/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.extendErrors = exports2.resetErrorsCount = exports2.reportExtraError = exports2.reportError = exports2.keyword$DataError = exports2.keywordError = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    exports2.keywordError = {
      message: ({ keyword }) => codegen_1.str`should pass "${keyword}" keyword validation`
    };
    exports2.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? codegen_1.str`"${keyword}" keyword must be ${schemaType} ($data)` : codegen_1.str`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports2.keywordError, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, codegen_1._`[${errObj}]`);
      }
    }
    exports2.reportError = reportError;
    function reportExtraError(cxt, error = exports2.keywordError) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports2.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if(codegen_1._`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign(codegen_1._`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports2.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, codegen_1._`${names_1.default.vErrors}[${i}]`);
        gen.if(codegen_1._`${err}.dataPath === undefined`, () => gen.assign(codegen_1._`${err}.dataPath`, codegen_1.strConcat(names_1.default.dataPath, it.errorPath)));
        gen.assign(codegen_1._`${err}.schemaPath`, codegen_1.str`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign(codegen_1._`${err}.schema`, schemaValue);
          gen.assign(codegen_1._`${err}.data`, data);
        }
      });
    }
    exports2.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if(codegen_1._`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, codegen_1._`[${err}]`), codegen_1._`${names_1.default.vErrors}.push(${err})`);
      gen.code(codegen_1._`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw(codegen_1._`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign(codegen_1._`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema"),
      instancePath: new codegen_1.Name("instancePath")
    };
    function errorObjectCode(cxt, error) {
      const { createErrors, opts } = cxt.it;
      if (createErrors === false)
        return codegen_1._`{}`;
      return (opts.jtd && !opts.ajvErrors ? jtdErrorObject : ajvErrorObject)(cxt, error);
    }
    function jtdErrorObject(cxt, { message }) {
      const { gen, keyword, it } = cxt;
      const { errorPath, errSchemaPath, opts } = it;
      const keyValues = [
        [E.instancePath, codegen_1.strConcat(names_1.default.dataPath, errorPath)],
        [E.schemaPath, codegen_1.str`${errSchemaPath}/${keyword}`]
      ];
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      return gen.object(...keyValues);
    }
    function ajvErrorObject(cxt, error) {
      const { gen, keyword, data, schemaValue, it } = cxt;
      const { topSchemaRef, schemaPath, errorPath, errSchemaPath, propertyName, opts } = it;
      const { params, message } = error;
      const keyValues = [
        [E.keyword, keyword],
        [names_1.default.dataPath, codegen_1.strConcat(names_1.default.dataPath, errorPath)],
        [E.schemaPath, codegen_1.str`${errSchemaPath}/${keyword}`],
        [E.params, typeof params == "function" ? params(cxt) : params || codegen_1._`{}`]
      ];
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, codegen_1._`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      return gen.object(...keyValues);
    }
  }
});

// node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "node_modules/ajv/dist/compile/validate/boolSchema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.boolOrEmptySchema = exports2.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign(codegen_1._`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports2.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports2.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      errors_1.reportError(cxt, boolError, overrideAllErrors);
    }
  }
});

// node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "node_modules/ajv/dist/compile/validate/defaults.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var _1 = require_validate();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports2.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = codegen_1._`${data}${codegen_1.getProperty(prop)}`;
      if (compositeRule) {
        _1.checkStrictMode(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = codegen_1._`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = codegen_1._`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, codegen_1._`${childData} = ${codegen_1.stringify(defaultValue)}`);
    }
  }
});

// node_modules/ajv/dist/compile/subschema.js
var require_subschema = __commonJS({
  "node_modules/ajv/dist/compile/subschema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.applySubschema = exports2.Type = void 0;
    var validate_1 = require_validate();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type = exports2.Type || (exports2.Type = {}));
    function applySubschema(it, appl, valid) {
      const subschema = getSubschema(it, appl);
      extendSubschemaData(subschema, it, appl);
      extendSubschemaMode(subschema, appl);
      const nextContext = __spreadProps(__spreadValues(__spreadValues({}, it), subschema), { items: void 0, props: void 0 });
      validate_1.subschemaCode(nextContext, valid);
      return nextContext;
    }
    exports2.applySubschema = applySubschema;
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: codegen_1._`${it.schemaPath}${codegen_1.getProperty(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: codegen_1._`${it.schemaPath}${codegen_1.getProperty(keyword)}${codegen_1.getProperty(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${util_1.escapeFragment(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", codegen_1._`${it.data}${codegen_1.getProperty(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = codegen_1.str`${errorPath}${getErrorPath(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = codegen_1._`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? codegen_1._`"[" + ${dataProp} + "]"` : codegen_1._`"['" + ${dataProp} + "']"` : isNumber ? codegen_1._`"/" + ${dataProp}` : codegen_1._`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? codegen_1.getProperty(dataProp).toString() : "/" + util_1.escapeJsonPointer(dataProp);
    }
  }
});

// node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/code.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateUnion = exports2.validateArray = exports2.usePattern = exports2.callValidateCode = exports2.schemaProperties = exports2.allSchemaProperties = exports2.noPropertyInData = exports2.propertyInData = exports2.isOwnProperty = exports2.hasPropFunc = exports2.reportMissingProp = exports2.checkMissingProp = exports2.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var subschema_1 = require_subschema();
    var names_1 = require_names();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: codegen_1._`${prop}` }, true);
        cxt.error();
      });
    }
    exports2.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return codegen_1.or(...properties.map((prop) => codegen_1.and(noPropertyInData(gen, data, prop, opts.ownProperties), codegen_1._`${missing} = ${prop}`)));
    }
    exports2.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports2.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        ref: Object.prototype.hasOwnProperty,
        code: codegen_1._`Object.prototype.hasOwnProperty`
      });
    }
    exports2.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return codegen_1._`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports2.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = codegen_1._`${data}${codegen_1.getProperty(property)} !== undefined`;
      return ownProperties ? codegen_1._`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports2.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = codegen_1._`${data}${codegen_1.getProperty(property)} === undefined`;
      return ownProperties ? codegen_1.or(cond, codegen_1.not(isOwnProperty(gen, data, property))) : cond;
    }
    exports2.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports2.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !util_1.alwaysValidSchema(it, schemaMap[p]));
    }
    exports2.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? codegen_1._`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.dataPath, codegen_1.strConcat(names_1.default.dataPath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = codegen_1._`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? codegen_1._`${func}.call(${context}, ${args})` : codegen_1._`${func}(${args})`;
    }
    exports2.callValidateCode = callValidateCode;
    function usePattern(gen, pattern) {
      return gen.scopeValue("pattern", {
        key: pattern,
        ref: new RegExp(pattern, "u"),
        code: codegen_1._`new RegExp(${pattern}, "u")`
      });
    }
    exports2.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", codegen_1._`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: subschema_1.Type.Num
          }, valid);
          gen.if(codegen_1.not(valid), notValid);
        });
      }
    }
    exports2.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => util_1.alwaysValidSchema(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, codegen_1._`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if(codegen_1.not(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports2.validateUnion = validateUnion;
  }
});

// node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "node_modules/ajv/dist/compile/validate/keyword.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.keywordCode = void 0;
    var context_1 = require_context();
    var errors_1 = require_errors2();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new context_1.default(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        funcKeywordCode(cxt, def);
      } else if ("macro" in def) {
        macroKeywordCode(cxt, def);
      } else if (def.compile || def.validate) {
        funcKeywordCode(cxt, def);
      }
    }
    exports2.keywordCode = keywordCode;
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsync(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid(codegen_1._`await `), (e) => gen.assign(valid, false).if(codegen_1._`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, codegen_1._`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = codegen_1._`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? codegen_1._`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, codegen_1._`${_await}${code_1.callValidateCode(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if(codegen_1.not((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, codegen_1._`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if(codegen_1._`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, codegen_1._`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, codegen_1._`${names_1.default.vErrors}.length`);
        errors_1.extendErrors(cxt);
      }, () => cxt.error());
    }
    function checkAsync({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: codegen_1.stringify(result) });
    }
  }
});

// node_modules/ajv/dist/compile/validate/iterate.js
var require_iterate = __commonJS({
  "node_modules/ajv/dist/compile/validate/iterate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.schemaKeywords = void 0;
    var applicability_1 = require_applicability();
    var dataType_1 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var util_1 = require_util();
    var _1 = require_validate();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self: self2 } = it;
      const { RULES } = self2;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !util_1.schemaHasRulesButRef(schema, RULES))) {
        gen.block(() => keyword_1.keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!applicability_1.shouldUseGroup(schema, group))
          return;
        if (group.type) {
          gen.if(dataType_1.checkDataType(group.type, data, opts.strict));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            dataType_1.reportTypeError(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if(codegen_1._`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    exports2.schemaKeywords = schemaKeywords;
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        defaults_1.assignDefaults(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if (applicability_1.shouldUseRule(schema, rule)) {
            keyword_1.keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && applicability_1.shouldUseRule(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      _1.checkStrictMode(it, msg, it.opts.strictTypes);
    }
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/json-schema-traverse/index.js"(exports2, module2) {
    "use strict";
    var traverse = module2.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/uri-js/dist/es5/uri.all.js
var require_uri_all = __commonJS({
  "node_modules/uri-js/dist/es5/uri.all.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.URI = global2.URI || {});
    })(exports2, function(exports3) {
      "use strict";
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign2(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI2) {
        var ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI2 ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$), DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+"), IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$), IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + ZONEID$), IPVFUTURE$ = subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*"), HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")|" + REG_NAME$), PORT$ = subexp(DIGIT$$ + "*"), AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"), PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = subexp(PCHAR$ + "*"), SEGMENT_NZ$ = subexp(PCHAR$ + "+"), SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$), PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type) {
        throw new RangeError(errors[type]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (; delta > baseMinusTMin * tMax >> 1; k += base) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (var w = 1, k = base; ; k += base) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (var k = base; ; k += base) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        "version": "2.1.0",
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) {
          } else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign2({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var isIRI = true;
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports3.SCHEMES = SCHEMES;
      exports3.pctEncChar = pctEncChar;
      exports3.pctDecChars = pctDecChars;
      exports3.parse = parse;
      exports3.removeDotSegments = removeDotSegments;
      exports3.serialize = serialize;
      exports3.resolveComponents = resolveComponents;
      exports3.resolve = resolve;
      exports3.normalize = normalize;
      exports3.equal = equal;
      exports3.escapeComponent = escapeComponent;
      exports3.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/ajv/dist/compile/resolve.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSchemaRefs = exports2.resolveUrl = exports2.normalizeId = exports2._getFullPath = exports2.getFullPath = exports2.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var URI = require_uri_all();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    exports2.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          util_1.eachItem(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = URI.parse(id);
      return _getFullPath(p);
    }
    exports2.getFullPath = getFullPath;
    function _getFullPath(p) {
      return URI.serialize(p).split("#")[0] + "#";
    }
    exports2._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports2.normalizeId = normalizeId;
    function resolveUrl(baseId, id) {
      id = normalizeId(id);
      return URI.resolve(baseId, id);
    }
    exports2.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema) {
      if (typeof schema == "boolean")
        return {};
      const schemaId = normalizeId(schema.$id);
      const baseIds = { "": schemaId };
      const pathPrefix = getFullPath(schemaId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch.$id == "string")
          baseId = addRef.call(this, sch.$id);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
          ref = normalizeId(baseId ? URI.resolve(baseId, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports2.getSchemaRefs = getSchemaRefs;
  }
});

// node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  "node_modules/ajv/dist/compile/validate/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkStrictMode = exports2.schemaCxtHasRules = exports2.subschemaCode = exports2.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var iterate_1 = require_iterate();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => boolSchema_1.topBoolOrEmptySchema(it));
    }
    exports2.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, codegen_1._`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code(codegen_1._`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, codegen_1._`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return codegen_1._`{${names_1.default.dataPath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? codegen_1._`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.dataPath, codegen_1._`${names_1.default.valCxt}.${names_1.default.dataPath}`);
        gen.var(names_1.default.parentData, codegen_1._`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, codegen_1._`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, codegen_1._`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, codegen_1._`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.dataPath, codegen_1._`""`);
        gen.var(names_1.default.parentData, codegen_1._`undefined`);
        gen.var(names_1.default.parentDataProperty, codegen_1._`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, codegen_1._`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", codegen_1._`${validateName}.evaluated`);
      gen.if(codegen_1._`${it.evaluated}.dynamicProps`, () => gen.assign(codegen_1._`${it.evaluated}.props`, codegen_1._`undefined`));
      gen.if(codegen_1._`${it.evaluated}.dynamicItems`, () => gen.assign(codegen_1._`${it.evaluated}.items`, codegen_1._`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      return typeof schema == "object" && schema.$id && (opts.code.source || opts.code.process) ? codegen_1._`/*# sourceURL=${schema.$id} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      boolSchema_1.boolOrEmptySchema(it, valid);
    }
    exports2.subschemaCode = subschemaCode;
    function schemaCxtHasRules({ schema, self: self2 }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self2.RULES.all[key])
          return true;
      return false;
    }
    exports2.schemaCxtHasRules = schemaCxtHasRules;
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsync(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, codegen_1._`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      util_1.checkUnknownRules(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return iterate_1.schemaKeywords(it, [], false, errsCount);
      const types = dataType_1.getSchemaTypes(it.schema);
      const checkedTypes = dataType_1.coerceAndCheckDataType(it, types);
      iterate_1.schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self: self2 } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && util_1.schemaHasRulesButRef(schema, self2.RULES)) {
        self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strict) {
        checkStrictMode(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      if (it.schema.$id)
        it.baseId = resolve_1.resolveUrl(it.baseId, it.schema.$id);
    }
    function checkAsync(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code(codegen_1._`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = codegen_1.str`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code(codegen_1._`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if(codegen_1._`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw(codegen_1._`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign(codegen_1._`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return(codegen_1._`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign(codegen_1._`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign(codegen_1._`${evaluated}.items`, items);
    }
    function checkStrictMode(it, msg, mode = it.opts.strict) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports2.checkStrictMode = checkStrictMode;
  }
});

// node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "node_modules/ajv/dist/compile/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.func = exports2.setEvaluated = exports2.evaluatedPropsToName = exports2.mergeEvaluated = exports2.eachItem = exports2.unescapeJsonPointer = exports2.escapeJsonPointer = exports2.escapeFragment = exports2.unescapeFragment = exports2.schemaRefOrVal = exports2.schemaHasRulesButRef = exports2.schemaHasRules = exports2.checkUnknownRules = exports2.alwaysValidSchema = exports2.toHash = void 0;
    var codegen_1 = require_codegen();
    var validate_1 = require_validate();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports2.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports2.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self: self2 } = it;
      if (!opts.strict)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self2.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          validate_1.checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports2.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports2.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports2.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return codegen_1._`${schema}`;
      }
      return codegen_1._`${topSchemaRef}${schemaPath}${codegen_1.getProperty(keyword)}`;
    }
    exports2.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports2.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports2.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports2.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports2.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports2.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports2.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if(codegen_1._`${to} !== true && ${from} !== undefined`, () => {
          gen.if(codegen_1._`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, codegen_1._`${to} || {}`).code(codegen_1._`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if(codegen_1._`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, codegen_1._`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : __spreadValues(__spreadValues({}, from), to),
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if(codegen_1._`${to} !== true && ${from} !== undefined`, () => gen.assign(to, codegen_1._`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if(codegen_1._`${to} !== true`, () => gen.assign(to, from === true ? true : codegen_1._`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", codegen_1._`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports2.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign(codegen_1._`${props}${codegen_1.getProperty(p)}`, true));
    }
    exports2.setEvaluated = setEvaluated;
    function func(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: f.code
      });
    }
    exports2.func = func;
  }
});

// node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "node_modules/ajv/dist/compile/validate/dataType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reportTypeError = exports2.checkDataTypes = exports2.checkDataType = exports2.coerceAndCheckDataType = exports2.getJSONTypes = exports2.getSchemaTypes = exports2.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType = exports2.DataType || (exports2.DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    exports2.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports2.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && applicability_1.schemaHasRulesForType(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strict, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports2.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", codegen_1._`typeof ${data}`);
      const coerced = gen.let("coerced", codegen_1._`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if(codegen_1._`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, codegen_1._`${data}[0]`).assign(dataType, codegen_1._`typeof ${data}`).if(checkDataTypes(types, data, opts.strict), () => gen.assign(coerced, data)));
      }
      gen.if(codegen_1._`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if(codegen_1._`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf(codegen_1._`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, codegen_1._`"" + ${data}`).elseIf(codegen_1._`${data} === null`).assign(coerced, codegen_1._`""`);
            return;
          case "number":
            gen.elseIf(codegen_1._`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, codegen_1._`+${data}`);
            return;
          case "integer":
            gen.elseIf(codegen_1._`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, codegen_1._`+${data}`);
            return;
          case "boolean":
            gen.elseIf(codegen_1._`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf(codegen_1._`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf(codegen_1._`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf(codegen_1._`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, codegen_1._`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if(codegen_1._`${parentData} !== undefined`, () => gen.assign(codegen_1._`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return codegen_1._`${data} ${EQ} null`;
        case "array":
          cond = codegen_1._`Array.isArray(${data})`;
          break;
        case "object":
          cond = codegen_1._`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond(codegen_1._`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return codegen_1._`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : codegen_1.not(cond);
      function numCond(_cond = codegen_1.nil) {
        return codegen_1.and(codegen_1._`typeof ${data} == "number"`, _cond, strictNums ? codegen_1._`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports2.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = util_1.toHash(dataTypes);
      if (types.array && types.object) {
        const notObj = codegen_1._`typeof ${data} != "object"`;
        cond = types.null ? notObj : codegen_1._`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = codegen_1.and(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports2.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => codegen_1.str`should be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? codegen_1._`{type: ${schema}}` : codegen_1._`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      errors_1.reportError(cxt, typeError);
    }
    exports2.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = util_1.schemaRefOrVal(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});

// node_modules/ajv/dist/compile/context.js
var require_context = __commonJS({
  "node_modules/ajv/dist/compile/context.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getData = void 0;
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var errors_1 = require_errors2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var subschema_1 = require_subschema();
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        validateKeywordUsage(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = util_1.schemaRefOrVal(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!validSchemaType(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.gen.if(codegen_1.not(condition));
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.result(condition, void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail(codegen_1._`${schemaCode} !== undefined && (${codegen_1.or(this.invalid$data(), condition)})`);
      }
      error(append) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error);
      }
      $dataError() {
        errors_1.reportError(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        errors_1.resetErrorsCount(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign2) {
        if (assign2)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if(codegen_1.or(codegen_1._`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return codegen_1.or(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return codegen_1._`${dataType_1.checkDataTypes(st, schemaCode, it.opts.strict, dataType_1.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return codegen_1._`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        return subschema_1.applySubschema(this.it, appl, valid);
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports2.default = KeywordCxt;
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    function validateKeywordUsage({ schema, opts, self: self2 }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = "keyword value is invalid: " + self2.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self2.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = codegen_1._`${data}${codegen_1.getProperty(util_1.unescapeJsonPointer(segment))}`;
          expr = codegen_1._`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports2.getData = getData;
  }
});

// node_modules/ajv/dist/compile/error_classes.js
var require_error_classes = __commonJS({
  "node_modules/ajv/dist/compile/error_classes.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MissingRefError = exports2.ValidationError = void 0;
    var resolve_1 = require_resolve();
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports2.ValidationError = ValidationError;
    var MissingRefError = class extends Error {
      constructor(baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = resolve_1.resolveUrl(baseId, ref);
        this.missingSchema = resolve_1.normalizeId(resolve_1.getFullPath(this.missingRef));
      }
    };
    exports2.MissingRefError = MissingRefError;
    module2.exports = {
      ValidationError,
      MissingRefError
    };
  }
});

// node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "node_modules/ajv/dist/compile/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveSchema = exports2.getCompilingSchema = exports2.resolveRef = exports2.compileSchema = exports2.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var error_classes_1 = require_error_classes();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var URI = require_uri_all();
    var SchemaEnv = class {
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : resolve_1.normalizeId(schema === null || schema === void 0 ? void 0 : schema.$id);
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports2.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = resolve_1.getFullPath(sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: error_classes_1.ValidationError,
          code: codegen_1._`require("ajv/dist/compile/error_classes").ValidationError`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: codegen_1.stringify(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: this.opts.jtd ? "" : "#",
        errorPath: codegen_1._`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        validate_1.validateFunctionCode(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = codegen_1.stringify(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports2.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = resolve_1.resolveUrl(baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        if (schema)
          _sch = new SchemaEnv({ schema, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports2.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if (resolve_1.inlineRef(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports2.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = URI.parse(ref);
      const refPath = resolve_1._getFullPath(p);
      let baseId = resolve_1.getFullPath(root.baseId);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = resolve_1.normalizeId(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === resolve_1.normalizeId(ref)) {
        const { schema } = schOrRef;
        if (schema.$id)
          baseId = resolve_1.resolveUrl(baseId, schema.$id);
        return new SchemaEnv({ schema, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports2.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema == "boolean")
          return;
        schema = schema[util_1.unescapeFragment(part)];
        if (schema === void 0)
          return;
        if (!PREVENT_SCOPE_CHANGE.has(part) && typeof schema == "object" && schema.$id) {
          baseId = resolve_1.resolveUrl(baseId, schema.$id);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !util_1.schemaHasRulesButRef(schema, this.RULES)) {
        const $ref = resolve_1.resolveUrl(baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      env = env || new SchemaEnv({ schema, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
  }
});

// node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "node_modules/ajv/dist/refs/data.json"(exports2, module2) {
    module2.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// node_modules/ajv/dist/core.js
var require_core2 = __commonJS({
  "node_modules/ajv/dist/core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CodeGen = exports2.Name = exports2.nil = exports2.stringify = exports2.str = exports2._ = exports2.KeywordCxt = void 0;
    var context_1 = require_context();
    exports2.KeywordCxt = context_1.default;
    var codegen_1 = require_codegen();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports2, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var error_classes_1 = require_error_classes();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      schemaId: "JSON Schema draft-04 is not supported in Ajv v7.",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      strictNumbers: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      const strict = (_a = o.strict) !== null && _a !== void 0 ? _a : true;
      const strictLog = strict ? "log" : false;
      const _optz = (_b = o.code) === null || _b === void 0 ? void 0 : _b.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      return {
        strict,
        strictTypes: (_c = o.strictTypes) !== null && _c !== void 0 ? _c : strictLog,
        strictTuples: (_d = o.strictTuples) !== null && _d !== void 0 ? _d : strictLog,
        code: o.code ? __spreadProps(__spreadValues({}, o.code), { optimize }) : { optimize },
        loopRequired: (_e = o.loopRequired) !== null && _e !== void 0 ? _e : Infinity,
        loopEnum: (_f = o.loopEnum) !== null && _f !== void 0 ? _f : Infinity,
        meta: (_g = o.meta) !== null && _g !== void 0 ? _g : true,
        messages: (_h = o.messages) !== null && _h !== void 0 ? _h : true,
        inlineRefs: (_j = o.inlineRefs) !== null && _j !== void 0 ? _j : true,
        addUsedSchema: (_k = o.addUsedSchema) !== null && _k !== void 0 ? _k : true,
        validateSchema: (_l = o.validateSchema) !== null && _l !== void 0 ? _l : true,
        validateFormats: (_m = o.validateFormats) !== null && _m !== void 0 ? _m : true
      };
    }
    var Ajv = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = __spreadValues(__spreadValues({}, opts), requiredOptions(opts));
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = rules_1.getRules();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta } = this.opts;
        if (meta && $data)
          this.addMetaSchema($dataRefSchema, $dataRefSchema.$id, false);
      }
      defaultMeta() {
        const { meta } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta.$id || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof error_classes_1.MissingRefError))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          id = schema.$id;
          if (id !== void 0 && typeof id != "string")
            throw new Error("schema id must be string");
        }
        key = resolve_1.normalizeId(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, _validateSchema, true);
        return this;
      }
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const root = new compile_1.SchemaEnv({ schema: {} });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef.$id;
            if (id) {
              id = resolve_1.normalizeId(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          util_1.eachItem(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = __spreadProps(__spreadValues({}, def), {
          type: dataType_1.getJSONTypes(def.type),
          schemaType: dataType_1.getJSONTypes(def.schemaType)
        });
        util_1.eachItem(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.dataPath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        if (typeof schema != "object") {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        const localRefs = resolve_1.getSchemaRefs.call(this, schema);
        sch = new compile_1.SchemaEnv({ schema, meta, localRefs });
        this._cache.set(sch.schema, sch);
        const id = sch.baseId;
        if (addSchema && !id.startsWith("#")) {
          if (id)
            this._checkUnique(id);
          this.refs[id] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    exports2.default = Ajv;
    Ajv.ValidationError = error_classes_1.ValidationError;
    Ajv.MissingRefError = error_classes_1.MissingRefError;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = resolve_1.normalizeId(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = __spreadValues({}, this.opts);
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      util_1.eachItem(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: __spreadProps(__spreadValues({}, definition), {
          type: dataType_1.getJSONTypes(definition.type),
          schemaType: dataType_1.getJSONTypes(definition.schemaType)
        })
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});

// node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/id.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/ref.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.callRef = exports2.getValidate = void 0;
    var error_classes_1 = require_error_classes();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self: self2 } = it;
        if (schema === "#" || schema === "#/")
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self2, env.root, baseId, schema);
        if (schOrEnv === void 0)
          throw new error_classes_1.MissingRefError(baseId, schema);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === env.root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: env.root });
          return callRef(cxt, codegen_1._`${rootName}.validate`, env.root, env.root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: codegen_1.stringify(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: schema
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : codegen_1._`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports2.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code(codegen_1._`await ${code_1.callValidateCode(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if(codegen_1._`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result(code_1.callValidateCode(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = codegen_1._`${source}.errors`;
        gen.assign(names_1.default.vErrors, codegen_1._`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, codegen_1._`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", codegen_1._`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", codegen_1._`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports2.callRef = callRef;
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/index.js
var require_core3 = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core2 = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports2.default = core2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => codegen_1.str`should be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => codegen_1._`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data(codegen_1._`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => codegen_1.str`should be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => codegen_1._`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? codegen_1._`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : codegen_1._`${res} !== parseInt(${res})`;
        cxt.fail$data(codegen_1._`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/compile/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/compile/ucs2length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports2.default = ucs2length;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return codegen_1.str`should NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => codegen_1._`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        let len;
        if (it.opts.unicode === false) {
          len = codegen_1._`${data}.length`;
        } else {
          const u2l = cxt.gen.scopeValue("func", {
            ref: ucs2length_1.default,
            code: codegen_1._`require("ajv/dist/compile/ucs2length").default`
          });
          len = codegen_1._`${u2l}(${data})`;
        }
        cxt.fail$data(codegen_1._`${len} ${op} ${schemaCode}`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => codegen_1.str`should match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => codegen_1._`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode } = cxt;
        const regExp = $data ? codegen_1._`(new RegExp(${schemaCode}, "u"))` : code_1.usePattern(gen, schema);
        cxt.fail$data(codegen_1._`!${regExp}.test(${data})`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return codegen_1.str`should NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => codegen_1._`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data(codegen_1._`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/required.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var validate_1 = require_validate();
    var error = {
      message: ({ params: { missingProperty } }) => codegen_1.str`should have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => codegen_1._`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              validate_1.checkStrictMode(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              code_1.checkReportMissingProp(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if(code_1.checkMissingProp(cxt, schema, missing));
            code_1.reportMissingProp(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if(code_1.noPropertyInData(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, code_1.propertyInData(gen, data, missing, opts.ownProperties));
            gen.if(codegen_1.not(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return codegen_1.str`should NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => codegen_1._`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data(codegen_1._`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var equal = require_fast_deep_equal();
    var error = {
      message: ({ params: { i, j } }) => codegen_1.str`should NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => codegen_1._`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? dataType_1.getSchemaTypes(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, codegen_1._`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", codegen_1._`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if(codegen_1._`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = dataType_1.checkDataTypes(itemTypes, item, it.opts.strict, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", codegen_1._`{}`);
          gen.for(codegen_1._`;${i}--;`, () => {
            gen.let(item, codegen_1._`${data}[${i}]`);
            gen.if(wrongType, codegen_1._`continue`);
            if (itemTypes.length > 1)
              gen.if(codegen_1._`typeof ${item} == "string"`, codegen_1._`${item} += "_"`);
            gen.if(codegen_1._`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, codegen_1._`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code(codegen_1._`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = cxt.gen.scopeValue("func", {
            ref: equal,
            code: codegen_1._`require("ajv/dist/compile/equal")`
          });
          const outer = gen.name("outer");
          gen.label(outer).for(codegen_1._`;${i}--;`, () => gen.for(codegen_1._`${j} = ${i}; ${j}--;`, () => gen.if(codegen_1._`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/const.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var equal = require_fast_deep_equal();
    var error = {
      message: "should be equal to constant",
      params: ({ schemaCode }) => codegen_1._`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const eql = cxt.gen.scopeValue("func", {
          ref: equal,
          code: codegen_1._`require("ajv/dist/compile/equal")`
        });
        cxt.fail$data(codegen_1._`!${eql}(${cxt.data}, ${cxt.schemaCode})`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/enum.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var equal = require_fast_deep_equal();
    var error = {
      message: "should be equal to one of the allowed values",
      params: ({ schemaCode }) => codegen_1._`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        const eql = cxt.gen.scopeValue("func", {
          ref: equal,
          code: codegen_1._`require("ajv/dist/compile/equal")`
        });
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = codegen_1.or(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if(codegen_1._`${eql}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return sch && typeof sch === "object" ? codegen_1._`${eql}(${data}, ${vSchema}[${i}])` : codegen_1._`${data} === ${sch}`;
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      limitNumber_1.default,
      multipleOf_1.default,
      limitLength_1.default,
      pattern_1.default,
      limitProperties_1.default,
      required_1.default,
      limitItems_1.default,
      uniqueItems_1.default,
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports2.default = validation;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var subschema_1 = require_subschema();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var error = {
      message: ({ params: { len } }) => codegen_1.str`should NOT have more than ${len} items`,
      params: ({ params: { len } }) => codegen_1._`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          validate_1.checkStrictMode(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        it.items = true;
        const len = gen.const("len", codegen_1._`${data}.length`);
        if (schema === false) {
          cxt.setParams({ len: items.length });
          cxt.pass(codegen_1._`${len} <= ${items.length}`);
        } else if (typeof schema == "object" && !util_1.alwaysValidSchema(it, schema)) {
          const valid = gen.var("valid", codegen_1._`${len} <= ${items.length}`);
          gen.if(codegen_1.not(valid), () => validateItems(valid));
          cxt.ok(valid);
        }
        function validateItems(valid) {
          gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword: "additionalItems", dataProp: i, dataPropType: subschema_1.Type.Num }, valid);
            if (!it.allErrors)
              gen.if(codegen_1.not(valid), () => gen.break());
          });
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (Array.isArray(schema)) {
          if (it.opts.unevaluated && schema.length && it.items !== true) {
            it.items = util_1.mergeEvaluated.items(gen, schema.length, it.items);
          }
          validateTuple(schema);
        } else {
          it.items = true;
          if (util_1.alwaysValidSchema(it, schema))
            return;
          cxt.ok(code_1.validateArray(cxt));
        }
        function validateTuple(schArr) {
          const { parentSchema, data } = cxt;
          if (it.opts.strictTuples && !fullTupleSchema(schArr.length, parentSchema)) {
            const msg = `"items" is ${schArr.length}-tuple, but minItems or maxItems/additionalItems are not specified or different`;
            validate_1.checkStrictMode(it, msg, it.opts.strictTuples);
          }
          const valid = gen.name("valid");
          const len = gen.const("len", codegen_1._`${data}.length`);
          schArr.forEach((sch, i) => {
            if (util_1.alwaysValidSchema(it, sch))
              return;
            gen.if(codegen_1._`${len} > ${i}`, () => cxt.subschema({
              keyword: "items",
              schemaProp: i,
              dataProp: i
            }, valid));
            cxt.ok(valid);
          });
        }
      }
    };
    function fullTupleSchema(len, sch) {
      return len === sch.minItems && (len === sch.maxItems || sch.additionalItems === false);
    }
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var subschema_1 = require_subschema();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? codegen_1.str`should contain at least ${min} valid item(s)` : codegen_1.str`should contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? codegen_1._`{minContains: ${min}}` : codegen_1._`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", codegen_1._`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          validate_1.checkStrictMode(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          validate_1.checkStrictMode(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if (util_1.alwaysValidSchema(it, schema)) {
          let cond = codegen_1._`${len} >= ${min}`;
          if (max !== void 0)
            cond = codegen_1._`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else {
          gen.let(valid, false);
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        cxt.result(valid, () => cxt.reset());
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: subschema_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code(codegen_1._`${count}++`);
          if (max === void 0) {
            gen.if(codegen_1._`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if(codegen_1._`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if(codegen_1._`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateSchemaDeps = exports2.validatePropertyDeps = exports2.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports2.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return codegen_1.str`should have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => codegen_1._`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports2.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = code_1.propertyInData(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              code_1.checkReportMissingProp(cxt, depProp);
            }
          });
        } else {
          gen.if(codegen_1._`${hasProperty} && (${code_1.checkMissingProp(cxt, deps, missing)})`);
          code_1.reportMissingProp(cxt, missing);
          gen.else();
        }
      }
    }
    exports2.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if (util_1.alwaysValidSchema(it, schemaDeps[prop]))
          continue;
        gen.if(code_1.propertyInData(gen, data, prop, it.opts.ownProperties), () => {
          const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
          cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true));
        cxt.ok(valid);
      }
    }
    exports2.validateSchemaDeps = validateSchemaDeps;
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => codegen_1.str`property name '${params.propertyName}' is invalid`,
      params: ({ params }) => codegen_1._`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if (util_1.alwaysValidSchema(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if(codegen_1.not(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var subschema_1 = require_subschema();
    var util_1 = require_util();
    var error = {
      message: "should NOT have additional properties",
      params: ({ params }) => codegen_1._`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && util_1.alwaysValidSchema(it, schema))
          return;
        const props = code_1.allSchemaProperties(parentSchema.properties);
        const patProps = code_1.allSchemaProperties(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok(codegen_1._`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = util_1.schemaRefOrVal(it, parentSchema.properties, "properties");
            definedProp = code_1.isOwnProperty(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = codegen_1.or(...props.map((p) => codegen_1._`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = codegen_1.or(definedProp, ...patProps.map((p) => codegen_1._`${code_1.usePattern(gen, p)}.test(${key})`));
          }
          return codegen_1.not(definedProp);
        }
        function deleteAdditional(key) {
          gen.code(codegen_1._`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !util_1.alwaysValidSchema(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if(codegen_1.not(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if(codegen_1.not(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: subschema_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var context_1 = require_context();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new context_1.default(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = code_1.allSchemaProperties(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, util_1.toHash(allProps), it.props);
        }
        const properties = allProps.filter((p) => !util_1.alwaysValidSchema(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if(code_1.propertyInData(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var subschema_1 = require_subschema();
    var validate_1 = require_validate();
    var util_1 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = code_1.schemaProperties(it, schema);
        if (patterns.length === 0)
          return;
        const checkProperties = opts.strict && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = util_1.evaluatedPropsToName(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              validate_1.checkStrictMode(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if(codegen_1._`${code_1.usePattern(gen, pat)}.test(${key})`, () => {
              cxt.subschema({
                keyword: "patternProperties",
                schemaProp: pat,
                dataProp: key,
                dataPropType: subschema_1.Type.Str
              }, valid);
              if (it.opts.unevaluated && props !== true) {
                gen.assign(codegen_1._`${props}[${key}]`, true);
              } else if (!it.allErrors) {
                gen.if(codegen_1.not(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/not.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (util_1.alwaysValidSchema(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.result(valid, () => cxt.error(), () => cxt.reset());
      },
      error: {
        message: "should NOT be valid"
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: {
        message: "should match some schema in anyOf"
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "should match exactly one schema in oneOf",
      params: ({ params }) => codegen_1._`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if (util_1.alwaysValidSchema(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if(codegen_1._`${schValid} && ${valid}`).assign(valid, false).assign(passing, codegen_1._`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if (util_1.alwaysValidSchema(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/if.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var error = {
      message: ({ params }) => codegen_1.str`should match "${params.ifClause}" schema`,
      params: ({ params }) => codegen_1._`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          validate_1.checkStrictMode(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if(codegen_1.not(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, codegen_1._`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !util_1.alwaysValidSchema(it, schema);
    }
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var validate_1 = require_validate();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          validate_1.checkStrictMode(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var items_1 = require_items();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    var applicator = [
      not_1.default,
      anyOf_1.default,
      oneOf_1.default,
      allOf_1.default,
      if_1.default,
      thenElse_1.default,
      additionalItems_1.default,
      items_1.default,
      contains_1.default,
      propertyNames_1.default,
      additionalProperties_1.default,
      dependencies_1.default,
      properties_1.default,
      patternProperties_1.default
    ];
    exports2.default = applicator;
  }
});

// node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/format.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => codegen_1.str`should match format "${schemaCode}"`,
      params: ({ schemaCode }) => codegen_1._`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self: self2 } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self2.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", codegen_1._`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if(codegen_1._`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, codegen_1._`${fDef}.type || "string"`).assign(format, codegen_1._`${fDef}.validate`), () => gen.assign(fType, codegen_1._`"string"`).assign(format, fDef));
          cxt.fail$data(codegen_1.or(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strict === false)
              return codegen_1.nil;
            return codegen_1._`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? codegen_1._`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : codegen_1._`${format}(${data})`;
            const validData = codegen_1._`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return codegen_1._`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self2.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strict === false) {
              self2.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const fmt = gen.scopeValue("formats", {
              key: schema,
              ref: fmtDef,
              code: opts.code.formats ? codegen_1._`${opts.code.formats}${codegen_1.getProperty(schema)}` : void 0
            });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, codegen_1._`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return codegen_1._`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? codegen_1._`${fmtRef}(${data})` : codegen_1._`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports2.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports2.default = format;
  }
});

// node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "node_modules/ajv/dist/vocabularies/metadata.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.contentVocabulary = exports2.metadataVocabulary = void 0;
    exports2.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports2.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "node_modules/ajv/dist/vocabularies/draft7.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var core_1 = require_core3();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      applicator_1.default,
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports2.default = draft7Vocabularies;
  }
});

// node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports2, module2) {
    module2.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "node_modules/ajv/dist/ajv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CodeGen = exports2.Name = exports2.nil = exports2.stringify = exports2.str = exports2._ = exports2.KeywordCxt = void 0;
    var context_1 = require_context();
    exports2.KeywordCxt = context_1.default;
    var codegen_1 = require_codegen();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports2, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var core_1 = require_core2();
    var draft7_1 = require_draft7();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports2.default = Ajv;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/JsonSchema.js
var require_JsonSchema = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/JsonSchema.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ajv_1 = __importDefault(require_ajv());
    var errors_1 = require_errors();
    var JsonSchema = class {
      constructor(schema, opts) {
        this.validate = this.getJsonSchema(schema, opts);
      }
      getJsonSchema(schema, opts) {
        var _a;
        const ajv = (_a = opts === null || opts === void 0 ? void 0 : opts.ajvInstance) !== null && _a !== void 0 ? _a : new ajv_1.default(opts);
        const validate = ajv.compile(JSON.parse(schema.schema));
        return validate;
      }
      validatePayload(payload) {
        const paths = [];
        if (!this.isValid(payload, { errorHook: (path) => paths.push(path) })) {
          throw new errors_1.ConfluentSchemaRegistryValidationError("invalid payload", paths);
        }
      }
      toBuffer(payload) {
        this.validatePayload(payload);
        return Buffer.from(JSON.stringify(payload));
      }
      fromBuffer(buffer) {
        const payload = JSON.parse(buffer.toString());
        this.validatePayload(payload);
        return payload;
      }
      isValid(payload, opts) {
        if (!this.validate(payload)) {
          if (opts === null || opts === void 0 ? void 0 : opts.errorHook) {
            for (const err of this.validate.errors) {
              const path = this.isOldAjvValidationError(err) ? err.dataPath : err.instancePath;
              opts.errorHook([path], err.data, err.schema);
            }
          }
          return false;
        }
        return true;
      }
      isOldAjvValidationError(error) {
        return error.dataPath != null;
      }
    };
    exports2.default = JsonSchema;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/ProtoHelper.js
var require_ProtoHelper = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/ProtoHelper.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_1 = require_errors();
    var ProtoHelper = class {
      validate(schema) {
        return;
      }
      getSubject(confluentSchema, schema, separator) {
        throw new errors_1.ConfluentSchemaRegistryError("not implemented yet");
      }
    };
    exports2.default = ProtoHelper;
  }
});

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject2(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString2() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
          if (err) {
            self2.emit("error", err, method);
            return callback(err);
          }
          if (response === null) {
            self2.end(true);
            return void 0;
          }
          if (!(response instanceof responseCtor)) {
            try {
              response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
            } catch (err2) {
              self2.emit("error", err2, method);
              return callback(err2);
            }
          }
          self2.emit("data", response, method);
          return callback(null, response);
        });
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/@protobufjs/codegen/index.js
var require_codegen2 = __commonJS({
  "node_modules/@protobufjs/codegen/index.js"(exports2, module2) {
    "use strict";
    module2.exports = codegen;
    function codegen(functionParams, functionName) {
      if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = void 0;
      }
      var body = [];
      function Codegen(formatStringOrScope) {
        if (typeof formatStringOrScope !== "string") {
          var source = toString2();
          if (codegen.verbose)
            console.log("codegen: " + source);
          source = "return " + source;
          if (formatStringOrScope) {
            var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
            while (scopeOffset < scopeKeys.length) {
              scopeParams[scopeOffset] = scopeKeys[scopeOffset];
              scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
            }
            scopeParams[scopeOffset] = source;
            return Function.apply(null, scopeParams).apply(null, scopeValues);
          }
          return Function(source)();
        }
        var formatParams = new Array(arguments.length - 1), formatOffset = 0;
        while (formatOffset < formatParams.length)
          formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
          var value = formatParams[formatOffset++];
          switch ($1) {
            case "d":
            case "f":
              return String(Number(value));
            case "i":
              return String(Math.floor(value));
            case "j":
              return JSON.stringify(value);
            case "s":
              return String(value);
          }
          return "%";
        });
        if (formatOffset !== formatParams.length)
          throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
      }
      function toString2(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
      }
      Codegen.toString = toString2;
      return Codegen;
    }
    codegen.verbose = false;
  }
});

// node_modules/@protobufjs/fetch/index.js
var require_fetch2 = __commonJS({
  "node_modules/@protobufjs/fetch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = fetch2;
    var asPromise = require_aspromise();
    var inquire2 = require_inquire();
    var fs2 = inquire2("fs");
    function fetch2(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (!options)
        options = {};
      if (!callback)
        return asPromise(fetch2, this, filename, options);
      if (!options.xhr && fs2 && fs2.readFile)
        return fs2.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch2.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        });
      return fetch2.xhr(filename, options, callback);
    }
    fetch2.xhr = function fetch_xhr(filename, options, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function fetchOnReadyStateChange() {
        if (xhr.readyState !== 4)
          return void 0;
        if (xhr.status !== 0 && xhr.status !== 200)
          return callback(Error("status " + xhr.status));
        if (options.binary) {
          var buffer = xhr.response;
          if (!buffer) {
            buffer = [];
            for (var i = 0; i < xhr.responseText.length; ++i)
              buffer.push(xhr.responseText.charCodeAt(i) & 255);
          }
          return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
      };
      if (options.binary) {
        if ("overrideMimeType" in xhr)
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
      }
      xhr.open("GET", filename);
      xhr.send();
    };
  }
});

// node_modules/@protobufjs/path/index.js
var require_path = __commonJS({
  "node_modules/@protobufjs/path/index.js"(exports2) {
    "use strict";
    var path = exports2;
    var isAbsolute = path.isAbsolute = function isAbsolute2(path2) {
      return /^(?:\/|\w+:)/.test(path2);
    };
    var normalize = path.normalize = function normalize2(path2) {
      path2 = path2.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
      var parts = path2.split("/"), absolute = isAbsolute(path2), prefix = "";
      if (absolute)
        prefix = parts.shift() + "/";
      for (var i = 0; i < parts.length; ) {
        if (parts[i] === "..") {
          if (i > 0 && parts[i - 1] !== "..")
            parts.splice(--i, 2);
          else if (absolute)
            parts.splice(i, 1);
          else
            ++i;
        } else if (parts[i] === ".")
          parts.splice(i, 1);
        else
          ++i;
      }
      return prefix + parts.join("/");
    };
    path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
      if (!alreadyNormalized)
        includePath = normalize(includePath);
      if (isAbsolute(includePath))
        return includePath;
      if (!alreadyNormalized)
        originPath = normalize(originPath);
      return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
    };
  }
});

// node_modules/protobufjs/src/types.js
var require_types3 = __commonJS({
  "node_modules/protobufjs/src/types.js"(exports2) {
    "use strict";
    var types = exports2;
    var util = require_util2();
    var s = [
      "double",
      "float",
      "int32",
      "uint32",
      "sint32",
      "fixed32",
      "sfixed32",
      "int64",
      "uint64",
      "sint64",
      "fixed64",
      "sfixed64",
      "bool",
      "string",
      "bytes"
    ];
    function bake(values, offset) {
      var i = 0, o = {};
      offset |= 0;
      while (i < values.length)
        o[s[i + offset]] = values[i++];
      return o;
    }
    types.basic = bake([
      1,
      5,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0,
      2,
      2
    ]);
    types.defaults = bake([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      "",
      util.emptyArray,
      null
    ]);
    types.long = bake([
      0,
      0,
      0,
      1,
      1
    ], 7);
    types.mapKey = bake([
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0,
      2
    ], 2);
    types.packed = bake([
      1,
      5,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0
    ]);
  }
});

// node_modules/protobufjs/src/field.js
var require_field = __commonJS({
  "node_modules/protobufjs/src/field.js"(exports2, module2) {
    "use strict";
    module2.exports = Field;
    var ReflectionObject = require_object();
    ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
    var Enum = require_enum2();
    var types = require_types3();
    var util = require_util2();
    var Type;
    var ruleRe = /^required|optional|repeated$/;
    Field.fromJSON = function fromJSON(name, json) {
      return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
    };
    function Field(name, id, type, rule, extend, options, comment) {
      if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = void 0;
      } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");
      if (!util.isString(type))
        throw TypeError("type must be a string");
      if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");
      if (extend !== void 0 && !util.isString(extend))
        throw TypeError("extend must be a string");
      if (rule === "proto3_optional") {
        rule = "optional";
      }
      this.rule = rule && rule !== "optional" ? rule : void 0;
      this.type = type;
      this.id = id;
      this.extend = extend || void 0;
      this.required = rule === "required";
      this.optional = !this.required;
      this.repeated = rule === "repeated";
      this.map = false;
      this.message = null;
      this.partOf = null;
      this.typeDefault = null;
      this.defaultValue = null;
      this.long = util.Long ? types.long[type] !== void 0 : false;
      this.bytes = type === "bytes";
      this.resolvedType = null;
      this.extensionField = null;
      this.declaringField = null;
      this._packed = null;
      this.comment = comment;
    }
    Object.defineProperty(Field.prototype, "packed", {
      get: function() {
        if (this._packed === null)
          this._packed = this.getOption("packed") !== false;
        return this._packed;
      }
    });
    Field.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (name === "packed")
        this._packed = null;
      return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
    };
    Field.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "rule",
        this.rule !== "optional" && this.rule || void 0,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Field.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if ((this.typeDefault = types.defaults[this.type]) === void 0) {
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
          this.typeDefault = null;
        else
          this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
      }
      if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
          this.typeDefault = this.resolvedType.values[this.typeDefault];
      }
      if (this.options) {
        if (this.options.packed === true || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
          delete this.options.packed;
        if (!Object.keys(this.options).length)
          this.options = void 0;
      }
      if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
        if (Object.freeze)
          Object.freeze(this.typeDefault);
      } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
          util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
          util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
      }
      if (this.map)
        this.defaultValue = util.emptyObject;
      else if (this.repeated)
        this.defaultValue = util.emptyArray;
      else
        this.defaultValue = this.typeDefault;
      if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;
      return ReflectionObject.prototype.resolve.call(this);
    };
    Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
      if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;
      else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;
      return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
      };
    };
    Field._configure = function configure(Type_) {
      Type = Type_;
    };
  }
});

// node_modules/protobufjs/src/oneof.js
var require_oneof = __commonJS({
  "node_modules/protobufjs/src/oneof.js"(exports2, module2) {
    "use strict";
    module2.exports = OneOf;
    var ReflectionObject = require_object();
    ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
    var Field = require_field();
    var util = require_util2();
    function OneOf(name, fieldNames, options, comment) {
      if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");
      this.oneof = fieldNames || [];
      this.fieldsArray = [];
      this.comment = comment;
    }
    OneOf.fromJSON = function fromJSON(name, json) {
      return new OneOf(name, json.oneof, json.options, json.comment);
    };
    OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "oneof",
        this.oneof,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    function addFieldsToParent(oneof) {
      if (oneof.parent) {
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
          if (!oneof.fieldsArray[i].parent)
            oneof.parent.add(oneof.fieldsArray[i]);
      }
    }
    OneOf.prototype.add = function add(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
      this.oneof.push(field.name);
      this.fieldsArray.push(field);
      field.partOf = this;
      addFieldsToParent(this);
      return this;
    };
    OneOf.prototype.remove = function remove(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      var index = this.fieldsArray.indexOf(field);
      if (index < 0)
        throw Error(field + " is not a member of " + this);
      this.fieldsArray.splice(index, 1);
      index = this.oneof.indexOf(field.name);
      if (index > -1)
        this.oneof.splice(index, 1);
      field.partOf = null;
      return this;
    };
    OneOf.prototype.onAdd = function onAdd(parent) {
      ReflectionObject.prototype.onAdd.call(this, parent);
      var self2 = this;
      for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
          field.partOf = self2;
          self2.fieldsArray.push(field);
        }
      }
      addFieldsToParent(this);
    };
    OneOf.prototype.onRemove = function onRemove(parent) {
      for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
          field.parent.remove(field);
      ReflectionObject.prototype.onRemove.call(this, parent);
    };
    OneOf.d = function decorateOneOf() {
      var fieldNames = new Array(arguments.length), index = 0;
      while (index < arguments.length)
        fieldNames[index] = arguments[index++];
      return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
          get: util.oneOfGetter(fieldNames),
          set: util.oneOfSetter(fieldNames)
        });
      };
    };
  }
});

// node_modules/protobufjs/src/namespace.js
var require_namespace = __commonJS({
  "node_modules/protobufjs/src/namespace.js"(exports2, module2) {
    "use strict";
    module2.exports = Namespace;
    var ReflectionObject = require_object();
    ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
    var Field = require_field();
    var OneOf = require_oneof();
    var util = require_util2();
    var Type;
    var Service;
    var Enum;
    Namespace.fromJSON = function fromJSON(name, json) {
      return new Namespace(name, json.options).addJSON(json.nested);
    };
    function arrayToJSON(array, toJSONOptions) {
      if (!(array && array.length))
        return void 0;
      var obj = {};
      for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
      return obj;
    }
    Namespace.arrayToJSON = arrayToJSON;
    Namespace.isReservedId = function isReservedId(reserved, id) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id)
            return true;
      }
      return false;
    };
    Namespace.isReservedName = function isReservedName(reserved, name) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (reserved[i] === name)
            return true;
      }
      return false;
    };
    function Namespace(name, options) {
      ReflectionObject.call(this, name, options);
      this.nested = void 0;
      this._nestedArray = null;
    }
    function clearCache(namespace) {
      namespace._nestedArray = null;
      return namespace;
    }
    Object.defineProperty(Namespace.prototype, "nestedArray", {
      get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
      }
    });
    Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
      return util.toObject([
        "options",
        this.options,
        "nested",
        arrayToJSON(this.nestedArray, toJSONOptions)
      ]);
    };
    Namespace.prototype.addJSON = function addJSON(nestedJson) {
      var ns = this;
      if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
          nested = nestedJson[names[i]];
          ns.add((nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested));
        }
      }
      return this;
    };
    Namespace.prototype.get = function get(name) {
      return this.nested && this.nested[name] || null;
    };
    Namespace.prototype.getEnum = function getEnum(name) {
      if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
      throw Error("no such enum: " + name);
    };
    Namespace.prototype.add = function add(object) {
      if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace || object instanceof OneOf))
        throw TypeError("object must be a valid nested object");
      if (!this.nested)
        this.nested = {};
      else {
        var prev = this.get(object.name);
        if (prev) {
          if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
            var nested = prev.nestedArray;
            for (var i = 0; i < nested.length; ++i)
              object.add(nested[i]);
            this.remove(prev);
            if (!this.nested)
              this.nested = {};
            object.setOptions(prev.options, true);
          } else
            throw Error("duplicate name '" + object.name + "' in " + this);
        }
      }
      this.nested[object.name] = object;
      object.onAdd(this);
      return clearCache(this);
    };
    Namespace.prototype.remove = function remove(object) {
      if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
      if (object.parent !== this)
        throw Error(object + " is not a member of " + this);
      delete this.nested[object.name];
      if (!Object.keys(this.nested).length)
        this.nested = void 0;
      object.onRemove(this);
      return clearCache(this);
    };
    Namespace.prototype.define = function define2(path, json) {
      if (util.isString(path))
        path = path.split(".");
      else if (!Array.isArray(path))
        throw TypeError("illegal path");
      if (path && path.length && path[0] === "")
        throw Error("path must be relative");
      var ptr = this;
      while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
          ptr = ptr.nested[part];
          if (!(ptr instanceof Namespace))
            throw Error("path conflicts with non-namespace objects");
        } else
          ptr.add(ptr = new Namespace(part));
      }
      if (json)
        ptr.addJSON(json);
      return ptr;
    };
    Namespace.prototype.resolveAll = function resolveAll() {
      var nested = this.nestedArray, i = 0;
      while (i < nested.length)
        if (nested[i] instanceof Namespace)
          nested[i++].resolveAll();
        else
          nested[i++].resolve();
      return this.resolve();
    };
    Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
      if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = void 0;
      } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [filterTypes];
      if (util.isString(path) && path.length) {
        if (path === ".")
          return this.root;
        path = path.split(".");
      } else if (!path.length)
        return this;
      if (path[0] === "")
        return this.root.lookup(path.slice(1), filterTypes);
      var found = this.get(path[0]);
      if (found) {
        if (path.length === 1) {
          if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
            return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
          return found;
      } else
        for (var i = 0; i < this.nestedArray.length; ++i)
          if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
            return found;
      if (this.parent === null || parentAlreadyChecked)
        return null;
      return this.parent.lookup(path, filterTypes);
    };
    Namespace.prototype.lookupType = function lookupType(path) {
      var found = this.lookup(path, [Type]);
      if (!found)
        throw Error("no such type: " + path);
      return found;
    };
    Namespace.prototype.lookupEnum = function lookupEnum(path) {
      var found = this.lookup(path, [Enum]);
      if (!found)
        throw Error("no such Enum '" + path + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
      var found = this.lookup(path, [Type, Enum]);
      if (!found)
        throw Error("no such Type or Enum '" + path + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupService = function lookupService(path) {
      var found = this.lookup(path, [Service]);
      if (!found)
        throw Error("no such Service '" + path + "' in " + this);
      return found;
    };
    Namespace._configure = function(Type_, Service_, Enum_) {
      Type = Type_;
      Service = Service_;
      Enum = Enum_;
    };
  }
});

// node_modules/protobufjs/src/mapfield.js
var require_mapfield = __commonJS({
  "node_modules/protobufjs/src/mapfield.js"(exports2, module2) {
    "use strict";
    module2.exports = MapField;
    var Field = require_field();
    ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
    var types = require_types3();
    var util = require_util2();
    function MapField(name, id, keyType, type, options, comment) {
      Field.call(this, name, id, type, void 0, void 0, options, comment);
      if (!util.isString(keyType))
        throw TypeError("keyType must be a string");
      this.keyType = keyType;
      this.resolvedKeyType = null;
      this.map = true;
    }
    MapField.fromJSON = function fromJSON(name, json) {
      return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
    };
    MapField.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "keyType",
        this.keyType,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    MapField.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (types.mapKey[this.keyType] === void 0)
        throw Error("invalid key type: " + this.keyType);
      return Field.prototype.resolve.call(this);
    };
    MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
      if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;
      else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;
      return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
      };
    };
  }
});

// node_modules/protobufjs/src/method.js
var require_method = __commonJS({
  "node_modules/protobufjs/src/method.js"(exports2, module2) {
    "use strict";
    module2.exports = Method;
    var ReflectionObject = require_object();
    ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
    var util = require_util2();
    function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
      if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = void 0;
      } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = void 0;
      }
      if (!(type === void 0 || util.isString(type)))
        throw TypeError("type must be a string");
      if (!util.isString(requestType))
        throw TypeError("requestType must be a string");
      if (!util.isString(responseType))
        throw TypeError("responseType must be a string");
      ReflectionObject.call(this, name, options);
      this.type = type || "rpc";
      this.requestType = requestType;
      this.requestStream = requestStream ? true : void 0;
      this.responseType = responseType;
      this.responseStream = responseStream ? true : void 0;
      this.resolvedRequestType = null;
      this.resolvedResponseType = null;
      this.comment = comment;
      this.parsedOptions = parsedOptions;
    }
    Method.fromJSON = function fromJSON(name, json) {
      return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
    };
    Method.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "type",
        this.type !== "rpc" && this.type || void 0,
        "requestType",
        this.requestType,
        "requestStream",
        this.requestStream,
        "responseType",
        this.responseType,
        "responseStream",
        this.responseStream,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0,
        "parsedOptions",
        this.parsedOptions
      ]);
    };
    Method.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      this.resolvedRequestType = this.parent.lookupType(this.requestType);
      this.resolvedResponseType = this.parent.lookupType(this.responseType);
      return ReflectionObject.prototype.resolve.call(this);
    };
  }
});

// node_modules/protobufjs/src/service.js
var require_service2 = __commonJS({
  "node_modules/protobufjs/src/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var Namespace = require_namespace();
    ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
    var Method = require_method();
    var util = require_util2();
    var rpc = require_rpc();
    function Service(name, options) {
      Namespace.call(this, name, options);
      this.methods = {};
      this._methodsArray = null;
    }
    Service.fromJSON = function fromJSON(name, json) {
      var service = new Service(name, json.options);
      if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
          service.add(Method.fromJSON(names[i], json.methods[names[i]]));
      if (json.nested)
        service.addJSON(json.nested);
      service.comment = json.comment;
      return service;
    };
    Service.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "methods",
        Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || {},
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Object.defineProperty(Service.prototype, "methodsArray", {
      get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
      }
    });
    function clearCache(service) {
      service._methodsArray = null;
      return service;
    }
    Service.prototype.get = function get(name) {
      return this.methods[name] || Namespace.prototype.get.call(this, name);
    };
    Service.prototype.resolveAll = function resolveAll() {
      var methods = this.methodsArray;
      for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
      return Namespace.prototype.resolve.call(this);
    };
    Service.prototype.add = function add(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Service.prototype.remove = function remove(object) {
      if (object instanceof Method) {
        if (this.methods[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
      var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
      for (var i = 0, method; i < this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
          m: method,
          q: method.resolvedRequestType.ctor,
          s: method.resolvedResponseType.ctor
        });
      }
      return rpcService;
    };
  }
});

// node_modules/protobufjs/src/message.js
var require_message = __commonJS({
  "node_modules/protobufjs/src/message.js"(exports2, module2) {
    "use strict";
    module2.exports = Message;
    var util = require_minimal();
    function Message(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          this[keys[i]] = properties[keys[i]];
    }
    Message.create = function create(properties) {
      return this.$type.create(properties);
    };
    Message.encode = function encode(message, writer) {
      return this.$type.encode(message, writer);
    };
    Message.encodeDelimited = function encodeDelimited(message, writer) {
      return this.$type.encodeDelimited(message, writer);
    };
    Message.decode = function decode(reader) {
      return this.$type.decode(reader);
    };
    Message.decodeDelimited = function decodeDelimited(reader) {
      return this.$type.decodeDelimited(reader);
    };
    Message.verify = function verify(message) {
      return this.$type.verify(message);
    };
    Message.fromObject = function fromObject(object) {
      return this.$type.fromObject(object);
    };
    Message.toObject = function toObject(message, options) {
      return this.$type.toObject(message, options);
    };
    Message.prototype.toJSON = function toJSON() {
      return this.$type.toObject(this, util.toJSONOptions);
    };
  }
});

// node_modules/protobufjs/src/decoder.js
var require_decoder = __commonJS({
  "node_modules/protobufjs/src/decoder.js"(exports2, module2) {
    "use strict";
    module2.exports = decoder;
    var Enum = require_enum2();
    var types = require_types3();
    var util = require_util2();
    function missing(field) {
      return "missing required '" + field.name + "'";
    }
    function decoder(mtype) {
      var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field2) {
        return field2.map;
      }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
      if (mtype.group)
        gen("if((t&7)===4)")("break");
      gen("switch(t>>>3){");
      var i = 0;
      for (; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
        gen("case %i:", field.id);
        if (field.map) {
          gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
          if (types.defaults[field.keyType] !== void 0)
            gen("k=%j", types.defaults[field.keyType]);
          else
            gen("k=null");
          if (types.defaults[type] !== void 0)
            gen("value=%j", types.defaults[type]);
          else
            gen("value=null");
          gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
          if (types.basic[type] === void 0)
            gen("value=types[%i].decode(r,r.uint32())", i);
          else
            gen("value=r.%s()", type);
          gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
          if (types.long[field.keyType] !== void 0)
            gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
          else
            gen("%s[k]=value", ref);
        } else if (field.repeated) {
          gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
          if (types.packed[type] !== void 0)
            gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
          if (types.basic[type] === void 0)
            gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
          else
            gen("%s.push(r.%s())", ref, type);
        } else if (types.basic[type] === void 0)
          gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else
          gen("%s=r.%s()", ref, type);
        gen("break");
      }
      gen("default:")("r.skipType(t&7)")("break")("}")("}");
      for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required)
          gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
      }
      return gen("return m");
    }
  }
});

// node_modules/protobufjs/src/verifier.js
var require_verifier = __commonJS({
  "node_modules/protobufjs/src/verifier.js"(exports2, module2) {
    "use strict";
    module2.exports = verifier;
    var Enum = require_enum2();
    var util = require_util2();
    function invalid(field, expected) {
      return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
    }
    function genVerifyValue(gen, field, fieldIndex, ref) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
          for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j)
            gen("case %i:", field.resolvedType.values[keys[j]]);
          gen("break")("}");
        } else {
          gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
        }
      } else {
        switch (field.type) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
            break;
          case "float":
          case "double":
            gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
            break;
          case "bool":
            gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
            break;
          case "string":
            gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
            break;
          case "bytes":
            gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
            break;
        }
      }
      return gen;
    }
    function genVerifyKey(gen, field, ref) {
      switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
          break;
        case "bool":
          gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
          break;
      }
      return gen;
    }
    function verifier(mtype) {
      var gen = util.codegen(["m"], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
      var oneofs = mtype.oneofsArray, seenFirstField = {};
      if (oneofs.length)
        gen("var p={}");
      for (var i = 0; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
        if (field.optional)
          gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
        if (field.map) {
          gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
          genVerifyKey(gen, field, "k[i]");
          genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
        } else if (field.repeated) {
          gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
          genVerifyValue(gen, field, i, ref + "[i]")("}");
        } else {
          if (field.partOf) {
            var oneofProp = util.safeProp(field.partOf.name);
            if (seenFirstField[field.partOf.name] === 1)
              gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
            seenFirstField[field.partOf.name] = 1;
            gen("p%s=1", oneofProp);
          }
          genVerifyValue(gen, field, i, ref);
        }
        if (field.optional)
          gen("}");
      }
      return gen("return null");
    }
  }
});

// node_modules/protobufjs/src/converter.js
var require_converter = __commonJS({
  "node_modules/protobufjs/src/converter.js"(exports2) {
    "use strict";
    var converter = exports2;
    var Enum = require_enum2();
    var util = require_util2();
    function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(d%s){", prop);
          for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
            if (field.repeated && values[keys[i]] === field.typeDefault)
              gen("default:");
            gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
          }
          gen("}");
        } else
          gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("m%s=Number(d%s)", prop, prop);
            break;
          case "uint32":
          case "fixed32":
            gen("m%s=d%s>>>0", prop, prop);
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            gen("m%s=d%s|0", prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
            break;
          case "bytes":
            gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length)", prop)("m%s=d%s", prop, prop);
            break;
          case "string":
            gen("m%s=String(d%s)", prop, prop);
            break;
          case "bool":
            gen("m%s=Boolean(d%s)", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.fromObject = function fromObject(mtype) {
      var fields = mtype.fieldsArray;
      var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
      if (!fields.length)
        return gen("return new this.ctor");
      gen("var m=new this.ctor");
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), prop = util.safeProp(field.name);
        if (field.map) {
          gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
          genValuePartial_fromObject(gen, field, i, prop + "[ks[i]]")("}")("}");
        } else if (field.repeated) {
          gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
          genValuePartial_fromObject(gen, field, i, prop + "[i]")("}")("}");
        } else {
          if (!(field.resolvedType instanceof Enum))
            gen("if(d%s!=null){", prop);
          genValuePartial_fromObject(gen, field, i, prop);
          if (!(field.resolvedType instanceof Enum))
            gen("}");
        }
      }
      return gen("return m");
    };
    function genValuePartial_toObject(gen, field, fieldIndex, prop) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum)
          gen("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else
          gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
            break;
          case "bytes":
            gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
            break;
          default:
            gen("d%s=m%s", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.toObject = function toObject(mtype) {
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      if (!fields.length)
        return util.codegen()("return {}");
      var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
      var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
      for (; i < fields.length; ++i)
        if (!fields[i].partOf)
          (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
      if (repeatedFields.length) {
        gen("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i)
          gen("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen("}");
      }
      if (mapFields.length) {
        gen("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i)
          gen("d%s={}", util.safeProp(mapFields[i].name));
        gen("}");
      }
      if (normalFields.length) {
        gen("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
          var field = normalFields[i], prop = util.safeProp(field.name);
          if (field.resolvedType instanceof Enum)
            gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
          else if (field.long)
            gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
          else if (field.bytes) {
            var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
            gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
          } else
            gen("d%s=%j", prop, field.typeDefault);
        }
        gen("}");
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        var field = fields[i], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
        if (field.map) {
          if (!hasKs2) {
            hasKs2 = true;
            gen("var ks2");
          }
          gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
          genValuePartial_toObject(gen, field, index, prop + "[ks2[j]]")("}");
        } else if (field.repeated) {
          gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
          genValuePartial_toObject(gen, field, index, prop + "[j]")("}");
        } else {
          gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
          genValuePartial_toObject(gen, field, index, prop);
          if (field.partOf)
            gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen("}");
      }
      return gen("return d");
    };
  }
});

// node_modules/protobufjs/src/wrappers.js
var require_wrappers = __commonJS({
  "node_modules/protobufjs/src/wrappers.js"(exports2) {
    "use strict";
    var wrappers = exports2;
    var Message = require_message();
    wrappers[".google.protobuf.Any"] = {
      fromObject: function(object) {
        if (object && object["@type"]) {
          var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
          var type = this.lookup(name);
          if (type) {
            var type_url = object["@type"].charAt(0) === "." ? object["@type"].substr(1) : object["@type"];
            if (type_url.indexOf("/") === -1) {
              type_url = "/" + type_url;
            }
            return this.create({
              type_url,
              value: type.encode(type.fromObject(object)).finish()
            });
          }
        }
        return this.fromObject(object);
      },
      toObject: function(message, options) {
        var googleApi = "type.googleapis.com/";
        var prefix = "";
        var name = "";
        if (options && options.json && message.type_url && message.value) {
          name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
          prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
          var type = this.lookup(name);
          if (type)
            message = type.decode(message.value);
        }
        if (!(message instanceof this.ctor) && message instanceof Message) {
          var object = message.$type.toObject(message, options);
          var messageName = message.$type.fullName[0] === "." ? message.$type.fullName.substr(1) : message.$type.fullName;
          if (prefix === "") {
            prefix = googleApi;
          }
          name = prefix + messageName;
          object["@type"] = name;
          return object;
        }
        return this.toObject(message, options);
      }
    };
  }
});

// node_modules/protobufjs/src/type.js
var require_type = __commonJS({
  "node_modules/protobufjs/src/type.js"(exports2, module2) {
    "use strict";
    module2.exports = Type;
    var Namespace = require_namespace();
    ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
    var Enum = require_enum2();
    var OneOf = require_oneof();
    var Field = require_field();
    var MapField = require_mapfield();
    var Service = require_service2();
    var Message = require_message();
    var Reader = require_reader();
    var Writer = require_writer();
    var util = require_util2();
    var encoder = require_encoder();
    var decoder = require_decoder();
    var verifier = require_verifier();
    var converter = require_converter();
    var wrappers = require_wrappers();
    function Type(name, options) {
      Namespace.call(this, name, options);
      this.fields = {};
      this.oneofs = void 0;
      this.extensions = void 0;
      this.reserved = void 0;
      this.group = void 0;
      this._fieldsById = null;
      this._fieldsArray = null;
      this._oneofsArray = null;
      this._ctor = null;
    }
    Object.defineProperties(Type.prototype, {
      fieldsById: {
        get: function() {
          if (this._fieldsById)
            return this._fieldsById;
          this._fieldsById = {};
          for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
            var field = this.fields[names[i]], id = field.id;
            if (this._fieldsById[id])
              throw Error("duplicate id " + id + " in " + this);
            this._fieldsById[id] = field;
          }
          return this._fieldsById;
        }
      },
      fieldsArray: {
        get: function() {
          return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
      },
      oneofsArray: {
        get: function() {
          return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
      },
      ctor: {
        get: function() {
          return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {
          var prototype = ctor.prototype;
          if (!(prototype instanceof Message)) {
            (ctor.prototype = new Message()).constructor = ctor;
            util.merge(ctor.prototype, prototype);
          }
          ctor.$type = ctor.prototype.$type = this;
          util.merge(ctor, Message, true);
          this._ctor = ctor;
          var i = 0;
          for (; i < this.fieldsArray.length; ++i)
            this._fieldsArray[i].resolve();
          var ctorProperties = {};
          for (i = 0; i < this.oneofsArray.length; ++i)
            ctorProperties[this._oneofsArray[i].resolve().name] = {
              get: util.oneOfGetter(this._oneofsArray[i].oneof),
              set: util.oneOfSetter(this._oneofsArray[i].oneof)
            };
          if (i)
            Object.defineProperties(ctor.prototype, ctorProperties);
        }
      }
    });
    Type.generateConstructor = function generateConstructor(mtype) {
      var gen = util.codegen(["p"], mtype.name);
      for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map)
          gen("this%s={}", util.safeProp(field.name));
        else if (field.repeated)
          gen("this%s=[]", util.safeProp(field.name));
      return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
    };
    function clearCache(type) {
      type._fieldsById = type._fieldsArray = type._oneofsArray = null;
      delete type.encode;
      delete type.decode;
      delete type.verify;
      return type;
    }
    Type.fromJSON = function fromJSON(name, json) {
      var type = new Type(name, json.options);
      type.extensions = json.extensions;
      type.reserved = json.reserved;
      var names = Object.keys(json.fields), i = 0;
      for (; i < names.length; ++i)
        type.add((typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]]));
      if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
          type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
      if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add((nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i], nested));
        }
      if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
      if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
      if (json.group)
        type.group = true;
      if (json.comment)
        type.comment = json.comment;
      return type;
    };
    Type.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "oneofs",
        Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields",
        Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {},
        "extensions",
        this.extensions && this.extensions.length ? this.extensions : void 0,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "group",
        this.group || void 0,
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Type.prototype.resolveAll = function resolveAll() {
      var fields = this.fieldsArray, i = 0;
      while (i < fields.length)
        fields[i++].resolve();
      var oneofs = this.oneofsArray;
      i = 0;
      while (i < oneofs.length)
        oneofs[i++].resolve();
      return Namespace.prototype.resolveAll.call(this);
    };
    Type.prototype.get = function get(name) {
      return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
    };
    Type.prototype.add = function add(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Field && object.extend === void 0) {
        if (this._fieldsById ? this._fieldsById[object.id] : this.fieldsById[object.id])
          throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
          throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
          throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.parent)
          object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs)
          this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Type.prototype.remove = function remove(object) {
      if (object instanceof Field && object.extend === void 0) {
        if (!this.fields || this.fields[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs || this.oneofs[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Type.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Type.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
    Type.prototype.create = function create(properties) {
      return new this.ctor(properties);
    };
    Type.prototype.setup = function setup() {
      var fullName = this.fullName, types = [];
      for (var i = 0; i < this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);
      this.encode = encoder(this)({
        Writer,
        types,
        util
      });
      this.decode = decoder(this)({
        Reader,
        types,
        util
      });
      this.verify = verifier(this)({
        types,
        util
      });
      this.fromObject = converter.fromObject(this)({
        types,
        util
      });
      this.toObject = converter.toObject(this)({
        types,
        util
      });
      var wrapper = wrappers[fullName];
      if (wrapper) {
        var originalThis = Object.create(this);
        originalThis.fromObject = this.fromObject;
        this.fromObject = wrapper.fromObject.bind(originalThis);
        originalThis.toObject = this.toObject;
        this.toObject = wrapper.toObject.bind(originalThis);
      }
      return this;
    };
    Type.prototype.encode = function encode_setup(message, writer) {
      return this.setup().encode(message, writer);
    };
    Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };
    Type.prototype.decode = function decode_setup(reader, length) {
      return this.setup().decode(reader, length);
    };
    Type.prototype.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof Reader))
        reader = Reader.create(reader);
      return this.decode(reader, reader.uint32());
    };
    Type.prototype.verify = function verify_setup(message) {
      return this.setup().verify(message);
    };
    Type.prototype.fromObject = function fromObject(object) {
      return this.setup().fromObject(object);
    };
    Type.prototype.toObject = function toObject(message, options) {
      return this.setup().toObject(message, options);
    };
    Type.d = function decorateType(typeName) {
      return function typeDecorator(target) {
        util.decorateType(target, typeName);
      };
    };
  }
});

// node_modules/protobufjs/src/root.js
var require_root = __commonJS({
  "node_modules/protobufjs/src/root.js"(exports2, module2) {
    "use strict";
    module2.exports = Root;
    var Namespace = require_namespace();
    ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
    var Field = require_field();
    var Enum = require_enum2();
    var OneOf = require_oneof();
    var util = require_util2();
    var Type;
    var parse;
    var common;
    function Root(options) {
      Namespace.call(this, "", options);
      this.deferred = [];
      this.files = [];
    }
    Root.fromJSON = function fromJSON(json, root) {
      if (!root)
        root = new Root();
      if (json.options)
        root.setOptions(json.options);
      return root.addJSON(json.nested);
    };
    Root.prototype.resolvePath = util.path.resolve;
    Root.prototype.fetch = util.fetch;
    function SYNC() {
    }
    Root.prototype.load = function load(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = void 0;
      }
      var self2 = this;
      if (!callback)
        return util.asPromise(load, self2, filename, options);
      var sync = callback === SYNC;
      function finish(err, root) {
        if (!callback)
          return;
        var cb = callback;
        callback = null;
        if (sync)
          throw err;
        cb(err, root);
      }
      function getBundledFileName(filename2) {
        var idx = filename2.lastIndexOf("google/protobuf/");
        if (idx > -1) {
          var altname = filename2.substring(idx);
          if (altname in common)
            return altname;
        }
        return null;
      }
      function process2(filename2, source) {
        try {
          if (util.isString(source) && source.charAt(0) === "{")
            source = JSON.parse(source);
          if (!util.isString(source))
            self2.setOptions(source.options).addJSON(source.nested);
          else {
            parse.filename = filename2;
            var parsed = parse(source, self2, options), resolved2, i2 = 0;
            if (parsed.imports) {
              for (; i2 < parsed.imports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                  fetch2(resolved2);
            }
            if (parsed.weakImports) {
              for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                  fetch2(resolved2, true);
            }
          }
        } catch (err) {
          finish(err);
        }
        if (!sync && !queued)
          finish(null, self2);
      }
      function fetch2(filename2, weak) {
        if (self2.files.indexOf(filename2) > -1)
          return;
        self2.files.push(filename2);
        if (filename2 in common) {
          if (sync)
            process2(filename2, common[filename2]);
          else {
            ++queued;
            setTimeout(function() {
              --queued;
              process2(filename2, common[filename2]);
            });
          }
          return;
        }
        if (sync) {
          var source;
          try {
            source = util.fs.readFileSync(filename2).toString("utf8");
          } catch (err) {
            if (!weak)
              finish(err);
            return;
          }
          process2(filename2, source);
        } else {
          ++queued;
          self2.fetch(filename2, function(err, source2) {
            --queued;
            if (!callback)
              return;
            if (err) {
              if (!weak)
                finish(err);
              else if (!queued)
                finish(null, self2);
              return;
            }
            process2(filename2, source2);
          });
        }
      }
      var queued = 0;
      if (util.isString(filename))
        filename = [filename];
      for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self2.resolvePath("", filename[i]))
          fetch2(resolved);
      if (sync)
        return self2;
      if (!queued)
        finish(null, self2);
      return void 0;
    };
    Root.prototype.loadSync = function loadSync(filename, options) {
      if (!util.isNode)
        throw Error("not supported");
      return this.load(filename, options, SYNC);
    };
    Root.prototype.resolveAll = function resolveAll() {
      if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
          return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
      return Namespace.prototype.resolveAll.call(this);
    };
    var exposeRe = /^[A-Z]/;
    function tryHandleExtension(root, field) {
      var extendedType = field.parent.lookup(field.extend);
      if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
      }
      return false;
    }
    Root.prototype._handleAdd = function _handleAdd(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0 && !object.extensionField) {
          if (!tryHandleExtension(this, object))
            this.deferred.push(object);
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          object.parent[object.name] = object.values;
      } else if (!(object instanceof OneOf)) {
        if (object instanceof Type)
          for (var i = 0; i < this.deferred.length; )
            if (tryHandleExtension(this, this.deferred[i]))
              this.deferred.splice(i, 1);
            else
              ++i;
        for (var j = 0; j < object.nestedArray.length; ++j)
          this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
          object.parent[object.name] = object;
      }
    };
    Root.prototype._handleRemove = function _handleRemove(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0) {
          if (object.extensionField) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
          } else {
            var index = this.deferred.indexOf(object);
            if (index > -1)
              this.deferred.splice(index, 1);
          }
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      } else if (object instanceof Namespace) {
        for (var i = 0; i < object.nestedArray.length; ++i)
          this._handleRemove(object._nestedArray[i]);
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      }
    };
    Root._configure = function(Type_, parse_, common_) {
      Type = Type_;
      parse = parse_;
      common = common_;
    };
  }
});

// node_modules/protobufjs/src/util.js
var require_util2 = __commonJS({
  "node_modules/protobufjs/src/util.js"(exports2, module2) {
    "use strict";
    var util = module2.exports = require_minimal();
    var roots = require_roots();
    var Type;
    var Enum;
    util.codegen = require_codegen2();
    util.fetch = require_fetch2();
    util.path = require_path();
    util.fs = util.inquire("fs");
    util.toArray = function toArray(object) {
      if (object) {
        var keys = Object.keys(object), array = new Array(keys.length), index = 0;
        while (index < keys.length)
          array[index] = object[keys[index++]];
        return array;
      }
      return [];
    };
    util.toObject = function toObject(array) {
      var object = {}, index = 0;
      while (index < array.length) {
        var key = array[index++], val = array[index++];
        if (val !== void 0)
          object[key] = val;
      }
      return object;
    };
    var safePropBackslashRe = /\\/g;
    var safePropQuoteRe = /"/g;
    util.isReserved = function isReserved(name) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
    };
    util.safeProp = function safeProp(prop) {
      if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
        return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
      return "." + prop;
    };
    util.ucFirst = function ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };
    var camelCaseRe = /_([a-z])/g;
    util.camelCase = function camelCase(str) {
      return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
        return $1.toUpperCase();
      });
    };
    util.compareFieldsById = function compareFieldsById(a, b) {
      return a.id - b.id;
    };
    util.decorateType = function decorateType(ctor, typeName) {
      if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
          util.decorateRoot.remove(ctor.$type);
          ctor.$type.name = typeName;
          util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
      }
      if (!Type)
        Type = require_type();
      var type = new Type(typeName || ctor.name);
      util.decorateRoot.add(type);
      type.ctor = ctor;
      Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
      Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
      return type;
    };
    var decorateEnumIndex = 0;
    util.decorateEnum = function decorateEnum(object) {
      if (object.$type)
        return object.$type;
      if (!Enum)
        Enum = require_enum2();
      var enm = new Enum("Enum" + decorateEnumIndex++, object);
      util.decorateRoot.add(enm);
      Object.defineProperty(object, "$type", { value: enm, enumerable: false });
      return enm;
    };
    util.setProperty = function setProperty(dst, path, value) {
      function setProp(dst2, path2, value2) {
        var part = path2.shift();
        if (part === "__proto__") {
          return dst2;
        }
        if (path2.length > 0) {
          dst2[part] = setProp(dst2[part] || {}, path2, value2);
        } else {
          var prevValue = dst2[part];
          if (prevValue)
            value2 = [].concat(prevValue).concat(value2);
          dst2[part] = value2;
        }
        return dst2;
      }
      if (typeof dst !== "object")
        throw TypeError("dst must be an object");
      if (!path)
        throw TypeError("path must be specified");
      path = path.split(".");
      return setProp(dst, path, value);
    };
    Object.defineProperty(util, "decorateRoot", {
      get: function() {
        return roots["decorated"] || (roots["decorated"] = new (require_root())());
      }
    });
  }
});

// node_modules/protobufjs/src/object.js
var require_object = __commonJS({
  "node_modules/protobufjs/src/object.js"(exports2, module2) {
    "use strict";
    module2.exports = ReflectionObject;
    ReflectionObject.className = "ReflectionObject";
    var util = require_util2();
    var Root;
    function ReflectionObject(name, options) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      if (options && !util.isObject(options))
        throw TypeError("options must be an object");
      this.options = options;
      this.parsedOptions = null;
      this.name = name;
      this.parent = null;
      this.resolved = false;
      this.comment = null;
      this.filename = null;
    }
    Object.defineProperties(ReflectionObject.prototype, {
      root: {
        get: function() {
          var ptr = this;
          while (ptr.parent !== null)
            ptr = ptr.parent;
          return ptr;
        }
      },
      fullName: {
        get: function() {
          var path = [this.name], ptr = this.parent;
          while (ptr) {
            path.unshift(ptr.name);
            ptr = ptr.parent;
          }
          return path.join(".");
        }
      }
    });
    ReflectionObject.prototype.toJSON = function toJSON() {
      throw Error();
    };
    ReflectionObject.prototype.onAdd = function onAdd(parent) {
      if (this.parent && this.parent !== parent)
        this.parent.remove(this);
      this.parent = parent;
      this.resolved = false;
      var root = parent.root;
      if (root instanceof Root)
        root._handleAdd(this);
    };
    ReflectionObject.prototype.onRemove = function onRemove(parent) {
      var root = parent.root;
      if (root instanceof Root)
        root._handleRemove(this);
      this.parent = null;
      this.resolved = false;
    };
    ReflectionObject.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (this.root instanceof Root)
        this.resolved = true;
      return this;
    };
    ReflectionObject.prototype.getOption = function getOption(name) {
      if (this.options)
        return this.options[name];
      return void 0;
    };
    ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (!ifNotSet || !this.options || this.options[name] === void 0)
        (this.options || (this.options = {}))[name] = value;
      return this;
    };
    ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
      if (!this.parsedOptions) {
        this.parsedOptions = [];
      }
      var parsedOptions = this.parsedOptions;
      if (propName) {
        var opt = parsedOptions.find(function(opt2) {
          return Object.prototype.hasOwnProperty.call(opt2, name);
        });
        if (opt) {
          var newValue = opt[name];
          util.setProperty(newValue, propName, value);
        } else {
          opt = {};
          opt[name] = util.setProperty({}, propName, value);
          parsedOptions.push(opt);
        }
      } else {
        var newOpt = {};
        newOpt[name] = value;
        parsedOptions.push(newOpt);
      }
      return this;
    };
    ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
      if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
          this.setOption(keys[i], options[keys[i]], ifNotSet);
      return this;
    };
    ReflectionObject.prototype.toString = function toString2() {
      var className = this.constructor.className, fullName = this.fullName;
      if (fullName.length)
        return className + " " + fullName;
      return className;
    };
    ReflectionObject._configure = function(Root_) {
      Root = Root_;
    };
  }
});

// node_modules/protobufjs/src/enum.js
var require_enum2 = __commonJS({
  "node_modules/protobufjs/src/enum.js"(exports2, module2) {
    "use strict";
    module2.exports = Enum;
    var ReflectionObject = require_object();
    ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
    var Namespace = require_namespace();
    var util = require_util2();
    function Enum(name, values, options, comment, comments) {
      ReflectionObject.call(this, name, options);
      if (values && typeof values !== "object")
        throw TypeError("values must be an object");
      this.valuesById = {};
      this.values = Object.create(this.valuesById);
      this.comment = comment;
      this.comments = comments || {};
      this.reserved = void 0;
      if (values) {
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
          if (typeof values[keys[i]] === "number")
            this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
      }
    }
    Enum.fromJSON = function fromJSON(name, json) {
      var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
      enm.reserved = json.reserved;
      return enm;
    };
    Enum.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "values",
        this.values,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "comment",
        keepComments ? this.comment : void 0,
        "comments",
        keepComments ? this.comments : void 0
      ]);
    };
    Enum.prototype.add = function add(name, id, comment) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      if (!util.isInteger(id))
        throw TypeError("id must be an integer");
      if (this.values[name] !== void 0)
        throw Error("duplicate name '" + name + "' in " + this);
      if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);
      if (this.isReservedName(name))
        throw Error("name '" + name + "' is reserved in " + this);
      if (this.valuesById[id] !== void 0) {
        if (!(this.options && this.options.allow_alias))
          throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
      } else
        this.valuesById[this.values[name] = id] = name;
      this.comments[name] = comment || null;
      return this;
    };
    Enum.prototype.remove = function remove(name) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      var val = this.values[name];
      if (val == null)
        throw Error("name '" + name + "' does not exist in " + this);
      delete this.valuesById[val];
      delete this.values[name];
      delete this.comments[name];
      return this;
    };
    Enum.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Enum.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
  }
});

// node_modules/protobufjs/src/encoder.js
var require_encoder = __commonJS({
  "node_modules/protobufjs/src/encoder.js"(exports2, module2) {
    "use strict";
    module2.exports = encoder;
    var Enum = require_enum2();
    var types = require_types3();
    var util = require_util2();
    function genTypePartial(gen, field, fieldIndex, ref) {
      return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
    }
    function encoder(mtype) {
      var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
      var i, ref;
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
        ref = "m" + util.safeProp(field.name);
        if (field.map) {
          gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
          if (wireType === void 0)
            gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);
          else
            gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
          gen("}")("}");
        } else if (field.repeated) {
          gen("if(%s!=null&&%s.length){", ref, ref);
          if (field.packed && types.packed[type] !== void 0) {
            gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
          } else {
            gen("for(var i=0;i<%s.length;++i)", ref);
            if (wireType === void 0)
              genTypePartial(gen, field, index, ref + "[i]");
            else
              gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
          }
          gen("}");
        } else {
          if (field.optional)
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
          if (wireType === void 0)
            genTypePartial(gen, field, index, ref);
          else
            gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
        }
      }
      return gen("return w");
    }
  }
});

// node_modules/protobufjs/src/index-light.js
var require_index_light = __commonJS({
  "node_modules/protobufjs/src/index-light.js"(exports2, module2) {
    "use strict";
    var protobuf = module2.exports = require_index_minimal();
    protobuf.build = "light";
    function load(filename, root, callback) {
      if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
      } else if (!root)
        root = new protobuf.Root();
      return root.load(filename, callback);
    }
    protobuf.load = load;
    function loadSync(filename, root) {
      if (!root)
        root = new protobuf.Root();
      return root.loadSync(filename);
    }
    protobuf.loadSync = loadSync;
    protobuf.encoder = require_encoder();
    protobuf.decoder = require_decoder();
    protobuf.verifier = require_verifier();
    protobuf.converter = require_converter();
    protobuf.ReflectionObject = require_object();
    protobuf.Namespace = require_namespace();
    protobuf.Root = require_root();
    protobuf.Enum = require_enum2();
    protobuf.Type = require_type();
    protobuf.Field = require_field();
    protobuf.OneOf = require_oneof();
    protobuf.MapField = require_mapfield();
    protobuf.Service = require_service2();
    protobuf.Method = require_method();
    protobuf.Message = require_message();
    protobuf.wrappers = require_wrappers();
    protobuf.types = require_types3();
    protobuf.util = require_util2();
    protobuf.ReflectionObject._configure(protobuf.Root);
    protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
    protobuf.Root._configure(protobuf.Type);
    protobuf.Field._configure(protobuf.Type);
  }
});

// node_modules/protobufjs/src/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/protobufjs/src/tokenize.js"(exports2, module2) {
    "use strict";
    module2.exports = tokenize;
    var delimRe = /[\s{}=;:[\],'"()<>]/g;
    var stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
    var stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    var setCommentRe = /^ *[*/]+ */;
    var setCommentAltRe = /^\s*\*?\/*/;
    var setCommentSplitRe = /\n/g;
    var whitespaceRe = /\s/;
    var unescapeRe = /\\(.?)/g;
    var unescapeMap = {
      "0": "\0",
      "r": "\r",
      "n": "\n",
      "t": "	"
    };
    function unescape(str) {
      return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
          case "\\":
          case "":
            return $1;
          default:
            return unescapeMap[$1] || "";
        }
      });
    }
    tokenize.unescape = unescape;
    function tokenize(source, alternateCommentMode) {
      source = source.toString();
      var offset = 0, length = source.length, line = 1, commentType = null, commentText = null, commentLine = 0, commentLineEmpty = false, commentIsLeading = false;
      var stack = [];
      var stringDelim = null;
      function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
      }
      function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
          throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
      }
      function charAt(pos) {
        return source.charAt(pos);
      }
      function setComment(start, end, isLeading) {
        commentType = source.charAt(start++);
        commentLine = line;
        commentLineEmpty = false;
        commentIsLeading = isLeading;
        var lookback;
        if (alternateCommentMode) {
          lookback = 2;
        } else {
          lookback = 3;
        }
        var commentOffset = start - lookback, c;
        do {
          if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
            commentLineEmpty = true;
            break;
          }
        } while (c === " " || c === "	");
        var lines = source.substring(start, end).split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
          lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
        commentText = lines.join("\n").trim();
      }
      function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);
        var lineText = source.substring(startOffset, endOffset);
        var isComment = /^\s*\/{1,2}/.test(lineText);
        return isComment;
      }
      function findEndOfLine(cursor) {
        var endOffset = cursor;
        while (endOffset < length && charAt(endOffset) !== "\n") {
          endOffset++;
        }
        return endOffset;
      }
      function next() {
        if (stack.length > 0)
          return stack.shift();
        if (stringDelim)
          return readString();
        var repeat, prev, curr, start, isDoc, isLeadingComment = offset === 0;
        do {
          if (offset === length)
            return null;
          repeat = false;
          while (whitespaceRe.test(curr = charAt(offset))) {
            if (curr === "\n") {
              isLeadingComment = true;
              ++line;
            }
            if (++offset === length)
              return null;
          }
          if (charAt(offset) === "/") {
            if (++offset === length) {
              throw illegal("comment");
            }
            if (charAt(offset) === "/") {
              if (!alternateCommentMode) {
                isDoc = charAt(start = offset + 1) === "/";
                while (charAt(++offset) !== "\n") {
                  if (offset === length) {
                    return null;
                  }
                }
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 1, isLeadingComment);
                }
                ++line;
                repeat = true;
              } else {
                start = offset;
                isDoc = false;
                if (isDoubleSlashCommentLine(offset)) {
                  isDoc = true;
                  do {
                    offset = findEndOfLine(offset);
                    if (offset === length) {
                      break;
                    }
                    offset++;
                  } while (isDoubleSlashCommentLine(offset));
                } else {
                  offset = Math.min(length, findEndOfLine(offset) + 1);
                }
                if (isDoc) {
                  setComment(start, offset, isLeadingComment);
                }
                line++;
                repeat = true;
              }
            } else if ((curr = charAt(offset)) === "*") {
              start = offset + 1;
              isDoc = alternateCommentMode || charAt(start) === "*";
              do {
                if (curr === "\n") {
                  ++line;
                }
                if (++offset === length) {
                  throw illegal("comment");
                }
                prev = curr;
                curr = charAt(offset);
              } while (prev !== "*" || curr !== "/");
              ++offset;
              if (isDoc) {
                setComment(start, offset - 2, isLeadingComment);
              }
              repeat = true;
            } else {
              return "/";
            }
          }
        } while (repeat);
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
          while (end < length && !delimRe.test(charAt(end)))
            ++end;
        var token = source.substring(offset, offset = end);
        if (token === '"' || token === "'")
          stringDelim = token;
        return token;
      }
      function push(token) {
        stack.push(token);
      }
      function peek() {
        if (!stack.length) {
          var token = next();
          if (token === null)
            return null;
          push(token);
        }
        return stack[0];
      }
      function skip(expected, optional) {
        var actual = peek(), equals = actual === expected;
        if (equals) {
          next();
          return true;
        }
        if (!optional)
          throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
      }
      function cmnt(trailingLine) {
        var ret = null;
        if (trailingLine === void 0) {
          if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
            ret = commentIsLeading ? commentText : null;
          }
        } else {
          if (commentLine < trailingLine) {
            peek();
          }
          if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
            ret = commentIsLeading ? null : commentText;
          }
        }
        return ret;
      }
      return Object.defineProperty({
        next,
        peek,
        push,
        skip,
        cmnt
      }, "line", {
        get: function() {
          return line;
        }
      });
    }
  }
});

// node_modules/protobufjs/src/parse.js
var require_parse = __commonJS({
  "node_modules/protobufjs/src/parse.js"(exports2, module2) {
    "use strict";
    module2.exports = parse;
    parse.filename = null;
    parse.defaults = { keepCase: false };
    var tokenize = require_tokenize();
    var Root = require_root();
    var Type = require_type();
    var Field = require_field();
    var MapField = require_mapfield();
    var OneOf = require_oneof();
    var Enum = require_enum2();
    var Service = require_service2();
    var Method = require_method();
    var types = require_types3();
    var util = require_util2();
    var base10Re = /^[1-9][0-9]*$/;
    var base10NegRe = /^-?[1-9][0-9]*$/;
    var base16Re = /^0[x][0-9a-fA-F]+$/;
    var base16NegRe = /^-?0[x][0-9a-fA-F]+$/;
    var base8Re = /^0[0-7]+$/;
    var base8NegRe = /^-?0[0-7]+$/;
    var numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
    var nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
    var typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
    var fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
    function parse(source, root, options) {
      if (!(root instanceof Root)) {
        options = root;
        root = new Root();
      }
      if (!options)
        options = parse.defaults;
      var preferTrailingComment = options.preferTrailingComment || false;
      var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
      var head = true, pkg, imports, weakImports, syntax, isProto3 = false;
      var ptr = root;
      var applyCase = options.keepCase ? function(name) {
        return name;
      } : util.camelCase;
      function illegal(token2, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
          parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
      }
      function readString() {
        var values = [], token2;
        do {
          if ((token2 = next()) !== '"' && token2 !== "'")
            throw illegal(token2);
          values.push(next());
          skip(token2);
          token2 = peek();
        } while (token2 === '"' || token2 === "'");
        return values.join("");
      }
      function readValue(acceptTypeRef) {
        var token2 = next();
        switch (token2) {
          case "'":
          case '"':
            push(token2);
            return readString();
          case "true":
          case "TRUE":
            return true;
          case "false":
          case "FALSE":
            return false;
        }
        try {
          return parseNumber(token2, true);
        } catch (e) {
          if (acceptTypeRef && typeRefRe.test(token2))
            return token2;
          throw illegal(token2, "value");
        }
      }
      function readRanges(target, acceptStrings) {
        var token2, start;
        do {
          if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'"))
            target.push(readString());
          else
            target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
        } while (skip(",", true));
        skip(";");
      }
      function parseNumber(token2, insideTryCatch) {
        var sign = 1;
        if (token2.charAt(0) === "-") {
          sign = -1;
          token2 = token2.substring(1);
        }
        switch (token2) {
          case "inf":
          case "INF":
          case "Inf":
            return sign * Infinity;
          case "nan":
          case "NAN":
          case "Nan":
          case "NaN":
            return NaN;
          case "0":
            return 0;
        }
        if (base10Re.test(token2))
          return sign * parseInt(token2, 10);
        if (base16Re.test(token2))
          return sign * parseInt(token2, 16);
        if (base8Re.test(token2))
          return sign * parseInt(token2, 8);
        if (numberRe.test(token2))
          return sign * parseFloat(token2);
        throw illegal(token2, "number", insideTryCatch);
      }
      function parseId(token2, acceptNegative) {
        switch (token2) {
          case "max":
          case "MAX":
          case "Max":
            return 536870911;
          case "0":
            return 0;
        }
        if (!acceptNegative && token2.charAt(0) === "-")
          throw illegal(token2, "id");
        if (base10NegRe.test(token2))
          return parseInt(token2, 10);
        if (base16NegRe.test(token2))
          return parseInt(token2, 16);
        if (base8NegRe.test(token2))
          return parseInt(token2, 8);
        throw illegal(token2, "id");
      }
      function parsePackage() {
        if (pkg !== void 0)
          throw illegal("package");
        pkg = next();
        if (!typeRefRe.test(pkg))
          throw illegal(pkg, "name");
        ptr = ptr.define(pkg);
        skip(";");
      }
      function parseImport() {
        var token2 = peek();
        var whichImports;
        switch (token2) {
          case "weak":
            whichImports = weakImports || (weakImports = []);
            next();
            break;
          case "public":
            next();
          default:
            whichImports = imports || (imports = []);
            break;
        }
        token2 = readString();
        skip(";");
        whichImports.push(token2);
      }
      function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";
        if (!isProto3 && syntax !== "proto2")
          throw illegal(syntax, "syntax");
        skip(";");
      }
      function parseCommon(parent, token2) {
        switch (token2) {
          case "option":
            parseOption(parent, token2);
            skip(";");
            return true;
          case "message":
            parseType(parent, token2);
            return true;
          case "enum":
            parseEnum(parent, token2);
            return true;
          case "service":
            parseService(parent, token2);
            return true;
          case "extend":
            parseExtension(parent, token2);
            return true;
        }
        return false;
      }
      function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
          if (typeof obj.comment !== "string") {
            obj.comment = cmnt();
          }
          obj.filename = parse.filename;
        }
        if (skip("{", true)) {
          var token2;
          while ((token2 = next()) !== "}")
            fnIf(token2);
          skip(";", true);
        } else {
          if (fnElse)
            fnElse();
          skip(";");
          if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
            obj.comment = cmnt(trailingLine) || obj.comment;
        }
      }
      function parseType(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "type name");
        var type = new Type(token2);
        ifBlock(type, function parseType_block(token3) {
          if (parseCommon(type, token3))
            return;
          switch (token3) {
            case "map":
              parseMapField(type, token3);
              break;
            case "required":
            case "repeated":
              parseField(type, token3);
              break;
            case "optional":
              if (isProto3) {
                parseField(type, "proto3_optional");
              } else {
                parseField(type, "optional");
              }
              break;
            case "oneof":
              parseOneOf(type, token3);
              break;
            case "extensions":
              readRanges(type.extensions || (type.extensions = []));
              break;
            case "reserved":
              readRanges(type.reserved || (type.reserved = []), true);
              break;
            default:
              if (!isProto3 || !typeRefRe.test(token3))
                throw illegal(token3);
              push(token3);
              parseField(type, "optional");
              break;
          }
        });
        parent.add(type);
      }
      function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
          parseGroup(parent, rule);
          return;
        }
        if (!typeRefRe.test(type))
          throw illegal(type, "type");
        var name = next();
        if (!nameRe.test(name))
          throw illegal(name, "name");
        name = applyCase(name);
        skip("=");
        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token2) {
          if (token2 === "option") {
            parseOption(field, token2);
            skip(";");
          } else
            throw illegal(token2);
        }, function parseField_line() {
          parseInlineOptions(field);
        });
        if (rule === "proto3_optional") {
          var oneof = new OneOf("_" + name);
          field.setOption("proto3_optional", true);
          oneof.add(field);
          parent.add(oneof);
        } else {
          parent.add(field);
        }
        if (!isProto3 && field.repeated && (types.packed[type] !== void 0 || types.basic[type] === void 0))
          field.setOption("packed", false, true);
      }
      function parseGroup(parent, rule) {
        var name = next();
        if (!nameRe.test(name))
          throw illegal(name, "name");
        var fieldName = util.lcFirst(name);
        if (name === fieldName)
          name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token2) {
          switch (token2) {
            case "option":
              parseOption(type, token2);
              skip(";");
              break;
            case "required":
            case "repeated":
              parseField(type, token2);
              break;
            case "optional":
              if (isProto3) {
                parseField(type, "proto3_optional");
              } else {
                parseField(type, "optional");
              }
              break;
            default:
              throw illegal(token2);
          }
        });
        parent.add(type).add(field);
      }
      function parseMapField(parent) {
        skip("<");
        var keyType = next();
        if (types.mapKey[keyType] === void 0)
          throw illegal(keyType, "type");
        skip(",");
        var valueType = next();
        if (!typeRefRe.test(valueType))
          throw illegal(valueType, "type");
        skip(">");
        var name = next();
        if (!nameRe.test(name))
          throw illegal(name, "name");
        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token2) {
          if (token2 === "option") {
            parseOption(field, token2);
            skip(";");
          } else
            throw illegal(token2);
        }, function parseMapField_line() {
          parseInlineOptions(field);
        });
        parent.add(field);
      }
      function parseOneOf(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var oneof = new OneOf(applyCase(token2));
        ifBlock(oneof, function parseOneOf_block(token3) {
          if (token3 === "option") {
            parseOption(oneof, token3);
            skip(";");
          } else {
            push(token3);
            parseField(oneof, "optional");
          }
        });
        parent.add(oneof);
      }
      function parseEnum(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var enm = new Enum(token2);
        ifBlock(enm, function parseEnum_block(token3) {
          switch (token3) {
            case "option":
              parseOption(enm, token3);
              skip(";");
              break;
            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;
            default:
              parseEnumValue(enm, token3);
          }
        });
        parent.add(enm);
      }
      function parseEnumValue(parent, token2) {
        if (!nameRe.test(token2))
          throw illegal(token2, "name");
        skip("=");
        var value = parseId(next(), true), dummy = {};
        ifBlock(dummy, function parseEnumValue_block(token3) {
          if (token3 === "option") {
            parseOption(dummy, token3);
            skip(";");
          } else
            throw illegal(token3);
        }, function parseEnumValue_line() {
          parseInlineOptions(dummy);
        });
        parent.add(token2, value, dummy.comment);
      }
      function parseOption(parent, token2) {
        var isCustom = skip("(", true);
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2, "name");
        var name = token2;
        var option = name;
        var propName;
        if (isCustom) {
          skip(")");
          name = "(" + name + ")";
          option = name;
          token2 = peek();
          if (fqTypeRefRe.test(token2)) {
            propName = token2.substr(1);
            name += token2;
            next();
          }
        }
        skip("=");
        var optionValue = parseOptionValue(parent, name);
        setParsedOption(parent, option, optionValue, propName);
      }
      function parseOptionValue(parent, name) {
        if (skip("{", true)) {
          var result = {};
          while (!skip("}", true)) {
            if (!nameRe.test(token = next()))
              throw illegal(token, "name");
            var value;
            var propName = token;
            if (peek() === "{")
              value = parseOptionValue(parent, name + "." + token);
            else {
              skip(":");
              if (peek() === "{")
                value = parseOptionValue(parent, name + "." + token);
              else {
                value = readValue(true);
                setOption(parent, name + "." + token, value);
              }
            }
            var prevValue = result[propName];
            if (prevValue)
              value = [].concat(prevValue).concat(value);
            result[propName] = value;
            skip(",", true);
          }
          return result;
        }
        var simpleValue = readValue(true);
        setOption(parent, name, simpleValue);
        return simpleValue;
      }
      function setOption(parent, name, value) {
        if (parent.setOption)
          parent.setOption(name, value);
      }
      function setParsedOption(parent, name, value, propName) {
        if (parent.setParsedOption)
          parent.setParsedOption(name, value, propName);
      }
      function parseInlineOptions(parent) {
        if (skip("[", true)) {
          do {
            parseOption(parent, "option");
          } while (skip(",", true));
          skip("]");
        }
        return parent;
      }
      function parseService(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "service name");
        var service = new Service(token2);
        ifBlock(service, function parseService_block(token3) {
          if (parseCommon(service, token3))
            return;
          if (token3 === "rpc")
            parseMethod(service, token3);
          else
            throw illegal(token3);
        });
        parent.add(service);
      }
      function parseMethod(parent, token2) {
        var commentText = cmnt();
        var type = token2;
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var name = token2, requestType, requestStream, responseType, responseStream;
        skip("(");
        if (skip("stream", true))
          requestStream = true;
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2);
        requestType = token2;
        skip(")");
        skip("returns");
        skip("(");
        if (skip("stream", true))
          responseStream = true;
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2);
        responseType = token2;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        method.comment = commentText;
        ifBlock(method, function parseMethod_block(token3) {
          if (token3 === "option") {
            parseOption(method, token3);
            skip(";");
          } else
            throw illegal(token3);
        });
        parent.add(method);
      }
      function parseExtension(parent, token2) {
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2, "reference");
        var reference = token2;
        ifBlock(null, function parseExtension_block(token3) {
          switch (token3) {
            case "required":
            case "repeated":
              parseField(parent, token3, reference);
              break;
            case "optional":
              if (isProto3) {
                parseField(parent, "proto3_optional", reference);
              } else {
                parseField(parent, "optional", reference);
              }
              break;
            default:
              if (!isProto3 || !typeRefRe.test(token3))
                throw illegal(token3);
              push(token3);
              parseField(parent, "optional", reference);
              break;
          }
        });
      }
      var token;
      while ((token = next()) !== null) {
        switch (token) {
          case "package":
            if (!head)
              throw illegal(token);
            parsePackage();
            break;
          case "import":
            if (!head)
              throw illegal(token);
            parseImport();
            break;
          case "syntax":
            if (!head)
              throw illegal(token);
            parseSyntax();
            break;
          case "option":
            parseOption(ptr, token);
            skip(";");
            break;
          default:
            if (parseCommon(ptr, token)) {
              head = false;
              continue;
            }
            throw illegal(token);
        }
      }
      parse.filename = null;
      return {
        "package": pkg,
        "imports": imports,
        weakImports,
        syntax,
        root
      };
    }
  }
});

// node_modules/protobufjs/src/common.js
var require_common = __commonJS({
  "node_modules/protobufjs/src/common.js"(exports2, module2) {
    "use strict";
    module2.exports = common;
    var commonRe = /\/|\./;
    function common(name, json) {
      if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
      }
      common[name] = json;
    }
    common("any", {
      Any: {
        fields: {
          type_url: {
            type: "string",
            id: 1
          },
          value: {
            type: "bytes",
            id: 2
          }
        }
      }
    });
    var timeType;
    common("duration", {
      Duration: timeType = {
        fields: {
          seconds: {
            type: "int64",
            id: 1
          },
          nanos: {
            type: "int32",
            id: 2
          }
        }
      }
    });
    common("timestamp", {
      Timestamp: timeType
    });
    common("empty", {
      Empty: {
        fields: {}
      }
    });
    common("struct", {
      Struct: {
        fields: {
          fields: {
            keyType: "string",
            type: "Value",
            id: 1
          }
        }
      },
      Value: {
        oneofs: {
          kind: {
            oneof: [
              "nullValue",
              "numberValue",
              "stringValue",
              "boolValue",
              "structValue",
              "listValue"
            ]
          }
        },
        fields: {
          nullValue: {
            type: "NullValue",
            id: 1
          },
          numberValue: {
            type: "double",
            id: 2
          },
          stringValue: {
            type: "string",
            id: 3
          },
          boolValue: {
            type: "bool",
            id: 4
          },
          structValue: {
            type: "Struct",
            id: 5
          },
          listValue: {
            type: "ListValue",
            id: 6
          }
        }
      },
      NullValue: {
        values: {
          NULL_VALUE: 0
        }
      },
      ListValue: {
        fields: {
          values: {
            rule: "repeated",
            type: "Value",
            id: 1
          }
        }
      }
    });
    common("wrappers", {
      DoubleValue: {
        fields: {
          value: {
            type: "double",
            id: 1
          }
        }
      },
      FloatValue: {
        fields: {
          value: {
            type: "float",
            id: 1
          }
        }
      },
      Int64Value: {
        fields: {
          value: {
            type: "int64",
            id: 1
          }
        }
      },
      UInt64Value: {
        fields: {
          value: {
            type: "uint64",
            id: 1
          }
        }
      },
      Int32Value: {
        fields: {
          value: {
            type: "int32",
            id: 1
          }
        }
      },
      UInt32Value: {
        fields: {
          value: {
            type: "uint32",
            id: 1
          }
        }
      },
      BoolValue: {
        fields: {
          value: {
            type: "bool",
            id: 1
          }
        }
      },
      StringValue: {
        fields: {
          value: {
            type: "string",
            id: 1
          }
        }
      },
      BytesValue: {
        fields: {
          value: {
            type: "bytes",
            id: 1
          }
        }
      }
    });
    common("field_mask", {
      FieldMask: {
        fields: {
          paths: {
            rule: "repeated",
            type: "string",
            id: 1
          }
        }
      }
    });
    common.get = function get(file) {
      return common[file] || null;
    };
  }
});

// node_modules/protobufjs/src/index.js
var require_src = __commonJS({
  "node_modules/protobufjs/src/index.js"(exports2, module2) {
    "use strict";
    var protobuf = module2.exports = require_index_light();
    protobuf.build = "full";
    protobuf.tokenize = require_tokenize();
    protobuf.parse = require_parse();
    protobuf.common = require_common();
    protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
  }
});

// node_modules/protobufjs/index.js
var require_protobufjs = __commonJS({
  "node_modules/protobufjs/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_src();
  }
});

// node_modules/protobufjs/light.js
var require_light = __commonJS({
  "node_modules/protobufjs/light.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_light();
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/ProtoSchema.js
var require_ProtoSchema = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/ProtoSchema.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var protobufjs_1 = __importDefault(require_protobufjs());
    var light_1 = require_light();
    var errors_1 = require_errors();
    var ProtoSchema = class {
      constructor(schema, opts) {
        const parsedMessage = protobufjs_1.default.parse(schema.schema);
        const root = parsedMessage.root;
        this.message = root.lookupType(this.getTypeName(parsedMessage, opts));
      }
      getNestedTypeName(parent) {
        if (!parent)
          throw new errors_1.ConfluentSchemaRegistryArgumentError("no nested fields");
        const keys = Object.keys(parent);
        const reflection = parent[keys[0]];
        if (reflection instanceof light_1.Namespace && !(reflection instanceof light_1.Type) && reflection.nested)
          return this.getNestedTypeName(reflection.nested);
        return keys[0];
      }
      getTypeName(parsedMessage, opts) {
        const root = parsedMessage.root;
        const pkg = parsedMessage.package;
        const name = opts && opts.messageName ? opts.messageName : this.getNestedTypeName(root.nested);
        return `${pkg ? pkg + "." : ""}.${name}`;
      }
      trimStart(buffer) {
        const index = buffer.findIndex((value) => value != 0);
        return buffer.slice(index);
      }
      toBuffer(payload) {
        const paths = [];
        if (!this.isValid(payload, {
          errorHook: (path) => paths.push(path)
        })) {
          throw new errors_1.ConfluentSchemaRegistryValidationError("invalid payload", paths);
        }
        const protoPayload = this.message.create(payload);
        return Buffer.from(this.message.encode(protoPayload).finish());
      }
      fromBuffer(buffer) {
        const newBuffer = this.trimStart(buffer);
        return this.message.decode(newBuffer);
      }
      isValid(payload, opts) {
        const errMsg = this.message.verify(payload);
        if (errMsg) {
          if (opts === null || opts === void 0 ? void 0 : opts.errorHook) {
            opts.errorHook([errMsg], payload);
          }
          return false;
        }
        return true;
      }
    };
    exports2.default = ProtoSchema;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/schemaTypeResolver.js
var require_schemaTypeResolver = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/schemaTypeResolver.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var AvroHelper_1 = __importDefault(require_AvroHelper());
    var JsonHelper_1 = __importDefault(require_JsonHelper());
    var JsonSchema_1 = __importDefault(require_JsonSchema());
    var ProtoHelper_1 = __importDefault(require_ProtoHelper());
    var ProtoSchema_1 = __importDefault(require_ProtoSchema());
    var _types_1 = require_types();
    var errors_1 = require_errors();
    var helperTypeFromSchemaTypeMap = {};
    exports2.schemaTypeFromString = (schemaTypeString) => {
      switch (schemaTypeString) {
        case "AVRO":
        case void 0:
          return _types_1.SchemaType.AVRO;
        case "JSON":
          return _types_1.SchemaType.JSON;
        case "PROTOBUF":
          return _types_1.SchemaType.PROTOBUF;
        default:
          return _types_1.SchemaType.UNKNOWN;
      }
    };
    exports2.helperTypeFromSchemaType = (schemaType = _types_1.SchemaType.AVRO) => {
      const schemaTypeStr = schemaType.toString();
      if (!helperTypeFromSchemaTypeMap[schemaTypeStr]) {
        let helper;
        switch (schemaType) {
          case _types_1.SchemaType.AVRO: {
            helper = new AvroHelper_1.default();
            break;
          }
          case _types_1.SchemaType.JSON: {
            helper = new JsonHelper_1.default();
            break;
          }
          case _types_1.SchemaType.PROTOBUF: {
            helper = new ProtoHelper_1.default();
            break;
          }
          default:
            throw new errors_1.ConfluentSchemaRegistryArgumentError("invalid schemaType");
        }
        helperTypeFromSchemaTypeMap[schemaTypeStr] = helper;
      }
      return helperTypeFromSchemaTypeMap[schemaTypeStr];
    };
    exports2.schemaFromConfluentSchema = (confluentSchema, options) => {
      var _a, _b, _c, _d;
      try {
        let schema;
        switch (confluentSchema.type) {
          case _types_1.SchemaType.AVRO: {
            const opts = ((_a = options) === null || _a === void 0 ? void 0 : _a.forSchemaOptions) || ((_b = options) === null || _b === void 0 ? void 0 : _b[_types_1.SchemaType.AVRO]);
            schema = exports2.helperTypeFromSchemaType(confluentSchema.type).getAvroSchema(confluentSchema, opts);
            break;
          }
          case _types_1.SchemaType.JSON: {
            const opts = (_c = options) === null || _c === void 0 ? void 0 : _c[_types_1.SchemaType.JSON];
            schema = new JsonSchema_1.default(confluentSchema, opts);
            break;
          }
          case _types_1.SchemaType.PROTOBUF: {
            const opts = (_d = options) === null || _d === void 0 ? void 0 : _d[_types_1.SchemaType.PROTOBUF];
            schema = new ProtoSchema_1.default(confluentSchema, opts);
            break;
          }
          default:
            throw new errors_1.ConfluentSchemaRegistryArgumentError("invalid schemaType");
        }
        return schema;
      } catch (err) {
        throw new errors_1.ConfluentSchemaRegistryArgumentError(err.message);
      }
    };
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/SchemaRegistry.js
var require_SchemaRegistry = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/SchemaRegistry.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var wireEncoder_1 = require_wireEncoder();
    var wireDecoder_1 = __importDefault(require_wireDecoder());
    var constants_1 = require_constants();
    var api_1 = __importDefault(require_api());
    var cache_1 = __importDefault(require_cache());
    var errors_1 = require_errors();
    var _types_1 = require_types();
    var schemaTypeResolver_1 = require_schemaTypeResolver();
    var DEFAULT_OPTS = {
      compatibility: constants_1.COMPATIBILITY.BACKWARD,
      separator: constants_1.DEFAULT_SEPERATOR
    };
    var SchemaRegistry2 = class {
      constructor({ auth, clientId, host, retry, agent }, options) {
        this.cacheMissRequests = {};
        this.api = api_1.default({ auth, clientId, host, retry, agent });
        this.cache = new cache_1.default();
        this.options = options;
      }
      isConfluentSchema(schema) {
        return schema.schema != null;
      }
      getConfluentSchema(schema) {
        let confluentSchema;
        if (!this.isConfluentSchema(schema)) {
          confluentSchema = {
            type: _types_1.SchemaType.AVRO,
            schema: JSON.stringify(schema)
          };
        } else {
          confluentSchema = schema;
        }
        return confluentSchema;
      }
      async register(schema, userOpts) {
        const { compatibility, separator } = __spreadValues(__spreadValues({}, DEFAULT_OPTS), userOpts);
        const confluentSchema = this.getConfluentSchema(schema);
        const helper = schemaTypeResolver_1.helperTypeFromSchemaType(confluentSchema.type);
        const schemaInstance = schemaTypeResolver_1.schemaFromConfluentSchema(confluentSchema, this.options);
        helper.validate(schemaInstance);
        let subject;
        if (userOpts === null || userOpts === void 0 ? void 0 : userOpts.subject) {
          subject = {
            name: userOpts.subject
          };
        } else {
          subject = helper.getSubject(confluentSchema, schemaInstance, separator);
        }
        try {
          const response2 = await this.api.Subject.config({ subject: subject.name });
          const { compatibilityLevel } = response2.data();
          if (compatibilityLevel.toUpperCase() !== compatibility) {
            throw new errors_1.ConfluentSchemaRegistryCompatibilityError(`Compatibility does not match the configuration (${compatibility} != ${compatibilityLevel.toUpperCase()})`);
          }
        } catch (error) {
          if (error.status !== 404) {
            throw error;
          }
          if (compatibility) {
            await this.api.Subject.updateConfig({ subject: subject.name, body: { compatibility } });
          }
        }
        const response = await this.api.Subject.register({
          subject: subject.name,
          body: {
            schemaType: confluentSchema.type === _types_1.SchemaType.AVRO ? void 0 : confluentSchema.type,
            schema: confluentSchema.schema
          }
        });
        const registeredSchema = response.data();
        this.cache.setLatestRegistryId(subject.name, registeredSchema.id);
        this.cache.setSchema(registeredSchema.id, confluentSchema.type, schemaInstance);
        return registeredSchema;
      }
      async _getSchema(registryId) {
        const cacheEntry = this.cache.getSchema(registryId);
        if (cacheEntry) {
          return cacheEntry;
        }
        const response = await this.getSchemaOriginRequest(registryId);
        const foundSchema = response.data();
        const rawSchema = foundSchema.schema;
        const schemaType = schemaTypeResolver_1.schemaTypeFromString(foundSchema.schemaType);
        if (schemaType === _types_1.SchemaType.UNKNOWN) {
          throw new errors_1.ConfluentSchemaRegistryError(`Unknown schema type ${foundSchema.schemaType}`);
        }
        const confluentSchema = {
          type: schemaType,
          schema: rawSchema
        };
        const schemaInstance = schemaTypeResolver_1.schemaFromConfluentSchema(confluentSchema, this.options);
        return this.cache.setSchema(registryId, schemaType, schemaInstance);
      }
      async getSchema(registryId) {
        return await (await this._getSchema(registryId)).schema;
      }
      async encode(registryId, payload) {
        if (!registryId) {
          throw new errors_1.ConfluentSchemaRegistryArgumentError(`Invalid registryId: ${JSON.stringify(registryId)}`);
        }
        const { schema } = await this._getSchema(registryId);
        try {
          const serializedPayload = schema.toBuffer(payload);
          return wireEncoder_1.encode(registryId, serializedPayload);
        } catch (error) {
          if (error instanceof errors_1.ConfluentSchemaRegistryValidationError)
            throw error;
          const paths = this.collectInvalidPaths(schema, payload);
          throw new errors_1.ConfluentSchemaRegistryValidationError(error, paths);
        }
      }
      collectInvalidPaths(schema, jsonPayload) {
        const paths = [];
        schema.isValid(jsonPayload, {
          errorHook: (path) => paths.push(path)
        });
        return paths;
      }
      async decode(buffer, options) {
        var _a;
        if (!Buffer.isBuffer(buffer)) {
          throw new errors_1.ConfluentSchemaRegistryArgumentError("Invalid buffer");
        }
        const { magicByte, registryId, payload } = wireDecoder_1.default(buffer);
        if (Buffer.compare(wireEncoder_1.MAGIC_BYTE, magicByte) !== 0) {
          throw new errors_1.ConfluentSchemaRegistryArgumentError(`Message encoded with magic byte ${JSON.stringify(magicByte)}, expected ${JSON.stringify(wireEncoder_1.MAGIC_BYTE)}`);
        }
        const { type, schema: writerSchema } = await this._getSchema(registryId);
        let rawReaderSchema;
        switch (type) {
          case _types_1.SchemaType.AVRO:
            rawReaderSchema = (_a = options === null || options === void 0 ? void 0 : options[_types_1.SchemaType.AVRO]) === null || _a === void 0 ? void 0 : _a.readerSchema;
        }
        if (rawReaderSchema) {
          const readerSchema = schemaTypeResolver_1.schemaFromConfluentSchema({ type: _types_1.SchemaType.AVRO, schema: rawReaderSchema }, this.options);
          if (readerSchema.equals(writerSchema)) {
            return readerSchema.fromBuffer(payload);
          } else {
            return readerSchema.fromBuffer(payload, readerSchema.createResolver(writerSchema));
          }
        }
        return writerSchema.fromBuffer(payload);
      }
      async getRegistryId(subject, version) {
        const response = await this.api.Subject.version({ subject, version });
        const { id } = response.data();
        return id;
      }
      async getRegistryIdBySchema(subject, schema) {
        try {
          const confluentSchema = this.getConfluentSchema(schema);
          const response = await this.api.Subject.registered({
            subject,
            body: {
              schemaType: confluentSchema.type === _types_1.SchemaType.AVRO ? void 0 : confluentSchema.type,
              schema: confluentSchema.schema
            }
          });
          const { id } = response.data();
          return id;
        } catch (error) {
          if (error.status && error.status === 404) {
            throw new errors_1.ConfluentSchemaRegistryError(error);
          }
          throw error;
        }
      }
      async getLatestSchemaId(subject) {
        const response = await this.api.Subject.latestVersion({ subject });
        const { id } = response.data();
        return id;
      }
      getSchemaOriginRequest(registryId) {
        if (this.cacheMissRequests[registryId]) {
          return this.cacheMissRequests[registryId];
        } else {
          const request = this.api.Schema.find({ id: registryId }).finally(() => {
            delete this.cacheMissRequests[registryId];
          });
          this.cacheMissRequests[registryId] = request;
          return request;
        }
      }
    };
    exports2.default = SchemaRegistry2;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/utils/avdlToAVSC.js
var require_avdlToAVSC = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/utils/avdlToAVSC.js"(exports2) {
    "use strict";
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (Object.hasOwnProperty.call(mod2, k))
            result[k] = mod2[k];
      }
      result["default"] = mod2;
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs2 = __importStar(require("fs"));
    var avsc_1 = require_lib2();
    var errors_1 = require_errors();
    var cache;
    var merge = Object.assign;
    var isObject2 = (obj) => obj && typeof obj === "object";
    var isIterable = (obj) => isObject2(obj) && typeof obj.map !== "undefined";
    var isFieldArray = (field) => isObject2(field) && isObject2(field.type) && field.type.type === "array";
    var combine = (rootType, types) => {
      if (!rootType.fields) {
        return rootType;
      }
      const find = (name) => {
        if (typeof name === "string") {
          name = name.toLowerCase();
        }
        const typeToCombine = types.find((t) => {
          const names = [];
          if (t.namespace) {
            names.push(`${t.namespace}.`);
          }
          names.push(t.name.toLowerCase());
          return names.join("") === name;
        });
        if (!typeToCombine || cache[typeToCombine.name]) {
          return null;
        }
        cache[typeToCombine.name] = 1;
        return combine(typeToCombine, types);
      };
      const combinedFields = rootType.fields.map((field) => {
        if (isFieldArray(field)) {
          const typeToCombine2 = find(field.type.items);
          return typeToCombine2 ? merge(field, { type: merge(field.type, { items: typeToCombine2 }) }) : field;
        } else if (isIterable(field.type)) {
          const type = field.type.map((unionType) => {
            if (isObject2(unionType)) {
              const typeToCombine2 = find(unionType.items);
              return typeToCombine2 ? merge(unionType, { items: typeToCombine2 }) : unionType;
            } else {
              return find(unionType) || unionType;
            }
          });
          return merge(field, { type });
        }
        const typeToCombine = find(field.type);
        return typeToCombine ? merge(field, { type: typeToCombine }) : field;
      });
      return merge(rootType, { fields: combinedFields });
    };
    function avdlToAVSC(path) {
      cache = {};
      const protocol = avsc_1.readProtocol(fs2.readFileSync(path, "utf8"));
      return merge({ namespace: protocol.namespace }, combine(protocol.types.pop(), protocol.types));
    }
    exports2.avdlToAVSC = avdlToAVSC;
    async function avdlToAVSCAsync(path) {
      cache = {};
      const protocol = await new Promise((resolve, reject) => {
        avsc_1.assembleProtocol(path, (err, schema) => {
          if (err) {
            reject(new errors_1.ConfluentSchemaRegistryError(`${err.message}. Caused by: ${err.path}`));
          } else {
            resolve(schema);
          }
        });
      });
      return merge({ namespace: protocol.namespace }, combine(protocol.types.pop(), protocol.types));
    }
    exports2.avdlToAVSCAsync = avdlToAVSCAsync;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/utils/readAVSC.js
var require_readAVSC = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/utils/readAVSC.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = __importDefault(require("fs"));
    var util_1 = require("util");
    var errors_1 = require_errors();
    var readFileAsync = util_1.promisify(fs_1.default.readFile);
    var ENCODING = "utf-8";
    function isValidSchema(rawSchema) {
      return "name" in rawSchema && "type" in rawSchema && rawSchema.type === "record" && "fields" in rawSchema;
    }
    function validatedSchema(path, rawSchema) {
      if (!isValidSchema(rawSchema)) {
        throw new errors_1.ConfluentSchemaRegistryInvalidSchemaError(`${path} is not recognized as a valid AVSC file (expecting valid top-level name, type and fields attributes)`);
      }
      return rawSchema;
    }
    function readAVSC(path) {
      const rawSchema = JSON.parse(fs_1.default.readFileSync(path, ENCODING));
      return validatedSchema(path, rawSchema);
    }
    exports2.readAVSC = readAVSC;
    async function readAVSCAsync(path) {
      const rawSchema = JSON.parse(await readFileAsync(path, ENCODING));
      return validatedSchema(path, rawSchema);
    }
    exports2.readAVSCAsync = readAVSCAsync;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/utils/index.js
var require_utils4 = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/utils/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var avdlToAVSC_1 = require_avdlToAVSC();
    exports2.avdlToAVSC = avdlToAVSC_1.avdlToAVSC;
    exports2.avdlToAVSCAsync = avdlToAVSC_1.avdlToAVSCAsync;
    var readAVSC_1 = require_readAVSC();
    exports2.readAVSC = readAVSC_1.readAVSC;
    exports2.readAVSCAsync = readAVSC_1.readAVSCAsync;
  }
});

// node_modules/@kafkajs/confluent-schema-registry/dist/index.js
var require_dist = __commonJS({
  "node_modules/@kafkajs/confluent-schema-registry/dist/index.js"(exports2) {
    "use strict";
    function __export(m) {
      for (var p in m)
        if (!exports2.hasOwnProperty(p))
          exports2[p] = m[p];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    var SchemaRegistry_1 = require_SchemaRegistry();
    exports2.SchemaRegistry = SchemaRegistry_1.default;
    __export(require_utils4());
    var _types_1 = require_types();
    exports2.SchemaType = _types_1.SchemaType;
    var constants_1 = require_constants();
    exports2.COMPATIBILITY = constants_1.COMPATIBILITY;
  }
});

// index.js
var core = require_core();
var { SchemaRegistry, SchemaType } = require_dist();
var { fs } = require("fs")(async () => {
  try {
    const SCHEMA_REGISTRY_URL = core.getInput("SCHEMA_REGISTRY_URL");
    const KAFKA_USERNAME = core.getInput("KAFKA_USERNAME");
    const KAFKA_PASSWORD = core.getInput("KAFKA_PASSWORD");
    const TOPIC = core.getInput("TOPIC");
    const VALUE_SCHEMA_PATH = core.getInput("VALUE_SCHEMA_PATH");
    const KEY_SCHEMA_PATH = core.getInput("KEY_SCHEMA_PATH");
    const valueSchema = await fs.readFile(VALUE_SCHEMA_PATH, "utf-8");
    const keySchema = await fs.readFile(KEY_SCHEMA_PATH, "utf-8");
    const registry = new SchemaRegistry({
      host: SCHEMA_REGISTRY_URL,
      auth: {
        username: KAFKA_USERNAME,
        password: KAFKA_PASSWORD
      }
    });
    const { valueSchemaId } = await registry.register({
      type: SchemaType.AVRO,
      schema: valueSchema
    }, { subject: `${TOPIC}-value` });
    const { keySchemaId } = await registry.register({
      type: SchemaType.AVRO,
      schema: keySchema
    }, { subject: `${TOPIC}-key` });
    core.setOutput("VALUE_SCHEMA_ID", valueSchemaId);
    core.setOutput("KEY_SCHEMA_ID", keySchemaId);
  } catch (e) {
    core.setFailed(e.message);
  }
})();
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
