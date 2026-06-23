/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    schoolProfile: any; // Using any for brevity, or I could import the type
    terminology: import('./lib/terminology').TerminologyData;
  }
}
