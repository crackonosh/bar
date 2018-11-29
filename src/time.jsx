import strftime from '../lib/strftime.js';
import { element, theme } from '../lib/style.js';

const render = ({ config, output, error, side, theme }) => {
  let time = strftime(config.format, new Date());
  let date = strftime(config.date, new Date());
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  return error ? (
    <span style={style}>!</span>
  ) : (
    <span style={style}>
      <span style={{paddingRight: '15px', fontSize: '13px'}}>
        {date}
      </span>
      {time}
      <i className="far fa-clock" style={{padding: '0 0 0 10px'}}></i>
    </span>
  )
}

export default render
