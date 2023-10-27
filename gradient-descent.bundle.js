(self.webpackChunkwebpack_babel_template=self.webpackChunkwebpack_babel_template||[]).push([[618],{72742:(__unused_webpack_module,exports)=>{"use strict";eval('\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.CanvasManager = void 0;\nclass CanvasManager {\n    constructor(canvasEl) {\n        this.canvasEl = canvasEl;\n        this.ctx = canvasEl.getContext("2d");\n        this.resizeCanvas();\n        this.addEventListeners();\n    }\n    addEventListeners() {\n        // Resize\n        window.addEventListener("resize", this.resizeCanvas.bind(this));\n    }\n    resizeCanvas() {\n        this.canvasEl.width = window.innerWidth;\n        this.canvasEl.height = window.innerHeight;\n    }\n}\nexports.CanvasManager = CanvasManager;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzI3NDIuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1iYWJlbC10ZW1wbGF0ZS8uL3NyYy9saWIvQ2FudmFzTWFuYWdlci50cz9kOThkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYW52YXNNYW5hZ2VyID0gdm9pZCAwO1xuY2xhc3MgQ2FudmFzTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzRWwpIHtcbiAgICAgICAgdGhpcy5jYW52YXNFbCA9IGNhbnZhc0VsO1xuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgLy8gUmVzaXplXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplQ2FudmFzLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICByZXNpemVDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzRWwud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXNFbC5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxufVxuZXhwb3J0cy5DYW52YXNNYW5hZ2VyID0gQ2FudmFzTWFuYWdlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///72742\n')},84174:function(__unused_webpack_module,exports,__webpack_require__){"use strict";eval('\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === "function")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.GradientDescentCalc = void 0;\nconst mathjs_1 = __webpack_require__(55341);\nclass GradientDescentCalc {\n    constructor(func = "x^2+ 2*x + 1", vars = ["x"], options) {\n        this.func = func;\n        // Instance variables\n        this.iterationDetails = {\n            count: 0,\n            steps: null,\n        };\n        const { initialVals } = options, reqOptions = __rest(options, ["initialVals"]);\n        this.options = reqOptions;\n        this.exp = (0, mathjs_1.parse)(func);\n        this.vars = vars;\n        this.derivatives = this.getGradients();\n        this.currVals = initialVals;\n    }\n    getGradients() {\n        const gradients = {};\n        for (const varName of this.vars) {\n            gradients[varName] = (0, mathjs_1.derivative)(this.exp, varName);\n        }\n        return gradients;\n    }\n    getStepFromVar(varName) {\n        return this.derivatives[varName].evaluate(this.currVals);\n    }\n    getStep() {\n        var _a, _b;\n        const steps = {};\n        if (this.iterationDetails.count >= this.options.maxSteps) {\n            return {\n                steps: this.vars.reduce((acc, varName) => {\n                    acc[varName] = 0;\n                    return acc;\n                }, {}),\n                currVals: Object.assign({}, this.currVals),\n                iterationDetails: Object.assign({}, this.iterationDetails),\n            };\n        }\n        for (const varName of this.vars) {\n            if (((_a = this.iterationDetails.steps) === null || _a === void 0 ? void 0 : _a[varName]) &&\n                ((_b = this.iterationDetails.steps) === null || _b === void 0 ? void 0 : _b[varName]) <= this.options.minStepSize) {\n                steps[varName] = 0;\n            }\n            else {\n                steps[varName] =\n                    this.getStepFromVar(varName) * this.options.learningRate;\n                this.currVals[varName] -= steps[varName];\n            }\n        }\n        if (!Object.keys(steps).reduce((acc, key) => (acc = acc && steps[key] === 0), true)) {\n            this.iterationDetails.count++;\n            this.iterationDetails.steps = steps;\n            return {\n                steps,\n                currVals: this.currVals,\n                iterationDetails: this.iterationDetails,\n            };\n        }\n        return {\n            steps,\n            currVals: Object.assign({}, this.currVals),\n            iterationDetails: Object.assign({}, this.iterationDetails),\n        };\n    }\n    getVals() {\n        return this.currVals;\n    }\n}\nexports.GradientDescentCalc = GradientDescentCalc;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODQxNzQuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGNBQWM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkI7QUFDM0IsaUJBQWlCLG1CQUFPLENBQUMsS0FBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGNBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7QUFDckIsMENBQTBDO0FBQzFDLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stYmFiZWwtdGVtcGxhdGUvLi9zcmMvcGFnZXMvZ3JhZGllbnQtZGVzY2VudC9zY3JpcHRzL0dyYWRpZW50RGVzY2VudC50cz81ZTM2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5HcmFkaWVudERlc2NlbnRDYWxjID0gdm9pZCAwO1xuY29uc3QgbWF0aGpzXzEgPSByZXF1aXJlKFwibWF0aGpzXCIpO1xuY2xhc3MgR3JhZGllbnREZXNjZW50Q2FsYyB7XG4gICAgY29uc3RydWN0b3IoZnVuYyA9IFwieF4yKyAyKnggKyAxXCIsIHZhcnMgPSBbXCJ4XCJdLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgICAgIC8vIEluc3RhbmNlIHZhcmlhYmxlc1xuICAgICAgICB0aGlzLml0ZXJhdGlvbkRldGFpbHMgPSB7XG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIHN0ZXBzOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB7IGluaXRpYWxWYWxzIH0gPSBvcHRpb25zLCByZXFPcHRpb25zID0gX19yZXN0KG9wdGlvbnMsIFtcImluaXRpYWxWYWxzXCJdKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcmVxT3B0aW9ucztcbiAgICAgICAgdGhpcy5leHAgPSAoMCwgbWF0aGpzXzEucGFyc2UpKGZ1bmMpO1xuICAgICAgICB0aGlzLnZhcnMgPSB2YXJzO1xuICAgICAgICB0aGlzLmRlcml2YXRpdmVzID0gdGhpcy5nZXRHcmFkaWVudHMoKTtcbiAgICAgICAgdGhpcy5jdXJyVmFscyA9IGluaXRpYWxWYWxzO1xuICAgIH1cbiAgICBnZXRHcmFkaWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGdyYWRpZW50cyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHZhck5hbWUgb2YgdGhpcy52YXJzKSB7XG4gICAgICAgICAgICBncmFkaWVudHNbdmFyTmFtZV0gPSAoMCwgbWF0aGpzXzEuZGVyaXZhdGl2ZSkodGhpcy5leHAsIHZhck5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncmFkaWVudHM7XG4gICAgfVxuICAgIGdldFN0ZXBGcm9tVmFyKHZhck5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVyaXZhdGl2ZXNbdmFyTmFtZV0uZXZhbHVhdGUodGhpcy5jdXJyVmFscyk7XG4gICAgfVxuICAgIGdldFN0ZXAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHN0ZXBzID0ge307XG4gICAgICAgIGlmICh0aGlzLml0ZXJhdGlvbkRldGFpbHMuY291bnQgPj0gdGhpcy5vcHRpb25zLm1heFN0ZXBzKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0ZXBzOiB0aGlzLnZhcnMucmVkdWNlKChhY2MsIHZhck5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjW3Zhck5hbWVdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICAgICAgY3VyclZhbHM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY3VyclZhbHMpLFxuICAgICAgICAgICAgICAgIGl0ZXJhdGlvbkRldGFpbHM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlcmF0aW9uRGV0YWlscyksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgdmFyTmFtZSBvZiB0aGlzLnZhcnMpIHtcbiAgICAgICAgICAgIGlmICgoKF9hID0gdGhpcy5pdGVyYXRpb25EZXRhaWxzLnN0ZXBzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdmFyTmFtZV0pICYmXG4gICAgICAgICAgICAgICAgKChfYiA9IHRoaXMuaXRlcmF0aW9uRGV0YWlscy5zdGVwcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3Zhck5hbWVdKSA8PSB0aGlzLm9wdGlvbnMubWluU3RlcFNpemUpIHtcbiAgICAgICAgICAgICAgICBzdGVwc1t2YXJOYW1lXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGVwc1t2YXJOYW1lXSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RlcEZyb21WYXIodmFyTmFtZSkgKiB0aGlzLm9wdGlvbnMubGVhcm5pbmdSYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VyclZhbHNbdmFyTmFtZV0gLT0gc3RlcHNbdmFyTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhzdGVwcykucmVkdWNlKChhY2MsIGtleSkgPT4gKGFjYyA9IGFjYyAmJiBzdGVwc1trZXldID09PSAwKSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlcmF0aW9uRGV0YWlscy5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5pdGVyYXRpb25EZXRhaWxzLnN0ZXBzID0gc3RlcHM7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0ZXBzLFxuICAgICAgICAgICAgICAgIGN1cnJWYWxzOiB0aGlzLmN1cnJWYWxzLFxuICAgICAgICAgICAgICAgIGl0ZXJhdGlvbkRldGFpbHM6IHRoaXMuaXRlcmF0aW9uRGV0YWlscyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0ZXBzLFxuICAgICAgICAgICAgY3VyclZhbHM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY3VyclZhbHMpLFxuICAgICAgICAgICAgaXRlcmF0aW9uRGV0YWlsczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVyYXRpb25EZXRhaWxzKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0VmFscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyclZhbHM7XG4gICAgfVxufVxuZXhwb3J0cy5HcmFkaWVudERlc2NlbnRDYWxjID0gR3JhZGllbnREZXNjZW50Q2FsYztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///84174\n')},16320:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";eval('var __webpack_unused_export__;\n\n__webpack_unused_export__ = ({ value: true });\nconst CanvasManager_1 = __webpack_require__(72742);\nconst GradientDescent_1 = __webpack_require__(84174);\nconst mathjs_1 = __webpack_require__(55341);\nconst config = {};\nconst math = (0, mathjs_1.create)(mathjs_1.all, config);\nconst canvas = document.getElementById("canvas");\nconst ctx = canvas.getContext("2d");\nconst canvasManager = new CanvasManager_1.CanvasManager(canvas);\nconst simpleGradientDescentCalc = new GradientDescent_1.GradientDescentCalc("x^2 + y^2", ["x", "y"], {\n    initialVals: {\n        x: 1,\n        y: 1,\n    },\n    learningRate: 0.01,\n    maxSteps: 1000,\n    minStepSize: 0.0001,\n});\nfor (let i = 0; i < 1000; i++) {\n    simpleGradientDescentCalc.getStep();\n}\nconsole.log(simpleGradientDescentCalc.getStep());\nconsole.log({ finalVals: simpleGradientDescentCalc.getVals() });\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTYzMjAuanMiLCJtYXBwaW5ncyI6IjtBQUFhO0FBQ2IsNkJBQTZDLEVBQUUsYUFBYSxDQUFDO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLEtBQXFCO0FBQ3JELDBCQUEwQixtQkFBTyxDQUFDLEtBQW1CO0FBQ3JELGlCQUFpQixtQkFBTyxDQUFDLEtBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdEQUFnRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stYmFiZWwtdGVtcGxhdGUvLi9zcmMvcGFnZXMvZ3JhZGllbnQtZGVzY2VudC9zY3JpcHRzL2luZGV4LnRzPzQwMTQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDYW52YXNNYW5hZ2VyXzEgPSByZXF1aXJlKFwiQC9saWIvQ2FudmFzTWFuYWdlclwiKTtcbmNvbnN0IEdyYWRpZW50RGVzY2VudF8xID0gcmVxdWlyZShcIi4vR3JhZGllbnREZXNjZW50XCIpO1xuY29uc3QgbWF0aGpzXzEgPSByZXF1aXJlKFwibWF0aGpzXCIpO1xuY29uc3QgY29uZmlnID0ge307XG5jb25zdCBtYXRoID0gKDAsIG1hdGhqc18xLmNyZWF0ZSkobWF0aGpzXzEuYWxsLCBjb25maWcpO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY29uc3QgY2FudmFzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyXzEuQ2FudmFzTWFuYWdlcihjYW52YXMpO1xuY29uc3Qgc2ltcGxlR3JhZGllbnREZXNjZW50Q2FsYyA9IG5ldyBHcmFkaWVudERlc2NlbnRfMS5HcmFkaWVudERlc2NlbnRDYWxjKFwieF4yICsgeV4yXCIsIFtcInhcIiwgXCJ5XCJdLCB7XG4gICAgaW5pdGlhbFZhbHM6IHtcbiAgICAgICAgeDogMSxcbiAgICAgICAgeTogMSxcbiAgICB9LFxuICAgIGxlYXJuaW5nUmF0ZTogMC4wMSxcbiAgICBtYXhTdGVwczogMTAwMCxcbiAgICBtaW5TdGVwU2l6ZTogMC4wMDAxLFxufSk7XG5mb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgIHNpbXBsZUdyYWRpZW50RGVzY2VudENhbGMuZ2V0U3RlcCgpO1xufVxuY29uc29sZS5sb2coc2ltcGxlR3JhZGllbnREZXNjZW50Q2FsYy5nZXRTdGVwKCkpO1xuY29uc29sZS5sb2coeyBmaW5hbFZhbHM6IHNpbXBsZUdyYWRpZW50RGVzY2VudENhbGMuZ2V0VmFscygpIH0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///16320\n')},75042:()=>{}},I=>{I.O(0,[341],(()=>(16320,I(I.s=16320)))),I.O()}]);