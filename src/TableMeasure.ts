// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class TableMeasure {

    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    /**
     * テーブルの長さを返す。
     * 
     * @param {string} direction row（行）column（列）を指定する。
     */
    private tableLength(direction: string, i: number): number {

        let endPoint: string = ''

        // 方向を判定する。
        if (direction === 'row') {
            endPoint = this.sheet.getRange(i, 1).getValue()

        } else if (direction === 'column') {
            endPoint = this.sheet.getRange(1, i).getValue()
        }

        // 区切りを判定する。
        if (endPoint === '-') {
            return i
        }
        i ++
        // 回帰処理
        return this.tableLength(direction, i)
    }

    public getPostInfo(): {[name: string]: number} {

        // Post
        const fromPost: number = 2 // Post 1行目までの行数
        const toPostPoint: number = this.tableLength('row', fromPost) - 1 // Post 1行目から区切りまでの行数
        const numPost: number = toPostPoint - 1 // ポスト数

        console.log('toPostPoint: ' + toPostPoint + ' numPoist: ' + numPost)

        return {
            fromPost: fromPost,
            toPostPoint: toPostPoint,
            numPost: numPost
        }
    }

    public getItemsInfo(): {[name: string]: number} {

        const postInfo = this.getPostInfo()

        // Items
        const fromItems: number = postInfo['toPostPoint'] + postInfo['fromPost'] // Items 1行目までの行数
        const toItemsPoint: number = this.tableLength('row', fromItems) - postInfo['toPostPoint'] - 1 // Items 1行目から区切りまでの行数

        console.log('fromItems: ' + fromItems + ' toItemsPoint: ' + toItemsPoint)

        return {
            fromItems: fromItems,
            toItemsPoint: toItemsPoint
        }
    }

    public getTableInfo(): {[name: string]: number} {

        // Table
        const toTableWidthPoint: number = this.tableLength('column', 1) // 1列目から区切りまでの列数
        const tableWidth = toTableWidthPoint - 1 // 1列目から区切り前までの列数

        return {
            tableWidth: tableWidth
        }
    }
}