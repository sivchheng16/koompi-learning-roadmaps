import { lazy, ComponentType } from "react";

// ── Foundation ───────────────────────────────────────────────────────────────
const CF_README               = lazy(() => import("./Computer-foundation/README"));
const CF_WhatIsSoftware       = lazy(() => import("./Computer-foundation/Module01WhatIsSoftware"));
const CF_DevSetup             = lazy(() => import("./Computer-foundation/Module02DevSetup"));
const CF_HowWebWorks          = lazy(() => import("./Computer-foundation/Module03HowWebWorks"));
const CF_LinuxTerminal        = lazy(() => import("./Computer-foundation/Module03LinuxTerminal"));
const CF_FileManagement       = lazy(() => import("./Computer-foundation/Module04FileManagement"));

// ── Git & GitHub ─────────────────────────────────────────────────────────────
const GIT_README              = lazy(() => import("./Level_05_Git_GitHub/README"));
const GIT_Intro               = lazy(() => import("./Level_05_Git_GitHub/Module01IntroductionGit"));
const GIT_BasicCommands       = lazy(() => import("./Level_05_Git_GitHub/Module02BasicCommands"));
const GIT_Remotes             = lazy(() => import("./Level_05_Git_GitHub/Module03GitHubRemotes"));
const GIT_Collaboration       = lazy(() => import("./Level_05_Git_GitHub/Module04Collaboration"));
const GIT_Advanced            = lazy(() => import("./Level_05_Git_GitHub/Module05AdvancedGit"));
const GIT_Workflows           = lazy(() => import("./Level_05_Git_GitHub/Module06GitWorkflows"));

// ── HTML ─────────────────────────────────────────────────────────────────────
const HTML_README             = lazy(() => import("./Level_01_HTML/README"));
const HTML_GettingStarted     = lazy(() => import("./Level_01_HTML/Module01GettingStarted"));
const HTML_DocStructure       = lazy(() => import("./Level_01_HTML/Module02DocumentStructure"));
const HTML_TextLists          = lazy(() => import("./Level_01_HTML/Module03TextandLists"));
const HTML_Links              = lazy(() => import("./Level_01_HTML/Module04LinksNavigation"));
const HTML_Images             = lazy(() => import("./Level_01_HTML/Module05ImagesMedia"));
const HTML_Forms              = lazy(() => import("./Level_01_HTML/Module06TablesForms"));
const HTML_A11ySEO            = lazy(() => import("./Level_01_HTML/Module08AccessibilitySEO"));
const HTML_Project            = lazy(() => import("./Level_01_HTML/Module07ProjectBioPage"));

// ── CSS ──────────────────────────────────────────────────────────────────────
const CSS_README              = lazy(() => import("./Level_02_CSS/README"));
const CSS_Intro               = lazy(() => import("./Level_02_CSS/Module01IntroductionCSS"));
const CSS_Selectors           = lazy(() => import("./Level_02_CSS/Module02SelectorsSpecificity"));
const CSS_Colors              = lazy(() => import("./Level_02_CSS/Module03ColorsTypography"));
const CSS_BoxModel            = lazy(() => import("./Level_02_CSS/Module04BoxModel"));
const CSS_Layout              = lazy(() => import("./Level_02_CSS/Module05LayoutPositioning"));
const CSS_Flexbox             = lazy(() => import("./Level_02_CSS/Module06FlexboxResponsive"));
const CSS_Grid                = lazy(() => import("./Level_02_CSS/Module08CSSGrid"));
const CSS_Variables           = lazy(() => import("./Level_02_CSS/Module09CSSVariablesAnimations"));
const CSS_Project             = lazy(() => import("./Level_02_CSS/Module07ProjectPortfolio"));

// ── JavaScript Basics ────────────────────────────────────────────────────────
const JS_README               = lazy(() => import("./Level_03_JavaScript_Basics/README"));
const JS_Intro                = lazy(() => import("./Level_03_JavaScript_Basics/Module01Introduction"));
const JS_Variables            = lazy(() => import("./Level_03_JavaScript_Basics/Module02VariablesDataTypes"));
const JS_Operators            = lazy(() => import("./Level_03_JavaScript_Basics/Module03OperatorsConditions"));
const JS_Functions            = lazy(() => import("./Level_03_JavaScript_Basics/Module04Functions"));
const JS_Arrays               = lazy(() => import("./Level_03_JavaScript_Basics/Module05ArraysLoops"));
const JS_DOM                  = lazy(() => import("./Level_03_JavaScript_Basics/Module06DOMManipulation"));
const JS_Modules              = lazy(() => import("./Level_03_JavaScript_Basics/Module08ModulesNPM"));
const JS_Project              = lazy(() => import("./Level_03_JavaScript_Basics/Module07ProjectQuiz"));

