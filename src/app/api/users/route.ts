import { NextResponse } from 'next/server'

export async function GET() {
  const data = { users: ['exemple', 'fou', 'barre']}
  return NextResponse.json(data)
}
