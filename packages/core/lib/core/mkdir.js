"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdir = void 0;
var common_1 = require("../common");
function mkdir(option) {
    option.folderName = option.folderName.replace(/[ ()]/g, '_');
    return common_1.common.http
        .request({
        url: "https://up.woozooo.com/doupload.php",
        method: 'post',
        body: {
            task: 2,
            parent_id: option.parentId,
            folder_name: option.folderName,
            folder_description: option.folderDescription,
        },
    })
        .then(function (value) { return value.json(); })
        .then(function (response) {
        if (response.zt != 1) {
            throw new Error(response.info);
        }
        return response.text;
    });
}
exports.mkdir = mkdir;
