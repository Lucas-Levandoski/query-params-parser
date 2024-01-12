export declare function parseParams<obj>(baseObject: obj, params?: URLSearchParams, arrSeparator?: string): Partial<obj>
export declare function setParams(baseObject: obj, params?: URLSearchParams, arrSeparator?: string): void;
export declare function parseByType<obj>(variable: string, property: obj, arrSeparator: string): obj;
export declare function stringToBoolean(stringValue: string): boolean;