/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Access Token - Readwise Access Token */
  "token": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `open-inbox` command */
  export type OpenInbox = ExtensionPreferences & {}
  /** Preferences accessible in the `open-later` command */
  export type OpenLater = ExtensionPreferences & {}
  /** Preferences accessible in the `open-archive` command */
  export type OpenArchive = ExtensionPreferences & {}
  /** Preferences accessible in the `open-home` command */
  export type OpenHome = ExtensionPreferences & {}
  /** Preferences accessible in the `save-link` command */
  export type SaveLink = ExtensionPreferences & {}
  /** Preferences accessible in the `save-links` command */
  export type SaveLinks = ExtensionPreferences & {}
  /** Preferences accessible in the `save-selection` command */
  export type SaveSelection = ExtensionPreferences & {}
  /** Preferences accessible in the `save-clipboard` command */
  export type SaveClipboard = ExtensionPreferences & {}
  /** Preferences accessible in the `search` command */
  export type Search = ExtensionPreferences & {}
  /** Preferences accessible in the `open-shortlist` command */
  export type OpenShortlist = ExtensionPreferences & {}
  /** Preferences accessible in the `list-articles` command */
  export type ListArticles = ExtensionPreferences & {
  /** Default list location - The default location to use when listing content */
  "defaultListLocation": "new" | "shortlist" | "feed" | "later"
}
}

declare namespace Arguments {
  /** Arguments passed to the `open-inbox` command */
  export type OpenInbox = {}
  /** Arguments passed to the `open-later` command */
  export type OpenLater = {}
  /** Arguments passed to the `open-archive` command */
  export type OpenArchive = {}
  /** Arguments passed to the `open-home` command */
  export type OpenHome = {}
  /** Arguments passed to the `save-link` command */
  export type SaveLink = {
  /** URL */
  "url": string,
  /** Author */
  "author": string
}
  /** Arguments passed to the `save-links` command */
  export type SaveLinks = {}
  /** Arguments passed to the `save-selection` command */
  export type SaveSelection = {}
  /** Arguments passed to the `save-clipboard` command */
  export type SaveClipboard = {}
  /** Arguments passed to the `search` command */
  export type Search = {}
  /** Arguments passed to the `open-shortlist` command */
  export type OpenShortlist = {}
  /** Arguments passed to the `list-articles` command */
  export type ListArticles = {}
}

