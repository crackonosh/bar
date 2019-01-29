import {element} from '../lib/style.js';

const render = ({ output, error, side, config, data }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  var cpuUsage = (idle) => {
    var idle = parseInt(idle)
    return 100 - idle;
  }

  return error ? (
   <span></span>
  ) : (
    <span style={style}>
      <span>{cpuUsage(data)}% </span>
      <i className={'fas fa-microchip'}></i>
    </span>
  )
}

export default render;
