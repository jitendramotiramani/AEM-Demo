CQ.form.ArticleSliderWidget = CQ.Ext.extend(CQ.form.CompositeField, {

	hiddenField: null,

    title: null, 

    price: null,

    smartImage: null,

    linkPath: null,

    constructor: function(config) {
        config = config || { };
        var defaults = {
            "border": true,
            "stateful": false,
            "style": "padding:2px 0 0 2px;"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        CQ.form.ArticleSliderWidget.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent: function() {
CQ.form.ArticleSliderWidget.superclass.initComponent.call(this);

       this.hiddenField = new CQ.Ext.form.Hidden({
            name: this.name,
            "stateful": false
        });
        this.add(this.hiddenField);

        this.title = new CQ.Ext.form.TextField({
            fieldLabel:"Title",
            padding:"10px 10px",
            width:500,
            allowBlank:false

        });
        this.add(this.title);

        this.price = new CQ.Ext.form.TextField({
            fieldLabel:"Price",
            padding:"10px 10px",
            width:500,
            allowBlank:false

        });
        this.add(this.price);




        this.smartImage = new CQ.form.PathField({
            fieldLabel:"Select Image",
            padding:"10px 10px",
            width:500,
            rootPath:"/content/dam/DXM",
            allowBlank:false

        });
        this.add(this.smartImage);

        this.linkPath = new CQ.form.PathField({
            fieldLabel:"Link To",
            padding:"10px 10px",
            width:500,
            allowBlank:false

        });
        this.add(this.linkPath);


    },

    // overriding CQ.form.CompositeField#setValue
    setValue: function(value) {

        var localTitle = '';
        var localPrice = '';

        var localSmartImage = '';
        var localLinkPath = '';



        if (value) {
            var accValue = value.split('|');
            if(accValue.length > 0) {
            	localTitle = accValue[0];
            	localPrice = accValue[1];
            	localSmartImage = accValue[2];
            	localLinkPath = accValue[3];


			}
        }

	    this.title.setValue(localTitle);
		this.price.setValue(localPrice);
        this.smartImage.setValue(localSmartImage);
        this.linkPath.setValue(localLinkPath);

    },

    // overriding CQ.form.CompositeField#getValue
    getValue: function() {
        return this.getRawValue();
    },

    // overriding CQ.form.CompositeField#getRawValue
    getRawValue: function() {

        var localTitle = this.title.getValue() || "";
        var localPrice = this.price.getValue() || "";

        var localSmartImage = this.smartImage.getValue() || "";
        var localLinkPath = this.linkPath.getValue() || "";


        var value = localTitle + "|" +localPrice + "|" +localSmartImage + "|" +localLinkPath;

        this.hiddenField.setValue(value);
        return value;
    },

    // Validation --------------------------------------------------------------------------



});

// register xtype
CQ.Ext.reg('featuredSliderWidget', CQ.form.ArticleSliderWidget);