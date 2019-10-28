import { element } from '../lib/style.js';

const render = ({ config, output, error, side, data }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  // changes icon depending on ID
  var getIcon = (position) => {
    switch (position) {
      case 1:
        return config.icons.first;
        break;
      case 2:
        return config.icons.second;
        break;
      case 3:
        return config.icons.third;
        break;
      case 4:
        return config.icons.fourth;
        break;
      case 5:
        return config.icons.fifth;
        break;
      case 6:
        return config.icons.sixth;
        break;
    }
  }

  var spaceStyle = (position, space) => {
    var style = {
      height: "22px",
      display: 'inline-block',
      padding: '0 5px'
    }

    // highlights focused workspace
    if (position == parseInt(space)) {
      style.borderBottom = '4px solid #00c2ff'
    }

    // changes color of workspace icon depending on row
    switch (position) {
      case 1:
        style.color = "#0F0";
        break;
      case 2:
        style.color = "red";
        break;
      case 3:
        style.color = "yellow";
        break;
      case 4:
        style.color = "brown";
        break;
      case 5:
        style.color = "orange";
        break;
      case 6:
        style.color = "blue";
        break;
    }

    return style
  }

  // creates icon in "workspaces" for every active workspace
  var individualIcons = [];
  for (var i = 1; i <= data.numOfWorksp; i++){
    individualIcons.push(
      <span style={spaceStyle(i, data.focused)} key={i}>
        <i className={String(getIcon(i))}></i>
      </span>
    )
  }

  let errorContent = (
    <span style={style}>!</span>
  )

  let workspaces = (
    <span style={style}>
      {individualIcons}
    </span>
  )

  let noYabai = (
    <span style={{...style, opacity: 0.4}}>Yabai not installed</span>
  )

  return error ? errorContent : data ? workspaces : noYabai
}

export default render
