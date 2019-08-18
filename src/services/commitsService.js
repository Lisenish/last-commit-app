import { getUserCommits, getUserRepos } from '../api/githubApi';

export async function getLastCommit(username) {
    const userRepos = await getUserRepos(username);
    const userCommitsRequests = userRepos.map((repo) => getUserCommits(username, repo.name));

    const userCommits = (await Promise.all(userCommitsRequests)).flat().sort((one, other) => one.author.date - other.author.date);

    return userCommits[0];
}