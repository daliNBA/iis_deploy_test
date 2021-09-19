"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var __1 = require("../..");
var IPagination_1 = require("../models/IPagination");
axios_1.default.defaults.baseURL = process.env.REACT_APP_API_URL;
var sleep = function (delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
};
axios_1.default.interceptors.response.use(function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var pagination;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep(1000)];
            case 1:
                _a.sent();
                pagination = response.headers['pagination'];
                if (pagination) {
                    console.log(pagination);
                    response.data = new IPagination_1.PaginatedResult(response.data, JSON.parse(pagination));
                    return [2 /*return*/, response];
                }
                return [2 /*return*/, response];
        }
    });
}); }, function (error) {
    var _a = error.response, data = _a.data, status = _a.status, config = _a.config, headers = _a.headers;
    if (error.message === 'Network Error' && !error.response)
        react_toastify_1.toast.error('Network error - make sure API is running!');
    if (!error.response)
        react_toastify_1.toast.error("Network error - Please check your connection ");
    if (status === 404)
        __1.history.push('/notfound');
    if (status === 401 && headers['www-authenticate'].startsWith('Bearer error="invalid_token"')) {
        window.localStorage.removeItem('jwt');
        __1.history.push('/');
        react_toastify_1.toast.info("Your session is expired, please login again");
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        if (typeof data === 'string') {
            react_toastify_1.toast.error(data);
            __1.history.push('/');
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
            __1.history.push('/notfound');
        }
        if (data.errors) {
            var modalStateErrors = [];
            for (var key in data.errors) {
                if (data.errors[key]) {
                    modalStateErrors.push(data.errors[key]);
                }
            }
            throw modalStateErrors.flat();
        }
    }
    __1.history.push('/notfound');
    if (status === 500) {
        // setServerError(data);
        __1.history.push('/server-error');
    }
    return Promise.reject(error);
});
var responseBody = function (response) { return response.data; };
//Common Requests
var requests = {
    get: function (url) { return axios_1.default.get(url).then(responseBody); },
    post: function (url, body) { return axios_1.default.post(url, body).then(responseBody); },
    put: function (url, body) { return axios_1.default.put(url, body).then(responseBody); },
    del: function (url) { return axios_1.default.delete(url).then(responseBody); },
    postForm: function (url, file) {
        var formData = new FormData();
        formData.append('File', file);
        return axios_1.default.post(url, formData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(responseBody);
    }
};
//Response Clients API
var clientAgent = {
    list: function (params) { return axios_1.default.get('/client', { params: params }).then(responseBody); },
    listClientsFranchise: function (id, params) { return axios_1.default.get("/client/clientsFranchise/" + id, { params: params }).then(responseBody); },
    details: function (id) { return requests.get("/client/" + id); },
    create: function (client) { return requests.post("/client/addClient", client); },
    update: function (client) { return requests.put("/client/" + client.clientId, client); },
    delete: function (id) { return requests.del("/client/" + id); },
    enable: function (id) { return requests.post("/client/" + id + "/enable", {}); },
    disable: function (id) { return requests.post("/client/" + id + "/disable", {}); },
};
//Response Franchiseur API
var franchiseurAgent = {
    list: function (params) { return axios_1.default.get('/franchiseur', { params: params }).then(responseBody); },
    details: function (id) { return requests.get("/franchiseur/" + id); },
    create: function (franchiseur) { return requests.post("/franchiseur/addFranchiseur", franchiseur); },
    update: function (franchiseur) { return requests.put("/franchiseur/" + franchiseur.franchiseurId, franchiseur); },
    delete: function (id) { return requests.del("/franchiseur/" + id); },
    enable: function (id) { return requests.post("/franchiseur/" + id + "/enable", {}); },
    disable: function (id) { return requests.post("/franchiseur/" + id + "/disable", {}); },
};
//Response User API
var userAgent = {
    register: function (user) { return requests.post("/user/register", user); },
    login: function (user) { return requests.post("/user/login", user); },
    current: function () { return requests.get('/user'); },
    verifyEmail: function (token, email) { return requests.post("/user/verifyEmail", { token: token, email: email }); },
    resendEmailConfirm: function (email) { return requests.get("/user/resendEmailVerification?email=" + email); },
    fbLogin: function (accessToken) { return requests.post("/user/facebook", { accessToken: accessToken }); },
    refreshToken: function () { return requests.post("/user/refreshToken", {}); },
};
//Response Articles API
var articleAgent = {
    list: function (params) { return axios_1.default.get('/article', { params: params }).then(responseBody); },
    details: function (id) { return requests.get("/article/" + id); },
    create: function (article) { return requests.post("/article/addArticle", article); },
    update: function (article) { return requests.put("/article/" + article.articleId, article); },
    uploadPhoto: function (id, photo) { return requests.postForm("/article/addPhoto/" + id, photo); },
    setMainPhoto: function (idArticle, id) { return requests.post("/article/" + idArticle + "/setmain/" + id, {}); },
    deletePhoto: function (idArticle, id) { return requests.del("/article/" + idArticle + "/deletePhoto/" + id); },
    enable: function (id) { return requests.post("/article/" + id + "/enable", {}); },
    disable: function (id) { return requests.post("/article/" + id + "/disable", {}); },
};
//Response Profil API
var profilAgent = {
    detail: function (username) { return requests.get("/profil/" + username); },
    editProfile: function (profil) { return requests.put("/profil", profil); },
    uploadPhoto: function (photo) { return requests.postForm("/profil", photo); },
    follow: function (username) { return requests.post("/profil/" + username + "/follow", {}); },
    unfollow: function (username) { return requests.del("/profil/" + username + "/unfollow"); },
    setMainPhoto: function (id) { return requests.post("/profil/" + id + "/setmain", {}); },
    deletePhoto: function (id) { return requests.del("/profil/" + id); },
    listFranchiseur: function (username, predicate) { return requests.get("/profil/" + username + "/franchiseurs?predicate=" + predicate); },
};
//Response Test API
var weatherAgent = {
    list: function () { return requests.get('/WeatherForecast'); }
};
var exportObject = {
    articleAgent: articleAgent,
    profilAgent: profilAgent,
    userAgent: userAgent,
    clientAgent: clientAgent,
    franchiseurAgent: franchiseurAgent,
    weatherAgent: weatherAgent
};
exports.default = exportObject;
//# sourceMappingURL=agent.js.map