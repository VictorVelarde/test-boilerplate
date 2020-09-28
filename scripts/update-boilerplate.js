'use strict'
/**
 * UPDATE BOILERPLATE
 *
 * npm run update:boilerplate -- --directory <root> --version <commit|release>
 * example: npm run update:boilerplate -- --directory www --version 2c2f35
 *
 */
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const pkg = require('../package.json')

const BOILERPLATE_VERSION = pkg['boilerplate-version']
const PATCH_NAME = 'update'
const BOILERPLATE_FOLDER_NAME = 'boilerplate-patch'
const DEFAULT_VERSION = 'master'

async function init () {
  const gitRepoName = 'www-boilerplate'
  const gitRepoUrl = 'git@github.com:CartoDB/www-boilerplate.git'
  const gitRepoPath = path.join(process.cwd(), BOILERPLATE_FOLDER_NAME, gitRepoName)
  const args = process.argv.slice(2)
  const directoryIndex = args.findIndex(a => a === '--directory') + 1
  const versionIndex = args.findIndex(a => a === '--version') + 1

  const DIRECTORY = directoryIndex ? `--directory=${args[directoryIndex]}` : ''
  const VERSION = versionIndex ? args[versionIndex] : DEFAULT_VERSION

  createFolder(BOILERPLATE_FOLDER_NAME, process.cwd())
  removeFolder(gitRepoPath)
  cloneRepo(gitRepoUrl, gitRepoPath)
  gitCreatePatch(gitRepoPath, VERSION)
  gitApplyPatch(gitRepoPath, DIRECTORY)
}

function createFolder (name, destination = './') {
  fs.mkdirSync(path.join(destination, name), { recursive: true })
}

function cloneRepo (repo, path) {
  // eslint-disable-next-line no-console
  console.log(`git clone ${repo} ${path}`)
  execSync(`git clone ${repo} ${path}`, {})
}

function removeFolder (destination) {
  fs.rmdirSync(destination, { recursive: true })
}

function gitCreatePatch (path, version) {
  // exec('ls', { cwd: path }, (err, stdout, stderr) => callback(err, stdout, stderr))
  // exec('git status', { cwd: path }, (err, stdout, stderr) => callback(err, stdout, stderr))
  // eslint-disable-next-line no-console
  console.log(`git diff ${BOILERPLATE_VERSION} ${version}`)
  const result = execSync(`git diff ${BOILERPLATE_VERSION} ${version}`, { cwd: path, maxBuffer: 2048 * 2048 })
  createPatch(path, result.toString())
  // eslint-disable-next-line no-console
  console.log('Patch created.\n Now, trying to apply')
}

function gitApplyPatch (_path, directory) {
  let error = false
  try {
    // eslint-disable-next-line no-console
    console.log(`git apply --check --apply --reject ${_path}/${PATCH_NAME}.patch ${directory} --exclude Dockerfile --exclude package-lock.json --exclude *.png`)
    execSync(`git apply --check --apply --reject ${_path}/${PATCH_NAME}.patch ${directory} --exclude Dockerfile --exclude package-lock.json --exclude *.png`)
    // eslint-disable-next-line no-console
    console.log('Success!')
  } catch (e) {
    error = true
    // eslint-disable-next-line no-console
    console.error('Creating log....\n `.rej` files have been created')
    fs.writeFileSync('update-error.log', e.stderr.toString())
  } finally {
    const p = path.join(process.cwd(), BOILERPLATE_FOLDER_NAME)
    fs.rmdirSync(p, { recursive: true })
    process.exit(error ? 1 : 0)
  }
}

function createPatch (path, patch) {
  return fs.writeFileSync(`${path}/${PATCH_NAME}.patch`, patch)
}

init()
