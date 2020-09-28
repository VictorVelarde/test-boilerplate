const getAddAction = ({
  path,
  folder,
  fileName,
  extension = 'js',
  templateFile,
  additionalConfig
}) => {
  const action = {
    type: 'add',
    path: `${path}/${folder ? folder + '/' : ''}${fileName}.${extension}`,
    templateFile,
    abortOnFail: true
  }
  if (additionalConfig) {
    action.data = additionalConfig
  }
  return action
}

const getModifyAction = ({
  path,
  folder,
  fileName,
  extension = 'js',
  pattern,
  template,
  templateFile,
  additionalConfig
}) => {
  const action = {
    type: 'modify',
    path: `${path}/${folder ? folder + '/' : ''}${fileName}.${extension}`,
    pattern,
    template,
    templateFile,
    abortOnFail: true
  }
  if (additionalConfig) {
    action.data = additionalConfig
  }
  return action
}

const getAppendAction = ({
  path,
  folder,
  fileName,
  extension = 'js',
  pattern,
  unique,
  separator = '\n',
  template,
  templateFile,
  additionalConfig
}) => {
  const action = {
    type: 'append',
    path: `${path}/${folder ? folder + '/' : ''}${fileName}.${extension}`,
    pattern,
    template,
    unique,
    separator,
    templateFile,
    abortOnFail: true
  }
  if (additionalConfig) {
    action.data = additionalConfig
  }
  return action
}

module.exports = {
  getAddAction,
  getModifyAction,
  getAppendAction
}
