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
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 * @property selectedText - callback function
 */
let SfISelect = class SfISelect extends LitElement {
    constructor() {
        super();
        this.selectedId = [];
        this.removedValues = [];
        this.selectedTextPhrase = "";
        this.selectedIndex = () => {
            let index = 0;
            const len = this._SfInputSelect.options.length;
            for (var i = 0; i < len; i++) {
                const opt = this._SfInputSelect.options[i];
                if (opt.selected && opt.value != "noselect") {
                    index = i;
                }
            }
            return index;
        };
        this.selectedValues = () => {
            const values = [];
            const len = this._SfInputSelect.options.length;
            for (var i = 0; i < len; i++) {
                const opt = this._SfInputSelect.options[i];
                if (opt.selected && opt.value != "noselect") {
                    values.push(opt.value);
                }
            }
            console.log('returning values', values);
            return values;
        };
        this.selectedTexts = () => {
            const values = [];
            const len = this._SfInputSelect.options.length;
            for (var i = 0; i < len; i++) {
                const opt = this._SfInputSelect.options[i];
                if (opt.selected && opt.value != "noselect") {
                    values.push(this._SfInputSelect.options[i].text);
                }
            }
            return values;
        };
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.clearSelection = () => {
            this._SfInputSelect.value = 'noselect';
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
        this.dispatchMyEvent = (ev, args) => {
            const event = new CustomEvent(ev, { detail: args, bubbles: true, composed: true });
            this.dispatchEvent(event);
        };
        this.removeItemByValue = (value) => {
            if (!this.removedValues.includes(value)) {
                this.removedValues.push(value);
            }
            console.log('removedvalues', this.removedValues);
        };
        this.renderList = (values) => {
            if (this.mode == "admin") {
                var innerHTML = '';
                innerHTML = '<table><tr><th part="td-head">Id</th><th part="td-head">Name</th><th part="td-head">Action</th></tr>';
                for (var i = 0; i < values.length; i++) {
                    innerHTML += '<tr>';
                    innerHTML += '<td part="td-body" class="tcId">';
                    innerHTML += values[i].id;
                    innerHTML += '</td>';
                    innerHTML += '<td part="td-body" class="tcName">';
                    innerHTML += '<span id="text-' + values[i].id + '">' + values[i].name + '</span>';
                    innerHTML += '<input part="input" class="hide" id="input-' + values[i].id + '" type="text" value="' + values[i].name + '" />';
                    innerHTML += '</td>';
                    innerHTML += '<td part="td-action" class="tcActions">';
                    innerHTML += '<button part="button" class="table-action-button" id="edit-' + values[i].id + '">Edit</button>';
                    innerHTML += '<button part="button" class="table-action-button hide" id="cancel-' + values[i].id + '" >Cancel</button>';
                    innerHTML += '<button part="button" class="table-action-button hide" id="submit-' + values[i].id + '" >Submit</button>';
                    innerHTML += '<button part="button" class="table-action-button" id="delete-' + values[i].id + '">Delete</button>';
                    innerHTML += '<button part="button" class="table-action-button hide" id="canceld-' + values[i].id + '" >Cancel</button>';
                    innerHTML += '<button part="button" class="table-action-button hide" id="confirm-' + values[i].id + '" >Confirm Delete</button>';
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
                        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                        const xhr = (await this.prepareXhr({ "id": id }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/delete", this._SfLoader, authorization));
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
                            setTimeout(() => {
                                this.clearMessages();
                            }, 5000);
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
                        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                        const xhr = (await this.prepareXhr({ "name": name, "id": id }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/update", this._SfLoader, authorization));
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
                            setTimeout(() => {
                                this.clearMessages();
                            }, 5000);
                        }
                    });
                }
                var old_element = this._SfNewC.querySelector('.button-new');
                var new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);
                this._SfNewC.querySelector('.button-new').addEventListener('click', () => {
                    this._SfNewC.querySelector('.button-new').style.display = 'none';
                    this._SfNewC.querySelector('.button-submit').style.display = 'inline';
                    this._SfNewC.querySelector('.button-cancel').style.display = 'inline';
                    this._SfNewC.querySelector('.input-new').style.display = 'inline';
                });
                old_element = this._SfNewC.querySelector('.button-cancel');
                new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);
                this._SfNewC.querySelector('.button-cancel').addEventListener('click', () => {
                    this._SfNewC.querySelector('.button-new').style.display = 'inline';
                    this._SfNewC.querySelector('.button-submit').style.display = 'none';
                    this._SfNewC.querySelector('.button-cancel').style.display = 'none';
                    this._SfNewC.querySelector('.input-new').style.display = 'none';
                });
                old_element = this._SfNewC.querySelector('.input-new');
                new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);
                this._SfNewC.querySelector('.input-new').addEventListener('keyup', () => {
                    const name = this._SfNewC.querySelector('.input-new').value;
                    if (Util.validateName(name)) {
                        this._SfNewC.querySelector('.button-submit').removeAttribute('disabled');
                    }
                    else {
                        this._SfNewC.querySelector('.button-submit').setAttribute('disabled', true);
                    }
                });
                old_element = this._SfNewC.querySelector('.button-submit');
                new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);
                this._SfNewC.querySelector('.button-submit').addEventListener('click', async () => {
                    this.clearMessages();
                    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                    const xhr = (await this.prepareXhr({ "name": this._SfNewC.querySelector('.input-new').value }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/create", this._SfLoader, authorization));
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
                        setTimeout(() => {
                            this.clearMessages();
                        }, 5000);
                    }
                });
            }
            else {
                var innerHTML = '';
                innerHTML += '<option value="noselect" ' + ((this.selectedId == null || this.selectedId.length === 0) ? 'selected' : '') + ' disable hidden>Select</option>';
                for (var i = 0; i < values.length; i++) {
                    if (this.removedValues.includes(values[i].id))
                        continue;
                    if (this.selectedId != null && this.selectedId.length > 0) {
                        if (this.selectedId.includes(values[i].id)) {
                            innerHTML += '<option value="' + values[i].id + '" selected>' + values[i].name + '</option>';
                            console.log('dispatching event', { newValue: values[i].id, newText: values[i].name });
                            this.dispatchMyEvent("valueChanged", { newValue: values[i].id, newText: values[i].name });
                            continue;
                        }
                        else {
                            innerHTML += '<option value="' + values[i].id + '">' + values[i].name + '</option>';
                        }
                    }
                    else {
                        innerHTML += '<option value="' + values[i].id + '">' + values[i].name + '</option>';
                    }
                }
                this._sfSelect.innerHTML = innerHTML;
                console.log('renderlist', innerHTML);
                this.dispatchMyEvent("renderComplete", {});
            }
        };
        this.onChangeSelect = (ev) => {
            this.dispatchMyEvent("valueChanged", { newValue: ev.target.value, newText: ev.target.options[ev.target.selectedIndex].text });
        };
        this.fetchList = async () => {
            console.log('pop list');
            const retVals = [];
            var retString = "";
            const xhr = (await this.prepareXhr({}, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, null));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                const values = jsonRespose.data.values;
                for (var i = 0; i < values.length; i++) {
                    if (this.selectedId != null && this.selectedId.length > 0) {
                        if (this.selectedId.includes(values[i].id)) {
                            retVals.push(values[i].name);
                            continue;
                        }
                    }
                }
            }
            console.log('returning ', retVals);
            for (var i = 0; i < retVals.length; i++) {
                retString += retVals[i];
                if (i < retVals.length - 1) {
                    retString += '; ';
                }
            }
            return retString;
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
            var _a;
            console.log('mode', this.mode);
            if (this.flow == "read") {
                this._sfSelect.setAttribute("disabled", true);
            }
            else {
                (_a = this._sfSelect) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
            }
        };
        this.loadMode = async () => {
            if (this.mode == "text") {
                this.selectedTextPhrase = await this.fetchList();
            }
            else {
                this.populateList();
                this.initState();
            }
        };
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        console.log('rendering ', this.apiId, this.mode);
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button part="button" class="button-new">New</button>
              <input part="input" class="input-new hide" type="text" placeholder="Name ..."/>&nbsp;&nbsp;&nbsp;&nbsp;
              <button part="button" class="button-cancel hide">Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button part="button" class="button-submit hide" disabled>Submit</button>
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
        else if (this.mode == "text") {
            return html `
        <div class="SfISelectC">
          <div>${this.selectedTextPhrase}<div class="loader-element"></div></div>
        </div>
      `;
        }
        else if (this.mode == "multi") {
            return html `
        <div class="SfISelectC">
          <label part="input-label">${this.label}</label>
          <div>
            <select part="input-select-multi" id="input-select" @change="${this.onChangeSelect}" multiple>
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      `;
        }
        else {
            return html `
        <div class="SfISelectC">
          <label part="input-label">${this.label}</label>
          <div>
            <select part="input-select" id="input-select" @change="${this.onChangeSelect}">
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

    .table-action-button {
      margin-left: 15px;
    }

    .loader-element {
    }

    .lds-dual-ring {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 15px;
      height: 15px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 15px;
      height: 15px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
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
      border-bottom: solid 1px #aaa
    }

    .SfISelectCAdmin td {
      border-bottom: solid 1px #aab
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
], SfISelect.prototype, "flow", void 0);
__decorate([
    property()
], SfISelect.prototype, "selectedId", void 0);
__decorate([
    property()
], SfISelect.prototype, "removedValues", void 0);
__decorate([
    property()
], SfISelect.prototype, "selectedTextPhrase", void 0);
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
    query('#input-select')
], SfISelect.prototype, "_SfInputSelect", void 0);
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