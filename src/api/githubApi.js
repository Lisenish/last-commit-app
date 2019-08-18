const API_ROOT = 'https://api.github.com';

export function getUserRepos(username) {
    return get(`${API_ROOT}/users/${username}/repos?sort=pushed&direction=desc`);
}

export function getUserCommits(owner, repoName) {
    return get(`${API_ROOT}/repos/${owner}/${repoName}/commits?author=${owner}`);
}

function get(url) {
    return fetch(url).then((response) => response.json().then((json) => {
        if (!response.ok) {
            throw new Error(json.message);
        }

        return json;
    }));
}