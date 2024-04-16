"use strict";

let app = {};


app.data = {    
    data: function() {
        return {
            // Complete.
            input1: null,
            input2: null,
            input3: null,
            checkboxValue: 13850,
        };
    },
    computed: {
        total: function() {
            return this.input1 + this.input2 + this.input3
        }
    },
    methods: {
        checkbox: function() {
            if (this.isChecked) {
                this.checkboxValue = 27700
            }
            else {
                this.checkboxValue = 13850
            }
        }
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
app.vue.recompute();

