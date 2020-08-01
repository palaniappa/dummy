// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let globalParamList = [
  {
    name: "host",
    value: "$ActiveTab:origin"
  },
  {
    name: "issuerId",
    value: "$Literal:mylocalissuer"
  },
  {
    name: "audienceId",
    value: "$Literal:mylocalaudience"
  },
  {
    name: "SearchText",
    value: "$Literal:Am I lucky today"
  }

];

let bookmarkListItems = [
  {
    name: "TenantInfo",
    url: "{{host}}/qa/cdp/cdp.jsp",
  },
  {
    name: "Generate JWT",
    url: "{{host}}/qa/cdp/generatejwt.jsp",
  },
  {
    name: "Mint JWT",
    url: "{{host}}/qa/cdp/mintedjwt.jsp?issuerId={{issuerId}}&audienceId={{audienceId}}&type=JWT"
  },
  {
    name: "News",
    url: "https://www.google.com/search?q={{SearchText}}"
  }
];

chrome.runtime.onInstalled.addListener(function () {
  let initialData = {};
  initialData.bookmarkList = bookmarkListItems;
  initialData.globalParamList = globalParamList;
  chrome.storage.sync.set({initialData:initialData}, function () {
    console.log("Inserted initial data");
  });

  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");
  });

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});