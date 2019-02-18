/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "94482010e78e9a09249d";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/CarriersSelect/style.scss":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/sass-loader/lib/loader.js!./src/components/CarriersSelect/style.scss ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".carriers-select {\n  width: 100%;\n  height: 40px;\n  font-size: 20px;\n  background: #fff;\n  padding: 0 10px;\n  cursor: pointer;\n  margin-bottom: 40px;\n  min-width: 270px;\n  border: 0;\n  position: sticky;\n  top: 0; }\n\n@media screen and (max-width: 590px) {\n  .carriers-select {\n    width: 270px; } }\n", "", {"version":3,"sources":["/Users/vasiliizolotukhin/WebstormProjects/OneTwoTripWidget/flight-widget/src/components/CarriersSelect/style.scss"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,iBAAiB;EACjB,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;EACpB,iBAAiB;EACjB,UAAU;EACV,iBAAiB;EACjB,OAAO,EAAE;;AAEX;EACE;IACE,aAAa,EAAE,EAAE","file":"style.scss","sourcesContent":[".carriers-select {\n  width: 100%;\n  height: 40px;\n  font-size: 20px;\n  background: #fff;\n  padding: 0 10px;\n  cursor: pointer;\n  margin-bottom: 40px;\n  min-width: 270px;\n  border: 0;\n  position: sticky;\n  top: 0; }\n\n@media screen and (max-width: 590px) {\n  .carriers-select {\n    width: 270px; } }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCard/style.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCard/style.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".card {\n  padding: 20px;\n  margin-bottom: 20px;\n  min-width: 270px;\n  background: #1d1d1d;\n  color: #7c7c7c; }\n  .card .direction {\n    display: flex;\n    margin-bottom: 20px; }\n    .card .direction .from, .card .direction .to {\n      flex-grow: 1;\n      font-size: 14px; }\n    .card .direction .city {\n      color: #fff;\n      font-size: 24px;\n      margin-top: 5px; }\n  .card .time-block {\n    margin-bottom: 20px; }\n    .card .time-block .departure {\n      margin-bottom: 10px; }\n    .card .time-block .title {\n      margin-bottom: 5px; }\n    .card .time-block .time {\n      color: #fff;\n      font-size: 18px; }\n  .card .carrier-name {\n    font-size: 24px; }\n", "", {"version":3,"sources":["/Users/vasiliizolotukhin/WebstormProjects/OneTwoTripWidget/flight-widget/src/components/FlightsCard/style.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;EACpB,eAAe,EAAE;EACjB;IACE,cAAc;IACd,oBAAoB,EAAE;IACtB;MACE,aAAa;MACb,gBAAgB,EAAE;IACpB;MACE,YAAY;MACZ,gBAAgB;MAChB,gBAAgB,EAAE;EACtB;IACE,oBAAoB,EAAE;IACtB;MACE,oBAAoB,EAAE;IACxB;MACE,mBAAmB,EAAE;IACvB;MACE,YAAY;MACZ,gBAAgB,EAAE;EACtB;IACE,gBAAgB,EAAE","file":"style.scss","sourcesContent":[".card {\n  padding: 20px;\n  margin-bottom: 20px;\n  min-width: 270px;\n  background: #1d1d1d;\n  color: #7c7c7c; }\n  .card .direction {\n    display: flex;\n    margin-bottom: 20px; }\n    .card .direction .from, .card .direction .to {\n      flex-grow: 1;\n      font-size: 14px; }\n    .card .direction .city {\n      color: #fff;\n      font-size: 24px;\n      margin-top: 5px; }\n  .card .time-block {\n    margin-bottom: 20px; }\n    .card .time-block .departure {\n      margin-bottom: 10px; }\n    .card .time-block .title {\n      margin-bottom: 5px; }\n    .card .time-block .time {\n      color: #fff;\n      font-size: 18px; }\n  .card .carrier-name {\n    font-size: 24px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCards/style.scss":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCards/style.scss ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".cards {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between; }\n\n@media screen and (max-width: 590px) {\n  .cards {\n    justify-content: center; } }\n", "", {"version":3,"sources":["/Users/vasiliizolotukhin/WebstormProjects/OneTwoTripWidget/flight-widget/src/components/FlightsCards/style.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,gBAAgB;EAChB,+BAA+B,EAAE;;AAEnC;EACE;IACE,wBAAwB,EAAE,EAAE","file":"style.scss","sourcesContent":[".cards {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between; }\n\n@media screen and (max-width: 590px) {\n  .cards {\n    justify-content: center; } }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/FlightsWidget/style.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/sass-loader/lib/loader.js!./src/containers/FlightsWidget/style.scss ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".flights-widget {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 0 20px;\n  min-width: 300px;\n  color: #fff; }\n", "", {"version":3,"sources":["/Users/vasiliizolotukhin/WebstormProjects/OneTwoTripWidget/flight-widget/src/containers/FlightsWidget/style.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,uBAAuB;EACvB,oBAAoB;EACpB,iBAAiB;EACjB,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,YAAY,EAAE","file":"style.scss","sourcesContent":[".flights-widget {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 0 20px;\n  min-width: 300px;\n  color: #fff; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/styles/theme.scss":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/sass-loader/lib/loader.js!./src/styles/theme.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "* {\n  outline: none;\n  box-sizing: border-box; }\n\nhtml, body {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background: #3A3A3A; }\n\nbody {\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }\n\n#app {\n  min-height: 100%;\n  min-width: 100%;\n  padding-top: 50px; }\n", "", {"version":3,"sources":["/Users/vasiliizolotukhin/WebstormProjects/OneTwoTripWidget/flight-widget/src/styles/theme.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,uBAAuB,EAAE;;AAE3B;EACE,aAAa;EACb,YAAY;EACZ,UAAU;EACV,WAAW;EACX,oBAAoB,EAAE;;AAExB;EACE,4DAA4D,EAAE;;AAEhE;EACE,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB,EAAE","file":"theme.scss","sourcesContent":["* {\n  outline: none;\n  box-sizing: border-box; }\n\nhtml, body {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background: #3A3A3A; }\n\nbody {\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }\n\n#app {\n  min-height: 100%;\n  min-width: 100%;\n  padding-top: 50px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _FlightsWidget = __webpack_require__(/*! containers/FlightsWidget/FlightsWidget */ "./src/containers/FlightsWidget/FlightsWidget.jsx");

var _FlightsWidget2 = _interopRequireDefault(_FlightsWidget);

var _configureStore = __webpack_require__(/*! store/configureStore */ "./src/store/configureStore.jsx");

var _configureStore2 = _interopRequireDefault(_configureStore);

__webpack_require__(/*! styles/theme.scss */ "./src/styles/theme.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: _configureStore2.default },
        _react2.default.createElement(_FlightsWidget2.default, null)
    );
};

