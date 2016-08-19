/**
 * Created by jiayanguo on 8/7/16.
 */
const commandFactory = require('hystrixjs').commandFactory;
const express = require('express');

const service = {
    port: 8080,
    timeout: 700,
    resetTime: 1000,
    concurrency: 6,
    errorThreshold: 10,
    errorNamesThresholds: {
        ServiceUnavailableError: 0
    }
};

const hystrixStreamResponse = (request, response) => {
    response.append('Content-Type', 'text/event-stream; charset=UTF-8');
    response.append('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    return hystrixStream.toObservable().subscribe(
        function onNext(sseDate){
            response.write('data:'+sseData+'\n\n');
        },
        function onError(error){console.log(error)},
        function onComplete(){
            return response.end();
        }
    );
};

const app = express();
app.get('/', function (req, res){

})

const serviceCommand = commandFactory.getOrCreate("Service on port :" + service.port)
    .circuitBreakerErrorThresholdPercentage(service.errorThreshold)
    .timeout(service.timeout)
    .run(makeRequest)
    .circuitBreakerRequestVolumeThreshold(service.concurrency)
    .circuitBreakerSleepWindowInMilliseconds(service.timeout)
    .statisticalWindowLength(10000)
    .statisticalWindowNumberOfBuckets(10)
    .errorHandler(isErrorHandler)
    .build();

const promt = serviceCommand.execute({
    method:get,
    url:'www.google.com'
});

