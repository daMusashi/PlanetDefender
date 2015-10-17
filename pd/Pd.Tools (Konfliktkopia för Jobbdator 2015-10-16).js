/**
 * Created by Martin on 2015-10-14.
 */

// skapar namespace
Pd.Tools = function(){};

/**
 * Returnerar ett slumptal - heltal -  mellan min och max
 * @param min
 * @param max
 * @returns {Number}
 */
Pd.Tools.getRandomIntValue = function(min, max){
    return Math.round(Pd.Tools.getRandomFloatValue(min, max));
};

/**
 * Returnerar ett slumptal - decimaltal -  mellan min och max
 * @param min
 * @param max
 * @returns {Number}
 */
Pd.Tools.getRandomFloatValue = function(min, max){
    return Math.random()*(max-min)+min;
};

Pd.Tools.printTextInCenter = function(text){

};


