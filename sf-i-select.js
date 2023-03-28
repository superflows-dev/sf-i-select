/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/**
 * SfISelect element.
 *
 * @fires searchClick - When the user presses the enter key in the search input
 * @fires routeChange - When user navigates from one page to another
 * @slot unreadNotifications - Unread notifications array
 * @slot readNotifications - Read notifications array
 * @slot notificationsList - Notifications list link
 * @slot brandName - Brand name
 * @slot brandImage - Brand image
 * @slot mainMenu - Main menu
 * @slot socialMedia - Social media icons list
 * @slot copyright - Copyright notice
 * @slot cta - Call to action
 * @slot content - Content
 * @slot profilePicture - Profile picture
 * @slot profileMenu - Profile menu
 * @csscustomproperty --nav-background-color - Background color of the component
 * @csscustomproperty --nav-color - Text color of the component
 */
let SfISelect = class SfISelect extends LitElement {
    constructor() {
        super();
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
        };
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.submitNew = () => {
        };
        this.renderList = (values) => {
            if (this.mode == "admin") {
                var innerHTML = '';
                innerHTML = '<table><tr><th>Id</th><th>Name</th><th>Action</th></tr>';
                for (var i = 0; i < values.length; i++) {
                    innerHTML += '<tr>';
                    innerHTML += '<td class="tcId">';
                    innerHTML += values[i].id;
                    innerHTML += '</td>';
                    innerHTML += '<td class="tcName">';
                    innerHTML += '<span id="text-' + values[i].id + '">' + values[i].name + '</span>';
                    innerHTML += '<input class="hide" id="input-' + values[i].id + '" type="text" value="' + values[i].name + '" />';
                    innerHTML += '</td>';
                    innerHTML += '<td class="tcActions">';
                    innerHTML += '<button id="edit-' + values[i].id + '">Edit</button>';
                    innerHTML += '<button id="cancel-' + values[i].id + '" class="hide">Cancel</button>';
                    innerHTML += '<button id="submit-' + values[i].id + '" class="hide">Submit</button>';
                    innerHTML += '<button id="delete-' + values[i].id + '">Delete</button>';
                    innerHTML += '<button id="canceld-' + values[i].id + '" class="hide">Cancel</button>';
                    innerHTML += '<button id="confirm-' + values[i].id + '" class="hide">Confirm Delete</button>';
                    innerHTML += '</td>';
                    innerHTML += '</tr>';
                }
                this._SfTableC.innerHTML = innerHTML;
                for (var i = 0; i < values.length; i++) {
                    this._SfTableC.querySelector('#edit-' + values[i].id + '').addEventListener('click', (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('edit-', '');
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#delete-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#text-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#cancel-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#submit-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#input-' + id + '').style.display = 'inline';
                    });
                    this._SfTableC.querySelector('#cancel-' + values[i].id + '').addEventListener('click', (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('cancel-', '');
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#delete-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#text-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#cancel-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#submit-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#input-' + id + '').style.display = 'none';
                    });
                    this._SfTableC.querySelector('#input-' + values[i].id + '').addEventListener('keyup', (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('input-', '');
                        const name = event.target.value;
                        if (Util.validateName(name)) {
                            this._SfTableC.querySelector('#submit-' + id + '').removeAttribute('disabled');
                        }
                        else {
                            this._SfTableC.querySelector('#submit-' + id + '').setAttribute('disabled', true);
                        }
                    });
                    this._SfTableC.querySelector('#confirm-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        this.clearMessages();
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('confirm-', '');
                        const xhr = (await this.prepareXhr({ "id": id }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/delete", this._SfLoader, null));
                        this._SfLoader.innerHTML = '';
                        if (xhr.status == 200) {
                            this.setSuccess('Operation Successful!');
                            setTimeout(() => {
                                this.clearMessages();
                                this._SfNewC.querySelector('.input-new').value = "";
                                this.populateList();
                            }, 1000);
                        }
                        else {
                            const jsonRespose = JSON.parse(xhr.responseText);
                            this.setError(jsonRespose.error);
                        }
                    });
                    this._SfTableC.querySelector('#delete-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('delete-', '');
                        event.target.style.display = 'none';
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#confirm-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#canceld-' + id + '').style.display = 'inline';
                    });
                    this._SfTableC.querySelector('#canceld-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('canceld-', '');
                        event.target.style.display = 'none';
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#delete-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#confirm-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#canceld-' + id + '').style.display = 'none';
                    });
                    this._SfTableC.querySelector('#submit-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        this.clearMessages();
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('submit-', '');
                        const name = this._SfTableC.querySelector('#input-' + id + '').value;
                        const xhr = (await this.prepareXhr({ "name": name, "id": id }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/update", this._SfLoader, null));
                        this._SfLoader.innerHTML = '';
                        if (xhr.status == 200) {
                            this.setSuccess('Operation Successful!');
                            setTimeout(() => {
                                this.clearMessages();
                                this._SfNewC.querySelector('.input-new').value = "";
                                this.populateList();
                            }, 1000);
                        }
                        else {
                            const jsonRespose = JSON.parse(xhr.responseText);
                            this.setError(jsonRespose.error);
                        }
                    });
                }
                this._SfNewC.querySelector('.button-new').addEventListener('click', () => {
                    this._SfNewC.querySelector('.button-new').style.display = 'none';
                    this._SfNewC.querySelector('.button-submit').style.display = 'inline';
                    this._SfNewC.querySelector('.button-cancel').style.display = 'inline';
                    this._SfNewC.querySelector('.input-new').style.display = 'inline';
                });
                this._SfNewC.querySelector('.button-cancel').addEventListener('click', () => {
                    this._SfNewC.querySelector('.button-new').style.display = 'inline';
                    this._SfNewC.querySelector('.button-submit').style.display = 'none';
                    this._SfNewC.querySelector('.button-cancel').style.display = 'none';
                    this._SfNewC.querySelector('.input-new').style.display = 'none';
                });
                this._SfNewC.querySelector('.input-new').addEventListener('keyup', () => {
                    const name = this._SfNewC.querySelector('.input-new').value;
                    if (Util.validateName(name)) {
                        this._SfNewC.querySelector('.button-submit').removeAttribute('disabled');
                    }
                    else {
                        this._SfNewC.querySelector('.button-submit').setAttribute('disabled', true);
                    }
                });
                this._SfNewC.querySelector('.button-submit').addEventListener('click', async () => {
                    this.clearMessages();
                    const xhr = (await this.prepareXhr({ "name": this._SfNewC.querySelector('.input-new').value }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/create", this._SfLoader, null));
                    this._SfLoader.innerHTML = '';
                    if (xhr.status == 200) {
                        this.setSuccess('Operation Successful!');
                        setTimeout(() => {
                            this.clearMessages();
                            this._SfNewC.querySelector('.input-new').value = "";
                            this.populateList();
                        }, 1000);
                    }
                    else {
                        const jsonRespose = JSON.parse(xhr.responseText);
                        this.setError(jsonRespose.error);
                    }
                });
            }
            else {
                var innerHTML = '';
                for (var i = 0; i < values.length; i++) {
                    if (this.selectedId != null && this.selectedId.length > 0) {
                        if (values[i].id == this.selectedId) {
                            innerHTML += '<option id="' + values[i].id + '" selected>' + values[i].name + '</option>';
                            continue;
                        }
                    }
                    innerHTML += '<option id="' + values[i].id + '">' + values[i].name + '</option>';
                }
                this._sfSelect.innerHTML = innerHTML;
                console.log('renderlist', innerHTML);
            }
        };
        this.populateList = async () => {
            console.log('pop list');
            const xhr = (await this.prepareXhr({}, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, null));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                const values = jsonRespose.data.values;
                this.renderList(values);
            }
        };
        this.initState = async () => {
            console.log('mode', this.mode);
            if (this.mode == "read") {
                this._sfSelect.setAttribute("disabled", true);
            }
        };
    }
    firstUpdated(_changedProperties) {
        this.populateList();
        this.initState();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        if (this.mode == "admin") {
            return html `
        <div class="SfISelectCAdmin">
          <div class="d-flex justify-center">
            <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Admin</div>
          </div>
          <br />
          <div class="newC">
            <div class="d-flex justify-center">
              <div class="lb"></div>
              <button class="button-new">New</button>
              <input class="input-new hide" type="text" placeholder="Name ..."/>
              <button class="button-cancel hide">Cancel</button>
              <button class="button-submit hide" disabled>Submit</button>
              <div class="rb"></div>
            </div>
          </div>
          <br />
          <div class="d-flex justify-center">
            <div class="loader-element"></div>
          </div>
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div>
              <div class="div-row-error div-row-submit">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>
            </div>
            <div class="rb"></div>
          </div>
          <br />
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="tableC">
            </div>
            <div class="rb"></div>
          </div>
        </div>
      `;
        }
        else {
            return html `
        <div class="SfISelectC">
          <label>${this.label}</label>
          <div>
            <select>
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      `;
        }
    }
};
SfISelect.styles = css `
    
    .SfISelectC {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .SfISelectCAdmin {
      padding: 10px 20px;
    }

    .SfISelectC label{
      padding-bottom: 5px;
    }

    .SfISelectC div{
      display: flex;
      align-items: center;
    }

    .SfISelectC > div > select{
      flex-grow: 1;
    }

    .loader-element {
      margin-left: 5px;
    }

    .lds-dual-ring {
      display: inline-block;
      width: 15px;
      height: 15px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 10px;
      height: 10px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: none;
      align-items:center;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      border: dashed 1px red;
      width: 100%;
      text-align: center;
    }

    .div-row-success {
      display: none;
      align-items:center;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      border: dashed 1px green;
      width: 100%;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-end {
      justify-content: flex-end;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .badge {
      border: dashed 1px;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 20px;
      margin-top: -20px;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    .tcId {
      min-width: 300px;
    }

    .tcName {
      min-width: 200px;
    }

    .tcActions {
      min-width: 150px;
      text-align: right;
    }

    .SfISelectCAdmin th {
      border-bottom: solid 1px black
    }

    .SfISelectCAdmin td {
      border-bottom: solid 1px gray
    }

    .tableC {
      overflow-x: auto;
    }

    @media (orientation: landscape) {

      .lb {
        width: 25%
      }
      .rb {
        width: 25%
      }

    }

  `;
__decorate([
    property()
], SfISelect.prototype, "apiId", void 0);
__decorate([
    property()
], SfISelect.prototype, "label", void 0);
__decorate([
    property()
], SfISelect.prototype, "name", void 0);
__decorate([
    property()
], SfISelect.prototype, "mode", void 0);
__decorate([
    property()
], SfISelect.prototype, "selectedId", void 0);
__decorate([
    query('.SfISelectC select')
], SfISelect.prototype, "_sfSelect", void 0);
__decorate([
    query('.loader-element')
], SfISelect.prototype, "_SfLoader", void 0);
__decorate([
    query('.tableC')
], SfISelect.prototype, "_SfTableC", void 0);
__decorate([
    query('.newC')
], SfISelect.prototype, "_SfNewC", void 0);
__decorate([
    query('.input-new')
], SfISelect.prototype, "_SfInputNew", void 0);
__decorate([
    query('.div-row-error')
], SfISelect.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfISelect.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfISelect.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfISelect.prototype, "_SfRowSuccessMessage", void 0);
SfISelect = __decorate([
    customElement('sf-i-select')
], SfISelect);
export { SfISelect };
//# sourceMappingURL=sf-i-select.js.map