// ── JavaScript Advanced ──────────────────────────────────────────────────────
const JSA_README              = lazy(() => import("./Level_04_JavaScript_Advanced/README"));
const JSA_ES6                 = lazy(() => import("./Level_04_JavaScript_Advanced/Module01ES6Features"));
const JSA_Async               = lazy(() => import("./Level_04_JavaScript_Advanced/Module02AsyncJavaScript"));
const JSA_APIs                = lazy(() => import("./Level_04_JavaScript_Advanced/Module03WorkingAPIs"));
const JSA_Errors              = lazy(() => import("./Level_04_JavaScript_Advanced/Module04ErrorHandling"));
const JSA_Classes             = lazy(() => import("./Level_04_JavaScript_Advanced/Module06ClassesOOP"));
const JSA_Testing             = lazy(() => import("./Level_04_JavaScript_Advanced/Module07TestingBasics"));
const JSA_Project             = lazy(() => import("./Level_04_JavaScript_Advanced/Module05ProjectWeather"));

// ── TypeScript ───────────────────────────────────────────────────────────────
const TS_README               = lazy(() => import("./Level_06_TypeScript/README"));
const TS_Basics               = lazy(() => import("./Level_06_TypeScript/Module01Introduction"));
const TS_Types                = lazy(() => import("./Level_06_TypeScript/Module02TypesInterfaces"));
const TS_Functions            = lazy(() => import("./Level_06_TypeScript/Module03FunctionsClasses"));
const TS_Generics             = lazy(() => import("./Level_06_TypeScript/Module04GenericsAdvanced"));
const TS_Project              = lazy(() => import("./Level_06_TypeScript/Module05Project"));

// ── React ────────────────────────────────────────────────────────────────────
const REACT_README            = lazy(() => import("./Level_06_React/README"));
const REACT_Intro             = lazy(() => import("./Level_06_React/Module01Introduction"));
const REACT_Components        = lazy(() => import("./Level_06_React/Module02ComponentsProps"));
const REACT_State             = lazy(() => import("./Level_06_React/Module03StateEvents"));
const REACT_Hooks             = lazy(() => import("./Level_06_React/Module04Hooks"));
const REACT_Router            = lazy(() => import("./Level_06_React/Module05ReactRouter"));
const REACT_StateManagement   = lazy(() => import("./Level_06_React/Module07StateManagement"));
const REACT_Testing           = lazy(() => import("./Level_06_React/Module08TestingReact"));
const REACT_Project           = lazy(() => import("./Level_06_React/Module06ProjectTaskManager"));

// ── Next.js ──────────────────────────────────────────────────────────────────
const NEXT_README             = lazy(() => import("./Level_07_NextJS_Tailwind/README"));
const NEXT_AppRouter          = lazy(() => import("./Level_07_NextJS_Tailwind/Module01AppRouter"));
const NEXT_Routing            = lazy(() => import("./Level_07_NextJS_Tailwind/Module02Routing"));
const NEXT_ServerComponents   = lazy(() => import("./Level_07_NextJS_Tailwind/Module03ServerComponents"));
const NEXT_DataFetching       = lazy(() => import("./Level_07_NextJS_Tailwind/Module04DataFetching"));
const NEXT_RouteHandlers      = lazy(() => import("./Level_07_NextJS_Tailwind/Module05RouteHandlers"));
const NEXT_Tailwind           = lazy(() => import("./Level_07_NextJS_Tailwind/Module06TailwindCSS"));
const NEXT_Auth               = lazy(() => import("./Level_07_NextJS_Tailwind/Module07Auth"));
const NEXT_Deployment         = lazy(() => import("./Level_07_NextJS_Tailwind/Module08Deployment"));

