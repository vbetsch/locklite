[Back to README](README.md)

# Changelog

> Compétence RNCP : C2.2.4

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.2.0]: https://github.com/vbetsch/locklite/releases/tag/v1.2.0

[1.1.2]: https://github.com/vbetsch/locklite/releases/tag/v1.1.2

[1.1.1]: https://github.com/vbetsch/locklite/releases/tag/v1.1.1

[1.1.0]: https://github.com/vbetsch/locklite/releases/tag/v1.1.0

[1.0.0]: https://github.com/vbetsch/locklite/releases/tag/v1.0.0

## [1.2.0] - 2025-08-22

### Added

* [LOCKLITE-103] Display vault members list by @vbetsch in https://github.com/vbetsch/locklite/pull/104
* [LOCKLITE-149] Add e2e library to test accessibility by @vbetsch in https://github.com/vbetsch/locklite/pull/111
* [LOCKLITE-105] Implement Vercel Speed Insights by @vbetsch in https://github.com/vbetsch/locklite/pull/124
* [LOCKLITE-105] Add vercel cron job for monitoring by @vbetsch in https://github.com/vbetsch/locklite/pull/128
* [LOCKLITE-138] Implement Dependabot by @vbetsch in https://github.com/vbetsch/locklite/pull/140
* [LOCKLITE-84] Be able to edit members about a vault by @vbetsch in https://github.com/vbetsch/locklite/pull/139
* [LOCKLITE-71] Add users multiselect in create vault modal by @vbetsch in https://github.com/vbetsch/locklite/pull/148
* [LOCKLITE-39] Add a route to edit members for a specific vault by @vbetsch
  in https://github.com/vbetsch/locklite/pull/152
* [LOCKLITE-75] Create an endpoint to get all users for the members multiselect by @vbetsch
  in https://github.com/vbetsch/locklite/pull/153
* [LOCKLITE-186] Add a tooltip on avatars by @vbetsch in https://github.com/vbetsch/locklite/pull/159

### Changed

* [LOCKLITE-160] Replace icon profile by letter avatar when the user name is defined by @vbetsch
  in https://github.com/vbetsch/locklite/pull/100
* [LOCKLITE-148] Add rules in linter for accessibility by @vbetsch in https://github.com/vbetsch/locklite/pull/110
* [LOCKLITE-81] Add many-to-many relation between users and vaults in database by @vbetsch
  in https://github.com/vbetsch/locklite/pull/149
* [LOCKLITE-70] Return members in get vaults by @vbetsch in https://github.com/vbetsch/locklite/pull/150
* [LOCKLITE-82] Create a vault with members in API by @vbetsch in https://github.com/vbetsch/locklite/pull/151
* [LOCKLITE-166] Increase global mobile width by @vbetsch in https://github.com/vbetsch/locklite/pull/161

### Fixed

* [LOCKLITE-94] & [LOCKLITE-99] & [LOCKLITE-100] & [LOCKLITE-123] Link resources and references in README and change
  node version in CI by @vbetsch in https://github.com/vbetsch/locklite/pull/105
* [LOCKLITE-158] Invalid login errors no longer appear in the login form by @vbetsch
  in https://github.com/vbetsch/locklite/pull/157
* [LOCKLITE-188] Fix label not visible in the creation form by @vbetsch in https://github.com/vbetsch/locklite/pull/158
* [LOCKLITE-165] Fix login input overflow by @vbetsch in https://github.com/vbetsch/locklite/pull/160

### Security

* [LOCKLITE-95] Create documentation file about security by @vbetsch in https://github.com/vbetsch/locklite/pull/106
* [LOCKLITE-116] Implement and plan security tasks by @vbetsch in https://github.com/vbetsch/locklite/pull/107
* [LOCKLITE-143] Create a security disclaimer alert for production by @vbetsch
  in https://github.com/vbetsch/locklite/pull/113
