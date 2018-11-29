// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 1000 // ms

import { theme } from './lib/style.js';
import {
  Battery,
  Time,
  Workspaces,
  Playing,
  FocusedApp,
  WifiStatus
} from './src/index.jsx'

// config for components imported from above
const config = {
  time: {
    format: "%I:%M %p",
    date: "%x %a",
    style: {
      padding: '0 10px',
      fontSize: '15px',
      backgroundColor: theme.backgroundLight,
    }
  },
  battery: {
    style: {}
  },
  workspaces: {
    icons: {
      first: "fa fa-terminal",
      second: "fab fa-opera",
      third: "fas fa-code",
      fourth: "fas fa-coffee",
      fifth: "fas fa-eye",
      sixth: "fas fa-dragon",
    },
    style: {
      backgroundColor: theme.backgroundLight,
    }
  },
  focusedApp: {
    style: {
      width: "350px"
    }
  },
  wifiStatus: {
    style: {}
  },
  playing: {
    style: {
      paddingTop: '10px'
    }
  }
}

const barStyle = {
  top: 10,
  left: 10,
  right: 10,
  position: 'fixed',
  background: theme.background,
  overflow: 'hidden',
  color: theme.text,
  height: '25px',
  fontFamily: 'FiraCode',
  fontSize: '.9rem',
  boxShadow: '0px 2px 5px 0 #000000',
}


const result = (data, key) => {
  try {
    return JSON.parse(data)[key]
  } catch (e) {
    return ''
  }
}

export const command = `
FOCUSEDWORKSPACE=$(echo $(/usr/local/bin/chunkc tiling::query -d id));
WORKSPACESCOUNT=$(echo $(/usr/local/bin/chunkc tiling::query -D 1 | tail -c 1));
FOCUSEDAPP=$(echo $(/usr/local/bin/chunkc tiling::query --window tag));

PLAYING=$(sh ~/scripts/uber/music.sh);

WIFISTATUS=$(sh ~/scripts/uber/wifiStatus.sh);
ISCHARGING=$(pmset -g batt | grep -o "\'[A-Za-z]*" | sed "s/\'//g" | head -n 1);
BAT=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d';');


echo $(cat <<-EOF
  {
    "workspace": {
      "focused": "$FOCUSEDWORKSPACE",
      "numOfWorksp": "$WORKSPACESCOUNT"
    },
    "focusedApp": "$FOCUSEDAPP",

    "playing": "$PLAYING",

    "wifiStatus": "$WIFISTATUS",
    "battery": {
      "bat": "$BAT",
      "status": "$ISCHARGING"
    }
  }
EOF
);
`

export const render = ({ output, error }) => {
  if(error) {
    console.log(new Date())
    console.log(error)
    console.log(String(error))
  }
  console.log(output);
  let errorContent = (
    <div style={barStyle}></div>
  )
  let content = (
    <div style={barStyle}>
      <link rel="stylesheet" type="text/css" href="bar/assets/font-awesome/css/all.min.css" />
      <Workspaces config={config.workspaces} data={result(output,"workspace")} side="left" />
      <FocusedApp config={config.focusedApp} data={result(output, "focusedApp")} side="left" />

      <Playing config={config.playing} data={result(output, "playing")} />

      <Time config={config.time} side="right" />
      <Battery config={config.battery} data={result(output, "battery")} side="right" />
      <WifiStatus config={config.wifiStatus} side="right" data={result(output, "wifiStatus")} />
    </div>
  )
  return error ? errorContent : content
}
