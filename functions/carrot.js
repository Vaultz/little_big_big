var fCarrot = {

    getCarrot: function(carrots) {
        setTimeout(function() {
            carrots++;
            // console.log(carrots);
            fCarrot.getCarrot(carrots);
        }, 1000);
    }
};

module.exports = fCarrot;
