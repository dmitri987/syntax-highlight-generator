import { useState } from 'react'
import {Options} from '../libs/syntax-highlight';
import './App.css'
import OptionsPicker from './components/OptionsPicker'

// export type Options = {
//   parsingEngine?: ParsingEngine;
//   language?: string;
//   wrapLines?: boolean | ClassName;
//   autolink?: boolean | ClassName;
//   preClass?: ClassName;
//   codeClass?: ClassName;
// };

function App() {
  const [options, setOptions] = useState<Omit<Options, "parsingEngine" | "language">|null>(null);

  return (
    <div className="">
      <OptionsPicker onChange={setOptions} />
      <pre><code>{JSON.stringify(options, null, 2)}</code></pre>
    </div>
  )
}

export default App
