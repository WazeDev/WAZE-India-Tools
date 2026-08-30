// ==UserScript==
// @name         WME-India-Tools
// @namespace    http://tampermonkey.net/
// @version      2026-08-29.01
// @description  Designed for access to most often used functionalities to improve efficiency
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/*
// @exclude      https://www.waze.com/user/editor*
// @author       himalayantth
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMEUwNDkwQzE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMEUwNDkwRDE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRTA0OTBBMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAwRTA0OTBCMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OIHw6AAAAPlJREFUeNpi/D/T+D/DAAAmhgECoxYPf4sZ/wPBQFn8CUjzEqvh7cffDAtX32Xg4WZhYGJkZHj/8SdDTLAKg6QIGyn2fiY5qGdN38/A8OU5g5k2F4OxBicD59+3DHNm7CXZxyykKL548TGDmCgHg6mpMoObWz/Dr19/GHbvLmS4desZWE5fX5Y2Fv/794+BhYWR4e/ff0BLfwPxX4Y/f0BiTAz///+jbRy3te5gEBTgYrCyVgY65D/DuXOPGJ49/cBQW+9FUhyTbPGnt78Z9qx7wiAozMnAyMTI8OblVwYnfxkGIQk2ki0emOwk3MExWjuNWjy8LAYIMADBumJ9k9IhVwAAAABJRU5ErkJggg==
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      github.com
// @connect      raw.githubusercontent.com
// @require      https://greasyfork.org/scripts/560385/code/WazeToastr.js
// @require     https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js
// @downloadURL  https://github.com/WazeDev/WAZE-India-Tools/raw/refs/heads/main/WME-India-Tools.user.js
// @updateURL    https://github.com/WazeDev/WAZE-India-Tools/raw/refs/heads/main/WME-India-Tools.meta.js
// @require      https://raw.githubusercontent.com/WazeDev/WAZE-India-Tools/main/WME-India-Tools-setting.js?t=%%TIMESTAMP%%
// ==/UserScript==


// Single source of truth for tunable config lives in the @require'd WME-India-Tools-setting.js
// (global `toolSettings`). This embedded copy is ONLY a fallback used when that file fails to load,
// so the toolkit still runs. Its per-country blocks are structurally IDENTICAL to the legacy
// COUNTRY_CONFIG shape (flat lockLevels/maxSpeeds with WME-style UPPERCASE keys), so getCountryConfig
// and every `this.cfg.*` read site consume it unchanged.
const WMEITK_BUILTIN_DEFAULTS = {
    raidMode: true,
    enabledCountries: ["IN", "TH", "IT"],
    bannedUsers: [],
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
            restrictedEditors: ["asterix06", "miole67", "vincio60"],
            platinumMembers: ["asterix06", "miole67", "vincio60"],
            betaMembers: ["asterix06", "miole67", "vincio60"],
            applyDefaultSpeeds: false,
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
            lockLevels: {
                STREET: 1, PRIMARY_STREET: 2, MINOR_HIGHWAY: 3, MAJOR_HIGHWAY: 4, FREEWAY: 5, RAMP: 4,
                PARKING_LOT: 1, PRIVATE_ROAD: 1, RAILWAY: 3, GAS_STATION: 2,
                JUNCTION_INTERCHANGE: 3, SEA_LAKE_POND: 1, RIVER_STREAM: 1, SCHOOL: 1,
            },
            maxSpeeds: {
                PRIMARY_STREET: 50, MINOR_HIGHWAY: 70, MAJOR_HIGHWAY: 90, FREEWAY: 130, RAMP: 40,
                PARKING_LOT: 20, PRIVATE_ROAD: 30, ROUNDABOUT: 30
            },
            roadRenames: [],
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

// Deep-merge one country's external overrides over its built-in block. lockLevels / maxSpeeds /
// defaultPreferences are merged key-by-key so a partial override never drops required keys; arrays
// (gasStations, roadRenames, restrictedEditors, bugButtonAllowedFixes) are replaced wholesale.
function wmeitkMergeCountry(base, ext) {
    const b = base || {};
    const e = ext || {};
    const out = {...b, ...e};
    out.lockLevels = {...(b.lockLevels || {}), ...(e.lockLevels || {})};
    out.maxSpeeds = {...(b.maxSpeeds || {}), ...(e.maxSpeeds || {})};
    if (b.defaultPreferences || e.defaultPreferences) {
        out.defaultPreferences = {...(b.defaultPreferences || {}), ...(e.defaultPreferences || {})};
    }
    return out;
}

function wmeitkResolveSettings(external) {
    const base = WMEITK_BUILTIN_DEFAULTS;
    if (!external || typeof external !== "object") {
        console.warn("WME-India-Tools: toolSettings missing/invalid — using built-in defaults.");
        external = {};
    }
    const merged = {...base, ...external};
    merged.countries = {};
    const keys = new Set([...Object.keys(base.countries), ...Object.keys(external.countries || {})]);
    keys.forEach((k) => {
        merged.countries[k] = wmeitkMergeCountry(base.countries[k], (external.countries || {})[k]);
    });
    return merged;
}


class WMEIndiaTools {

    constructor(options) {
        this.version = "2026-08-29.01";
        // Resolved config: the @require'd `toolSettings` deep-merged over the built-in defaults.
        this.settings = wmeitkResolveSettings(typeof toolSettings !== "undefined" ? toolSettings : options.toolSettings);
        this.toolSettings = options.toolSettings;
        this.MOVE_STEP = (options.moveStep !== undefined) ? options.moveStep : 0.00001;
        this.DEBUG_WME_INDIA_TOOL_KIT = (options.debugMode !== undefined) ? options.debugMode : false;
        this.WMEITK_MEMBER_LEVEL_MEMBER = (options.memberLevel !== undefined) ? options.memberLevel : 1;
        this.WMEITK_MEMBER_LEVEL_SILVER = (options.silverLevel !== undefined) ? options.silverLevel : 2;
        this.WMEITK_MEMBER_LEVEL_GOLD = (options.goldLevel !== undefined) ? options.goldLevel : 4;
        this.WMEITK_PLATINUM_MEMBERS = (options.platinumMembers !== undefined) ? options.platinumMembers : ["himalayantth", "mclarenmcl38"];
        this.WMEITK_BETA_MEMBERS = (options.debugMode !== undefined) ? options.debugMode : ["himalayantth", "mclarenmcl38", "happyswift", "anikj"];

        // ROAD, Segments

        this.ROAD_TYPE_STREET = 1;
        this.ROAD_TYPE_PRIMARY_STREET = 2;
        this.ROAD_TYPE_FREE_WAY = 3;
        this.ROAD_TYPE_RAMPS = 4;
        this.ROAD_TYPE_MAJOR_HIGHWAY = 6;
        this.ROAD_TYPE_MINOR_HIGHWAY = 7;
        this.ROAD_TYPE_FERRY = 14;
        this.ROAD_TYPE_PARKING_LOT_ROAD = 20;
        this.ROAD_TYPE_RAILWAY = 18;

        this.DEFAULT_PS_LOCK_LEVEL = 1;
        this.DEFAULT_PS_MAX_SPEED = 40;
        this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL = 2;
        this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED = 50;
        this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL = 3;
        this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED = 80;
        this.DEFAULT_RAMP_LOCK_LEVEL = 2;
        this.DEFAULT_RAMP_MAX_SPEED = 40;
        this.DEFAULT_FREE_WAY_LOCK_LEVEL = 4;
        this.DEFAULT_FREE_WAY_MAX_SPEED = 100;
        this.DEFAULT_PARKING_LOT_ROAD_SPEED = 20;
        this.DEFAULT_PARKING_LOT_ROAD_LOCK_LEVEL = 1;
        this.DEFAULT_PRIVATE_ROAD_SPEED = 20;
        this.DEFAULT_PRIVATE_ROAD_LOCK_LEVEL = 1;
        this.DEFAULT_RAILWAY_LOCK_LEVEL = 3;
        this.DEFAULT_RAILWAY_STREET_NAME = "Indian Railways";
        this.DEFAULT_RA_MAX_SPEED = 30;
        this.MAX_EDITS_PER_DAY = 200;
        this.MAX_EDITS_PER_TRANSACTION = 50;

        this.DEFAULT_JUNCTION_INTERCHANGE_LOCK_LEVEL = 2;
        this.DEFAULT_SEA_LAKE_POND_LOCK_LEVEL = 1;
        this.DEFAULT_RIVER_STREAM_LOCK_LEVEL = 1;
        this.DEFAULT_SCHOOL_LOCK_LEVEL = 2;
        this.DEFAULT_GAS_STATION_LOCK_LEVEL = 1;
        this.GEOMETRY_DISTORTION_TOLERANCE = .8;
        this.SEGMENT_LENGTH_TOLERANCE = 20;

        this.GAS_STATIONS = (options.gasStations !== undefined) ? options.gasStations : [{
            "name": "Adani CNG ", "altName": "Adani", "buttonName": "ADANI"
        }, {"name": "Bharat Petroleum", "altName": "BP", "buttonName": "BP"}, {
            "name": "Essar", "altName": "Nayara", "buttonName": "ESSAR"
        }, {"name": "Go Gas CNG", "altName": "", "buttonName": "GO"}, {
            "name": "Gujarat Gas CNG", "altName": "", "buttonName": "GUJ"
        }, {"name": "Hindustan Petroleum", "altName": "HP", "buttonName": "HP"}, {
            "name": "Indian Oil", "altName": "IOC", "buttonName": "IOC"
        }, {"name": "Indraprastha Gas", "altName": "", "buttonName": "INDRA"}, {
            "name": "Jio - bp", "altName": "", "buttonName": "JIO"
        }, {"name": "MNGL CNG ", "altName": "", "buttonName": "MNGL"}, {
            "name": "Nayara Energy", "altName": "Nayara", "buttonName": "NAYARA"
        }, {"name": "ONGC", "altName": "", "buttonName": "ONGC"}, {
            "name": "Reliance Petroleum", "altName": "", "buttonName": "RELIANCE"
        }, {"name": "Shell", "altName": "", "buttonName": "SHELL"},];

        this.ROAD_RENAMES = [{
            short: "rd", long: "Road"
        }, {
            short: "st", long: "Street"
        }, {
            short: "ln", long: "Lane"
        }, {
            short: "hwy", long: "Highway"
        }, {
            short: "hw", long: "Highway"
        }, {
            short: "expy", long: "Expressway"
        }, {
            short: "pt", long: "Path"
        }, {
            short: "<", long: "to"
        }, {
            short: ">", long: "to"
        }];
        this.ICON_SEGMENT_DISTORTION = `<svg height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 280.028 280.028" xml:space="preserve">
            <g>
                <path style="fill:#fbc102;" d="M131.263,131.263v140.014c0,4.839,3.912,8.751,8.751,8.751s8.751-3.912,8.751-8.751V131.263H131.263
                    z"/>
                <path style="fill:#fbc900;" d="M140.014,0c48.331,0,87.509,39.186,87.509,87.509s-39.178,87.517-87.509,87.517
                    c-48.322,0.009-87.509-39.195-87.509-87.517S91.691,0,140.014,0z"/>
                <path style="fill:#b3941e;" d="M166.266,43.763c14.5,0,26.253,11.744,26.253,26.244S180.767,96.26,166.266,96.26
                    c-14.491,0-26.253-11.752-26.253-26.253C140.014,55.515,151.775,43.763,166.266,43.763z"/>
                <path style="fill:#000000;" d="M148.765,166.284c-48.313,0-87.509-39.204-87.509-87.526c0-21.938,8.13-41.934,21.466-57.292
                    C64.24,37.524,52.505,61.125,52.505,87.509c0,48.322,39.186,87.517,87.509,87.517c26.393,0,49.994-11.744,66.043-30.217
                    C190.699,158.163,170.703,166.284,148.765,166.284z"/>
            </g>
            </svg>`;
        this.renameHighLightStyle = {
            strokeColor: "#fffb00", strokeOpacity: .5, strokeWidth: 20, strokeDashstyle: null
        };
        this.speedHighlightStyle = {
            strokeColor: "#0f00f8", strokeOpacity: .5, strokeWidth: 20, strokeDashstyle: null
        };
        this.unusedSpeedHighlightStyle = {
            strokeColor: "#3c498a", strokeOpacity: .5, strokeWidth: 20, strokeDashstyle: null
        };
        this.segmentDistortionFeatureStyle = {
            graphic: true,
            externalGraphic: 'data:image/svg+xml;base64,' + btoa(this.ICON_SEGMENT_DISTORTION),
            graphicHeight: 30,
            graphicWidth: 30,
            graphicYOffset: -15,
            graphicXOffset: -15,
            graphicOpacity: 1
        };
        this.segmentLockMismatchFeatureStyle = {
            strokeColor: "#fd5050", strokeOpacity: .5, strokeWidth: 20, strokeDashstyle: null
        };
        this.streetSpeedHigLightsStyle = {
            strokeColor: "#0a4c03", strokeOpacity: .5, strokeWidth: 20, strokeDashstyle: null
        };
        this.BtoAOnewayRoadTypeStyle = {
            strokeColor: "#b60000", strokeOpacity: .9, strokeWidth: 8, strokeDashstyle: null
        };

        this.UTurnRoadTypeMisMatchStyle = {
            strokeColor: "#060142", strokeOpacity: .7, strokeWidth: 20, strokeDashstyle: null
        };
        this.originalSegmentStyle = {
            strokeColor: "#ff0000", strokeOpacity: .5, strokeWidth: 20, strokeDashstyle: null
        };
        this.simplifiedSegmentStyle = {
            strokeColor: "#00ff00", strokeOpacity: .5, strokeWidth: 30, strokeDashstyle: null
        };
        this.wmeSDK = null;
        this.WMEITK = {};
        this.userInfo = null;
        this.addedSegmentIds = [];
        this.selectedGasStation = null;
        this.country = "IN";
        // Enabled countries and per-country restricted-editor allowlists both come from settings.
        this.enabledCountries = this.settings.enabledCountries;
        // When false for the active country, default/roundabout segment speeds are never written
        // (lock fixing still runs). Set per-country in getCountryConfig.
        this.applyDefaultSpeeds = true;
        // Lock level (0-based lockRank) for plain Street segments; null means "do not auto-lock streets".
        this.DEFAULT_STREET_LOCK_LEVEL = null;
        this.sdkHighlightLayerName = "wmeitk-highlight-layer";
        this.sdkSegmentLengthLayerName = "segment-length-highlight-layer";
        this.sdkBadJunctionLayerName = "bad-junction-angle-highlight-layer";
        this.olVenuePointHighlightLayer = null;
        this.olVenueAreaHighlightLayer = null;
        this.olVenueHighlightLayerName = "venue-lock-highlight-layer";
        this.suppressAutoFixes = false;
        this._bjaFeatureMeta = new Map();
        this._bjaRenderedPoints = [];
        this.scriptEnabled = true;
        // Master switch for ALL U-turn functionality (disabled for everyone). Governs both the
        // bug-button U-turn enabling (cleanup/setSegmentUTurns) and the "Fix U-Turn Road Type"
        // highlight + its sidebar checkbox. Flip to true to re-enable.
        this.ENABLE_UTURN_FEATURE = false;
        this.simplifyTolerance = 0.00001;
        this.simplifyAngleTolerance = 5;
        this.simplifyLoad = 500;

        if (this.toolSettings === null) {
            this.toolSettings = {
                raidMode: false
            }
        }

        this.initializeSDK()
        this.isWMELoaded();
    }

    getCountryConfig(country) {
        // Config comes from the resolved settings (external toolSettings merged over built-in
        // defaults). Same flat per-country shape as the old COUNTRY_CONFIG, so the assignments below
        // are unchanged. Fall back to IN for any country without its own block.
        this.cfg = this.settings.countries[country] || this.settings.countries["IN"];

        console.log(this.cfg);

        this.country = country;
        this.MOVE_STEP = this.cfg.moveStep;
        this.DEBUG_WME_INDIA_TOOL_KIT = this.cfg.debugMode;
        this.WMEITK_MEMBER_LEVEL_MEMBER = this.cfg.memberLevel;
        this.WMEITK_MEMBER_LEVEL_SILVER = this.cfg.silverLevel;
        this.WMEITK_MEMBER_LEVEL_GOLD = this.cfg.goldLevel;
        this.WMEITK_PLATINUM_MEMBERS = this.cfg.platinumMembers;
        this.WMEITK_BETA_MEMBERS = this.cfg.betaMembers;
        this.GAS_STATIONS = this.cfg.gasStations;
        this.DEFAULT_RAILWAY_STREET_NAME = this.cfg.railwayStreetName;
        this.LOCK_LEVELS = this.cfg.lockLevels;
        this.MAX_SPEEDS = this.cfg.maxSpeeds;
        this.ROAD_RENAMES = this.cfg.roadRenames;

        this.DEFAULT_PS_LOCK_LEVEL = this.cfg.lockLevels.PRIMARY_STREET;
        this.DEFAULT_PS_MAX_SPEED = this.cfg.maxSpeeds.PRIMARY_STREET;
        this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL = this.cfg.lockLevels.MINOR_HIGHWAY;
        this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED = this.cfg.maxSpeeds.MINOR_HIGHWAY;
        this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL = this.cfg.lockLevels.MAJOR_HIGHWAY;
        this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED = this.cfg.maxSpeeds.MAJOR_HIGHWAY;
        this.DEFAULT_RAMP_LOCK_LEVEL = this.cfg.lockLevels.RAMP;
        this.DEFAULT_RAMP_MAX_SPEED = this.cfg.maxSpeeds.RAMP;
        this.DEFAULT_FREE_WAY_LOCK_LEVEL = this.cfg.lockLevels.FREEWAY;
        this.DEFAULT_FREE_WAY_MAX_SPEED = this.cfg.maxSpeeds.FREEWAY;
        this.DEFAULT_PARKING_LOT_ROAD_SPEED = this.cfg.maxSpeeds.PARKING_LOT;
        this.DEFAULT_PARKING_LOT_ROAD_LOCK_LEVEL = this.cfg.lockLevels.PARKING_LOT;
        this.DEFAULT_PRIVATE_ROAD_SPEED = this.cfg.maxSpeeds.PRIVATE_ROAD;
        this.DEFAULT_PRIVATE_ROAD_LOCK_LEVEL = this.cfg.lockLevels.PRIVATE_ROAD;
        this.DEFAULT_RAILWAY_LOCK_LEVEL = this.cfg.lockLevels.RAILWAY;
        this.DEFAULT_RAILWAY_STREET_NAME = this.cfg.railwayStreetName;
        this.DEFAULT_RA_MAX_SPEED = this.cfg.maxSpeeds.ROUNDABOUT;

        this.DEFAULT_JUNCTION_INTERCHANGE_LOCK_LEVEL = this.cfg.lockLevels.JUNCTION_INTERCHANGE;
        this.DEFAULT_SEA_LAKE_POND_LOCK_LEVEL = this.cfg.lockLevels.SEA_LAKE_POND;
        this.DEFAULT_RIVER_STREAM_LOCK_LEVEL = this.cfg.lockLevels.RIVER_STREAM;
        this.DEFAULT_SCHOOL_LOCK_LEVEL = this.cfg.lockLevels.SCHOOL;
        this.DEFAULT_GAS_STATION_LOCK_LEVEL = this.cfg.lockLevels.GAS_STATION;
        this.GEOMETRY_DISTORTION_TOLERANCE = this.cfg.geometryDistortionTolerance;
        this.SEGMENT_LENGTH_TOLERANCE = this.cfg.segmentLengthTolerance;
        // Plain Street lock (null unless the country config opts in, e.g. Italy).
        this.DEFAULT_STREET_LOCK_LEVEL = (this.cfg.lockLevels.STREET !== undefined) ? this.cfg.lockLevels.STREET : null;
        // Suppress default/roundabout speed writes when the country opts out (e.g. Italy).
        this.applyDefaultSpeeds = (this.cfg.applyDefaultSpeeds !== undefined) ? this.cfg.applyDefaultSpeeds : true;
    }

    initializeSDK() {
        this.wmeSDK = getWmeSdk({scriptId: "waze-india-toolkit", scriptName: "WME-India-Tools"});
        this.initWMEITK();
    }

    isWMELoaded() {
        if (!document.getElementById('edit-panel') || !this.wmeSDK.DataModel.Countries.getTopCountry()) {
            setTimeout(() => {
                this.isWMELoaded();
            }, 250);
            return;
        }

        if (this.wmeSDK.State.isReady) {
            if (this.checkUserCountry()) {
                this.initializeTools();
            }
        }

    }

    isUserBanned(userName) {
        const u = String(userName || "").toLowerCase();
        const list = (this.settings && this.settings.bannedUsers) || [];
        return !!u && list.some((x) => String(x).toLowerCase() === u);
    }

    // Central feature gate. Order: script off / no user / banned -> false; explicit per-user grant in
    // settings.featureGrants (or "*") -> true; else the default role logic (platinum => all).
    hasFeature(featureId) {
        if (!this.scriptEnabled) return false;
        const user = this.userInfo && this.userInfo.userName ? this.userInfo.userName.toLowerCase() : "";
        if (!user || this.isUserBanned(user)) return false;
        const grants = this.settings && this.settings.featureGrants ? this.settings.featureGrants[user] : null;
        if (grants && (grants.includes("*") || grants.includes(featureId))) return true;
        return this.defaultFeatureAccess(featureId, user);
    }

    // Legacy role logic, preserving today's behaviour: platinum members get every feature. With an
    // empty featureGrants this makes hasFeature identical to the old PLATINUM_MEMBERS.includes checks.
    defaultFeatureAccess(featureId, user) {
        const platinum = (this.WMEITK_PLATINUM_MEMBERS || []).map((x) => String(x).toLowerCase());
        return platinum.includes(user);
    }

    checkUserCountry() {
        this.userInfo = this.wmeSDK.State.getUserInfo();
        let topCountry = null;
        if (this.wmeSDK.DataModel.Countries.getTopCountry() !== undefined) {
            topCountry = this.wmeSDK.DataModel.Countries.getTopCountry();
        }
        if (topCountry == null) {
            this.log("Incorrect Zoom Level");
            return;
        }
        this.log(topCountry.abbr);
        // Global ban list — enforced before any country/rank gate. A banned user gets nothing.
        if (this.isUserBanned(this.userInfo && this.userInfo.userName)) {
            this.log(`User ${this.userInfo && this.userInfo.userName} is banned from WME-India-Tools.`);
            this.scriptEnabled = false;
            $("#WMEITK_TAB_BAR_VERSION").hide();
            $("#WMEITK_TAB_BAR_PANEL").hide();
            $("#wmeit-btn-global-clean").hide();
            $("#wmeitk-rr").hide();
            this.updateBugButtonVisibility();
            return false;
        }
        if (this.enabledCountries.includes(topCountry.abbr)) {
            const restrictedAllow = (this.settings.countries[topCountry.abbr] || {}).restrictedEditors;
            if (restrictedAllow && !restrictedAllow.includes(this.userInfo.userName.toLowerCase())) {
                this.log("Script in " + topCountry.abbr + " is restricted to authorized editors only.");
                $("#WMEITK_TAB_BAR_VERSION").hide();
                $("#WMEITK_TAB_BAR_PANEL").hide();
                $("#wmeit-btn-global-clean").hide();
                $("#wmeitk-rr").hide();
                this.scriptEnabled = false;
                this.country = topCountry.abbr;
                this.getCountryConfig(topCountry.abbr);
                return false;
            }
            this.scriptEnabled = true;
            $("#WMEITK_TAB_BAR_VERSION").show();
            $("#WMEITK_TAB_BAR_PANEL").show();
            $("#wmeitk-rr").show();
            this.country = topCountry.abbr;
            if (!this.hasFeature("toolkit")) {
                if (topCountry !== null) {

                    if (this.wmeSDK.DataModel.Countries.getTopCountry().abbr !== this.country) {
                        this.log("This script is not yet available for " + this.wmeSDK.DataModel.Countries.getTopCountry());
                        return false;
                    }
                } else {
                    this.log("This script is not yet available for " + this.wmeSDK.DataModel.Countries.getTopCountry());
                    return false;
                }
            }
        } else {
            this.log("Script is not available for " + topCountry.name + " (" + topCountry.abbr + ")");
            $("#WMEITK_TAB_BAR_VERSION").hide();
            $("#WMEITK_TAB_BAR_PANEL").hide();
            $("#wmeit-btn-global-clean").hide();
            $("#wmeitk-rr").hide();
            this.scriptEnabled = false;
        }
        this.getCountryConfig(this.wmeSDK.DataModel.Countries.getTopCountry().abbr)
        this.updateBugButtonVisibility();
        return true;
    }

    checkSegmentEditability(segment) {
        let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: segment.id});
        if (segmentAddress != null)
            if (segmentAddress.isEmpty === false)
                if (segmentAddress.country.abbr !== this.country)
                    return false;
        return true;
    }

    initializeTools() {
        this.userInfo = this.wmeSDK.State.getUserInfo();
        this.setupPublicShortcuts();
        this.setupShortcuts();
        this.setupEvents();
        if (!this.hasFeature("platinum-ui")) {
            if (this.toolSettings.raidMode) {
                return;
            }
        }
        //if (this.WMEITK_BETA_MEMBERS.includes(this.userInfo.userName.toLowerCase())) {
        if (this.userInfo.rank >= this.WMEITK_MEMBER_LEVEL_MEMBER) {
            if (this.userInfo.rank > this.WMEITK_MEMBER_LEVEL_SILVER) {
                this.MAX_EDITS_PER_DAY = 500;
                this.MAX_EDITS_PER_TRANSACTION = 75;
            }
            if (this.hasFeature("platinum-ui")) {
                this.MAX_EDITS_PER_TRANSACTION = 1000;
            }
            if (this.userInfo.userName.toLowerCase() === "himalayantth") {
                this.MAX_EDITS_PER_TRANSACTION = 75;
                this.simplifyLoad = 100;
            }
            if (this.userInfo.rank > this.WMEITK_MEMBER_LEVEL_MEMBER) {
                let cleanUpGlobal = `
                    <wz-button color="text" class="wmeit-buton" size="sm" style="margin-top: 20px;"  disabled="false" id="wmeit-btn-global-clean">
                        <i class="w-icon w-icon-bug-fill" style="color: #33CCFF"></i>
                        <wz-notification-indicator value="0" id="wmeitk-error-counts" class="counter"></wz-notification-indicator>
                    </wz-button>
                `;
                if (this.isBugButtonAllowed()) {
                    $("#drawer").append(cleanUpGlobal);
                }
                $("#wmeit-btn-global-clean").on("click", () => {
                    const shouldLockVenues = $("#wmeitk-chk-lock-venues-on-bug-button").prop('checked') === true;
                    this.cleanup();
                    if (shouldLockVenues) {
                        setTimeout(() => this.lockAllVenues(), 0);
                    }
                });
                // Apply the visibility gate immediately so the button never flashes before the
                // delayed refresh runs (e.g. hidden during the India 13-30 Jun window for non-platinum).
                this.updateBugButtonVisibility();

                // Each drawer button is gated by its OWN feature id so per-user featureGrants surface
                // exactly the buttons a user is entitled to (platinum still gets all via defaultFeatureAccess).
                if (this.hasFeature("simplify-geometry")) {
                    let simplifyGlobal = `
                    <wz-button color="text" class="wmeit-buton" size="sm" style="margin-top: 20px;" disabled="false" id="wmeit-btn-global-simplify">
                        <i class="w-icon w-icon-thunderbolt" style="color: #33CCFF"></i>
                        <wz-notification-indicator value="0" id="wmeitk-simplify-counts" class="counter"></wz-notification-indicator>
                    </wz-button>
                `;

                    $("#drawer").append(simplifyGlobal);
                    $("#wmeit-btn-global-simplify").on("click", () => {
                        this.simplify();
                    });
                }

                if (this.hasFeature("fix-bja")) {
                    let fixBJA = `
                                  <wz-button color="text" class="wmeit-buton" size="sm" style="margin-top: 20px;"  disabled="false" id="wmeit-btn-fix-bja">
                                        <i class="w-icon w-icon-warning" style="color: #d69700"></i>
                                  </wz-button>
                                `;

                    $("#drawer").append(fixBJA);
                    $("#wmeit-btn-fix-bja").on("click", () => {
                        this.fixBadJunctionAnglesVisible();
                    });

                    this.updateFixBJAButtonVisibility();
                }

                if (this.hasFeature("fix-bto-a")) {
                    let bToASelctor = `
                      <wz-button color="text" class="wmeit-buton" size="sm" style="margin-top: 20px;"  disabled="false" id="wmeit-btn-select-b-to-a">
                            <i class="w-icon w-icon-node" style="color: #33CCFF"></i>
                        </wz-button>
                    `;

                    $("#drawer").append(bToASelctor);
                    $("#wmeit-btn-select-b-to-a").on("click", () => {
                        this.fixBtoA();
                    });

                    // NOTE: pip-sv has a streetview icon but its click handler calls fixBtoA() — this
                    // mirrors the pre-existing behaviour; grouped with fix-bto-a because that is what it runs.
                    let pipSV = `
                      <wz-button color="text" class="wmeit-buton" size="sm" style="margin-top: 20px;"  disabled="false" id="wmeit-btn-pip-sv">
                            <i class="w-icon w-icon-streetview" style="color: #33CCFF"></i>
                        </wz-button>
                    `;

                    $("#drawer").append(pipSV);
                    $("#wmeit-btn-pip-sv").on("click", () => {
                        this.fixBtoA();
                    });
                }

            }
            this.setupScriptTabBar().then(r => {
            });
            this.setupLayers();
            setTimeout(() => {
                // Apply initial visibility (hides UI outside configured countries and the bug
                // button during the India window) once the DOM elements have been created.
                this.refreshScriptUiVisibility();
                if (!this.scriptEnabled)
                    return;
                $("#wmeit-btn-fix-bja").hide();
                this.scanMap();
                this.handleSegmentSelection();
            }, 600);
            this.calcRunRate();
        }
        //}
    }

    updateFixBJAButtonVisibility() {
        const zoom = this.wmeSDK.Map.getZoomLevel();
        if (zoom < 20) {
            $("#wmeit-btn-fix-bja").hide();
        } else {
            $("#wmeit-btn-fix-bja").show();
        }
    }

    isBugButtonAllowed() {
        if (!this.scriptEnabled) {
            return false;
        }
        // India: hide the bug button from 13 Jun 2026 through 31 Jul 2026 (inclusive),
        // except for himalayantth and mclarenmcl38.
        if (this.country === "IN") {
            const now = new Date();
            const hideStart = new Date(2026, 5, 13, 0, 0, 0, 0);
            const hideEnd = new Date(2026, 6, 31, 23, 59, 59, 999);
            // if (now >= hideStart && now <= hideEnd) {
                const userName = (this.userInfo && this.userInfo.userName) ? this.userInfo.userName.toLowerCase() : "";
                const allowedEditors = ["himalayantth", "mclarenmcl38", "thefastestferrari"];
                if (!allowedEditors.includes(userName)) {
                    return false;
                }
            // }
        }
        return true;
    }

    updateBugButtonVisibility() {
        if (this.isBugButtonAllowed()) {
            $("#wmeit-btn-global-clean").show();
        } else {
            $("#wmeit-btn-global-clean").hide();
        }
    }

    refreshScriptUiVisibility() {
        if (this.scriptEnabled) {
            $("#WMEITK_TAB_BAR_VERSION").show();
            $("#WMEITK_TAB_BAR_PANEL").show();
            $("#wmeitk-rr").show();
        } else {
            $("#WMEITK_TAB_BAR_VERSION").hide();
            $("#WMEITK_TAB_BAR_PANEL").hide();
            $("#wmeitk-rr").hide();
        }
        this.updateBugButtonVisibility();
    }

    calcRunRate() {
        if (!this.scriptEnabled)
            return;
        this.wmeSDK.DataModel.Users.getUserProfile({userName: this.userInfo.userName})
            .then(userdata => {
                const dailyEditCounts = Array.isArray(userdata.dailyEditCount) ? userdata.dailyEditCount : [];
                let todayEditRate = 0;
                if (dailyEditCounts.length > 0) {
                    todayEditRate = Math.round(dailyEditCounts[dailyEditCounts.length - 1] / 24);
                }
                let weeklyEdits = 0;
                if (dailyEditCounts.length > 6) {
                    for (let i = 1; i < 8; i++) {
                        weeklyEdits += dailyEditCounts[dailyEditCounts.length - i];
                    }
                }
                let weeklyEditRate = Math.round(weeklyEdits / 7);
                let dailyEditCount = 0;
                if (dailyEditCounts.length > 0) {
                    dailyEditCount = dailyEditCounts[dailyEditCounts.length - 1];
                }
                let rrHTML = this.buildRunRateWidget(todayEditRate, weeklyEditRate, dailyEditCount);
                $("#wmeitk-rr").remove();

                $("#drawer").append(rrHTML);
            });
    }

    registerShortcut(shortcut) {
        const shortcutKeysInUse = shortcut.shortcutKeys && this.wmeSDK.Shortcuts.areShortcutKeysInUse({shortcutKeys: shortcut.shortcutKeys});
        // Wrap the callback so shortcuts never act outside a configured/permitted country.
        const originalCallback = shortcut.callback;
        const guardedShortcut = {
            ...shortcut,
            callback: (...args) => {
                if (!this.scriptEnabled) {
                    this.log(`Shortcut ${shortcut.shortcutId} ignored: script not enabled for this country.`);
                    return;
                }
                return originalCallback(...args);
            }
        };
        const shortcutConfig = shortcutKeysInUse ? {...guardedShortcut, shortcutKeys: ""} : guardedShortcut;
        try {
            this.wmeSDK.Shortcuts.createShortcut(shortcutConfig);
        } catch (e) {
            this.log(`Shortcut registration failed for ${shortcut.shortcutId}: ${e}`);
        }
    }

    setupPublicShortcuts() {
        this.registerShortcut({
            callback: () => {
                this.wmeSDK.Map.drawPolygon()
                    .then(geometry => {
                        let venueId = this.wmeSDK.DataModel.Venues.addVenue({
                            category: "GAS_STATION", geometry: geometry
                        });
                        let venueIds = [];
                        venueIds.push(venueId.toString());
                        this.wmeSDK.Editing.setSelection({selection: {ids: venueIds, objectType: "venue"}});
                    });
            }, description: 'Create Gas Station', shortcutId: 'create-gas-station', shortcutKeys: 'A+g'
        });
        this.registerShortcut({
            callback: () => {
                this.wmeSDK.Map.drawPolygon()
                    .then(geometry => {
                        let venueId = this.wmeSDK.DataModel.Venues.addVenue({
                            category: "SEA_LAKE_POOL", geometry: geometry
                        });
                        let venueIds = [];
                        venueIds.push(venueId.toString());
                        this.wmeSDK.Editing.setSelection({selection: {ids: venueIds, objectType: "venue"}});
                    });
            }, description: 'Create Sea/Lake/Pond ', shortcutId: 'create-sea-lake-pond-station', shortcutKeys: 'A+w'
        });
        this.registerShortcut({
            callback: () => {
                this.wmeSDK.Map.drawPolygon()
                    .then(geometry => {
                        let venueId = this.wmeSDK.DataModel.Venues.addVenue({
                            category: "RIVER_STREAM", geometry: geometry
                        });
                        let venueIds = [];
                        venueIds.push(venueId.toString());
                        this.wmeSDK.Editing.setSelection({selection: {ids: venueIds, objectType: "venue"}});
                    });
            }, description: 'Create River/Stream ', shortcutId: 'create-river-stream', shortcutKeys: 'A+r'
        });
        this.registerShortcut({
            callback: () => {
                if ($("div:contains(Other)").length > 0) {
                    $("div:contains(Other)").siblings("[slot='actions']").children().find("[class='polygon']").click();
                    this.isJunctionInterchangeClicked = true;
                } else if ($("div:contains(Others)").length > 0) {
                    $("div:contains(Others)").siblings("[slot='actions']").children().find("[class='polygon']").click();
                    this.isJunctionInterchangeClicked = true;
                }
            },
            description: 'Create Junction Interchange ',
            shortcutId: 'create-junction-interchange',
            shortcutKeys: 'A+j'
        });
    }

    setupShortcuts() {
        this.registerShortcut({
            callback: () => {
                this.wmeSDK.Map.drawPolygon()
                    .then(geometry => {
                        let venueId = this.wmeSDK.DataModel.Venues.addVenue({category: "SCHOOL", geometry: geometry});
                        let venueIds = [];
                        venueIds.push(venueId.toString());
                        this.wmeSDK.Editing.setSelection({selection: {ids: venueIds, objectType: "venue"}});
                    });
            }, description: 'Create School', shortcutId: 'create-school', shortcutKeys: 'A+s'
        });
        this.registerShortcut({
            callback: () => {
                $("wz-icon[name='railway-crossing']").parent().click();
            }, description: 'Add Level Crossing', shortcutId: 'add-level-crossing', shortcutKeys: 'A+c'
        });
        this.registerShortcut({
            callback: () => {
                $("wz-icon[name='toll-booth']").parent().click();
            }, description: 'Add Toll Booth', shortcutId: 'add-toll-booth', shortcutKeys: 'A+b'
        });
        this.registerShortcut({
            callback: () => {
                $("wz-icon[name='school-zone']").parent().click();
            }, description: 'Create School Zone ', shortcutId: 'create-school-zone', shortcutKeys: 'A+z'
        });
    }

    setupEvents() {
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        this.wmeSDK.Events.on({
            eventName: "wme-map-move-end", eventHandler: () => {
                this.checkUserCountry();
                if (this.scriptEnabled) {
                    this.suppressAutoFixes = true;
                    this.scanMap();
                    setTimeout(() => {
                        this.suppressAutoFixes = false;
                    }, 150);
                }
            }
        });

        this.wmeSDK.Events.on({
            eventName: "wme-selection-changed", eventHandler: () => {
                if (!this.scriptEnabled)
                    return;

                // $("#wmeit-btn-fix-segment").remove();
                let selectedData = this.wmeSDK.Editing.getSelection()
                if (selectedData != null) {
                    let selectedId = selectedData.ids[0];
                    switch (selectedData.objectType) {
                        case "venue":
                            this.handleVenueSelection(selectedId);
                            break;
                        case "segment":
                            this.handleSegmentSelection();
                            if (this.hasFeature("junction-angle-info")) {
                                this.calculateJunctionAngleInfo(selectedId);
                            }
                            break;
                    }
                }
            }
        });

        this.wmeSDK.Events.on({
            eventName: "wme-map-zoom-changed",
            eventHandler: () => {
                this.updateFixBJAButtonVisibility();
                if (this.scriptEnabled) {
                    this.suppressAutoFixes = true;
                    this.scanMap();
                    setTimeout(() => {
                        this.suppressAutoFixes = false;
                    }, 150);
                }
            }
        });

        this.wmeSDK.Events.on({
            eventName: "wme-after-edit", eventHandler: () => {
                let selection = this.wmeSDK.Editing.getSelection();
                if (selection != null) {
                    if (selection.objectType === "segment") {
                        this.wmeSDK.Map.removeAllFeaturesFromLayer({layerName: this.sdkSegmentLengthLayerName});
                        for (let i = 0; i < selection.ids.length; i++) {
                            let segment = this.wmeSDK.DataModel.Segments.getById({segmentId: selection.ids[i]})
                            this.highlightSegmentLength(segment);
                        }
                    }
                }
                setTimeout(() => this.scanMap(), 100);
            }
        });

        this.wmeSDK.Events.on({
            eventName: "wme-after-undo", eventHandler: () => {
                let selection = this.wmeSDK.Editing.getSelection();
                if (selection != null) {
                    if (selection.objectType === "segment") {
                        this.wmeSDK.Map.removeAllFeaturesFromLayer({layerName: this.sdkSegmentLengthLayerName});
                        for (let i = 0; i < selection.ids.length; i++) {
                            let segment = this.wmeSDK.DataModel.Segments.getById({segmentId: selection.ids[i]})
                            this.highlightSegmentLength(segment);
                        }
                    }
                }
                setTimeout(() => this.scanMap(), 100);
            }
        });

        this.wmeSDK.Events.on({
            eventName: "wme-map-data-loaded", eventHandler: () => {
                setTimeout(() => {
                    this.suppressAutoFixes = true;
                    this.scanMap();
                    setTimeout(() => {
                        this.suppressAutoFixes = false;
                    }, 150);
                }, 100);
                setTimeout(() => {
                    this.calcRunRate();
                }, 100)
            }
        });

    }

    initWMEITK() {
        this.WMEITK.UpdateObject = require("Waze/Action/UpdateObject");
        this.WMEITK.MultiAction = require("Waze/Action/MultiAction");
        this.WMEITK.TurnData = require("Waze/Model/Graph/TurnData");
        this.WMEITK.SetTurn = require("Waze/Model/Graph/Actions/SetTurn");
        if (typeof W !== "undefined" && W.model && W.model.actionManager && W.model.actionManager.events) {
            W.model.actionManager.events.register('afteraction', null, (event) => {
                this.onAction(event);
            });
        }
        this.wmeSDK.Events.trackDataModelEvents({dataModelName: "segments"});
        this.wmeSDK.Events.on({
            eventName: "wme-data-model-objects-added",
            eventHandler: (payload) => {
                if (!this.scriptEnabled) return;
                if (!payload || payload.dataModelName !== "segments" || !Array.isArray(payload.objectIds)) return;
                setTimeout(() => {
                    if (!this.scriptEnabled) return;
                    payload.objectIds.forEach((objectId) => {
                        // Only newly-drawn (unsaved) segments have negative ids — don't auto-address
                        // segments loaded from the server while panning.
                        const isNew = (typeof objectId === "number" && objectId < 0)
                            || (typeof objectId === "string" && String(objectId).startsWith("-"));
                        if (!isNew) return;
                        const segment = this.wmeSDK.DataModel.Segments.getById({segmentId: objectId});
                        if (segment) {
                            this.setupNewSegmentAddress(segment);
                        }
                    });
                }, 0);
            }
        });
        this.wmeSDK.Events.on({
            eventName: "wme-data-model-objects-changed",
            eventHandler: (payload) => {
                if (!payload || payload.dataModelName !== "segments") return;
            }
        });
        document.addEventListener("keydown", this.handleKeyDown);
    }

    setupScriptTabBar() {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.userInfo == null) {
                    this.userInfo = this.wmeSDK.State.getUserInfo();
                }
                let {tabLabel, tabPane} = await this.wmeSDK.Sidebar.registerScriptTab();
                tabLabel.innerHTML = "WMEITK"
                let tabPaneHtml = `
                    <div id="WMEITK_TAB_BAR_VERSION" style="text-align: center;color: blue;font-weight: bold; font-size: 12px"><span style="font-family: 'Waze Boing'"> Version : ` + this.version + ` </span></div>
                    <div id="WMEITK_TAB_BAR_PANEL" class="segment sidebar-column" style="padding: 15px;">
                        <wz-section-header headline="Segments" size="section-header2" back-button="false">
                        <span>Segments</span>
                        </wz-section-header>
                        <div style="margin: 5px;">
                            <wz-tabs>
                                <wz-tab is-active="true" label="Settings" tooltip="User Settings">
                                    <wz-label html-for="">Cleanup Maps</wz-label>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit" id="wmeitk-chk-enable-rename"  >
                                        <span style="width: 15px;height: 15px;background-color: #fffb00;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Require Rename
                                        </input>
                                    </div>
                                    <div style="display: flex; align-items: flex-start; ">
                                        <input type="checkbox" class="chk-wmeit" id="wmeitk-chk-fix-default-speed" name="" >
                                        <span style="width: 15px;height: 15px;background-color: #0f00f8;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix Default Speed
                                        </input>
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit" id="wmeitk-chk-fix-unused-speed" name="" >
                                        <span style="width: 15px;height: 15px;background-color: #3c498a;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix Unused Speed
                                        </input>
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit" id="wmeitk-chk-fix-geometry-distortion" name="" >
                                        <span style="width: 15px;height: 15px;background-color: #fbc102;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix Geometry
                                        </input>
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-fix-locks"
                                               name="" >
                                        <span style="width: 15px;height: 15px;background-color: #fd5050;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix Locks
                                        </input>
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-segment-length"
                                               name="">
                                        <span style="width: 15px;height: 15px;background-color: #000;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Check Segment Length
                                        </input>
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-show--bad-junction-angles"
                                               name="">
                                        <span style="width: 15px;height: 15px;background-color: #d69700;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Show Bad Junction Angles
                                        </input>
                                    </div>

                                    `;
                // Each preference checkbox is gated by its own feature id so per-user grants surface
                // exactly the toggles a user is entitled to (platinum still gets all).
                if (this.hasFeature("fix-street-speed")) {
                    tabPaneHtml += `
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-fix-street-speeds"
                                               name="">
                                        <span style="width: 15px;height: 15px;background-color: #0a4c03;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix street speed
                                        </input>
                                    </div>
                                    `;
                }
                if (this.hasFeature("fix-bto-a")) {
                    tabPaneHtml += `
                                     <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-b-to-aone-way"
                                               name="">
                                        <span style="width: 15px;height: 15px;background-color: #b60000;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix B>A One way
                                        </input>
                                    </div>
                                    `;
                }
                if (this.hasFeature("fix-uturn")) {
                    tabPaneHtml += `
                                    <div style="display: ${this.ENABLE_UTURN_FEATURE ? 'flex' : 'none'}; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-fix-u-turn-road-type"
                                               name="">
                                        <span style="width: 15px;height: 15px;background-color: #060142;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Fix U-Turn Road Type
                                        </input>
                                    </div>
                                    `;
                }
                if (this.hasFeature("show-junction-angles")) {
                    tabPaneHtml += `
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-show-junction-angles"
                                               name="">
                                        <span style="width: 15px;height: 15px;background-color: #ffb600;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Show Junction Angles
                                        </input>
                                    </div>
                                    `;
                }
                if (this.hasFeature("fix-bja")) {
                    tabPaneHtml += `
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="checkbox" class="chk-wmeit"  id="wmeitk-chk-click-fix-bad-junction-angles"
                                               name="">
                                            <span style="width: 15px;height: 15px;background-color: #ff9966;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Click to Fix Bad Junction Angles
                                        </input>
                                    </div>
                                    `;
                }
                if (this.country === "IN") {
                    // Speed Mode radios (India only) — shown just above the Clean up button.
                    tabPaneHtml += `
                                    <wz-label html-for="" style="margin-top: 12px;">Speed Mode</wz-label>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="radio" name="wmeitk-speed-mode" class="chk-wmeit-mode" id="wmeitk-mode-normal" value="normal">
                                        <span style="width: 15px;height: 15px;background-color: #0f00f8;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Normal Mode
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="radio" name="wmeitk-speed-mode" class="chk-wmeit-mode" id="wmeitk-mode-city" value="city">
                                        <span style="width: 15px;height: 15px;background-color: #0f00f8;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        City Mode
                                    </div>
                                    <div style="display: flex; align-items: flex-start;">
                                        <input type="radio" name="wmeitk-speed-mode" class="chk-wmeit-mode" id="wmeitk-mode-mountain" value="mountain">
                                        <span style="width: 15px;height: 15px;background-color: #0f00f8;border: 1px solid black; margin-right: 10px; margin-left: 10px;"></span>
                                        Mountain Mode
                                    </div>
                                    `;
                }
                if (this.isBugButtonAllowed()) {
                    tabPaneHtml += `
                                    <div style="width: 100%;height: 1px;border-bottom: 1px solid black;margin-top: 20px;margin-bottom: 10px"></div>
                                    <wz-button color="text" class="wmeit-buton" size="md" disabled="false" id="wmeit-btn-clean-up">Clean
                                        up
                                    </wz-button>
                                </wz-tab>
                                `;
                }
                if (this.hasFeature("platinum-ui")) {
                    tabPaneHtml += `
                            <wz-tab is-active="false" label="Experimental" tooltip="Experimental features">
                                <div id="road-locks">
                                    <wz-label html-for="" style="margin:0">Locks for following road types:</wz-label>
                                    <wz-menu-title style="padding:0;">Major public roads</wz-menu-title>
                                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                                        <wz-checkbox  indeterminate="false" disabled="false" id="wmeitk-chk-expwy-lock"  name="">
                                            Freeway
                                        </wz-checkbox>
                                        <wz-text-input size="sm" type="number" id="wmeitk-lock-level-expwy" min="1" max="6"  value="5"
                                                       disabled="false" style="max-width: 20px;align-self: flex-end" name="wmeitk-lock-level-expwy"
                                                       placeholder="" autocomplete="on"></wz-text-input>
                                    </div>
                                
                                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                                        <wz-checkbox  indeterminate="false" disabled="false" id="wmeitk-chk-majhwy-lock"  name="">
                                            Major Highway
                                        </wz-checkbox>
                                        <wz-text-input size="sm" type="number" id="wmeitk-lock-level-majhwy" min="1" max="6"  value="4"
                                                       disabled="false" style="max-width: 20px;align-self: flex-end" name="wmeitk-lock-level-majhwy"
                                                       placeholder="" autocomplete="on"></wz-text-input>
                                    </div>
                                
                                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                                        <wz-checkbox  indeterminate="false" disabled="false" id="wmeitk-chk-minwy-lock"  name="">
                                            Minor Highway
                                        </wz-checkbox>
                                        <wz-text-input size="sm" type="number" id="wmeitk-lock-level-minwy" min="1" max="6"  value="3"
                                                       disabled="false" style="max-width: 20px;align-self: flex-end" name="wmeitk-lock-level-minwy"
                                                       placeholder="" autocomplete="on"></wz-text-input>
                                    </div>
                                
                                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                                        <wz-checkbox  indeterminate="false" disabled="false" id="wmeitk-chk-ps-lock"  name="">
                                            Primary Street
                                        </wz-checkbox>
                                        <wz-text-input size="sm" type="number" id="wmeitk-lock-level-ps" min="1" max="6"  disabled="false" value="2"
                                                       style="max-width: 20px;align-self: flex-end" name="wmeitk-lock-level-ps" placeholder=""
                                                       autocomplete="on"></wz-text-input>
                                    </div>
                                </div>
                                <div style="margin-top: 18px"></div>
                                <div style="margin-top: 20px"></div>
                                <wz-button color="text" class="wmeit-buton" size="md" disabled="false" id="wmeit-btn-fix-locks">Lock Segments</wz-button>  
                                <div style="margin-top: 18px"></div>
                                <div id="venue-locks">
                                    <wz-label html-for="" style="margin:0">Venue lock level:</wz-label>
                                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                                        <wz-text-input size="sm" type="number" id="wmeitk-lock-level-venue" min="1" max="6" value="3"
                                                       disabled="false" style="max-width: 20px;align-self: flex-end" name="wmeitk-lock-level-venue"
                                                       placeholder="" autocomplete="on"></wz-text-input>
                                        <wz-button color="text" class="wmeit-venue-buton" size="md" disabled="false" id="wmeit-btn-lock-venues">Lock All Venues</wz-button>
                                    </div>
                                    <div id="wmeitk-venue-lock-status" style="margin-top: 8px; font-size: 12px; color: #666;">Idle</div>
                                    <div style="margin-top: 10px">
                                        <wz-checkbox indeterminate="false" disabled="false" id="wmeitk-chk-highlight-venues-below-lock-level" name="">
                                            Highlight venues locked below specified level
                                        </wz-checkbox>
                                    </div>
                                    <div style="margin-top: 6px">
                                        <wz-checkbox indeterminate="false" disabled="false" id="wmeitk-chk-lock-venues-on-bug-button" name="">
                                            Lock venues when clicking bug button
                                        </wz-checkbox>
                                    </div>
                                </div>
                                <div style="margin-top: 18px; border-top: 1px solid #ccc; padding-top: 12px;">
                                    <wz-checkbox indeterminate="false" disabled="false" id="wmeitk-chk-hide-icons" name="">
                                        Hide India Tools icons (keep HRR/DRR)
                                    </wz-checkbox>
                                </div>
                             </wz-tab>
                                 `;
                }
                tabPaneHtml += `
                     </wz-tabs>
                     </div>                     
                    </div>`;
                tabPane.innerHTML = tabPaneHtml;

                $("#wmeit-btn-clean-up").on("click", () => {
                    this.cleanup()
                });
                $("#wmeit-btn-fix-locks").on("click", () => {
                    this.fixLocks();
                });
                $("#wmeit-btn-lock-venues").on("click", () => {
                    this.lockAllVenues();
                });
                let userPreference = this.getUserPreference();
                $("#wmeitk-chk-enable-rename").prop('checked', userPreference.requireRename);
                $("#wmeitk-chk-fix-default-speed").prop('checked', userPreference.fixDefaultSpeed);
                $("#wmeitk-chk-fix-unused-speed").prop('checked', userPreference.fixUnUsedSpeed);
                $("#wmeitk-chk-fix-geometry-distortion").prop('checked', userPreference.fixGeometry);
                $("#wmeitk-chk-fix-locks").prop('checked', userPreference.fixLocks);
                $("#wmeitk-chk-fix-street-speeds").prop('checked', userPreference.fixStreetSpeed);
                $("#wmeitk-chk-segment-length").prop('checked', userPreference.fixSegmentLength);
                $("#wmeitk-chk-fix-u-turn-road-type").prop('checked', userPreference.fixUTurnRoadTypes);
                $("#wmeitk-chk-show-junction-angles").prop('checked', userPreference.showJunctionAngles);
                $("#wmeitk-chk-show--bad-junction-angles").prop('checked', userPreference.showBadJunctionAngles);
                $("#wmeitk-chk-click-fix-bad-junction-angles").prop('checked', userPreference.clickFixBadJunctionAngles);
                $("#wmeitk-chk-b-to-aone-way").prop('checked', userPreference.showBtoAOneWay);
                $("#wmeitk-lock-level-venue").val(userPreference.venueLockLevel);
                $("#wmeitk-chk-highlight-venues-below-lock-level").prop('checked', userPreference.highlightVenuesBelowLockLevel);
                $("#wmeitk-chk-lock-venues-on-bug-button").prop('checked', userPreference.lockVenuesOnBugButton);
                $("#wmeitk-chk-hide-icons").prop('checked', userPreference.hideIndiaToolIcons);
                // Speed Mode (India only): mutually-exclusive radios, default Normal.
                $(`input[name='wmeitk-speed-mode'][value='${userPreference.speedMode}']`).prop('checked', true);

                this.saveUserPreference();
                this.injectHideIconsStyle();
                this.applyHideIconsPreference();

                $(".chk-wmeit").change((chkbox) => {
                    this.saveUserPreference();
                    this.scanMap();
                });
                $("input[name='wmeitk-speed-mode']").on("change", () => {
                    this.saveUserPreference();
                    this.scanMap();
                });
                $("#wmeitk-lock-level-venue").on("change input", () => {
                    this.saveUserPreference();
                    $("#wmeitk-venue-lock-status").text(`Venue lock level set to ${this.normalizeVenueLockLevel($("#wmeitk-lock-level-venue").val())}.`);
                    this.refreshVenueLockHighlights();
                });
                $("#wmeitk-chk-highlight-venues-below-lock-level").on("click change", () => {
                    this.saveUserPreference();
                    this.scanMap();
                });
                $("#wmeitk-chk-lock-venues-on-bug-button").on("click change", () => {
                    this.saveUserPreference();
                });
                $("#wmeitk-chk-hide-icons").on("click change", () => {
                    this.saveUserPreference();
                    this.applyHideIconsPreference();
                });


            } catch (error) {
                this.log(error);
                reject(error);
            }
        });
    }

    getPreferenceStorageKey() {
        // Restricted countries (e.g. Italy) keep their own preference set so they neither
        // inherit nor clobber the shared IN/TH preferences.
        return (this.settings.countries[this.country] || {}).restrictedEditors
            ? `wmeitk-user-preference-${this.country}`
            : "wmeitk-user-preference";
    }

    getUserPreference() {
        let userPreference = {};
        let stored = localStorage.getItem(this.getPreferenceStorageKey());
        if (stored) {
            userPreference = JSON.parse(stored);
        } else if (this.cfg && this.cfg.defaultPreferences) {
            // Seed from the active country's default preferences (e.g. Italy: only the five on).
            userPreference = {...this.cfg.defaultPreferences};
        } else {
            userPreference.requireRename = true;
            userPreference.fixDefaultSpeed = true;
            userPreference.fixUnUsedSpeed = true;
            userPreference.fixGeometry = true;
            userPreference.fixLocks = true;
            userPreference.fixSegmentLength = true;
            userPreference.fixStreetSpeed = false;
            userPreference.fixUTurnRoadTypes = false;
            userPreference.showJunctionAngles = true;
            userPreference.showBadJunctionAngles = true;
            userPreference.showBtoAOneWay = true;
            userPreference.clickFixBadJunctionAngles = false;
            userPreference.venueLockLevel = 3;
            userPreference.highlightVenuesBelowLockLevel = false;
            userPreference.lockVenuesOnBugButton = false;
            userPreference.hideIndiaToolIcons = false;
            userPreference.speedMode = "normal";
        }
        userPreference.venueLockLevel = this.normalizeVenueLockLevel(userPreference.venueLockLevel);
        userPreference.highlightVenuesBelowLockLevel = !!userPreference.highlightVenuesBelowLockLevel;
        userPreference.lockVenuesOnBugButton = !!userPreference.lockVenuesOnBugButton;
        userPreference.hideIndiaToolIcons = !!userPreference.hideIndiaToolIcons;
        userPreference.speedMode = ["normal", "city", "mountain"].includes(userPreference.speedMode)
            ? userPreference.speedMode : "normal";
        return userPreference;
    }

    saveUserPreference() {
        let userPreference = {};
        let stored = localStorage.getItem(this.getPreferenceStorageKey());
        if (stored) {
            userPreference = JSON.parse(stored);
        }
        userPreference.requireRename = $("#wmeitk-chk-enable-rename").is(':checked');
        userPreference.fixDefaultSpeed = $("#wmeitk-chk-fix-default-speed").is(':checked');
        userPreference.fixUnUsedSpeed = $("#wmeitk-chk-fix-unused-speed").is(':checked');
        userPreference.fixGeometry = $("#wmeitk-chk-fix-geometry-distortion").is(':checked');
        userPreference.fixLocks = $("#wmeitk-chk-fix-locks").is(':checked');
        userPreference.fixStreetSpeed = $("#wmeitk-chk-fix-street-speeds").is(':checked');
        userPreference.fixSegmentLength = $("#wmeitk-chk-segment-length").is(':checked');
        userPreference.fixUTurnRoadTypes = $("#wmeitk-chk-fix-u-turn-road-type").is(':checked');
        userPreference.showJunctionAngles = $("#wmeitk-chk-show-junction-angles").is(':checked');
        userPreference.showBadJunctionAngles = $("#wmeitk-chk-show--bad-junction-angles").is(':checked');
        userPreference.showBtoAOneWay = $("#wmeitk-chk-b-to-aone-way").is(':checked');
        userPreference.clickFixBadJunctionAngles = $("#wmeitk-chk-click-fix-bad-junction-angles").is(':checked');
        userPreference.venueLockLevel = this.normalizeVenueLockLevel($("#wmeitk-lock-level-venue").val());
        userPreference.highlightVenuesBelowLockLevel = $("#wmeitk-chk-highlight-venues-below-lock-level").prop('checked') === true;
        userPreference.lockVenuesOnBugButton = $("#wmeitk-chk-lock-venues-on-bug-button").prop('checked') === true;
        userPreference.hideIndiaToolIcons = $("#wmeitk-chk-hide-icons").prop('checked') === true;
        const speedModeVal = $("input[name='wmeitk-speed-mode']:checked").val();
        if (["normal", "city", "mountain"].includes(speedModeVal)) {
            userPreference.speedMode = speedModeVal;
        } else if (!["normal", "city", "mountain"].includes(userPreference.speedMode)) {
            userPreference.speedMode = "normal";
        }
        localStorage.setItem(this.getPreferenceStorageKey(), JSON.stringify(userPreference));
        return userPreference;
    }

    /**
     * Inject (once) the stylesheet that hides the India-tool icon buttons while keeping the HRR/DRR
     * run-rate widget (#wmeitk-rr) visible. Toggled by adding/removing the body class below.
     */
    injectHideIconsStyle() {
        if (document.getElementById("wmeitk-hide-icons-style")) {
            return;
        }
        const style = document.createElement("style");
        style.id = "wmeitk-hide-icons-style";
        style.textContent = `
            body.wmeitk-hide-icons #wmeit-btn-global-clean,
            body.wmeitk-hide-icons #wmeit-btn-global-simplify,
            body.wmeitk-hide-icons #wmeit-btn-fix-bja,
            body.wmeitk-hide-icons #wmeit-btn-select-b-to-a,
            body.wmeitk-hide-icons #wmeit-btn-pip-sv,
            body.wmeitk-hide-icons #wmeit-btn-fix-segment,
            body.wmeitk-hide-icons #wmeit-btn-change-direction { display: none !important; }

            /* WME's wz-button renders full drawer width, which left-aligned the India tool icons.
               Keep them icon-sized and centered in the drawer rail. */
            #drawer .wmeit-buton { align-self: center !important; justify-content: center !important; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Apply the "Hide India Tools icons" switch: when on, add the body class that hides every India-tool
     * icon button (the HRR/DRR run-rate widget stays visible); when off, remove it.
     */
    applyHideIconsPreference() {
        const hide = this.getUserPreference().hideIndiaToolIcons === true;
        if (hide) {
            $("body").addClass("wmeitk-hide-icons");
        } else {
            $("body").removeClass("wmeitk-hide-icons");
        }
    }

    setupLayers() {
        this.wmeSDK.Map.addLayer({
            layerName: this.sdkHighlightLayerName,
            styleContext: this.buildSdkHighlightStyleContext(),
            styleRules: this.buildSdkHighlightStyleRules(),
            zIndexing: true
        });
        this.wmeSDK.Map.addLayer({
            layerName: this.sdkSegmentLengthLayerName,
            styleContext: this.buildSegmentLengthStyleContext(),
            styleRules: this.buildSegmentLengthStyleRules(),
            zIndexing: true
        });
        this.wmeSDK.Map.addLayer({
            layerName: this.sdkBadJunctionLayerName,
            styleContext: this.buildBadJunctionStyleContext(),
            styleRules: this.buildBadJunctionStyleRules(),
            zIndexing: true
        });
        if (typeof OpenLayers !== "undefined" && typeof W !== "undefined" && W.map) {
            this.olVenuePointHighlightLayer = new OpenLayers.Layer.Vector(`${this.olVenueHighlightLayerName}-point`, {
                displayInLayerSwitcher: false,
                backGround: "#BBBBBB",
                hideFromPermalink: true,
                uniqueName: `${this.olVenueHighlightLayerName}-point`,
                styleMap: this.buildVenuePointHighlightStyleMap()
            });
            this.olVenueAreaHighlightLayer = new OpenLayers.Layer.Vector(`${this.olVenueHighlightLayerName}-area`, {
                displayInLayerSwitcher: false,
                backGround: "#BBBBBB",
                hideFromPermalink: true,
                uniqueName: `${this.olVenueHighlightLayerName}-area`,
                styleMap: this.buildVenueAreaHighlightStyleMap()
            });
            W.map.addLayer(this.olVenuePointHighlightLayer);
            W.map.addLayer(this.olVenueAreaHighlightLayer);
            this.olVenuePointHighlightLayer.setVisibility(true);
            this.olVenueAreaHighlightLayer.setVisibility(true);
        }
        this.wmeSDK.Map.setLayerVisibility({layerName: this.sdkBadJunctionLayerName, visibility: true});
        this.wmeSDK.Events.trackLayerEvents({layerName: this.sdkBadJunctionLayerName});
        this.wmeSDK.Events.on({
            eventName: "wme-layer-feature-clicked",
            eventHandler: (event) => this.onBadJunctionAngleSelect(event)
        });

        // Performance cache for BJA (extent+zoom)
        this._bjaCache = {extentKey: null, zoom: null, pairsByNode: new Map()};
    }

    calculateMidpoint(coordinates) {
        if (!Array.isArray(coordinates) || coordinates.length === 0) {
            return null;
        }
        if (coordinates.length === 1) {
            return {x: coordinates[0][0], y: coordinates[0][1]};
        }

        let length = 0;
        for (let i = 0; i < coordinates.length - 1; i++) {
            length += this.findLength(coordinates[i], coordinates[i + 1]);
        }

        let cumulativeLength = 0;
        for (let i = 0; i < coordinates.length - 1; i++) {
            const start = coordinates[i];
            const end = coordinates[i + 1];
            const segmentLength = this.findLength(start, end);
            if (cumulativeLength + segmentLength >= length / 2) {
                const ratio = (length / 2 - cumulativeLength) / segmentLength;
                return {
                    x: start[0] + ratio * (end[0] - start[0]),
                    y: start[1] + ratio * (end[1] - start[1])
                };
            }
            cumulativeLength += segmentLength;
        }

        const last = coordinates[coordinates.length - 1];
        return {x: last[0], y: last[1]};
    }

    calculateMidpointWithAngle(coordinates) {
        if (!Array.isArray(coordinates) || coordinates.length < 2) {
            return {mid: null, angle: 0, start: null, end: null};
        }

        const total = coordinates.reduce((sum, coord, index) => {
            if (index === coordinates.length - 1) {
                return sum;
            }
            return sum + this.findLength(coord, coordinates[index + 1]);
        }, 0);
        const half = total / 2;
        let cumulative = 0;

        for (let i = 0; i < coordinates.length - 1; i++) {
            const start = coordinates[i];
            const end = coordinates[i + 1];
            const segLen = this.findLength(start, end);

            if (cumulative + segLen >= half) {
                const ratio = (half - cumulative) / segLen;

                const mid = {
                    x: start[0] + ratio * (end[0] - start[0]),
                    y: start[1] + ratio * (end[1] - start[1])
                };

                const angle = Math.atan2(end[1] - start[1], end[0] - start[0]); // radians

                return {mid, angle, start, end};
            }
            cumulative += segLen;
        }

        const first = coordinates[0];
        const last = coordinates[coordinates.length - 1];
        return {
            mid: {
                x: (first[0] + last[0]) / 2,
                y: (first[1] + last[1]) / 2
            },
            angle: Math.atan2(last[1] - first[1], last[0] - first[0]),
            start: first,
            end: last
        };
    }

    getBubbleOffsets(angleRad, distancePx, graphicWidth = 35, graphicHeight = 35, lockSide = 'up') {
        // Perpendicular (normal) vector in screen/map coordinates
        let nx = -Math.sin(angleRad);
        let ny = Math.cos(angleRad);

        // SIDE LOCK: prevent flipping when the segment direction reverses.
        // 'up' means keep the bubble on the screen-up side of the segment.
        if (lockSide === 'up') {
            if (ny > 0) {
                nx = -nx;
                ny = -ny;
            }
        } else if (lockSide === 'down') {
            if (ny < 0) {
                nx = -nx;
                ny = -ny;
            }
        } else if (lockSide === 'right') {
            // keep bubble to the screen-right side (nx >= 0)
            if (nx < 0) {
                nx = -nx;
                ny = -ny;
            }
        } else if (lockSide === 'left') {
            // keep bubble to the screen-left side (nx <= 0)
            if (nx > 0) {
                nx = -nx;
                ny = -ny;
            }
        }

        // Anchor bubble so its bottom-center sits at the midpoint, then push it outward along the normal.
        // Base anchor (bottom-center)
        let baseX = -graphicWidth / 2;
        let baseY = -graphicHeight;

        // Extra padding so bubble never touches the segment
        const EXTRA_TOP = 6;    // px
        const EXTRA_RIGHT = 18; // px (extra push to the right)

        if (lockSide === 'up') {
            baseY -= EXTRA_TOP;        // push further up
        } else if (lockSide === 'right') {
            baseX += EXTRA_RIGHT;     // push further right
        }

        return {
            xOff: Math.round(baseX + (nx * distancePx)),
            yOff: Math.round(baseY + (ny * distancePx))
        };
    }

    computeDynamicDistancePx(segmentLengthMapUnits, angleRad, graphicWidth = 35, graphicHeight = 35) {
        // Convert map-units to pixels for this zoom level
        const res = (W && W.map && typeof W.map.getResolution === 'function') ? W.map.getResolution() : null;
        const segmentLengthPx = (res && res > 0) ? (segmentLengthMapUnits / res) : segmentLengthMapUnits;

        // Base bounds from icon size (keeps bubble away from the line)
        const iconDiag = Math.sqrt((graphicWidth * graphicWidth) + (graphicHeight * graphicHeight));
        const minPx = Math.round(iconDiag * 0.30 + 8);   // min clearance
        const maxPx = Math.round(iconDiag * 0.90 + 28);  // cap

        // Base distance grows gently with segment length in pixels
        let base = Math.sqrt(Math.max(0, segmentLengthPx)) * 0.40;

        // Angle factor: reduce for near-vertical segments, keep for horizontal
        const horiz = Math.abs(Math.cos(angleRad)); // 1=horizontal, 0=vertical
        const angleFactor = 0.70 + 0.30 * horiz;

        // Diagonal boost: strongest near 45° to avoid overlap at crossings
        const diag = Math.abs(Math.sin(2 * angleRad));   // 0..1 (peaks at 45°)
        const diagBoost = 1.0 + (0.45 * diag);

        let distancePx = base * angleFactor * diagBoost;

        // Clamp to safe bounds
        distancePx = Math.max(minPx, Math.min(maxPx, distancePx));
        return distancePx;
    }

    getLengthIcon(length) {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="21"
                         fill="#0000ff" 
                         stroke="#ff5608" 
                         stroke-width="5"/>
                        <text x="25" y="31" font-size="20" font-family="Arial" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${length}</text>
                    </svg>`
    }

    buildSegmentLengthStyleContext() {
        return {
            wmeitkLengthExternalGraphic: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.externalGraphic || "";
            },
            wmeitkLengthGraphicHeight: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.graphicHeight != null ? props.graphicHeight : 35;
            },
            wmeitkLengthGraphicWidth: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.graphicWidth != null ? props.graphicWidth : 35;
            },
            wmeitkLengthGraphicYOffset: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.graphicYOffset != null ? props.graphicYOffset : 0;
            },
            wmeitkLengthGraphicXOffset: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.graphicXOffset != null ? props.graphicXOffset : 0;
            },
            wmeitkLengthGraphicOpacity: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.graphicOpacity != null ? props.graphicOpacity : 0.9;
            },
            wmeitkLengthGraphicZIndex: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.graphicZIndex != null ? props.graphicZIndex : 1000;
            }
        };
    }

    buildSegmentLengthStyleRules() {
        return [{
            style: {
                graphic: true,
                externalGraphic: "${wmeitkLengthExternalGraphic}",
                graphicHeight: "${wmeitkLengthGraphicHeight}",
                graphicWidth: "${wmeitkLengthGraphicWidth}",
                graphicYOffset: "${wmeitkLengthGraphicYOffset}",
                graphicXOffset: "${wmeitkLengthGraphicXOffset}",
                graphicOpacity: "${wmeitkLengthGraphicOpacity}",
                graphicZIndex: "${wmeitkLengthGraphicZIndex}"
            }
        }];
    }

    buildBadJunctionStyleContext() {
        return {
            wmeitkBjaFillColor: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? "#ffff00" : "transparent";
            },
            wmeitkBjaFillOpacity: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? 1 : 0;
            },
            wmeitkBjaStrokeColor: () => "#ff9966",
            wmeitkBjaStrokeOpacity: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? 1 : 0.9;
            },
            wmeitkBjaStrokeWidth: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? 2 : 2.2;
            },
            wmeitkBjaPointRadius: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? 12 : 0;
            },
            wmeitkBjaFontColor: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? "#000000" : "transparent";
            },
            wmeitkBjaFontSize: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? "12px" : "0px";
            },
            wmeitkBjaLabel: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? props.angle || "" : "";
            },
            wmeitkBjaGraphicName: (ctx) => {
                const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
                return props.aja_type === "generic" ? "circle" : "circle";
            }
        };
    }

    buildBadJunctionStyleRules() {
        return [{
            style: {
                fillColor: "${wmeitkBjaFillColor}",
                fillOpacity: "${wmeitkBjaFillOpacity}",
                strokeColor: "${wmeitkBjaStrokeColor}",
                strokeOpacity: "${wmeitkBjaStrokeOpacity}",
                strokeWidth: "${wmeitkBjaStrokeWidth}",
                pointRadius: "${wmeitkBjaPointRadius}",
                fontColor: "${wmeitkBjaFontColor}",
                fontSize: "${wmeitkBjaFontSize}",
                label: "${wmeitkBjaLabel}",
                graphicName: "${wmeitkBjaGraphicName}",
                fontWeight: "bold",
                labelAlign: "cm",
                labelOutlineColor: "#ffffff",
                labelOutlineWidth: 3
            }
        }];
    }

    buildVenuePointHighlightStyleMap() {
        return new OpenLayers.StyleMap(new OpenLayers.Style({
            strokeColor: "#ffff00",
            strokeOpacity: 1,
            strokeWidth: 4,
            fillColor: "#ffff00",
            fillOpacity: 1,
            pointRadius: 10,
            graphicName: "circle",
            graphicOpacity: 1,
            graphicZIndex: 2000
        }));
    }

    buildVenueAreaHighlightStyleMap() {
        return new OpenLayers.StyleMap(new OpenLayers.Style({
            strokeColor: "#ffff00",
            strokeOpacity: 1,
            strokeWidth: 12,
            strokeDashstyle: "solid",
            fillColor: "#ffff00",
            fillOpacity: 0,
            graphic: false,
            graphicZIndex: 2000
        }));
    }

    buildSdkHighlightStyleContext() {
        return {
            wmeitkGraphic: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return !!style.graphic;
            },
            wmeitkExternalGraphic: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.externalGraphic || "";
            },
            wmeitkGraphicHeight: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicHeight != null ? style.graphicHeight : 0;
            },
            wmeitkGraphicWidth: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicWidth != null ? style.graphicWidth : 0;
            },
            wmeitkGraphicYOffset: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicYOffset != null ? style.graphicYOffset : 0;
            },
            wmeitkGraphicXOffset: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicXOffset != null ? style.graphicXOffset : 0;
            },
            wmeitkGraphicOpacity: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicOpacity != null ? style.graphicOpacity : 1;
            },
            wmeitkGraphicZIndex: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicZIndex != null ? style.graphicZIndex : 0;
            },
            wmeitkGraphicName: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.graphicName || "circle";
            },
            wmeitkStrokeColor: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.strokeColor;
            },
            wmeitkStrokeOpacity: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.strokeOpacity;
            },
            wmeitkStrokeWidth: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.strokeWidth;
            },
            wmeitkStrokeDashstyle: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.strokeDashstyle;
            },
            wmeitkFillColor: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.fillColor || "transparent";
            },
            wmeitkFillOpacity: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.fillOpacity != null ? style.fillOpacity : 0;
            },
            wmeitkPointRadius: (ctx) => {
                const style = this.getSdkHighlightStyle(ctx);
                return style.pointRadius != null ? style.pointRadius : 8;
            }
        };
    }

    buildSdkHighlightStyleRules() {
        return [{
            style: {
                graphic: "${wmeitkGraphic}",
                externalGraphic: "${wmeitkExternalGraphic}",
                graphicHeight: "${wmeitkGraphicHeight}",
                graphicWidth: "${wmeitkGraphicWidth}",
                graphicYOffset: "${wmeitkGraphicYOffset}",
                graphicXOffset: "${wmeitkGraphicXOffset}",
                graphicOpacity: "${wmeitkGraphicOpacity}",
                graphicZIndex: "${wmeitkGraphicZIndex}",
                graphicName: "${wmeitkGraphicName}",
                strokeColor: "${wmeitkStrokeColor}",
                strokeOpacity: "${wmeitkStrokeOpacity}",
                strokeWidth: "${wmeitkStrokeWidth}",
                strokeDashstyle: "${wmeitkStrokeDashstyle}",
                fillColor: "${wmeitkFillColor}",
                fillOpacity: "${wmeitkFillOpacity}",
                pointRadius: "${wmeitkPointRadius}"
            }
        }];
    }

    maybeConvertProjectedCoordinate(coordinate) {
        if (!Array.isArray(coordinate) || coordinate.length < 2) {
            return coordinate;
        }

        const lon = coordinate[0];
        const lat = coordinate[1];
        if (Number.isFinite(lon) && Number.isFinite(lat) && Math.abs(lon) <= 180 && Math.abs(lat) <= 90) {
            return [lon, lat];
        }

        const R = 6378137;
        const convertedLon = (lon * 180) / (Math.PI * R);
        const convertedLat = (2 * Math.atan(Math.exp(lat / R)) - Math.PI / 2) * (180 / Math.PI);
        return [convertedLon, Math.max(-85.05112878, Math.min(85.05112878, convertedLat))];
    }

    normalizeGeometryForMap(geometry) {
        if (!geometry || !geometry.coordinates) {
            return geometry;
        }

        const normalizeCoordinates = (coordinates) => {
            if (!Array.isArray(coordinates)) {
                return coordinates;
            }
            if (coordinates.length === 0) {
                return coordinates;
            }
            if (typeof coordinates[0] === "number") {
                return this.maybeConvertProjectedCoordinate(coordinates);
            }
            return coordinates.map((child) => normalizeCoordinates(child));
        };

        return {
            ...geometry,
            coordinates: normalizeCoordinates(geometry.coordinates)
        };
    }

    getSdkHighlightStyle(ctx) {
        const props = ctx && ctx.feature ? ctx.feature.properties || {} : {};
        switch (props.highlightType) {
            case "rename":
                return this.renameHighLightStyle;
            case "speed":
                return this.speedHighlightStyle;
            case "lockMismatch":
                return this.segmentLockMismatchFeatureStyle;
            case "unusedSpeed":
                return this.unusedSpeedHighlightStyle;
            case "streetSpeed":
                return this.streetSpeedHigLightsStyle;
            case "bToAOneWay":
                return this.BtoAOnewayRoadTypeStyle;
            case "uTurnRoadType":
                return this.UTurnRoadTypeMisMatchStyle;
            case "segmentDistortion":
                return this.segmentDistortionFeatureStyle;
            case "segmentLockBelowThreshold":
                return {
                    strokeColor: "#ffff00",
                    strokeOpacity: 1,
                    strokeWidth: 10,
                    strokeDashstyle: null,
                    fillColor: "#ffff00",
                    fillOpacity: 0,
                    pointRadius: 8
                };
            case "venueLockBelowThreshold":
                return this.getVenueLockBelowThresholdStyle(props);
            default:
                return {
                    strokeColor: "#ff0000",
                    strokeOpacity: 0.8,
                    strokeWidth: 8,
                    strokeDashstyle: null,
                    fillColor: "#ff0000",
                    fillOpacity: 0.3,
                    pointRadius: 8
                };
        }
    }

    getVenueLockBelowThresholdStyle(props) {
        const isPointVenue = props && props.venueGeometryType === "Point";
        if (isPointVenue) {
            return {
                graphic: true,
                graphicName: "circle",
                strokeColor: "#ffff00",
                strokeOpacity: 1,
                strokeWidth: 4,
                fillColor: "#ffff00",
                fillOpacity: 1,
                pointRadius: 10,
                graphicOpacity: 1,
                graphicZIndex: 2000
            };
        }
        return {
            graphic: false,
            strokeColor: "#ffff00",
            strokeOpacity: 1,
            strokeWidth: 2,
            strokeDashstyle: "solid",
            fillColor: "#ffff00",
            fillOpacity: 0,
            pointRadius: 0,
            graphicZIndex: 2000
        };
    }

    addSdkSegmentHighlight(segment, highlightType) {
        if (this.currentScanRenderHighlights === false) {
            return;
        }
        if (!segment || !segment.geometry) {
            return;
        }
        this.wmeSDK.Map.addFeatureToLayer({
            layerName: this.sdkHighlightLayerName,
            feature: {
                id: `${highlightType}-${segment.id}`,
                type: "Feature",
                geometry: this.normalizeGeometryForMap(segment.geometry),
                properties: {highlightType}
            }
        });
    }

    addSdkPointHighlight(coordinates, highlightType, featureId) {
        if (this.currentScanRenderHighlights === false) {
            return;
        }
        this.wmeSDK.Map.addFeatureToLayer({
            layerName: this.sdkHighlightLayerName,
            feature: {
                id: featureId,
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: this.maybeConvertProjectedCoordinate(coordinates)
                },
                properties: {highlightType}
            }
        });
    }

    addSdkVenueHighlight(venue, highlightType, featureId) {
        if (this.currentScanRenderHighlights === false) {
            return;
        }
        if (!venue || !venue.geometry) {
            return;
        }
        this.wmeSDK.Map.addFeatureToLayer({
            layerName: this.sdkHighlightLayerName,
            feature: {
                id: featureId,
                type: "Feature",
                geometry: this.normalizeGeometryForMap(venue.geometry),
                properties: {
                    highlightType,
                    venueGeometryType: venue.geometry.type
                }
            }
        });
    }

    clearOlVenueHighlightLayer() {
        if (this.olVenuePointHighlightLayer && typeof this.olVenuePointHighlightLayer.removeAllFeatures === "function") {
            this.olVenuePointHighlightLayer.removeAllFeatures();
        }
        if (this.olVenueAreaHighlightLayer && typeof this.olVenueAreaHighlightLayer.removeAllFeatures === "function") {
            this.olVenueAreaHighlightLayer.removeAllFeatures();
        }
    }

    venueGeometryToOpenLayersGeometry(geometry) {
        if (!geometry || !geometry.type || !Array.isArray(geometry.coordinates)) {
            return null;
        }
        if (typeof OpenLayers === "undefined") {
            return null;
        }

        const toLonLat = (coord) => {
            if (!Array.isArray(coord) || coord.length < 2) {
                return null;
            }
            const lon = Number(coord[0]);
            const lat = Number(coord[1]);
            if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
                return null;
            }
            return new OpenLayers.Geometry.Point(lon, lat).transform("EPSG:4326", "EPSG:3857");
        };

        if (geometry.type === "Point") {
            return toLonLat(geometry.coordinates);
        }
        if (geometry.type === "Polygon") {
            const rings = geometry.coordinates
                .map((ring) => {
                    if (!Array.isArray(ring)) {
                        return null;
                    }
                    const points = ring.map((coord) => toLonLat(coord)).filter(Boolean);
                    if (points.length < 3) {
                        return null;
                    }
                    return new OpenLayers.Geometry.LinearRing(points);
                })
                .filter(Boolean);
            if (rings.length === 0) {
                return null;
            }
            return new OpenLayers.Geometry.Polygon(rings);
        }
        return null;
    }

    addOlVenueHighlight(venue, featureId) {
        if (this.currentScanRenderHighlights === false) {
            return;
        }
        if (!venue || !venue.geometry) {
            return;
        }

        const olGeometry = this.venueGeometryToOpenLayersGeometry(venue.geometry);
        if (!olGeometry) {
            return;
        }

        const feature = new OpenLayers.Feature.Vector(olGeometry, {
            venueId: venue.id,
            venueGeometryType: venue.geometry.type
        });
        feature.id = featureId;
        if (venue.geometry.type === "Point" && this.olVenuePointHighlightLayer) {
            this.olVenuePointHighlightLayer.addFeatures([feature]);
        } else if (venue.geometry.type === "Polygon" && this.olVenueAreaHighlightLayer) {
            this.olVenueAreaHighlightLayer.addFeatures([feature]);
        }
    }

    addSdkSegmentLengthHighlight(point, length, xOff, yOff, featureId) {
        if (this.currentScanRenderHighlights === false) {
            return;
        }
        const coordinates = Array.isArray(point)
            ? point
            : (point && typeof point.x === "number" && typeof point.y === "number" ? [point.x, point.y] : null);
        if (!coordinates) {
            return;
        }
        this.wmeSDK.Map.addFeatureToLayer({
            layerName: this.sdkSegmentLengthLayerName,
            feature: {
                id: featureId,
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: this.maybeConvertProjectedCoordinate(coordinates)
                },
                properties: {
                    externalGraphic: "data:image/svg+xml;base64," + btoa(this.getLengthIcon(length)),
                    graphicHeight: 35,
                    graphicWidth: 35,
                    graphicYOffset: yOff,
                    graphicXOffset: xOff,
                    graphicOpacity: 0.9,
                    graphicZIndex: 1000
                }
            }
        });
    }

    clearBadJunctionAngleLayer() {
        this._bjaFeatureMeta = new Map();
        this._bjaRenderedPoints = [];
        this.wmeSDK.Map.removeAllFeaturesFromLayer({layerName: this.sdkBadJunctionLayerName});
    }

    addBadJunctionAngleFeature(featureId, geometry, properties) {
        if (this.currentScanRenderHighlights === false) {
            return;
        }
        this.wmeSDK.Map.addFeatureToLayer({
            layerName: this.sdkBadJunctionLayerName,
            feature: {
                id: featureId,
                type: "Feature",
                geometry: this.normalizeGeometryForMap(geometry),
                properties
            }
        });
        this._bjaFeatureMeta.set(featureId, properties);
    }

    scanMap(renderHighlights = true) {
        // if (!this.WMEITK_BETA_MEMBERS.includes(this.userInfo.userName.toLowerCase())) {
        //     return;
        // }
        if (!this.scriptEnabled)
            return;

        const previousRenderMode = this.currentScanRenderHighlights;
        this.currentScanRenderHighlights = renderHighlights;
        try {
            if (renderHighlights) {
                this.wmeSDK.Map.removeAllFeaturesFromLayer({layerName: this.sdkSegmentLengthLayerName});
                this.clearBadJunctionAngleLayer();
                this.clearOlVenueHighlightLayer();
            }
            if (this.userInfo == null) {
                this.userInfo = this.wmeSDK.State.getUserInfo();
            }

            if (this.userInfo.rank < this.WMEITK_MEMBER_LEVEL_MEMBER) {
                return;
            }
            let fixCount = this.loadEditCount(this.userInfo.userName);
            if (renderHighlights) {
                this.wmeSDK.Map.removeAllFeaturesFromLayer({layerName: this.sdkHighlightLayerName});
            }
            if (this.userInfo.rank > this.WMEITK_MEMBER_LEVEL_SILVER) {
                this.MAX_EDITS_PER_DAY = 600;
            }
            if (!this.hasFeature("unlimited-edits")) {
                if (fixCount >= this.MAX_EDITS_PER_DAY && renderHighlights) return;
            }
            let loggedInUser = this.userInfo.userName;
            let currentZoomLevel = this.wmeSDK.Map.getZoomLevel();
            let currentUserLevel = this.userInfo.rank;
            let allowMassEdit = false;
            let allowedZoomLevel = 17;
            if (this.hasFeature("low-zoom-edit")) {
                allowedZoomLevel = 13;
            }
            if (currentZoomLevel > allowedZoomLevel) {
                allowMassEdit = true;
            }
            if (allowMassEdit === true) {
                $(".wmeit-buton").show();
                $(".wmeit-buton").attr("disabled", false);
            } else {
                $(".wmeit-buton").attr("disabled", true);
                $(".wmeit-buton").hide();
            }
            this.updateFixBJAButtonVisibility();
            let userPreference = this.getUserPreference();
            let fixesRequired = 0;
            let simplifyRequired = 0;
            let segments = this.wmeSDK.DataModel.Segments.getAll();
            for (let i = 0; i < segments.length; i++) {
                let segment = segments[i];
                if (segment.lockRank <= this.userInfo.rank) {
                    if (this.userInfo.rank >= this.WMEITK_MEMBER_LEVEL_SILVER) {
                        if (userPreference.requireRename)
                            fixesRequired += this.highlightBadRoadNames(segment);
                        if (userPreference.fixGeometry)
                            fixesRequired += this.highlightSegmentDistortion(segment);
                        if (userPreference.fixDefaultSpeed)
                            fixesRequired += this.highlightMissingDefaultSpeeds(segment);
                        if (userPreference.fixLocks)
                            fixesRequired += this.highlightLockRankMisMatch(segment);
                        if (userPreference.fixUnUsedSpeed)
                            fixesRequired += this.highlightUnusedSpeed(segment);
                        if (userPreference.fixStreetSpeed)
                            fixesRequired += this.highlightStreetSpeed(segment);
                        if (userPreference.showBtoAOneWay)
                            fixesRequired += this.highlightBtoAOneWay(segment);
                    }
                    if (userPreference.fixSegmentLength)
                        // fixesRequired +=
                        this.highlightSegmentLength(segment);

                    // Speed Mode (India only): highlight segments above the city/mountain cap.
                    if (this.country === "IN" && userPreference.speedMode && userPreference.speedMode !== "normal") {
                        fixesRequired += this.highlightSpeedMode(segment, userPreference.speedMode);
                    }

                    if (this.hasFeature("fix-uturn")) {
                        if (this.ENABLE_UTURN_FEATURE && userPreference.fixUTurnRoadTypes) {
                            //fixesRequired +=
                            this.highlightUTurnRoadTypeMisMatch(segment);
                        }
                        if (this.checkSimplificationRequired(segment, this.simplifyTolerance * 100000)) {
                            simplifyRequired++;
                        }
                    }

                }
            }
            if (renderHighlights && userPreference.highlightVenuesBelowLockLevel) {
                fixesRequired += this.refreshVenueLockHighlights(userPreference);
            }
            // BJAI-style: draw bad junction angle markers after segment-based highlights
            if (renderHighlights && userPreference.showBadJunctionAngles) {
                this.drawBadJunctionAngles();
            }
            setTimeout(() => {
                if (fixesRequired === 0) {
                    $("#wmeitk-error-counts").hide();
                } else {
                    $("#wmeitk-error-counts").show();
                }
                if (simplifyRequired === 0) {
                    $("#wmeitk-simplify-counts").hide();
                } else {
                    $("#wmeitk-simplify-counts").show();
                }
                $("#wmeitk-error-counts").val(fixesRequired);
                $("#wmeitk-simplify-counts").val(simplifyRequired);
            }, 100);
        } finally {
            this.currentScanRenderHighlights = previousRenderMode;
        }

    }

    highlightBadRoadNames(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: segment.id});
        let highlightRename = false;
        this.ROAD_RENAMES.forEach(function (rename) {
            if (segmentAddress !== null) {
                if (segmentAddress.isEmpty === false) {
                    if (segmentAddress.street.name !== null) {
                        if (this.getRenamedRoadName(segmentAddress.street.name, rename) !== null) {
                            highlightRename = true;
                        }
                    }

                    segmentAddress.altStreets.forEach(function (street) {
                        if (street.street.name !== null) if (this.getRenamedRoadName(street.street.name, rename) !== null) {
                            highlightRename = true;
                        }
                    }.bind(this));
                }
            }
        }.bind(this));
        if (segmentAddress != null) {
            if (segmentAddress.isEmpty === false) {
                if (segmentAddress.street.name !== null) {
                    if (segmentAddress.street.isEmpty === false && $.trim(segmentAddress.street.name) === "") {
                        highlightRename = true;
                    } else if ($.trim(segmentAddress.street.name.toLowerCase()) === "none") {
                        highlightRename = true;
                    }
                }
            }
        }

        if (segmentAddress.isEmpty === true) {
            highlightRename = true;
        }
        if (highlightRename) {
            if (!segment.geometry) {
                return 0;
            }
            this.addSdkSegmentHighlight(segment, "rename");
            return 1;
        }
        return 0;
    }

    getRenamedRoadName(streetName, rename) {
        if (streetName === null || streetName === undefined || rename === null || rename === undefined) {
            return null;
        }

        const currentName = $.trim(streetName);
        if (currentName === "") {
            return null;
        }

        if (rename.short === ">" || rename.short === "<") {
            if (!currentName.includes(rename.short)) {
                return null;
            }
            return currentName.replaceAll(">", " to ")
                .replaceAll("<", " to ")
                .replaceAll("  ", " ")
                .trim();
        }

        const escapedShort = rename.short.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const roadNamePattern = new RegExp(`\\b${escapedShort}(?:\\.)?(?=\\s|$)`, "i");
        if (!roadNamePattern.test(currentName)) {
            return null;
        }

        return currentName.replace(roadNamePattern, rename.long).replaceAll("  ", " ").trim();
    }

    isUnderpassStreetName(streetName) {
        return streetName !== null && streetName !== undefined && $.trim(String(streetName).toLowerCase()) === "underpass";
    }

    highlightSegmentDistortion(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (segment.junctionId !== null) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        if (segment.lockRank <= this.userInfo.rank) {
            let geometry = segment.geometry;
            if (!geometry || !geometry.coordinates) {
                return 0;
            }
            let coodinates = geometry.coordinates;
            let highlight = false;
            let highlightCoordinates = [];
            if (coodinates.length > 2) {
                let length = this.findLength(coodinates[0], coodinates[1]);
                if (coodinates.length < this.GEOMETRY_DISTORTION_TOLERANCE) {
                    highlight = true;
                    highlightCoordinates.push(coodinates[0]);
                }
                if (coodinates.length < 4) {
                    length = this.findLength(coodinates[coodinates.length - 2], coodinates[coodinates.length - 1]);
                    if (length < this.GEOMETRY_DISTORTION_TOLERANCE) {
                        highlight = true;
                        highlightCoordinates.push(coodinates[coodinates.length - 1]);
                    }
                }
            }
            if (coodinates.length > 3) {
                length = this.findLength(coodinates[coodinates.length - 2], coodinates[coodinates.length - 1]);
                if (length < this.GEOMETRY_DISTORTION_TOLERANCE) {
                    highlight = true;
                    highlightCoordinates.push(coodinates[coodinates.length - 1]);
                }
            }
            if (highlight) {
                highlightCoordinates.forEach((coord, index) => {
                    this.addSdkPointHighlight(coord, "segmentDistortion", `segmentDistortion-${segment.id}-${index}`);
                });
                return 1;
            }
        }
        return 0;
    }

    /**
     * Speed Mode (India only): the prescribed MAX speed for a segment under the active mode, or
     * null when the mode/type has no cap. Applies only to Primary Street, Freeway, Major & Minor
     * Highway.
     *   - mountain: all four → 40
     *   - city:     Primary Street → 40; Minor Highway → 40; Major Highway → 50; Freeway → 50.
     *               Exception: for Major & Minor Highway with elevation level >= 2 → 60.
     *   - normal:   no cap
     */
    speedModeCapFor(mode, segment) {
        const roadType = segment.roadType;
        if (mode === "mountain") {
            if (roadType === this.ROAD_TYPE_PRIMARY_STREET || roadType === this.ROAD_TYPE_MINOR_HIGHWAY
                || roadType === this.ROAD_TYPE_MAJOR_HIGHWAY || roadType === this.ROAD_TYPE_FREE_WAY) {
                return 40;
            }
            return null;
        }
        if (mode === "city") {
            const elevated = typeof segment.elevationLevel === "number" && segment.elevationLevel >= 2;
            if (roadType === this.ROAD_TYPE_PRIMARY_STREET) {
                return 40;
            }
            if (roadType === this.ROAD_TYPE_MINOR_HIGHWAY) {
                return elevated ? 60 : 40;
            }
            if (roadType === this.ROAD_TYPE_MAJOR_HIGHWAY) {
                return elevated ? 60 : 50;
            }
            if (roadType === this.ROAD_TYPE_FREE_WAY) {
                return 50;
            }
            return null;
        }
        return null;
    }

    /**
     * The fwd/rev speed changes needed to bring a segment down to the mode cap. Only numeric speeds
     * ABOVE the cap are lowered (segments already at or below the cap — or with no speed set — are left
     * unchanged, per the "don't change lower limits" rule).
     * @returns {{fwdMaxSpeed?:number, revMaxSpeed?:number}} attributes for updateSegmentAttributes.
     */
    speedModeViolations(segment, cap) {
        const attrs = {};
        if (typeof segment.fwdSpeedLimit === "number" && segment.fwdSpeedLimit > cap) attrs.fwdMaxSpeed = cap;
        if (typeof segment.revSpeedLimit === "number" && segment.revSpeedLimit > cap) attrs.revMaxSpeed = cap;
        return attrs;
    }

    /**
     * Highlight (Fix-Default-Speed colour) segments that exceed the active Speed Mode cap. India only.
     * @returns {number} 1 if highlighted, else 0.
     */
    highlightSpeedMode(segment, mode) {
        if (this.country !== "IN" || !mode || mode === "normal") {
            return 0;
        }
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        const cap = this.speedModeCapFor(mode, segment);
        if (cap == null) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        if (segment.lockRank > this.userInfo.rank) {
            return 0;
        }
        if ($.isEmptyObject(this.speedModeViolations(segment, cap))) {
            return 0;
        }
        if (!segment.geometry) {
            return 0;
        }
        this.addSdkSegmentHighlight(segment, "speed");
        return 1;
    }

    /**
     * Cap a segment's speeds to the active Speed Mode limit (India only). Runs from the bug button /
     * Clean Up only — there is no automatic fix.
     * @returns {number} 1 if a change was made, else 0.
     */
    fixSpeedMode(segment, mode) {
        if (this.country !== "IN" || !mode || mode === "normal") {
            return 0;
        }
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        const cap = this.speedModeCapFor(mode, segment);
        if (cap == null) {
            return 0;
        }
        if (segment.lockRank > this.userInfo.rank) {
            return 0;
        }
        const attrs = this.speedModeViolations(segment, cap);
        if ($.isEmptyObject(attrs)) {
            return 0;
        }
        this.updateSegmentAttributes(segment.id, attrs);
        return 1;
    }

    highlightMissingDefaultSpeeds(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        let speedHighlight = false;
        if (segment.lockRank <= this.userInfo.rank) {
            if (segment.junctionId !== null) {
                if (segment.fwdSpeedLimit === null && segment.isAtoB) {
                    if (segment.fwdSpeedLimit !== this.DEFAULT_RA_MAX_SPEED) speedHighlight = true;
                }
                if (segment.revSpeedLimit === null && segment.isBtoA) {
                    if (segment.revSpeedLimit !== this.DEFAULT_RA_MAX_SPEED) speedHighlight = true;
                }
                if (speedHighlight) {
                    if (!segment.geometry) {
                        return 0;
                    }
                    this.addSdkSegmentHighlight(segment, "speed");
                    return 1;
                } else {
                    return 0;
                }
            } else {
                switch (segment.roadType) {
                    case this.ROAD_TYPE_PRIMARY_STREET:
                    case this.ROAD_TYPE_MINOR_HIGHWAY:
                    case this.ROAD_TYPE_MAJOR_HIGHWAY:
                    case this.ROAD_TYPE_FREE_WAY:
                    case this.ROAD_TYPE_RAMPS:
                        if (segment.isTwoWay) {
                            if (segment.fwdSpeedLimit === null || segment.revSpeedLimit === null) {
                                speedHighlight = true;
                            }
                        } else {
                            if (segment.fwdSpeedLimit === null && segment.isAtoB) {
                                speedHighlight = true;
                            }
                            if (segment.revSpeedLimit === null && segment.isBtoA) {
                                speedHighlight = true;
                            }
                        }
                        if (speedHighlight) {
                            if (!segment.geometry) {
                                return 0;
                            }
                            this.addSdkSegmentHighlight(segment, "speed");
                            return 1;
                        }
                        break;
                    default:
                        return 0;
                }
            }
        }
        return 0;
    }

    highlightLockRankMisMatch(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        let lockRankHighlight = false;
        if (segment.lockRank <= this.userInfo.rank) {
            switch (segment.roadType) {
                case this.ROAD_TYPE_PRIMARY_STREET:
                    if (this.userInfo.rank >= this.DEFAULT_PS_LOCK_LEVEL) if (segment.lockRank < this.DEFAULT_PS_LOCK_LEVEL) {
                        lockRankHighlight = true;
                    }
                    break;
                case this.ROAD_TYPE_MINOR_HIGHWAY:
                    if (this.userInfo.rank >= this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) if (segment.lockRank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                        lockRankHighlight = true;
                    }
                    break;
                case this.ROAD_TYPE_MAJOR_HIGHWAY:
                    if (this.userInfo.rank >= this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) if (segment.lockRank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                        lockRankHighlight = true;
                    }
                    break;
                case this.ROAD_TYPE_FREE_WAY:
                    if (this.userInfo.rank >= this.DEFAULT_FREE_WAY_LOCK_LEVEL) if (segment.lockRank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                        lockRankHighlight = true;
                    }
                    break;
                case this.ROAD_TYPE_RAMPS:
                    if (this.userInfo.rank >= this.DEFAULT_RAMP_LOCK_LEVEL) if (segment.lockRank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                        lockRankHighlight = true;
                    }
                    break;
                default:
                    return 0;
            }
        }
        if (lockRankHighlight) {
            if (!segment.geometry) {
                return 0;
            }
            this.addSdkSegmentHighlight(segment, "lockMismatch");
            return 1;
        }
        return 0;
    }

    highlightUnusedSpeed(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        if (segment.lockRank <= this.userInfo.rank) {
            let highlight = false;
            if (segment.isAtoB === true && segment.revSpeedLimit !== null) {
                highlight = true;
            }
            if (segment.isBtoA === true && segment.fwdSpeedLimit !== null) {
                highlight = true;
            }
            if (highlight) {
                if (!segment.geometry) {
                    return 0;
                }
                this.addSdkSegmentHighlight(segment, "unusedSpeed");
                return 1;
            }
        }
        return 0;
    }

    highlightStreetSpeed(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: segment.id})
        if (!segmentAddress.isEmpty) {
            if (segmentAddress.street.name !== null)
                if (segmentAddress.street.name.toLowerCase() === "underpass") {
                    return 0;
                }
        }
        if (segment.lockRank <= this.userInfo.rank) {
            if (segment.roadType === this.ROAD_TYPE_STREET) {
                let highlight = false;
                // if (segment.isAtoB === true && segment.fwdSpeedLimit !== null) {
                //     highlight = true;
                // }
                // if (segment.isBtoA === true && segment.revSpeedLimit !== null) {
                //     highlight = true;
                // }
                if (segment.isTwoWay && (segment.fwdSpeedLimit !== null || segment.revSpeedLimit !== null)) {
                    highlight = true;
                }

                if (highlight) {
                    if (!segment.geometry) {
                        return 0;
                    }
                    this.addSdkSegmentHighlight(segment, "streetSpeed");
                    return 1;
                }
            }
        }
        return 0;
    }

    highlightBtoAOneWay(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (this.userInfo == null) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        if (segment.lockRank <= this.userInfo.rank) {

            let highlight = false;
            if (segment.isTwoWay == false & segment.isBtoA == true) {
                highlight = true;
            }

            if (highlight) {
                if (!segment.geometry) {
                    return 0;
                }
                this.addSdkSegmentHighlight(segment, "bToAOneWay");
                return 1;
            }
        }
        return 0;
    }

    fixBtoA() {
        if (!this.scriptEnabled) return;

        const user = this.userInfo;
        if (!user) return;

        const username = user.userName.toLowerCase();

        // Platinum only
        if (!this.hasFeature("fix-bto-a")) {
            this.log("fixBtoA(): Only for platinum members.");
            return;
        }

        // Require zoom ≥ 14
        const zoom = this.wmeSDK.Map.getZoomLevel();
        if (zoom < 14) {
            this.log("fixBtoA(): Zoom in to level 14 or closer.");
            return;
        }

        // Correct visible map bounds
        const bounds = this.getVisibleBoundsLatLon();
        if (!bounds) {
            this.log("fixBtoA(): could not determine visible map bounds; aborting.");
            return;
        }

        // Reverse max 5
        const MAX_PER_CLICK = 10;
        let reversed = 0;

        const segments = this.wmeSDK.DataModel.Segments.getAll();

        for (let i = 0; i < segments.length; i++) {
            if (reversed >= MAX_PER_CLICK) break;

            const seg = segments[i];

            // Editable
            if (!this.checkSegmentEditability(seg)) continue;

            // Rank
            if (seg.lockRank > user.rank) continue;

            // Backward one-way
            if (!(seg.isTwoWay === false && seg.isBtoA === true)) continue;

            // Must be completely inside bounding box
            if (!this.isSegmentInsideBounds(seg, bounds)) continue;

            // Reverse it safely
            const ok = this.reverseSegmentPreserveConnections(seg.id);
            if (ok) reversed++;
        }

        this.log(`fixBtoA(): Reversed ${reversed} backward one-way segments.`);
    }

    isSegmentInsideBounds(segment, bounds) {
        if (!bounds) return false;
        const geom = segment.geometry;
        if (!geom || !geom.coordinates) return false;

        for (let i = 0; i < geom.coordinates.length; i++) {
            const [lon, lat] = geom.coordinates[i];

            if (
                lat < bounds.south ||
                lat > bounds.north ||
                lon < bounds.west ||
                lon > bounds.east
            ) {
                return false; // a point is outside
            }
        }
        return true;
    }

    getVisibleBoundsLatLon() {
        // There is no Map.getBounds() in the SDK; getMapExtent() returns [west, south, east, north]
        // (a.k.a. [left, bottom, right, top]).
        const extent = this.wmeSDK.Map.getMapExtent ? this.wmeSDK.Map.getMapExtent() : null;
        if (!Array.isArray(extent) || extent.length < 4) {
            return null;
        }
        const [west, south, east, north] = extent;
        return {west, south, east, north};
    }

    // -----------------------------
    // Bad Junction Angles (BJAI-style rendering)
    // -----------------------------

    onBadJunctionAngleSelect(feature) {
        try {
            const layerName = feature && (feature.layerName || (feature.detail && feature.detail.layerName));
            if (layerName && layerName !== this.sdkBadJunctionLayerName) return;

            const featureId = feature && (
                feature.featureId ||
                feature.id ||
                (feature.detail && feature.detail.featureId)
            );
            const properties = (feature && feature.feature && feature.feature.properties) ||
                (feature && feature.attributes) ||
                (featureId != null ? this._bjaFeatureMeta.get(featureId) : null);

            if (!properties) return;
            if (properties.aja_type !== 'generic') return;

            if (!this.userInfo) this.userInfo = this.wmeSDK.State.getUserInfo();
            if (!this.userInfo || !this.hasFeature("fix-bja")) return;

            const pref = this.getUserPreference();
            if (!pref.clickFixBadJunctionAngles) return;

            const nodeId = properties.nodeId;
            const segAId = properties.segAId;
            const segBId = properties.segBId;
            if (nodeId == null || segAId == null || segBId == null) return;

            const ok = true;// window.confirm(`Fix bad junction angle at node ${nodeId}?`);
            if (!ok) return;

            const r = this.fixBadJunctionAnglePair(nodeId, segAId, segBId, {insertDistPx: 50, nudgePx: 5});
            this.log(`BJA fix: ${r.fixed ? 'OK' : 'NO'} (${r.reason || ''})`);

            setTimeout(() => this.scanMap(), 250);
        } catch (e) {
            this.log(e);
        }
    }

    fixBadJunctionAnglesVisible() {
        try {
            let zoom_level = this.wmeSDK.Map.getZoomLevel();

            if (zoom_level < 20) {
                alert("Fixing bad angle works only at zoom level 20 or above")
                return;
            }
            if (!this.userInfo) this.userInfo = this.wmeSDK.State.getUserInfo();
            if (!this.userInfo || !this.hasFeature("fix-bja")) {
                this.log('Bad junction angle auto-fix: Platinum only');
                return;
            }

            const pref = this.getUserPreference();
            if (!pref.showBadJunctionAngles) {
                this.log('Enable "Show Bad Junction Angles" first');
                return;
            }

            if (!this._bjaCache || !this._bjaCache.pairsByNode || this._bjaCache.pairsByNode.size === 0) {
                this.drawBadJunctionAngles();
            }

            const pairsByNode = (this._bjaCache && this._bjaCache.pairsByNode) ? this._bjaCache.pairsByNode : new Map();
            const MAX = Math.min((this.MAX_EDITS_PER_TRANSACTION || 75), 60);

            let fixed = 0;
            let tried = 0;

            for (const pairs of pairsByNode.values()) {
                if (!pairs) continue;
                for (let i = 0; i < pairs.length; i++) {
                    if (fixed >= MAX) break;
                    tried++;
                    const p = pairs[i];
                    const r = this.fixBadJunctionAnglePair(p.nodeId, p.segAId, p.segBId, {
                        insertDistPx: 50,
                        nudgePx: 5
                    });
                    if (r && r.fixed) fixed++;
                }
                if (fixed >= MAX) break;
            }

            this.log(`Bad junction angles: fixed ${fixed} (tried ${tried}, cap ${MAX}).`);
            setTimeout(() => this.scanMap(), 300);
        } catch (e) {
            this.log(e);
        }
    }

    fixBadJunctionAnglePair(nodeId, segAId, segBId, options = {}) {
        const cfg = {
            badMin: 133,
            badMax: 136,
            insertDistPx: 30,
            nudgePx: 18,
            skipRoadTypes: new Set([5, 10, 16, 18, 19]),
            ...options
        };

        const isBad = (deg) => deg > cfg.badMin && deg < cfg.badMax;
        const wrap360 = (d) => ((d % 360) + 360) % 360;
        const angleBetween = (a1, a2) => {
            let d = wrap360(a2 - a1);
            if (d > 180) d = 360 - d;
            return d;
        };
        const deg = (rad) => (rad * 180) / Math.PI;

        const segA = W.model.segments.getObjectById(segAId);
        const segB = W.model.segments.getObjectById(segBId);
        const node = W.model.nodes.getObjectById(nodeId);
        if (!segA || !segB || !node) return {fixed: false, reason: 'missing objects'};
        if (!segA.attributes || !segB.attributes) return {fixed: false, reason: 'missing attrs'};

        if (cfg.skipRoadTypes.has(segA.attributes.roadType) || cfg.skipRoadTypes.has(segB.attributes.roadType)) {
            return {fixed: false, reason: 'skip road type'};
        }

        if (!this.userInfo) this.userInfo = this.wmeSDK.State.getUserInfo();
        const sdkA = this.wmeSDK.DataModel.Segments.getById({segmentId: segAId});
        const sdkB = this.wmeSDK.DataModel.Segments.getById({segmentId: segBId});
        if (!sdkA || !sdkB) return {fixed: false, reason: 'sdk seg missing'};
        if (sdkA.lockRank > this.userInfo.rank || sdkB.lockRank > this.userInfo.rank) return {
            fixed: false,
            reason: 'locked'
        };

        const a1 = this.getAngle(nodeId, segA);
        const a2 = this.getAngle(nodeId, segB);
        if (a1 == null || a2 == null) return {fixed: false, reason: 'angle calc failed'};
        const curBetween = angleBetween(wrap360(a1), wrap360(a2));
        if (!isBad(curBetween)) return {fixed: true, reason: 'already ok'};

        const res = (W.map && typeof W.map.getResolution === 'function') ? W.map.getResolution() : null;
        const pxToMu = (px) => (res && res > 0) ? px * res : px;

        const getNodeNear = (sdkSeg) => {
            const olGeom = this.getOLFeatureGeometryFromSegment(sdkSeg);
            if (!olGeom || !olGeom.components || olGeom.components.length < 2) return null;
            const comps = olGeom.components;
            const isFrom = sdkSeg.attributes.fromNodeID === nodeId;
            const pNode = isFrom ? comps[0] : comps[comps.length - 1];
            const pNear = isFrom ? comps[1] : comps[comps.length - 2];
            return {isFrom, pNode, pNear, compsLen: comps.length};
        };

        const unitDir = (pNode, pNear) => {
            let vx = pNear.x - pNode.x;
            let vy = pNear.y - pNode.y;
            const len = Math.hypot(vx, vy);
            if (!len || len < 0.000001) return null;
            vx /= len;
            vy /= len;
            return {vx, vy, nx: -vy, ny: vx};
        };

        const A = getNodeNear(segA);
        const B = getNodeNear(segB);
        if (!A || !B) return {fixed: false, reason: 'geometry missing'};

        // Edit the segment with fewer vertices (smaller change)
        const editSeg = (A.compsLen <= B.compsLen) ? segA : segB;
        const otherSeg = (editSeg === segA) ? segB : segA;
        const editInfo = (editSeg === segA) ? A : B;
        const otherInfo = (otherSeg === segA) ? A : B;

        const edir = unitDir(editInfo.pNode, editInfo.pNear);
        const odir = unitDir(otherInfo.pNode, otherInfo.pNear);
        if (!edir || !odir) return {fixed: false, reason: 'dir calc failed'};

        const baseDist = pxToMu(cfg.insertDistPx);
        const nudge = pxToMu(cfg.nudgePx);

        const otherAngle = Math.atan2(odir.vy, odir.vx);

        const baseX = editInfo.pNode.x + edir.vx * baseDist;
        const baseY = editInfo.pNode.y + edir.vy * baseDist;

        const candidates = [
            {k: 1, s: 1}, {k: 1, s: -1},
            {k: 2, s: 1}, {k: 2, s: -1},
            {k: 3, s: 1}, {k: 3, s: -1}
        ];

        let best = null;

        for (const c of candidates) {
            const newNear = new OpenLayers.Geometry.Point(
                baseX + edir.nx * nudge * c.k * c.s,
                baseY + edir.ny * nudge * c.k * c.s
            );
            if (!Number.isFinite(newNear.x) || !Number.isFinite(newNear.y)) {
                continue;
            }

            const editAngle = Math.atan2(newNear.y - editInfo.pNode.y, newNear.x - editInfo.pNode.x);
            const between = angleBetween(wrap360(deg(editAngle)), wrap360(deg(otherAngle)));
            const ok = !isBad(between);

            const candidate = {ok, between, newNear, k: c.k};

            if (!best) best = candidate;
            else if (candidate.ok && !best.ok) best = candidate;
            else if (candidate.ok && best.ok) {
                if (candidate.k < best.k) best = candidate;
                else if (candidate.k === best.k && Math.abs(candidate.between - 134.5) > Math.abs(best.between - 134.5)) best = candidate;
            } else if (!candidate.ok && !best.ok) {
                if (Math.abs(candidate.between - 134.5) > Math.abs(best.between - 134.5)) best = candidate;
            }
        }

        if (!best) return {fixed: false, reason: 'no candidate'};
        if (isBad(best.between)) return {fixed: false, reason: 'no safe nudge found'};

        const editSegId = editSeg.getID ? editSeg.getID() : editSeg.id;
        const oldGeometry = editSeg.getGeometry();
        if (!oldGeometry || !oldGeometry.coordinates || oldGeometry.coordinates.length < 2) return {
            fixed: false,
            reason: 'old geometry missing'
        };

        const coords = oldGeometry.coordinates.map((c) => [c[0], c[1]]);
        if (!coords.every((c) => Array.isArray(c) && c.length >= 2 && Number.isFinite(c[0]) && Number.isFinite(c[1]))) {
            return {fixed: false, reason: 'invalid geometry'};
        }
        const isFrom = editSeg.attributes.fromNodeID === nodeId;
        const ll = new OpenLayers.Geometry.Point(best.newNear.x, best.newNear.y).transform('EPSG:3857', 'EPSG:4326');

        const idxReplace = isFrom ? 1 : (coords.length - 2);
        const idxInsert = isFrom ? 1 : (coords.length - 1);
        const canReplace = coords.length >= 3 && idxReplace > 0 && idxReplace < coords.length - 1;

        const newCoords = coords.slice();
        if (canReplace) newCoords[idxReplace] = [ll.x, ll.y];
        else newCoords.splice(idxInsert, 0, [ll.x, ll.y]);

        const newGeometry = {
            type: oldGeometry.type || "LineString",
            coordinates: newCoords
        };

        this.wmeSDK.DataModel.Segments.updateSegment({segmentId: editSegId, geometry: newGeometry});

        return {fixed: true, reason: 'updated', editedSegId: editSegId, newBetween: best.between};
    }

    ensureBadJunctionLayerZIndex() {
        try {
            this.wmeSDK.Map.setLayerZIndex({layerName: this.sdkBadJunctionLayerName, zIndex: 500});
        } catch (e) {
            // ignore
        }
    }

    getBadJunctionAngleLabelDistance() {
        // Mirror BJAI zoom->distance table
        const zoom = this.wmeSDK.Map.getZoomLevel();
        let d;
        switch (zoom) {
            case 22:
                d = 2.8;
                break;
            case 21:
                d = 4;
                break;
            case 20:
                d = 8;
                break;
            case 19:
                d = 15;
                break;
            case 18:
                d = 25;
                break;
            case 17:
                d = 40;
                break;
            case 16:
                d = 80;
                break;
            case 15:
                d = 150;
                break;
            case 14:
                d = 300;
                break;
            case 13:
                d = 400;
                break;
            default:
                d = 40;
        }
        // BJAI multiplies by (1 + 0.2*decimals). We keep decimals=0.
        return d;
    }

    correctBadJunctionLabelDistance(labelDistance, coordinates) {
        if (!Array.isArray(coordinates) || coordinates.length < 2) {
            return labelDistance;
        }

        const lon = coordinates[0];
        const lat = coordinates[1];
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
            return labelDistance;
        }

        if (Math.abs(lon) <= 180 && Math.abs(lat) <= 90) {
            return labelDistance * Math.cos((lat * Math.PI) / 180);
        }

        return labelDistance;
    }

    mathBearingToCompassBearing(mathBearingDeg) {
        return (90 - mathBearingDeg + 360) % 360;
    }

    computeBadJunctionLabelPoint(nodeCoordinates, labelDistanceMeters, mathBearingDeg) {
        if (!Array.isArray(nodeCoordinates) || nodeCoordinates.length < 2) {
            return null;
        }

        const correctedDistance = this.correctBadJunctionLabelDistance(labelDistanceMeters, nodeCoordinates);
        if (typeof turf !== "undefined" && turf.point && turf.destination) {
            return turf.destination(
                turf.point(nodeCoordinates),
                correctedDistance / 1000,
                this.mathBearingToCompassBearing(mathBearingDeg)
            ).geometry.coordinates;
        }

        const radians = (mathBearingDeg * Math.PI) / 180;
        return [
            nodeCoordinates[0] + (correctedDistance * Math.cos(radians)),
            nodeCoordinates[1] + (correctedDistance * Math.sin(radians))
        ];
    }

    /**
     * Whether the SDK big-junction API is available (added ~WME v2.343-2.345). Cached after first check.
     */
    bigJunctionApiAvailable() {
        if (this._bigJunctionApi === undefined) {
            const S = this.wmeSDK && this.wmeSDK.DataModel && this.wmeSDK.DataModel.Segments;
            this._bigJunctionApi = !!(S
                && typeof S.isContainedInBigJunction === "function"
                && typeof S.isFromNodeInBigJunction === "function"
                && typeof S.isToNodeInBigJunction === "function");
        }
        return this._bigJunctionApi;
    }

    /**
     * Whether a node is part of a big junction (interchange), using the segment-based SDK helpers.
     * @param {number} nodeId
     * @param {number[]} connectedSegmentIds - the node's connected segment ids
     * @returns {boolean} true if any connected segment reports this node as inside a big junction
     */
    isNodeInBigJunction(nodeId, connectedSegmentIds) {
        if (!this.bigJunctionApiAvailable()) return false;
        const S = this.wmeSDK.DataModel.Segments;
        const segIds = connectedSegmentIds || [];
        for (let i = 0; i < segIds.length; i++) {
            const segId = segIds[i];
            try {
                if (S.isContainedInBigJunction({segmentId: segId})) return true;
                const seg = S.getById({segmentId: segId});
                if (!seg) continue;
                if (seg.fromNodeId === nodeId && S.isFromNodeInBigJunction({segmentId: segId})) return true;
                if (seg.toNodeId === nodeId && S.isToNodeInBigJunction({segmentId: segId})) return true;
            } catch (e) {
                /* ignore — treat as not-in-big-junction */
            }
        }
        return false;
    }

    drawBadJunctionAngles() {
        try {
            // Only at zoom >= 14 (matches your toolkit constraints)
            const zoom = this.wmeSDK.Map.getZoomLevel();
            if (zoom !== null && zoom < 14) return;

            this.clearBadJunctionAngleLayer();
            this.ensureBadJunctionLayerZIndex();
            this.wmeSDK.Map.setLayerVisibility({layerName: this.sdkBadJunctionLayerName, visibility: true});

            const extentKey = this.wmeSDK.Map.getMapExtent ? JSON.stringify(this.wmeSDK.Map.getMapExtent()) : null;
            const zoomKey = this.wmeSDK.Map.getZoomLevel();

            const reuseCache = (this._bjaCache && this._bjaCache.extentKey === extentKey && this._bjaCache.zoom === zoomKey);
            if (!this._bjaCache) this._bjaCache = {extentKey: null, zoom: null, pairsByNode: new Map()};

            if (!reuseCache) {
                this._bjaCache.extentKey = extentKey;
                this._bjaCache.zoom = zoomKey;
                this._bjaCache.pairsByNode = new Map();
            }
            const SKIP_ROAD_TYPES = new Set([5, 10, 16, 18, 19]);

            // Collect candidate node ids from loaded legacy segments (BJAI)
            const nodeIds = [];
            const segArray = this.wmeSDK.DataModel.Segments.getAll() || [];
            for (let i = 0; i < segArray.length; i++) {
                const s = segArray[i];
                if (!s) continue;
                if (SKIP_ROAD_TYPES.has(s.roadType)) continue;

                const from = s.fromNodeId;
                const to = s.toNodeId;
                if (from != null && nodeIds.indexOf(from) === -1) nodeIds.push(from);
                if (to != null && nodeIds.indexOf(to) === -1) nodeIds.push(to);
            }

            const labelDistance = this.getBadJunctionAngleLabelDistance();
            const wrap360 = (d) => ((d % 360) + 360) % 360;

            for (let i = 0; i < nodeIds.length; i++) {
                const nodeId = nodeIds[i];
                const node = this.wmeSDK.DataModel.Nodes.getById({nodeId});
                if (!node || !node.connectedSegmentIds) continue;

                // Skip nodes that are part of a big junction (interchange). Their sharp angles are by
                // design, not errors. Feature-detected — no-op on older WME without the API.
                if (this.isNodeInBigJunction(nodeId, node.connectedSegmentIds)) continue;

                const segIDs = node.connectedSegmentIds;

                // BJAI behavior: allow the common 2-segment junction-angle case,
                // and also handle larger junctions with multiple angle pairs.
                if (!segIDs || segIDs.length < 2) continue;

                const angles = [];
                const pairsForNode = [];

                for (let j = 0; j < segIDs.length; j++) {
                    const segId = segIDs[j];
                    const seg = this.wmeSDK.DataModel.Segments.getById({segmentId: segId});
                    if (!seg) continue;
                    if (SKIP_ROAD_TYPES.has(seg.roadType)) continue;

                    const a = this.getAngle(nodeId, seg);
                    if (a === null || typeof a === 'undefined' || isNaN(a)) continue;

                    angles.push([wrap360(a), segId, true, seg.roadType]);
                }

                // filter skipped road types (extra safety)
                for (let ii = 0; ii < angles.length; ii++) {
                    if (SKIP_ROAD_TYPES.has(angles[ii][3])) {
                        angles.splice(ii, 1);
                        ii--;
                    }
                }

                // sort ascending
                angles.sort((a, b) => a[0] - b[0]);

                if (angles.length === 2) {
                    let between = (360 + (angles[1][0] - angles[0][0])) % 360;
                    if (between > 180) between = 360 - between;

                    if (between > 133 && between < 136) {
                        const ha = (360 + ((between / 2) + angles[0][0])) % 360;
                        const nodePt = node.geometry && Array.isArray(node.geometry.coordinates) ? node.geometry.coordinates : null;
                        if (nodePt) {
                            const point = this.computeBadJunctionLabelPoint(nodePt, labelDistance * 1.25, ha);
                            if (!point) {
                                continue;
                            }

                            pairsForNode.push({
                                nodeId: nodeId,
                                segAId: angles[0][1],
                                segBId: angles[1][1],
                                badAngleDeg: between
                            });
                            this.drawBadJunctionAngleMarker(point, node, between, nodeId, angles[0][1], angles[1][1]);
                        }
                    }

                    if (!reuseCache && pairsForNode.length > 0) {
                        this._bjaCache.pairsByNode.set(nodeId, pairsForNode);
                    }
                    continue;
                }

                if (angles.length < 2) continue;

                for (let iii = 0; iii < angles.length - 1; iii++) {
                    for (let jjj = iii + 1; jjj < angles.length; jjj++) {
                        let a = (360 + (angles[jjj][0] - angles[iii][0])) % 360;
                        let ha;
                        if (a > 180) {
                            a = 360 - a;
                            ha = (360 + ((a / 2) + angles[jjj][0])) % 360;
                        } else {
                            ha = (360 + ((a / 2) + angles[iii][0])) % 360;
                        }

                        // Bad window (BJAI)
                        if (a > 133 && a < 136) {
                            const nodePt = node.geometry && Array.isArray(node.geometry.coordinates) ? node.geometry.coordinates : null;
                            if (!nodePt) {
                                continue;
                            }
                            let point = this.computeBadJunctionLabelPoint(nodePt, labelDistance * 1.25, ha);
                            if (!point) {
                                continue;
                            }

                            // Collision-avoidance loop (BJAI)
                            let tmpDist = labelDistance * 1.25;

                            while (this._bjaRenderedPoints.some((renderedPoint) => labelDistance / 1.4 > this.findLength(renderedPoint, point))) {
                                tmpDist += labelDistance / 4;
                                point = this.computeBadJunctionLabelPoint(nodePt, tmpDist, ha);
                                if (!point) {
                                    break;
                                }
                            }

                            if (!point) {
                                continue;
                            }

                            pairsForNode.push({
                                nodeId: nodeId,
                                segAId: angles[iii][1],
                                segBId: angles[jjj][1],
                                badAngleDeg: a
                            });
                            this.drawBadJunctionAngleMarker(point, node, a, nodeId, angles[iii][1], angles[jjj][1]);
                        }
                    }
                }
                if (!reuseCache && pairsForNode.length > 0) {
                    this._bjaCache.pairsByNode.set(nodeId, pairsForNode);
                }
            }
        } catch (e) {
            this.log(e);
        }
    }

