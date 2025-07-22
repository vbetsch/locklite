import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  const filePath = join(process.cwd(), 'src/swagger/swagger.json')
  const data = await readFile(filePath, 'utf-8')
  const json = JSON.parse(data)
  return NextResponse.json(json)
}
