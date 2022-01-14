
# Goldilogs

Redirect stdin to log files which are rotated daily. 

Is really just a wrapper that allows to direct stdin to winston.

## Usage

```bash
goldilogs -t {TAG} -p {PATH_TO_LOGS}
```

* `-t`: A tag to identify the log file. 
If a log file with the same tag exists for the current day, will append to that log file. Otherwise will create a new log file.

* `-p`: A path to a directory to store log files into. The path may be absolute or relative.