"use strict";

let app = {};

app.data = {    
    data: function() {
        return {
            input1: null,
            input2: null,
            input3: null,
            checkboxVal: 13850,
            isJoint: false,
            taxableIncome: 0
        };
    },
    computed: {
        total: function() {
            return this.input1 + this.input2 + this.input3;
        },
    },
    watch: {
        total() {
            this.computeTaxableIncome(); 
        },
        checkboxVal() {
            this.computeTaxableIncome();
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
            if (this.checkboxVal > this.total) {
                this.taxableIncome = 0;
            } else {
                this.taxableIncome = this.total - this.checkboxVal;
            }
        }
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
app.vue.recompute();

