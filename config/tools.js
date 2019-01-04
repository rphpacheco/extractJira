const request = require('request'),
    env = require('../.env')

/**
 * @description format query for use in request Jira API
 * @param {string} mode (issue or worklog)
 * @param {string} issue (issue Key => example DSB-1918) 
 * @param {string} query (query for search value in Jira API => example project=DSB)
 */
const getPath = (mode,issue = null,query = null) => { 
    let path

    if(mode === 'issue')
        path = `${env.ISSUE_PATH}${query ? '?jql=' + query : null}`
    else
        path = env.WORKLOG_PATH.replace('*',issue)

    return path
}
/**
 * @description generate request options to use in Jira API
 * @param {string} mode (issue or worklog)
 * @param {string} issue (issue Key => example DSB-1918) 
 * @param {string} query (query for search value in Jira API => example project=DSB)
 */
const getOptions = (mode,issue_key,query) => {
    return {
        method : 'GET',
        url : `${env.PATH}${getPath(mode,issue_key,query)}`,
        headers : {
            Authorization : `Basic ${env.SECRET}`
        }
    }
}
/**
 * @description function respnsible for Jira API request
 * @param {object} options
 */
const get = options => {
    request(options, (error, response, body) => {
        console.log(body)
    })
}

module.exports = {
    get,
    getOptions
}