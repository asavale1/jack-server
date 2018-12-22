#!/bin/sh

. /etc/profile

echo "JACK Workspace $JACK_WORKSPACE"

cd $JACK_WORKSPACE

service lirc stop

sleep 2

mkfifo stdin.pipe

if [ "$2" = "y" ]; then
	tail -f stdin.pipe | (stdbuf -i0 -o0 -e0 irrecord -f -d /dev/lirc0 $1 > stdout 2> stderr && echo "...Configuration complete" >> stdout) &
else
	tail -f stdin.pipe | (stdbuf -i0 -o0 -e0 irrecord -d /dev/lirc0 $1 > stdout 2> stderr && echo "...Configuration complete" >> stdout) &
fi

