#!/bin/sh
. /etc/profile

echo "JACK Workspace $JACK_WORKSPACE"

kill `pgrep -f irrecord`
kill `pgrep -f "tail -f stdin.pipe"`

rm -f "$JACK_WORKSPACE/stdin.pipe"
rm -f "$JACK_WORKSPACE/stdout"
rm -f "$JACK_WORKSPACE/stderr"
rm -f "$JACK_WORKSPACE/$1"

service lirc start


