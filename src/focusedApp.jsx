import { element, theme } from '../lib/style.js';

const render = ({ config, output, error, side, data}) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  var checkFocus = (data) => {
    if (data == "?")
      return ""
    return data
  }


  return error ? (
    <span style={style}>Error on focused app</span>
  ) : (
    <span style={style}>
     {checkFocus(data)}
    </span>
  )
}

export default render
export const refreshFrequency = 1000 //ms
