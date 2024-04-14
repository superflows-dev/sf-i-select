/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
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
@customElement('sf-i-select')
export class SfISelect extends LitElement {

  @property()
  apiId!: string;

  @property()
  label!: string;

  @property()
  name!: string;

  @property()
  mode!: string;

  @property()
  flow!: string;

  @property()
  selectedId: string[] = [];

  @property()
  removedValues: string[] = [];

  @property()
  selectedTextPhrase: string = "";

  @property()
  searchPhrase!: string;

  getPreselectedValues = () => {

    return this.selectedId;

  }

  selectedIndex = () => {

    let index = 0;

    const len = this._SfInputSelect.options.length;
    for (var i = 0; i < len; i++) {
      const opt = this._SfInputSelect.options[i];
      if (opt.selected && opt.value != "noselect") {
        index = i;
      }
    }

    return index;

  }
  
  selectedValues = () => {

    if(this.mode == "multiselect-dropdown") {

      const values = [];

      var divArr = (this._SfSearchMultiselectSelected as HTMLDivElement).querySelectorAll('div');

      for(var i = 0; i < divArr.length; i++) {

        values.push(divArr[i].innerHTML);

      }

      return values;

    } else {

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

    }
  }

  selectedTexts = () => {

    if(this.mode == "multiselect-dropdown") {

      const values = [];

      var divArr = (this._SfSearchMultiselectSelected as HTMLDivElement).querySelectorAll('div');

      for(var i = 0; i < divArr.length; i++) {

        values.push(divArr[i].innerHTML);

      }

      return values;

    } else {

      const values = [];

      const len = this._SfInputSelect.options.length;
      for (var i = 0; i < len; i++) {
        const opt = this._SfInputSelect.options[i];
        if (opt.selected && opt.value != "noselect") {
          values.push(this._SfInputSelect.options[i].text)
        }
      }
  
      return values;
    }


  }