// BJAI-style marker: line + point label. Store nodeId + seg ids.
    drawBadJunctionAngleMarker(point, node, a, nodeId, segAId, segBId) {
        const nodeCoordinates = node.geometry && Array.isArray(node.geometry.coordinates) ? node.geometry.coordinates : null;
        const labelCoordinates = Array.isArray(point) ? point : null;
        if (!nodeCoordinates || !labelCoordinates) {
            return;
        }

        const featureKey = `${nodeId}-${segAId}-${segBId}`;
        this.addBadJunctionAngleFeature(
            `bja-line-${featureKey}`,
            {
                type: "LineString",
                coordinates: [nodeCoordinates, labelCoordinates]
            },
            {
                aja_type: "connector",
                nodeId,
                segAId,
                segBId,
                badAngleDeg: a
            }
        );
        this.addBadJunctionAngleFeature(
            `bja-point-${featureKey}`,
            {
                type: "Point",
                coordinates: labelCoordinates
            },
            {
                angle: (Math.round(180 - a)) + "°",
                aja_type: "generic",
                nodeId,
                segAId,
                segBId,
                badAngleDeg: a
            }
        );
        this._bjaRenderedPoints.push(labelCoordinates);
    }

    highlightSegmentLength(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }

        if (segment.length < this.SEGMENT_LENGTH_TOLERANCE) {
            const coordinates = segment.geometry && Array.isArray(segment.geometry.coordinates) ? segment.geometry.coordinates : null;
            if (!coordinates || coordinates.length < 2) {
                return 0;
            }

            // Midpoint at half of total polyline length + the segment angle at that midpoint
            const {mid, angle, start, end} = this.calculateMidpointWithAngle(coordinates);

            // Segment length for the segment that contains the midpoint (map units)
            const segmentLength = (start && end) ? this.findLength(start, end) : (segment.length / Math.max(1, (coordinates.length - 1)));

            // Dynamic pixel distance based on segment length + angle
            const distancePx = this.computeDynamicDistancePx(segmentLength, angle, 35, 35);

            // Dynamic side-lock:
            // - For horizontal-ish segments: show bubble on TOP (screen-up)
            // - For near-vertical segments: show bubble on RIGHT
            const horiz = Math.abs(Math.cos(angle)); // 1=horizontal, 0=vertical
            const lockSide = (horiz < 0.35) ? 'right' : 'up';

            // Extra spacing when the segment is diagonal and/or when we lock to the RIGHT.
            const diag = Math.abs(Math.sin(2 * angle)); // 0..1 (peaks near 45°)
            let spacedDistancePx = distancePx;

            if (lockSide === 'right') {
                spacedDistancePx *= (1.35 + 0.25 * diag); // more right push at diagonals/crossings
            } else if (lockSide === 'up') {
                spacedDistancePx *= (1.10 + 0.20 * diag); // slight extra top push at diagonals
            }

            const {xOff, yOff} = this.getBubbleOffsets(angle, spacedDistancePx, 35, 35, lockSide);

            const length = Math.round(segment.length);
            this.addSdkSegmentLengthHighlight([mid.x, mid.y], length, xOff, yOff, `segment-length-${segment.id}`);

            return 1;
        }

        return 0;
    }

    highlightUTurnRoadTypeMisMatch(segment) {
        let userPreference = this.getUserPreference();
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let segmentRoadType = segment.roadType;
        let fromNodeId = segment.fromNodeId;
        let toNodeId = segment.toNodeId;
        let highlight = false;
        let fromNode = this.wmeSDK.DataModel.Nodes.getById({nodeId: fromNodeId});
        let toNode = this.wmeSDK.DataModel.Nodes.getById({nodeId: toNodeId});
        let fromSegments = [];
        let toSegments = [];
        let connectedSegments = [];

        for (let i = 0; i < fromNode.connectedSegmentIds.length; i++) {
            let connectedSegment = this.wmeSDK.DataModel.Segments.getById({segmentId: fromNode.connectedSegmentIds[i]});
            if (connectedSegment.isTwoWay === false) {
                fromSegments.push(connectedSegment);
                connectedSegments.push(connectedSegment);
            }
        }

        for (let i = 0; i < toNode.connectedSegmentIds.length; i++) {
            let connectedSegment = this.wmeSDK.DataModel.Segments.getById({segmentId: toNode.connectedSegmentIds[i]});
            if (connectedSegment.isTwoWay === false) {
                toSegments.push(connectedSegment);
                connectedSegments.push(connectedSegment);
            }
        }
        let mainRoadType = -1;
        let connectedSegmentName = "";
        if (connectedSegments.length > 3)
            for (let i = 0; i < connectedSegments.length; i++) {
                let connectedSegment = connectedSegments[i];
                if (i === 0) {
                    let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: connectedSegment.id});
                    if (segmentAddress.isEmpty === false) {
                        if (segmentAddress.street.name !== null) {
                            connectedSegmentName = segmentAddress.street.name;
                        }
                    }
                    mainRoadType = connectedSegment.roadType;
                }
                if (mainRoadType !== connectedSegment.roadType) {
                    mainRoadType = -1;
                    break;
                }
                let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: connectedSegment.id});
                if (segmentAddress.isEmpty === false) {
                    if (segmentAddress.street.name !== null) {
                        if (connectedSegmentName !== segmentAddress.street.name) {
                            mainRoadType = -1;
                            break
                        }
                    }
                }
            }
        if (mainRoadType !== -1 && mainRoadType !== segmentRoadType) {
            highlight = true;
        }
        if (highlight) {
            if (!segment.geometry) {
                return 0;
            }
            this.addSdkSegmentHighlight(segment, "uTurnRoadType");
            return 1;

        }


        return 0;
    }

    calculateJunctionAngleInfo(selectedId) {
        this.log(selectedId)
        let segment = this.wmeSDK.DataModel.Segments.getById({segmentId: selectedId});
        if (!segment) {
            return;
        }
        let fromNodeId = segment.fromNodeId;
        let toNodeId = segment.toNodeId;
        let fromNode = this.wmeSDK.DataModel.Nodes.getById({nodeId: fromNodeId});
        let toNode = this.wmeSDK.DataModel.Nodes.getById({nodeId: toNodeId});
        let selectedSegmentFromNodeAngle = this.getAngle(fromNodeId, segment)
        let selectedSegmentToNodeAngle = this.getAngle(toNodeId, segment)
        this.log("selectedSegmentFromNodeAngle -> " + selectedSegmentFromNodeAngle);
        this.log("selectedSegmentToNodeAngle -> " + selectedSegmentToNodeAngle);
        let fromSegmentNodeAngles = [];
        let toSegmentNodeAngles = [];
        for (let i = 0; i < fromNode.connectedSegmentIds.length; i++) {
            if (fromNode.connectedSegmentIds[i] !== segment.id) {
                let sdkConnectedSegment = this.wmeSDK.DataModel.Segments.getById({segmentId: fromNode.connectedSegmentIds[i]});
                let angle = this.getAngle(fromNodeId, sdkConnectedSegment);
                fromSegmentNodeAngles.push({
                    segmentId: fromNode.connectedSegmentIds[i],
                    angle: angle,
                    turnAngle: this.angleDifference(angle, selectedSegmentFromNodeAngle, false)
                });
            }
        }

        for (let i = 0; i < toNode.connectedSegmentIds.length; i++) {
            if (toNode.connectedSegmentIds[i] !== segment.id) {
                let sdkConnectedSegment = this.wmeSDK.DataModel.Segments.getById({segmentId: toNode.connectedSegmentIds[i]});
                let angle = this.getAngle(toNodeId, sdkConnectedSegment);
                toSegmentNodeAngles.push({
                    segmentId: toNode.connectedSegmentIds[i],
                    angle: angle,
                    turnAngle: this.angleDifference(angle, selectedSegmentToNodeAngle, false)
                });
            }
        }

        for (let i = 0; i < fromSegmentNodeAngles.length; ++i) {
            this.log(
                "Segment from " + fromSegmentNodeAngles[i].segmentId +
                " angle: " + fromSegmentNodeAngles[i].angle +
                ", turn angle: " + fromSegmentNodeAngles[i].turnAngle
            );
        }

        for (let i = 0; i < toSegmentNodeAngles.length; ++i) {
            this.log(
                "Segment to " + toSegmentNodeAngles[i].segmentId +
                " angle: " + toSegmentNodeAngles[i].angle +
                ", turn angle: " + toSegmentNodeAngles[i].turnAngle
            );
        }
    }

    getAngle(nodId, segment) {
        // this.log("node: " + nodId);
        // this.log("segment: " + (segment));
        if (nodId == null || segment == null) {
            return null;
        }

        const geometry = segment.geometry && Array.isArray(segment.geometry.coordinates) && segment.geometry.coordinates.length >= 2
            ? segment.geometry
            : (typeof segment.getGeometry === "function" ? segment.getGeometry() : (segment.attributes && segment.attributes.geoJSONGeometry ? segment.attributes.geoJSONGeometry : null));
        const fromNodeId = segment.fromNodeId != null ? segment.fromNodeId : (segment.attributes ? segment.attributes.fromNodeID : null);
        const toNodeId = segment.toNodeId != null ? segment.toNodeId : (segment.attributes ? segment.attributes.toNodeID : null);

        if (geometry && Array.isArray(geometry.coordinates) && geometry.coordinates.length >= 2) {
            const coordinates = geometry.coordinates;

            let fromCoord;
            let nearCoord;
            if (fromNodeId === nodId) {
                fromCoord = coordinates[0];
                nearCoord = coordinates[1];
            } else if (toNodeId === nodId) {
                fromCoord = coordinates[coordinates.length - 1];
                nearCoord = coordinates[coordinates.length - 2];
            } else {
                return null;
            }

            if (!fromCoord || !nearCoord) {
                return null;
            }

            let dx = nearCoord[0] - fromCoord[0];
            let dy = nearCoord[1] - fromCoord[1];
            let angle = Math.atan2(dy, dx);
            return ((angle * 180 / Math.PI)) % 360;
        }

        return null;
    }

    getOLFeatureGeometryFromSegment(legacySegment) {
        if (!legacySegment) return null;
        if (typeof W !== "undefined" && W.map && W.map.segmentLayer && Array.isArray(W.map.segmentLayer.features)) {
            const feature = W.map.segmentLayer.features.find((feat) => feat && feat.attributes && feat.attributes.wazeFeature && feat.attributes.wazeFeature.id === legacySegment.attributes.id);
            if (feature && feature.geometry) {
                return feature.geometry;
            }
        }
        return legacySegment.getOLGeometry ? legacySegment.getOLGeometry() : null;
    }

    getFirstPoint(legacySegment) {
        const geom = this.getOLFeatureGeometryFromSegment(legacySegment);
        return geom && geom.components ? geom.components[0] : null;
    }

    getLastPoint(legacySegment) {
        const geom = this.getOLFeatureGeometryFromSegment(legacySegment);
        return geom && geom.components ? geom.components.at(-1) : null;
    }

    getSecondPoint(legacySegment) {
        const geom = this.getOLFeatureGeometryFromSegment(legacySegment);
        return geom && geom.components ? geom.components[1] : null;
    }

    getNextToLastPoint(legacySegment) {
        const geom = this.getOLFeatureGeometryFromSegment(legacySegment);
        return geom && geom.components ? geom.components.at(-2) : null;
    }

    angleDifference(aIn, aOut, absolute) {
        var a = parseFloat(aOut) - parseFloat(aIn);
        if (a > 180) {
            a -= 360;
        }
        if (a < -180) {
            a += 360;
        }
        return absolute ? a : (a > 0 ? a - 180 : a + 180);
    }

    getAngleMiddleSeg(ja_node, ja_segment) {
        ja_log("node: " + ja_node, 2);
        ja_log("segment: " + ja_segment, 2);
        if (ja_node == null || ja_segment == null) {
            return null;
        }
        var ja_dx, ja_dy;
        if (ja_segment.attributes.fromNodeID === ja_node) {
            ja_dx = ja_get_last_point(ja_segment).x - ja_get_first_point(ja_segment).x;
            ja_dy = ja_get_last_point(ja_segment).y - ja_get_first_point(ja_segment).y;
        } else {
            ja_dx = ja_get_first_point(ja_segment).x - ja_get_last_point(ja_segment).x;
            ja_dy = ja_get_first_point(ja_segment).y - ja_get_last_point(ja_segment).y;
        }
        ja_log(ja_node + " / " + ja_segment + ": dx:" + ja_dx + ", dy:" + ja_dy, 2);
        var ja_angle = Math.atan2(ja_dy, ja_dx);
        return ((ja_angle * 180 / Math.PI)) % 360;
    }

    cleanup() {
        if (!this.scriptEnabled) {
            return;
        }
        let transactionCount = 0
        let tempTransactionCount = 0;
        if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
            return;
        }
        let userPreference = this.getUserPreference();
        // Restricted countries (e.g. Italy) hard-limit the bug button / Clean Up to an explicit set
        // of fixes, regardless of which checkboxes an editor has toggled on.
        const allowedFixes = (this.cfg && this.cfg.bugButtonAllowedFixes) ? this.cfg.bugButtonAllowedFixes : null;
        if (allowedFixes) {
            userPreference = {...userPreference};
            ["requireRename", "fixGeometry", "fixDefaultSpeed", "fixLocks", "fixUnUsedSpeed", "fixStreetSpeed"]
                .forEach((key) => {
                    if (!allowedFixes.includes(key)) userPreference[key] = false;
                });
        }
        // Bug button enables U-turns for Street / Primary Street segments only, and only for platinum
        // members. Respect restricted-country bug-button allow-lists (e.g. Italy) like the other fixers.
        const isPlatinumMember = Array.isArray(this.WMEITK_PLATINUM_MEMBERS)
            && this.hasFeature("enable-uturns");
        const doEnableUTurns = this.ENABLE_UTURN_FEATURE && isPlatinumMember && (!allowedFixes || allowedFixes.includes("enableUTurns"));
        let segmentData = this.wmeSDK.DataModel.Segments.getAll();
        for (let i = 0; i < segmentData.length; i++) {
            let segment = segmentData[i];
            if (segment.lockRank <= this.userInfo.rank) {
                // Always ensure new/empty segments get at least country + state filled.
                tempTransactionCount = this.setupNewSegmentAddress(segment);
                transactionCount += tempTransactionCount;
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                if (userPreference.requireRename) {
                    tempTransactionCount = this.fixRoadName(segment);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                if (userPreference.fixGeometry) {
                    tempTransactionCount = this.fixSegmentDistortion(segment);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                if (userPreference.fixDefaultSpeed) {
                    tempTransactionCount = this.fixMissingDefaults(segment);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                if (userPreference.fixLocks) {
                    tempTransactionCount = this.fixMisMatchLocks(segment);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                if (userPreference.fixUnUsedSpeed) {
                    tempTransactionCount = this.fixUnUsedSpeed(segment);
                    transactionCount += tempTransactionCount;
                }
                if (userPreference.fixStreetSpeed) {
                    tempTransactionCount = this.fixStreetSpeeds(segment);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                // Speed Mode (India only): cap speeds to the city/mountain limit.
                if (this.country === "IN" && userPreference.speedMode && userPreference.speedMode !== "normal") {
                    tempTransactionCount = this.fixSpeedMode(segment, userPreference.speedMode);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
                if (doEnableUTurns &&
                    (segment.roadType === this.ROAD_TYPE_STREET || segment.roadType === this.ROAD_TYPE_PRIMARY_STREET)) {
                    tempTransactionCount = this.enableUTurnsForSegment(segment.id);
                    transactionCount += tempTransactionCount;
                }
                if (this.checkEditLimits(transactionCount, tempTransactionCount)) {
                    break;
                }
            }
        }
        this.scanMap();

    }

    checkEditLimits(transactionCount, currentEditCount) {
        let fixCount = 0;
        if (transactionCount >= this.MAX_EDITS_PER_TRANSACTION) return true;
        if (currentEditCount > 0) {
            fixCount = this.addToEditCount(this.userInfo.userName, currentEditCount);
        } else {
            fixCount = this.loadEditCount(this.userInfo.userName);
        }
        if (this.hasFeature("unlimited-edits")) {
            return false;
        }
        return fixCount >= this.MAX_EDITS_PER_DAY;

    }

    fixRoadName(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let renamed = false;
        let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: segment.id});
        const isUnderpassStreet = this.isUnderpassStreetName(segmentAddress?.street?.name);
        this.ROAD_RENAMES.forEach((rename) => {
            if (segmentAddress.isEmpty === false) {
                if (segmentAddress.street.name !== null) {
                    let currentName = this.getRenamedRoadName(segmentAddress.street.name, rename);
                    if (currentName !== null) {
                        let newStreet = this.wmeSDK.DataModel.Streets.getStreet({
                            cityId: segmentAddress.street.cityId, streetName: currentName
                        });
                        if (newStreet === null) {
                            newStreet = this.wmeSDK.DataModel.Streets.addStreet({
                                cityId: segmentAddress.street.cityId, streetName: currentName
                            });
                        }
                        this.wmeSDK.DataModel.Segments.updateAddress({
                            segmentId: segment.id, addressData: { primaryStreetId: newStreet.id }
                        });
                        renamed = true;
                    }
                }
                let newAltStreets = [];
                segmentAddress.altStreets.forEach((street) => {
                    if (street.street.name !== null) {
                        let currentName = this.getRenamedRoadName(street.street.name, rename);
                        if (currentName !== null) {
                            let newStreet = this.wmeSDK.DataModel.Streets.getStreet({
                                cityId: street.street.cityId, streetName: currentName
                            });
                            if (newStreet === null) {
                                newStreet = this.wmeSDK.DataModel.Streets.addStreet({
                                    cityId: street.street.cityId, streetName: currentName
                                });
                            }
                            newAltStreets.push(newStreet.id);
                        }
                    }
                });
                if (newAltStreets.length > 0) {
                    this.wmeSDK.DataModel.Segments.updateAddress({
                        segmentId: segment.id, addressData: { alternateStreetIds: newAltStreets }
                    });
                    renamed = true;
                }
            }
        });

        if (segment.roadType === this.ROAD_TYPE_STREET && isUnderpassStreet) {
            const underpassAttributes = {};
            if (segment.lockRank !== 2) {
                underpassAttributes.lockRank = 2;
            }
            if (segment.fwdSpeedLimit === null && segment.isAtoB) {
                underpassAttributes.fwdMaxSpeed = 30;
            }
            if (segment.revSpeedLimit === null && segment.isBtoA) {
                underpassAttributes.revMaxSpeed = 30;
            }
            if (!$.isEmptyObject(underpassAttributes)) {
                this.updateSegmentAttributes(segment.id, underpassAttributes);
                renamed = true;
            }
        }

        if (segmentAddress != null) {
            if (segmentAddress.isEmpty === false) {
                if (segmentAddress.street.name !== null) {
                    if (segmentAddress.street.isEmpty === false && $.trim(segmentAddress.street.name) === "") {
                        let currentName = "";
                        let newStreet = this.wmeSDK.DataModel.Streets.getStreet({
                            cityId: segmentAddress.street.cityId, streetName: currentName
                        });
                        if (newStreet === null) {
                            newStreet = this.wmeSDK.DataModel.Streets.addStreet({
                                cityId: segmentAddress.street.cityId, streetName: currentName
                            });
                        }
                        this.wmeSDK.DataModel.Segments.updateAddress({
                            segmentId: segment.id, addressData: { primaryStreetId: newStreet.id }
                        });
                        renamed = true;
                    } else if ($.trim(segmentAddress.street.name.toLowerCase()) === "none") {
                        let currentName = "";
                        let newStreet = this.wmeSDK.DataModel.Streets.getStreet({
                            cityId: segmentAddress.street.cityId, streetName: currentName
                        });
                        if (newStreet === null) {
                            newStreet = this.wmeSDK.DataModel.Streets.addStreet({
                                cityId: segmentAddress.street.cityId, streetName: currentName
                            });
                        }
                        this.wmeSDK.DataModel.Segments.updateAddress({
                            segmentId: segment.id, addressData: { primaryStreetId: newStreet.id }
                        });
                        renamed = true;
                    }
                }
            }
        }

        if (segmentAddress.isEmpty === true) {
            this.setupNewSegmentAddress(segment);
            renamed = true;
        }
        if (renamed) {
            return 1;
        } else {
            return 0;
        }
    }

    fixSegmentDistortion(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let removeNodes = [];
        let geometry = segment.geometry;
        if (!geometry || !geometry.coordinates) {
            return 0;
        }
        let coodinates = geometry.coordinates;
        if (coodinates.length > 2) {
            let length = this.findLength(coodinates[0], coodinates[1]);
            if (length < this.GEOMETRY_DISTORTION_TOLERANCE) {
                removeNodes.push({"latlon": coodinates[1], "pos": 1});
            }
            if (coodinates.length < 4) {
                length = this.findLength(coodinates[coodinates.length - 2], coodinates[coodinates.length - 1]);
                if (length < this.GEOMETRY_DISTORTION_TOLERANCE) {
                    removeNodes.push({"latlon": coodinates[1], "pos": coodinates.length - 2});
                }
            }
            if (coodinates.length > 3) {
                length = this.findLength(coodinates[coodinates.length - 2], coodinates[coodinates.length - 1]);
                if (length < this.GEOMETRY_DISTORTION_TOLERANCE) {
                    removeNodes.push({"latlon": coodinates[1], "pos": coodinates.length - 2});
                }
            }
            if (removeNodes.length) {
                let newGeometry = {...geometry}
                let coordinates = []
                for (let i = 0; i < newGeometry.coordinates.length; i++) {
                    let removeLatLonFlag = false;
                    removeNodes.forEach(function (removeLatLon) {
                        if (removeLatLon.pos === i) {
                            removeLatLonFlag = true;
                        }
                    });
                    if (!removeLatLonFlag) {
                        coordinates.push(newGeometry.coordinates[i])
                    }
                }
                newGeometry.coordinates = coordinates
                this.wmeSDK.DataModel.Segments.updateSegment({
                    segmentId: segment.id,
                    geometry: newGeometry
                });
                return 1;
            }
        }
        return 0;
    }

    updateSegmentAttributes(segmentId, attributes) {
        const segment = this.wmeSDK.DataModel.Segments.getById({segmentId});
        if (!segment) {
            return false;
        }

        const updateArgs = {segmentId};
        // When the active country disallows speed changes (e.g. Italy), block numeric speed writes
        // but still allow clearing (null) so the unused-speed fixer keeps working.
        const speedWriteAllowed = (value) => this.applyDefaultSpeeds || value === null;
        if (attributes.lockRank !== undefined && attributes.lockRank !== segment.lockRank) updateArgs.lockRank = attributes.lockRank;
        if (attributes.fwdMaxSpeed !== undefined && attributes.fwdMaxSpeed !== segment.fwdSpeedLimit && speedWriteAllowed(attributes.fwdMaxSpeed)) updateArgs.fwdSpeedLimit = attributes.fwdMaxSpeed;
        if (attributes.revMaxSpeed !== undefined && attributes.revMaxSpeed !== segment.revSpeedLimit && speedWriteAllowed(attributes.revMaxSpeed)) updateArgs.revSpeedLimit = attributes.revMaxSpeed;
        if (attributes.fwdDirection !== undefined || attributes.revDirection !== undefined) {
            const fwdDirection = attributes.fwdDirection !== false;
            const revDirection = attributes.revDirection === true;
            let desiredDirection = null;
            if (fwdDirection && revDirection) {
                desiredDirection = "TWO_WAY";
            } else if (fwdDirection) {
                desiredDirection = "A_TO_B";
            } else if (revDirection) {
                desiredDirection = "B_TO_A";
            }
            if (desiredDirection !== null) {
                const currentDirection = segment.isTwoWay ? "TWO_WAY" : (segment.isAtoB ? "A_TO_B" : (segment.isBtoA ? "B_TO_A" : null));
                if (desiredDirection !== currentDirection) {
                    updateArgs.direction = desiredDirection;
                }
            }
        }
        if (Object.keys(updateArgs).length === 1) {
            return false;
        }
        this.wmeSDK.DataModel.Segments.updateSegment(updateArgs);
        return true;
    }

    fixMissingDefaults(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let userPreference = this.getUserPreference();
        if (segment.lockRank <= this.userInfo.rank) {
            let segmentLock = this.userInfo.rank;
            let attributes = {};
            if (segment.junctionId === null) {
                switch (segment.roadType) {
                    case this.ROAD_TYPE_PRIMARY_STREET:
                        if (segment.isTwoWay) {
                            if (segment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_PS_MAX_SPEED;
                            if (segment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_PS_MAX_SPEED;
                        } else {
                            if (segment.fwdSpeedLimit === null && segment.isAtoB) attributes.fwdMaxSpeed = this.DEFAULT_PS_MAX_SPEED;
                            if (segment.revSpeedLimit === null && segment.isBtoA) attributes.revMaxSpeed = this.DEFAULT_PS_MAX_SPEED;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_MINOR_HIGHWAY:
                        if (segment.isTwoWay) {
                            if (segment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED;
                            if (segment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED;
                        } else {
                            if (segment.fwdSpeedLimit === null && segment.isAtoB) attributes.fwdMaxSpeed = this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED;
                            if (segment.revSpeedLimit === null && segment.isBtoA) attributes.revMaxSpeed = this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case  this.ROAD_TYPE_MAJOR_HIGHWAY:
                        if (segment.isTwoWay) {
                            if (segment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED;
                            if (segment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED;
                        } else {
                            if (segment.fwdSpeedLimit === null && segment.isAtoB) attributes.fwdMaxSpeed = this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED;
                            if (segment.revSpeedLimit === null && segment.isBtoA) attributes.revMaxSpeed = this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_FREE_WAY:
                        if (segment.isTwoWay) {
                            if (segment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_FREE_WAY_MAX_SPEED;
                            if (segment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_FREE_WAY_MAX_SPEED;
                        } else {
                            if (segment.fwdSpeedLimit === null && segment.isAtoB) attributes.fwdMaxSpeed = this.DEFAULT_FREE_WAY_MAX_SPEED;
                            if (segment.revSpeedLimit === null && segment.isBtoA) attributes.revMaxSpeed = this.DEFAULT_FREE_WAY_MAX_SPEED;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_RAMPS:
                        if (segment.isTwoWay) {
                            if (segment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_RAMP_MAX_SPEED;
                            if (segment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_RAMP_MAX_SPEED;
                        } else {
                            if (segment.fwdSpeedLimit === null && segment.isAtoB) attributes.fwdMaxSpeed = this.DEFAULT_RAMP_MAX_SPEED;
                            if (segment.revSpeedLimit === null && segment.isBtoA) attributes.revMaxSpeed = this.DEFAULT_RAMP_MAX_SPEED;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_RAILWAY:
                        if (userPreference.fixLocks)
                            if (this.userInfo.rank < this.DEFAULT_RAILWAY_LOCK_LEVEL) {
                                attributes.lockRank = this.userInfo.rank;
                            } else if (segment.lockRank < this.DEFAULT_RAILWAY_LOCK_LEVEL) {
                                attributes.lockRank = this.DEFAULT_RAILWAY_LOCK_LEVEL;
                            }
                        let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: segment.id});
                        if (segmentAddress.street.name == null) segmentAddress.street.name = "";
                        if (segmentAddress.street.name.trim() === "") {
                            if (segmentAddress.street.name.toLowerCase().trim() !== this.DEFAULT_RAILWAY_STREET_NAME.toLowerCase().trim()) {
                                let newStreet = this.wmeSDK.DataModel.Streets.getStreet({
                                    cityId: segmentAddress.street.cityId,
                                    streetName: this.DEFAULT_RAILWAY_STREET_NAME
                                });
                                if (newStreet === null) {
                                    newStreet = this.wmeSDK.DataModel.Streets.addStreet({
                                        cityId: segmentAddress.street.cityId,
                                        streetName: this.DEFAULT_RAILWAY_STREET_NAME
                                    });
                                }
                                this.wmeSDK.DataModel.Segments.updateAddress({
                                    segmentId: segment.id, addressData: { primaryStreetId: newStreet.id }
                                });
                                if (!$.isEmptyObject(attributes)) {
                                    this.updateSegmentAttributes(segment.id, attributes);
                                    return 1;
                                } else {
                                    return 0;
                                }

                            } else {
                                if (!$.isEmptyObject(attributes)) {
                                    this.updateSegmentAttributes(segment.id, attributes);
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        } else {
                            if (!$.isEmptyObject(attributes)) {
                                this.updateSegmentAttributes(segment.id, attributes);
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                        break;

                    default:
                        return 0;
                }
            } else {

                if (segment.isAtoB && segment.fwdSpeedLimit !== this.DEFAULT_RA_MAX_SPEED) attributes.fwdMaxSpeed = this.DEFAULT_RA_MAX_SPEED;
                if (segment.isBtoA && segment.revSpeedLimit !== this.DEFAULT_RA_MAX_SPEED) attributes.revMaxSpeed = this.DEFAULT_RA_MAX_SPEED;
                switch (segment.roadType) {
                    case this.ROAD_TYPE_PRIMARY_STREET:
                        if (this.userInfo.rank < this.DEFAULT_PS_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_PS_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_PS_LOCK_LEVEL;
                        }
                        break;
                    case
                    this.ROAD_TYPE_MINOR_HIGHWAY:
                        if (this.userInfo.rank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_MAJOR_HIGHWAY:
                        if (this.userInfo.rank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_FREE_WAY:
                        if (this.userInfo.rank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_FREE_WAY_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_RAMPS:
                        if (this.userInfo.rank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_RAMP_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_RAILWAY:
                        if (this.userInfo.rank < this.DEFAULT_RAILWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_RAILWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_RAILWAY_LOCK_LEVEL;
                        }
                        break;

                    default:
                        break;
                }
                if (!$.isEmptyObject(attributes)) {
                    this.updateSegmentAttributes(segment.id, attributes);
                    return 1;
                }
                return 0;
            }
        } else {
            return 0;
        }
    }

    fixUnUsedSpeed(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (segment.lockRank <= this.userInfo.rank) {
            let attributes = {};
            if (segment.isAtoB === true && segment.revSpeedLimit !== null) {
                attributes.revMaxSpeed = null;
            }
            if (segment.isBtoA === true && segment.fwdSpeedLimit !== null) {
                attributes.fwdMaxSpeed = null;
            }
            if (!$.isEmptyObject(attributes)) {
                this.updateSegmentAttributes(segment.id, attributes);
                return 1;
            }
        }
        return 0;
    }

    /**
     * Set the U-turn(s) for a single segment (the turn from the segment back onto itself at each of
     * its end nodes) to allowed/disallowed.
     *
     * Uses the legacy WME turn graph + SetTurn action (required: `Waze/Model/Graph/Actions/SetTurn`).
     * This is the only way to set a U-turn that has never been set ("unknown" turn) — the SDK's
     * updateTurn only works on turns already materialized in the data model and throws
     * DataModelNotFoundError otherwise. withState(1) = allowed, withState(0) = disallowed.
     *
     * @param {string|number} segmentId - the segment whose U-turns to change
     * @param {boolean} allow - true to allow U-turns, false to disallow
     * @returns {number} count of U-turns changed (0 if none/already in the desired state/unavailable)
     */
    setSegmentUTurns(segmentId, allow) {
        const sdkSegment = this.wmeSDK.DataModel.Segments.getById({ segmentId });
        if (!sdkSegment) {
            return 0;
        }
        if (!this.checkSegmentEditability(sdkSegment)) {
            return 0;
        }
        if (typeof W === "undefined" || !W.model || !this.WMEITK || !this.WMEITK.SetTurn) {
            this.log("setSegmentUTurns: legacy turn API (W.model / SetTurn) unavailable");
            return 0;
        }

        const SetTurn = this.WMEITK.SetTurn;
        const TurnData = this.WMEITK.TurnData;
        const MultiAction = this.WMEITK.MultiAction;
        const turnGraph = W.model.getTurnGraph();
        const segment = W.model.segments.getObjectById(segmentId);
        if (!segment) {
            return 0;
        }

        const desiredState = allow ? 1 : 0;
        // Legacy segment.getFromNode()/getToNode() return null in current WME; resolve the legacy
        // node objects from the SDK segment's node ids instead.
        const nodeIds = [sdkSegment.fromNodeId, sdkSegment.toNodeId].filter(id => id != null);
        const actions = [];

        nodeIds.forEach((nodeId) => {
            try {
                const node = W.model.nodes.getObjectById(nodeId);
                if (!node) {
                    return;
                }
                const turn = turnGraph.getTurnThroughNode(node, segment, segment);
                if (!turn) {
                    return;
                }
                // Build turn data from existing (may be null for "unknown" turns).
                // withState(1)=allowed, withState(0)=disallowed.
                const td = (turn.getTurnData() || TurnData.create()).withState(desiredState);
                actions.push(new SetTurn(turnGraph, turn.withTurnData(td)));
            } catch (e) {
                this.log(`setSegmentUTurns: failed for segment ${segmentId} at node ${nodeId}: ${e}`);
            }
        });

        if (actions.length === 0) {
            return 0;
        }
        // Batch both end-node turns into a single MultiAction so each segment's U-turn change is one
        // undo step. Fall back to individual actions if MultiAction is unavailable.
        if (actions.length > 1 && MultiAction) {
            const multiAction = new MultiAction(actions);
            multiAction._description = `${allow ? "Enable" : "Disable"} U-turns for segment ${segmentId}`;
            W.model.actionManager.add(multiAction);
        } else {
            actions.forEach(action => W.model.actionManager.add(action));
        }

        return actions.length;
    }

    /**
     * Enable the U-turn(s) for a single segment (both end nodes). See setSegmentUTurns.
     * @returns {number} count of U-turns newly enabled
     */
    enableUTurnsForSegment(segmentId) {
        return this.setSegmentUTurns(segmentId, true);
    }

    /**
     * Disable the U-turn(s) for a single segment (both end nodes). See setSegmentUTurns.
     * @returns {number} count of U-turns newly disabled
     */
    disableUTurnsForSegment(segmentId) {
        return this.setSegmentUTurns(segmentId, false);
    }

    fixMisMatchLocks(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        if (segment.lockRank <= this.userInfo.rank) {
            let segmentLock = this.userInfo.rank;
            let attributes = {};
            if (segment.junctionId === null) {
                switch (segment.roadType) {
                    case this.ROAD_TYPE_PRIMARY_STREET:
                        if (this.userInfo.rank < this.DEFAULT_PS_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_PS_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_PS_LOCK_LEVEL;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_MINOR_HIGHWAY:
                        if (this.userInfo.rank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case  this.ROAD_TYPE_MAJOR_HIGHWAY:
                        if (this.userInfo.rank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_FREE_WAY:
                        if (this.userInfo.rank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_FREE_WAY_LOCK_LEVEL;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_RAMPS:
                        if (this.userInfo.rank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_RAMP_LOCK_LEVEL;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    case this.ROAD_TYPE_STREET:
                        // Plain Street locking only applies where the country config opts in (e.g. Italy).
                        if (this.DEFAULT_STREET_LOCK_LEVEL == null) {
                            return 0;
                        }
                        if (this.userInfo.rank < this.DEFAULT_STREET_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_STREET_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_STREET_LOCK_LEVEL;
                        }
                        if (!$.isEmptyObject(attributes)) {
                            this.updateSegmentAttributes(segment.id, attributes);
                            return 1;
                        } else {
                            return 0;
                        }
                        break;
                    default:
                        return 0;
                }
            } else {

                if (this.applyDefaultSpeeds) {
                    if (segment.isAtoB && segment.fwdSpeedLimit !== this.DEFAULT_RA_MAX_SPEED) attributes.fwdMaxSpeed = this.DEFAULT_RA_MAX_SPEED;
                    if (segment.isBtoA && segment.revSpeedLimit !== this.DEFAULT_RA_MAX_SPEED) attributes.revMaxSpeed = this.DEFAULT_RA_MAX_SPEED;
                }
                switch (segment.roadType) {
                    case this.ROAD_TYPE_PRIMARY_STREET:
                        if (this.userInfo.rank < this.DEFAULT_PS_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_PS_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_PS_LOCK_LEVEL;
                        }
                        break;
                    case
                    this.ROAD_TYPE_MINOR_HIGHWAY:
                        if (this.userInfo.rank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_MAJOR_HIGHWAY:
                        if (this.userInfo.rank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_FREE_WAY:
                        if (this.userInfo.rank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_FREE_WAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_FREE_WAY_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_RAMPS:
                        if (this.userInfo.rank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_RAMP_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_RAMP_LOCK_LEVEL;
                        }
                        break;
                    case this.ROAD_TYPE_RAILWAY:
                        if (this.userInfo.rank < this.DEFAULT_RAILWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.userInfo.rank;
                        } else if (segment.lockRank < this.DEFAULT_RAILWAY_LOCK_LEVEL) {
                            attributes.lockRank = this.DEFAULT_RAILWAY_LOCK_LEVEL;
                        }
                        break;

                    default:
                        break;
                }
                if (!$.isEmptyObject(attributes)) {
                    this.updateSegmentAttributes(segment.id, attributes);
                    return 1;
                }
                return 0;
            }
        } else {
            return 0;
        }
    }

    fixLocks() {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let freewayLock = (parseInt($("#wmeitk-lock-level-expwy").val())) ? $("#wmeitk-lock-level-expwy").val() : -1;
        freewayLock = (freewayLock > 6) ? 6 : freewayLock;
        let majorHighwayLock = (parseInt($("#wmeitk-lock-level-majhwy").val())) ? $("#wmeitk-lock-level-majhwy").val() : -1;
        majorHighwayLock = (majorHighwayLock > 6) ? 6 : majorHighwayLock;
        let minorHighwayLock = (parseInt($("#wmeitk-lock-level-minwy").val())) ? $("#wmeitk-lock-level-minwy").val() : -1;
        minorHighwayLock = (minorHighwayLock > 6) ? 6 : minorHighwayLock;
        let psLock = (parseInt($("#wmeitk-lock-level-ps").val())) ? $("#wmeitk-lock-level-ps").val() : -1;
        psLock = (psLock > 6) ? 6 : psLock;
        let lockFreeway = !($("#wmeitk-chk-expwy-lock").attr("checked") === undefined)
        let lockMajorHighway = !($("#wmeitk-chk-majhwy-lock").attr("checked") === undefined)
        let lockMinorHighway = !($("#wmeitk-chk-minwy-lock").attr("checked") === undefined)
        let lockPS = !($("#wmeitk-chk-ps-lock").attr("checked") === undefined)

        let segments = this.wmeSDK.DataModel.Segments.getAll();
        for (let i = 0; i < segments.length; i++) {
            let segment = segments[i];
            let attributes = {};
            switch (segment.roadType) {
                case this.ROAD_TYPE_PRIMARY_STREET:
                    if (lockPS && psLock >= 0) {
                        attributes.lockRank = psLock - 1;
                    }
                    break;
                case this.ROAD_TYPE_MINOR_HIGHWAY:
                    if (lockMinorHighway && minorHighwayLock >= 0) {
                        attributes.lockRank = minorHighwayLock - 1;
                    }
                    break;
                case this.ROAD_TYPE_MAJOR_HIGHWAY:
                    if (lockMajorHighway && majorHighwayLock >= 0) {
                        attributes.lockRank = majorHighwayLock - 1;
                    }
                    break;
                case this.ROAD_TYPE_FREE_WAY:
                    if (lockFreeway && freewayLock >= 0) {
                        attributes.lockRank = freewayLock - 1;
                    }
                    break;
            }
            if (!$.isEmptyObject(attributes)) {
                this.updateSegmentAttributes(segment.id, attributes);
            }
        }

    }

    fixStreetSpeeds(segment) {
        if (!this.checkSegmentEditability(segment)) {
            return 0;
        }
        let segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId: segment.id})
        if (!segmentAddress.isEmpty) {
            if (segmentAddress.street.name !== null)
                if (segmentAddress.street.name.toLowerCase() === "underpass") {
                    return 0;
                }
        }
        if (segment.lockRank <= this.userInfo.rank) {
            if (segment.roadType === this.ROAD_TYPE_STREET) {
                let attributes = {};
                if (segment.isTwoWay && (segment.fwdSpeedLimit !== null || segment.revSpeedLimit !== null)) {
                    attributes.revMaxSpeed = null;
                    attributes.fwdMaxSpeed = null;
                }
                if (!$.isEmptyObject(attributes)) {
                    this.updateSegmentAttributes(segment.id, attributes);
                    return 1;
                }
            }
        }
        return 0;
    }

    onAction(event) {
        if (!this.scriptEnabled) {
            return;
        }
        const action = event && event.action ? event.action : null;
        if (!action) {
            return;
        }

        if (action.object && action.object.type !== "segment" && action.segment == null) {
            return;
        }

        switch (action.actionName) {
            case "ADD_SEGMENT":
                if (action.segment) {
                    this.setupNewSegmentAddress(action.segment);
                }
                break;
            case "UPDATE_OBJECT":
                if (action.newAttributes !== undefined) {
                    if (action.newAttributes.hasOwnProperty("roadType")) {
                        this.setupRoadDefaults(action.object, action.newAttributes.roadType);
                    } else if (action.object) {
                        const sdkSegment = this.wmeSDK.DataModel.Segments.getById({segmentId: action.object.attributes.id});
                        if (sdkSegment) {
                            this.fixUnUsedSpeed(sdkSegment);
                        }
                    }
                }
                break;
            case "MULTI_UPDATE_OBJECT":
                if (Array.isArray(action.subActions)) {
                    this.setupMultipleRoadDefaults(action.subActions);
                }
                break;
        }
    }

    setupNewSegmentAddress(segment) {
        if (!this.scriptEnabled) {
            return 0;
        }
        const segmentId = segment?.id ?? segment?.attributes?.id;
        const roadType = segment?.roadType ?? segment?.attributes?.roadType;
        if (segmentId == null) {
            return 0;
        }
        if (!this.userInfo) {
            this.userInfo = this.wmeSDK.State.getUserInfo();
        }
        if (!this.userInfo || this.userInfo.rank < this.WMEITK_MEMBER_LEVEL_MEMBER) {
            return 0;
        }

        const segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId});
        if (!segmentAddress || roadType === this.ROAD_TYPE_RAILWAY) {
            return 0;
        }
        // Only fill when the segment is still missing country or state. (WME gives new segments an
        // empty street OBJECT, not null, so the old `street !== null` guard never matched and nothing
        // was ever filled.) Properly-addressed segments already have both and are left alone.
        if (segmentAddress.country != null && segmentAddress.state != null) {
            return 0;
        }
        // Never blank an existing primary street. Drawing a new segment onto an existing one makes WME
        // SPLIT the existing segment; the freshly-created half is a "new" (negative-id) segment that
        // INHERITS the original address. If that inherited address has a street but no state, the
        // country/state guard above doesn't catch it, and writing `streetName: ""` below would reset
        // the existing road's name to "None". So bail out whenever a real street name is already there.
        if (segmentAddress.street != null && segmentAddress.street.isEmpty === false
            && segmentAddress.street.name) {
            return 0;
        }
        // Don't touch a segment that already resolves to a different country.
        if (segmentAddress.country != null && segmentAddress.country.abbr !== this.country) {
            return 0;
        }

        const topCountry = this.wmeSDK.DataModel.Countries.getTopCountry();
        if (!topCountry || topCountry.id == null) {
            this.log(`setupNewSegmentAddress: no top country for segment ${segmentId}`);
            return 0;
        }

        // Resolve country/state/city from the segment's LOCATION (see resolveLocationAddress) so a
        // segment drawn right after panning to a new region is addressed to the region it is actually
        // IN, not the stale "top" (dominant-loaded) region that lags the map after a move.
        const loc = this.resolveLocationAddress(segmentId, segmentAddress);

        // Fill the whole address in one call with raw components (SDK v2.359+ addressData). WME creates
        // the (empty) street and resolves/creates the city as needed. City is left empty when the
        // segment is not near any named city, so at least the country and state get filled.
        const addressData = {
            countryId: topCountry.id,
            cityName: loc.cityName,
            streetName: ""
        };
        if (loc.stateId != null) {
            addressData.stateId = loc.stateId;
        }

        try {
            this.wmeSDK.DataModel.Segments.updateAddress({segmentId, addressData});
        } catch (e) {
            this.log(`setupNewSegmentAddress: updateAddress failed for segment ${segmentId}: ${e}`);
            return 0;
        }
        this.addedSegmentIds.push(segmentId);
        return 1;
    }

    /**
     * Resolve { countryId, stateId, cityName } for a new segment from its GEOGRAPHIC LOCATION, so a
     * segment drawn just after panning to a new region is addressed to the region it is actually IN.
     *
     * Why not getTopState()/getTopCity(): those return the DOMINANT entity across all loaded data,
     * which right after a pan still reflects the previous region (its tiles are still loaded) — the
     * root cause of "new segment gets the old region's address".
     *
     * SDK data shapes this relies on (verified live): State.geometry is a (Multi)Polygon, so the
     * containing state is found by point-in-polygon; City.geometry is a Point, so the city is the
     * NEAREST named city marker belonging to the resolved state. Facades expose id/name/stateId/
     * countryId as plain properties. Falls back to the segment's own address, then getTopState(), so
     * behaviour is never worse than before when geometry is unavailable.
     */
    resolveLocationAddress(segmentId, segmentAddress) {
        const result = {countryId: null, stateId: null, cityName: ""};
        const topCountry = this.wmeSDK.DataModel.Countries.getTopCountry();
        result.countryId = topCountry ? topCountry.id : null;

        // Representative point: the middle vertex of the segment geometry.
        const point = this.segmentMidpoint(segmentId);

        // State: prefer the segment's own, else the state polygon that CONTAINS the point.
        const segStateId = segmentAddress && segmentAddress.state && segmentAddress.state.id != null
            ? segmentAddress.state.id : null;
        let polyStateId = null;
        if (point && segStateId == null) {
            const states = (this.wmeSDK.DataModel.States.getAllWithoutDefault
                ? this.wmeSDK.DataModel.States.getAllWithoutDefault()
                : this.wmeSDK.DataModel.States.getAll()) || [];
            const hit = states.find((s) => s && this.isPointInGeometry(point, s.geometry));
            if (hit) polyStateId = hit.id;
        }
        const topState = this.wmeSDK.DataModel.States.getTopState();
        result.stateId = segStateId ?? polyStateId ?? (topState ? topState.id : null);

        // City: prefer the segment's own; else the nearest named city marker in the resolved state.
        const segCityName = segmentAddress && segmentAddress.city && typeof segmentAddress.city.name === "string"
            ? segmentAddress.city.name : null;
        if (segCityName) {
            result.cityName = segCityName;
        } else {
            const city = this.nearestCityAt(point, result.stateId);
            result.cityName = city ? city.name : "";
        }

        return result;
    }

    /** Middle vertex of a segment's geometry as [lon, lat], or null. */
    segmentMidpoint(segmentId) {
        const seg = this.wmeSDK.DataModel.Segments.getById({segmentId});
        const coords = seg && seg.geometry && Array.isArray(seg.geometry.coordinates)
            ? seg.geometry.coordinates : null;
        return coords && coords.length ? coords[Math.floor(coords.length / 2)] : null;
    }

    /**
     * Nearest named city facade to `point`, restricted to `stateId` when provided. Cities are Point
     * geometries in the data model, so "nearest marker" is the best available city for a location.
     * @returns the city object (with .id / .name) or null.
     */
    nearestCityAt(point, stateId) {
        if (!point) return null;
        const cities = (this.wmeSDK.DataModel.Cities.getAll() || []).filter((c) =>
            c && c.isEmpty === false && c.name && c.id != null
            && (stateId == null || c.stateId === stateId));
        let best = null;
        let bestDistance = Infinity;
        cities.forEach((c) => {
            const g = c.geometry;
            const cp = g && g.type === "Point" && Array.isArray(g.coordinates) ? g.coordinates : null;
            if (!cp) return;
            const dx = cp[0] - point[0];
            const dy = cp[1] - point[1];
            const d = (dx * dx) + (dy * dy);
            if (d < bestDistance) {
                bestDistance = d;
                best = c;
            }
        });
        return best;
    }

    /**
     * Ray-casting point-in-polygon. point=[lon,lat]; geom=GeoJSON Polygon|MultiPolygon.
     * Self-contained (no turf dependency) and handles holes.
     */
    isPointInGeometry(point, geom) {
        if (!point || !geom) return false;
        const polygons = geom.type === "MultiPolygon" ? geom.coordinates
            : geom.type === "Polygon" ? [geom.coordinates] : [];
        const inRing = (pt, ring) => {
            let inside = false;
            for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                const xi = ring[i][0];
                const yi = ring[i][1];
                const xj = ring[j][0];
                const yj = ring[j][1];
                if (((yi > pt[1]) !== (yj > pt[1]))
                    && (pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi)) {
                    inside = !inside;
                }
            }
            return inside;
        };
        for (const poly of polygons) {
            if (!poly.length || !inRing(point, poly[0])) {
                continue;
            }
            let inHole = false;
            for (let h = 1; h < poly.length; h++) {
                if (inRing(point, poly[h])) {
                    inHole = true;
                    break;
                }
            }
            if (!inHole) {
                return true;
            }
        }
        return false;
    }

    setupRoadDefaults(segment, roadType) {
        if (!this.scriptEnabled) {
            return;
        }
        const segmentId = segment.id ?? segment.attributes?.id;
        let sdkSegment = this.wmeSDK.DataModel.Segments.getById({segmentId});
        if (!sdkSegment) {
            return;
        }
        const segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId});
        const isUnderpassStreet = this.isUnderpassStreetName(segmentAddress?.street?.name);
        let attributes = {};
        if (sdkSegment.junctionId === null) {
            switch (roadType) {
                case this.ROAD_TYPE_PRIMARY_STREET:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_PS_LOCK_LEVEL) ? this.DEFAULT_PS_LOCK_LEVEL : this.userInfo.rank;
                    if (sdkSegment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_PS_MAX_SPEED;
                    if (sdkSegment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_PS_MAX_SPEED;
                    break;
                case this.ROAD_TYPE_MINOR_HIGHWAY:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) ? this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL : this.userInfo.rank;
                    if (sdkSegment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED;
                    if (sdkSegment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_MINOR_HIGHWAY_MAX_SPEED;
                    break
                case this.ROAD_TYPE_MAJOR_HIGHWAY:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) ? this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL : this.userInfo.rank;
                    if (sdkSegment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED;
                    if (sdkSegment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_MAJOR_HIGHWAY_MAX_SPEED;
                    break;
                case this.ROAD_TYPE_PARKING_LOT_ROAD:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_PARKING_LOT_ROAD_LOCK_LEVEL) ? this.DEFAULT_PARKING_LOT_ROAD_LOCK_LEVEL : this.userInfo.rank;
                    if (sdkSegment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_PARKING_LOT_ROAD_SPEED;
                    if (sdkSegment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_PARKING_LOT_ROAD_SPEED;
                    attributes.revDirection = false;
                    break;
                case this.ROAD_TYPE_FREE_WAY:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_FREE_WAY_LOCK_LEVEL) ? this.DEFAULT_FREE_WAY_LOCK_LEVEL : this.userInfo.rank;
                    if (sdkSegment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_FREE_WAY_MAX_SPEED;
                    if (sdkSegment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_FREE_WAY_MAX_SPEED;
                    break;
                case this.ROAD_TYPE_RAMPS:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_RAMP_LOCK_LEVEL) ? this.DEFAULT_RAMP_LOCK_LEVEL : this.userInfo.rank;
                    if (sdkSegment.fwdSpeedLimit === null) attributes.fwdMaxSpeed = this.DEFAULT_RAMP_MAX_SPEED;
                    if (sdkSegment.revSpeedLimit === null) attributes.revMaxSpeed = this.DEFAULT_RAMP_MAX_SPEED;
                    attributes.revDirection = false;
                    break;
                case this.ROAD_TYPE_RAILWAY:
                    attributes.lockRank = this.DEFAULT_RAILWAY_LOCK_LEVEL;
                    break;
                case this.ROAD_TYPE_STREET:
                    if (isUnderpassStreet) {
                        attributes.lockRank = 2;
                        if (sdkSegment.fwdSpeedLimit === null && sdkSegment.isAtoB) attributes.fwdMaxSpeed = 30;
                        if (sdkSegment.revSpeedLimit === null && sdkSegment.isBtoA) attributes.revMaxSpeed = 30;
                    }
                    break;
            }
        } else {
            if (sdkSegment.fwdSpeedLimit === null && sdkSegment.isAtoB) attributes.fwdMaxSpeed = this.DEFAULT_RA_MAX_SPEED;
            if (sdkSegment.revSpeedLimit === null && sdkSegment.isBtoA) attributes.revMaxSpeed = this.DEFAULT_RA_MAX_SPEED;
            switch (roadType) {
                case this.ROAD_TYPE_PRIMARY_STREET:
                case this.ROAD_TYPE_STREET:
                    if (roadType === this.ROAD_TYPE_STREET && isUnderpassStreet) {
                        attributes.lockRank = 2;
                    } else {
                        attributes.lockRank = (this.userInfo.rank > this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) ? this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL : this.userInfo.rank;
                    }
                    break;
                case this.ROAD_TYPE_MINOR_HIGHWAY:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL) ? this.DEFAULT_MINOR_HIGHWAY_LOCK_LEVEL : this.userInfo.rank;
                    break
                case this.ROAD_TYPE_MAJOR_HIGHWAY:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL) ? this.DEFAULT_MAJOR_HIGHWAY_LOCK_LEVEL : this.userInfo.rank;
                    break;
                case this.ROAD_TYPE_PARKING_LOT_ROAD:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_PARKING_LOT_ROAD_LOCK_LEVEL) ? this.DEFAULT_PARKING_LOT_ROAD_LOCK_LEVEL : this.userInfo.rank;
                    break;
                case this.ROAD_TYPE_FREE_WAY:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_FREE_WAY_LOCK_LEVEL) ? this.DEFAULT_FREE_WAY_LOCK_LEVEL : this.userInfo.rank;
                    break;
                case this.ROAD_TYPE_RAMPS:
                    attributes.lockRank = (this.userInfo.rank > this.DEFAULT_RAMP_LOCK_LEVEL) ? this.DEFAULT_RAMP_LOCK_LEVEL : this.userInfo.rank;
                    attributes.revDirection = false;
                    break;
            }
        }
        if (!$.isEmptyObject(attributes)) {
            this.updateSegmentAttributes(sdkSegment.id, attributes);
        }
        if (roadType === this.ROAD_TYPE_RAILWAY) {
            if (!this.userInfo) {
                this.userInfo = this.wmeSDK.State.getUserInfo();
            }
            if (!this.userInfo || this.userInfo.rank < this.WMEITK_MEMBER_LEVEL_MEMBER) {
                return;
            }
            const segmentAddress = this.wmeSDK.DataModel.Segments.getAddress({segmentId});
            // Resolve the city from the segment's LOCATION (nearest named city in the containing state),
            // not the stale dominant (top) city that lags the map after a region change.
            const ownCity = segmentAddress && segmentAddress.city && segmentAddress.city.id != null
                ? segmentAddress.city : null;
            const locStateId = this.resolveLocationAddress(segmentId, segmentAddress).stateId;
            const city = ownCity || this.nearestCityAt(this.segmentMidpoint(segmentId), locStateId);
            if (!city) {
                return;
            }
            let cityId = city.id;
            if ($.inArray(sdkSegment.id, this.addedSegmentIds) < 0) {
                let railwayStreet = this.wmeSDK.DataModel.Streets.getStreet({
                    cityId: cityId,
                    streetName: this.DEFAULT_RAILWAY_STREET_NAME
                });
                if (railwayStreet === null) {
                    railwayStreet = this.wmeSDK.DataModel.Streets.addStreet({
                        cityId: cityId,
                        streetName: this.DEFAULT_RAILWAY_STREET_NAME
                    });
                }
                this.wmeSDK.DataModel.Segments.updateAddress({
                    segmentId,
                    addressData: { primaryStreetId: railwayStreet.id }
                });
            }
        }
    }

    setupMultipleRoadDefaults(subActions) {
        $.each(subActions, (index, action) => {
            if (action.newAttributes.hasOwnProperty("roadType")) {
                this.setupRoadDefaults(action.object, action.newAttributes.roadType);
            }
        });
    }

    handleKeyDown(event) {
        if (!event.altKey) return; // Require Alt key to prevent unintended movement
        switch (event.key) {
            case "ArrowUp":
                this.moveSegment(0, MOVE_STEP);
                break;
            case "ArrowDown":
                this.moveSegment(0, -MOVE_STEP);
                break;
            case "ArrowLeft":
                this.moveSegment(-MOVE_STEP, 0);
                break;
            case "ArrowRight":
                this.moveSegment(MOVE_STEP, 0);
                break;
        }
    }

    handleVenueSelection(selectedId) {
        let selectedVenue = this.wmeSDK.DataModel.Venues.getById({venueId: selectedId});
        if (selectedVenue != null) {
            if (selectedVenue.categories.includes("GAS_STATION")) {
                if (this.DEBUG_WME_INDIA_TOOL_KIT) this.log("Gas Station Selected");
                this.selectedGasStation = selectedVenue;
                setTimeout(() => {
                    this.setupGasStationButtons();
                }, 500);
            }
            if (selectedVenue.categories.includes("SEA_LAKE_POOL")) {
                let attributes = {};
                if (selectedVenue.lockRank < this.DEFAULT_SEA_LAKE_POND_LOCK_LEVEL)
                    attributes.lockRank = this.DEFAULT_SEA_LAKE_POND_LOCK_LEVEL;
                if (!$.isEmptyObject(attributes)) {
                    this.wmeSDK.DataModel.Venues.updateVenue({
                        venueId: selectedVenue.id,
                        ...attributes
                    });
                }
            }
            if (selectedVenue.categories.includes("RIVER_STREAM")) {
                let attributes = {};
                if (selectedVenue.lockRank < this.DEFAULT_RIVER_STREAM_LOCK_LEVEL)
                    attributes.lockRank = this.DEFAULT_RIVER_STREAM_LOCK_LEVEL;
                if (!$.isEmptyObject(attributes)) {
                    this.wmeSDK.DataModel.Venues.updateVenue({
                        venueId: selectedVenue.id,
                        ...attributes
                    });
                }
            }

            if (selectedVenue.categories.includes("SCHOOL")) {
                let attributes = {};
                if (selectedVenue.lockRank < this.DEFAULT_SCHOOL_LOCK_LEVEL)
                    attributes.lockRank = this.DEFAULT_SCHOOL_LOCK_LEVEL;
                if (!$.isEmptyObject(attributes)) {
                    this.wmeSDK.DataModel.Venues.updateVenue({
                        venueId: selectedVenue.id,
                        ...attributes
                    });
                }
            }


            if (this.isJunctionInterchangeClicked) {
                let attributes = {};
                if (selectedVenue.lockRank < this.DEFAULT_JUNCTION_INTERCHANGE_LOCK_LEVEL)
                    attributes.lockRank = this.DEFAULT_JUNCTION_INTERCHANGE_LOCK_LEVEL;
                attributes.categories = ["JUNCTION_INTERCHANGE"];
                this.wmeSDK.DataModel.Venues.updateVenue({
                    venueId: selectedVenue.id,
                    ...attributes
                });
                this.isJunctionInterchangeClicked = false;
            }
        }
    }

    normalizeVenueLockLevel(value) {
        const parsed = parseInt(value, 10);
        if (Number.isNaN(parsed)) {
            return 3;
        }
        return Math.max(1, Math.min(6, parsed));
    }

    lockAllVenues() {
        const prefs = this.getUserPreference();
        const requestedLevel = this.normalizeVenueLockLevel($("#wmeitk-lock-level-venue").val() || prefs.venueLockLevel || 3);
        const userRank = this.userInfo && Number.isFinite(this.userInfo.rank) ? this.userInfo.rank : null;
        if (userRank === null) {
            $("#wmeitk-venue-lock-status").text(`Unable to determine your lock rank.`);
            return;
        }

        const requestedLockRank = requestedLevel - 1;
        const targetLevel = Math.min(requestedLockRank, userRank);
        if (targetLevel !== requestedLockRank) {
            $("#wmeitk-venue-lock-status").text(`Requested level ${requestedLevel} capped to lock rank ${targetLevel}.`);
        } else {
            $("#wmeitk-venue-lock-status").text(`Locking venues at level ${targetLevel}...`);
        }

        const venueApi = this.wmeSDK.DataModel.Venues;
        const venues = typeof venueApi.getAll === "function" ? venueApi.getAll() : [];
        const venueList = Array.isArray(venues) ? venues : Object.values(venues || {});
        let updated = 0;

        venueList.forEach((venue) => {
            if (!venue) {
                return;
            }
            if (Number.isFinite(venue.lockRank) && venue.lockRank >= targetLevel) {
                return;
            }
            try {
                venueApi.updateVenue({
                    venueId: venue.id,
                    lockRank: targetLevel
                });
                updated++;
            } catch (error) {
                this.log(error);
            }
        });

        this.log(`Locked ${updated} venues at lock level ${targetLevel}.`);
        $("#wmeitk-venue-lock-status").text(`Locked ${updated} venues at level ${targetLevel}.`);
    }

    highlightVenuesBelowSpecifiedLockLevel(userPreference) {
        const venueApi = this.wmeSDK.DataModel.Venues;
        const venues = typeof venueApi.getAll === "function" ? venueApi.getAll() : [];
        const venueList = Array.isArray(venues) ? venues : Object.values(venues || {});
        const requestedLevel = this.normalizeVenueLockLevel($("#wmeitk-lock-level-venue").val() || userPreference.venueLockLevel || 3);
        const targetLockRank = requestedLevel - 1;
        let highlightCount = 0;

        venueList.forEach((venue) => {
            if (!venue || !venue.geometry) {
                return;
            }
            const venueLockRank = Number.isFinite(venue.lockRank) ? venue.lockRank : -1;
            if (venueLockRank >= targetLockRank) {
                return;
            }
            if (this.olVenuePointHighlightLayer || this.olVenueAreaHighlightLayer) {
                this.addOlVenueHighlight(venue, `venueLockBelow-${venue.id}`);
            } else {
                this.addSdkVenueHighlight(venue, "venueLockBelowThreshold", `venueLockBelow-${venue.id}`);
            }
            highlightCount++;
        });

        return highlightCount;
    }

    refreshVenueLockHighlights(userPreference = this.getUserPreference()) {
        this.clearOlVenueHighlightLayer();
        if (!userPreference.highlightVenuesBelowLockLevel) {
            return 0;
        }
        return this.highlightVenuesBelowSpecifiedLockLevel(userPreference);
    }

    handleSegmentSelection() {
        let selectedData = this.wmeSDK.Editing.getSelection();
        if (selectedData != null) {
            $(".wmeit-seg-buton").remove();
            if (selectedData.objectType === "segment") {
                if (this.hasFeature("simplify-geometry")) {
                    setTimeout(() => {
                        if (selectedData.ids.length === 1) {
                            $(".address-edit").parent().after('<wz-button color="text" class="wmeit-seg-buton" size="md" disabled="false" id="wmeit-btn-fix-segment">Simplify Geometry</wz-button> ');
                            $("#wmeit-btn-fix-segment").on("click", () => {
                                let sdkSegment = this.wmeSDK.DataModel.Segments.getById({segmentId: selectedData.ids[0]});
                                //this.fixSegmentDistortion(sdkSegment)

                                this.simplifySelected();

                                // this.highlightUTurnRoadTypeMisMatch(sdkSegment);
                            });
                        }

                        $(".address-edit").parent().after('<wz-button color="text" class="wmeit-seg-buton" size="md" disabled="false" id="wmeit-btn-change-direction">Change Direction</wz-button> ');
                        $("#wmeit-btn-change-direction").on("click", () => {
                            this.changeDirection();
                        });

                    }, 250);
                }
            }
        }
    }

    removeRedundantVertices(coords, angleToleranceDeg = 2) {
        const rad = Math.PI / 180;
        const simplified = [coords[0]];
        for (let i = 1; i < coords.length - 1; i++) {
            const [x1, y1] = coords[i - 1];
            const [x2, y2] = coords[i];
            const [x3, y3] = coords[i + 1];
            const angle1 = Math.atan2(y2 - y1, x2 - x1);
            const angle2 = Math.atan2(y3 - y2, x3 - x2);
            const diff = Math.abs((angle2 - angle1) * 180 / Math.PI);
            if (diff > angleToleranceDeg) simplified.push(coords[i]);
        }
        simplified.push(coords[coords.length - 1]);
        return simplified;
    }

    simplify() {
        let segments = this.wmeSDK.DataModel.Segments.getAll();
        let simplifiedCount = 0;
        let segmentCount = segments.length;
        for (let i = 0; i < segmentCount; i++) {
            let segment = segments[i];
            if (this.checkSimplificationRequired(segment, this.simplifyTolerance * 100000)) {
                this.simpliFySegment(segment);
                simplifiedCount++;
                if (simplifiedCount > this.simplifyLoad) {
                    return;
                }
            }
        }
        this.scanMap();
    }

    checkSimplificationRequired(segment, toleranceMeters = 1) {
        if (!segment || !segment.geometry) return false;
        if (segment.junctionId !== null) {
            return false;
        }
        if (segment.hasClosures) return false;
        const coordinates = segment.geometry.coordinates;
        if (!Array.isArray(coordinates) || coordinates.length < 2) {
            return false;
        }
        if (!coordinates.every((c) => Array.isArray(c) && c.length >= 2 && Number.isFinite(c[0]) && Number.isFinite(c[1]))) {
            return false;
        }
        // Convert to Turf line
        const line = turf.lineString(coordinates);

        // Simplify with small tolerance
        const simplified = turf.simplify(line, {
            tolerance: this.simplifyTolerance, // ≈ 1 m
            highQuality: true
        });

        // Angle-based cleanup (optional)
        const cleanedCoords = this.removeRedundantVertices(
            simplified.geometry.coordinates,
            this.simplifyAngleTolerance
        );
        simplified.geometry.coordinates = cleanedCoords;

        // Compare vertex count
        const origCount = coordinates.length;
        const simpCount = simplified.geometry.coordinates.length;
        if (simpCount >= origCount) return false; // no reduction → skip

        // Measure maximum deviation
        let maxDist = 0;
        const simplifiedLine = turf.lineString(simplified.geometry.coordinates);
        for (const c of coordinates) {
            const d = turf.pointToLineDistance(turf.point(c), simplifiedLine, {
                units: "meters"
            });
            if (d > maxDist) maxDist = d;
            if (maxDist > toleranceMeters) break;
        }

        // Only simplify if shape deviation within tolerance and vertices reduced
        return maxDist <= toleranceMeters;
    }

    simplifySelected() {
        const selection = this.wmeSDK.Editing.getSelection()
        const segId = selection.ids[0];
        const segment = this.wmeSDK.DataModel.Segments.getById({segmentId: segId});
        this.simpliFySegment(segment);

    }

    simpliFySegment(segment) {
        if (!segment) {
            alert('Segment not found.');
            return;
        }
        const segId = segment.id;

        const geom = segment.geometry;
        if (!geom || !Array.isArray(geom.coordinates) || geom.coordinates.length < 2) {
            this.log(`simplify skipped for segment ${segId}: invalid geometry`);
            return;
        }
        if (!geom.coordinates.every((c) => Array.isArray(c) && c.length >= 2 && Number.isFinite(c[0]) && Number.isFinite(c[1]))) {
            this.log(`simplify skipped for segment ${segId}: malformed coordinates`);
            return;
        }

        // Convert to GeoJSON LineString
        const line = turf.lineString(geom.coordinates);
        const tol = this.simplifyTolerance;  // ≈1 m, tweak 5e-6 – 2e-5
        const simplified = turf.simplify(line, {
            tolerance: tol,
            highQuality: true
        });
        const coords = this.removeRedundantVertices(simplified.geometry.coordinates, this.simplifyAngleTolerance);
        simplified.geometry.coordinates = coords;
        const segmentGeometry = {
            type: simplified.geometry.type,
            coordinates: simplified.geometry.coordinates
        };
        this.wmeSDK.DataModel.Segments.updateSegment({segmentId: segId, geometry: segmentGeometry});
    }

    changeDirection() {
        const selection = this.wmeSDK.Editing.getSelection();
        if (!selection || selection.objectType !== "segment" || selection.ids.length === 0) {
            this.log("reverseSelectedSegments(): No segments selected.");
            return false;
        }

        // Avoid double-processing shared nodes by tracking reversed IDs
        const processed = new Set();

        let reversedCount = 0;

        selection.ids.forEach(segId => {
            if (processed.has(segId)) return;

            const seg = this.wmeSDK.DataModel.Segments.getById({segmentId: segId});
            if (!seg) return;

            // Only reverse if needed: ONE-WAY AND backwards
            if (!seg.isTwoWay && seg.isBtoA) {
                const ok = this.reverseSegmentPreserveConnections(segId);
                if (ok) {
                    reversedCount++;
                    processed.add(segId);
                }
            }
        });

        this.log(`reverseSelectedSegments(): Done. Reversed ${reversedCount} segments.`);
        return true;

    }

    reverseSegmentPreserveConnections(segmentId) {
        const sdkSeg = this.wmeSDK.DataModel.Segments.getById({segmentId});
        if (!sdkSeg) {
            this.log(`Reverse: Segment ${segmentId} not found`);
            return false;
        }
        // Only backward one-ways need fixing.
        if (sdkSeg.isTwoWay || !sdkSeg.isBtoA) {
            this.log(`Reverse: Segment ${segmentId} does not need reversal`);
            return false;
        }

        // Flip the one-way to A→B via the SDK — the WME-native direction change (same as the segment
        // panel's direction control). Geometry and node bindings are left untouched, so the segment
        // stays connected to its neighbours and its turns are kept by WME; only the allowed travel
        // direction changes to A→B.
        //
        // This replaces the previous geometry-reversal approach, which reversed the coordinates so the
        // endpoints landed on the OPPOSITE nodes but had no way to swap the from/to node bindings to
        // match (WME exposes no ConnectSegment / DisconnectSegment / ReverseSegment modules), and so
        // left the segment disconnected.
        try {
            this.wmeSDK.DataModel.Segments.updateSegment({segmentId, direction: "A_TO_B"});
        } catch (e) {
            this.log(`Reverse: updateSegment(direction) failed for ${segmentId}: ${e}`);
            return false;
        }

        this.log(`Reverse: flipped segment ${segmentId} to A→B one-way`);
        return true;
    }

    setupGasStationButtons() {
        let gasStationButtons = "";
        let gasStationContainer = "<div class='form-group e85 e85-e85-14'><label class='control-label'>Setup Station as</label>";
        gasStationContainer += "<div class='controls'>";
        this.GAS_STATIONS.forEach(gasStation => {
            const buttonName = gasStation.buttonName;
            let buttonHTML = "<button class='waze-btn waze-btn-small waze-btn-white e85 e85-A witk-gas-station-buttons' " + "data-gas-station-name='" + gasStation.name + "' " + "data-gas-station-brand='" + gasStation.brand + "' " + "data-gas-station-alt-name= '" + gasStation.altName + "' " + ">" + buttonName + "</button>";
            gasStationButtons += buttonHTML;
        });
        gasStationContainer += gasStationButtons;
        gasStationContainer += "</div></div>";
        $(".categories-control").after(gasStationContainer)
        if (this.DEBUG_WME_INDIA_TOOL_KIT) this.log("Gas Station Buttons added");
        $(".witk-gas-station-buttons").unbind();
        $(".witk-gas-station-buttons").on("click", (event) => {
            this.setupGasStationData(event.currentTarget);
        });
    }

    setupGasStationData(clickedGasStation) {
        if (!this.selectedGasStation) {
            return;
        }

        const gasStationName = $.trim($(clickedGasStation).data("gasStationName") || "");
        const gasStationBrand = $.trim($(clickedGasStation).data("gasStationBrand") || "");
        const gasStationAltName = $.trim($(clickedGasStation).data("gasStationAltName") || "");
        const selectedGasStationId = this.selectedGasStation.id;
        const existingVenue = this.wmeSDK.DataModel.Venues.getById({venueId: selectedGasStationId});
        if (!existingVenue) {
            return;
        }

        let aliases = Array.isArray(existingVenue.aliases) ? [...existingVenue.aliases] : [];
        if (gasStationAltName !== "") {
            aliases.unshift(gasStationAltName);
        }
        const existingName = $.trim(existingVenue.name || "");
        if (existingName !== "" && existingName.toLowerCase() !== gasStationName.toLowerCase()) {
            aliases.splice(Math.min(1, aliases.length), 0, existingName);
        }

        const processedAliases = aliases
            .map(alias => $.trim(alias || ""))
            .filter(alias => alias !== "")
            .filter(alias => alias.toLowerCase() !== gasStationName.toLowerCase())
            .filter(alias => alias.toLowerCase() !== gasStationBrand.toLowerCase())
            .filter((alias, index, self) =>
                self.findIndex(a => a.toLowerCase() === alias.toLowerCase()) === index
            );

        this.wmeSDK.DataModel.Venues.updateVenue({
            venueId: selectedGasStationId,
            aliases: processedAliases,
            brand: gasStationBrand,
            lockRank: Math.max(existingVenue.lockRank || 0, this.DEFAULT_GAS_STATION_LOCK_LEVEL),
            name: gasStationName
        });
    }

    moveSegment(dx, dy) {
        let selectedData = this.wmeSDK.Editing.getSelection()
        if (!selectedData) return;
        if (selectedData.objectType !== "segment") return;

        if (selectedData.ids === 0) {
            this.log("No segment selected");
            return;
        }
        let fromNodes = [];
        let toNodes = [];
        for (let segIterator = 0; segIterator < selectedData.ids.length; segIterator++) {
            let segmentId = selectedData.ids[segIterator]
            let segment = this.wmeSDK.DataModel.Segments.getById({segmentId});
            if (!segment || !segment.geometry || !segment.geometry.coordinates) {
                continue;
            }
            let fromNode = this.wmeSDK.DataModel.Nodes.getById({nodeId: segment.fromNodeId});
            let toNode = this.wmeSDK.DataModel.Nodes.getById({nodeId: segment.toNodeId});
            // fromNodes.push({node: fromNode, segment: segment, segmentIds: [...fromNode.attributes.segIDs]});
            // toNodes.push({node: toNode, segment: segment, segmentIds: [...toNode.attributes.segIDs]});
            let newGeometry = {...segment.geometry}
            let coordinates = []
            for (let i = 0; i < newGeometry.coordinates.length; i++) {
                coordinates.push([newGeometry.coordinates[i][0] + dx, newGeometry.coordinates[i][1] + dy])
            }
            newGeometry.coordinates = coordinates
            this.wmeSDK.DataModel.Segments.updateSegment({
                segmentId,
                geometry: newGeometry
            });

        }

    }

    findLength(start, end) {
        return this.getDistance(start[0], start[1], end[0], end[1])
    }

    getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Radius of the earth
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    log(message) {
        const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 1em;'
        if (typeof message === 'string') {
            console.log("%c" + ("WME-India-Tools:: " + message), style);
        } else {
            console.log("%c" + ("WME-India-Tools:: " + message), style);
        }
    }

    buildRunRateWidget(todayEditRate, weeklyEditRate, dailyEditCount) {
        return `
            <div id="wmeitk-rr" style="text-align: center; color: red; font-weight: bold; font-size: 12px; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <div className="content" id="wmeitk-trr" style="margin-top: 15px;"> HRR-${todayEditRate}</div>
                <div className="content" id="wmeitk-trr" style="margin-top: 15px;"> DRR-${weeklyEditRate}</div>
                <div id="wmeitk-edit-count" style="margin-top: 8px; padding: 4px 12px; border-radius: 999px; background: #7a1fa2; color: #ffffff; font-size: 16px; font-weight: 700; line-height: 1; font-family: 'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Arial Unicode MS', sans-serif;">
                    ${dailyEditCount}
                </div>
            </div>
        `;
    }

    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    getStorageKey(username) {
        const date = this.getTodayDate();
        return `edit-count-${username}-${date}`;
    }

    loadEditCount(username) {
        const key = this.getStorageKey(username);
        let stored = localStorage.getItem(key);
        if (isNaN(parseInt(stored))) stored = "0";
        return stored ? parseInt(stored) : 0;
    }

    saveEditCount(username, count) {
        const key = this.getStorageKey(username);
        localStorage.setItem(key, count);
    }

    incrementEditCount(username) {
        let count = this.loadEditCount(username);
        if (count >= this.MAX_EDITS_PER_DAY) {
            this.warn("Daily edit limit reached");
            return count;
        }
        count++;
        this.saveEditCount(username, count);
        return count;
    }

    addToEditCount(username, addValue) {
        let count = this.loadEditCount(username);
        if (count >= this.MAX_EDITS_PER_DAY) {
            return count;
        }
        const newCount = Math.min(count + addValue, this.MAX_EDITS_PER_DAY);
        this.saveEditCount(username, newCount);
        return newCount;
    }

}

// ── Script update monitor (WazeToastr) ───────────────────────────────────────
// Name/version/download URL are read from the userscript metadata (GM_info) so they stay in sync with
// the header; forum URL intentionally omitted.
const WMEITK_SCRIPT_NAME = (typeof GM_info !== "undefined" && GM_info.script && GM_info.script.name) || "WME-India-Tools";
const WMEITK_SCRIPT_VERSION = (typeof GM_info !== "undefined" && GM_info.script && GM_info.script.version) || "2026-08-29.01";
const WMEITK_DOWNLOAD_URL = (typeof GM_info !== "undefined" && GM_info.script && GM_info.script.downloadURL)
    || "https://github.com/WazeDev/WAZE-India-Tools/raw/refs/heads/main/WME-India-Tools.user.js";
const WMEITK_UPDATE_MESSAGE = `WME-India-Tools has been updated to v${WMEITK_SCRIPT_VERSION}.`;
const WMEITK_FORUM_URL = "";

function wmeitkScriptUpdateMonitor() {
    if (typeof WazeToastr !== "undefined" && WazeToastr.Ready) {
        try {
            const updateMonitor = new WazeToastr.Alerts.ScriptUpdateMonitor(
                WMEITK_SCRIPT_NAME, WMEITK_SCRIPT_VERSION, WMEITK_DOWNLOAD_URL, GM_xmlhttpRequest);
            updateMonitor.start(2, true);
            WazeToastr.Interface.ShowScriptUpdate(
                WMEITK_SCRIPT_NAME, WMEITK_SCRIPT_VERSION, WMEITK_UPDATE_MESSAGE, WMEITK_DOWNLOAD_URL, WMEITK_FORUM_URL);
        } catch (e) {
            console.error("WME-India-Tools: script update monitor failed:", e);
        }
    } else {
        setTimeout(wmeitkScriptUpdateMonitor, 250);
    }
}
wmeitkScriptUpdateMonitor();

window.SDK_INITIALIZED.then(() => new WMEIndiaTools({toolSettings: toolSettings}));