* [LOCKLITE-144] Disable Swagger in production environment by @vbetsch in https://github.com/vbetsch/locklite/pull/114
* chore(deps): bump @mui/icons-material from 7.2.0 to 7.3.1 by @dependabot[bot]
  in https://github.com/vbetsch/locklite/pull/144
* chore(deps): bump next-swagger-doc from 0.4.0 to 0.4.1 by @dependabot[bot]
  in https://github.com/vbetsch/locklite/pull/142
* chore(deps): bump actions/checkout from 4 to 5 by @dependabot[bot] in https://github.com/vbetsch/locklite/pull/141

## [1.1.2] - 2025-08-10

### Added

* [LOCKLITE-145] Create a database seed by @vbetsch in https://github.com/vbetsch/locklite/pull/85
* [LOCKLITE-141] Create recipe book by @vbetsch in https://github.com/vbetsch/locklite/pull/87
* [LOCKLITE-142] Attach recipes doc to each release by @vbetsch in https://github.com/vbetsch/locklite/pull/89
* [LOCKLITE-135] Create bugs plan by @vbetsch in https://github.com/vbetsch/locklite/pull/92
* [LOCKLITE-143] Create changelog file by @vbetsch in https://github.com/vbetsch/locklite/pull/93

### Changed

* [LOCKLITE-147] Link tests with recipes by @vbetsch in https://github.com/vbetsch/locklite/pull/88

### Fixed

* [LOCKLITE-149] Fix DTO in API documentation by @vbetsch in https://github.com/vbetsch/locklite/pull/86
* [LOCKLITE-153] Fix environment installation by @vbetsch in https://github.com/vbetsch/locklite/pull/90
* [LOCKLITE-156] Fix logout onclick by @vbetsch in https://github.com/vbetsch/locklite/pull/91

## [1.1.1] - 2025-08-08

### Fixed

- **[LOCKLITE-130]** Create a vault that belongs to the current
  user — [#81](https://github.com/vbetsch/locklite/pull/81)

### Security

- **[LOCKLITE-129]** List only the current user’s vaults — [#82](https://github.com/vbetsch/locklite/pull/82)

## [1.1.0] - 2025-08-08

### Added

- **[LOCKLITE-112]** & **[LOCKLITE-131]** Login page — [#69](https://github.com/vbetsch/locklite/pull/69)
- **[LOCKLITE-114]** Document NextAuth API routes — [#70](https://github.com/vbetsch/locklite/pull/70)
- **[LOCKLITE-111]** Register API route — [#71](https://github.com/vbetsch/locklite/pull/71)
- **[LOCKLITE-110]** Profile menu in the navbar — [#74](https://github.com/vbetsch/locklite/pull/74)
- **[LOCKLITE-115]** Auth Guard in UI — [#75](https://github.com/vbetsch/locklite/pull/75)
- **[LOCKLITE-109]** Auth Guard in API — [#76](https://github.com/vbetsch/locklite/pull/76)

## [1.0.0] - 2025-08-05

### Added

- **[LOCKLITE-70]** Create API route for user creation — [#51](https://github.com/vbetsch/locklite/pull/51)
- **[LOCKLITE-89]** Create API route to retrieve my vaults — [#52](https://github.com/vbetsch/locklite/pull/52)
- **[LOCKLITE-71]** Create API route to delete a vault — [#53](https://github.com/vbetsch/locklite/pull/53)
- **[LOCKLITE-73]** Display the list of vaults — [#57](https://github.com/vbetsch/locklite/pull/57)
- **[LOCKLITE-79]** Vault search bar — [#58](https://github.com/vbetsch/locklite/pull/58)
- **[LOCKLITE-80]** Modal and button to create a vault — [#59](https://github.com/vbetsch/locklite/pull/59)
- **[LOCKLITE-81]** Button to delete a vault — [#60](https://github.com/vbetsch/locklite/pull/60)
