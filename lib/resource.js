"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = [{
        string: {
            stringValue: 'WASHINGTON'
        },
        boolean: {
            booleanValue: true
        },
        null: {
            nullValue: null
        },
        double: {
            doubleValue: 523.3892
        },
        integer: {
            integerValue: '3'
        },
        geoPoint: {
            geoPointValue: {
                latitude: 123.456,
                longitude: 234.23
            }
        },
        reference: {
            referenceValue: 'Reference'
        },
        array: {
            arrayValue: {
                values: [
                    { stringValue: 'abc' },
                    { timestampValue: Date.now() },
                    {
                        arrayValue: {
                            values: [
                                { stringValue: 'abc' },
                                { integerValue: '234' }
                            ]
                        }
                    },
                    {
                        mapValue: {
                            fields: {
                                integer: {
                                    integerValue: '1526'
                                },
                                geoPoint: {
                                    geoPointValue: {
                                        latitude: 23.4,
                                        longitude: 2.45
                                    }
                                }
                            }
                        }
                    }
                ]
            },
        },
        maps: {
            mapValue: {
                fields: {
                    double: {
                        doubleValue: 523.3892
                    },
                    geoPoint: {
                        geoPointValue: {
                            latitude: 123.456,
                            longitude: 234.23
                        }
                    },
                    array: {
                        arrayValue: {
                            values: [
                                { stringValue: 'abc' },
                                { integerValue: '234' },
                                {
                                    geoPointValue: {
                                        latitude: 123.456,
                                        longitude: 234.23
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        id: '53-0196605'
    }];
