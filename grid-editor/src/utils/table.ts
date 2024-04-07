export type TableCellDataType = 'text' | 'number' | 'date' | 'checkbox' | 'dropdown' | 'select'

export const SETTINGS = {
  licenseKey: 'non-commercial-and-evaluation'
}

export interface ColumnDefs {
  headerName: string
  field: string
  editable: boolean
  width: number
  cellDataType?: TableCellDataType
  cellEditor?: string
  cellEditorParams?: any
}


interface TableSize {
  row: number
  col: number
}

export class TableOptions {
  constructor(size: TableSize, type: TableCellDataType = 'text') {
    this.size = size
    this.type = type
  }
  private size: TableSize
  private type: TableCellDataType
  private generateColumnDefs = (type: TableCellDataType = 'text') => {
    let columnDefs: ColumnDefs[] = []
    for (let i = 0; i <= this.size.col; i++) {
      if (type === 'select') {
        columnDefs.push({ headerName: !!i ? `C${i}` : ``, field: `C${i}`, editable: !!i, width: 60, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['', '🖨️', '🤖'] } })
      } else {
        columnDefs.push({ headerName: !!i ? `C${i}` : ``, field: `C${i}`, editable: !!i, width: 60, cellDataType: !!i ? type : 'text' })
      }
    }
    return columnDefs
  }
  private getFields = (columnDefs: ColumnDefs[]) => {
    return columnDefs.map(col => col.field)
  }
  private generateRowData = (columnDefs: ColumnDefs[]): any[] => {
    let _rowData = []
    const fields = this.getFields(columnDefs)
    let row: { [key: typeof fields[number]]: string } = {}
    fields.forEach(field => {
      row[field] = ''
    })
    for (let i = 0; i < this.size.row; i++) {
      let _row = JSON.parse(JSON.stringify(row))
      _row[fields[0]] = `R${i + 1}`
      _rowData.push(_row)
    }
    return _rowData
  }
  getOptions = () => {
    const columnDefs = this.generateColumnDefs(this.type)
    const rowData = this.generateRowData(columnDefs)
    return {
      columnDefs,
      rowData
    }
  }
}