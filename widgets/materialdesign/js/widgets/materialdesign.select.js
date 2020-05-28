/*
    ioBroker.vis vis-materialdesign Widget-Set
    
    Copyright 2019 Scrounger scrounger@gmx.net
*/
"use strict";

vis.binds.materialdesign.select =
    function (el, data) {
        try {
            let $this = $(el);
            let vueHelper = vis.binds.materialdesign.vueHelper.select
            let containerClass = 'materialdesign-vuetify-select';

            vueHelper.generateItemList(data, `Select - ${data.wid}`, function (itemsList) {

                $this.append(`
                    <div class="${containerClass}" style="width: 100%; height: 100%;">
                        <v-select
                            ${vueHelper.getConstructor(data)}
                        >
                        
                        ${vueHelper.getTemplates(data)}

                        </v-select>
                    </div>`);

                myMdwHelper.waitForElement($this, `.${containerClass}`, data.wid, 'Select', function () {
                    myMdwHelper.waitForElement($("body"), '#materialdesign-vuetify-container', data.wid, 'Select', function () {

                        let $vuetifyContainer = $("body").find('#materialdesign-vuetify-container');
                        let widgetHeight = window.getComputedStyle($this.get(0), null).height.replace('px', '');

                        let vueSelect = new Vue({
                            el: $this.find(`.${containerClass}`).get(0),
                            vuetify: new Vuetify(),
                            data() {
                                return vueHelper.getData(data, widgetHeight, itemsList);
                            },
                            methods: vueHelper.getMethods(data, $this, itemsList, $vuetifyContainer)
                        });

                        vueHelper.setStyles($this, data);
                        vueHelper.setIoBrokerBinding(data, vueSelect, itemsList);
                    });
                });
            });
        } catch (ex) {
            console.error(`[Select - ${data.wid}]: error: ${ex.message}, stack: ${ex.stack} `);
        }
    };