// ── Backend ──────────────────────────────────────────────────────────────────
const BE_README               = lazy(() => import("./Level_08_Backend/README"));
const BE_HowBackends          = lazy(() => import("./Level_08_Backend/Module01HowBackendsWork"));
const BE_NodeExpress          = lazy(() => import("./Level_08_Backend/Module02NodeExpress"));
const BE_REST                 = lazy(() => import("./Level_08_Backend/Module03RESTDesign"));
const BE_Auth                 = lazy(() => import("./Level_08_Backend/Module04AuthJWT"));
const BE_Middleware           = lazy(() => import("./Level_08_Backend/Module05Middleware"));
const BE_Project              = lazy(() => import("./Level_08_Backend/Module06ProjectAPI"));

// ── Databases ────────────────────────────────────────────────────────────────
const DB_README               = lazy(() => import("./Level_09_Databases/README"));
const DB_Fundamentals         = lazy(() => import("./Level_09_Databases/Module01Fundamentals"));
const DB_SQL                  = lazy(() => import("./Level_09_Databases/Module02SQLFundamentals"));
const DB_Supabase             = lazy(() => import("./Level_09_Databases/Module03Supabase"));
const DB_Schema               = lazy(() => import("./Level_09_Databases/Module04SchemaDesign"));
const DB_Project              = lazy(() => import("./Level_09_Databases/Module05Project"));

// ── Testing ──────────────────────────────────────────────────────────────────
const TEST_README             = lazy(() => import("./Level_10_Testing/README"));
const TEST_Philosophy         = lazy(() => import("./Level_10_Testing/Module01Philosophy"));
const TEST_Unit               = lazy(() => import("./Level_10_Testing/Module02UnitTesting"));
const TEST_Integration        = lazy(() => import("./Level_10_Testing/Module03Integration"));
const TEST_E2E                = lazy(() => import("./Level_10_Testing/Module04E2E"));

// ── Shipping & Ops ───────────────────────────────────────────────────────────
const SHIP_README             = lazy(() => import("./Level_11_Shipping/README"));
const SHIP_Docker             = lazy(() => import("./Level_11_Shipping/Module01Docker"));
const SHIP_CICD               = lazy(() => import("./Level_11_Shipping/Module02CICD"));
const SHIP_Env                = lazy(() => import("./Level_11_Shipping/Module03EnvSecrets"));
const SHIP_Monitoring         = lazy(() => import("./Level_11_Shipping/Module04Monitoring"));

