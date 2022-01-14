#!/usr/bin/env node

const fs = require('fs');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');


const pathArgIdx = process.argv.indexOf('-p');
const tagArgIdx = process.argv.indexOf('-t');
validateArgs();

const pathToLogs = process.argv[pathArgIdx + 1];
const tag = process.argv[tagArgIdx + 1];


// create the log directory if it does not exist
if (!fs.existsSync(pathToLogs))
    fs.mkdirSync(pathToLogs);


const logger = createLogger({
    transports: [
        new transports.DailyRotateFile({
            level: 'silly',
            filename: `${pathToLogs}/${tag}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf(
                    info => `${info.timestamp}: ${info.message}`
                )
            ),
            handleExceptions: true
        })
    ],
    exitOnError: true
});

// log standard input
process.stdin.on('data', data => logger.info(data));


function validateArgs() {
    if (
        pathArgIdx < 0 ||
        process.argv.length - 1 < pathArgIdx + 1 ||
        process.argv[pathArgIdx + 1].indexOf('-') === 0
    ) {
        // '-p' arg not exists,
        // or arg list stops after '-p',
        // or next arg starts with '-'
        throw new Error('You must set a directory to store the log file. Use \'goldilogs -p {path to logs}\'');
        process.exit(1);
    }

    if (
        tagArgIdx < 0 ||
        process.argv.length - 1 < tagArgIdx + 1 ||
        process.argv[tagArgIdx + 1].indexOf('-') === 0
    ) {
        // '-t' arg not exists,
        // or arg list stops after '-t',
        // or next arg starts with '-'
        throw new Error('You must set a tag to identify the log file. Use \'goldilogs -t {tag}\'');
        process.exit(1);
    }
}
