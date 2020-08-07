import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    Paragraph: null,
    Link: null,
  };

  async componentDidMount() {
    const [{ Paragraph }, { Link }] = await this.dynamicAsyncImports(['./Paragraph', './Link']);
    this.setState({ Paragraph, Link });
  }

  async dynamicAsyncImports(filenames) {
    const asyncModules = await Promise.all(
      filenames.map((file) =>
        import(
          /* webpackChunkName: "async-[request]" */
          `${file}`
        ),
      ),
    );
    return asyncModules;
  }

  render() {
    if (!this.state.Paragraph || !this.state.Link) {
      return null;
    }

    const { Paragraph, Link } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Paragraph />
          <Link />
        </header>
      </div>
    );
  }
}

export default App;
