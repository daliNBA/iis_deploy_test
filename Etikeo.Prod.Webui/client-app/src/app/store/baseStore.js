"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStoreContext = exports.BaseStore = void 0;
var react_1 = require("react");
var mobx_1 = require("mobx");
var articleStore_1 = require("./articleStore");
var modalStore_1 = require("./modalStore");
var commonStore_1 = require("./commonStore");
var userStore_1 = require("./userStore");
var clientStore_1 = require("./clientStore");
var profilStore_1 = require("./profilStore");
var franchiseurStore_1 = require("./franchiseurStore");
(0, mobx_1.configure)({ enforceActions: "always" });
var BaseStore = /** @class */ (function () {
    function BaseStore() {
        this.articleStore = new articleStore_1.default(this);
        this.modalStore = new modalStore_1.default(this);
        this.commonStore = new commonStore_1.default(this);
        this.userStore = new userStore_1.default(this);
        this.clientStore = new clientStore_1.default(this);
        this.profilStore = new profilStore_1.default(this);
        this.franchiseurStore = new franchiseurStore_1.default(this);
    }
    return BaseStore;
}());
exports.BaseStore = BaseStore;
exports.BaseStoreContext = (0, react_1.createContext)(new BaseStore());
//# sourceMappingURL=baseStore.js.map