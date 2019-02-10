import * as React from 'react'
import { render } from 'react-dom'

import ObfuscateText from './../src/ObfuscateText'

interface State {
    text: string;
}

let index = 0;
const textInterval = [
    "Hello",
    "World",
    "Testing",
    "this@is.email",
    "00 88 22 11"
];

class App extends React.Component<any, State>  {
    private interval?: NodeJS.Timeout;

    constructor(props: any) {
        super(props);

        this.state = {
            text: textInterval[0]
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            index++;

            this.setState({
                text: textInterval[index % textInterval.length]
            });
        }, 1000);
    }

    componentWillUnmount() {
        const interval = this.interval;

        if (interval) {
            clearInterval(interval);
        }
    }

    componentDidUpdate() {
        // Hacky code. Required for dmeo, close eyes and ignore.
        const readElement = document.getElementById("read");
        const writeElement = document.getElementById("write");

        if (writeElement && readElement) {
            writeElement.innerText = readElement.textContent || "";
        }
    }

    render() {
        return <div>
            <h1>Obfuscate Text</h1>
            <div id="read">
                <ObfuscateText text={this.state.text} />
            </div>
            <h1>Text Content</h1>
            <pre id="write">

            </pre>
        </div>
    }

}
  

render(<App />, document.getElementById('root'))
