var swUrl = new URL(location);
var accountId = swUrl.searchParams.get('account_id') || '';
var appGuid = swUrl.searchParams.get('app_guid') || '';
importScripts("https://pdev.dengage.com/p/push/" + accountId + "/" + appGuid + "/dengage_sw.js");
