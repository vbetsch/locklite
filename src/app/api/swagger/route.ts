import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const filePath = join(process.cwd(), 'src/swagger/swagger.json')
  const data = readFileSync(filePath, 'utf-8')
  const json = JSON.parse(data)
  return NextResponse.json(json)
}
