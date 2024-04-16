"use strict";

let app = {};

app.data = {
    data: function() {
        return {
            input1: null,
            input2: null,
            input3: null,
            input7: null, 
            input8: null,
            taxes: 0,
            input11: null,
            checkboxVal: 13850,
            isJoint: false,
            taxableIncome: 0,
            amountOwed: null,
            refund: null
        };
    },
    computed: {
        grossIncome: function() {
            console.log(this.input1, this.input2, this.input3) 
            return this.input1 + this.input2 + this.input3;
       
        },
        totalPaymentsCredits: function() {
            return this.input7 + this.input8; 
        },
        totalTax: function() {
            return this.input11 + this.taxes;
        }
    },
    watch: {
        grossIncome() {
            this.computeTaxableIncome(); 
        },
        checkboxVal() {
            this.computeTaxableIncome();
        },
        taxableIncome() {
            this.computeTax();
            this.computeRefund();
        },
        totalPaymentsCredits(){
            this.computeRefund();
        }
    },
    methods: {
        checkbox: function() {
            if (this.isJoint) {
                this.checkboxVal = 27700;
            } else {
                this.checkboxVal = 13850;
            }
        },
        computeTaxableIncome: function() {
            if (this.checkboxVal > this.grossIncome) {
                this.taxableIncome = 0;
            } else {
                this.taxableIncome = this.grossIncome - this.checkboxVal;
            }
        },
        computeTax: function() {
            var rates = [[10, 10999, 21999],
             [12, 11000, 22000],
             [22, 44725, 89450],
             [24, 95375, 190750],
             [32, 182100, 364200],
             [35, 231250, 462500],
             [37, 578125, 693750]]
        
            var tempIncome = this.taxableIncome;

            console.log("is Joint? ", this.isJoint)
            for (var bracket of rates) {
                console.log("bracket: ", bracket)
                const lowerBound = this.isJoint? bracket[2] : bracket[1];
                const rate  = bracket[0];
                
                if (tempIncome <= 0) {
                    break; 
                }

                var incomeBracket = Math.min(lowerBound, tempIncome);
                this.taxes += incomeBracket * (rate/100);
                tempIncome -= incomeBracket; 

                console.log("taxes total = ", this.taxes)
                console.log( "Income bracket = ", incomeBracket) 
            }
        },
        computeRefund: function() {
            if (this.taxes > this.totalPaymentsCredits) {
                this.amountOwed = this.taxes - this.totalPaymentsCredits; 
                this.refund = 0;
            } else {
                this.refund = this.totalPaymentsCredits - this.taxes;
                this.amountOwed = 0;
            }
        }
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
app.vue.recompute();

