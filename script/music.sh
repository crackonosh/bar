#!/bin/bash

cmusRunning=$(echo "$(ps aux | grep -o "cmus$")")

case $cmusRunning in
  "cmus")
    cmusPlayStatus=$(echo "$(/usr/local/bin/cmus-remote -Q | grep status | awk '{print $2}')")
    if [ $cmusPlayStatus == "playing" ];
    then
      song=$(/usr/local/bin/cmus-remote -Q | grep "tag title" | sed s/"tag title"/""/g |  sed '1s/^.//')
      artist=$(/usr/local/bin/cmus-remote -Q | grep "tag artist" | sed s/"tag artist"/""/g)
      echo $artist - $song
    else
      spPlayStatus=$(echo "$(ps aux | grep Spotify | wc -l)")
      if [ $spPlayStatus -g 1 ]
      then
        tmp=$(osascript -e 'tell application "Spotify" to get player state')
        if [ $tmp = 'playing' ]
        then
          echo $(osascript -e 'tell application "Spotify" to get (artist of current track as string) & " - " & (name of current track as string)')
        fi
      fi
    fi
    ;;
  *)
    spPlayStatus=$(echo "$(ps aux | grep Spotify | wc -l)")
    if [ $spPlayStatus -ge 2 ]
    then
      tmp=$(osascript -e 'tell application "Spotify" to get player state')
      if [ $tmp = 'playing' ]
      then
        echo $(osascript -e 'tell application "Spotify" to get (artist of current track as string) & " - " & (name of current track as string)')
      fi
    fi
    ;;
esac
