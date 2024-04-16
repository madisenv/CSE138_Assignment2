"use strict";

let app = {};


app.data = {    
    data: function() {
        return {
            // Complete.
            input1: null,
            input2: null,
            input3: null,
        };
    },
    computed: {
        total: function() {
            return this.input1 + this.input2 + this.input3
        }

    },
    methods: {
        // Complete.
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
app.vue.recompute();

