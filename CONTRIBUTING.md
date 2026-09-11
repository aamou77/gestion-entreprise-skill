# Contribuer

## Avant de contribuer

- Vérifiez les issues existantes.
- Pour un changement important, privilégiez une issue de discussion avant de commencer.
- N’incluez jamais de secret, de donnée personnelle ou de donnée réelle d’entreprise dans une issue, un test ou une pull request.

## Principes du projet

Les contributions conservent les principes suivants :

- déterminisme ;
- absence d’invention de données ;
- distinction entre zéro et donnée absente ;
- provenance explicite ;
- séparation entre moteurs, orchestration et références France ;
- aucune conversion implicite de devise, de base HT/TTC ou d’unité ;
- aucune règle réglementaire hardcodée dans les moteurs génériques.

## Développement

Prérequis : Node.js >= 24.

Exécutez les tests avant de proposer un changement :

```bash
npm test
```

Toute contribution qui modifie un comportement doit ajouter ou adapter les tests pertinents.

## Références France

Une modification réglementaire doit citer des sources publiques vérifiables, préciser la date et le champ d’application, utiliser les statuts existants et éviter de présenter une règle comme universelle ou permanente.

## Pull requests

Les pull requests doivent rester ciblées, expliquer leur motivation et leur impact, et conserver les tests verts. Ne mélangez pas un refactoring massif et un changement métier sans justification explicite.
