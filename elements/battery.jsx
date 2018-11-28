import { element } from '../lib/style.js';

const render = ({ output, error, side, config, data, charger}) => {
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

  var chargeIcon = (charger) => {
    if (charger == "AC")
      return "far fa-bolt"
  }

  var showIcon = (charger) => {
    if (charger == "AC")
      return anotherStyle
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
    <span style={style(data)}>
      <span>
        <i className={chargeIcon(charger)}></i>
      </span>
      <span style={iconStyle}>{data}</span>
      <span style={iconStyle}>
        <i className={iconName(data)}></i>
      </span>
    </span>
  )
}

export default render
