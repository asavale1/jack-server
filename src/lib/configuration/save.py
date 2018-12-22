#!/usr/bin/python
import subprocess
import re
import sys
import os

if len(sys.argv) != 2:
	print "Please specify config file"
	exit(1)

NEW_CONFIG_FILE = sys.argv[1]


LIRC_CONFIG_PATH = "/etc/lirc/lircd.conf"

WORKSPACE = os.environ['JACK_WORKSPACE']
CONFIG_SOURCE= os.environ['JACK_CONFIGS']

NEW_CONFIG_PATH = WORKSPACE + "/" + NEW_CONFIG_FILE

SAVED_CONFIG_PATH = CONFIG_SOURCE + "/" + NEW_CONFIG_FILE



subprocess.call(["mv", NEW_CONFIG_PATH, SAVED_CONFIG_PATH])

lirc_config_file = open(LIRC_CONFIG_PATH, "rb")
lirc_config = lirc_config_file.read().strip()
lirc_config_file.close()

if lirc_config:
	match = re.search(r'include "' + SAVED_CONFIG_PATH + '"', lirc_config)
	if not match:
		with open(LIRC_CONFIG_PATH, "wb") as f:
			f.write(lirc_config + "\n" + "include \"" + SAVED_CONFIG_PATH + "\"\n")
			print "Updated lircd.conf"




