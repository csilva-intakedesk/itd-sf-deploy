import * as core from '@actions/core'
import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const ms = '1000'
    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`)

    // variables
    const DRY_RUN = core.getInput('DRY_RUN', { required: true })
    console.log(`DRY_RUN, ${DRY_RUN}!`)

    const TEST_LEVEL = core.getInput('TEST_LEVEL', { required: true })
    console.log(`TEST_LEVEL, ${TEST_LEVEL}!`)

    const TIMEOUT = core.getInput('TIMEOUT', { required: true })
    console.log(`TIMEOUT, ${TIMEOUT}!`)

    const MANIFEST_SOURCE_DIRECTORY = core.getInput(
      'MANIFEST_SOURCE_DIRECTORY',
      { required: true }
    )
    console.log(`MANIFEST_SOURCE_DIRECTORY, ${MANIFEST_SOURCE_DIRECTORY}!`)

    const MANIFEST_OUTPUT_DIRECTORY = core.getInput(
      'MANIFEST_OUTPUT_DIRECTORY',
      { required: true }
    )
    console.log(`MANIFEST_OUTPUT_DIRECTORY, ${MANIFEST_OUTPUT_DIRECTORY}!`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
