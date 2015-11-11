/*  
    Version 0.0.0
    Created by Apoorv Nandan
*/
(function(window){
    'use strict';
    function define_mllib(){
        var mllib = {};
        
        mllib.perceptron = function(){
            var weights = [];
            this.trainingData = [];
            this.testingData = [];
            this.desiredOutputs = [];
            this.testResults = [];
            this.neta = 1;
            var initWeights = function(len){
                for(var i = 0; i < len; i++){
                    weights.push(1);
                }
            };
            var getOutput = function(inputs){
                if(!inputs) {
                    console.log('no input in getOutput() of perceptron');
                    return NULL;
                }
                var len = inputs.length;
                var i;
                var tempSum = 0;
                for(i = 0; i < len; i++){
                    tempSum += weights[i] * inputs[i];
                }
                if(tempSum >= 0) return 1;
                return -1;
            };
            var train = function(inputData, expectedOutput, eta){
                if(!inputData || !expectedOutput) return;
                var len = inputData.length;
                var numInputs = inputData[0].length;
                var i;
                for(i = 0;i < len; i++){
                    var tempOutput = getOutput(inputData[i]);
                    if(tempOutput != expectedOutput[i]){
                        var j;
                        for(j = 0; j < numInputs; j++){
                            weights[j] += eta * (expectedOutput[i]) * inputData[i][j];
                        }
                    }   
                }
            };
            var test = function(testData){
                var result = [];
                var testDataLen = testData.length;
                var i;
                for(i = 0; i < testDataLen; i++){
                    result.push(getOutput(testData[i]));
                }
                return result;
            };
            this.run = function(){
                initWeights(this.trainingData[0].length);
                train(this.trainingData, this.desiredOutputs, this.neta);
                this.testResults = test(this.testingData);
            };

        };

        mllib.knn = function(input, K){
            var numInput = input.length;
            var hash = {};
            var dist = function(x, y){
                var n = x.length;
                var ret = 0;
                for(var i = 0; i < n; i++){
                    ret += (x[i] - y[i]) * x[i] - y[i]);
                }
                return ret;
            };
            var train = function(toBeClassified){
                var n = toBeClassified.length;
                var distances = [];
                for(var i = 0; i < numInput; i++){
                    var params = [];
                    for(var j = 0; j < n; j++) params.push(input[i][j]);
                    var ithDist = dist(params, toBeClassified);
                    hash[ithDist] = input[i][n];
                    distances.push(ithDist);
                }
                sort(distances);
                console.log(hash[distances[0]]);
            };
            this.run = function(){

            };
        };  

        mllib.bayes = fucntion(){
            var total = 0;
            var classes= {};
            var counts= {};
        };      

        return mllib;
    }
    //define globally if it doesn't already exist
    if(typeof(mllib) === 'undefined'){
        window.mllib = define_mllib();
    }
    else{
        console.log("mllib already defined.");
    }
})(window);
