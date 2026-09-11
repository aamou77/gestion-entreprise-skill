---
name: synthese-gestion
description: Agréger des données de gestion explicitement fournies en distinguant réel, prévision et scénario, sans produire de comptabilité officielle.
---

# Synthèse de gestion — Contrat fonctionnel V1

## 1. Mission

Produire une vue synthétique de gestion, agréger les données de plusieurs modules, comparer réel, prévisionnel et scénarios, rendre visibles les informations manquantes et les points de vigilance, et préparer une décision sans la rendre automatique. Ne jamais inventer un indicateur absent.

## 2. Nature de la synthèse

```text
Synthèse de gestion
≠
compte de résultat comptable
≠
bilan comptable
≠
liasse fiscale
```

La sortie est un document de pilotage interne. Ne pas employer de terme comptable officiel de manière ambiguë sans comptabilité correspondante.

## 3. Concepts à distinguer

- **Chiffre d’affaires encaissé** : montant effectivement encaissé pour l’activité, selon le périmètre fourni.
- **Chiffre d’affaires facturé** : montant facturé ; il n’est pas automatiquement encaissé.
- **Encaissements** : flux reçus, qui ne sont pas toujours du chiffre d’affaires.
- **Coûts connus** : explicitement fournis ou calculés depuis des données vérifiées ; **coûts hypothétiques** : utilisés uniquement en simulation.
- **Marge économique** : indicateur sur périmètre explicite ; préciser sa définition si plusieurs marges sont possibles.
- **Trésorerie** : solde et flux issus de `tresorerie`.
- **Engagements** : flux futurs connus ou attendus, jamais présentés comme réalisés.
- **Prévision** : projection sur données et hypothèses explicites ; **scénario** : simulation alternative.

## 4. Sources internes possibles

Sources conceptuelles, selon leur état réel d’implémentation :

```text
../seuil-rentabilite/SKILL.md
../tarification/SKILL.md
../tresorerie/SKILL.md
../livre-recettes/SKILL.md
```

Ne pas prétendre qu’un moteur ou une intégration existe.

## 5. Période et périmètre

Préciser période, devise, base HT/TTC lorsque pertinente, activités incluses et exclues, données réelles disponibles et hypothèses. Ne pas agréger des périodes incompatibles ni plusieurs devises sans conversion explicitement fournie.

## 6. Niveaux de données

```text
reel
calcule
previsionnel
hypothetique
indisponible
```

Ne pas remplacer un indicateur indisponible par zéro ; distinguer zéro réel et donnée absente.

## 7. Indicateurs V1 possibles

Lorsque calculables : chiffre d’affaires encaissé et facturé, recettes enregistrées, coûts directs et autres coûts connus, marge économique en valeur, taux de marque ou de marge explicitement définis, solde de trésorerie, encaissements et décaissements futurs engagés ou attendus, seuil de rentabilité, écart au seuil, réserve et écart à la réserve, ventes ou clients explicitement calculables, et engagements récurrents connus. Aucun indicateur n’est obligatoire.

## 8. Marge et résultat de gestion

Ne pas employer automatiquement `resultat_net`, `benefice_net` ou `resultat_comptable`. Employer `marge_economique`, `contribution` ou `solde_de_gestion_estime` seulement avec définition explicite.

```text
solde_de_gestion_estime
= recettes_retenues
- couts_retenus
```

Préciser recettes, coûts inclus et exclus, période et statut réel ou scénario. Ne pas présenter le résultat comme bénéfice comptable ou fiscal.

## 9. Comparaison réel / prévision / scénario

Présenter des sections ou colonnes distinctes : `Réel`, `Prévision`, `Scénario`, `Écart`. Ne jamais les fusionner. Définir le sens de chaque écart, par exemple :

```text
ecart
= valeur_reelle - valeur_prevue
```

## 10. Alertes de gestion

Signaler faits observés ou calculés : solde prévisionnel négatif, marge économique négative, seuil non atteint, donnée critique absente, rattachement insuffisant, incohérence de période, réserve franchie ou concentration seulement si le seuil a été fourni. Ne jamais inventer de seuil d’alerte.

## 11. Recommandations

Séparer recommandation et constat, préciser les données, distinguer faits et hypothèses, ne pas la rendre obligatoire ni dépasser les données. Exemple : constat de solde prévisionnel négatif dans un scénario ; recommandation possible d’examiner dépenses ou calendrier ; limite si deux encaissements sont hypothétiques.

