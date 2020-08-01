// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
const PARAM_TYPE_JS_VALUE = "$Js";
const PARAM_TYPE_SEPARATOR = ".";

function main() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.storage.sync.get('initialData', function(result) {
      let initialData = result.initialData;
      if(initialData){
        populateBookmarkLists(tabs[0],initialData);
      } 
    }
    );
    
  });

  $("#bmName").val("");
  $("#bmUrl").val("");
  let button = document.getElementById('bmAdd');
    button.addEventListener('click', addBookMarkItem.bind(this));
}

function addBookMarkItem() {
  let bmName = $("#bmName").val();
  let bmUrl = $("#bmUrl").val();
  if(bmName && bmUrl){
    let newItem = {};
    newItem.name = bmName;
    newItem.url = bmUrl;
    chrome.storage.sync.get('initialData', function(result) {
      result.initialData.bookmarkList.push(newItem);
      chrome.storage.sync.set({initialData:result.initialData}, function () {
        main();
      });
    });
  }
}

function populateBookmarkLists(currentActiveTab, initialData) {
  let bookmarkListContainer = document.getElementById("bookmarkList");

  if (bookmarkListContainer) {
    bookmarkListContainer.innerHTML = '';
    var first = true;

    initialData.bookmarkList.forEach(bookmark => {
      if (bookmark) {
        var x = document.createElement("A");
        var t = document.createTextNode(bookmark.name);

        var url = bookmark.url;
        initialData.globalParamList.forEach(p => {
          if (url.indexOf(getFormattedParamName(p.name))!=-1) {
            var paramValue = getRuntimeParamValue(p.value, currentActiveTab);
            url = substituteValue(url, p.name, paramValue)
          }

        });
        x.setAttribute("target", "_base");
        x.setAttribute("href", url);
        x.appendChild(t);

        if (first == false) {
          let breakItem = document.createElement("br");
          bookmarkListContainer.appendChild(breakItem);
        }
        first = false;

        bookmarkListContainer.appendChild(x);

      }
    });
  }
}

function getRuntimeParamValue(paramValue, currentActiveTab) {
  let items = paramValue.split(PARAM_TYPE_SEPARATOR);
  let paramValueType = items[0];
  if (paramValueType == PARAM_TYPE_ACTIVE_TAB) {
    let variableNameOrValue = items[1];
    let paramSubstitutedValue = getActiveTabValue(variableNameOrValue, currentActiveTab);
    return paramSubstitutedValue;
  }
  
  return paramValueType;
}

function getActiveTabValue(variable, currentActiveTab) {
  var varValue = "";
  var uri = new URL(currentActiveTab.url);
    varValue = uri[variable];
  return varValue;
}

function substituteValue(url, paramName, paramValue) {
  url = url.replace(getFormattedParamName(paramName), paramValue);
  return url;
}

function getFormattedParamName(paramName) {
  return "{{" + paramName + "}}";
}

main();

