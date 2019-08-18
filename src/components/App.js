import { debounce } from 'debounce';
import React from 'react';
import { getLastCommit } from "../services/commitsService";
import './App.css';
import CommitInfo from "./CommitInfo";



const DEBOUNCE_VALUE_MS = 1000;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleNameChange = (event) => {
    this.setState({ error: null, lastCommit: null });

    this.debouncedHandleNameChange(event.target.value);
  }

  debouncedHandleNameChange = debounce(async (username) => {
    if (!username) {
      return;
    }

    try {
      const lastCommit = await getLastCommit(username);

      this.setState({ lastCommit });
    } catch (error) {
      this.setState({ error });
    }

  }, DEBOUNCE_VALUE_MS);

  render() {
    return (
      <div className="App">
        <h1 className="App__header">GitHub Last Commit App</h1>

        <input name="username" placeholder="Type GitHub username" onChange={this.handleNameChange} />

        <CommitInfo
          className="App__commit-info"
          lastCommit={this.state.lastCommit}
        />

        {this.state.error &&
          <div className="App__error">
            Error: {this.state.error.message}
          </div>
        }
      </div>
    );
  }
}

export default App;
