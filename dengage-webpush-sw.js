
var swUrl = new URL(location);
var accountId = swUrl.searchParams.get('account_id') || '';
var appGuid = swUrl.searchParams.get('app_guid') || '';
var domain = swUrl.searchParams.get('domain') || '';
if (accountId && appGuid) {
    importScripts("https://" + domain + "/p/push/" + accountId + "/" + appGuid + "/dengage_sw.js");
}
