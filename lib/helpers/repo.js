const xml2js = require('xml2js');
const validUrl = require('valid-url')
const fs = require('fs')


function getRepoName(url){
    return url.split('/').pop();

}

function getOrgAndRepo(url){
    const parts = url.split('/')
    return parts[parts.length-2] + "/" + parts[parts.length-1]
}

//{name: "testsonexam", number: "20"}

function getJob(url){
    url = stripTrailingSlash(url)
    var newurl = url.split('/')
    const obj = {}
    obj.name = newurl[newurl.length-2]
    obj.number = newurl[newurl.length-1]
    return obj
}

function isValidUrl(repoUrl, scm, organization){
    // add testing if the scm and org is correct with channel
    if(validUrl.isWebUri(repoUrl)){
        return true
    } else {
        return false
    }
}

function createJenkinsConfigFile(options, jenkinsConfigXMLpath){
  return new Promise((resolve, reject) => {
  const file = fs.readFileSync('./lib/test/config.xml', { encoding: 'utf-8' })
  XMLStringToObject(file)
  .then((doc) => {
    doc.project.properties[0]['com.coravy.hudson.plugins.github.GithubProjectProperty'][0].projectUrl[0] = options.scmUrl;
    //doc.project.scm[0].userRemoteConfigs[0]['hudson.plugins.git.UserRemoteConfig'][0].url[0] = options.scmUrl;
    
    const builder = new xml2js.Builder();
    const updatedJenkinsConfigXML = builder.buildObject(doc);
    return resolve(updatedJenkinsConfigXML)
  })
  .catch((e) => {console.log(e)})
})
}


module.exports = {
  isValidUrl,
  getRepoName,
  createJenkinsConfigFile,
  getJob,
  getOrgAndRepo
};

function XMLStringToObject(string) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(string, (err, result) => {
      if (err) {return reject(err)};
      return resolve(result);
    });
  });
}

const stripTrailingSlash = (str) => {
    return str.endsWith('/') ?
        str.slice(0, -1) :
        str;
};