  static override styles = css`
    
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

    .align-start {
      align-items: start;
    }

    .badge-multiselected {
      font-size: 70%;
      padding: 5px;
      border-radius: 10px;
      border: solid 1px #dddddd;
      white-space: nowrap;
      overflow: hidden !important;
      width: 50px;
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

  @query('.SfISelectC select')
  _sfSelect: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('.tableC')
  _SfTableC: any;

  @query('.newC')
  _SfNewC: any;

  @query('.input-new')
  _SfInputNew: any;

  @query('#input-select')
  _SfInputSelect: any;


  @query('#search-multiselect-select')
  _SfSearchMultiselectSelect: any;

  @query('#search-multiselect-input')
  _SfSearchMultiselectInput: any;

  @query('#search-multiselect-delete')
  _SfSearchMultiselectDelete: any;

  @query('#search-multiselect-selected')
  _SfSearchMultiselectSelected: any;

  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;


  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  clearSelection = () => {
    if(this._SfInputSelect != null) { 
      this._SfInputSelect.value = 'noselect'
    }
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  dispatchMyEvent = (ev: string, args?: any) => {

    const event = new CustomEvent(ev, {detail: args, bubbles: true, composed: true});
    this.dispatchEvent(event);

  }

  removeItemByValue = (value: string) => {

    if(!this.removedValues.includes(value)) {
      this.removedValues.push(value);
    }
    console.log('removedvalues', this.removedValues);

  }

  renderList = (values: Array<any>) => {

    if(this.mode == "admin") {

      var innerHTML = '';

      innerHTML = '<table><tr><th part="td-head">Id</th><th part="td-head">Name</th><th part="td-head">Action</th></tr>'

      for(var i = 0; i < values.length; i++) {

        innerHTML += '<tr>';
        innerHTML += '<td part="td-body" class="tcId">';
        innerHTML += values[i].id;
        innerHTML += '</td>';
        innerHTML += '<td part="td-body" class="tcName">';
        innerHTML += '<span id="text-'+values[i].id+'">' + values[i].name + '</span>';
        innerHTML += '<input part="input" class="hide" id="input-'+values[i].id+'" type="text" value="'+values[i].name+'" />';
        innerHTML += '</td>';
        innerHTML += '<td part="td-action" class="tcActions">';
        innerHTML += '<button part="button" class="table-action-button" id="edit-'+values[i].id+'">Edit</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="cancel-'+values[i].id+'" >Cancel</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="submit-'+values[i].id+'" >Submit</button>';
        innerHTML += '<button part="button" class="table-action-button" id="delete-'+values[i].id+'">Delete</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="canceld-'+values[i].id+'" >Cancel</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="confirm-'+values[i].id+'" >Confirm Delete</button>';
        innerHTML += '</td>';
        innerHTML += '</tr>';

      }

      this._SfTableC.innerHTML = innerHTML;

      for(var i = 0; i < values.length; i++) {
        this._SfTableC.querySelector('#edit-'+values[i].id+'').addEventListener('click', (event: any)=> {
          const id = event.target?.id.replace('edit-', '');
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#delete-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#text-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#cancel-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#submit-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#input-'+id+'').style.display = 'inline';
        })
        this._SfTableC.querySelector('#cancel-'+values[i].id+'').addEventListener('click', (event: any)=> {
          const id = event.target?.id.replace('cancel-', '');
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#delete-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#text-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#cancel-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#submit-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#input-'+id+'').style.display = 'none';
        })
        this._SfTableC.querySelector('#input-'+values[i].id+'').addEventListener('keyup', (event: any)=> {
          const id = event.target?.id.replace('input-', '');
          const name = event.target.value;
          if(Util.validateName(name)) {
            this._SfTableC.querySelector('#submit-'+id+'').removeAttribute('disabled');
          } else {
            this._SfTableC.querySelector('#submit-'+id+'').setAttribute('disabled', true);
          }
        });
        this._SfTableC.querySelector('#confirm-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          this.clearMessages();
          const id = event.target?.id.replace('confirm-', '');
          const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
          const xhr : any = (await this.prepareXhr({"id": id}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/delete", this._SfLoader, authorization)) as any;
          this._SfLoader.innerHTML = '';
          if(xhr.status == 200) {
            this.setSuccess('Operation Successful!');
            setTimeout(() => {
              this.clearMessages();
              this._SfNewC.querySelector('.input-new').value = "";
              this.populateList();
            }, 1000);
            
          } else {
            const jsonRespose = JSON.parse(xhr.responseText);
            this.setError(jsonRespose.error);
            setTimeout(() => { 
              this.clearMessages();
            }, 5000);
          }
        });
        this._SfTableC.querySelector('#delete-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          const id = event.target?.id.replace('delete-', '');
          event.target.style.display = 'none';
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#confirm-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#canceld-'+id+'').style.display = 'inline';
          
        });
        this._SfTableC.querySelector('#canceld-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          const id = event.target?.id.replace('canceld-', '');
          event.target.style.display = 'none';
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#delete-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#confirm-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#canceld-'+id+'').style.display = 'none';
          
        });
        this._SfTableC.querySelector('#submit-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          this.clearMessages();
          const id = event.target?.id.replace('submit-', '');
          const name = this._SfTableC.querySelector('#input-'+id+'').value;
          const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
          const xhr : any = (await this.prepareXhr({"name": name, "id": id}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/update", this._SfLoader, authorization)) as any;
          this._SfLoader.innerHTML = '';
          if(xhr.status == 200) {
            this.setSuccess('Operation Successful!');
            setTimeout(() => {
              this.clearMessages();
              this._SfNewC.querySelector('.input-new').value = "";
              this.populateList();
            }, 1000);
            
          } else {
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

      this._SfNewC.querySelector('.button-new').addEventListener('click', ()=> {
        this._SfNewC.querySelector('.button-new').style.display = 'none';
        this._SfNewC.querySelector('.button-submit').style.display = 'inline';
        this._SfNewC.querySelector('.button-cancel').style.display = 'inline';
        this._SfNewC.querySelector('.input-new').style.display = 'inline';
      })

      old_element = this._SfNewC.querySelector('.button-cancel');
      new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);

      this._SfNewC.querySelector('.button-cancel').addEventListener('click', ()=> {
        this._SfNewC.querySelector('.button-new').style.display = 'inline';
        this._SfNewC.querySelector('.button-submit').style.display = 'none';
        this._SfNewC.querySelector('.button-cancel').style.display = 'none';
        this._SfNewC.querySelector('.input-new').style.display = 'none';
      })

      old_element = this._SfNewC.querySelector('.input-new');
      new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);

      this._SfNewC.querySelector('.input-new').addEventListener('keyup', ()=> {
        const name = this._SfNewC.querySelector('.input-new').value;
        if(Util.validateName(name)) {
          this._SfNewC.querySelector('.button-submit').removeAttribute('disabled');
        } else {
          this._SfNewC.querySelector('.button-submit').setAttribute('disabled', true);
        }
      });

      old_element = this._SfNewC.querySelector('.button-submit');
      new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);

      this._SfNewC.querySelector('.button-submit').addEventListener('click', async ()=> {

        this.clearMessages();
        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        const xhr : any = (await this.prepareXhr({"name": this._SfNewC.querySelector('.input-new').value}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/create", this._SfLoader, authorization)) as any;
        this._SfLoader.innerHTML = '';
        if(xhr.status == 200) {
          this.setSuccess('Operation Successful!');
          setTimeout(() => {
            this.clearMessages();
            this._SfNewC.querySelector('.input-new').value = "";
            this.populateList();
          }, 1000);
          
        } else {
          const jsonRespose = JSON.parse(xhr.responseText);
          this.setError(jsonRespose.error);
          setTimeout(() => { 
            this.clearMessages();
          }, 5000);
        }
        
      });
      

    } else {

      var innerHTML = '';

      innerHTML += '<option value="noselect" '+ ((this.selectedId == null || this.selectedId.length === 0) ? 'selected' : '') +' disable hidden>Select</option>'

      for(var i = 0; i < values.length; i++) {

        if(this.removedValues.includes(values[i].id)) continue;

        if(this.selectedId != null && this.selectedId.length > 0) {
          if(this.selectedId.includes(values[i].id)) {
            innerHTML += '<option value="'+values[i].id+'" selected>'+values[i].name+'</option>'
            console.log('dispatching event', {newValue: values[i].id, newText: values[i].name});
            this.dispatchMyEvent("valueChanged", {newValue: values[i].id, newText: values[i].name})
            continue;
          } else {
            innerHTML += '<option value="'+values[i].id+'">'+values[i].name+'</option>'  
          }
        } else {
          innerHTML += '<option value="'+values[i].id+'">'+values[i].name+'</option>'
        }
        
      }

      this._sfSelect.innerHTML = innerHTML;
      console.log('renderlist', innerHTML);
      this.dispatchMyEvent("renderComplete", {});

    }

  }

  onChangeSelect = (ev: any) => {
    this.dispatchMyEvent("valueChanged", {newValue: ev.target.value, newText: ev.target.options[ev.target.selectedIndex].text});
  }

  fetchList = async () => {

    console.log('pop list');

    const retVals = [];
    var retString = "";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      const values = jsonRespose.data.values;
      for(var i = 0; i < values.length; i++) {

        if(this.selectedId != null && this.selectedId.length > 0) {
          if(this.selectedId.includes(values[i].id)) {
            retVals.push(values[i].name)
            continue;
          } 
        }
      }
    }
    console.log('returning ', retVals);

    for(var i = 0; i < retVals.length; i++) {
      retString += retVals[i];
      if(i < retVals.length - 1) {
        retString += '; ';
      }
    }

    return retString;
  }

  populateList = async () => {

    console.log('pop list');
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      const values = jsonRespose.data.values;
      this.renderList(values)
    }
  }

  initState = async () => {

    console.log('mode', this.mode);

      if(this.flow == "read") {
        this._sfSelect?.setAttribute("disabled", true);
      } else {
        this._sfSelect?.removeAttribute("disabled");
      }

  }

  constructor() {
    super();
  }

  completeSelect = () => {

    var found = false;

    var divArr = (this._SfSearchMultiselectSelected as HTMLDivElement).querySelectorAll('div');

    for(var i = 0; i < divArr.length; i++) {

      console.log(divArr[i], divArr[i].innerHTML)
      if(divArr[i].innerHTML == (this._SfSearchMultiselectSelect as HTMLSelectElement)!.value) {
        found = true;
      }

    }

    if(!found) {

      var html = '';
      html += '<div part="badge-multiselected" class="badge-multiselected">'+(this._SfSearchMultiselectSelect as HTMLSelectElement)!.value+'</div>';
      (this._SfSearchMultiselectSelected as HTMLDivElement).insertAdjacentHTML('beforeend', html);
      (this._SfSearchMultiselectInput as HTMLInputElement).value = '';
      (this._SfSearchMultiselectInput as HTMLInputElement).focus();
      (this._SfSearchMultiselectSelect as HTMLSelectElement).selectedIndex = 0;
      (this._SfSearchMultiselectSelect as HTMLSelectElement).style.display = 'none';
      (this._SfSearchMultiselectDelete as HTMLSelectElement).style.display = 'flex';
      this.dispatchMyEvent("valueChanged", {});
  
    }

  }

  renderSearchMultiselect = (values: Array<any>, searchString: string) => {

    var html = '';

    html += '<option value="noselect">Select</option>';

    for(var i = 0; i < values.length; i++) {

      const id = values[i].id;
      const name = values[i].name;

      if(name.indexOf(searchString.trim()) >= 0) {
        html += '<option value="'+name+';'+id+'">'+name+'</option>';
      }

    }

    (this._SfSearchMultiselectSelect as HTMLSelectElement)!.innerHTML = html;

  }


  fetchSearchMultiselect = async () => {

    this.clearMessages();

    const searchString = (this._SfSearchMultiselectInput as HTMLInputElement).value;
    const body: any = {};
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('multiselected', jsonRespose);
      this.renderSearchMultiselect(jsonRespose.data.values, searchString);
      //this.renderSearch(jsonRespose.values, jsonRespose.found, jsonRespose.cursor);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }


  initListenersMultiselect = () => {

    (this._SfSearchMultiselectInput as HTMLInputElement)!.addEventListener('keyup', () => {

      (this._SfSearchMultiselectSelect as HTMLSelectElement)!.style.display = 'block';  
      this.fetchSearchMultiselect();

    });

    (this._SfSearchMultiselectSelect as HTMLSelectElement)!.addEventListener('change', () => {
      console.log('change');
      const value = (this._SfSearchMultiselectSelect as HTMLSelectElement)!.value;
      if(value != "" && value != "noselect") {
        this.completeSelect();
      }
    });

    (this._SfSearchMultiselectDelete as HTMLSelectElement)!.addEventListener('click', () => {
      (this._SfSearchMultiselectSelected as HTMLDivElement)!.innerHTML = '';
      (this._SfSearchMultiselectDelete as HTMLSelectElement)!.style.display = 'none';
      this.dispatchMyEvent("valueChanged", {});
    });

  }

  checkIfAlreadySelected = (value :string) => {

    const arrSelected = (this._SfSearchMultiselectSelected as HTMLDivElement).querySelectorAll('div') as NodeListOf<HTMLDivElement>;

    for(var i = 0; i < arrSelected.length; i++) {

      if(arrSelected[i].innerHTML == value) {
        return true;
      }

    }

    return false;
  }

  populatePreselected = () => {

    (this._SfSearchMultiselectSelected as HTMLDivElement).innerHTML = '';

    for(var i = 0; i < (this.getPreselectedValues() as Array<any>).length; i++) {

      if(!this.checkIfAlreadySelected(this.getPreselectedValues()[i])) {
        var html = '';
        html += '<div part="badge-multiselected" class="badge-multiselected">'+this.getPreselectedValues()[i]+'</div>';
        (this._SfSearchMultiselectSelected as HTMLDivElement).insertAdjacentHTML('beforeend', html);
      }

    }

    console.log((this._SfSearchMultiselectSelected as HTMLDivElement)!.innerHTML);

    if((this.getPreselectedValues() as Array<any>).length > 0) {
      (this._SfSearchMultiselectDelete as HTMLSelectElement)!.style.display = 'flex';
    } else {
      (this._SfSearchMultiselectDelete as HTMLSelectElement)!.style.display = 'none';
    }

  }

  loadMode = async () => {

    if(this.mode == "multiselect-dropdown") {
      setTimeout(() => {
        this.initListenersMultiselect();
        this.populatePreselected();
      }, 500)
    } else if(this.mode == "text") {
      this.selectedTextPhrase = await this.fetchList();
    } else {
      this.populateList();
      this.initState();
    }

  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.loadMode();
  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    console.log('rendering ', this.apiId, this.mode);

    if(this.mode == "multiselect-dropdown") {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfISelectCAdmin">
          <label part="input-label">${this.label}</label>
          <div>
            <div class="d-flex justify-center align-start flex-wrap">
              <div class="d-flex" id="search-multiselect-selected"></div>
              <div part="button-icon-small" class="d-flex hide material-icons color-gray pointer" id="search-multiselect-delete">delete</div>
              <div class="d-flex flex-col">
                <input part="input" id="search-multiselect-input" type="text" />
                <select part="input-select" id="search-multiselect-select" class="hide"></select>
              </div>
            </div>
          </div>
          <div class="loader-element"></div>
          <div class="d-flex justify-between">
            <div class="lb"></div>
            <div>
              <div class="div-row-error div-row-submit gone">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit gone">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
            </div>
            <div class="rb"></div>
          </div>
        </div>

        `;

    } else if(this.mode == "admin") {

      return html`
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

    } else if(this.mode == "text") {

      return html`
        <div class="SfISelectC">
          <div>${this.selectedTextPhrase}<div class="loader-element"></div></div>
        </div>
      `;
    } else if(this.mode == "multi") {

      return html`
        <div class="SfISelectC">
          <label part="input-label">${this.label}</label>
          <div>
            <select part="input-select-multi" id="input-select" @change="${this.onChangeSelect}" multiple>
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      `;
    } else {

      return html`
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

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-select': SfISelect;
  }
}
