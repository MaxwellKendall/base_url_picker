
var http = "http://";
var https = "https://";
var us_hosts = ['0.0.0.0:3000/#', 'dev.usaspending.gov/#', 'staging.usaspending.gov/#', 'sandbox.usaspending.gov/#', 'www.usaspending.gov/#'];
var br_hosts = ['0.0.0.0:3000/#', 'broker-dev.usaspending.gov/#', 'broker-staging.usaspending.gov/#', 'broker-sandbox.usaspending.gov/#', 'www.broker.usaspending.gov/#']

var getHostByWebsite = function(isBroker) {
    var hosts = (isBroker) ? br_hosts : us_hosts;
    return {
        local: http + hosts[0],
        dev: https + hosts[1],
        staging: https + hosts[2],
        sandbox: https + hosts[3],
        prod: https + hosts[4]
    };
};

var changeUrl = function(tab) {
    var selectedEnv = Array.from(document.querySelectorAll("option"))
        .find((opt) => opt.selected === true)
        .value;
    var hash = tab.url.split("#")[1];
    var isBroker = document.getElementById('is-broker-js').checked;
    var newUrl = getHostByWebsite(isBroker)[selectedEnv] + hash;

    window.alert(newUrl);
    chrome.tabs.update(tab.id, { url: newUrl });
};

var registerFn = function() {
    let tab;
    chrome.tabs.query({ active: true }, function(r) {
        tab = r[0];
    });

    var selectDropDown = document.getElementById("env-dd");
    selectDropDown.addEventListener('change', function() { changeUrl(tab) } );
};


document.addEventListener('DOMContentLoaded', registerFn);