// ── The Craft ────────────────────────────────────────────────────────────────
const CRAFT_README            = lazy(() => import("./Level_12_Craft/README"));
const CRAFT_Debugging         = lazy(() => import("./Level_12_Craft/Module01Debugging"));
const CRAFT_ReadingCode       = lazy(() => import("./Level_12_Craft/Module02ReadingCode"));
const CRAFT_PRs               = lazy(() => import("./Level_12_Craft/Module03PRsReviews"));
const CRAFT_AI                = lazy(() => import("./Level_12_Craft/Module04AIAsTool"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lessonRegistry: Record<string, ComponentType<any>> = {
  // Foundation
  "computer-foundation-readme":                    CF_README,
  "computer-foundation-module01whatissoftware":    CF_WhatIsSoftware,
  "computer-foundation-module02devsetup":          CF_DevSetup,
  "computer-foundation-module03howebworks":        CF_HowWebWorks,
  "computer-foundation-module04linuxterminal":     CF_LinuxTerminal,
  "computer-foundation-module05filemanagement":    CF_FileManagement,

  // Git & GitHub
  "git-readme":                   GIT_README,
  "git-module01introductiongit":  GIT_Intro,
  "git-module02basiccommands":    GIT_BasicCommands,
  "git-module03githubremotes":    GIT_Remotes,
  "git-module04collaboration":    GIT_Collaboration,
  "git-module05advancedgit":      GIT_Advanced,
  "git-module06gitworkflows":     GIT_Workflows,

  // HTML
  "html-readme":                  HTML_README,
  "html-module01gettingstarted":  HTML_GettingStarted,
  "html-module02documentstructure": HTML_DocStructure,
  "html-module03textandlists":    HTML_TextLists,
  "html-module04linksnavigation": HTML_Links,
  "html-module05imagesmedia":     HTML_Images,
  "html-module06tablesforms":     HTML_Forms,
  "html-module08accessibilityseo": HTML_A11ySEO,
  "html-module07projectbiopage":  HTML_Project,

  // CSS
  "css-readme":                     CSS_README,
  "css-module01introductioncss":    CSS_Intro,
  "css-module02selectorsspecificity": CSS_Selectors,
  "css-module03colorstypography":   CSS_Colors,
  "css-module04boxmodel":           CSS_BoxModel,
  "css-module05layoutpositioning":  CSS_Layout,
  "css-module06flexboxresponsive":  CSS_Flexbox,
  "css-module08cssgrid":            CSS_Grid,
  "css-module09variables":          CSS_Variables,
  "css-module07projectportfolio":   CSS_Project,

  // JavaScript
  "javascript-readme":                    JS_README,
  "javascript-module01introduction":      JS_Intro,
  "javascript-module02variablesdatatypes": JS_Variables,
  "javascript-module03operatorsconditions": JS_Operators,
  "javascript-module04functions":         JS_Functions,
  "javascript-module05arraysloops":       JS_Arrays,
  "javascript-module06dommanipulation":   JS_DOM,
  "javascript-module08modulesnpm":        JS_Modules,
  "javascript-module07projectquiz":       JS_Project,

  // JS Advanced
  "javascript-advanced-readme":                    JSA_README,
  "javascript-advanced-module01es6features":       JSA_ES6,
  "javascript-advanced-module02asyncjavascript":   JSA_Async,
  "javascript-advanced-module03workingapis":       JSA_APIs,
  "javascript-advanced-module04errorhandling":     JSA_Errors,
  "javascript-advanced-module06classesoop":        JSA_Classes,
  "javascript-advanced-module07testingbasics":     JSA_Testing,
  "javascript-advanced-module05projectweather":    JSA_Project,

  // TypeScript
  "typescript-readme":                TS_README,
  "typescript-module01introduction":  TS_Basics,
  "typescript-module02typesinterfaces": TS_Types,
  "typescript-module03functionclasses": TS_Functions,
  "typescript-module04genericsadvanced": TS_Generics,
  "typescript-module05project":       TS_Project,

  // React
  "react-readme":                     REACT_README,
  "react-module01introduction":       REACT_Intro,
  "react-module02componentsprops":    REACT_Components,
  "react-module03stateevents":        REACT_State,
  "react-module04hooks":              REACT_Hooks,
  "react-module05reactrouter":        REACT_Router,
  "react-module07statemanagement":    REACT_StateManagement,
  "react-module08testingreact":       REACT_Testing,
  "react-module06projecttaskmanager": REACT_Project,

  // Next.js
  "nextjs-readme":                    NEXT_README,
  "nextjs-module01approuter":         NEXT_AppRouter,
  "nextjs-module02routing":           NEXT_Routing,
  "nextjs-module03servercomponents":  NEXT_ServerComponents,
  "nextjs-module04datafetching":      NEXT_DataFetching,
  "nextjs-module05routehandlers":     NEXT_RouteHandlers,
  "nextjs-module06tailwindcss":       NEXT_Tailwind,
  "nextjs-module07auth":              NEXT_Auth,
  "nextjs-module08deployment":        NEXT_Deployment,

  // Backend
  "backend-readme":               BE_README,
  "backend-module01whatisbackend": BE_HowBackends,
  "backend-module02nodejsexpress": BE_NodeExpress,
  "backend-module03restdesign":   BE_REST,
  "backend-module04authjwt":      BE_Auth,
  "backend-module05middleware":   BE_Middleware,
  "backend-module06projectapi":   BE_Project,

  // Databases
  "databases-readme":             DB_README,
  "databases-module01fundamentals": DB_Fundamentals,
  "databases-module02sqlfundamentals": DB_SQL,
  "databases-module03supabase":   DB_Supabase,
  "databases-module04schemadesign": DB_Schema,
  "databases-module05projectschema": DB_Project,

  // Testing
  "testing-readme":               TEST_README,
  "testing-module01philosophy":   TEST_Philosophy,
  "testing-module02unittest":     TEST_Unit,
  "testing-module03integration":  TEST_Integration,
  "testing-module04e2e":          TEST_E2E,

  // Shipping
  "shipping-readme":              SHIP_README,
  "shipping-module01docker":      SHIP_Docker,
  "shipping-module02cicd":        SHIP_CICD,
  "shipping-module03envvars":     SHIP_Env,
  "shipping-module04monitoring":  SHIP_Monitoring,

  // The Craft
  "craft-readme":                 CRAFT_README,
  "craft-module01debugging":      CRAFT_Debugging,
  "craft-module02readingcode":    CRAFT_ReadingCode,
  "craft-module03prsreviews":     CRAFT_PRs,
  "craft-module04aiastool":       CRAFT_AI,
};