## 12. Données manquantes

Afficher explicitement **Données manquantes**, par exemple coût horaire, date d’encaissement, CA facturé, solde de départ ou données de marché inconnus. Ne pas masquer les lacunes pour compléter artificiellement un tableau.

## 13. Traçabilité

Chaque indicateur conserve conceptuellement origine, période, statut, méthode, hypothèses et avertissements. Une donnée calculée est distincte d’une donnée source.

## 14. Données réglementaires

TVA, cotisations, impôts, obligations et seuils réglementaires sont admis seulement s’ils sont fournis ou issus ultérieurement du référentiel vérifié [references/france/](../../references/france/). Aucune valeur réglementaire n’est codée.

## 15. Livre des recettes

Des informations de `livre-recettes` pourront être utilisées plus tard. Ne pas prétendre qu’une intégration existe, modifier le livre, créer des écritures ou déduire une conformité réglementaire de l’existence d’une donnée.

## 16. CRM et commercial

La V1 ne dépend pas du CRM. Distinguer :

```text
prospect
opportunite
devis
vente
facture
encaissement
```

Ne pas transformer automatiquement un pipeline en prévision ; toute probabilité ou pondération est fournie explicitement.

## 17. Format de synthèse humaine

```text
Synthèse de gestion — période
1. Situation réelle
2. Trésorerie
3. Rentabilité
4. Engagements
5. Prévision / scénarios
6. Points de vigilance
7. Données manquantes
8. Recommandations
9. Limites
```

Ne pas afficher une section vide comme connue.

## 18. Tableau de bord conceptuel

```text
Indicateur
Valeur
Statut
Période
Origine
Écart éventuel
Avertissement
```

Indicateurs possibles : CA encaissé ou facturé, marge économique, trésorerie, seuil, écart au seuil, encaissements et décaissements futurs, réserve et écart. Aucun tableau de bord technique n’est implémenté.

## 19. Sortie structurée future

```text
periode
devise
base_montant
indicateurs
flux
reel
prevision
scenarios
alertes
donnees_manquantes
hypotheses
recommandations
limites
```

Chaque indicateur peut embarquer valeur, unité, statut, origine, méthode, période et avertissements. Aucun JSON n’est implémenté.

## 20. Cas particuliers et contrôles

| Situation | Comportement attendu |
| --- | --- |
| Période absente, devises multiples, HT/TTC incohérents | Suspendre l’agrégation concernée et demander la précision ou conversion explicite. |
| Réel et scénario mélangés | Les séparer ; ne pas les fusionner. |
| Donnée absente traitée comme zéro | Marquer l’indicateur indisponible. |
| Facturé sans encaissement, encaissement sans rattachement, coût sans périmètre, marge sans définition | Produire seulement le constat et l’avertissement. |
| Périodes différentes, sous-skill non implémenté ou duplication possible | Ne pas agréger sans harmonisation ou traçabilité suffisante. |

Ne pas corriger silencieusement.

## 21. Risque de double comptage

Prévenir le double comptage : une recette déjà dans le CA encaissé n’est pas ajoutée comme encaissement, un coût détaillé déjà inclus dans un coût total n’est pas ajouté, et facture plus encaissement ne sont pas deux revenus. Si le périmètre est ambigu, suspendre l’agrégation concernée.

## 22. Frontières

Ne pas faire de comptabilité officielle, bilan ou liasse fiscale ; certifier une rentabilité ; inventer données, seuils, prévisions ou stratégie ; modifier les sources ; présenter scénario comme réel ; ni produire une analyse marketing sans données.

## 23. Tests fonctionnels futurs

- Synthèse réelle complète ou partielle, avec données manquantes.
- Réel versus prévision et scénario.
- Marge calculée ou indisponible faute de périmètre.
- Trésorerie, seuil ou sous-skill source disponible ou indisponible.
- Facture non encaissée et double comptage facture/encaissement ou coût total/détaillé.
- Devises, HT/TTC et périodes incohérents ; zéro réel versus absence.
- Alerte avec seuil fourni, absence de seuil et recommandation distincte.

## 24. Statut V1

Le contrat fonctionnel V1 est défini. Aucun agrégateur déterministe, tableau de bord technique ou intégration CRM n’est implémenté. Aucun composant tiers n’est embarqué. Open Accountant est seulement envisagé comme source d’adaptation future ; aucun contenu tiers n’est repris.
