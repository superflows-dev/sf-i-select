declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare const exportFunctions: {
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map