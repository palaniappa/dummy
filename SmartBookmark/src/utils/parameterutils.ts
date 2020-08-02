import { Parameters } from "../model/parameter";

export class ParameterUtil {

    public static readonly PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
    public static readonly PARAM_TYPE_JS_VALUE = "$Js";
    public static readonly PARAM_TYPE_SEPARATOR = ":";

    public static getResolvedUrl(url: string, parameters: Parameters, currentTab: chrome.tabs.Tab): string {
        let resolvedUrl: string = url;
        if (parameters) {
            parameters.items.forEach(p => {
                let paramValue = this.getRuntimeParamValue(p.value, currentTab);
                resolvedUrl = this.substituteValue(resolvedUrl, p.key, paramValue)
            });
        }
        return resolvedUrl;
    }

    public static getFormattedParamName(paramName: string): string {
        return "{{" + paramName + "}}";
    }

    public static getRuntimeParamValue(paramValue: string, currentActiveTab: chrome.tabs.Tab): string {
        if (paramValue.indexOf(ParameterUtil.PARAM_TYPE_SEPARATOR) > 0) {
            let items = paramValue.split(ParameterUtil.PARAM_TYPE_SEPARATOR);
            let paramValueType = items[0];
            let computedValue = items[1];
            if (paramValueType == ParameterUtil.PARAM_TYPE_ACTIVE_TAB) {
                let propertyName = items[1];
                computedValue = this.getActiveTabValue(propertyName, currentActiveTab);
            }
            else if (paramValueType == ParameterUtil.PARAM_TYPE_JS_VALUE) {
                let expression = items[1];
                computedValue = eval(expression);
            }
            return computedValue;
        }
        return paramValue;
    }

    public static getActiveTabValue(variable: string, currentActiveTab: chrome.tabs.Tab) {
        let varValue = "";
        if (currentActiveTab && currentActiveTab.url) {
            let uri = new URL(currentActiveTab.url);
            varValue = uri[variable];
        }

        return varValue;
    }

    public static substituteValue(url: string, paramName: string, paramValue: string) {
        url = url.replace(this.getFormattedParamName(paramName), paramValue);
        return url;
    }
}