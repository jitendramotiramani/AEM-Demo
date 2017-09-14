
CQ.form.MultiMultiCompositeField = CQ.Ext
    .extend(
        CQ.form.CompositeField, {
            path: "",
            bodyPadding: 0,
            fieldWidth: 0,
            constructor: function(c) {
                var a = this;
                var b = new Array();
                if (!c.addItemLabel) {
                    c.addItemLabel = CQ.I18n.getMessage("Add Item")
                }
                if (!c.readOnly) {
                    b.push({
                        xtype: "toolbar",
                        cls: "cq-multifield-toolbar",
                        items: [
                            "->", {
                                xtype: "textbutton",
                                text: c.addItemLabel,
                                style: "padding-right:6px",
                                handler: function() {
                                    a.addItem();
                                    a.doLayout()
                                }
                            }, {
                                xtype: "button",
                                iconCls: "cq-multifield-add",
                                template: new CQ.Ext.Template(
                                    '<span><button class="x-btn" type="{0}"></button></span>'),
                                handler: function() {
                                    a.addItem();
                                    a.doLayout()
                                }
                            }
                        ]
                    });
                }
                if (c.name) {
                    this.hiddenDeleteField = new CQ.Ext.form.Hidden({
                        name: c.name + CQ.Sling.DELETE_SUFFIX
                    });
                    b.push(this.hiddenDeleteField)
                }
                c = CQ.Util.applyDefaults(c, {
                    fieldConfigs: [],
                    itemPanelConfig: {
                        xtype: "panel",
                        layout: "form",
                        border: false
                    },
                    orderable: true,
                    baseName: "item_",
                    matchBaseName: true,
                    border: true,
                    maxLimit: 2147483647,
                    items: [{
                        xtype: "panel",
                        border: false,
                        bodyStyle: "padding:4px;",
                        items: b
                    }]
                });
                CQ.form.MultiMultiCompositeField.superclass.constructor
                    .call(this, c);
                this.fieldNamePrefix = c.prefix || "";
                if (c.name) {
                    this.fieldNamePrefix += c.name + "/"
                }
            },
            initComponent: function() {
                CQ.form.MultiMultiCompositeField.superclass.initComponent
                    .call(this);

            },
            createName: function() {
                for (var c = 1;; c++) {
                    var b = this.baseName + c;
                    var a = this.items.find(function(d) {
                        return d.name == b
                    });
                    if (!a) {
                        return b
                    }
                }
                return ""
            },
            addItem: function(b, a) {
                if (this.maxLimit > 0 && this.items.getCount() > this.maxLimit) {
                    return

                }
                if (!b) {
                    b = this.createName()
                }
                var c = this.insert(this.items.getCount() - 1, {
                    xtype: "multimulticompositefielditem",
                    name: b,
                    prefix: this.fieldNamePrefix,
                    orderable: this.orderable,
                    readOnly: this.readOnly,
                    fieldConfigs: this.fieldConfigs,
                    panelConfig: this.itemPanelConfig
                });
                c.processPath(this.path);
                if (a) {

                    c.setValue(a)
                }
                this.doLayout()
            },
            processPath: function(a) {
                this.path = a
            },
            getValue: function() {
                var a = new Array();
                this.items
                    .each(
                        function(c, b) {
                            if (c instanceof CQ.form.MultiMultiCompositeField.Item) {
                                a[b] = c.getValue();
                                alert("getValue : "+ a[b] + c.getValue());
                                b++
                            }
                        }, this);
                return a
            },
            processItem: function(a, b) {
                if (typeof b !== "object") {
                    return

                }
                if (this.baseName && this.matchBaseName !== false) {
                    if (a.indexOf(this.baseName) !== 0) {
                        return

                    }
                }
                this.addItem(a, b)
            },
            processRecord: function(e, a) {
                if (this.fireEvent("beforeloadcontent", this, e, a) !== false) {
                    for(var i=0; i < this.items.items.length ; i++){
                        var c = this.items.items[i] ;
                        var xt = c.xtype;
                        if(xt === "multimulticompositefielditem"){
							 this.remove(c, true)
                        }
                    }
                    if (this.name) {
                        var d = e.get(this.name);
                        for (var b in d) {
                            var f = e.get(this.getName());
                            this.processItem(b, d[b])
                        }
                    } else {
                        e.fields.each(function(c) {
                            this.processItem(c.name, e.get(c.name))
                        }, this)
                    }
                    this.doLayout();
                    this.fireEvent("loadcontent", this, e, a)
                }
            },
            setValue: function(a) {},
            afterRender: function() {
                CQ.form.MultiMultiCompositeField.superclass.afterRender
                    .call(this);
                this.doLayout()
            }
        });
