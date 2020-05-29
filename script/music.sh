#!/bin/bash

cmusRunning=$(echo "$(ps aux | grep -o "cmus$")")

case $cmusRunning in
  "cmus")
    playStatus=$(echo "$(/usr/local/bin/cmus-remote -Q | grep status | awk '{print $2}')")
    if [ $playStatus == "playing" ];
    then
      song=$(/usr/local/bin/cmus-remote -Q | grep "tag title" | sed s/"tag title"/""/g |  sed '1s/^.//')
      artist=$(/usr/local/bin/cmus-remote -Q | grep "tag artist" | sed s/"tag artist"/""/g)
      echo $artist - $song
    else
      echo $(osascript -e 'tell application "System Events"set processList to (name of every process)end tellif (processList contains "Spotify") is true thentell application "Spotify"if player state is playing thenset artistName to artist of current trackset trackName to name of current trackreturn artistName & " - " & trackNameelsereturn ""end ifend tellend if')
    fi
    ;;
  *)
    echo $(osascript -e 'tell application "System Events"set processList to (name of every process)end tellif (processList contains "Spotify") is true thentell application "Spotify"if player state is playing thenset artistName to artist of current trackset trackName to name of current trackreturn artistName & " - " & trackNameelsereturn ""end ifend tellend if')
    ;;
esac