exports.default = App;

/***/ }),

/***/ "./src/components/CarriersSelect/CarriersSelect.jsx":
/*!**********************************************************!*\
  !*** ./src/components/CarriersSelect/CarriersSelect.jsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/CarriersSelect/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CarriersSelect(_ref) {
    var carriers = _ref.carriers,
        selectCarrier = _ref.selectCarrier;

    var options = carriers.map(function (carrier, index) {
        return _react2.default.createElement(
            'option',
            { value: carrier, key: index },
            carrier
        );
    });

    return _react2.default.createElement(
        'select',
        { className: 'carriers-select', onChange: selectCarrier },
        _react2.default.createElement(
            'option',
            { value: 'all' },
            'All carriers'
        ),
        options
    );
}

CarriersSelect.propTypes = {
    carriers: _propTypes2.default.array,
    selectCarrier: _propTypes2.default.func
};

exports.default = CarriersSelect;

/***/ }),

/***/ "./src/components/CarriersSelect/style.scss":
/*!**************************************************!*\
  !*** ./src/components/CarriersSelect/style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/CarriersSelect/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/CarriersSelect/style.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/CarriersSelect/style.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/FlightsCard/FlightsCard.jsx":
/*!****************************************************!*\
  !*** ./src/components/FlightsCard/FlightsCard.jsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/FlightsCard/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlightsCard(_ref) {
    var flight = _ref.flight;

    return _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
            'div',
            { className: 'direction' },
            _react2.default.createElement(
                'div',
                { className: 'from' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    'From'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'city' },
                    flight.direction.from
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'to' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    'To'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'city' },
                    flight.direction.to
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'time-block' },
            _react2.default.createElement(
                'div',
                { className: 'departure' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    'Departure'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'time' },
                    formatDate(new Date(flight.departure))
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'arrival' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    'Arrival'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'time' },
                    formatDate(new Date(flight.arrival))
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'carrier-name' },
            flight.carrier
        )
    );
}

//Helpers
function formatDate(date) {
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var month = date.getMonth() + 1;

    month = month < 10 && "0" + month;

    return day + '.' + month + '.' + year + ', ' + hours + ':' + minutes;
}

FlightsCard.propTypes = {
    flight: _propTypes2.default.object
};

exports.default = FlightsCard;

/***/ }),

