// WME-India-Tools settings — single source of truth for tunable config.
// Loaded into the userscript via @require (global `toolSettings`). Structure MUST stay identical to
// WMEITK_BUILTIN_DEFAULTS in WME-India-Tools.user.js (the offline fallback copy).
var toolSettings = {
    raidMode: true,
    enabledCountries: ["IN", "TH", "IT"],
    // Global blocklist: lowercased usernames that are fully blocked from the toolkit.
    bannedUsers: [],
    // Per-user feature entitlements: lowercased username -> array of feature ids, or ["*"] for all.
    featureGrants: {},
    countries: {
        IN: {
            moveStep: 0.00001,
            debugMode: false,
            memberLevel: 1,
            silverLevel: 2,
            goldLevel: 4,
            geometryDistortionTolerance: 0.8,
            segmentLengthTolerance: 20,
            platinumMembers: ["himalayantth", "mclarenmcl38", "thefastestferrari"],
            betaMembers: ["himalayantth", "mclarenmcl38", "happyswift", "anikj"],
            gasStations: [
                {"name": "Adani CNG ", "altName": "Adani", "buttonName": "ADANI", "brand": "Adani CNG "},
                {"name": "Bharat Petroleum", "altName": "BP", "buttonName": "BP", "brand": "Bharat Petroleum"},
                {"name": "Essar", "altName": "Nayara", "buttonName": "ESSAR", "brand": "Essar"},
                {"name": "Go Gas CNG", "altName": "", "buttonName": "GO", "brand": "Go Gas CNG"},
                {"name": "Gujarat Gas CNG", "altName": "", "buttonName": "GUJ", "brand": "Gujarat Gas CNG"},
                {"name": "Hindustan Petroleum", "altName": "HP", "buttonName": "HP", "brand": "Hindustan Petroleum"},
                {"name": "Indian Oil", "altName": "IOC", "buttonName": "IOC", "brand": "Indian Oil"},
                {"name": "Indraprastha Gas", "altName": "", "buttonName": "INDRA", "brand": "Indraprastha Gas"},
                {"name": "Jio - bp", "altName": "", "buttonName": "JIO", "brand": "Jio - bp"},
                {"name": "MNGL CNG ", "altName": "", "buttonName": "MNGL", "brand": "MNGL CNG "},
                {"name": "Nayara Energy", "altName": "Nayara", "buttonName": "NAYARA", "brand": "Nayara Energy"},
                {"name": "ONGC", "altName": "", "buttonName": "ONGC", "brand": "ONGC"},
                {"name": "Reliance Petroleum", "altName": "", "buttonName": "RELIANCE", "brand": "Reliance Petroleum"},
                {"name": "Shell", "altName": "", "buttonName": "SHELL", "brand": "Shell"},
            ],
            railwayStreetName: "Indian Railways",
            lockLevels: {
                PRIMARY_STREET: 1, MINOR_HIGHWAY: 2, MAJOR_HIGHWAY: 3, FREEWAY: 4, RAMP: 2,
                PARKING_LOT: 1, PRIVATE_ROAD: 1, RAILWAY: 3, GAS_STATION: 1,
                JUNCTION_INTERCHANGE: 2, SEA_LAKE_POND: 1, RIVER_STREAM: 1, SCHOOL: 2,
            },
            maxSpeeds: {
                PRIMARY_STREET: 40, MINOR_HIGHWAY: 50, MAJOR_HIGHWAY: 80, FREEWAY: 100, RAMP: 40,
                PARKING_LOT: 20, PRIVATE_ROAD: 20, ROUNDABOUT: 30
            },
            roadRenames: [
                {short: "rd", long: "Road"},
                {short: "st", long: "Street"},
                {short: "ln", long: "Lane"},
                {short: "hwy", long: "Highway"},
                {short: "expy", long: "Expressway"},
                {short: "pt", long: "Path"},
                {short: "<", long: "to"},
                {short: ">", long: "to"},
            ]
        },
        TH: {
            moveStep: 0.00001,
            debugMode: false,
            memberLevel: 1,
            silverLevel: 2,
            goldLevel: 4,
            geometryDistortionTolerance: 0.8,
            segmentLengthTolerance: 20,
            platinumMembers: ["himalayantth", "mclarenmcl38"],
            betaMembers: ["himalayantth", "mclarenmcl38", "happyswift", "anikj"],
            gasStations: [
                {"name": "สถานีบริการ PTT", "altName": "PTT", "buttonName": "PTT", "brand": "PTT"},
                {"name": "สถานีบริการน้ำมัน PT", "altName": "PT", "buttonName": "PT", "brand": "PT"},
                {"name": "สถานีบริการ PT LPG", "altName": "PT LPG", "buttonName": "PT LPG", "brand": "PT LPG"},
                {"name": "Pure", "altName": "", "buttonName": "Pure", "brand": "Pure"},
                {"name": "สถานีบริการ Bangchak", "altName": "Bangchak", "buttonName": "Bangchak", "brand": "BCP"},
                {"name": "สถานีบริการ Caltex", "altName": "Caltex", "buttonName": "Caltex", "brand": "Caltex"},
                {"name": "สถานีบริการ Shell", "altName": "Shell", "buttonName": "Shell", "brand": "Shell"},
                {"name": "สถานีบริการ Susco", "altName": "Susco", "buttonName": "Susco", "brand": "Susco"},
            ],
            railwayStreetName: "ทางรถไฟ - Thai Railway",
            lockLevels: {
                PRIMARY_STREET: 1, MINOR_HIGHWAY: 2, MAJOR_HIGHWAY: 3, FREEWAY: 4, RAMP: 3,
                PARKING_LOT: 1, PRIVATE_ROAD: 1, RAILWAY: 4, GAS_STATION: 2,
                JUNCTION_INTERCHANGE: 4, SEA_LAKE_POND: 1, RIVER_STREAM: 1, SCHOOL: 1,
            },
            maxSpeeds: {
                PRIMARY_STREET: 60, MINOR_HIGHWAY: 80, MAJOR_HIGHWAY: 90, FREEWAY: 100, RAMP: 40,
                PARKING_LOT: 20, PRIVATE_ROAD: 30, ROUNDABOUT: 30
            },
            roadRenames: [
                {short: "r#####d", long: "Road"},
            ]
        },
        IT: {
            moveStep: 0.00001,
            debugMode: false,
            memberLevel: 1,
            silverLevel: 2,
            goldLevel: 4,
            geometryDistortionTolerance: 0.8,
            segmentLengthTolerance: 20,
            // Italy is restricted to these editors only; they are also treated as platinum.
            restrictedEditors: ["asterix06", "miole67", "vincio60"],
            platinumMembers: ["asterix06", "miole67", "vincio60"],
            betaMembers: ["asterix06", "miole67", "vincio60"],
            // No change in segment speed for Italy: default/roundabout speeds are never written.
            applyDefaultSpeeds: false,
            // Bug button / Clean Up may only run these segment fixers in Italy.
            bugButtonAllowedFixes: ["fixLocks", "fixUnUsedSpeed"],
            gasStations: [
                {"name": "Agip Eni", "altName": "Eni", "buttonName": "ENI", "brand": "Agip Eni"},
                {"name": "Q8", "altName": "", "buttonName": "Q8", "brand": "Q8"},
                {"name": "IP", "altName": "", "buttonName": "IP", "brand": "IP"},
                {"name": "Esso", "altName": "", "buttonName": "ESSO", "brand": "Esso"},
                {"name": "Tamoil", "altName": "", "buttonName": "TAMOIL", "brand": "Tamoil"},
                {"name": "Shell", "altName": "", "buttonName": "SHELL", "brand": "Shell"},
            ],
            railwayStreetName: "Ferrovie dello Stato",
            // Lock values are 0-based lockRank = WME UI lock level - 1.
            lockLevels: {
                STREET: 1, PRIMARY_STREET: 2, MINOR_HIGHWAY: 3, MAJOR_HIGHWAY: 4, FREEWAY: 5, RAMP: 4,
                PARKING_LOT: 1, PRIVATE_ROAD: 1, RAILWAY: 3, GAS_STATION: 2,
                JUNCTION_INTERCHANGE: 3, SEA_LAKE_POND: 1, RIVER_STREAM: 1, SCHOOL: 1,
            },
            // maxSpeeds are NOT applied for Italy (applyDefaultSpeeds:false); kept for completeness.
            maxSpeeds: {
                PRIMARY_STREET: 50, MINOR_HIGHWAY: 70, MAJOR_HIGHWAY: 90, FREEWAY: 130, RAMP: 40,
                PARKING_LOT: 20, PRIVATE_ROAD: 30, ROUNDABOUT: 30
            },
            // Require Rename is OFF for Italy, so roadRenames are not applied.
            roadRenames: [],
            // Italy auto-on preferences (only these on; everything else off).
            defaultPreferences: {
                requireRename: false,
                fixDefaultSpeed: false,
                fixUnUsedSpeed: true,
                fixGeometry: false,
                fixLocks: true,
                fixSegmentLength: true,
                fixStreetSpeed: false,
                fixUTurnRoadTypes: false,
                showJunctionAngles: false,
                showBadJunctionAngles: true,
                showBtoAOneWay: false,
                clickFixBadJunctionAngles: false,
                venueLockLevel: 3,
                highlightVenuesBelowLockLevel: false,
                lockVenuesOnBugButton: true,
            }
        }
    }
};
