---
name: livre-recettes
description: Structurer, contrôler et exploiter des recettes enregistrées sans prétendre assurer seul leur conformité réglementaire.
---

# Livre des recettes — Contrat fonctionnel V1

## 1. Mission

Organiser les recettes enregistrées, contrôler leur cohérence technique, détecter les données manquantes ou ambiguës et les doublons potentiels, produire des regroupements conceptuels, préparer les analyses ou exports futurs, alimenter les autres sous-skills et tracer les corrections.

## 2. Nature du domaine

```text
Livre des recettes fonctionnel
≠ validation juridique de conformité
≠ comptabilité officielle
≠ facturation
```

Le sous-skill traite les données de recettes. Les règles françaises sont définies séparément dans le référentiel France.

## 3. Concepts à distinguer

- **Recette enregistrée** : entrée saisie dans le registre fonctionnel.
- **Encaissement** : somme effectivement reçue ; une facture émise n’est pas automatiquement une recette encaissée.
- **Facture** : document commercial de référence possible, pas un encaissement automatique.
- **Client ou payeur** : entité associée quand connue ; ne jamais inventer son identité.
- **Référence**, **nature** et **mode de règlement** : informations explicitement enregistrées.
- **Correction** : modification tracée ; **annulation** : neutralisation par procédure définie ; **remboursement** : flux sortant rattaché à une recette, sans transformer silencieusement l’original en montant négatif.

## 4. Données possibles

```text
identifiant
date_encaissement
date_enregistrement
client_ou_payeur
reference
nature
montant
devise
mode_reglement
categorie
source
statut
notes
```

D’autres champs pourront être ajoutés si des règles françaises vérifiées l’exigent. Cette liste n’est pas une liste légale obligatoire tant que [livre-recettes.md](../../references/france/livre-recettes.md) n’est pas vérifié.

## 5. Source et provenance

Conserver origine, date d’import ou de saisie, opérateur ou processus disponible, référence externe et historique de correction. Une donnée importée n’est pas automatiquement plus fiable qu’une saisie manuelle.

## 6. Validation technique

Contrôler présence des champs nécessaires au traitement, format de date, montant numérique et fini, devise identifiable, référence fournie exploitable, cohérence entre champs, doublons potentiels, chronologie conceptuelle et rattachement possible à une pièce source. La validation technique ne signifie jamais conformité réglementaire.

## 7. Données manquantes

Ne jamais remplacer une donnée manquante par zéro, chaîne vide significative ou valeur inventée.

```text
present
manquant
ambigu
a_verifier
```

Une entrée incomplète peut être conservée avec avertissement si cela ne crée pas un résultat trompeur.

## 8. Montants

Un montant précise sa devise. Ne pas additionner plusieurs devises sans conversion fournie, inventer un taux de change, ni convertir automatiquement HT et TTC. Pour une recette encaissée, conserver le montant effectivement reçu si disponible ; le traitement TVA relève du référentiel France.

## 9. Dates

```text
date_facture
date_encaissement
date_enregistrement
```

Ne jamais déduire la date d’encaissement de la date de facture. La chronologie repose sur la date pertinente définie ultérieurement par une règle France vérifiée.

## 10. Doublons

Détecter conceptuellement les doublons potentiels par référence, montant, date, client/payeur ou source externe. Ne jamais supprimer automatiquement ; signaler pour décision explicite.

## 11. Références et numérotation

Contrôler doublon de référence, format si règle interne, et rupture si séquence explicite. Ne pas inventer une numérotation ni présenter une rupture comme non-conformité juridique sans référence France vérifiée.

## 12. Corrections

Ne pas effacer silencieusement l’historique.

```text
ancienne_valeur
nouvelle_valeur
motif
date_correction
origine_correction
```

Le mode technique précis est ultérieur.

## 13. Annulations et remboursements

Conserver opération originale, opération corrective, lien entre elles, motif et date. Ne pas traiter automatiquement une annulation ou un remboursement comme suppression ; le traitement réglementaire précis relève du référentiel France.

## 14. Totaux et regroupements

Produire conceptuellement total par période, catégorie, client/payeur, mode de règlement, activité, nombre d’entrées et moyenne ou médiane seulement si demandée. Toujours préciser période, devise, filtres, exclusions et entrées ambiguës ou non intégrées.

## 15. Zéro vs absence

```text
montant = 0
```

est distinct d’une valeur absente ; une absence n’entre pas comme zéro dans les totaux.

