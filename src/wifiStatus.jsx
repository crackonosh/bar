import { element, theme } from '../lib/style.js';

const render = ({ config, output, error, side, data}) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  return error ? (
    <span style={style}>No wifi</span>
  ) : (
    <span style={style}>
      <span style={{paddingRight: '5px'}}>
        {data} 
      </span>
      <i className={'fas fa-wifi'}></i>
    </span>
  )
}

export default render
