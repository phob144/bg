export class ArrayUtil {
    public static combine<T>(first: Array<Array<T>>, second: Array<Array<T>>): Array<Array<T>> {
        let result = new Array<Array<T>>();

        for (let i = 0; i < first.length; i++) {
            for (let j = 0; j < second.length; j++) {
                result.push(first[i].concat(second[j]));
            }
        }

        return result;
    }

    // nie wiem czy działa
    public static clone<T>(arr: Array<Array<T>>): Array<Array<T>> {
        let result = new Array<Array<T>>();

        for (let i = 0; i < arr.length; i++) {
            let row = new Array<T>();

            for (let j = 0; j < arr[i].length; j++) {
                row.push(arr[i][j]);
            }

            result.push(row);
        }

        return result;
    }

    // public getNeighbors<T>(arr: Array<Array<T>>, x: number, y: number): Array<T> {
    //     let result = new Array<T>();

    //     let width = arr.length;
    //     let height = arr[0].length;

    //     if (x - 1 >= 0) {
    //         result.push(arr[x - 1][y]);
    //     }

    //     if (x + 1 < width) {
    //         result.push(arr[x + 1][y]);
    //     }

    //     if (y - 1 >= 0) {
    //         result.push(arr[x][y - 1]);
    //     }

    //     if (y + 1 < height) {
    //         result.push(arr[x][y + 1]);
    //     }

    //     return result;
    // }
}
