// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// class
import TableMeasure from '@/TableMeasure'

export default class FormCreator {

    private sheet: Spreadsheet.Sheet
    private tableMeasure: TableMeasure

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
        this.tableMeasure = new TableMeasure()
    }

    /**
     * 入力欄を追加する。
     */
    private create(toPostPoint: number, tableWidth: number) {

        // post を1行追加する。
        this.sheet.insertRowAfter(toPostPoint)

        const FUNCTIONS = [
            '=IF(INDIRECT(ADDRESS(ROW(), COLUMN() + 1, 4)) = "", "", GOOGLEFINANCE(INDIRECT(ADDRESS(ROW(), COLUMN() + 1, 4)), "name"))',
            '=IF(ROW() = 2, IF(INDIRECT(ADDRESS(ROW(), COLUMN() - 1, 4)) = "", "", INDIRECT(ADDRESS(ROW() + 2, COLUMN(), 4)) + INDIRECT(ADDRESS(ROW(), COLUMN() - 1, 4))), IF(INDIRECT(ADDRESS(ROW() + 1, COLUMN(), 4)) = "", IF(INDIRECT(ADDRESS(ROW(), COLUMN()　-1, 4)) = "", "", INDIRECT(ADDRESS(ROW(), COLUMN()　- 1, 4))), IF(INDIRECT(ADDRESS(ROW(), COLUMN()　-1, 4)) = "", INDIRECT(ADDRESS(ROW() + 1, COLUMN(), 4)) - INDIRECT(ADDRESS(ROW(), COLUMN() - 3, 4)), INDIRECT(ADDRESS(ROW() + 1, COLUMN(), 4)) + INDIRECT(ADDRESS(ROW(), COLUMN()　-1, 4)))))'
        ]

        // 追加した行のセルに関数を書き込む。
        this.sheet.getRange(toPostPoint + 1, 1, 1, tableWidth).setValues([[FUNCTIONS[0], '', '', '', '', '', FUNCTIONS[1]]])
    }

    public main () {

        const postInfo: {[name: string]: number} = this.tableMeasure.getPostInfo()
        const tableInfo: {[name: string]: number} = this.tableMeasure.getTableInfo()

        this.create(postInfo['toPostPoint'], tableInfo['tableWidth'])
    }
}