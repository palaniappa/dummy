import { tsParameterProperty } from "@babel/types";

interface Parameter {
    key: string;
    value: string;
}

interface Parameters {
    items: Array<Parameter>;
}

export { Parameter, Parameters }