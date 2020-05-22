import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      frameList: [],
      wasm: {},
      game: null
    };
  }

  componentDidMount() {
    this.loadWasm();
  }

  loadWasm = async () => {
    try {
      const wasm = await import('masuda-wasm');
      this.setState({ wasm }, () => {
        this.setState({ game: this.state.wasm.Game.new(0) }, () => {
          this.setState( { frameList: this.state.game.get_frames(10, "1") } )
        });
      });
    } catch (err) {
      console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
  };

  render() {
    const { frameList = [], game = null } = this.state;

    const handleClick = () => {
      this.setState({
        frameList: [...frameList, game.method_1()]
      });
    };

    return (
      <>
        <button onClick={handleClick}>
          PID
        </button>

        <table>
          <thead>
            <tr>
              <th>Frame</th>
              <th>PID</th>
              <th>HP</th>
              <th>ATK</th>
              <th>DEF</th>
              <th>SPA</th>
              <th>SPD</th>
              <th>SPE</th>

            </tr>
          </thead>
          <tbody>
            {frameList.map((frame, index) =>
              <tr>
                <td>{index}</td>
                <td>{frame.pid.toString(16)}</td>
                <td>{frame.hp}</td>
                <td>{frame.atk}</td>
                <td>{frame.def}</td>
                <td>{frame.spa}</td>
                <td>{frame.spd}</td>
                <td>{frame.spe}</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    )
  }
}

export default App;