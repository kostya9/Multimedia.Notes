
const IPC_READ_REQUEST = 'IPC_REQUEST_READ_FILE';
const IPC_READ_RESPONSE = 'IPC_RESPONSE_READ_FILE';
const IPC_WRITE_REQUEST =  'IPC_REQUEST_WRITE_FILE';


module.exports = {
    IPC_READ_REQUEST: IPC_READ_REQUEST,
    IPC_READ_RESPONSE: IPC_READ_RESPONSE,
    IPC_WRITE_REQUEST: IPC_WRITE_REQUEST,
    readFile: function () {
        return {
            type: IPC_READ_REQUEST
        }
    },
    readFileResponse: function(measures) {
        return {
            type: IPC_READ_RESPONSE,
            measures: measures
        }
    },
    writeFileRequest: function(measures) {
        return {
            type: IPC_WRITE_REQUEST,
            measures: measures
        }
    }
}