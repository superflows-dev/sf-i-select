/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
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
export declare class SfISelect extends LitElement {
    apiId: string;
    label: string;
    name: string;
    mode: string;
    selectedId: string;
    static styles: import("lit").CSSResult;
    _sfSelect: any;
    _SfLoader: any;
    _SfTableC: any;
    _SfNewC: any;
    _SfInputNew: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    submitNew: () => void;
    renderList: (values: Array<any>) => void;
    populateList: () => Promise<void>;
    initState: () => Promise<void>;
    constructor();
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