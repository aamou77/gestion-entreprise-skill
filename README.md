# gestion-entreprise-skill

> Deterministic business-management skills for French micro-business workflows

`gestion-entreprise-skill` rassemble des briques TypeScript déterministes pour analyser des données de gestion : seuil de rentabilité, tarification, trésorerie, synthèse de gestion et livre des recettes. Le projet sépare les calculs, la qualification des données, leur provenance et les références réglementaires françaises.

Il vise des analyses explicites et traçables : une donnée absente n’est jamais assimilée à zéro, un scénario reste distinct du réel, et une incompatibilité de période, de devise, de base HT/TTC ou d’unité bloque l’agrégation concernée.

Projet open source publié dans l’écosystème Kirexo.

## Contenu de la version 0.1.0

### `seuil-rentabilite`

Calcul du seuil de rentabilité par voie unitaire ou globale, marge sur coût variable, marge de sécurité et arrondi opérationnel explicite.

### `tarification`

Analyse de prix, marge, taux de marque, taux de marge, prix cible et remises.

### `tresorerie`

Analyse multi-périodes des flux et des soldes, avec distinction entre réalisé, engagé, attendu et scénario.

### `synthese-gestion`

Synthèse interne à partir de montants qualifiés, sans la présenter comme une comptabilité officielle.

### `livre-recettes`

Registre déterministe des recettes, corrections, remboursements et annulations, avec provenance des totaux.

### Orchestration

L’orchestration V1 qualifie les valeurs, route les intentions, contrôle les compatibilités, transmet des résultats qualifiés, conserve la provenance, prévient le double comptage, autorise les sommes homogènes et détermine le statut global.

## Principes de conception

- Les calculs sont déterministes.
- Le moteur n’invente ni donnée, ni hypothèse, ni conversion.
- Zéro et absence de donnée sont distincts.
- Chaque résultat calculé conserve une provenance explicite.
- Les moteurs, l’orchestration et les références réglementaires restent séparés.
- Les montants HT et TTC ne sont pas interchangeables.
- Les périodes ne sont pas fusionnées automatiquement.
- Les devises et les unités ne sont pas converties automatiquement.
- Les règles réglementaires ne sont pas codées dans les moteurs génériques.

## Architecture

```text
gestion-entreprise-skill/
├── orchestrator/
├── references/france/
├── skills/
│   ├── seuil-rentabilite/
│   ├── tarification/
│   ├── tresorerie/
│   ├── synthese-gestion/
│   └── livre-recettes/
├── adapters/
├── upstream/
└── tests/
```

## Prérequis

- Node.js >= 24
- Aucune dépendance externe

## Utilisation et tests

Après clonage du dépôt, aucune installation de dépendance n’est nécessaire :

```bash
cd gestion-entreprise-skill
npm test
```

Les 115 tests automatisés couvrent les cinq moteurs et l’orchestration.

```text
npm run test:seuil-rentabilite
npm run test:tarification
npm run test:tresorerie
npm run test:synthese-gestion
npm run test:livre-recettes
npm run test:orchestrator
```

État actuel : 115 tests, 0 échec.

## Exemple minimal

Exemple avec le moteur `seuil-rentabilite` :

```ts
import { calculateBreakEven } from "./skills/seuil-rentabilite/engine/index.ts";
import type { BreakEvenInput } from "./skills/seuil-rentabilite/engine/index.ts";

const input: BreakEvenInput = {
  mode_analyse: "reel",
  mode_calcul: "unitaire",
  periode: { type: "mensuelle" },
  devise: "EUR",
  base_montants: "HT",
  couts_fixes: 3000,
  prix_unitaire: 100,
  cout_variable_unitaire: 40,
};

const result = calculateBreakEven(input);

console.log(result.status); // "ok"
console.log(result.resultats.seuil_en_unites_mathematique); // 50
console.log(result.resultats.seuil_chiffre_affaires); // 5000
```

## Référentiel France

`references/france/` contient un référentiel séparé pour la micro-entreprise, la TVA, les cotisations sociales, le livre des recettes et la facturation. Chaque règle porte un statut :

- `verified` : vérifiée dans le périmètre et à la date documentés ;
- `scheduled` : évolution future, non applicable automatiquement ;
- `needs_review` : information à contrôler avant usage ;
- `superseded` : règle historique conservée pour sa période ;
- `unknown` : information insuffisante pour conclure.

## Important — limites réglementaires

Ce projet est un outil technique et éducatif. Il ne constitue pas un conseil juridique, fiscal ou comptable et ne remplace pas un professionnel compétent.

Toute règle doit être vérifiée selon la date, l’activité, la situation concernée et les textes applicables. Le statut `verified` signifie qu’une règle a été vérifiée pour un périmètre documenté ; il ne constitue ni une garantie universelle, ni une garantie permanente. Voir [SKILL.md](SKILL.md) et [la méthode des sources France](references/france/sources.md).

## Maturité

Version actuelle : **0.1.0**.

Les cinq moteurs V1 et l’orchestration V1 sont implémentés, validés et figés. Il s’agit de la première publication publique ; l’API peut évoluer avant la version 1.0.0.

## Contribution

Les modalités de contribution publique seront documentées avant l’ouverture complète aux contributions.

Les intégrations externes et composants tiers ne sont pas intégrés par défaut ; consulter [NOTICE.md](NOTICE.md) et [upstream/README.md](upstream/README.md) pour leur statut.

## Licence

[MIT](LICENSE)

Copyright (c) 2026 Mouad AASSARI
