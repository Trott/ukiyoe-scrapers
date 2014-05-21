module.exports = function(options, casper) {
    return {
        scrape: [
            {
                start: "http://artgallery.yale.edu/collection/search?field_object_department_tid=All&title=&field_geography_value=&field_classification_value=All&field_medium_value=woodblock&field_object_number_value=&title_1=&field_culture_value=Japanese&field_object_location_value=All&sort_by=title",
                next: "//a[contains(.//text(),'next')]",
                visit: "//h2/a"
            },
            {
                extract: {
                    title: "//title",
                    date: "//div[contains(@class,'field-name-field-dated')]",
                    artists: "//div[contains(@class,'field-name-object-artists')]",
                    dimensions: "//div[contains(@class,'field-name-field-dimensions')]",
                    "images[]": "//a[@class='download']/@href",
                    "_ids[]": function(data) {
                        if (data.images) {
                            return data.images.map(function(val) {
                                return /objectid=(\d+)/.exec(val)[1];
                            });
                        }
                    }
                }
            }
        ]
    };
};