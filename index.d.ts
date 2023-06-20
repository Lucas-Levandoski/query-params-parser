import { URLSearchParams } from "url";

declare function parseParams <obj>(baseObject: obj, params?: URLSearchParams, arrSeparator?: string): Partial<obj>
// export as default
export = parseParams;

export declare function parseByType <obj>(variable: string, property: obj, arrSeparator: string): obj;
export declare function stringToBoolean (stringValue: string): bool;