/***/ "./src/components/FlightsCard/style.scss":
/*!***********************************************!*\
  !*** ./src/components/FlightsCard/style.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCard/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCard/style.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCard/style.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/FlightsCards/FlightsCards.jsx":
/*!******************************************************!*\
  !*** ./src/components/FlightsCards/FlightsCards.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _FlightsCard = __webpack_require__(/*! components/FlightsCard/FlightsCard */ "./src/components/FlightsCard/FlightsCard.jsx");

var _FlightsCard2 = _interopRequireDefault(_FlightsCard);

__webpack_require__(/*! ./style.scss */ "./src/components/FlightsCards/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlightsCards(_ref) {
    var flights = _ref.flights;

    var cards = flights.map(function (flight, index) {
        return _react2.default.createElement(_FlightsCard2.default, { key: index, flight: flight });
    });

    return _react2.default.createElement(
        'div',
        { className: 'cards' },
        cards
    );
}

FlightsCards.propTypes = {
    flights: _propTypes2.default.array
};

exports.default = FlightsCards;

/***/ }),

/***/ "./src/components/FlightsCards/style.scss":
/*!************************************************!*\
  !*** ./src/components/FlightsCards/style.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCards/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCards/style.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/components/FlightsCards/style.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/containers/FlightsWidget/FlightsWidget.jsx":
/*!********************************************************!*\
  !*** ./src/containers/FlightsWidget/FlightsWidget.jsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _widget = __webpack_require__(/*! store/actions/widget */ "./src/store/actions/widget.js");

var _CarriersSelect = __webpack_require__(/*! components/CarriersSelect/CarriersSelect */ "./src/components/CarriersSelect/CarriersSelect.jsx");

var _CarriersSelect2 = _interopRequireDefault(_CarriersSelect);

var _FlightsCards = __webpack_require__(/*! components/FlightsCards/FlightsCards */ "./src/components/FlightsCards/FlightsCards.jsx");

var _FlightsCards2 = _interopRequireDefault(_FlightsCards);

__webpack_require__(/*! ./style.scss */ "./src/containers/FlightsWidget/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlightsWidget(_ref) {
    var selected = _ref.selected,
        selectCarrier = _ref.selectCarrier;

    var data = getData();
    var allCarriers = data.flights.map(function (flight) {
        return flight.carrier;
    });
    var uniqueCarriers = unique(allCarriers);
    var flights = data.flights;

    if (selected !== 'all') {
        flights = flights.filter(function (flight) {
            return flight.carrier === selected;
        });
    }

    return _react2.default.createElement(
        'div',
        { className: 'flights-widget' },
        _react2.default.createElement(_CarriersSelect2.default, { selectCarrier: selectCarrier, carriers: uniqueCarriers }),
        _react2.default.createElement(_FlightsCards2.default, { flights: flights })
    );
}

//Helpers
function getData() {
    return {
        "flights": [{
            "id": 123,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-08T19:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "S7"
        }, {
            "id": 193,
            "direction": {
                "from": "Moscow",
                "to": "New York"
            },
            "arrival": "2016-06-08T21:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "Aeroflot"
        }, {
            "id": 133,
            "direction": {
                "from": "Moscow",
                "to": "Samara"
            },
            "arrival": "2016-09-08T13:52:27.979Z",
            "departure": "2016-08-08T17:51:20.979Z",
            "carrier": "KLM"
        }, {
            "id": 126,
            "direction": {
                "from": "Moscow",
                "to": "London"
            },
            "arrival": "2016-08-10T13:52:27.979Z",
            "departure": "2016-08-09T17:51:20.979Z",
            "carrier": "S7"
        }, {
            "id": 1543,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-08T13:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "Aeroflot"
        }, {
            "id": 1213,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-08T13:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "Aeroflot"
        }, {
            "id": 1523,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-08T13:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "KLM"
        }, {
            "id": 1283,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-08T13:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "Aeroflot"
        }, {
            "id": 12310,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-08T13:52:27.979Z",
            "departure": "2016-06-08T17:51:20.979Z",
            "carrier": "Aeroflot"
        }, {
            "id": 19923,
            "direction": {
                "from": "Moscow",
                "to": "Berlin"
            },
            "arrival": "2016-06-11T13:52:27.979Z",
            "departure": "2016-06-10T17:51:20.979Z",
            "carrier": "KLM"
        }, {
            "id": 2542,
            "direction": {
                "from": "Madrid",
                "to": "Paris"
            },
            "arrival": "2016-06-16T13:52:27.979Z",
            "departure": "2016-06-17T17:51:20.979Z",
            "carrier": "S7"
        }]
    };
}

