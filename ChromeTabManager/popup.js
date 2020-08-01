// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
const PARAM_TYPE_JS_VALUE = "$Js";
const PARAM_TYPE_SEPARATOR = ":";

function main() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.storage.sync.get('initialData', function (result) {
      let initialData = result.initialData;
      if (initialData) {
        populateBookmarkLists(tabs[0], initialData);
        populateGlobalParamList(initialData);
      }
    }
    );

  });

  $("#bmName").val("");
  $("#bmUrl").val("");
  let button = document.getElementById('bmAdd');
  button.addEventListener('click', addBookMarkItem.bind(this));

  $("#pmKey").val("");
  $("#pmValue").val("");
  let paramAddButton = document.getElementById('pmAdd');
  paramAddButton.addEventListener('click', addParameterItem.bind(this));

}

function addParameterItem() {
  let pmKey = $("#pmKey").val();
  let pmValue = $("#pmValue").val();
  if (pmKey && pmValue) {
    let newParam = {};
    newParam.key = pmKey;
    newParam.value = pmValue;
    chrome.storage.sync.get('initialData', function (result) {
      result.initialData.globalParamList.push(newParam);
      chrome.storage.sync.set({ initialData: result.initialData }, function () {
        main();
      });
    });
  }
}



function addBookMarkItem() {
  let bmName = $("#bmName").val();
  let bmUrl = $("#bmUrl").val();
  if (bmName && bmUrl) {
    let newItem = {};
    newItem.name = bmName;
    newItem.url = bmUrl;
    chrome.storage.sync.get('initialData', function (result) {
      result.initialData.bookmarkList.push(newItem);
      chrome.storage.sync.set({ initialData: result.initialData }, function () {
        main();
      });
    });
  }
}



function populateGlobalParamList(initialData) {

  let globalParameterListContainer = document.getElementById("globalParameterList");

  if (globalParameterListContainer) {
    globalParameterListContainer.innerHTML = '';
    var first = true;

    document.createElement("table");

    let items = [];
    initialData.globalParamList.forEach(p => {
      if (p) {
        let paramItem = [p.key,p.value]; 
        items.push(paramItem);
      }
    });
    let table = createTable(items,["Key","Value"]);
    globalParameterListContainer.appendChild(table);
  }

}

function createTable(tableData, headers) {
  var table = document.createElement('table');
  
  if(headers){
    var tableHead = document.createElement('thead');

    let headerRow = document.createElement('tr');
  
    headers.forEach(function(headerData) {
        var cell = document.createElement('th');
        cell.appendChild(document.createTextNode(headerData));
        headerRow.appendChild(cell);
      });
      tableHead.appendChild(headerRow);
      table.appendChild(tableHead);
  }
  
    var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  return table;
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
          if (url.indexOf(getFormattedParamName(p.key)) != -1) {
            var paramValue = getRuntimeParamValue(p.value, currentActiveTab);
            url = substituteValue(url, p.key, paramValue)
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

