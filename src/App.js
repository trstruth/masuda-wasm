import React, { Component } from 'react';
import './App.css';

import SearchForm from './components/SearchForm'
import FrameTable from './components/FrameTable'

const defaultMethod = "1"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      method: defaultMethod,
      frameList: [],
      wasm: {},
      search: null,
    };
  }

  componentDidMount() {
    this.loadWasm();
  }

  loadWasm = async () => {
    try {
      const wasm = await import('masuda-wasm');
      this.setState({ wasm }, () => {
        this.setState({ search: this.state.wasm.Search.new(0) }, () => {
          this.setState({ frameList: this.state.search.get_frames(10, this.state.method) })
        });
      });
    } catch (err) {
      console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
  };

  render() {
    const { frameList = [], method = defaultMethod, search = null } = this.state;

    const setMethod = (methodName) => {
      this.setState({
        method: methodName,
        frameList: this.state.search.get_frames(10, this.state.method)
      })
    }

    return (
      <>
        <SearchForm method={method} setMethod={setMethod} />
        <FrameTable frameList={frameList} />
      </>
    )
  }
}

export default App;