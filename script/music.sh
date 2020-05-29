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
      echo $(osascript -e 'tell application "Spotify" to get (artist of current track as string) & " - " & (name of current track as string)')
    fi
    ;;
  *)
    echo $(osascript -e 'tell application "Spotify" to get (artist of current track as string) & " - " & (name of current track as string)')
    ;;
esac