function unique(array) {
    var obj = {};

    array.forEach(function (item) {
        obj[item] = true;
    });

    return Object.keys(obj);
}

var mapStateToProps = function mapStateToProps(state) {
    return {
        selected: state.widget.selected
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        selectCarrier: function selectCarrier(e) {
            return dispatch((0, _widget.selectCarrier)(e.target.value));
        }
    };
};

FlightsWidget.propTypes = {
    selected: _propTypes2.default.string,
    selectCarrier: _propTypes2.default.func
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FlightsWidget);

/***/ }),

/***/ "./src/containers/FlightsWidget/style.scss":
/*!*************************************************!*\
  !*** ./src/containers/FlightsWidget/style.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/FlightsWidget/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/FlightsWidget/style.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/FlightsWidget/style.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(/*! ./App */ "./src/App.jsx");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('app'));

/***/ }),

/***/ "./src/store/actions/actionTypes.js":
/*!******************************************!*\
  !*** ./src/store/actions/actionTypes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SELECT_CARRIER = exports.SELECT_CARRIER = 'SELECT_CARRIER';

/***/ }),

/***/ "./src/store/actions/widget.js":
/*!*************************************!*\
  !*** ./src/store/actions/widget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectCarrier = undefined;

var _actionTypes = __webpack_require__(/*! ./actionTypes */ "./src/store/actions/actionTypes.js");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var selectCarrier = function selectCarrier(newState) {
    return {
        type: actionTypes.SELECT_CARRIER,
        payload: newState
    };
};

exports.selectCarrier = selectCarrier;

/***/ }),

/***/ "./src/store/configureStore.jsx":
/*!**************************************!*\
  !*** ./src/store/configureStore.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _widget = __webpack_require__(/*! ./reducers/widget */ "./src/store/reducers/widget.js");

var _widget2 = _interopRequireDefault(_widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    widget: _widget2.default
});

var store = (0, _redux.createStore)(rootReducer);

exports.default = store;

/***/ }),

/***/ "./src/store/reducers/createReducer.js":
/*!*********************************************!*\
  !*** ./src/store/reducers/createReducer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createReducer;
function createReducer(initialState, actionHandlers) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        var handler = actionHandlers[action.type];
        return handler ? handler(state, action) : state;
    };
}

/***/ }),

/***/ "./src/store/reducers/widget.js":
/*!**************************************!*\
  !*** ./src/store/reducers/widget.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = __webpack_require__(/*! ../actions/actionTypes */ "./src/store/actions/actionTypes.js");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _createReducer2 = __webpack_require__(/*! ./createReducer */ "./src/store/reducers/createReducer.js");

var _createReducer3 = _interopRequireDefault(_createReducer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
    selected: 'all'
};

var selectCarrier = function selectCarrier(state, _ref) {
    var payload = _ref.payload;
    return _extends({}, state, {
        selected: payload
    });
};

exports.default = (0, _createReducer3.default)(initialState, _defineProperty({}, actionTypes.SELECT_CARRIER, selectCarrier));

/***/ }),

/***/ "./src/styles/theme.scss":
/*!*******************************!*\
  !*** ./src/styles/theme.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--4-oneOf-1-1!../../node_modules/sass-loader/lib/loader.js!./theme.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/styles/theme.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader??ref--4-oneOf-1-1!../../node_modules/sass-loader/lib/loader.js!./theme.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/styles/theme.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader??ref--4-oneOf-1-1!../../node_modules/sass-loader/lib/loader.js!./theme.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js!./src/styles/theme.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi babel-polyfill ./src/index.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./src/index.jsx */"./src/index.jsx");


/***/ })

/******/ });
//# sourceMappingURL=bundle.94482010.js.map