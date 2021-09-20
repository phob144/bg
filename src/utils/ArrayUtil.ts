export class ArrayUtil {
    public static contains<T>(arr: T[][], search: T): boolean {
        return arr.some((row) => row.indexOf(search) != -1);
    }

    public static containsAny<T>(arr: T[][], search: T[]): boolean {
        for (let i = 0; i < search.length; i++) {
            if (arr.some((row) => row.indexOf(search[i]) != -1)) {
                return true;
            }
        }

        return false;
    }
}
