type CellDataType = 'text' | 'number' | 'date' | 'boolean'

export interface ColumnDefs {
  headerName: string
  field: string
  editable: boolean
  width: number
  cellDataType: CellDataType
}


interface GridSize {
  row: number
  col: number
}

export class GridOptions {
  constructor(size: GridSize, type: CellDataType = 'text') {
    this.size = size
    this.type = type
  }
  private size: GridSize
  private type: CellDataType
  private generateColumnDefs = (type: CellDataType = 'text') => {
    let columnDefs: ColumnDefs[] = []
    for (let i = 0; i <= this.size.col; i++) {
      columnDefs.push({ headerName: !!i ? `C${i}` : ``, field: `C${i}`, editable: !!i, width: 60, cellDataType: !!i ? type : 'text' })
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