#!/usr/bin/python
import subprocess
import time
import re
import sys
import os

if len(sys.argv) != 2:
	print "Please specify config"
	exit(1)

CONFIG = sys.argv[1]


LIRC_CONFIG_PATH = "/etc/lirc/lircd.conf"

CONFIG_SOURCE= os.environ['JACK_CONFIGS']


SAVED_CONFIG_PATH = CONFIG_SOURCE + "/" + CONFIG



subprocess.call(["rm", "-f", SAVED_CONFIG_PATH])

lirc_config_file = open(LIRC_CONFIG_PATH, "rb")
lirc_config = lirc_config_file.read().strip()
lirc_config_file.close()

if lirc_config:
	match = re.search(r'include "' + SAVED_CONFIG_PATH + '"', lirc_config)
	if match:
		with open(LIRC_CONFIG_PATH, "wb") as f:
			lirc_config = lirc_config.replace("include \"" + SAVED_CONFIG_PATH + "\"\n", "" )
			f.write(lirc_config)
			subprocess.call(["service", "lirc", "stop"])
			time.sleep(2)
			subprocess.call(["service", "lirc", "start"])

			print "Updated lircd.conf"