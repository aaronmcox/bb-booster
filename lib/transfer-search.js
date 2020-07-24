"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getFormData() {
  var searchContainer = document.getElementById("ctl00_cphContent_pnlTL");
  var idsToData = Object.assign({}, getSelectData(searchContainer), getInputData(searchContainer));
  return idsToData; // browser.storage.sync.set(idsToData);
}

function getInputData(searchContainer) {
  var idsToData = {};
  var inputs = searchContainer.getElementsByTagName("input");

  var _iterator = _createForOfIteratorHelper(inputs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var input = _step.value;

      if (input.type === "checkbox") {
        idsToData[input.id] = input.checked;
      }

      if (input.type === "text") {
        idsToData[input.id] = input.value;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return idsToData;
}

function getSelectData(searchContainer) {
  var idsToData = {};
  var selects = searchContainer.getElementsByTagName("select");

  var _iterator2 = _createForOfIteratorHelper(selects),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var select = _step2.value;
      idsToData[select.id] = select.value;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return idsToData;
}

function saveSearch(name) {
  var searchData = getFormData();
  browser.storage.local.set(_defineProperty({}, name, JSON.stringify(searchData)));
}

function loadSearchData(name) {
  if (typeof name !== "string") {
    return;
  }

  retrieveSearchData(name).then(function (idsToData) {
    var _iterator3 = _createForOfIteratorHelper(Object.getOwnPropertyNames(idsToData)),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var id = _step3.value;
        var value = idsToData[id]; // TODO: make sure we can differentiate between value and checked the right way

        var element = document.getElementById(id);

        if (!!element) {
          if (typeof value === "boolean") {
            element.checked = value;
          } else {
            element.value = value;
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  });
}

function retrieveSearchData(name) {
  return browser.storage.local.get(name).then(function (results) {
    return JSON.parse(results[name]);
  })["catch"](function (error) {
    console.debug(error);
    return undefined;
  });
}

var model = {
  currentPreset: undefined
};

var controls = function controls(_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      searchNames = _ref2[0];

  return el("div", null, el("select", {
    id: "currentPreset"
  }, searchNames.map(function (name) {
    return el("option", {
      value: name
    }, name);
  })), el("button", {
    onClick: "ev => loadEventData(ev.target.value);"
  }, "Load"));
};