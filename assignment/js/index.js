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
            amountOwed: 0,
            refund: 0
        };
    },
    computed: {
        grossIncome: function() {
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
             var rates = [[37, 578125, 693750],
                [35, 231250, 462500],
                [32, 182100, 364200],
                [24, 95375, 190750],
                [22, 44725, 89450],
                [12, 11000, 22000],
                [10, 0, 0]]
        
            var tempIncome = this.taxableIncome;
            var tax = 0;
           for (var bracket of rates) {
                const lowerBound = this.isJoint? bracket[2] : bracket[1];
                const rate = (bracket[0]/100)
                if (tempIncome > lowerBound) {
                    tax += (tempIncome - lowerBound) * rate;
                    tempIncome = lowerBound;
                }
            }
            this.taxes = tax; 
            console.log("Income: ", this.taxableIncome)
            console.log("Tax: ", tax)
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

