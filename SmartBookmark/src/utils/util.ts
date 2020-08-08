export class Util {

    public static getUniqueId(prefix: string): string {
        return prefix + "_" + Math.floor(Math.random() * Date.now()).toString();
    } 
}