const presets = [
    [
        "@babel/env",
        {
            targets: {
                ie: "9",
                edge: "15",
                firefox: "57",
                chrome: "65",
                safari: "10.3",
                ios: "10",
                android: "5.6"
            },
            useBuiltIns: "usage",
        },
    ],
];

module.exports = {
    presets
};
