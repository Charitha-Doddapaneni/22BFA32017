import { logPackageMessage } from "./logger.js";

// Log event from hook
logPackageMessage("User selected insurance option", "info", "hook");

// Log page load
logPackageMessage("Dashboard page initialized", "debug", "page");

// Log state change
logPackageMessage("Theme changed to dark mode", "info", "state");

// Log style update error
logPackageMessage("Font loading failed", "error", "style");
