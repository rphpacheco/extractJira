const { query, issue_key, mode } = require('yargs').argv,
    { get, getOptions } = require('./config/tools'),
    options = getOptions(mode,issue_key,query)

get(options)