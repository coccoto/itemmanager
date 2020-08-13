// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class PushItems {

    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    /**
     * 移動後の残ったセルの削除など、テーブルをリフレッシュする。
     */
    private refresh(fromPost: number, numPost: number, rowEnd: number, tableWidth: number): void {

        // テンプレートを選択し貼り付ける。
        const selected = this.sheet.getRange(rowEnd, 1, 1, tableWidth)
        selected.copyTo(this.sheet.getRange(fromPost, 1))

        // 残った行を削除する。
        if (numPost > 1) {
            this.sheet.deleteRows(fromPost + 1, numPost - 1)
        }
    }

    /**
     * セルを移動する。
     */
    private move(fromInfo: number[], toInfo: number[]): void {

        // 移動元を選択
        const selectedFromPotion: Spreadsheet.Range = this.sheet.getRange(fromInfo[0], fromInfo[1], fromInfo[2], fromInfo[3])
        // 移動先を選択
        const selectedToPotion: Spreadsheet.Range = this.sheet.getRange(toInfo[0], toInfo[1], toInfo[2], toInfo[3])
        selectedFromPotion.moveTo(selectedToPotion)
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

    public main () {

        // Post
        const fromPost: number = 2 // Post 1行目までの行数
        const toPostPoint: number = this.tableLength('row', fromPost) - 1 // Post 1行目から区切りまでの行数
        const numPost: number = toPostPoint - 1 // ポスト数

        console.log('toPostPoint: ' + toPostPoint + ' numPoist: ' + numPost)

        // Items
        const fromItems: number = toPostPoint + fromPost // Items 1行目までの行数
        const toItemsPoint: number = this.tableLength('row', fromItems) - toPostPoint - 1 // Items 1行目から区切りまでの行数

        console.log('fromItems: ' + fromItems + ' toItemsPoint: ' + toItemsPoint)

        // Table
        const toTableWidthPoint: number = this.tableLength('column', 1) // 1列目から区切りまでの列数
        const tableWidth = toTableWidthPoint - 1 // 1列目から区切り前までの列数

        // Items 1行目に numPost 分の行を上に追加する。
        this.sheet.insertRowsBefore(fromItems, numPost)

        // Post の要素を Items 1行目に移動する。
        this.move([fromPost, 1, numPost, tableWidth], [fromItems, 1, 1, 1])

        // テーブルをリフレッシュする。
        const rowEnd = fromPost + toPostPoint + toItemsPoint + numPost // Items 区切り線までの行数 + 1
        this.refresh(fromPost, numPost, rowEnd, tableWidth)
    }
}