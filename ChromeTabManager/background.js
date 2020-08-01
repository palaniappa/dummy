// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let globalParamList = [
  {
    name: "$ActiveTab.origin",
    value: "$ActiveTab.origin"
  },
  {
    name: "issuerId",
    value: "my issuer id"
  },
  {
    name: "audienceId",
    value: "my audience id"
  },
  {
    name: "SearchText",
    value: "my search text"
  }

];

let bookmarkListItems = [
  {
    name: "TenantInfo",
    url: "{{$ActiveTab.origin}}/qa/cdp/cdp.jsp",
  },
  {
    name: "Generate JWT",
    url: "{{$ActiveTab.origin}}/qa/cdp/generatejwt.jsp",
  },
  {
    name: "Mint JWT",
    url: "{{$ActiveTab.origin}}/qa/cdp/mintedjwt.jsp?issuerId={{issuerId}}&audienceId={{audienceId}}&type=JWT"
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
});