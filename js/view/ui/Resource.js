var res = {
    HelloWorld_png : "res/HelloWorld.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

exports.res = res;
exports.g_resources = g_resources;