CQ.Ext.reg("multimulticompositefield", CQ.form.MultiMultiCompositeField);
CQ.form.MultiMultiCompositeField.Item = CQ.Ext
    .extend(
        CQ.Ext.Panel, {
            constructor: function(a) {
                var c = this;
                var e = CQ.Util.copyObject(a.fieldConfigs);
                for (var b = 0; b < e.length; b++) {
                    var d = e[b];
                    d.rawFieldName = d.name;
                    d.name = a.prefix + a.name + "/" + d.rawFieldName;
                    d.readOnly = a.readOnly
                }
                a.panelConfig = CQ.Util.copyObject(a.panelConfig);
                a.panelConfig.items = e;
                a.panelConfig.cellCls = "cq-multifield-itemct";
                a.panelConfig.border = true;
                var g = new Array();
                g.push(a.panelConfig);
                if (!a.readOnly) {
                    if (a.orderable) {
                        g.push({
                            xtype: "panel",
                            border: false,
                            items: {
                                xtype: "button",
                                iconCls: "cq-multifield-up",
                                template: new CQ.Ext.Template(
                                    '<span><button class="x-btn" type="{0}"></button></span>'),
                                handler: function() {
                                    var h = c.ownerCt;
                                    var f = h.items.indexOf(c);
                                    if (f > 0) {
                                        c.reorder(h.items
                                            .itemAt(f - 1))
                                    }
                                }
                            }
                        });
                        g.push({
                            xtype: "panel",
                            border: false,
                            items: {
                                xtype: "button",
                                iconCls: "cq-multifield-down",
                                template: new CQ.Ext.Template(
                                    '<span><button class="x-btn" type="{0}"></button></span>'),
                                handler: function() {
                                    var h = c.ownerCt;
                                    var f = h.items.indexOf(c);
                                    if (f < h.items.getCount() - 2) {
                                        h.items.itemAt(f + 1)
                                            .reorder(c)
                                    }
                                }
                            }
                        });
                    }
                    g.push({
                        xtype: "panel",
                        border: false,
                        items: {
                            xtype: "button",
                            iconCls: "cq-multifield-remove",
                            template: new CQ.Ext.Template(
                                '<span><button class="x-btn" type="{0}"></button></span>'),
                            handler: function() {
                                var parent = c.ownerCt;
                                parent.remove(c);
                                parent.fireEvent("removeditem", parent);

                            }
                        }
                    });
                }
                a = CQ.Util
                    .applyDefaults(
                        a, {
                            layout: "table",
                            anchor: "100%",
                            bodyCssClass: "cq-multifield-item",
                            border: false,
                            style: "margin-bottom:-3px",
                            layoutConfig: {
                                columns: 4
                            },
                            defaults: {
                                bodyStyle: "padding:5px; border-top-width:0px; border-bottom-width:0px; border--width:0px;"
                            },
                            items: g
                        });
                CQ.form.MultiMultiCompositeField.Item.superclass.constructor
                    .call(this, a);
                this.fields = new CQ.Ext.util.MixedCollection(false,
                    function(f) {
                        return f.rawFieldName
                    });
                this.getFieldPanel().items.each(function(f) {
                    if (f.rawFieldName) {
                        this.fields.add(f.rawFieldName, f)
                    }
                }, this);
                if (a.value) {
                    this.setValue(a.value)
                }
            },
            getFieldPanel: function() {
                return this.items.get(0)

            },
            setPanelWidth: function(a) {
                this.getFieldPanel().setWidth(a)
            },
            reorder: function(a) {
                var b = this.ownerCt;
                b.insert(b.items.indexOf(a), this);
                this.getEl().insertBefore(a.getEl());
                b.doLayout()
            },
            remove: function() {
        		this.ownerCt.remove(this, true);
   			},
            processPath: function(a) {
                this.fields.each(function(b) {
                    if (b.processPath) {
                        b.processPath(a)
                    }
                })
            },
            getValue: function() {
                var a = {};
                this.fields.each(function(b) {
                    if($.inArray(b.getValue,this) < 0){
                         a[b.rawFieldName] = b.getValue()
                    }

                });
                return a
            },
            setValue: function(a) {
                this.fields.each(function(b) {

                    if (a[b.rawFieldName]) {
                        b.setValue(a[b.rawFieldName])
                    }
                    console.log(this);
                })
            }
        });
CQ.Ext.reg("multimulticompositefielditem",
    CQ.form.MultiMultiCompositeField.Item);
