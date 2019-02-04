import { element } from '../lib/style.js';

const render = ({ output, error, side, config, data }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  return error ? (
    <span></span>
  ) : (
    <span style={style}>
      <span style={{paddingRight: '5px'}}>{data}</span>
      <i className={'fas fa-hdd'}></i>
    </span>
  )
}

export default render;
