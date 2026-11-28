import type Lenis from "lenis";

// Holds the active Lenis instance so other components can scroll with it.
export const lenisRef: { current: Lenis | null } = { current: null };
