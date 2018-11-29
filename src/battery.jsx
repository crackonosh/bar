import { element } from '../lib/style.js';

const render = ({ output, error, side, config, data }) => {
  // decides color of battery icon
  var batColor = (level) => {
    var level = parseInt(level)
    if (level > 80)
      return "#97c475"; // Green
    else if (level > 55)
      return "#e5c07b"; // Yellow
    else if (level > 30)
      return "#d09a6a"; // Orange
    return "#e06c75";   // Red
  }

  var style = (level) => {
    return {
      ...element,
      ...config.style,
      float: side,
      color: batColor(level)
    }
  }

  var iconStyle = {
    padding: '0 0 0 10px',
    fontSize: '16px'
  }
  var anotherStyle = {
    padding: '10 10 10 10px',
    fontSize: '15px'
  }

  // shows bolt icon when charging
  var chargeIcon = (charger) => {
    if (charger == "AC")
      return "far fa-bolt"
  }

  var iconName = (level) => {
    var level = parseInt(level)
    if (level > 80)
      return "far fa-battery-full"
    if (level > 60)
      return "far fa-battery-three-quarters"
    if (level > 40)
      return "far fa-battery-half"
    if (level > 20)
      return "far fa-battery-quarter"
    return "far fa-battery-empty"
  }

  return error || data == 0 ? (
    <span style={style(0)}></span>
  ) : (
    <span style={style(data.bat)}>
      <span>
        <i className={chargeIcon(data.status)}></i>
      </span>
      <span style={iconStyle}>{data.bat}</span>
      <span style={iconStyle}>
        <i className={iconName(data.bat)}></i>
      </span>
    </span>
  )
}

export default render
