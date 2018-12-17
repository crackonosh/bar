import { element, theme } from '../lib/style.js';

const render = ({ config, output, error, side, data}) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  return error ? (
    <span style={style}>No net</span>
  ) : (
    <span style={style}>
    {data}
    </span>
  )
}

export default render
