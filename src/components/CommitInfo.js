import React from 'react';
import "./CommitInfo.css";

export default function CommitInfo(props) {
    if (!props.lastCommit) {
        return null;
    }

    const { author, commit, html_url } = props.lastCommit;
    const { login } = author;
    const date = new Date(commit.author.date).toDateString();

    return (
        <div className={`CommitInfo ${props.className}`}>
            <a className="CommitInfo__link" href={html_url}>{commit.message}</a>
            <div className="CommitInfo__author"><b>{login}</b> committed on {date} </div>
        </div>
    );
}