## 16. Lien avec la trésorerie

Fournir éventuellement les recettes encaissées à [tresorerie](../tresorerie/SKILL.md) sans double comptage. Une recette déjà utilisée comme encaissement n’est pas ajoutée via une autre source ; conserver l’identifiant d’origine.

## 17. Lien avec la synthèse de gestion

[synthese-gestion](../synthese-gestion/SKILL.md) pourra utiliser les recettes selon l’état réel de l’implémentation. Ne pas assimiler automatiquement recettes enregistrées, CA facturé, chiffre d’affaires comptable et trésorerie.

## 18. Facturation

La V1 ne crée pas de facture. Elle conserve une référence ou signale une incohérence. Les règles de facturation relèvent de [facturation.md](../../references/france/facturation.md) lorsqu’elles seront vérifiées.

## 19. Données réglementaires

Le sous-skill ne connaît ni champs légalement obligatoires, durée de conservation, numérotation, obligation de registre, TVA, seuils, cotisations ou règles légales de correction. Ces éléments proviennent du référentiel France vérifié ; aucune valeur réglementaire n’est codée ici.

## 20. Application externe `livre-des-recettes`

Une future intégration est envisagée via [adapters/livre_des_recettes](../../adapters/livre_des_recettes/). Elle pourrait lire, préparer ou contrôler des entrées, récupérer des exports et mapper des champs. Rien n’est implémenté : aucune API, lecture JSON, export automatisé, synchronisation ou garantie de conformité n’est supposée.

## 21. Import futur

Imports conceptuels : CSV, JSON, application externe, export bancaire ou saisie manuelle. Conserver la source et ne pas déduire le sens d’une colonne ambiguë.

## 22. Export futur

Exports conceptuels : CSV, JSON, tableau humain, éventuellement PDF via outil externe. Aucun export n’existe aujourd’hui ; un export fonctionnel n’est pas automatiquement un document légal conforme.

## 23. Format d’analyse

```text
Période
Source
Entrées valides
Entrées à vérifier
Entrées ambiguës
Doublons potentiels
Totaux calculables
Données manquantes
Avertissements
Limites
```

Une recommandation éventuelle est séparée du constat.

## 24. Sortie structurée future

```text
periode
devise
entrees
totaux
doublons_potentiels
donnees_manquantes
anomalies
hypotheses
avertissements
```

Chaque entrée peut conserver identifiant, source, dates, montant, devise, référence, statut et liens de correction. Aucun JSON n’est implémenté.

## 25. Cas particuliers et contrôles

Date d’encaissement ou montant absent, montant non numérique, non fini ou négatif, devise absente ou multiple, référence dupliquée, doublon potentiel, client inconnu, facture sans encaissement, encaissement sans facture, correction, remboursement, annulation, source inconnue, colonne d’import ambiguë et tentative de double comptage doivent être signalés. Ne pas corriger ou supprimer silencieusement.

## 26. Risque de double comptage

Prévenir double import, saisie puis réimport, facture et encaissement additionnés comme deux recettes, et recette utilisée deux fois en synthèse ou trésorerie. En cas de doute, suspendre l’agrégation.

## 27. Frontières

Ne pas faire de comptabilité officielle, garantir une conformité légale, créer des factures, inventer champs réglementaires ou données, supprimer des doublons, modifier silencieusement une entrée, inventer une date d’encaissement, traiter une facture comme encaissement, coder un taux réglementaire, ni prétendre que l’application externe est connectée.

## 28. Tests automatisés V1

- Recette complète, donnée manquante et zéro réel versus montant absent.
- Montant ou date invalide, doublon de référence et doublon potentiel.
- Devises multiples, facture non encaissée et encaissement sans facture.
- Correction tracée, remboursement, annulation et import ambigu.
- Double import, double comptage avec trésorerie, agrégation mensuelle et entrée techniquement non conforme conservée avec avertissement.
- Référentiel France non vérifié et application externe indisponible.

## 29. Statut V1

L’engine V1 est présent dans `engine/`. La suite
`tests/livre-recettes/calculate.test.ts` contient 8 tests automatisés.

Le contrat fonctionnel V1 et son engine déterministe sont implémentés, validés et figés. Aucune intégration externe n’est active. Les règles France restent dans le référentiel dédié et aucun composant tiers n’est embarqué ; `livre-des-recettes` est uniquement un candidat d’intégration future.
