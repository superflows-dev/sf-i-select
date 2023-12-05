/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
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
export declare class SfISelect extends LitElement {
    apiId: string;
    label: string;
    name: string;
    mode: string;
    flow: string;
    selectedId: string[];
    removedValues: string[];
    selectedTextPhrase: string;
    searchPhrase: string;
    getPreselectedValues: () => string[];
    selectedIndex: () => number;
    selectedValues: () => any[];
    selectedTexts: () => any[];
    static styles: import("lit").CSSResult;
    _sfSelect: any;
    _SfLoader: any;
    _SfTableC: any;
    _SfNewC: any;
    _SfInputNew: any;
    _SfInputSelect: any;
    _SfSearchMultiselectSelect: any;
    _SfSearchMultiselectInput: any;
    _SfSearchMultiselectDelete: any;
    _SfSearchMultiselectSelected: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    clearMessages: () => void;
    clearSelection: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    dispatchMyEvent: (ev: string, args?: any) => void;
    removeItemByValue: (value: string) => void;
    renderList: (values: Array<any>) => void;
    onChangeSelect: (ev: any) => void;
    fetchList: () => Promise<string>;
    populateList: () => Promise<void>;
    initState: () => Promise<void>;
    constructor();
    completeSelect: () => void;
    renderSearchMultiselect: (values: Array<any>, searchString: string) => void;
    fetchSearchMultiselect: () => Promise<void>;
    initListenersMultiselect: () => void;
    checkIfAlreadySelected: (value: string) => boolean;
    populatePreselected: () => void;
    loadMode: () => Promise<void>;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-select': SfISelect;
    }
}
//# sourceMappingURL=sf-i-select.d.ts.map