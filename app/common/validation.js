function validate(str, accepted) {
        if (accepted.test(str)) {
            return true;
        } else {
            return false;
        } 
    }
    
module.exports = {
    validateTitle: function(str) {
        var accepted = /^[a-zA-Z!\.\?\s-,\p{а-яА-Я}\'\"]+$/;
        return validate(str, accepted);
    },

    validateDescription: function(str) {
        var accepted = /^[a-zA-Z!\.\?\s-,\p{а-яА-Я}\'\"()0-9]+$/;
        return validate(str, accepted); 
    },
     checkLenght: function(str, minLen, maxLen) {
        if(str.length <= minLen || str.length >= maxLen){
            return false;
        } else {
            return true;
        }
    }
}