import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST() {
  // Note: Access control is handled by GrowthBook feature flag on the client side
  // The UI won't render the controls unless demo-controls-enabled flag is true

  try {
    const { stdout, stderr } = await execAsync('bash scripts/create-demo.sh', {
      cwd: process.cwd(),
      timeout: 60000, // 60 second timeout
      env: { ...process.env, FORCE_COLOR: '0' }, // Disable color codes for cleaner output
    })

    const output = stdout + (stderr ? `\n${stderr}` : '')

    // Check if the output contains success indicators
    const success = output.includes('Demo setup complete') || output.includes('Branch pushed successfully')

    return NextResponse.json({
      success,
      output: cleanOutput(output),
    })
  } catch (error: any) {
    const output = error.stdout || error.stderr || error.message
    return NextResponse.json({
      success: false,
      output: cleanOutput(output),
      error: error.message,
    })
  }
}

// Remove ANSI color codes and clean up output
function cleanOutput(text: string): string {
  return text
    .replace(/\x1b\[[0-9;]*m/g, '') // Remove ANSI color codes
    .replace(/\[0m|\[31m|\[32m|\[33m|\[1;33m/g, '') // Remove remaining color codes
    .trim()
}
