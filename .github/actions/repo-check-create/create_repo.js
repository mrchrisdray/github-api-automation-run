// Octokit.js
// https://github.com/octokit/core.js#readme
//write a script that checks if a repo exists and if it does not, create it
//if it does exist, update it
//
// 1. Check if the repo exists
// 2. If it does not exist, create it
// 3. If it does exist, update it



import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN
})

try{
  await octokit.request('GET /repos/{owner}/{repo}', {
  owner: 'process.env.owner_name',
  repo: 'process.env.repo_name',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  },
});

console.log(`Test API call return for not found`);

} catch (error) {
    if (error.status === 404) {
        console.log(`The repo can not be found try to make one`);
        await octokit.request('POST /repos/{owner}/{repo}', {
            owner: 'process.env.owner_name',
            repo: 'process.env.repo_name',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });
    } else {
        console.log(`Repo must exist and can not be created again but can be updated`);
        /*
        await octokit.request('PATCH /repos/{owner}/{repo}', {
            owner: 'process.env.owner_name',
            repo: 'process.env.repo_name',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });
        */
    }
}