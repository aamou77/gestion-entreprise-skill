# Changelog

## [0.1.2]

Compiled package distribution.

### Added

- compiled JavaScript distribution in dist/;
- generated TypeScript declarations;
- dedicated TypeScript build configuration;
- TypeScript development dependency for package builds.

### Changed

- public package exports now target compiled JavaScript and generated declarations;
- package can now be consumed normally from node_modules under Node 24.

### Unchanged

- business logic and engine behavior remain unchanged.

## [0.1.1]

Package/public API release.

### Added

- root public package entry point;
- stable package exports for orchestrator and five engines;
- public export validation test.

### Changed

- npm test now includes public package export validation.

### Unchanged

- business logic and engine behavior remain unchanged.

## [0.1.0] - 2026-09-12

### Added

- cinq moteurs V1 : `seuil-rentabilite`, `tarification`, `tresorerie`, `synthese-gestion` et `livre-recettes` ;
- orchestration V1 ;
- référentiel France ;
- 115 tests automatisés ;
- scripts npm ;
- documentation publique ;
- licence MIT.

### Notes

- Première publication publique prévue.
- L’API peut évoluer avant la version 1.0.0.
- Aucune dépendance externe runtime.
