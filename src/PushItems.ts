// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class PushItems {

    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    private refresh(fromPost: number, numPost: number, rowEnd: number, numTableWidth: number): void {

        const selected: Spreadsheet.Range = this.sheet.getRange(rowEnd + 1, 1, 1, numTableWidth)

        selected.copyTo(this.sheet.getRange(fromPost, 1, 1, numTableWidth))

        if (numPost > 1) {
            this.sheet.deleteRows(fromPost + 1, numPost - 1)
        }
    }

    private move(fromInfo: number[], toInfo: number[]): void {

        const selectedFromPotion: Spreadsheet.Range = this.sheet.getRange(fromInfo[0], fromInfo[1], fromInfo[2], fromInfo[3])
        const selectedToPotion: Spreadsheet.Range = this.sheet.getRange(toInfo[0], toInfo[1], toInfo[2], toInfo[3])
        selectedFromPotion.moveTo(selectedToPotion)
    }

    private tableLength(direction: string, i: number): number {

        let endPoint: string = ''

        if (direction === 'row') {
            endPoint = this.sheet.getRange(i, 1).getValue()

        } else if (direction === 'column') {
            endPoint = this.sheet.getRange(1, i).getValue()
        }

        if (endPoint === '-') {
            return i
        }
        i ++
        return this.tableLength(direction, i)
    }

    public main () {

        // Post
        const fromPost: number = 2
        const toPostPoint: number = this.tableLength('row', fromPost)
        const numPost: number = toPostPoint - fromPost

        console.log('toPostPoint: ' + toPostPoint + ' numPoist: ' + numPost)

        // Items
        const fromItems: number = toPostPoint + 1
        const toItemsPoint: number = this.tableLength('row', fromItems) - fromItems + 1

        console.log('fromItems: ' + fromItems + ' toItemsPoint: ' + toItemsPoint)

        // Table
        const toTableWidthPoint: number = this.tableLength('column', 1)
        const numTableWidth = toTableWidthPoint - 1

        this.move([fromItems, 1, toItemsPoint + 1, numTableWidth], [fromItems + numPost, 1, 1, 1])
        // Debug
        // this.sheet.getRange(fromItems, 1, toItemsPoint + 1, numTableWidth).setBackground('#000000')
        // this.sheet.getRange(fromItems + numPost, 1, 1, 1).setBackground('#aaaaaa')

        this.move([fromPost, 1, numPost, numTableWidth], [fromItems, 1, 1, 1])
        // Debug
        // this.sheet.getRange(fromPost, 1, numPost, numTableWidth).setBackground('#000000')
        // this.sheet.getRange(fromItems, 1, 1, 1).setBackground('#aaaaaa')

        const rowEnd: number = toPostPoint + toItemsPoint + numPost
        this.refresh(fromPost, numPost, rowEnd, numTableWidth)
    }
}